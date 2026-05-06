"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const metaRows = [
  { label: "Keywords", value: "视频剪辑 · 内容创作 · AI 工具", flex: false },
  { label: "Role",     value: "用户研究 · 产品设计",            flex: false },
  { label: "Scope",    value: "端到端 · 面向消费者",            flex: false },
  { label: "Year",     value: "2026",                          flex: false },
  {
    label: "Overview",
    value: `AI 转写工具普遍止步于"生成"，校对与样式统一仍需大量人工介入。通过用户访谈与工作流分析，识别核心痛点，围绕文本—时间轴联动编辑、模型置信度可视化、术语库与预设复用展开设计，覆盖从转写生成到多格式导出的完整链路。`,
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
          src="/ux_case.webp"
          alt="Subtle — UX case study"
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
            个人端对端 UX 设计项目
          </p>
        </div>

        {/* Project detail */}
        <div className="flex flex-col gap-5 md:gap-6 mt-8 md:mt-0">
          <p
            ref={projectTitleRef}
            className="font-bold text-[clamp(20px,3.5vw,40px)] text-fg tracking-[-0.8px] leading-tight"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            Subtle／视频字幕转写与编辑平台
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
        </div>
      </div>
    </section>
  );
}
