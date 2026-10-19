"use client";

import { useEffect } from "react";
import { revealHeadings, ScrollTrigger, startLenis, stopLenis } from "@/lib/motion";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Reasons from "./Reasons";
import Listings from "./Listings";
import Living from "./Living";
import Services from "./Services";
import Showcase from "./Showcase";
import Agents from "./Agents";
import Contact from "./Contact";

export default function Site() {
  useEffect(() => {
    startLenis();
    const refresh = () => ScrollTrigger.refresh();
    let undoHeadings = () => {};
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(() => {
      undoHeadings = revealHeadings(document.querySelector("main")!);
      refresh();
    });
    return () => {
      window.removeEventListener("load", refresh);
      undoHeadings();
      stopLenis();
    };
  }, []);

  return (
    <>
      <a className="skiplink" href="#listings">
        Skip to listings
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Reasons />
        <Listings />
        <Living />
        <Services />
        <Showcase />
        <Agents />
        <Contact />
      </main>
    </>
  );
}
