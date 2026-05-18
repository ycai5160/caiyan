"use client";

import { useEffect, useRef } from "react";

const CHART = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontSize': '12px',
    'fontFamily': 'SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
    'primaryColor': '#1e1e1e',
    'primaryBorderColor': '#2a2a2a',
    'primaryTextColor': '#ffffff',
    'secondaryColor': '#141414',
    'tertiaryColor': '#141414',
    'lineColor': '#3a3a3a',
    'edgeLabelBackground': '#000000',
    'background': '#000000'
  }
}}%%
flowchart TD
    A([开始]) --> B[登录 / 注册]
    B --> C{认证成功?}
    C -->|否| B
    C -->|是| D[项目主页]
    D -->|新建项目| E[上传文件 / 粘贴链接]
    D -->|打开已有项目| J
    E --> F{文件有效?}
    F -->|否| E
    F -->|是| G[转录配置]
    G --> H[[AI 转录处理中]]
    H --> I{转录成功?}
    I -->|否| E
    I -->|是| J[编辑器]
    J --> K{完成编辑?}
    K -->|继续修改| J
    K -->|确认| L[导出]
    L --> M([结束])

    classDef terminal fill:#141414,stroke:#3a3a3a,color:#747474
    classDef screen   fill:#000000,stroke:#2a2a2a,color:#ffffff
    classDef decision fill:#1e1e1e,stroke:#2a2a2a,color:#c3c3c3
    classDef process  fill:#141414,stroke:#2a2a2a,stroke-dasharray:5 3,color:#747474

    class A,M terminal
    class B,D,E,G,J,L screen
    class C,F,I,K decision
    class H process`;

export default function MermaidChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    import("mermaid").then(({ default: mermaid }) => {
      if (cancelled) return;
      mermaid.initialize({ startOnLoad: false });

      mermaid.render("subflow-userflow", CHART).then(({ svg }) => {
        if (cancelled || !el) return;
        el.innerHTML = svg;

        const svgEl = el.querySelector("svg");
        if (!svgEl) return;

        // Responsive sizing
        svgEl.removeAttribute("width");
        svgEl.removeAttribute("height");
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";

        // Dark-theme overrides injected directly into the SVG
        const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
        style.textContent = `
          /* edge label pills */
          .edgeLabel .label { color: #747474 !important; }
          .edgeLabel rect   { fill: #000000 !important; stroke: none !important; }
          .edgeLabel span   { color: #747474 !important; font-size: 11px !important;
                              font-family: 'SF Pro Display', -apple-system, sans-serif; }
          /* arrows */
          .edgePath .path   { stroke: #3a3a3a !important; }
          marker path       { fill: #3a3a3a !important; stroke: #3a3a3a !important; }
          /* node labels */
          .node text, .label text { font-family: 'SF Pro Display', -apple-system, sans-serif !important; }
          /* cluster background */
          .cluster rect { fill: #000000 !important; }
        `;
        svgEl.prepend(style);
      }).catch(console.error);
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full border border-edge overflow-x-auto py-4"
      style={{ minHeight: 120 }}
    />
  );
}
