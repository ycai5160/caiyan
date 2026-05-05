"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

const projects = [
  { slug: "sopu",        title: "Solara Processing Unit", subtitle: "", thumbnail: "/thumbnail_sopu.png",       url: "https://designer789.github.io/SoPU/" },
  { slug: "infolaunch",  title: "Info.Launch",            subtitle: "", thumbnail: "/thumbnail_infolaunch.png", url: "https://www.infolaunch.vip/" },
  { slug: "privai",      title: "PrivAI",                 subtitle: "", thumbnail: "/thumbnail_privai.png",     url: "https://priv-ai-phi.vercel.app/" },
  { slug: "lolforge",    title: "lol.Forge",              subtitle: "", thumbnail: "/thumbnail_lolforge.png",   url: "https://lolforge.vercel.app/" },
  { slug: "ocularai",    title: "OCULARAI",               subtitle: "", thumbnail: "/thumbnail_ocularai.png",   url: "https://ocular-ai.vercel.app/" },
  { slug: "rankchain",   title: "RankChain",              subtitle: "", thumbnail: "/thumbnail_rankchain.png",  url: "https://rankchainv3.vercel.app/" },
  { slug: "metai",       title: "Met.AI",                 subtitle: "", thumbnail: "/thumbnail_metai.png",      url: "https://www.metcoin.xyz/" },
  { slug: "pulse",       title: "Pulse",                  subtitle: "", thumbnail: "/thumbnail_pulse.png",      url: "https://designer789.github.io/Pulse/" },
  { slug: "sonicai",     title: "Sonic AI",               subtitle: "", thumbnail: "/thumbnail_sonicai.png",    url: "https://designer789.github.io/Sonic-AI/" },
  { slug: "credhub",     title: "Cred.Hub",               subtitle: "", thumbnail: "/thumbnail_credhub.png",    url: "https://www.credhub.xyz/" },
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
  const swiperRef = useRef<SwiperClass | null>(null);
  const active = projects[realIndex % projects.length];

  return (
    <section
      id="web"
      className="relative w-full flex flex-col gap-4 md:gap-6 py-16 md:py-32 bg-black"
    >
      {/* Section label */}
      <div
        className="flex flex-col gap-0 md:gap-1 px-6 md:px-10 lg:px-16 mb-10"
      >
        <p
          className="font-bold leading-[1] text-[#0b0b0b] text-[clamp(36px,6vw,70px)] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          Web Design
        </p>
        <p
          className="font-bold leading-5 text-[#f43e0c] text-[13px] md:text-[16px] tracking-[0.3rem]"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          网页设计项目
        </p>
      </div>

      {/* Carousel + static blueprint grid */}
      <div className="relative border-t border-b border-[#1e1e1e]">

        {/* Blueprint grid — static, sits above carousel */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-stretch justify-center">
          <div className="relative web-grid-col border-l border-r border-[rgba(255,255,255,0.1)]">
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
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                        />
                      </a>
                    ) : (
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
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
      <div className="grid grid-cols-3 items-center px-6 md:px-10 lg:px-16">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous project"
          className="flex items-center gap-2 px-2 py-1 rounded-full border border-[#1e1e1e] text-[#747474] text-[18px] hover:border-[#555] hover:text-white transition-colors duration-200 justify-self-start"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <line x1="9.5" y1="9.5" x2="1.5" y2="1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <polyline points="6,1.5 1.5,1.5 1.5,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          previous
        </button>

        <div className="flex flex-col gap-1 items-center text-center">
          <p
            className="text-white text-[14px] tracking-[-0.28px]"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            {active.title}
          </p>
          {active.subtitle && (
            <p
              className="text-[#747474] text-[14px] tracking-[-0.28px]"
              style={{ fontFamily: "var(--font-siyuan)" }}
            >
              {active.subtitle}
            </p>
          )}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next project"
          className="flex items-center gap-2 px-2 py-1 rounded-full border border-[#1e1e1e] text-[#747474] text-[18px] hover:border-[#555] hover:text-white transition-colors duration-200 justify-self-end"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          next
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <line x1="1.5" y1="9.5" x2="9.5" y2="1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <polyline points="5,1.5 9.5,1.5 9.5,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
