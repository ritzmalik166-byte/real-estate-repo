"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;
const raf = (t: number) => lenis?.raf(t * 1000);

export const reducedMotion = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function startLenis() {
  if (lenis || reducedMotion()) return;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}

export function stopLenis() {
  gsap.ticker.remove(raf);
  lenis?.destroy();
  lenis = null;
}

export function scrollToId(id: string) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
}

/** Masked line-by-line reveal for every `.h2` heading as it enters the viewport. */
export function revealHeadings(scope: Element) {
  if (reducedMotion()) return () => {};
  const splits = gsap.utils.toArray<HTMLElement>(".h2", scope).map((el) =>
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          rotate: 2,
          transformOrigin: "0% 100%",
          stagger: 0.09,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        }),
    }),
  );
  return () => splits.forEach((s) => s.revert());
}

export { gsap, ScrollTrigger, SplitText };
