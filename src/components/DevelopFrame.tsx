"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Static visual for the DEVELOP bento card.
 * A small dark terminal window showing a simple design-token spec.
 *
 * Hover: three AI tool icons slide in from three different edges, each landing
 * half-overlapping the terminal's perimeter (top, right, bottom).
 */
export default function DevelopFrame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const ccRef = useRef<HTMLDivElement>(null);
  const codexRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Rest state: each icon off-screen on its arrival axis, slightly rotated
  useLayoutEffect(() => {
    gsap.set(ccRef.current, { y: -60, rotate: -30, opacity: 0, force3D: true });
    gsap.set(codexRef.current, { x: 60, rotate: 30, opacity: 0, force3D: true });
    gsap.set(geminiRef.current, { y: 60, rotate: -25, opacity: 0, force3D: true });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const card = root.closest<HTMLElement>("[data-core-card]");
    if (!card) return;

    const handleEnter = () => {
      tlRef.current?.kill();
      const tl = gsap.timeline({ defaults: { force3D: true } });
      tl.to(
        terminalRef.current,
        { scale: 1.04, duration: 0.35, ease: "power3.out", transformOrigin: "center" },
        0
      );
      tl.to(
        ccRef.current,
        { y: 0, rotate: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
        0
      )
        .to(
          codexRef.current,
          { x: 0, rotate: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
          0.04
        )
        .to(
          geminiRef.current,
          { y: 0, rotate: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
          0.08
        );
      tlRef.current = tl;
    };

    const handleLeave = () => {
      tlRef.current?.kill();
      const tl = gsap.timeline({ defaults: { force3D: true } });
      tl.to(
        terminalRef.current,
        { scale: 1, duration: 0.28, ease: "power3.inOut" },
        0
      );
      tl.to(
        geminiRef.current,
        { y: 60, rotate: -25, opacity: 0, duration: 0.2, ease: "power3.in" },
        0
      )
        .to(
          codexRef.current,
          { x: 60, rotate: 30, opacity: 0, duration: 0.2, ease: "power3.in" },
          0.03
        )
        .to(
          ccRef.current,
          { y: -60, rotate: -30, opacity: 0, duration: 0.2, ease: "power3.in" },
          0.06
        );
      tlRef.current = tl;
    };

    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
      return () => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
        tlRef.current?.kill();
      };
    }

    // Touch device: trigger once when the card scrolls into view
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            handleEnter();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(card);
    return () => {
      io.disconnect();
      tlRef.current?.kill();
    };
  }, []);

  const mono =
    'ui-monospace, "SF Mono", "Cascadia Code", "JetBrains Mono", Menlo, Consolas, monospace';

  const iconBase =
    "absolute w-[32px] h-[32px] rounded-[9px] overflow-hidden z-30 pointer-events-none";
  const iconShadow = {
    boxShadow:
      "0 2px 4px rgba(10,10,10,0.18), 0 10px 22px -4px rgba(10,10,10,0.32), 0 18px 40px -12px rgba(10,10,10,0.25)",
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Terminal wrapper — icons live here so they overlap the terminal edges */}
      <div className="relative" style={{ width: "min(72%, 290px)" }}>
        {/* Terminal */}
        <div
          ref={terminalRef}
          className="relative overflow-hidden rounded-md bg-[#161616]"
          style={{
            boxShadow:
              "0 1px 2px rgba(10, 10, 10, 0.04), 0 12px 28px -10px rgba(10, 10, 10, 0.18)",
            transformOrigin: "center",
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-[5px] px-[10px] py-[7px] bg-[#222] border-b border-black/40">
            <span className="block w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
            <span className="block w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
            <span className="block w-[8px] h-[8px] rounded-full bg-[#28c840]" />
            <span
              className="ml-[6px] text-[#8a8a8a] text-[9px]"
              style={{ fontFamily: mono }}
            >
              design.spec
            </span>
          </div>

          {/* Body — minimal spec */}
          <div
            className="px-[12px] py-[12px] text-[#d4d4d4] text-[10px] leading-[1.8]"
            style={{ fontFamily: mono }}
          >
            <div className="text-[#7c9cf0]"># Tokens</div>
            <Row label="primary" value="#5865F2" valueClass="text-[#e2bf67]" />
            <Row label="fg" value="#191918" valueClass="text-[#e2bf67]" />
            <Row label="radius" value="4px" valueClass="text-[#a3c98d]" />

            <div className="mt-[8px] flex items-center">
              <span className="text-[#7c9cf0]">$</span>
              <span
                className="ml-[6px] block w-[6px] h-[11px] bg-[#d4d4d4]"
                style={{ animation: "dev-caret 1s steps(2, end) infinite" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Claude — overlaps the TOP edge, slides in from above */}
        <div
          ref={ccRef}
          className={iconBase}
          style={{
            ...iconShadow,
            top: "-16px",
            left: "16%",
          }}
          aria-label="Claude"
        >
          <Image
            src="/Claude.png"
            alt="Claude"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Codex — overlaps the RIGHT edge, slides in from the right */}
        <div
          ref={codexRef}
          className={iconBase}
          style={{
            ...iconShadow,
            top: "50%",
            right: "-16px",
            marginTop: "-16px",
          }}
          aria-label="OpenAI Codex"
        >
          <Image
            src="/Codex.png"
            alt="Codex"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gemini — overlaps the BOTTOM edge, slides in from below */}
        <div
          ref={geminiRef}
          className={iconBase}
          style={{
            ...iconShadow,
            bottom: "-16px",
            right: "18%",
          }}
          aria-label="Gemini"
        >
          <Image
            src="/Gemini.png"
            alt="Gemini"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes dev-caret {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="flex">
      <span className="text-[#7a7a7a] w-[52px]">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
