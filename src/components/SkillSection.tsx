"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefineFrame from "./DefineFrame";
import DesignFrame from "./DesignFrame";
import DevelopFrame from "./DevelopFrame";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  label: string;
  title: string;
  image?: string;
  visual?: React.ReactNode;
};

const cards: Card[] = [
  { label: "RESEARCH",       title: "用户研究与问题定义",          visual: <DefineFrame /> },
  { label: "DESIGN",         title: "产品流程与界面设计",          visual: <DesignFrame /> },
  { label: "AI PROTOTYPING", title: "AI 驱动高保真交互原型搭建", visual: <DevelopFrame /> },
];

export default function SkillSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-core-fade]", {
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
      gsap.from("[data-core-card]", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-core-grid]",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="container-x"
      style={{
        paddingTop: "var(--space-section-md)",
        paddingBottom: "var(--space-section-lg)",
      }}
    >
      <div className="flex flex-col items-center">
        {/* Section thesis — centered */}
        <h2
          data-core-fade
          className="text-fg text-[28px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.2] text-center"
        >
          从产品思考到AI交互原型
        </h2>

        {/* 3 equal horizontal cards — centered, capped on ultrawide screens */}
        <div
          data-core-grid
          className="grid grid-cols-1 md:grid-cols-3 mt-14 md:mt-20 w-full max-w-[1180px]"
          style={{ gap: "var(--space-bento-gap)" }}
        >
          <BentoCard data={cards[0]} />
          <BentoCard data={cards[1]} />
          <BentoCard data={cards[2]} />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  data,
  className = "",
}: {
  data: Card;
  className?: string;
}) {
  return (
    <div
      data-core-card
      className={`shadow-window relative flex flex-col rounded-md bg-surface min-h-[320px] ${className}`}
    >
      {/* Top band — English eyebrow over Chinese title (clear hierarchy) */}
      <div className="flex flex-col gap-1 px-5 py-4 md:px-6 md:py-5">
        <span
          className="text-muted text-[11px] md:text-[12px] tracking-[0.08em] uppercase"
        >
          {data.label}
        </span>
        <span
          className="text-fg text-[16px] md:text-[18px] font-semibold tracking-[-0.01em] leading-[1.3]"
        >
          {data.title}
        </span>
      </div>

      {/* Visual area — padding lives here so all three frames share it */}
      <div className="relative flex-1 p-6 pb-12 md:p-8 md:pb-16">
        {data.visual ??
          (data.image && (
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 30vw, 22vw"
              className="object-cover"
            />
          ))}
      </div>
    </div>
  );
}
