"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate scroll limit whenever page height changes —
    // catches font-display:swap reflows and lazy image loads
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tick);
    };
  }, []);

  // Reset scroll to top on every route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    // Recalculate scroll dimensions after new page content is laid out
    const id = setTimeout(() => lenisRef.current?.resize(), 150);
    return () => clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
