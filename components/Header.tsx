"use client";

import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/data";
import { scrollToId } from "@/lib/motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`hdr ${scrolled ? "is-solid" : ""} ${open ? "is-open" : ""}`} data-intro="hdr">
      <button type="button" className="logo" onClick={() => go("top")} aria-label="Tervana home">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M3 11.2 12 4l9 7.2V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" />
        </svg>
        {brand.name.charAt(0).toUpperCase() + brand.name.slice(1)}
      </button>

      <nav className="pills" aria-label="Primary">
        {nav.map((n) => (
          <button type="button" key={n.id} className={active === n.id ? "is-active" : ""} aria-current={active === n.id ? "true" : undefined} onClick={() => go(n.id)}>
            {n.label}
          </button>
        ))}
      </nav>

      <button type="button" className="cta-pill" onClick={() => go("contact")}>
        Let&apos;s Get Started
      </button>
      <button type="button" className="burger" aria-label="Menu" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((o) => !o)}>
        <i />
        <i />
      </button>

      <nav id="mnav" className="mnav" aria-label="Mobile" hidden={!open}>
        {[...nav, { id: "contact", label: "Let's Get Started" }].map((n) => (
          <button type="button" key={n.id} onClick={() => go(n.id)}>
            {n.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
