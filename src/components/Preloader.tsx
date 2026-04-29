"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WORDS = ["Design.", "Motion.", "AI Coding."] as const;

export default function Preloader() {
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const words = wordRefs.current.filter((n): n is HTMLSpanElement => !!n);
    const root = rootRef.current;
    if (!root || words.length !== WORDS.length) {
      document.body.style.overflow = prevOverflow;
      return;
    }

    const finish = () => {
      setDone(true);
      document.body.style.overflow = prevOverflow;
      // Signal consumers (e.g. HeroSection) that the page is now visible
      // and they can start their entry animations. Flag covers the case
      // where a listener attaches after this fires.
      (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
      window.dispatchEvent(new CustomEvent("preloader:done"));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(words, { yPercent: -100 });
      gsap.set(words[words.length - 1], { yPercent: 0 });
      gsap.set(maskRef.current, { opacity: 1 });
      const t = window.setTimeout(finish, 350);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = prevOverflow;
      };
    }

    gsap.set(words, { yPercent: 100 });
    // Mask renders with opacity:0 to hide the "all words stacked at center"
    // first frame before gsap.set positions them below — reveal it now that
    // the positions are correct.
    gsap.set(maskRef.current, { opacity: 1 });

    // Exit and entry are sequential (not overlapped): word N must fully leave
    // the mask before word N+1 starts entering, otherwise bottom-of-prev and
    // top-of-next are both partially visible inside the mask at once.
    const IN_DUR = 0.45;
    const OUT_DUR = 0.35;
    const HOLD = 0.55;

    const tl = gsap.timeline({ onComplete: finish, defaults: { overwrite: "auto" } });

    tl.to(words[0], { yPercent: 0, duration: IN_DUR, ease: "power3.out" });
    tl.to(words[0], { yPercent: -100, duration: OUT_DUR, ease: "power3.in" }, `+=${HOLD}`);

    tl.to(words[1], { yPercent: 0, duration: IN_DUR, ease: "power3.out" });
    tl.to(words[1], { yPercent: -100, duration: OUT_DUR, ease: "power3.in" }, `+=${HOLD}`);

    tl.to(words[2], { yPercent: 0, duration: IN_DUR, ease: "power3.out" });

    tl.to(root, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, `+=${HOLD + 0.1}`);

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="false"
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
    >
     

      {/* Word mask — single line, words slide through vertically */}
      <div
        ref={maskRef}
        role="status"
        aria-live="polite"
        className="relative w-full overflow-hidden"
        style={{ height: "1.4em", fontSize: "16px", fontFamily: "var(--font-jakarta)", opacity: 0 }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center font-medium tracking-[0.05em] leading-[1.4]  will-change-transform"
          >
            {word}
          </span>
        ))}
      </div>

    
    </div>
  );
}
