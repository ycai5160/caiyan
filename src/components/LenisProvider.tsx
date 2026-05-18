"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pages that use native scroll (dynamic async content breaks Lenis height calculation)
const NATIVE_SCROLL = ["/work/subflow"];

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (NATIVE_SCROLL.includes(pathname)) {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    lenis.scrollTo(0, { immediate: true });
    const id = setTimeout(() => lenis.resize(), 150);

    return () => {
      clearTimeout(id);
      ro.disconnect();
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [pathname]);

  return <>{children}</>;
}
