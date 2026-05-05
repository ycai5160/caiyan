"use client";

import { CSSProperties, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Pill { label: string; style: CSSProperties; }

const skills: { word: string; pills: Pill[] }[] = [
  {
    word: "Discover",
    pills: [
      { label: "User Research",   style: { top: "-52px",    left: "-210px" } },
      { label: "Journey Mapping", style: { top: "-44px",    right: "-220px" } },
      { label: "Usability Study", style: { bottom: "-48px", left: "-190px" } },
      { label: "A/B Testing",     style: { bottom: "-32px", right: "-160px" } },
    ],
  },
  {
    word: "Design",
    pills: [
      { label: "Figma",         style: { top: "-56px",    left: "-155px" } },
      { label: "Protopie",      style: { top: "-44px",    right: "-165px" } },
      { label: "After Effects", style: { bottom: "-50px", left: "-185px" } },
      { label: "Motion Design", style: { bottom: "-34px", right: "-195px" } },
    ],
  },
  {
    word: "Develop",
    pills: [
      { label: "React / Next.js", style: { top: "-52px",    left: "-210px" } },
      { label: "TypeScript",      style: { top: "-40px",    right: "-175px" } },
      { label: "GSAP",            style: { bottom: "-48px", left: "-125px" } },
      { label: "Tailwind CSS",    style: { bottom: "-32px", right: "-185px" } },
    ],
  },
];

const N = skills.length;

export default function SkillSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef     = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const pillsRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!pinRef.current || !listRef.current) return;

    const itemEls = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const pillEls = pillsRefs.current.filter(Boolean) as HTMLDivElement[];
    const itemH   = itemEls[0]?.offsetHeight ?? 160;
    // Half the total list height minus one item: centers item[0] at start, item[N-1] at end
    const span    = ((N - 1) * itemH) / 2;

    // ── Initial states ────────────────────────────────────────────────────────
    gsap.set(listRef.current, { y: span });
    gsap.set(itemEls[0], { opacity: 1, color: "#f43e0c", scale: 1.05 });
    itemEls.slice(1).forEach((el) => gsap.set(el, { opacity: 0.3, color: "#ffffff", scale: 1 }));
    gsap.set(pillEls[0], { opacity: 1, y: 0 });
    pillEls.slice(1).forEach((el) => gsap.set(el, { opacity: 0, y: 12 }));

    // ── Master timeline ───────────────────────────────────────────────────────
    const tl = gsap.timeline();

    // Continuous list slide: span → -span over N-1 seconds
    tl.to(listRef.current, { y: -span, ease: "none", duration: N - 1 }, 0);

    // Per-step transitions placed at t = i (each step 1 s long)
    for (let i = 0; i < N - 1; i++) {
      tl
        .to(itemEls[i],     { opacity: 0.3, color: "#ffffff", scale: 1,    duration: 1 }, i)
        .to(itemEls[i + 1], { opacity: 1,   color: "#f43e0c", scale: 1.05, duration: 1 }, i)
        .to(pillEls[i],     { opacity: 0,   y: 12,            duration: 1 }, i)
        .to(pillEls[i + 1], { opacity: 1,   y: 0,             duration: 1 }, i);
    }

    // ── ScrollTrigger ─────────────────────────────────────────────────────────
    ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${N * window.innerHeight}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      animation: tl,
      snap: {
        snapTo: 1 / (N - 1),
        duration: { min: 0.2, max: 0.6 },
        ease: "power2.inOut",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black w-full">
      <div ref={pinRef} className="h-screen flex items-center justify-center overflow-hidden">
        <div ref={listRef} className="flex flex-col items-center">
          {skills.map((skill, i) => (
            <div
              key={skill.word}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="relative flex items-center justify-center"
            >
              <p
                className="font-bold whitespace-nowrap select-none"
                style={{
                  fontFamily:    "var(--font-sf-pro)",
                  fontSize:      "clamp(64px, 10vw, 128px)",
                  letterSpacing: "-0.02em",
                  lineHeight:    1.25,
                }}
              >
                {skill.word}
              </p>

              {/* Floating skill pills */}
              <div
                ref={(el) => { pillsRefs.current[i] = el; }}
                className="absolute inset-0 pointer-events-none"
              >
                {skill.pills.map((pill) => (
                  <div
                    key={pill.label}
                    className="absolute flex items-center bg-black border border-[#2a2a2a] rounded-full px-3 py-1.5 whitespace-nowrap"
                    style={pill.style}
                  >
                    <span
                      className="text-white text-[13px] font-medium"
                      style={{ fontFamily: "var(--font-sf-pro)" }}
                    >
                      {pill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
