"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/lib/data";
import { gsap, reducedMotion } from "@/lib/motion";
import Pic from "./Pic";

const statement =
  "We match people with places that feel like home — with honest pricing, local advisors and every cost laid out before you sign.";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const nums = q<HTMLElement>("[data-count]");
      if (reducedMotion()) return;

      gsap.fromTo(
        q(".st-word"),
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: q(".statement")[0], start: "top 80%", end: "bottom 45%", scrub: true } },
      );

      nums.forEach((n) => {
        const target = Number(n.dataset.count);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 88%", once: true },
          onUpdate: () => (n.textContent = Math.round(o.v).toLocaleString("en-US")),
        });
      });

      gsap.from(q(".ab-img"), { clipPath: "inset(18% 18% 18% 18% round 28px)", ease: "none", scrollTrigger: { trigger: q(".ab-img")[0], start: "top 90%", end: "top 30%", scrub: true } });
      gsap.from(q(".ab-img img"), { scale: 1.3, ease: "none", scrollTrigger: { trigger: q(".ab-img")[0], start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="about" aria-labelledby="ab-title">
      <div className="wrap">
        <p className="eyebrow">
          <span /> About Tervana
        </p>
        <h2 id="ab-title" className="statement">
          {statement.split(" ").map((w, i) => (
            <span className="st-word" key={i}>
              {w}{" "}
            </span>
          ))}
        </h2>

        <div className="ab-grid">
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.k}>
                <dd>
                  <span data-count={s.v}>{s.v.toLocaleString("en-US")}</span>
                  {s.suffix}
                </dd>
                <dt>{s.k}</dt>
              </div>
            ))}
          </dl>
          <figure className="ab-img">
            <Pic name="interior-1" w={[900, 900]} ratio={[900, 1200]} alt="Bright living room opening onto a pool and palm garden" sizes="(max-width: 900px) 100vw, 40vw" />
          </figure>
        </div>
      </div>
    </section>
  );
}
