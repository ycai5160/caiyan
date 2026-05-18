"use client";

import dynamic from "next/dynamic";

const MermaidChart = dynamic(() => import("./MermaidChart"), { ssr: false });

export default function MermaidChartWrapper() {
  return <MermaidChart />;
}
