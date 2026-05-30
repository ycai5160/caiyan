"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Animated starting frame for the DESIGN bento card.
 *
 * Rest state: only the Figma cursor + CAI YAN chip visible at the center of the card.
 *   The wireframe has 0 width (and therefore 0 height via aspect-ratio), so the
 *   wireframe outline, content, and corner handles all collapse to a point at center.
 *
 * Hover: the wireframe "blooms" out from that point — width grows from 0 to its full
 *   size, the four corner handles fade in, then the dashboard UI fills in.
 *
 * Based on Figma node 265-717.
 */
export default function DesignFrame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);

  // 4 floating UI components around the wireframe
  const btnRef = useRef<HTMLDivElement>(null);   // top-right
  const inputRef = useRef<HTMLDivElement>(null); // top-left
  const swatchRef = useRef<HTMLDivElement>(null); // bottom-right
  const badgeRef = useRef<HTMLDivElement>(null);  // bottom-left

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Initial state — synchronous so it lands before first paint
  useLayoutEffect(() => {
    const wf = wireframeRef.current;
    if (!wf) return;
    const handles = wf.querySelectorAll<HTMLElement>("[data-wf='handle']");
    const header = wf.querySelector<HTMLElement>("[data-wf='header']");
    const sidebar = wf.querySelector<HTMLElement>("[data-wf='sidebar']");
    const cards = wf.querySelectorAll<HTMLElement>("[data-wf='card']");
    const chart = wf.querySelector<HTMLElement>("[data-wf='chart']");
    const bars = wf.querySelectorAll<HTMLElement>("[data-wf='bar']");

    gsap.set(handles, { opacity: 0, force3D: true });
    gsap.set(header, { y: "-100%", opacity: 0, force3D: true });
    gsap.set(sidebar, { x: "-100%", opacity: 0, force3D: true });
    gsap.set(cards, { y: 12, opacity: 0, force3D: true });
    gsap.set(chart, { opacity: 0 });
    gsap.set(bars, { scaleY: 0, transformOrigin: "bottom", force3D: true });

    gsap.set(
      [btnRef.current, inputRef.current, swatchRef.current, badgeRef.current],
      { x: 0, y: 0, opacity: 1, force3D: true }
    );
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const card = root.closest<HTMLElement>("[data-core-card]");
    if (!card) return;

    const handleEnter = () => {
      const wrapper = wrapperRef.current;
      const cursor = cursorRef.current;
      const wf = wireframeRef.current;
      if (!wrapper || !cursor || !wf) return;

      const handles = wf.querySelectorAll<HTMLElement>("[data-wf='handle']");
      const header = wf.querySelector<HTMLElement>("[data-wf='header']");
      const sidebar = wf.querySelector<HTMLElement>("[data-wf='sidebar']");
      const cards = wf.querySelectorAll<HTMLElement>("[data-wf='card']");
      const chart = wf.querySelector<HTMLElement>("[data-wf='chart']");
      const bars = wf.querySelectorAll<HTMLElement>("[data-wf='bar']");

      tlRef.current?.kill();
      const tl = gsap.timeline({ defaults: { force3D: true } });

      // Cursor press, the "grab" moment
      tl.to(cursor, { scale: 0.82, duration: 0.08, ease: "power3.inOut", transformOrigin: "0 0" }, 0)
        .to(cursor, { scale: 1, duration: 0.22, ease: "power3.inOut" }, 0.08);

      // Wireframe blooms out from 0 → full
      tl.to(wrapper, { ["--wf-grow" as string]: 1, duration: 0.32, ease: "power3.out" }, 0.04);

      // Handles fade in alongside the growing outline
      tl.to(handles, { opacity: 1, duration: 0.25, ease: "power3.out" }, 0.18);

      // Content reveals in the order a designer lays down a screen
      tl.to(header, { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, 0.2)
        .to(sidebar, { x: 0, opacity: 1, duration: 0.28, ease: "power3.out" }, 0.24)
        .to(cards, { y: 0, opacity: 1, duration: 0.28, stagger: 0.05, ease: "power3.out" }, 0.28)
        .to(chart, { opacity: 1, duration: 0.24, ease: "power3.out" }, 0.34)
        .to(bars, { scaleY: 1, duration: 0.32, stagger: 0.025, ease: "power3.out" }, 0.36);

      // Wireframe "pushes" components outward off the card
      tl.to(btnRef.current,    { y: -80, x: 30,  opacity: 0, duration: 0.32, ease: "power3.in" }, 0.04)
        .to(inputRef.current,  { x: -90, y: -10, opacity: 0, duration: 0.32, ease: "power3.in" }, 0.06)
        .to(swatchRef.current, { x: 90,  y: 10,  opacity: 0, duration: 0.32, ease: "power3.in" }, 0.08)
        .to(badgeRef.current,  { y: 80,  x: -30, opacity: 0, duration: 0.32, ease: "power3.in" }, 0.1);

      tlRef.current = tl;
    };

    const handleLeave = () => {
      const wrapper = wrapperRef.current;
      const wf = wireframeRef.current;
      if (!wrapper || !wf) return;

      const handles = wf.querySelectorAll<HTMLElement>("[data-wf='handle']");
      const header = wf.querySelector<HTMLElement>("[data-wf='header']");
      const sidebar = wf.querySelector<HTMLElement>("[data-wf='sidebar']");
      const cards = wf.querySelectorAll<HTMLElement>("[data-wf='card']");
      const chart = wf.querySelector<HTMLElement>("[data-wf='chart']");
      const bars = wf.querySelectorAll<HTMLElement>("[data-wf='bar']");

      tlRef.current?.kill();
      const tl = gsap.timeline({ defaults: { force3D: true } });

      tl.to(bars, { scaleY: 0, duration: 0.2, ease: "power3.in" }, 0)
        .to([chart, cards], { opacity: 0, duration: 0.22, ease: "power3.in" }, 0)
        .to(sidebar, { x: "-100%", opacity: 0, duration: 0.22, ease: "power3.in" }, 0.03)
        .to(header, { y: "-100%", opacity: 0, duration: 0.22, ease: "power3.in" }, 0.03)
        .to(handles, { opacity: 0, duration: 0.18, ease: "power3.in" }, 0.06)
        .to(wrapper, { ["--wf-grow" as string]: 0, duration: 0.35, ease: "power3.in" }, 0.08)
        .to(
          [btnRef.current, inputRef.current, swatchRef.current, badgeRef.current],
          { x: 0, y: 0, opacity: 1, duration: 0.32, stagger: 0.04, ease: "power3.out" },
          0.12
        )
        // Reset cards.y inline as a zero-duration tween so it gets killed if the
        // timeline is killed mid-flight (instead of a stale .set firing later).
        .to(cards, { y: 12, duration: 0 }, ">");

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

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full select-none flex items-center justify-center"
    >
      {/* Floating components — visible at rest in the blank corners,
          pushed off the card as the wireframe blooms */}

      {/* Submit button — top-right corner */}
      <div
        ref={btnRef}
        className="absolute pointer-events-none z-20"
        style={{ top: "14%", right: "10%" }}
        aria-hidden="true"
      >
        <div
          className="px-[10px] py-[5px] rounded-[5px] bg-[#5865f2] text-white text-[10px] font-semibold whitespace-nowrap"
          style={{
            fontFamily: "var(--font-sans)",
            boxShadow:
              "0 1px 2px rgba(10,10,10,0.1), 0 8px 18px -4px rgba(10,10,10,0.18)",
          }}
        >
          Submit
        </div>
      </div>

      {/* Input field — top-left corner */}
      <div
        ref={inputRef}
        className="absolute pointer-events-none z-20"
        style={{ top: "14%", left: "10%" }}
        aria-hidden="true"
      >
        <div
          className="flex items-center px-[7px] py-[4px] rounded-[5px] bg-white border border-[#eae9ea] gap-[5px]"
          style={{
            boxShadow:
              "0 1px 2px rgba(10,10,10,0.06), 0 8px 18px -4px rgba(10,10,10,0.14)",
          }}
        >
          <span className="block h-[2px] w-[42px] bg-[#d4d4d5]" />
          <span
            className="block w-[1.5px] h-[8px] bg-[#5865f2]"
            style={{ animation: "dev-caret 1s steps(2, end) infinite" }}
          />
        </div>
      </div>

      {/* Icon bar — bottom-right corner, tucked away from the centered cursor chip */}
      <div
        ref={swatchRef}
        className="absolute pointer-events-none z-20"
        style={{ bottom: "14%", right: "10%" }}
        aria-hidden="true"
      >
        <div
          className="flex items-center gap-[7px] px-[7px] py-[5px] rounded-[5px] bg-white border border-[#eae9ea]"
          style={{
            boxShadow:
              "0 1px 2px rgba(10,10,10,0.06), 0 8px 18px -4px rgba(10,10,10,0.14)",
          }}
        >
          {/* Search */}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6e6b6f"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
          {/* Sliders */}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6e6b6f"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="2" y1="14" x2="6" y2="14" />
            <line x1="10" y1="8" x2="14" y2="8" />
            <line x1="18" y1="16" x2="22" y2="16" />
          </svg>
          {/* Bell */}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6e6b6f"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
      </div>

      {/* Status badge — bottom-left corner */}
      <div
        ref={badgeRef}
        className="absolute pointer-events-none z-20"
        style={{ bottom: "14%", left: "10%" }}
        aria-hidden="true"
      >
        <div
          className="flex items-center gap-[4px] px-[8px] py-[3px] rounded-full bg-white border border-[#eae9ea]"
          style={{
            boxShadow:
              "0 1px 2px rgba(10,10,10,0.06), 0 8px 18px -4px rgba(10,10,10,0.14)",
          }}
        >
          <span className="block w-[6px] h-[6px] rounded-full bg-[#22c55e]" />
          <span
            className="text-[9px] font-semibold text-[#15803d] leading-none"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Active
          </span>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative"
        style={
          {
            "--wf-grow": 0,
            width: "calc(min(64%, 290px) * var(--wf-grow))",
            transformOrigin: "0 0",
            willChange: "width",
          } as React.CSSProperties
        }
      >
        {/* Wireframe — 0 size at rest; cursor + chip remain visible via negative offsets */}
        <div
          ref={wireframeRef}
          className="relative w-full bg-white border-2 border-[#1570ef]"
          style={{
            aspectRatio: "355 / 252",
            boxShadow:
              "0 1px 2px rgba(10, 10, 10, 0.04), 0 12px 28px -10px rgba(10, 10, 10, 0.09)",
          }}
        >
          {/* Clipped interior — keeps slide-in animations from spilling outside */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              data-wf="header"
              className="absolute inset-x-0 top-0 h-[10%] bg-white border-b border-[#eae9ea] flex items-center px-[3%]"
            >
              <span
                className="text-[6px] text-[#333] tracking-wider"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Logo
              </span>
              <div className="flex-1" />
              <div className="flex items-center gap-[3px]">
                <span className="block w-[7px] h-[7px] rounded-full bg-[#eae9ea]" />
                <span className="block w-[7px] h-[7px] rounded-full bg-[#5865f2]" />
              </div>
            </div>

            <div
              data-wf="sidebar"
              className="absolute left-0 top-[10%] bottom-0 w-[14%] bg-[#fafafa] border-r border-[#eae9ea] flex flex-col items-center py-[6%] gap-[6px]"
            >
              <span className="block w-[60%] h-[3px] bg-[#5865f2]" />
              <span className="block w-[60%] h-[3px] bg-[#d4d4d5]" />
              <span className="block w-[60%] h-[3px] bg-[#d4d4d5]" />
              <span className="block w-[60%] h-[3px] bg-[#d4d4d5]" />
              <span className="block w-[60%] h-[3px] bg-[#d4d4d5]" />
            </div>

            <div className="absolute left-[14%] top-[10%] right-0 bottom-0 p-[3%] flex flex-col gap-[5px]">
              <div className="flex gap-[5px] h-[34%]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    data-wf="card"
                    className="flex-1 bg-[#f5f5f5] border border-[#eae9ea] p-[6%] flex flex-col justify-center gap-[4px]"
                  >
                    <span className="block h-[2px] w-[55%] bg-[#d4d4d5]" />
                    <span className="block h-[4px] w-[40%] bg-[#6e6b6f]" />
                  </div>
                ))}
              </div>

              <div
                data-wf="chart"
                className="flex-1 bg-[#f5f5f5] border border-[#eae9ea] p-[4%] flex flex-col gap-[5px]"
              >
                <div className="flex items-center justify-between">
                  <span className="block h-[2px] w-[25%] bg-[#6e6b6f]" />
                  <div className="flex items-center gap-[3px]">
                    <span className="block w-[5px] h-[5px] bg-[#5865f2]" />
                    <span className="block h-[2px] w-[12px] bg-[#d4d4d5]" />
                  </div>
                </div>
                <div className="flex-1 flex items-end gap-[3px] pt-[4px]">
                  {[45, 65, 80, 55, 72, 90, 60, 78, 50, 85].map((h, i) => (
                    <span
                      key={i}
                      data-wf="bar"
                      className="flex-1 bg-[#5865f2]"
                      style={{ height: `${h}%`, opacity: i % 2 === 0 ? 0.85 : 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selection corner handles — hidden at rest, fade in with the outline */}
          {[
            "top-[-4px] left-[-4px]",
            "top-[-4px] right-[-4px]",
            "bottom-[-4px] left-[-4px]",
            "bottom-[-4px] right-[-4px]",
          ].map((pos) => (
            <span
              key={pos}
              data-wf="handle"
              className={`absolute size-[7px] bg-white border-[1.5px] border-[#1570ef] ${pos}`}
              aria-hidden="true"
            />
          ))}

          {/* Figma cursor — always visible, anchored to BR via negative pixel offsets
              so it sits at card-center when the wireframe has 0 size, and rides the
              BR corner outward as the wireframe blooms. */}
          <div
            ref={cursorRef}
            className="absolute pointer-events-none z-10"
            style={{ right: "-14px", bottom: "-14px", transformOrigin: "2px 2px" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 2 L13 7.5 L7.5 9 L6 14 Z"
                fill="#1570ef"
                stroke="#1570ef"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            </svg>

            <span
              className="absolute inline-flex items-center px-[8px] py-[3px] rounded-full bg-[#1570ef] text-white text-[8px] font-medium tracking-[0.02em] whitespace-nowrap"
              style={{
                left: "12px",
                top: "12px",
                fontFamily: "var(--font-sans)",
              }}
            >
              CAI YAN
            </span>
          </div>
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
