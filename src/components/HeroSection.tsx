"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// 160px button → r=55 → circumference 2π×55≈346px
// "查看简历 · View Resume · " ≈ 168px × 2 reps ≈ 336px — near-seamless fill
const ORBIT_TEXT = "查看简历 · View Resume · 查看简历 · View Resume · ";

export default function HeroSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const imageRef          = useRef<HTMLVideoElement>(null);
  const orbitBtnRef       = useRef<HTMLAnchorElement>(null);
  const headlineRef       = useRef<HTMLHeadingElement>(null);
  const topBarRef         = useRef<HTMLDivElement>(null);
  const hrRef             = useRef<HTMLHRElement>(null);
  const metaRef           = useRef<HTMLDivElement>(null);
  const descRef           = useRef<HTMLParagraphElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
      () => {
        // ── Image parallax ──────────────────────────────────────────────────
        gsap.set(imageRef.current, {
          scale: 1.3,
          transformOrigin: "center center",
          yPercent: -20,
          force3D: true,
        });
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // ── Orbit button — cursor attraction ────────────────────────────────
        // Within PULL_RADIUS px of the button center the button drifts toward
        // the cursor. quickSetter bypasses the GSAP tween pipeline — ideal for
        // per-frame property writes inside gsap.ticker.
        const setX = gsap.quickSetter(orbitBtnRef.current, "x", "px");
        const setY = gsap.quickSetter(orbitBtnRef.current, "y", "px");

        let x = 0, y = 0, tx = 0, ty = 0;
        const PULL_RADIUS = 180;

        // Cache rect — refreshed on scroll/resize only, never inside mousemove.
        let rect = orbitBtnRef.current?.getBoundingClientRect();
        const refreshRect = () => { rect = orbitBtnRef.current?.getBoundingClientRect(); };

        function onMouseMove(e: MouseEvent) {
          if (!rect) return;
          const dx = e.clientX - (rect.left + rect.width  / 2);
          const dy = e.clientY - (rect.top  + rect.height / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < PULL_RADIUS) {
            // Linear falloff — strongest at center, zero at radius boundary.
            const pull = (1 - dist / PULL_RADIUS) * 0.5;
            tx = dx * pull;
            ty = dy * pull;
          } else {
            tx = 0;
            ty = 0;
          }
        }

        function tick() {
          x += (tx - x) * 0.1;
          y += (ty - y) * 0.1;
          setX(x);
          setY(y);
        }

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("scroll",    refreshRect,  { passive: true });
        window.addEventListener("resize",    refreshRect,  { passive: true });
        gsap.ticker.add(tick);

        const orbitTween = gsap.to(orbitBtnRef.current, {
          opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2,
        });

        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("scroll",    refreshRect);
          window.removeEventListener("resize",    refreshRect);
          gsap.ticker.remove(tick);
          orbitTween.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      }
    );

    // Entry reveal — deferred until the preloader overlay has lifted, so the
    // chars animation lands on a newly-visible page instead of playing behind
    // the black overlay and leaving a static hero by the time it clears.
    const runReveal = () => mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!headlineRef.current) return;

      // Reveal h1 before SplitText so line-mask geometry is calculated correctly,
      // then chars animate up from behind their masks (opacity-0 on the wrapper
      // already prevented the pre-JS flash).
      gsap.set(headlineRef.current, { opacity: 1 });

      // Split into lines (for masks) and chars (for per-letter stagger)
      const split = new SplitText(headlineRef.current, { type: "lines,chars", mask: "lines" });

      // Extend clip 0.2em below each line mask so descenders (g, y, p…) aren't cut.
      // yPercent start = 100 + (0.2 × 100) = 120 — lines invisible at t=0 at any fluid size.
      split.masks.forEach((m) => {
        (m as HTMLElement).style.setProperty("overflow-clip-margin", "0.2em");
      });

      const tl = gsap.timeline();

      // fromTo() used throughout so GSAP ignores current CSS values and the
      // initial states are explicit — prevents the "from reads CSS-0 as
      // destination, animates 0→0" bug that occurs when CSS already hides them.
      tl.fromTo(topBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);

      // Chars start below line masks (clipped), cascade up into view
      tl.from(split.chars, {
        yPercent: 120,
        stagger: { each: 0.02, from: "start" },
        duration: 0.7,
        ease: "power3.out",
      }, 0.1);

      // HR rule expands from the left as the heading is mid-reveal
      tl.fromTo(hrRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, transformOrigin: "left center", duration: 0.6, ease: "power3.out" }, 0.55);

      // Supporting text fades up once the heading is mostly readable
      tl.fromTo(metaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.78);
      tl.fromTo(descRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.90);

      // Video container arrives last, slightly heavier lift
      tl.fromTo(videoContainerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7,  ease: "power2.out" }, 1.0);

      return () => {
        tl.kill();
        split.revert();
      };
    });

    const preloaderAlreadyDone =
      (window as unknown as { __preloaderDone?: boolean }).__preloaderDone === true;

    if (preloaderAlreadyDone) {
      runReveal();
    } else {
      window.addEventListener("preloader:done", runReveal, { once: true });
    }

    return () => {
      window.removeEventListener("preloader:done", runReveal);
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white flex flex-col overflow-hidden p-5 sm:p-10">

      {/* ── Orbit CTA — rotating text ring + magnetic cursor tracking ── */}
      {/* Hidden on mobile: mouse-only interaction, would overlap headline at small widths */}
      <a
        ref={orbitBtnRef}
        href="#"
        aria-label="查看简历 — View resume"
        className="hidden md:flex absolute top-10 right-10 z-20 w-[160px] h-[160px] items-center justify-center group cursor-pointer"
        style={{ opacity: 0 }}
      >
        {/* Text ring — continuous spin, fades on hover to let arrow breathe */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 160 160"
          aria-hidden="true"
          style={{ animation: "orbit-spin 20s linear infinite" }}
        >
          <defs>
            {/* Circle path: center (80,80), r=55 → circumference ≈ 346px */}
            <path
              id="orbit-path"
              d="M 80,80 m -55,0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
            />
          </defs>
          <text
            fill="currentColor"
            fontSize="10"
            letterSpacing="2"
            fontFamily="var(--font-siyuan)"
            className="text-black/50 transition-[color] duration-300 group-hover:text-black/20"
          >
            <textPath href="#orbit-path">{ORBIT_TEXT}</textPath>
          </text>
        </svg>

        {/* Inner circle border — tightens on hover */}
        <div className="w-[90px] h-[90px] rounded-full border border-black/[0.12] transition-[border-color] duration-300 group-hover:border-black/30" />

        {/* Arrow — fades in over the ring on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            {/* Diagonal up-right arrow */}
            <line x1="7" y1="19" x2="19" y2="7" />
            <polyline points="11,7 19,7 19,15" />
          </svg>
        </div>
      </a>

      {/* Top bar */}
      <div ref={topBarRef} className="relative z-10 flex items-center justify-between" style={{ opacity: 0 }}>
        <span
          className="text-[11px] font-medium tracking-[0.15em] text-black/35"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          蔡言 — 交互设计作品集
        </span>
        {/* Mobile resume CTA — replaces the orbit button which is hidden on mobile */}
        <a
          href="#"
          aria-label="查看简历 — View resume"
          className="md:hidden text-[10px] uppercase tracking-[0.18em] text-black/30 font-medium hover:text-black/60 transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Resume ↗
        </a>
      </div>

      {/* Headline */}
      <div className="relative mt-4 md:mt-10 z-10">
        <h1 ref={headlineRef} style={{ opacity: 0 }}>
          <span className="block pb-[0.04em] text-[clamp(36px,10vw,140px)] font-medium leading-[1.1] tracking-[-0.065em] text-black">
            UX<span aria-hidden="true" style={{ fontSize: "0.45em", verticalAlign: "0.4em", margin: "0 0.15em", opacity: 0.75 }}>✳</span>UI{" "}
            <em className="font-normal" style={{ fontFamily: "var(--font-caslon)", fontStyle: "italic" }}>
              Designer
            </em>
          </span>
          <span className="block pb-[0.04em] text-[clamp(36px,10vw,140px)] font-medium leading-[1.1] tracking-[-0.065em] text-black pl-[8%] md:pl-[12%]">
            Creative Developer
          </span>
        </h1>

        <hr ref={hrRef} className="border-none h-px mt-8 mb-4 md:mt-10 md:mb-8 bg-black/[0.08]" style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />

        <div className="flex flex-row items-start gap-4 md:justify-between md:items-end md:gap-16">
          {/* Left: narrow meta column — label + roles */}
          <div ref={metaRef} className="basis-[120px] shrink-0 md:basis-[160px] flex flex-col gap-[10px]" style={{ opacity: 0 }}>
            <span
              className="text-[10px] uppercase tracking-[0.18em] text-black/35 font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              关于我 / About
            </span>
            <div className="flex flex-col gap-[6px]">
              <span className="text-[12px] font-medium text-black/50 leading-[1.5]" style={{ fontFamily: "var(--font-siyuan)" }}>
                UX 设计师
              </span>
              <span className="text-[12px] font-medium text-black/50 leading-[1.5]" style={{ fontFamily: "var(--font-siyuan)" }}>
                网页设计师
              </span>
              <span className="text-[12px] font-medium text-black/50 leading-[1.5]" style={{ fontFamily: "var(--font-siyuan)" }}>
                多媒体设计师
              </span>
            </div>
          </div>

          {/* Right: description */}
          <p
            ref={descRef}
            className="text-[12px] text-justify leading-[1.8] text-black/70 max-w-[52ch] h-auto"
            style={{ fontFamily: "var(--font-siyuan)", opacity: 0 }}
          >
            我是一名UX/UI设计师，在视觉与交互设计上有扎实积累，同时具备前端开发视角，能与产品、工程团队高效对齐。热衷探索AI在设计流程中的应用，让创意从概念到落地既快又准。
          </p>
        </div>
      </div>

      {/* Hero video — container clips the 30% scale overflow, GSAP drives the parallax */}
      <div ref={videoContainerRef} className="relative mt-8 md:mt-10 z-10 overflow-hidden flex-1 md:flex-none" style={{ opacity: 0 }}>
        <video
          ref={imageRef}
          src="/video/final comp_1.mp4"
          poster="/video/fallback_img.png"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 md:relative md:inset-auto w-full h-full md:h-auto object-cover block will-change-transform"
        />
      </div>

    </section>
  );
}
