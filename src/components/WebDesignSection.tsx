"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LABEL = "Web Design";

const projects = [
  { slug: "sopu",        title: "Solara Processing Unit", subtitle: "", thumbnail: "/thumbnail_sopu.webp",       url: "https://designer789.github.io/SoPU/" },
  { slug: "infolaunch",  title: "Info.Launch",            subtitle: "", thumbnail: "/thumbnail_infolaunch.webp", url: "https://www.infolaunch.vip/" },
  { slug: "privai",      title: "PrivAI",                 subtitle: "", thumbnail: "/thumbnail_privai.webp",     url: "https://priv-ai-phi.vercel.app/" },
  { slug: "lolforge",    title: "lol.Forge",              subtitle: "", thumbnail: "/thumbnail_lolforge.webp",   url: "https://lolforge.vercel.app/" },
  { slug: "ocularai",    title: "OCULARAI",               subtitle: "", thumbnail: "/thumbnail_ocularai.webp",   url: "https://ocular-ai.vercel.app/" },
  { slug: "rankchain",   title: "RankChain",              subtitle: "", thumbnail: "/thumbnail_rankchain.webp",  url: "https://rankchainv3.vercel.app/" },
  { slug: "metai",       title: "Met.AI",                 subtitle: "", thumbnail: "/thumbnail_metai.webp",      url: "https://www.metcoin.xyz/" },
  { slug: "pulse",       title: "Pulse",                  subtitle: "", thumbnail: "/thumbnail_pulse.webp",      url: "https://designer789.github.io/Pulse/" },
  { slug: "sonicai",     title: "Sonic AI",               subtitle: "", thumbnail: "/thumbnail_sonicai.webp",    url: "https://designer789.github.io/Sonic-AI/" },
  { slug: "credhub",     title: "Cred.Hub",               subtitle: "", thumbnail: "/thumbnail_credhub.webp",    url: "https://www.credhub.xyz/" },
];

function Crosshair({ className }: { className: string }) {
  return (
    <div className={`absolute w-3 h-3 ${className}`} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <line x1="6" y1="0"  x2="6" y2="12" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <line x1="0" y1="6" x2="12"  y2="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function WebDesignSection() {
  const [realIndex, setRealIndex] = useState(0);
  const swiperRef   = useRef<SwiperClass | null>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const labelChars  = useRef<HTMLSpanElement[]>([]);
  const accentRef   = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const active      = projects[realIndex % projects.length];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const chars = labelChars.current;
    gsap.set(chars, { y: "115%" });
    gsap.set([accentRef.current, carouselRef.current, controlsRef.current], { y: 20, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    })
      .to(chars, { y: 0, stagger: 0.04, duration: 0.7, ease: "power3.out" }, 0)
      .to(accentRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.1)
      .to(carouselRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2)
      .to(controlsRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3);
  }, { scope: sectionRef });

  labelChars.current = [];

  return (
    <section
      ref={sectionRef}
      id="web"
      className="relative w-full flex flex-col py-16 md:py-32 bg-bg"
    >
      {/* Section label */}
      <div className="flex flex-col gap-1 px-6 md:px-10 lg:px-16 pb-12 md:pb-16">
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
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
        </p>
        <p
          ref={accentRef}
          className="font-bold leading-5 text-accent text-[13px] md:text-[16px] tracking-[0.3rem]"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          网页设计项目
        </p>
      </div>

      {/* Carousel + static blueprint grid */}
      <div ref={carouselRef} className="relative border-t border-b border-edge">

        {/* Blueprint grid — static, sits above carousel */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-stretch justify-center">
          <div className="relative web-grid-col border-l border-r border-fg/10">
            <Crosshair className="-top-1.5 -left-1.5" />
            <Crosshair className="-top-1.5 -right-1.5" />
            <Crosshair className="-bottom-1.5 -left-1.5" />
            <Crosshair className="-bottom-1.5 -right-1.5" />
          </div>
        </div>


        <Swiper
          centeredSlides
          slidesPerView="auto"
          spaceBetween={0}
          loop
          speed={400}
          onSwiper={(s) => { swiperRef.current = s; }}
          onSlideChange={(s) => setRealIndex(s.realIndex)}
          className="web-carousel w-full"
        >
          {projects.map((p, i) => {
            const isActive = i === realIndex % projects.length;
            return (
              <SwiperSlide key={p.slug}>
                <div className="slide-inner px-4 py-4 md:px-8 md:py-8">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    {isActive ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="min(70vw, 540px)"
                          priority={i === 0}
                        />
                      </a>
                    ) : (
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="min(70vw, 540px)"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Nav left | Label center | Nav right */}
      <div ref={controlsRef} className="grid grid-cols-[1fr_2fr_1fr] items-center px-6 md:px-10 lg:px-16 pt-5 md:pt-6">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous project"
          className="flex items-center gap-2 px-2 py-1 rounded-full border border-edge text-muted text-[12px] hover:border-edge-hover hover:text-fg transition-colors duration-200 justify-self-start"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true" style={{ transform: "rotate(180deg)" }}>
            <path d="M17 7 7 17" strokeWidth="2" />
            <path d="m8 7 9 0 0 9" strokeWidth="2" />
          </svg>
          previous
        </button>

        <div className="flex flex-col gap-1 items-center text-center">
          <p
            className="text-fg text-[15px] font-medium tracking-[-0.28px]"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            {active.title}
          </p>
          {active.subtitle && (
            <p
              className="text-muted text-[14px] tracking-[-0.28px]"
              style={{ fontFamily: "var(--font-siyuan)" }}
            >
              {active.subtitle}
            </p>
          )}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next project"
          className="flex items-center gap-2 px-2 py-1 rounded-full border border-edge text-muted text-[12px] hover:border-edge-hover hover:text-fg transition-colors duration-200 justify-self-end"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          next
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
            <path d="M17 7 7 17" strokeWidth="2" />
            <path d="m8 7 9 0 0 9" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </section>
  );
}
