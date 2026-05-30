"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { slug: "sopu",       title: "Solara Processing Unit", thumbnail: "/thumbnail_sopu.webp",       url: "https://ycai5160.github.io/Sopu_backup/" },
  { slug: "rankchain",  title: "RankChain",              thumbnail: "/thumbnail_rankchain.webp",  url: "https://rankchain.netlify.app/" },
  { slug: "infolaunch", title: "Info.Launch",            thumbnail: "/thumbnail_infolaunch.webp", url: "https://infolaunch.netlify.app/" },
  { slug: "sonicai",    title: "Sonic AI",               thumbnail: "/thumbnail_sonicai.webp",    url: "https://designer789.github.io/Sonic-AI/" },
  { slug: "pulse",      title: "Pulse",                  thumbnail: "/thumbnail_pulse.webp",      url: "https://designer789.github.io/Pulse/" },
  { slug: "privai",     title: "PrivAI",                 thumbnail: "/thumbnail_privai.webp",     url: "https://privaiagent.netlify.app/" },
  { slug: "lolforge",   title: "lol.Forge",              thumbnail: "/thumbnail_lolforge.webp",   url: "https://lolforge.netlify.app/" },
  { slug: "ocularai",   title: "OCULARAI",               thumbnail: "/thumbnail_ocularai.webp",   url: "https://ocularai.netlify.app/" },
  { slug: "metai",      title: "Met.AI",                 thumbnail: "/thumbnail_metai.webp",      url: "https://met-ai-9742aa.netlify.app//" },
  { slug: "credhub",    title: "Cred.Hub",               thumbnail: "/thumbnail_credhub.webp",    url: "https://credhubprotocol.netlify.app/" },
];

const total = projects.length;
const totalPadded = String(total).padStart(2, "0");

export default function WebDesignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-web-fade]",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        "[data-web-carousel]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-web-carousel]",
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="web"
      className="relative"
      style={{
        paddingTop: "0",
        paddingBottom: "var(--space-section-md)",
      }}
    >
      <div
        className="container-x grid grid-cols-1 md:grid-cols-12"
        style={{ columnGap: "var(--space-grid-gutter)", rowGap: "var(--space-stack-lg)" }}
      >
        {/* Left: text + arrows */}
        <div className="md:col-span-5 flex flex-col">
          {/* Section badge — Notion orange tag */}
          <span
            data-web-fade
            className="self-start inline-flex items-center px-2.5 py-0.5 rounded-full tag-orange text-[12px] font-medium"
          >
            02 网页设计
          </span>

          <div
            data-web-fade
            className="mt-14 md:mt-20 flex items-baseline justify-between gap-4"
          >
            <p className="text-fg text-[18px] md:text-[22px] font-semibold tracking-[-0.02em] leading-[1.25]">
              AdTactics Marketing International Limited, HongKong
            </p>
            <p className="text-muted text-[12px] md:text-[13px] shrink-0">
              2023 — 2025
            </p>
          </div>

          <p
            data-web-fade
            className="text-secondary text-[14px] md:text-[15px] leading-[1.85] mt-4 md:mt-5 max-w-[58ch]"
          >
            针对全球 Web3 客户不同项目需求，完成 Logo、Banner、官网与落地页等品牌视觉与网页设计。
          </p>

          {/* Bottom-right cluster — just arrows; the index + title live in the active slide overlay */}
          <div className="mt-auto pt-10 self-end flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid place-items-center w-9 h-9 rounded-md border border-edge-md text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 6 9 12l6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => swiperRef.current?.slideNext()}
              className="grid place-items-center w-9 h-9 rounded-md border border-edge-md text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6 15 12l-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Swiper carousel, clipped to column */}
        <div className="md:col-span-7 min-w-0">
          <div data-web-carousel className="web-carousel overflow-hidden">
            <Swiper
              modules={[Navigation, Keyboard]}
              slidesPerView="auto"
              spaceBetween={16}
              speed={600}
              loop
              loopAdditionalSlides={3}
              keyboard={{ enabled: true }}
              allowTouchMove
              grabCursor
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
            >
              {projects.map((p, i) => {
                const idxPadded = String(i + 1).padStart(2, "0");
                return (
                  <SwiperSlide
                    key={p.slug}
                    className="!w-[70vw] md:!w-[calc((100vw-2*var(--container-px))/4)]"
                  >
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} (${i + 1} of ${total})`}
                      className="card-lift block"
                    >
                      <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-surface border border-edge shadow-window">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Active-slide overlay — title · index */}
                        <div className="slide-label absolute inset-x-0 bottom-0 p-3 md:p-4 pointer-events-none">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent"
                          />
                          <div
                            className="relative flex items-baseline gap-2 text-white text-[12px] md:text-[13px] leading-none"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                          >
                            <span className="opacity-75">
                              {idxPadded} / {totalPadded}
                            </span>
                            <span className="opacity-50">·</span>
                            <span className="font-medium truncate">{p.title}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
