"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    // Observe the actual scrollable surface so content growth (e.g., images
    // loading, padding edits during dev) re-syncs Lenis's scroll cap.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.documentElement);
    const main = document.querySelector("main");
    if (main) ro.observe(main);

    lenis.scrollTo(0, { immediate: true });
    const id = setTimeout(() => lenis.resize(), 150);
    // Catch late-arriving images / fonts
    const id2 = setTimeout(() => lenis.resize(), 600);

    return () => {
      clearTimeout(id);
      clearTimeout(id2);
      ro.disconnect();
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [pathname]);

  return <>{children}</>;
}
