"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { zh: "用户体验设计", tool: "UX research, HCI Design" },
  { zh: "UI界面设计",   tool: "Figma" },
  { zh: "网页设计",     tool: "Wordpress, Webflow" },
  { zh: "交互动效设计", tool: "AE, Protopie" },
  { zh: "设计系统构建", tool: "Figma" },
  { zh: "AI前端开发",   tool: "Claude Code, Cursor" },
  { zh: "视频剪辑制作", tool: "Premiere Pro" },
];

const SKILL_IMAGES = [
  "https://picsum.photos/seed/uxdesign/800/600",
  "https://picsum.photos/seed/uidesign/800/600",
  "https://picsum.photos/seed/webdesign/800/600",
  "https://picsum.photos/seed/interaction/800/600",
  "https://picsum.photos/seed/designsystem/800/600",
  "https://picsum.photos/seed/aidev/800/600",
  "https://picsum.photos/seed/videoediting/800/600",
];

export default function SkillsSection() {
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const listContainerRef= useRef<HTMLDivElement>(null);
  const listWrapperRef  = useRef<HTMLDivElement>(null);
  const listButtonRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const listTextRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const imageRefs            = useRef<(HTMLImageElement | null)[]>([]);
  const toolPanelRefs        = useRef<(HTMLElement | null)[]>([]);
  const mobileToolPanelRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const currentIdxRef        = useRef(0);
  const imageColRef          = useRef<HTMLDivElement>(null);
  const mobileLabelRef       = useRef<HTMLSpanElement>(null);
  const toolColRef           = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function getY(idx: number): number {
      const container = listContainerRef.current;
      const btn = listButtonRefs.current[idx];
      if (!container || !btn) return 0;
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      return container.offsetHeight / 2 - (bRect.top - cRect.top) - btn.offsetHeight / 2;
    }

    const yPositions = SKILLS.map((_, i) => getY(i));

    function setActiveState(nextIdx: number, animate = true) {
      const prevIdx = currentIdxRef.current;
      currentIdxRef.current = nextIdx;

      const prevText = listTextRefs.current[prevIdx];
      const nextText = listTextRefs.current[nextIdx];

      if (prevText) gsap.to(prevText, { opacity: 0.12, duration: 0.18, ease: "none" });
      if (nextText) {
        gsap.to(nextText, { opacity: 1, duration: 0.18, ease: "none" });
        if (!reducedMotion && animate) {
          gsap.fromTo(
            nextText,
            { scale: 0.96 },
            { scale: 1, duration: 0.28, ease: "power2.out", clearProps: "transform" }
          );
        }
      }

      gsap.to(listWrapperRef.current, {
        y: yPositions[nextIdx],
        duration: animate ? 0.28 : 0,
        ease: animate ? "power2.out" : "none",
      });

      const prevPanel = toolPanelRefs.current[prevIdx];
      const nextPanel = toolPanelRefs.current[nextIdx];
      if (prevPanel) gsap.to(prevPanel, { opacity: 0, duration: 0.18, ease: "none" });
      if (nextPanel) gsap.to(nextPanel, { opacity: 1, duration: 0.18, ease: "none" });

      const prevMobileTool = mobileToolPanelRefs.current[prevIdx];
      const nextMobileTool = mobileToolPanelRefs.current[nextIdx];
      if (prevMobileTool) gsap.to(prevMobileTool, { opacity: 0, duration: 0.18, ease: "none" });
      if (nextMobileTool) gsap.to(nextMobileTool, { opacity: 1, duration: 0.18, ease: "none" });

      const prevImg = imageRefs.current[prevIdx];
      const nextImg = imageRefs.current[nextIdx];

      if (reducedMotion) {
        if (prevImg) gsap.set(prevImg, { opacity: 0, scale: 1 });
        if (nextImg) gsap.set(nextImg, { opacity: 1, scale: 1 });
      } else {
        if (prevImg) gsap.to(prevImg, { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" });
        if (nextImg) {
          gsap.fromTo(
            nextImg,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
          );
        }
      }
    }

    // 初始态
    listTextRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0.12 });
    });
    gsap.set(listWrapperRef.current, { y: yPositions[0] });

    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1 });
    });

    toolPanelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    mobileToolPanelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    // ── Entrance animation (fires before pinning takes over) ───────────────
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: wrapperRef.current, start: "top 80%", once: true };
      gsap.from(mobileLabelRef.current,    { opacity: 0, y: 10, duration: 0.5,  ease: "power2.out", scrollTrigger: st });
      gsap.from(imageColRef.current,       { opacity: 0, y: 16, duration: 0.65, ease: "power2.out", scrollTrigger: st, delay: 0.05 });
      gsap.from(listContainerRef.current,  { opacity: 0, y: 16, duration: 0.65, ease: "power2.out", scrollTrigger: st, delay: 0.12 });
      gsap.from(toolColRef.current,        { opacity: 0,        duration: 0.5,  ease: "power2.out", scrollTrigger: st, delay: 0.18 });
    });

    ScrollTrigger.create({
      id: "skills-section",
      trigger: wrapperRef.current,
      start: "top top",
      end: `+=${SKILLS.length * 100}vh`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * SKILLS.length), SKILLS.length - 1);
        if (idx === currentIdxRef.current) return;
        setActiveState(idx, true);
      },
      onLeave: () => {
        setActiveState(SKILLS.length - 1, false);
      },
      onLeaveBack: () => {
        setActiveState(0, false);
      },
    });
  });

  return () => ctx.revert();
}, []);

  function handleSkillClick(idx: number) {
    const st = ScrollTrigger.getById("skills-section");
    if (!st) return;
    const targetScroll = st.start + (idx / SKILLS.length) * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }

  return (
    <div
      ref={wrapperRef}
      id="skills"
      className="h-screen bg-white overflow-hidden flex flex-col md:flex-row p-5 md:p-10"
    >
      {/* Mobile-only header: label + active tool name */}
      <div className="md:hidden shrink-0 flex flex-col gap-[6px] mb-4">
        <span
          ref={mobileLabelRef}
          className="text-[10px] uppercase tracking-[0.18em] text-black/35 font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          技能 / Skills
        </span>
        <div className="relative h-[14px]" style={{ fontFamily: "var(--font-mono)" }}>
          {SKILLS.map((skill, i) => (
            <span
              key={`mobile-tool-${skill.zh}`}
              ref={(el) => { mobileToolPanelRefs.current[i] = el; }}
              className="absolute left-0 text-[10px] uppercase tracking-[0.14em] text-black/25 whitespace-nowrap font-medium"
            >
              {skill.tool}
            </span>
          ))}
        </div>
      </div>

      {/* col 1: skill images — hidden on mobile */}
      <div ref={imageColRef} className="hidden md:flex flex-1 flex-col justify-center">
        <span
          className="mb-20 text-[10px] uppercase tracking-[0.18em] text-black/35 font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          技能 / Skills
        </span>
        <div className="relative w-2/3 aspect-[4/3] overflow-hidden">
          {SKILLS.map((skill, i) => (
            <img
              key={skill.zh}
              ref={(el) => { imageRefs.current[i] = el; }}
              src={SKILL_IMAGES[i]}
              alt={skill.zh}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0,
                willChange: "opacity, transform",
              }}
            />
          ))}
        </div>
      </div>

     

      {/* col 2: scrolling skill name list */}
      <div
        ref={listContainerRef}
        className="flex-1 flex items-center justify-start"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 50%, black 50%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 50%, black 50%, transparent)",
        }}
      >
        <div ref={listWrapperRef} className="flex flex-col gap-6">
          {SKILLS.map((skill, i) => (
            <button
              key={skill.zh}
              ref={(el) => { listButtonRefs.current[i] = el; }}
              onClick={() => handleSkillClick(i)}
              className="block text-left w-full"
            >
              <span
                ref={(el) => { listTextRefs.current[i] = el; }}
                className="text-[clamp(36px,9vw,72px)] font-medium tracking-[-0.05em] leading-[1.1]"
                style={{ fontFamily: "var(--font-siyuan)" }}
              >
                {skill.zh}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* col 3: tool for the active skill — hidden on mobile */}
      <div ref={toolColRef} className="hidden md:flex w-[160px] shrink-0 flex-col items-end justify-center">
        <div className="relative h-[1.5em]" style={{ fontFamily: "var(--font-mono)" }}>
          {SKILLS.map((skill, i) => (
            <span
              key={skill.zh}
              ref={(el) => { toolPanelRefs.current[i] = el; }}
              className="absolute right-0 text-[15px] font-normal text-black/55 whitespace-nowrap"
            >
              {skill.tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
