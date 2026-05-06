"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const navLinks = [
  { label: "UX设计",  href: "#ux" },
  { label: "网页设计", href: "#web" },
  { label: "关于我",  href: "#about" },
];

export default function Footer() {
  const footerRef    = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navItemsRef  = useRef<HTMLAnchorElement[]>([]);
  const metaRef      = useRef<HTMLDivElement>(null);
  const bigTextRef   = useRef<HTMLParagraphElement>(null);
  const [splineReady, setSplineReady] = useState(false);

  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.set(navItemsRef.current, { x: -16, opacity: 0 });
    gsap.set([metaRef.current, bigTextRef.current], { y: 20, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
    })
      .to(navItemsRef.current, { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }, 0)
      .to(metaRef.current,     { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.1)
      .to(bigTextRef.current,  { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }, 0.2);
  }, { scope: footerRef });

  navItemsRef.current = [];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSplineReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden bg-bg" style={{ height: "clamp(360px, 80vw, 585px)" }}>

      {/* Aurora gradient — exact radial from Figma, blurred for softness */}
      <svg
        viewBox="0 0 1440 585"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute z-0"
        style={{
          inset: "-15%",
          width: "130%",
          height: "130%",
          filter: "blur(48px)",
        }}
      >
        <defs>
          <radialGradient
            id="footer-aurora"
            gradientUnits="userSpaceOnUse"
            cx="0" cy="0" r="10"
            gradientTransform="matrix(1.2 -45.8 112.74 2.9538 740 585.25)"
          >
            <stop stopColor="#DEC6BF" offset="0" />
            <stop stopColor="#E4A492" offset="0.12861" />
            <stop stopColor="#E98266" offset="0.25721" />
            <stop stopColor="#EF6039" offset="0.38582" />
            <stop stopColor="#F14F22" offset="0.45012" />
            <stop stopColor="#F43E0C" offset="0.51442" />
            <stop stopColor="#B72F09" offset="0.63582" />
            <stop stopColor="#7A1F06" offset="0.75721" />
            <stop stopColor="#5C1705" offset="0.81791" />
            <stop stopColor="#3D1003" offset="0.87861" />
            <stop stopColor="#1F0802" offset="0.9393" />
            <stop stopColor="#0F0401" offset="0.96965" />
            <stop stopColor="#000000" offset="1" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#footer-aurora)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col pt-14 px-6 md:pt-16 md:px-10 lg:px-16">

        {/* Top bar: mobile=2col (nav|contact+copyright), desktop=3col */}
        <div
          className="flex items-start justify-between w-full text-secondary text-[13px] md:text-[14px] leading-5"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          {/* Nav links — 44px touch targets on mobile */}
          <nav className="flex flex-col" aria-label="Footer navigation">
            {navLinks.map((l) => (
              <a
                key={l.label}
                ref={(el) => { if (el) navItemsRef.current.push(el); }}
                href={l.href}
                className="flex items-center gap-1 min-h-[44px] md:min-h-0 md:leading-5 hover:text-fg transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true"><path d="M6 6v6a3 3 0 0 0 3 3h10l-4-4m0 8 4-4" strokeWidth="2" /></svg>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Copyright center — desktop only */}
          <div ref={metaRef} className="hidden md:flex flex-col gap-0.5 items-center text-center">
            <p>© 2026 蔡言个人作品集</p>
            <p style={{ fontFamily: "var(--font-sf-pro)" }}>From design to live.</p>
          </div>

          {/* Contact — on mobile also carries copyright */}
          <div className="flex flex-col items-end gap-0.5">
            <a
              href="mailto:caiyan615@gmail.com"
              className="flex items-center min-h-[44px] md:min-h-0 hover:text-fg transition-colors duration-200"
              style={{ fontFamily: "var(--font-sf-pro)" }}
            >
              caiyan615@gmail.com
            </a>
            
            <div className="flex flex-col items-end gap-0.5 md:hidden mt-0.5">
              <p>© 2026 蔡言个人作品集</p>
              <p style={{ fontFamily: "var(--font-sf-pro)" }}>From design to live.</p>
            </div>
          </div>
        </div>

        {/* Spline 3D */}
        <div ref={containerRef} className="flex h-full inset-0 z-10">
          {splineReady && (
            <Spline
              scene="https://prod.spline.design/WsTl7ZN18M7s9PzF/scene.splinecode"
            />
          )}
        </div>

        {/* Large "CAI YAN" — anchored to bottom, partially clipped for depth */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none select-none translate-y-[14%]">
          <p
            ref={bigTextRef}
            className="text-fg mix-blend-overlay opacity-50 whitespace-nowrap font-medium"
            style={{
              fontFamily: "var(--font-sf-pro)",
              fontSize: "clamp(100px, 17vw, 256px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            CAI YAN
          </p>
        </div>
      </div>
    </footer>
  );
}
