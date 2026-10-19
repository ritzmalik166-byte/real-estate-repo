// Builds web assets from the generated renders in /assets-src.
// villa-key.jpg is shot on flat magenta and keyed to a transparent cut-out here.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (f) => path.join(root, "assets-src", f);
const out = path.join(root, "public", "img");
await mkdir(out, { recursive: true });

async function emit(pipeline, name, w, h, { alpha = false } = {}) {
  const base = pipeline.clone().resize(w, h, { fit: "cover", kernel: sharp.kernel.lanczos3 }).sharpen({ sigma: 0.6 });
  await base.clone().avif({ quality: alpha ? 62 : 58, effort: 6 }).toFile(path.join(out, `${name}-${w}.avif`));
  await base.clone().webp({ quality: alpha ? 86 : 80, alphaQuality: 90, effort: 6 }).toFile(path.join(out, `${name}-${w}.webp`));
  console.log("✓", `${name}-${w}`);
}

async function keyMagenta(file) {
  const { data, info } = await sharp(src(file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const key = sampleKey(data, info);
  const lo = 55;
  const hi = 150;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const d = Math.hypot(r - key[0], g - key[1], b - key[2]);
    let a = Math.min(1, Math.max(0, (d - lo) / (hi - lo)));
    a = a * a * (3 - 2 * a);
    if (a > 0 && a < 1) {
      // un-mix the backdrop from edge pixels: observed = a·fg + (1−a)·key
      for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, (data[i + c] - (1 - a) * key[c]) / a));
    }
    // the scene contains no magenta hues, so any r>g<b cast is backdrop light baked into edges
    const gr = data[i + 1];
    if (data[i] - gr > 12 && data[i + 2] - gr > 4) {
      data[i] = gr + (data[i] - gr) * 0.15;
      data[i + 2] = gr + (data[i + 2] - gr) * 0.15;
    }
    data[i + 3] = Math.round(a * 255);
  }
  choke(data, info.width, info.height, 2);
  return sharp(data, { raw: info });
}

/** shrink the matte by `passes` pixels (3×3 min filter) to drop the contaminated rim */
function choke(data, w, h, passes) {
  const a = new Uint8Array(w * h);
  for (let p = 0; p < passes; p++) {
    for (let i = 0; i < w * h; i++) a[i] = data[i * 4 + 3];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let m = 255;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) m = Math.min(m, a[(y + dy) * w + x + dx]);
        data[(y * w + x) * 4 + 3] = m;
      }
    }
  }
}

function sampleKey(data, info) {
  const acc = [0, 0, 0];
  const pts = [[8, 8], [info.width - 8, 8], [info.width >> 1, 12], [8, info.height >> 3], [info.width - 8, info.height >> 3]];
  for (const [x, y] of pts) {
    const i = (y * info.width + x) * info.channels;
    for (let c = 0; c < 3; c++) acc[c] += data[i + c] / pts.length;
  }
  return acc;
}

const villa = sharp(await (await keyMagenta("villa-key.jpg")).png().toBuffer());
await emit(villa, "villa", 1920, 1080, { alpha: true });
await emit(villa, "villa", 1080, 608, { alpha: true });

const sky = sharp(src("sky.jpg"));
await emit(sky, "sky", 1920, 1080);
await emit(sky, "sky", 1080, 608);

await emit(sharp(src("home-1-night.jpg")), "home-1-night", 1200, 900);
await emit(sharp(src("home-1-night.jpg")), "home-1-night", 720, 540);

for (let n = 1; n <= 6; n++) {
  const img = sharp(src(`home-${n}.jpg`));
  await emit(img, `home-${n}`, 1200, 900);
  await emit(img, `home-${n}`, 720, 540);
}
await emit(sharp(src("interior-1.jpg")), "interior-1", 900, 1200);
await emit(sharp(src("interior-2.jpg")), "interior-2", 1200, 900);
await emit(sharp(src("interior-2.jpg")), "interior-2", 720, 540);
for (let n = 1; n <= 3; n++) await emit(sharp(src(`agent-${n}.jpg`)), `agent-${n}`, 600, 800);
