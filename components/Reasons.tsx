"use client";

import { useEffect, useRef } from "react";
import { reasons } from "@/lib/data";
import { gsap, reducedMotion } from "@/lib/motion";
import Pic from "./Pic";

/** An arch-shaped window that grows on scroll; content slides up inside it. */
export default function Reasons() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(el);
      const cards = q<HTMLElement>(".rs-card");

      // arch = inset clip whose oversized top radii resolve to a perfect semicircle
      const arch = (wFrac: number, top: number, bottom = 0) => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const w = Math.min(W * 0.9, Math.max(340, W * wFrac));
        const side = (W - w) / 2;
        return `inset(${H * top}px ${side}px ${H * bottom}px ${side}px round 9999px 9999px 0px 0px)`;
      };

      gsap.set(cards.slice(1), { y: () => window.innerHeight });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "+=420%", pin: true, scrub: 0.9, invalidateOnRefresh: true },
      });

      tl.fromTo(q(".rs-arch"), { clipPath: () => arch(0.2, 0.42, 0.06) }, { clipPath: () => arch(0.34, 0.14), duration: 1 }, 0)
        .fromTo(q(".rs-img img"), { scale: 1.45 }, { scale: 1.05, duration: 1.6 }, 0)
        .fromTo(q(".rs-ring"), { scale: 0.62, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, 0)
        .fromTo(q(".rs-side-l"), { xPercent: 60 }, { xPercent: 0, duration: 1 }, 0)
        .fromTo(q(".rs-side-r"), { xPercent: -60 }, { xPercent: 0, duration: 1 }, 0)
        .to(q(".rs-word"), { xPercent: -28, duration: 4.2 }, 0)
        // ivory panel rises inside the window, the headline travels along the arch
        .to(q(".rs-arch"), { clipPath: () => arch(0.46, 0.1), duration: 0.9, ease: "power2.inOut" }, 1)
        .fromTo(q(".rs-panel"), { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "power2.inOut" }, 1)
        .fromTo(q(".rs-arc textPath"), { attr: { startOffset: "112%" } }, { attr: { startOffset: "50%" }, duration: 1, ease: "power2.out" }, 1.15)
        .fromTo(cards[0], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.6);

      // stacked reasons: each card slides over the last, which recedes
      cards.slice(1).forEach((c, i) => {
        const at = 2.2 + i * 0.8;
        tl.to(c, { y: 0, duration: 0.7, ease: "power2.inOut" }, at).to(cards[i], { scale: 0.9, autoAlpha: 0.35, duration: 0.7, ease: "power2.inOut" }, at);
      });

      // the window opens fully before releasing the pin
      tl.to(q(".rs-arch"), { clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)", duration: 0.8, ease: "power2.inOut" }, 3.9).to(q(".rs-ring"), { scale: 1.6, autoAlpha: 0, duration: 0.6 }, 3.9);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="reasons" aria-labelledby="rs-title">
      <p className="rs-word" aria-hidden>
        homes worth returning to
      </p>
      <p className="rs-side rs-side-l" aria-hidden>
        B U Y
      </p>
      <p className="rs-side rs-side-r" aria-hidden>
        R E N T · S E L L
      </p>
      <div className="rs-ring" aria-hidden />

      <div className="rs-arch">
        <div className="rs-img">
          <Pic name="home-2" w={[1200, 720]} ratio={[1200, 900]} alt="Hillside house with a dark timber facade and lap pool above the jungle" sizes="60vw" />
        </div>
        <div className="rs-panel">
          <svg className="rs-arc" viewBox="0 0 400 130" role="img" aria-labelledby="rs-title">
            <title id="rs-title">Three reasons to choose Tervana</title>
            <defs>
              <path id="rs-curve" d="M 18 128 A 190 190 0 0 1 382 128" />
            </defs>
            <text>
              <textPath href="#rs-curve" startOffset="50%" textAnchor="middle">
                THREE REASONS TO CHOOSE TERVANA
              </textPath>
            </text>
          </svg>
          <div className="rs-cards">
            {reasons.map((r) => (
              <article className="rs-card" key={r.n}>
                <span className="rs-n">{r.n}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
