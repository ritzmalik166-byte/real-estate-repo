"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { amenities } from "@/lib/data";
import { gsap, reducedMotion } from "@/lib/motion";
import Pic from "./Pic";

type Mode = "day" | "night";

export default function Living() {
  const root = useRef<HTMLElement>(null);
  const night = useRef<HTMLDivElement>(null);
  const follow = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("day");
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(el);

      // "The space to [image] live in": the inline photo opens up and pushes the words apart
      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: q(".lv-title")[0], start: "top 85%", end: "bottom 35%", scrub: 0.8 } })
        .fromTo(q(".lv-pill"), { width: "0.6em", borderRadius: "0.3em" }, { width: "2.6em", borderRadius: "0.5em" }, 0)
        .fromTo(q(".lv-pill img"), { scale: 1.6 }, { scale: 1 }, 0)
        .fromTo(q(".lv-l1"), { xPercent: 12 }, { xPercent: 0 }, 0)
        .fromTo(q(".lv-l2"), { xPercent: -12 }, { xPercent: 0 }, 0);

      // day/night stage: rounded card grows to full width with a gentle parallax
      gsap.fromTo(q(".lv-stage"), { scale: 0.86, borderRadius: 48 }, { scale: 1, borderRadius: 28, ease: "none", scrollTrigger: { trigger: q(".lv-stage")[0], start: "top bottom", end: "top 20%", scrub: true } });
      gsap.fromTo(q(".lv-stage .lv-layer img"), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: q(".lv-stage")[0], start: "top bottom", end: "bottom top", scrub: true } });

      gsap.from(q(".am-row"), { y: 50, autoAlpha: 0, stagger: 0.07, duration: 1, ease: "power3.out", scrollTrigger: { trigger: q(".am-list")[0], start: "top 80%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  // cursor-following preview for the amenities list, tilting with pointer speed
  useEffect(() => {
    const f = follow.current;
    if (!f || reducedMotion() || !matchMedia("(hover: hover)").matches) return;
    gsap.set(f, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    f.querySelectorAll<HTMLElement>(".am-follow-img").forEach((img, i) => gsap.set(img, { yPercent: i * 100 }));
    const xTo = gsap.quickTo(f, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(f, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(f, "rotate", { duration: 0.8, ease: "power3" });
    let last = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - last) * 0.6));
      last = e.clientX;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const f = follow.current;
    if (!f) return;
    gsap.to(f, { autoAlpha: hover === null ? 0 : 1, scale: hover === null ? 0.6 : 1, duration: 0.45, ease: "power3.out" });
    if (hover !== null) {
      f.querySelectorAll<HTMLElement>(".am-follow-img").forEach((img, i) => gsap.to(img, { yPercent: (i - hover) * 100, duration: 0.6, ease: "power3.inOut" }));
    }
  }, [hover]);

  function toggle(next: Mode, e: MouseEvent<HTMLButtonElement>) {
    if (next === mode) return;
    setMode(next);
    const layer = night.current!;
    const stage = layer.parentElement!.getBoundingClientRect();
    const b = e.currentTarget.getBoundingClientRect();
    const cx = b.left + b.width / 2 - stage.left;
    const cy = b.top + b.height / 2 - stage.top;
    const r = Math.hypot(Math.max(cx, stage.width - cx), Math.max(cy, stage.height - cy));
    // circular wipe radiating from the button that was pressed
    gsap.fromTo(
      layer,
      { clipPath: `circle(${next === "night" ? 0 : r}px at ${cx}px ${cy}px)` },
      { clipPath: `circle(${next === "night" ? r : 0}px at ${cx}px ${cy}px)`, duration: reducedMotion() ? 0 : 1.2, ease: "power3.inOut" },
    );
  }

  return (
    <section id="living" ref={root} className="living" aria-labelledby="lv-title">
      <div className="wrap">
        <p className="eyebrow">
          <span /> Lifestyle
        </p>
        <h2 id="lv-title" className="lv-title" aria-label="The space to live in">
          <span className="lv-l1" aria-hidden>
            The space to
          </span>
          <span className="lv-l2" aria-hidden>
            <span className="lv-pill">
              <Pic name="interior-1" w={[900, 900]} ratio={[900, 1200]} alt="" sizes="20vw" />
            </span>
            live in
          </span>
        </h2>
      </div>

      <div className="wrap">
        <div className="lv-stage">
          <div className="lv-layer">
            <Pic name="home-1" w={[1200, 720]} ratio={[1200, 900]} alt="Beachfront villa terrace and infinity pool by day" sizes="100vw" />
          </div>
          <div className="lv-layer lv-night" ref={night} aria-hidden={mode === "day"}>
            <Pic name="home-1-night" w={[1200, 720]} ratio={[1200, 900]} alt="The same villa at night with glowing interiors and a lit pool" sizes="100vw" />
          </div>
          <div className="lv-switch" role="group" aria-label="Time of day">
            <button type="button" aria-pressed={mode === "day"} onClick={(e) => toggle("day", e)}>
              by day
            </button>
            <button type="button" aria-pressed={mode === "night"} onClick={(e) => toggle("night", e)}>
              by night
            </button>
          </div>
          <p className="lv-cap">
            {mode === "day" ? "Morning swims, open doors, sea air." : "Warm light, still water, the sound of the tide."}
          </p>
        </div>
      </div>

      <div className="wrap am">
        <div className="am-head">
          <p className="eyebrow">
            <span /> Homes by lifestyle
          </p>
          <p className="muted">Hover to preview — tap to browse on mobile.</p>
        </div>
        <ul className="am-list" onMouseLeave={() => setHover(null)}>
          {amenities.map((a, i) => (
            <li key={a.title} className={`am-row ${hover === i ? "is-on" : ""}`} onMouseEnter={() => setHover(i)}>
              <span className="am-n">0{i + 1}</span>
              <span className="am-title">{a.title}</span>
              <span className="am-meta">{a.meta}</span>
              <span className="am-arrow" aria-hidden>
                →
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="am-follow" ref={follow} aria-hidden>
        {amenities.map((a) => (
          <div className="am-follow-img" key={a.title}>
            <Pic name={a.img} w={[720, 720]} ratio={[720, 540]} alt="" sizes="320px" />
          </div>
        ))}
      </div>
    </section>
  );
}
