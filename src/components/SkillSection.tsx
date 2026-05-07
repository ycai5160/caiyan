"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import StaggerLink, { type StaggerLinkHandle } from "./StaggerLink";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { heading: "Discover", tags: ["User research", "Insight", "Strategy"] },
  { heading: "Design",   tags: ["Figma", "Webflow", "After Effects", "Illustrator", "Protopie"] },
  { heading: "Develop",  tags: ["Claude Code", "Cursor", "HTML&CSS", "Next.js"] },
];

const LABEL = "What I do";

export default function SkillSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelChars = useRef<HTMLSpanElement[]>([]);
  const accentRef  = useRef<HTMLParagraphElement>(null);
  const rowsRef      = useRef<HTMLDivElement[]>([]);
  const staggerRefs  = useRef<(StaggerLinkHandle | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const chars = labelChars.current;
    const rows  = rowsRef.current;

    gsap.set(chars, { y: "115%" });
    gsap.set(accentRef.current, { y: 16, opacity: 0 });
    gsap.set(rows,  { y: 24, opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    })
      .to(chars, { y: 0, stagger: 0.04, duration: 0.7, ease: "power3.out" }, 0)
      .to(accentRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.1)
      .to(rows, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power2.out" }, 0.2);
  }, { scope: sectionRef });

  labelChars.current   = [];
  rowsRef.current      = [];
  staggerRefs.current  = [];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full flex flex-col py-16 md:py-32 bg-bg"
    >
     

      {/* Rows */}
      <div className="px-6 md:px-10 lg:px-16">
        {skills.map((skill, i) => (
          <div
            key={skill.heading}
            ref={(el) => { if (el) rowsRef.current.push(el); }}
            className="group relative flex flex-col gap-3 py-4 md:flex-row md:items-end md:justify-between md:py-3"
            onMouseEnter={() => staggerRefs.current[i]?.enter()}
            onMouseLeave={() => staggerRefs.current[i]?.leave()}
          >
            {/* base divider */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-edge" aria-hidden="true" />
            {/* fill sweep */}
            <span
              className="absolute bottom-0 left-0 w-full h-px bg-fg/25 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
              aria-hidden="true"
            />

            <p
              className="font-bold leading-[1.1] text-muted group-hover:text-white tracking-[-0.02em] text-[clamp(52px,8vw,96px)] transition-colors duration-300"
              style={{ fontFamily: "var(--font-sf-pro)" }}
            >
              <StaggerLink
                ref={(el) => { staggerRefs.current[i] = el; }}
                style={{ fontFamily: "var(--font-sf-pro)" }}
                disableSelfHover
              >
                {skill.heading}
              </StaggerLink>
            </p>
            <div className="flex flex-wrap gap-2 items-start md:pb-2 md:justify-end md:max-w-[50%]">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-[6px] py-1 rounded-full border border-edge-md text-muted text-[12px] md:text-[13px] tracking-[-0.02em] whitespace-nowrap transition-colors duration-300 group-hover:text-fg group-hover:border-fg/30"
                  style={{ fontFamily: "var(--font-sf-pro)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
