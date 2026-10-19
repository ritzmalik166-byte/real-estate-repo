"use client";

import { useEffect, useRef } from "react";
import { agents, reviews } from "@/lib/data";
import { gsap, reducedMotion, scrollToId } from "@/lib/motion";
import Pic from "./Pic";

export default function Agents() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      gsap.from(".agent", { y: 90, autoAlpha: 0, rotate: 2, stagger: 0.12, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".ag-row", start: "top 80%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="agents" ref={root} className="agents" aria-labelledby="ag-title">
      <div className="wrap">
        <div className="ag-head">
          <div>
            <p className="eyebrow">
              <span /> Find an agent
            </p>
            <h2 id="ag-title" className="h2">
              Advisors who know
              <br />
              every street.
            </h2>
          </div>
          <button type="button" className="btn-dark" onClick={() => scrollToId("contact")}>
            Talk to an advisor <span aria-hidden>→</span>
          </button>
        </div>
        <div className="ag-row">
          {agents.map((a) => (
            <article className="agent" key={a.name}>
              <div className="agent-media">
                <Pic name={a.img} w={[600, 600]} ratio={[600, 800]} alt={`Portrait of ${a.name}`} sizes="(max-width: 900px) 90vw, 30vw" />
              </div>
              <div className="agent-body">
                <div>
                  <h3>{a.name}</h3>
                  <p className="muted">{a.role}</p>
                </div>
                <p className="agent-deals">
                  <strong>{a.deals}</strong> homes
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="marquee" aria-label="Client reviews">
        <div className="marquee-track">
          {[...reviews, ...reviews].map((r, i) => (
            <figure className="review" key={i} aria-hidden={i >= reviews.length}>
              <blockquote>“{r.q}”</blockquote>
              <figcaption>— {r.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
