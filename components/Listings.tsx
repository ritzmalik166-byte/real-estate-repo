"use client";

import { useEffect, useRef, useState } from "react";
import { listings } from "@/lib/data";
import { gsap, reducedMotion } from "@/lib/motion";
import Pic from "./Pic";

const filters = ["All", "For Sale", "For Rent"] as const;

export default function Listings() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = listings.filter((l) => filter === "All" || l.tag === filter);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        if (reducedMotion()) return;
        const t = track.current!;
        const dist = () => Math.max(0, t.scrollWidth - t.clientWidth);
        // cards lean into the direction of travel, proportional to scroll speed
        const skewTo = gsap.quickTo(gsap.utils.toArray(".card", t), "skewX", { duration: 0.5, ease: "power3" });
        const settle = gsap.delayedCall(0.12, () => skewTo(0)).pause();
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${dist() + window.innerHeight * 0.3}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              skewTo(gsap.utils.clamp(-7, 7, self.getVelocity() / -350));
              settle.restart(true);
            },
          },
        });
        gsap.utils.toArray<HTMLElement>(".card-media img", el).forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
      });
      gsap.from(".card", { y: 60, autoAlpha: 0, stagger: 0.08, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 75%" } });
    }, el);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="listings" ref={root} className="listings" aria-labelledby="ls-title">
      <div className="wrap ls-head">
        <div>
          <p className="eyebrow">
            <span /> Featured homes
          </p>
          <h2 id="ls-title" className="h2">
            Find a place
            <br />
            you&apos;ll love living in.
          </h2>
        </div>
        <div className="seg" role="radiogroup" aria-label="Filter listings">
          {filters.map((f) => (
            <button type="button" key={f} role="radio" aria-checked={filter === f} className={filter === f ? "is-on" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="ls-track" ref={track}>
        {shown.map((l) => (
          <article className="card" key={l.title}>
            <div className="card-media">
              <Pic name={l.img} w={[1200, 720]} ratio={[1200, 900]} alt={`${l.title}, ${l.place}`} sizes="(max-width: 900px) 86vw, 34vw" />
              <span className="tag">{l.tag}</span>
            </div>
            <div className="card-body">
              <div>
                <h3>{l.title}</h3>
                <p className="muted">{l.place}</p>
              </div>
              <p className="price">{l.price}</p>
            </div>
            <ul className="card-meta" aria-label="Key facts">
              <li>{l.beds} Beds</li>
              <li>{l.baths} Baths</li>
              <li>{l.area}</li>
            </ul>
          </article>
        ))}
        <div className="card card-more">
          <p className="h2">
            {listings.length * 40}+
            <br />
            more homes
          </p>
          <p className="muted">New listings added every week across every neighbourhood we cover.</p>
        </div>
      </div>
    </section>
  );
}
