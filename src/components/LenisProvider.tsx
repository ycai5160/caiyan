"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Handles font-display:swap reflows and lazy image loads
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    // Handles async content (e.g. Mermaid chart) that signals when it's done rendering
    const onContentResize = () =>
      requestAnimationFrame(() => lenis.resize());
    window.addEventListener("lenis:resize", onContentResize);

    lenis.scrollTo(0, { immediate: true });
    const id = setTimeout(() => lenis.resize(), 150);

    return () => {
      clearTimeout(id);
      ro.disconnect();
      window.removeEventListener("lenis:resize", onContentResize);
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [pathname]);

  return <>{children}</>;
}
