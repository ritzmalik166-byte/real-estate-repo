type Props = {
  name: string;
  /** [large, small] widths produced by scripts/process-images.mjs */
  w: [number, number];
  ratio: [number, number];
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
};

/** AVIF/WebP responsive picture for the pre-built assets in /public/img. */
export default function Pic({ name, w, ratio, alt, sizes = "100vw", className = "", eager = false }: Props) {
  const set = (ext: string) => [...new Set(w)].map((x) => `/img/${name}-${x}.${ext} ${x}w`).join(", ");
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={`/img/${name}-${w[0]}.webp`}
        srcSet={set("webp")}
        sizes={sizes}
        alt={alt}
        width={ratio[0]}
        height={ratio[1]}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}
