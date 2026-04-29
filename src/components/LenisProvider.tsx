"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scroll and drives it via gsap.ticker so that
 * GSAP ScrollTrigger reads Lenis's virtual scroll position rather than
 * the native browser scroll position. Without this connection, scrub-based
 * ScrollTriggers jitter against smooth scroll.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Touch devices have native momentum scrolling — Lenis adds no value there
    // and interferes with GSAP ScrollTrigger's pin/scrub by owning the scroll
    // event pipeline without reliably forwarding position updates.
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo decay
      overscroll: false,
    });

    lenisRef.current = lenis;

    // Feed Lenis into GSAP's unified ticker — keeps ScrollTrigger in sync.
    // lagSmoothing(0) prevents GSAP from dropping frames when the tab is
    // backgrounded and then foregrounded, which would cause a scroll jump.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to use Lenis's scroll position
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
