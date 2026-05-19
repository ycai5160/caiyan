"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";

const MermaidChart = dynamic(() => import("./MermaidChart"), { ssr: false });

export default function MermaidChartWrapper() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {inView
        ? <MermaidChart />
        : <div className="w-full border border-edge overflow-x-auto py-4" style={{ minHeight: 120 }} />
      }
    </div>
  );
}
