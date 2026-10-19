"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";
import Pic from "./Pic";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(el);
      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: 0.8 } })
        .fromTo(q(".sc-frame"), { clipPath: "inset(22% 30% 22% 30% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0)
        .fromTo(q(".sc-frame img"), { scale: 1.35 }, { scale: 1 }, 0)
        .fromTo(q(".sc-title span:first-child"), { yPercent: 0 }, { yPercent: -160 }, 0)
        .fromTo(q(".sc-title span:last-child"), { yPercent: 0 }, { yPercent: 160 }, 0)
        .fromTo(q(".sc-copy"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.7);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" ref={root} className="showcase" aria-labelledby="sc-title">
      <h2 id="sc-title" className="sc-title" aria-label="Interiors that breathe">
        <span aria-hidden>Interiors</span>
        <span aria-hidden>that breathe</span>
      </h2>
      <div className="sc-frame">
        <Pic name="interior-2" w={[1200, 1200]} ratio={[1200, 900]} alt="Light-filled kitchen with marble island, oak stools and palm views" />
      </div>
      <div className="sc-copy">
        <p className="eyebrow eyebrow-light">
          <span /> Inside the homes
        </p>
        <p className="sc-lead">Natural light, honest materials and space to gather. Every listing is photographed and measured by our own team.</p>
      </div>
    </section>
  );
}
