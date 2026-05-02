"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Footer() {
  const footerRef   = useRef<HTMLElement>(null);
  const ruleRef     = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef  = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!footerRef.current) return;
      const st = { trigger: footerRef.current, start: "top 90%", once: true };

      gsap.from(ruleRef.current, {
        scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power3.out", scrollTrigger: st,
      });

      const split = new SplitText(nameRef.current, { type: "lines,chars", mask: "lines" });
      split.masks.forEach(m => (m as HTMLElement).style.setProperty("overflow-clip-margin", "0.2em"));
      gsap.from(split.chars, {
        yPercent: 120, stagger: { each: 0.03, from: "start" }, duration: 0.6, ease: "power3.out",
        scrollTrigger: st, delay: 0.15,
      });

      const tl = gsap.timeline({ scrollTrigger: st });
      tl.from(subtitleRef.current, { opacity: 0, y: 8, duration: 0.45, ease: "power2.out" }, 0.3);
      tl.from(contactRef.current,  { opacity: 0, y: 8, duration: 0.5,  ease: "power2.out" }, 0.4);
      tl.from(bottomRef.current,   { opacity: 0,        duration: 0.4,  ease: "power2.out" }, 0.6);

      return () => { split.revert(); };
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white px-5 sm:px-8 md:px-10 pt-16 pb-10">
      {/* Top rule */}
      

      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* Left: identity */}
        <div>
          <p
            ref={nameRef}
            className="text-[clamp(28px,4vw,48px)] font-medium tracking-[-0.04em] text-white leading-none mb-3"
            style={{ fontFamily: "var(--font-siyuan)" }}
          >
            蔡言
          </p>
          <p ref={subtitleRef} className="text-[13px] tracking-tight text-white/35 font-medium uppercase tracking-[0.12em]">
            UX/UI Designer &amp; Creative Developer
          </p>
        </div>

        {/* Right: contact + nav */}
        <div ref={contactRef} className="flex flex-col items-start md:items-end gap-4">
          <a
            href="mailto:caiyan615@gmail.com"
            className="text-[14px] font-medium tracking-tight text-white/50 hover:text-white transition-colors duration-300 group/mail inline-flex items-center gap-2"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            caiyan615@gmail.com
          </a>

          {/* Section navigation */}
          <nav className="flex items-center gap-5" aria-label="Page sections">
            {[
              { href: "#skills", label: "Skills" },
              { href: "#webdesign", label: "Web Design" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-[11px] uppercase tracking-[0.16em] text-white/25 hover:text-white/70 transition-colors duration-300 font-medium"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="mt-12 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/20 font-medium">
          © 2026
        </p>
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/20 font-medium">
          Portfolio
        </p>
      </div>
    </footer>
  );
}
