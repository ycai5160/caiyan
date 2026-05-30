"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Animated visual for the DEFINE bento card.
 *
 * Rest: four sticky notes in a messy pile, overlapping, rotated at wild angles.
 * Hover: the stickies snap into a clean 2x2 grid with only a tiny paper-feel
 *   rotation left, like a designer organizing research insights into a board.
 *
 * Reads as the "define" moment: raw insights → synthesized structure.
 */
export default function DefineFrame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const pinkRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);

  // ── Rest layout: messy. Each sticky is offset off its organized slot
  // and rotated dramatically; they overlap to feel like a real pile.
  const MESSY = {
    yellow: { x: 22, y: 10, rotate: -16 },   // organized at TL, messy pushed right + tilted
    blue: { x: -28, y: 18, rotate: 11 },     // organized at TR, messy pushed left
    pink: { x: 30, y: -22, rotate: -9 },     // organized at BL, messy pushed up-right
    green: { x: -24, y: -14, rotate: 13 },   // organized at BR, messy pushed up-left
  } as const;

  // Organized: nearly straight, with a tiny paper-feel rotation
  const ORGANIZED = {
    yellow: { rotate: -1.5 },
    blue: { rotate: 1.5 },
    pink: { rotate: 1 },
    green: { rotate: -2 },
  } as const;

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Initial state — synchronous so it lands before first paint
  useLayoutEffect(() => {
    gsap.set(yellowRef.current, { ...MESSY.yellow, force3D: true });
    gsap.set(blueRef.current, { ...MESSY.blue, force3D: true });
    gsap.set(pinkRef.current, { ...MESSY.pink, force3D: true });
    gsap.set(greenRef.current, { ...MESSY.green, force3D: true });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const card = root.closest<HTMLElement>("[data-core-card]");
    if (!card) return;

    const handleEnter = () => {
      tlRef.current?.kill();
      const tl = gsap.timeline({ defaults: { force3D: true } });
      tl.to(
        yellowRef.current,
        { x: 0, y: 0, rotate: ORGANIZED.yellow.rotate, duration: 0.45, ease: "power3.out" },
        0
      )
        .to(
          blueRef.current,
          { x: 0, y: 0, rotate: ORGANIZED.blue.rotate, duration: 0.45, ease: "power3.out" },
          0.04
        )
        .to(
          pinkRef.current,
          { x: 0, y: 0, rotate: ORGANIZED.pink.rotate, duration: 0.45, ease: "power3.out" },
          0.08
        )
        .to(
          greenRef.current,
          { x: 0, y: 0, rotate: ORGANIZED.green.rotate, duration: 0.45, ease: "power3.out" },
          0.12
        );
      tlRef.current = tl;
    };

    const handleLeave = () => {
      tlRef.current?.kill();
      const tl = gsap.timeline({ defaults: { force3D: true } });
      tl.to(yellowRef.current, { ...MESSY.yellow, duration: 0.32, ease: "power3.in" }, 0)
        .to(blueRef.current, { ...MESSY.blue, duration: 0.32, ease: "power3.in" }, 0.03)
        .to(pinkRef.current, { ...MESSY.pink, duration: 0.32, ease: "power3.in" }, 0.06)
        .to(greenRef.current, { ...MESSY.green, duration: 0.32, ease: "power3.in" }, 0.09);
      tlRef.current = tl;
    };

    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
      return () => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
        tlRef.current?.kill();
      };
    }

    // Touch device: trigger once when the card scrolls into view
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            handleEnter();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(card);
    return () => {
      io.disconnect();
      tlRef.current?.kill();
    };
  }, []);

  const stickyShadow =
    "0 2px 4px rgba(10,10,10,0.08), 0 14px 28px -8px rgba(10,10,10,0.20)";

  // Grid frame: 2x2 of 96px stickies with 10px gaps = 202x202 total.
  const stickyBase = "absolute w-[96px] h-[96px] p-[12px] pointer-events-none";

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <div className="relative w-[202px] h-[202px]">
        {/* Yellow — top-left slot */}
        <div
          ref={yellowRef}
          className={`${stickyBase} z-[14]`}
          style={{
            top: 0,
            left: 0,
            backgroundColor: "#fff3a3",
            boxShadow: stickyShadow,
          }}
          aria-hidden="true"
        >
          <Lines lines={3} tone="#7a6c2a" />
        </div>

        {/* Blue — top-right slot */}
        <div
          ref={blueRef}
          className={`${stickyBase} z-[12]`}
          style={{
            top: 0,
            right: 0,
            backgroundColor: "#cfe4f7",
            boxShadow: stickyShadow,
          }}
          aria-hidden="true"
        >
          <Lines lines={2} tone="#2c5b80" />
        </div>

        {/* Pink — bottom-left slot */}
        <div
          ref={pinkRef}
          className={`${stickyBase} z-[13]`}
          style={{
            bottom: 0,
            left: 0,
            backgroundColor: "#f8d6e3",
            boxShadow: stickyShadow,
          }}
          aria-hidden="true"
        >
          <Lines lines={3} tone="#8a3b62" />
        </div>

        {/* Green — bottom-right slot */}
        <div
          ref={greenRef}
          className={`${stickyBase} z-[11]`}
          style={{
            bottom: 0,
            right: 0,
            backgroundColor: "#d8ecca",
            boxShadow: stickyShadow,
          }}
          aria-hidden="true"
        >
          <Lines lines={2} tone="#3d6638" />
        </div>
      </div>
    </div>
  );
}

/** Simulated handwritten lines inside a sticky note. */
function Lines({ lines, tone }: { lines: number; tone: string }) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className="block h-[3px]"
          style={{
            backgroundColor: tone,
            opacity: 0.55,
            width: i === lines - 1 ? "66%" : "100%",
          }}
        />
      ))}
    </div>
  );
}
