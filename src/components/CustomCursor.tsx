"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    // Own all transform management — no conflict with React's inline style
    gsap.set(el, { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const setX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      setX(pendingX);
      setY(pendingY);

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const hit = document.elementFromPoint(pendingX, pendingY);
        const over = !!(hit?.closest("a, button, [role='button']"));
        gsap.to(el, { scale: over ? 2 : 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      });
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden [@media(pointer:fine)]:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "var(--color-cursor)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    />
  );
}
