"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_IMAGE = "/UX case image.png";

const DESCRIPTION =
  "AI 加速了工作的第一步，却没有同比降低整体审核负担。自动生成的初稿制造了一种已完成的错觉，反而使后续的人工复核显得更加枯燥。本项目旨在设计一款专用工作台，弥合 ASR 原始输出与可交付字幕成品之间的落差。";

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const tween = gsap.fromTo(
      cardRef.current,
      { scale: 0.8, borderRadius: 64 },
      {
        scale: 1,
        borderRadius: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 0.8,
        },
      }
    );

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Black card — scales 0.5 → 1 and un-rounds from 32px → 0 as the section scrolls through */}
      <div
        ref={cardRef}
        className="w-full h-full bg-black text-white p-5 sm:p-8 md:p-20 flex flex-col justify-between md:flex-row overflow-hidden will-change-transform"
        style={{ transform: "scale(0.5)", borderRadius: 32, transformOrigin: "center center" }}
      >

        {/* Left: content column — top headline, bottom project details */}
        <div className="md:basis-[46%] md:shrink-0 flex flex-col gap-8 md:gap-0 md:justify-between">

          {/* Top: display headline + project tag */}
          <div className="flex flex-col gap-6">

            {/* Stacked display headline */}
            <div
              className="font-medium leading-[0.86] tracking-[-0.055em] text-white"
              style={{ fontSize: "clamp(44px, 9.5vw, 130px)" }}
            >
              <div>UX<span className="text-white/[0.14]">/</span></div>
              <div>Design</div>
            </div>

            {/* Project tag row — thin rule + index label + category */}
            <div className="border-t border-white/[0.08] pt-5 flex items-center">
              <span
                className="text-[10px] uppercase tracking-[0.24em] text-white/25 font-medium shrink-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Selected Works
              </span>
              <span
                className="text-[14px] text-white/45 ml-6 md:ml-[72px]"
                style={{ fontFamily: "var(--font-siyuan)" }}
              >
                个人端对端 UX 设计项目
              </span>
            </div>
          </div>

          {/* Bottom: project name + description + metadata */}
          <div className="flex flex-col gap-8">

            {/* Project name + description — tightly coupled as one editorial block */}
            <div className="flex flex-col gap-4">
              <div
                className="text-[20px] md:text-[32px] font-medium leading-[1.15] tracking-[-0.025em]"
                style={{ fontFamily: "var(--font-siyuan)" }}
              >
                <span className="text-white">Subtle</span>
                <span className="text-white/[0.18] mx-[2px]">／</span>
                <span className="text-white/70">视频字幕转写与编辑平台</span>
              </div>

              <p
                className="text-[12.5px] leading-[1.8] text-white/35 max-w-[466px]"
                style={{ fontFamily: "var(--font-siyuan)" }}
              >
                {DESCRIPTION}
              </p>
            </div>

            {/* Metadata — Role / Scope / Year */}
            <div className="border-t border-white/[0.08] pt-5 flex gap-8">
              <div className="flex flex-col gap-[6px]">
                <span
                  className="text-[10px] uppercase tracking-[0.22em] text-white/[0.18] font-medium"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Role
                </span>
                <span className="text-[12.5px] text-white/70">
                  UX Researcher · Designer
                </span>
              </div>
              <div className="flex flex-col gap-[6px]">
                <span
                  className="text-[10px] uppercase tracking-[0.22em] text-white/[0.18] font-medium"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Scope
                </span>
                <span className="text-[12.5px] text-white/70">
                  End-to-End · toC
                </span>
              </div>
              <div className="flex flex-col gap-[6px]">
                <span
                  className="text-[10px] uppercase tracking-[0.22em] text-white/[0.18] font-medium"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Year
                </span>
                <span className="text-[12.5px] text-white/70 uppercase">
                  2025 — 26
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: product mockup — landscape crop on mobile, full-height portrait on desktop */}
        <div className="w-full aspect-[16/9] shrink-0 overflow-hidden md:w-auto md:h-full md:aspect-[3/4]">
          <img
            src={PROJECT_IMAGE}
            alt="Subtle 视频字幕转写编辑平台 — 产品界面截图"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
