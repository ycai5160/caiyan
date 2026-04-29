"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROJECTS = [
  { id: 1, en: "Brandform", zh: "SaaS 落地页",     tag: "Web Design" },
  { id: 2, en: "Meridian",  zh: "电商体验设计",    tag: "E-Commerce" },
  { id: 3, en: "Pulse",     zh: "数据仪表盘",      tag: "Dashboard" },
  { id: 4, en: "Canvas",    zh: "创意工作室主页",  tag: "Agency" },
  { id: 5, en: "Aperture",  zh: "摄影作品集",      tag: "Portfolio" },
  { id: 6, en: "Cadence",   zh: "播客节目站点",    tag: "Editorial" },
];

const GAP = 24;

function getVisibleCount(w: number) {
  if (w >= 1024) return 4;
  if (w >= 768) return 2;
  return 1.15;
}

export default function WebDesignSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const labelRowRef = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [index, setIndex]               = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [cardWidth, setCardWidth]       = useState(0);
  const [isDragging, setIsDragging]     = useState(false);

  const indexRef        = useRef(0);
  const cardWidthRef    = useRef(0);
  const visibleCountRef = useRef(4);
  const xRef            = useRef(0);
  const setXRef         = useRef<(v: number) => void>(() => {});
  const dragStartX      = useRef(0);
  const dragStartTx     = useRef(0);
  const draggingRef     = useRef(false);
  const tweenRef        = useRef<gsap.core.Tween | null>(null);

  const floorVC = Math.floor(visibleCount);
  const maxIndex = Math.max(0, PROJECTS.length - floorVC);

  // ── Scroll-triggered entrance animations ──────────────────────────────
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: sectionRef.current!, start: "top 75%", once: true };

      gsap.from(labelRowRef.current, { opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: st });

      const split = new SplitText(headingRef.current, { type: "lines,chars", mask: "lines" });
      split.masks.forEach(m => (m as HTMLElement).style.setProperty("overflow-clip-margin", "0.2em"));
      gsap.from(split.chars, {
        yPercent: 120, stagger: { each: 0.02, from: "start" }, duration: 0.7, ease: "power3.out",
        scrollTrigger: st, delay: 0.1,
      });

      gsap.from(viewportRef.current, { opacity: 0, y: 16, duration: 0.65, ease: "power2.out", scrollTrigger: st, delay: 0.3 });
      gsap.from(controlsRef.current, { opacity: 0,        duration: 0.5,  ease: "power2.out", scrollTrigger: st, delay: 0.45 });

      return () => { split.revert(); };
    });

    return () => mm.revert();
  }, []);

  // ── Initialize GSAP setter once ────────────────────────────────────────
  useEffect(() => {
    if (!trackRef.current) return;
    setXRef.current = gsap.quickSetter(trackRef.current, "x", "px") as (v: number) => void;
  }, []);

  // ── Measure viewport & compute card width ──────────────────────────────
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const vc = getVisibleCount(window.innerWidth);
      const vw = viewport.clientWidth;
      const cw = (vw - GAP * (vc - 1)) / vc;

      visibleCountRef.current = vc;
      cardWidthRef.current    = cw;
      setVisibleCount(vc);
      setCardWidth(cw);

      // Re-clamp index and snap track to new position
      const newMax  = Math.max(0, PROJECTS.length - Math.floor(vc));
      const clamped = Math.min(indexRef.current, newMax);
      indexRef.current = clamped;
      setIndex(clamped);

      const x = -clamped * (cw + GAP);
      xRef.current = x;
      setXRef.current(x);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    window.addEventListener("resize", measure);

    // Let carousel layout settle, then recalculate any ScrollTriggers
    // that may have been created before the track had its final height.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Snap to a specific index ────────────────────────────────────────────
  const tweenTo = useCallback((target: number) => {
    const max     = Math.max(0, PROJECTS.length - Math.floor(visibleCountRef.current));
    const clamped = Math.max(0, Math.min(target, max));
    const step    = cardWidthRef.current + GAP;
    const destX   = -clamped * step;

    indexRef.current = clamped;
    setIndex(clamped);

    tweenRef.current?.kill();
    const proxy = { x: xRef.current };
    tweenRef.current = gsap.to(proxy, {
      x: destX,
      duration: 0.55,
      ease: "power3.out",
      onUpdate: () => {
        xRef.current = proxy.x;
        setXRef.current(proxy.x);
      },
    });
  }, []);

  // ── Pointer drag ───────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    trackRef.current.setPointerCapture(e.pointerId);
    tweenRef.current?.kill();
    draggingRef.current = true;
    setIsDragging(true);
    dragStartX.current  = e.clientX;
    dragStartTx.current = xRef.current;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const step = cardWidthRef.current + GAP;
    const max  = Math.max(0, PROJECTS.length - Math.floor(visibleCountRef.current));
    const minX = -max * step;
    const maxX = 0;

    let x = dragStartTx.current + (e.clientX - dragStartX.current);
    if (x > maxX) x = maxX + (x - maxX) * 0.35;
    if (x < minX) x = minX + (x - minX) * 0.35;

    xRef.current = x;
    setXRef.current(x);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (trackRef.current?.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
    const step    = cardWidthRef.current + GAP;
    const nearest = Math.round(-xRef.current / step);
    tweenTo(nearest);
  };

  const prev = () => tweenTo(indexRef.current - 1);
  const next = () => tweenTo(indexRef.current + 1);

  const totalPages  = Math.max(1, PROJECTS.length - floorVC + 1);
  const currentPage = index + 1;

  return (
    <section
      ref={sectionRef}
      id="webdesign"
      className="relative min-h-screen bg-white flex flex-col p-5 sm:p-8 lg:p-10 justify-center"
    >
      {/* Label row — mirrors ProjectSection's editorial header */}
      <div ref={labelRowRef} className="border-t border-black/[0.08] pt-5 flex items-center justify-between mb-6 md:mb-10">
        <span
          className="text-[10px] uppercase tracking-[0.24em] text-black/30 font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Selected Works
        </span>
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-medium tracking-[-0.035em] leading-[1.05] mb-8 md:mb-14 text-black"
        style={{ fontSize: "clamp(32px, 5.5vw, 72px)", fontFamily: "var(--font-siyuan)" }}
      >
        网页设计作品
      </h2>

      {/* Carousel viewport */}
      <div ref={viewportRef} className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex gap-6 select-none touch-pan-y"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="shrink-0"
              style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
            >
              <div className="bg-black/[0.06] rounded-2xl overflow-hidden aspect-[3/4] mb-4" />
              <p
                className="text-[10px] uppercase tracking-[0.16em] text-black/30 font-medium mb-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {p.tag}
              </p>
              <p className="text-[15px] font-medium tracking-tight text-black leading-snug">
                {p.en}
              </p>
              <p
                className="text-[13px] text-black/40 leading-snug mt-0.5"
                style={{ fontFamily: "var(--font-siyuan)" }}
              >
                {p.zh}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div ref={controlsRef} className="mt-8 md:mt-12 flex items-center justify-between">
        <span
          className="text-[11px] tracking-[0.18em] text-black/45"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {String(currentPage).padStart(2, "0")} — {String(totalPages).padStart(2, "0")}
        </span>

        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={index <= 0}
            aria-label="Previous project"
            className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-200 hover:bg-black hover:text-white hover:border-black disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:border-black/15 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L3.5 7l5.5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next project"
            className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-200 hover:bg-black hover:text-white hover:border-black disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:border-black/15 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 2l5.5 5L5 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
