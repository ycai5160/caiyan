"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROJECTS = [
  { id: 1,  en: "Sonic AI",              zh: "AI 语音助手",   thumb: "/thumbnail_sonicai.png",      url: "https://designer789.github.io/Sonic-AI/" },
  { id: 2,  en: "Solara Processing Unit", zh: "处理器单元",    thumb: "/thumbnail_sopu.png",         url: "https://designer789.github.io/SoPU/" },
  { id: 3,  en: "RankChain",             zh: "企业信用平台",  thumb: "/thumbnail_rankchain.png",    url: "https://rankchainv3.vercel.app/" },
  { id: 4,  en: "Info.Launch",           zh: "产品发布官网",  thumb: "/thumbnail_infolaunch_2.png", url: "https://www.infolaunch.vip/" },
  { id: 5,  en: "PrivAI",                zh: "AI 隐私工具",   thumb: "/thumbnail_privai_2.png",     url: "https://priv-ai-phi.vercel.app/" },
  { id: 6,  en: "Cred.Hub",              zh: "信用管理平台",  thumb: "/thumbnail_credhub.png",      url: "https://www.credhub.xyz/" },
  { id: 7,  en: "Pulse",                 zh: "社交平台",      thumb: "/thumbnail_pulse.png",        url: "https://designer789.github.io/Pulse/" },
  { id: 8,  en: "OCULARAI",              zh: "AI 视觉工具",   thumb: "/thumbnail_ocularai.png",     url: "https://ocular-ai.vercel.app/" },
  { id: 9,  en: "Met.AI",                zh: "数字货币平台",  thumb: "/thumbnail_metai.png",        url: "https://www.metcoin.xyz/" },
  { id: 10, en: "lol.Forge",             zh: "游戏平台",      thumb: "/thumbnail_lolforge.png",     url: "https://lolforge.vercel.app/" },
];

export default function WebDesignSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const kickerRef   = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const captionRef  = useRef<HTMLDivElement>(null);
  const swiperRef   = useRef<SwiperType | null>(null);

  const [index, setIndex]             = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd]             = useState(false);
  const [hoverIndex, setHoverIndex]   = useState<number | null>(null);

  // ── Entrance animations ───────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1 });
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: sectionRef.current!, start: "top 75%", once: true };

      gsap.from(kickerRef.current, { opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: st });

      let split: SplitText | null = null;
      if (headingRef.current) {
        split = new SplitText(headingRef.current, { type: "lines,chars", mask: "lines" });
        split.masks.forEach((m) => {
          (m as HTMLElement).style.setProperty("overflow-clip-margin", "0.2em");
        });
        gsap.from(split.chars, {
          yPercent: 120,
          stagger: { each: 0.04, from: "start" },
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: st,
          delay: 0.1,
        });
      }

      gsap.from(carouselRef.current, { opacity: 0, y: 20, duration: 0.65, ease: "power2.out", scrollTrigger: st, delay: 0.35 });
      gsap.from(controlsRef.current, { opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: st, delay: 0.55 });

      return () => { split?.revert(); };
    });

    return () => mm.revert();
  }, []);

  // ── Caption: follows hovered card, falls back to snapped index ────────────
  const displayIndex = hoverIndex ?? index;
  const currentPage  = displayIndex + 1;
  const active       = PROJECTS[Math.min(displayIndex, PROJECTS.length - 1)];

  const isFirstCaption = useRef(true);
  useEffect(() => {
    if (isFirstCaption.current) { isFirstCaption.current = false; return; }
    if (!captionRef.current) return;
    gsap.fromTo(captionRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", overwrite: "auto" }
    );
  }, [displayIndex]);

  // ── Sync Swiper state into React ──────────────────────────────────────────
  const syncState = (swiper: SwiperType) => {
    setIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      ref={sectionRef}
      id="webdesign"
      className="relative min-h-screen bg-white flex flex-col"
    >
      {/* Top: kicker label + big display heading */}
      <div className="px-5 sm:px-8 lg:px-10 pt-8 shrink-0">
        <div ref={kickerRef} className="border-t border-black/[0.08] pt-4">
          <span
            className="text-[10px] uppercase tracking-[0.24em] text-black/30 font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Selected Works
          </span>
        </div>

        <h2
          ref={headingRef}
          className="mt-2 pb-[0.04em] text-black font-medium text-[clamp(48px,9vw,120px)] leading-[1.05] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-siyuan)", opacity: 0 }}
        >
          网页设计作品
        </h2>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} className="flex-1 flex items-center py-8 min-w-0">
        <Swiper
          onSwiper={syncState}
          onSlideChange={syncState}
          spaceBetween={24}
          grabCursor
          breakpoints={{
            0:    { slidesPerView: 1.15, slidesOffsetBefore: 20 },
            768:  { slidesPerView: 1.8,  slidesOffsetBefore: 32 },
            1024: { slidesPerView: 4.2,  slidesOffsetBefore: 40 },
          }}
          className="w-full"
        >
          {PROJECTS.map((p, i) => (
            <SwiperSlide key={p.id}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.en}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                draggable={false}
                className="block group"
              >
                <div className="bg-black/[0.06] overflow-hidden aspect-[3/4] relative">
                  <Image
                    src={p.thumb}
                    alt={p.en}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    draggable={false}
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Controls: running caption + prev/next */}
      <div
        ref={controlsRef}
        className="px-5 sm:px-8 lg:px-10 pb-8 flex items-end justify-between shrink-0 gap-6"
      >
        <div ref={captionRef} className="min-w-0">
          <span
            className="block text-[11px] tracking-[0.18em] text-black/45"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {String(currentPage).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <span
            className="mt-2 block text-[14px] font-medium text-black truncate"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {active.en}
          </span>
          <span
            className="block text-[12px] text-black/45 truncate"
            style={{ fontFamily: "var(--font-siyuan)" }}
          >
            {active.zh}
          </span>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Previous project"
            className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-200 hover:bg-black hover:text-white hover:border-black disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:border-black/15 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L3.5 7l5.5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
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
