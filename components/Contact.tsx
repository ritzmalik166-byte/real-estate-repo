"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { brand, nav } from "@/lib/data";
import { gsap, reducedMotion, scrollToId } from "@/lib/motion";
import Pic from "./Pic";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      const q = gsap.utils.selector(el);
      gsap.fromTo(q(".ct-panel"), { scale: 0.9, borderRadius: 64 }, { scale: 1, borderRadius: 32, ease: "none", scrollTrigger: { trigger: q(".ct-panel")[0], start: "top bottom", end: "top 25%", scrub: true } });
      gsap.fromTo(q(".ct-bg img"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: q(".ct-panel")[0], start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q(".ft-word span"), { yPercent: 100, stagger: 0.05, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: q(".ft-word")[0], start: "top 95%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!String(data.get("name") ?? "").trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please add your name and a valid email.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section id="contact" ref={root} className="contact" aria-labelledby="ct-title">
      <div className="ct-panel">
        <div className="ct-bg" aria-hidden>
          <Pic name="home-1" w={[1200, 720]} ratio={[1200, 900]} alt="" />
        </div>
        <div className="ct-inner">
          <div>
            <p className="eyebrow eyebrow-light">
              <span /> Let&apos;s get started
            </p>
            <h2 id="ct-title" className="h2 ct-title">
              Your next home
              <br />
              is closer than you think.
            </h2>
          </div>
          {sent ? (
            <div className="ct-form ct-done" role="status">
              <p className="h3">Thanks — we&apos;ll be in touch within one business day.</p>
              <button type="button" className="btn-light" onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={submit} noValidate>
              <label>
                Name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                I want to
                <select name="intent" defaultValue="Buy">
                  <option>Buy</option>
                  <option>Rent</option>
                  <option>Sell</option>
                  <option>Get a home loan</option>
                </select>
              </label>
              <button type="submit" className="btn-dark btn-block">
                Book a free consultation <span aria-hidden>→</span>
              </button>
              {error && (
                <p className="ct-err" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <footer className="ftr">
        <div className="wrap ft-top">
          <p className="muted ft-blurb">{brand.blurb}</p>
          <nav aria-label="Footer">
            {nav.map((n) => (
              <button type="button" key={n.id} onClick={() => scrollToId(n.id)}>
                {n.label}
              </button>
            ))}
          </nav>
        </div>
        <p className="ft-word" aria-hidden>
          {brand.name.split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </p>
        <div className="wrap ft-legal">
          <span>{brand.year} Tervana</span>
          <span>{brand.disclaimer}</span>
        </div>
      </footer>
    </section>
  );
}
