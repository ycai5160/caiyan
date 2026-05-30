"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function UxCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tipXRef = useRef<((v: number) => gsap.core.Tween) | null>(null);
  const tipYRef = useRef<((v: number) => gsap.core.Tween) | null>(null);

  useEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;
    gsap.set(el, { x: -9999, y: -9999, opacity: 0, scale: 0.96 });
    tipXRef.current = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    tipYRef.current = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
  }, []);

  const handleTipEnter = (e: React.MouseEvent) => {
    const el = tooltipRef.current;
    if (!el) return;
    gsap.set(el, { x: e.clientX, y: e.clientY });
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.22, ease: "power3.out" });
  };

  const handleTipMove = (e: React.MouseEvent) => {
    tipXRef.current?.(e.clientX);
    tipYRef.current?.(e.clientY);
  };

  const handleTipLeave = () => {
    const el = tooltipRef.current;
    if (!el) return;
    gsap.to(el, { opacity: 0, scale: 0.96, duration: 0.18, ease: "power3.out" });
  };

  useGSAP(
    () => {
      gsap.from("[data-ux-fade]", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="product"
      className="container-x"
      style={{
        paddingTop: "0",
        paddingBottom: "var(--space-section-lg)",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-12"
        style={{ columnGap: "var(--space-grid-gutter)", rowGap: "var(--space-stack-lg)" }}
      >
        {/* Left: text — clear 4-step hierarchy */}
        <div className="md:col-span-5 flex flex-col">
          {/* Section badge — Notion blue tag */}
          <span
            data-ux-fade
            className="self-start inline-flex items-center px-2.5 py-0.5 rounded-full tag-blue text-[12px] font-medium"
          >
            01 产品设计
          </span>

          {/* Title row — title left, year right (same pattern as section 02) */}
          <div className="mt-14 md:mt-20 flex items-baseline justify-between gap-4">
            <Link
              data-ux-fade
              href="/work/subflow"
              className="group inline-flex items-center gap-2 text-fg text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] leading-[1.25]"
            >
              <span className="relative">
                Subflow／AI 字幕编辑工具
                {/* Very transparent base underline */}
                <span
                  className="absolute left-0 right-0 -bottom-1 h-px bg-fg/15"
                  aria-hidden="true"
                />
                {/* Fill underline — sweeps in from left on hover */}
                <span
                  className="absolute left-0 right-0 -bottom-1 h-px bg-fg origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                  aria-hidden="true"
                />
              </span>
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </Link>
            <p
              data-ux-fade
              className="text-muted text-[12px] md:text-[13px] shrink-0"
            >
              2026
            </p>
          </div>

          {/* Description — body */}
          <p
            data-ux-fade
            className="text-secondary text-[14px] md:text-[15px] leading-[1.85] mt-7 md:mt-9 max-w-[58ch]"
          >
            聚焦视频创作者AI字幕工作流的独立UX案例研究，项目产出包括用户研究、洞察提取、问题定义及交互方案设计。使用Claude Code将核心流程转化为高保真可交互原型。
          </p>
        </div>

        {/* Right: thumbnail */}
        <div className="md:col-span-7 min-w-0">
          <Link
            data-ux-fade
            href="/work/subflow"
            aria-label="Subflow — AI 字幕编辑工具"
            className="card-lift block w-full"
            onMouseEnter={handleTipEnter}
            onMouseMove={handleTipMove}
            onMouseLeave={handleTipLeave}
          >
            <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-surface border border-edge shadow-window">
              <Image
                src="/New_uxcase.png"
                alt="Subflow — AI 字幕编辑工具"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Cursor-tracking tooltip — light chip on Subflow image hover */}
      <div
        ref={tooltipRef}
        className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div className="ml-3 mt-3 px-3 py-1.5 rounded-md bg-bg text-fg text-[11px] font-medium tracking-[-0.01em] whitespace-nowrap inline-flex items-center gap-1.5 border border-edge shadow-window">
          Click to open
          <svg
            viewBox="0 0 24 24"
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
