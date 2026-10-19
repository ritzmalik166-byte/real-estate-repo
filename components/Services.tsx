"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";
import { gsap, reducedMotion, scrollToId } from "@/lib/motion";
import Pic from "./Pic";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      gsap.from(".svc", { y: 80, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 70%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="services" aria-labelledby="sv-title">
      <div className="wrap">
        <div className="sv-head">
          <p className="eyebrow">
            <span /> What we do
          </p>
          <h2 id="sv-title" className="h2">
            Buy, rent or sell —
            <br />
            one team, start to keys.
          </h2>
        </div>
        <div className="sv-row">
          {services.map((s, i) => (
            <article
              key={s.n}
              className={`svc ${open === i ? "is-open" : ""}`}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
            >
              <Pic name={s.img} w={[1200, 720]} ratio={[1200, 900]} alt="" sizes="(max-width: 900px) 100vw, 50vw" />
              <div className="svc-body">
                <span className="svc-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <button type="button" className="btn-light" onClick={() => scrollToId("contact")}>
                  Get started <span aria-hidden>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
