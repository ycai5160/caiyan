"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const words = ["Discover", "Design", "Develop"];

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const clipRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    document.body.style.overflow = "hidden";

    // Center clip wrappers — GSAP owns transform so y composes correctly
    gsap.set(clipRefs.current, { xPercent: -50, yPercent: -50 });
    // Confirm starting position (matches the inline CSS, prevents any drift)
    gsap.set(wordRefs.current, { y: 50 });

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete() {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onStart() {
            // Fire hero entrance while curtain is still rising
            gsap.delayedCall(0.2, () =>
              window.dispatchEvent(new CustomEvent("preloader:done"))
            );
          },
          onComplete() {
            overlay.style.display = "none";
            document.body.style.overflow = "";
          },
        });
      },
    });

    // First word enters
    tl.to(wordRefs.current[0], { y: 0, duration: 0.35, ease: "power3.out" });

    for (let i = 0; i < words.length; i++) {
      const isLast = i === words.length - 1;

      // Hold
      tl.to({}, { duration: 0.55 });

      if (!isLast) {
        // Exit current
        tl.to(wordRefs.current[i], { y: -50, duration: 0.3, ease: "power2.in" });
        // Enter next — starts slightly before exit finishes
        tl.to(wordRefs.current[i + 1], { y: 0, duration: 0.35, ease: "power3.out" }, "-=0.1");
      }
    }

    tl.to({}, { duration: 0.25 });
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{ position: "fixed", inset: 0, zIndex: 9998, background: "#000" }}
    >
      {words.map((word, wi) => (
        <div
          key={word}
          ref={(el) => { clipRefs.current[wi] = el; }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            overflow: "hidden",
            lineHeight: 1,
            paddingBottom: "0.15em",
          }}
        >
          <div
            ref={(el) => { wordRefs.current[wi] = el; }}
            style={{
              fontFamily: "var(--font-sf-pro)",
              fontSize: "clamp(14px, 1.1vw, 18px)",
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              // Hidden below clip boundary on first render — prevents the 1-frame flash
              transform: "translateY(50px)",
            }}
          >
            {word}
          </div>
        </div>
      ))}
    </div>
  );
}
