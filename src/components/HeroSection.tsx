"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Scramble a text element left-to-right, replacing unrevealed chars with random pool chars
function scramble(el: HTMLElement, finalText: string, duration: number) {
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!&%";
  const chars = [...finalText];
  const obj = { p: 0 };
  gsap.to(obj, {
    p: 1,
    duration,
    ease: "power1.in",
    onUpdate() {
      const n = Math.floor(obj.p * chars.length);
      el.textContent = chars
        .map((c, i) => {
          if (i < n || c === " " || c === "·") return c;
          return pool[Math.floor(Math.random() * pool.length)];
        })
        .join("");
    },
    onComplete() {
      el.textContent = finalText;
    },
  });
}

export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef  = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLDivElement>(null);
  const bioRef        = useRef<HTMLDivElement>(null);
  const navRef        = useRef<HTMLElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const bioParaRef    = useRef<HTMLParagraphElement>(null);
  const headingChars  = useRef<HTMLSpanElement[]>([]);
  const navTexts      = useRef<HTMLElement[]>([]);

  // Video autoplay — set muted via JS so mobile Safari respects it
  useEffect(() => {
    [videoRef.current, mobileVideoRef.current].forEach((v) => {
      if (!v) return;
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);

  // Entrance animation — fires on preloader:done (with 4.5s fallback for dev)
  useEffect(() => {
    let fired = false;

    const runEntrance = () => {
      if (fired) return;
      fired = true;

      const tl = gsap.timeline();

      // Section rises from slight offset
      gsap.set(sectionRef.current, { y: 30 });
      tl.to(sectionRef.current, { y: 0, duration: 1.1, ease: "power3.out" }, 0);

      // Nav: reveal instantly then scramble each text item
      gsap.set(navRef.current, { opacity: 1 });
      navTexts.current.forEach((el, i) => {
        const finalText = el.textContent ?? "";
        gsap.delayedCall(i * 0.12, () => scramble(el, finalText, 0.7));
      });

      // Heading letters slide up out of clip masks
      tl.to(headingChars.current, {
        y: 0,
        duration: 0.7,
        stagger: 0.025,
        ease: "power3.out",
      }, 0.05);

      // Tagline + bio fade in together (same style)
      tl.to([taglineRef.current, bioParaRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
      }, 0.35);
    };

    window.addEventListener("preloader:done", runEntrance);
    const fallback = setTimeout(runEntrance, 4500);

    return () => {
      window.removeEventListener("preloader:done", runEntrance);
      clearTimeout(fallback);
    };
  }, []);

  // Scroll-based parallax (unchanged)
  useGSAP(() => {
    if (!sectionRef.current) return;
    const vh = window.innerHeight;

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

  // Reset ref arrays before each render
  headingChars.current = [];
  navTexts.current     = [];

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 w-full h-screen min-h-[600px] flex flex-col md:justify-between overflow-hidden"
    >
      {/* Video background */}
      <div
        ref={videoWrapRef}
        className="hidden md:block absolute inset-x-0 z-10"
        style={{ top: "-12%", height: "130%" }}
      >
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="metadata"
          poster="/video/fallback_img.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/demo2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/100 to-bg/30"
          style={{ inset: "-15%", width: "130%", height: "130%", filter: "blur(48px)" }} />
        <div className="absolute bg-gradient-to-r from-bg/100 from-20% to-transparent"
          style={{ inset: "-15%", width: "130%", height: "130%", filter: "blur(48px)" }} />
      </div>

      {/* Nav */}
      <nav
        ref={navRef}
        className="relative z-20 shrink-0 flex items-center justify-between w-full px-6 pt-8 md:px-10 md:pt-8 lg:px-16 text-[14px] text-secondary tracking-wide"
        style={{ fontFamily: "var(--font-siyuan)", opacity: 0 }}
      >
        <div className="flex flex-1 justify-between items-center gap-8">
          <a href="/" className="shrink-0">
            <Image src="/logo.svg" alt="蔡言" width={65} height={33} priority />
          </a>
          <span
            ref={(el) => { if (el) navTexts.current.push(el); }}
            className="hidden md:inline"
          >© 蔡言个人作品集</span>
          <span className="hidden md:inline opacity-40">/</span>
          <a href="#ux" className="hidden md:inline-flex items-center gap-1 hover:text-fg transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true"><path d="M6 6v6a3 3 0 0 0 3 3h10l-4-4m0 8 4-4" strokeWidth="2" /></svg>
            <span ref={(el) => { if (el) navTexts.current.push(el); }}>UX设计</span>
          </a>
          <a href="#web" className="hidden md:inline-flex items-center gap-1 hover:text-fg transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true"><path d="M6 6v6a3 3 0 0 0 3 3h10l-4-4m0 8 4-4" strokeWidth="2" /></svg>
            <span ref={(el) => { if (el) navTexts.current.push(el); }}>网页设计</span>
          </a>
          <span className="hidden md:inline opacity-40">/</span>
          <a
            href="/蔡言_UXUI设计师.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-secondary text-[13px] pb-px border-b border-secondary/40 hover:text-fg hover:border-fg transition-colors duration-200"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            <span ref={(el) => { if (el) navTexts.current.push(el); }}>查看简历</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
              <path d="M17 7 7 17" strokeWidth="2" /><path d="m8 7 9 0 0 9" strokeWidth="2" />
            </svg>
          </a>
        </div>
        <span className="md:hidden">© 蔡言个人作品集</span>
      </nav>

      {/* Mobile spacer */}
      <div className="md:hidden flex-1" aria-hidden="true" />

      {/* Headline */}
      <div ref={headlineRef} className="relative z-10 px-6 pb-4 md:px-10 md:pb-0 lg:px-16">
        <h1
          className="font-bold leading-[1.2] tracking-[-0.02em] text-[clamp(48px,10vw,96px)]"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          {/* "From design " — each letter clipped and animated */}
          {[..."From design "].map((char, i) => (
            <span
              key={`h${i}`}
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
            >
              <span
                ref={(el) => { if (el) headingChars.current.push(el); }}
                style={{ display: "inline-block", transform: "translateY(115%)", color: "#ffffff" }}
              >
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
          {/* mobile-only line break after "design" */}
          <br className="md:hidden" aria-hidden="true" />
          {/* "to live." — accent colour */}
          {[..."to live."].map((char, i) => (
            <span
              key={`a${i}`}
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
            >
              <span
                ref={(el) => { if (el) headingChars.current.push(el); }}
                className="text-accent"
                style={{ display: "inline-block", transform: "translateY(115%)" }}
              >
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Bio */}
      <div ref={bioRef} className="relative z-10 px-6 pb-5 md:px-10 md:pb-8 lg:px-16 flex flex-col gap-3">
        <p
          ref={taglineRef}
          className="text-fg font-bold text-[14px] md:text-[16px] leading-5"
          style={{ fontFamily: "var(--font-siyuan)", opacity: 0 }}
        >
          蔡言 · UXUI设计师
        </p>
        <p
          ref={bioParaRef}
          className="text-muted text-[12px] md:text-[14px] leading-relaxed max-w-[min(420px,100%)]"
          style={{ fontFamily: "var(--font-siyuan)", opacity: 0, transform: "translateY(10px)" }}
        >
          我是一名UX/UI设计师，在视觉与交互设计上有扎实积累，同时具备前端开发视角，能与产品、工程团队高效对齐。热衷探索AI在设计流程中的应用，让创意从概念到落地既快又准。
        </p>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden relative z-10 px-6 pb-5">
        <a
          href="/蔡言_UXUI设计师.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-secondary text-[12px] pb-px border-b border-secondary/40 hover:text-fg hover:border-fg transition-colors duration-200"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          查看简历
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true">
            <path d="M17 7 7 17" strokeWidth="2" /><path d="m8 7 9 0 0 9" strokeWidth="2" />
          </svg>
        </a>
      </div>

      {/* Mobile video */}
      <div className="md:hidden shrink-0 relative z-10 px-6 pb-8">
        <div className="relative border border-edge">
          {["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((pos) => (
            <div key={pos} className={`absolute w-3 h-3 ${pos}`} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
                <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
              </svg>
            </div>
          ))}
          <div className="aspect-video w-full overflow-hidden">
            <video ref={mobileVideoRef} autoPlay muted loop playsInline preload="metadata" poster="/video/fallback_img.jpg" className="w-full h-full object-cover">
              <source src="/video/demo2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
