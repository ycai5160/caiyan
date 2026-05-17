"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const metaRows = [
  { label: "Keywords", value: "视频剪辑 · 内容创作 · AI 工具", flex: false },
  { label: "Role",     value: "用户研究 · 产品设计",            flex: false },
  { label: "Scope",    value: "MVP",            flex: false },
  { label: "Year",     value: "2026",                          flex: false },
  {
    label: "Overview",
    value: `Subflow 是一款专为视频创作者打造的 AI 字幕工具，通过置信度可视化与交互优化解决转录校对痛点。它实现了高精度转录与专业样式控制的深度融合，助力创作者高效完成字幕全链路工作流。`,
    flex: true,
  },
];

const LABEL = "UX Design";

export default function UxCaseStudy() {
  const sectionRef     = useRef<HTMLElement>(null);
  const imageRef       = useRef<HTMLDivElement>(null);
  const accentRef      = useRef<HTMLParagraphElement>(null);
  const projectTitleRef = useRef<HTMLParagraphElement>(null);
  const metaRowsRef    = useRef<HTMLDivElement[]>([]);
  const labelChars     = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const chars = labelChars.current;
    const rows  = metaRowsRef.current;

    gsap.set(chars,  { y: "115%" });
    gsap.set([accentRef.current, projectTitleRef.current], { y: 24, opacity: 0 });
    gsap.set(rows,   { y: 20, opacity: 0 });
    // clipPath wipe: no layout reflow, GPU-composited, reveals top→bottom
    gsap.set(imageRef.current, { clipPath: "inset(0 0 100% 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl
      .to(imageRef.current, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut" }, 0)
      .to(chars, { y: 0, stagger: 0.04, duration: 0.7, ease: "power3.out" }, 0)
      .to([accentRef.current, projectTitleRef.current], {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power2.out",
      }, 0.15)
      .to(rows, { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: "power2.out" }, 0.3);
  }, { scope: sectionRef });

  labelChars.current  = [];
  metaRowsRef.current = [];

  return (
    <section
      ref={sectionRef}
      id="ux"
      className="relative w-full flex flex-col md:flex-row md:h-screen md:min-h-[600px] gap-10 md:gap-12 lg:gap-16 px-6 py-10 md:p-16 lg:py-20 bg-bg"
    >
      {/* Left: image */}
      <div
        ref={imageRef}
        className="aspect-[4/3] w-full md:aspect-auto md:flex-1 md:h-auto min-w-0 overflow-hidden relative"
      >
        <Image
          src="/New_uxcase.png"
          alt="Subflow — UX case study"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Right: content */}
      <div className="md:flex-1 min-w-0 flex flex-col justify-between relative">

        {/* Section label */}
        <div className="flex flex-col gap-1">
          <p
            className="font-bold leading-[1] text-surface text-[clamp(36px,6vw,70px)] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            {[...LABEL].map((char, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span
                  ref={(el) => { if (el) labelChars.current.push(el); }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? " " : char}
                </span>
              </span>
            ))}
          </p>
          <p
            ref={accentRef}
            className="font-bold leading-5 text-accent text-[13px] md:text-[16px] tracking-[0.3rem]"
            style={{ fontFamily: "var(--font-siyuan)" }}
          >
            个人 UX 设计项目
          </p>
        </div>

        {/* Project detail */}
        <div className="flex flex-col gap-5 md:gap-6 mt-8 md:mt-0">
          <p
            ref={projectTitleRef}
            className="font-bold text-[clamp(20px,3.5vw,40px)] text-fg tracking-[-0.8px] leading-tight"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            Subflow／AI 字幕生成与编辑工具
          </p>

          <div className="flex flex-col">
            {metaRows.map((row, i) => (
              <div
                key={row.label}
                ref={(el) => { if (el) metaRowsRef.current.push(el); }}
                className={`flex items-start py-2.5 md:py-3 border-b border-edge ${i === 0 ? "border-t" : ""}`}
              >
                <div className="shrink-0 w-24 md:w-32 lg:w-40">
                  <span
                    className="text-muted text-[12px] md:text-[14px] tracking-[-0.32px]"
                    style={{ fontFamily: "var(--font-sf-pro)" }}
                  >
                    {row.label}
                  </span>
                </div>
                <span
                  className={`text-fg text-[12px] md:text-[13px] lg:text-[14px] tracking-[-0.28px] leading-relaxed ${row.flex ? "flex-1 min-w-0" : ""}`}
                  style={{ fontFamily: "var(--font-siyuan)" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/work/subflow"
            className="self-start mt-6 md:mt-8 inline-flex items-center gap-2 text-accent text-[13px] md:text-[14px] tracking-[-0.2px] hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            View Case Study
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
