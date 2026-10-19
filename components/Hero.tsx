"use client";

import { useEffect, useRef } from "react";
import { brand, sideLinks } from "@/lib/data";
import { gsap, reducedMotion, scrollToId } from "@/lib/motion";
import Pic from "./Pic";

const socials = [
  { label: "YouTube", d: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z" },
  { label: "Instagram", d: "M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8ZM17.3 3H6.7A3.7 3.7 0 0 0 3 6.7v10.6A3.7 3.7 0 0 0 6.7 21h10.6a3.7 3.7 0 0 0 3.7-3.7V6.7A3.7 3.7 0 0 0 17.3 3ZM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm5.3-9a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" },
  { label: "X", d: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8Zm-1.1 16.2h1.7L7.4 4.7H5.6Z" },
  { label: "Facebook", d: "M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14.1 2C10.9 2 10.2 4.4 10.2 6v2.5H8V12h2.2v10H14V12h2.8l.4-3.5Z" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(el);

      // load-in: sky settles, letters rise from behind the roofline, villa lifts into place
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q(".h-sky"), { scale: 1.25, duration: 2.4 }, 0)
        .from(q(".h-word span"), { yPercent: 110, duration: 1.5, stagger: 0.07 }, 0.25)
        .from(q(".h-villa"), { yPercent: 28, scale: 0.92, duration: 1.8 }, 0.35)
        .from("[data-intro=hdr] > *", { y: -30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.8)
        .from(q(".h-fade"), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 1.0)
        .from(q(".h-social a"), { x: -20, autoAlpha: 0, duration: 0.8, stagger: 0.06 }, 1.1);

      // scroll: the villa pushes toward the camera while the wordmark drifts back
      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } })
        .to(q(".h-villa"), { scale: 1.35, yPercent: 6 }, 0)
        .to(q(".h-word"), { yPercent: 38, scale: 0.86, autoAlpha: 0.25 }, 0)
        .to(q(".h-sky"), { scale: 1.12, yPercent: 4 }, 0)
        .to(q(".h-ui"), { autoAlpha: 0, y: -40 }, 0)
        .to(q(".h-dim"), { autoAlpha: 1 }, 0.4);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="hero" aria-label="Tervana — find your next home">
      <div className="h-sticky">
        <div className="h-sky">
          <Pic name="sky" w={[1920, 1080]} ratio={[1920, 1080]} alt="" eager />
        </div>

        <h1 className="h-word" aria-label={`${brand.name} — real estate`}>
          {brand.name.split("").map((c, i) => (
            <span key={i} aria-hidden>
              {c}
            </span>
          ))}
        </h1>

        <div className="h-villa">
          <Pic name="villa" w={[1920, 1080]} ratio={[1920, 1080]} alt="Modern two-storey white villa with glass walls, palm trees and a pool" eager />
        </div>

        <div className="h-dim" aria-hidden />

        <div className="h-ui">
          <p className="h-year h-fade">{brand.year}</p>
          <ul className="h-side h-fade">
            {sideLinks.map((l) => (
              <li key={l.label}>
                <button type="button" onClick={() => scrollToId(l.id)}>
                  {l.label}
                  <span aria-hidden>{"//"}</span>
                </button>
              </li>
            ))}
          </ul>
          <ul className="h-social" aria-label="Social media">
            {socials.map((s) => (
              <li key={s.label}>
                <a href="#" aria-label={s.label} onClick={(e) => e.preventDefault()}>
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="h-copy h-fade">
            <p>{brand.blurb}</p>
            <button type="button" className="btn-dark" onClick={() => scrollToId("listings")}>
              Explore homes <span aria-hidden>→</span>
            </button>
          </div>
          <div className="h-scroll h-fade" aria-hidden>
            <i />
            Scroll
          </div>
        </div>
      </div>
    </section>
  );
}
