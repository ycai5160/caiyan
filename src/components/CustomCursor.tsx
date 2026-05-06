"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const onEnter = () => gsap.to(el, { scale: 2, duration: 0.3, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });

    window.addEventListener("mousemove", onMove);

    // Scale up on interactive elements
    const targets = document.querySelectorAll("a, button, [role='button']");
    targets.forEach((t) => {
      t.addEventListener("mouseenter", onEnter);
      t.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: -9,
        left: -9,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "var(--color-cursor)",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    />
  );
}
