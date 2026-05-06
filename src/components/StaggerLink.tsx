"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

interface StaggerLinkProps {
  children: string;
  as?: "a" | "span";
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export default function StaggerLink({
  children,
  as: Tag = "span",
  href,
  className = "",
  style,
  target,
  rel,
}: StaggerLinkProps) {
  const wrapperRef = useRef<HTMLAnchorElement & HTMLSpanElement>(null);
  const primaryRef = useRef<HTMLSpanElement>(null);
  const dupRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const primary = primaryRef.current;
    const dup     = dupRef.current;
    if (!wrapper || !primary || !dup) return;

    let stPrimary: SplitType;
    let stDup: SplitType;

    const split = () => {
      stPrimary = new SplitType(primary, { types: "chars" });
      stDup     = new SplitType(dup,     { types: "chars" });
    };

    split();

    const onEnter = () => {
      const all = [
        ...(stPrimary.chars ?? []),
        ...(stDup.chars ?? []),
      ];
      gsap.to(all, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "start" },
        overwrite: true,
      });
    };

    const onLeave = () => {
      const all = [
        ...(stPrimary.chars ?? []),
        ...(stDup.chars ?? []),
      ];
      gsap.to(all, {
        yPercent: 0,
        duration: 0.4,
        ease: "power4.inOut",
        stagger: { each: 0.03, from: "random" },
        overwrite: true,
      });
    };

    wrapper.addEventListener("mouseenter", onEnter);
    wrapper.addEventListener("mouseleave", onLeave);

    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      stPrimary.revert();
      stDup.revert();
      split();
    };
    window.addEventListener("resize", onResize);

    return () => {
      wrapper.removeEventListener("mouseenter", onEnter);
      wrapper.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      stPrimary?.revert();
      stDup?.revert();
      gsap.killTweensOf([...(stPrimary?.chars ?? []), ...(stDup?.chars ?? [])]);
    };
  }, []);

  const props = {
    ref: wrapperRef,
    className,
    style: {
      position: "relative" as const,
      display: "inline-block",
      overflow: "hidden",
      ...style,
    },
    ...(Tag === "a" && { href, target, rel }),
  };

  return (
    <Tag {...(props as never)}>
      <span ref={primaryRef} style={{ display: "block" }}>
        {children}
      </span>
      <span
        ref={dupRef}
        aria-hidden="true"
        style={{ position: "absolute", top: "100%", left: 0, display: "block" }}
      >
        {children}
      </span>
    </Tag>
  );
}
