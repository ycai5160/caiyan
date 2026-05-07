"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
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
  disableSelfHover?: boolean;
}

export interface StaggerLinkHandle {
  enter: () => void;
  leave: () => void;
}

const wrapperStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
  position: "relative",
  display: "inline-block",
  overflow: "hidden",
  ...extra,
});

const dupStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  display: "block",
};

const StaggerLink = forwardRef<StaggerLinkHandle, StaggerLinkProps>(function StaggerLink({
  children,
  as = "span",
  href,
  className = "",
  style,
  target,
  rel,
  disableSelfHover = false,
}, ref) {
  const aRef        = useRef<HTMLAnchorElement>(null);
  const spanRef     = useRef<HTMLSpanElement>(null);
  const primaryRef  = useRef<HTMLSpanElement>(null);
  const dupRef      = useRef<HTMLSpanElement>(null);
  const enterRef    = useRef<() => void>(() => {});
  const leaveRef    = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    enter: () => enterRef.current(),
    leave: () => leaveRef.current(),
  }));

  useEffect(() => {
    const wrapper = (aRef.current ?? spanRef.current) as HTMLElement | null;
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
      gsap.to([...(stPrimary.chars ?? []), ...(stDup.chars ?? [])], {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
        stagger: { each: 0.01, from: "start" },
        overwrite: true,
      });
    };

    const onLeave = () => {
      // Dup exits downward fast — clears the visible zone before primary arrives
      gsap.to(stDup.chars ?? [], {
        yPercent: 0,
        duration: 0.25,
        ease: "power4.out",
        stagger: { each: 0.01, from: "start" },
        overwrite: true,
      });
      // Primary slides back in from above once dup has mostly cleared
      gsap.to(stPrimary.chars ?? [], {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: { each: 0.02, from: "start" },
        delay: 0.08,
        overwrite: true,
      });
    };

    enterRef.current = onEnter;
    leaveRef.current = onLeave;

    if (!disableSelfHover) {
      wrapper.addEventListener("mouseenter", onEnter);
      wrapper.addEventListener("mouseleave", onLeave);
    }

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
      if (!disableSelfHover) {
        wrapper.removeEventListener("mouseenter", onEnter);
        wrapper.removeEventListener("mouseleave", onLeave);
      }
      window.removeEventListener("resize", onResize);
      stPrimary?.revert();
      stDup?.revert();
      gsap.killTweensOf([...(stPrimary?.chars ?? []), ...(stDup?.chars ?? [])]);
    };
  }, [disableSelfHover]);

  const inner = (
    <>
      <span ref={primaryRef} style={{ display: "block" }}>{children}</span>
      <span ref={dupRef} aria-hidden="true" style={dupStyle}>{children}</span>
    </>
  );

  if (as === "a") {
    return (
      <a
        ref={aRef}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={wrapperStyle(style)}
      >
        {inner}
      </a>
    );
  }

  return (
    <span ref={spanRef} className={className} style={wrapperStyle(style)}>
      {inner}
    </span>
  );
});

export default StaggerLink;
