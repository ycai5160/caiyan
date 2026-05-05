"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const navLinks = [
  { label: "UX设计",  href: "#ux" },
  { label: "网页设计", href: "#web" },
  { label: "关于我",  href: "#about" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splineSize, setSplineSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const init = () => {
      if (containerRef.current) {
        setSplineSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }
  }, []);

 

  return (
    <footer className="relative w-full overflow-hidden bg-black" style={{ height: "clamp(360px, 80vw, 585px)" }}>

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

        {/* Top bar: nav | copyright | contact */}
        <div
          className="flex items-start justify-between w-full text-[#c3c3c3] text-[13px] md:text-[14px] leading-5"
          style={{ fontFamily: "var(--font-siyuan)" }}
        >
          <div className="flex flex-col gap-0.5">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-0.5 items-center text-center">
            <p>© 2026 蔡言个人作品集</p>
            <p style={{ fontFamily: "var(--font-sf-pro)" }}>Design, Motion, Coding</p>
          </div>

          <div className="flex flex-col gap-0.5 items-end">
            <a
              href="mailto:caiyan615@gmail.com"
              className="hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-sf-pro)" }}
            >
              caiyan615@gmail.com
            </a>
          </div>
        </div>

        {/* Spline 3D — mounted only after all page resources are ready */}
        <div ref={containerRef} className="flex h-full inset-0 z-10">
          {splineSize && (
            <Spline
              scene="https://prod.spline.design/WsTl7ZN18M7s9PzF/scene.splinecode"
              width={splineSize.width}
              height={splineSize.height}
            />
          )}
        </div>

        {/* Large "CAI YAN" — anchored to bottom, partially clipped for depth */}
        <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none select-none translate-y-[14%]">
          <p
            className="text-white mix-blend-overlay opacity-50 whitespace-nowrap font-medium"
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
