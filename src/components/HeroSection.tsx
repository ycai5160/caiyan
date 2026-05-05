"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const bioRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const vh = window.innerHeight;

    // Video drifts up at ~half the scroll speed — classic parallax
    // yPercent is relative to the element's own height (130vh), so -12% ≈ -15.6vh
    gsap.to(videoWrapRef.current, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${vh}`,
        scrub: true,
      },
    });

    // Whole section fades out together (video + text as one unit)
    gsap.to(sectionRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${vh * 0.65}`,
        scrub: true,
      },
    });

    // Headline drifts up (no individual fade — section handles it)
    gsap.to(headlineRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${vh * 0.6}`,
        scrub: true,
      },
    });

    // Bio drifts up slightly earlier
    gsap.to(bioRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${vh * 0.5}`,
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden"
    >
      {/* Video background — extended above and below for parallax room */}
      <div
        ref={videoWrapRef}
        className="absolute inset-x-0 z-10"
        style={{ top: "-12%", height: "130%" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/demo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 from-0% to-transparent" />
      </div>

      {/* Nav — no parallax, anchored to top of sticky section */}
      <nav
        className="relative z-20 flex items-center justify-between w-full px-6 pt-8 md:px-10 md:pt-16 lg:px-16 text-[12px] text-[#c3c3c3] tracking-wide"
        style={{ fontFamily: "var(--font-siyuan)" }}
      >
        <div className="flex flex-1 justify-between items-center gap-8">
          <a href="/" className="shrink-0">
            <Image src="/logo.svg" alt="蔡言" width={65} height={33} priority />
          </a>
          <span className="hidden md:inline">© 蔡言个人作品集</span>
          <span className="hidden md:inline opacity-40">/</span>
          <a href="#web" className="hidden md:inline hover:text-white transition-colors duration-200">网页设计</a>
          <a href="#ux" className="hidden md:inline hover:text-white transition-colors duration-200">UX设计</a>
          <span className="hidden md:inline opacity-40">/</span>
          <a
            href="/resume"
            className="group hidden md:inline-flex items-center gap-1.5 px-2 py-2 rounded-full border border-[#3a3a3a] bg-black text-white text-[12px] font-medium overflow-hidden relative transition-colors duration-300"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">查看简历</span>
            <svg className="relative z-10 group-hover:text-black transition-colors duration-300" width="12" height="12" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <line x1="1.5" y1="9.5" x2="9.5" y2="1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <polyline points="5,1.5 9.5,1.5 9.5,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <span className="md:hidden">© 蔡言个人作品集</span>
      </nav>

      {/* Headline — parallax layer 2 */}
      <div ref={headlineRef} className="relative z-10 px-6 md:px-10 lg:px-16">
        <h1
          className="text-white font-bold leading-[1] tracking-[-0.02em] text-[clamp(40px,8vw,96px)]"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          From design <span className="text-[#f43e0c]">to live.</span>
        </h1>
      </div>

      {/* Bio — parallax layer 3 */}
      <div ref={bioRef} className="relative z-10 px-6 pb-8 md:px-10 md:pb-16 lg:px-16 flex flex-col gap-2">
        <p
          className="text-white font-bold text-[14px] md:text-[16px] leading-5"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          蔡言 · UXUI设计师
        </p>
        <p
          className="text-[#747474] text-[12px] md:text-[14px] leading-relaxed max-w-[min(420px,100%)]"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          我是一名UX/UI设计师，在视觉与交互设计上有扎实积累，同时具备前端开发视角，能与产品、工程团队高效对齐。热衷探索AI在设计流程中的应用，让创意从概念到落地既快又准。
        </p>
      </div>
    </section>
  );
}
