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
  { slug: "sopu",        title: "Solara Processing Unit", subtitle: "为去中心化 GPU 算力平台打造的品牌官网，科技感视觉语言配合动态背景，传达产品的效率与未来感。", thumbnail: "/thumbnail_sopu.webp",       url: "https://designer789.github.io/SoPU/" },
  { slug: "sonicai",     title: "Sonic AI",               subtitle: "Solana 上首个个性化 DeFAI 代理平台，官网以高对比度视觉突出产品的速度感与自动化特性。", thumbnail: "/thumbnail_sonicai.webp",    url: "https://designer789.github.io/Sonic-AI/" },
  { slug: "pulse",       title: "Pulse",                  subtitle: "公平代币发行 DEX 的官网设计，以动感视觉节奏呼应产品「Launch. Curve. Soar.」的品牌调性。", thumbnail: "/thumbnail_pulse.webp",      url: "https://designer789.github.io/Pulse/" },
  { slug: "infolaunch",  title: "Info.Launch",            subtitle: "为 AI 项目代币发行平台设计的官网，以简洁的信息层级呈现复杂的 DeFi 机制。", thumbnail: "/thumbnail_infolaunch.webp", url: "https://www.infolaunch.vip/" },
  { slug: "privai",      title: "PrivAI",                 subtitle: "融合隐私保护与 AI 自动化的 Web3 平台官网，深色科技风格强化产品的安全感与可信度。", thumbnail: "/thumbnail_privai.webp",     url: "https://priv-ai-phi.vercel.app/" },
  { slug: "lolforge",    title: "lol.Forge",              subtitle: "AI 驱动的 3D Meme 生成平台，视觉风格大胆夸张，与产品的娱乐属性高度契合。", thumbnail: "/thumbnail_lolforge.webp",   url: "https://lolforge.vercel.app/" },
  { slug: "ocularai",    title: "OCULARAI",               subtitle: "为 AI 智能眼镜硬件项目打造的品牌落地页，视觉叙事围绕未来感穿戴设备展开。", thumbnail: "/thumbnail_ocularai.webp",   url: "https://ocular-ai.vercel.app/" },
  { slug: "rankchain",   title: "RankChain",              subtitle: "链上钱包追踪与评级平台，以数据可视化为核心视觉语言，传达产品的专业与透明。", thumbnail: "/thumbnail_rankchain.webp",  url: "https://rankchainv3.vercel.app/" },
  { slug: "metai",       title: "Met.AI",                 subtitle: "去中心化 AI 代理市场的品牌官网，以模块化视觉结构呈现复杂的基础设施产品。", thumbnail: "/thumbnail_metai.webp",      url: "https://www.metcoin.xyz/" },
  { slug: "credhub",     title: "Cred.Hub",               subtitle: "Web3 去中心化信誉协议的品牌官网，以清晰的视觉层级将抽象的信任机制具象化呈现。", thumbnail: "/thumbnail_credhub.webp",    url: "https://www.credhub.xyz/" },
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
                          loading={i === 0 ? undefined : "eager"}
                        />
                      </a>
                    ) : (
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="min(70vw, 540px)"
                        loading="eager"
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
