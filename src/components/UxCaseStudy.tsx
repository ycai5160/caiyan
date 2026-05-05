import Image from "next/image";

const imgUxCaseImage1 =
  "https://www.figma.com/api/mcp/asset/411ac46a-b8ff-4dd9-92bc-90812ff57fd9";

const metaRows = [
  { label: "Keywords", value: "视频剪辑 · 内容创作 · AI 工具", flex: false },
  { label: "Role", value: "用户研究 · 产品设计", flex: false },
  { label: "Scope", value: "端到端 · 面向消费者", flex: false },
  { label: "Year", value: "2026", flex: false },
  {
    label: "Overview",
    value:
      `AI 转写工具普遍止步于"生成"，校对与样式统一仍需大量人工介入。通过用户访谈与工作流分析，识别核心痛点，围绕文本—时间轴联动编辑、模型置信度可视化、术语库与预设复用展开设计，覆盖从转写生成到多格式导出的完整链路。`,
    flex: true,
  },
];

export default function UxCaseStudy() {
  return (
    <section
      id="ux"
      className="relative w-full flex flex-col md:flex-row md:h-screen md:min-h-[600px] gap-6 md:gap-12 lg:gap-16 p-6 md:p-10 lg:p-16 bg-black"
    >
      {/* Left: image */}
      <div className="aspect-[4/3] w-full md:aspect-auto md:flex-1 md:h-auto min-w-0 overflow-hidden relative">
        <img
          alt="Subtle — UX case study"
          className="absolute inset-0 w-full h-full object-cover"
          src={imgUxCaseImage1}
        />
      </div>

      {/* Right: content */}
      <div className="md:flex-1 min-w-0 flex flex-col justify-between relative">
        

        {/* Section label */}
        <div className="flex flex-col gap-0 md:gap-1">
          <p
            className="font-bold leading-[1] text-[#0b0b0b] text-[clamp(36px,6vw,70px)] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            UX Design
          </p>
          <p
            className="font-bold leading-5 text-[#f43e0c] text-[13px] md:text-[16px] tracking-[0.3rem]"
            style={{ fontFamily: "var(--font-siyuan)" }}
          >
            个人端对端 UX 设计项目
          </p>
        </div>

        {/* Project detail — mt-8 separates from label on mobile; justify-between handles desktop */}
        <div className="flex flex-col gap-5 md:gap-6 mt-8 md:mt-0">
          <p
            className="font-bold text-[clamp(20px,3.5vw,40px)] text-white tracking-[-0.8px] leading-tight"
            style={{ fontFamily: "var(--font-sf-pro)" }}
          >
            Subtle／视频字幕转写与编辑平台
          </p>

          {/* Metadata rows */}
          <div className="flex flex-col">
            {metaRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-start py-2 md:py-2.5 border-b border-[#1e1e1e] ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <div className="shrink-0 w-24 md:w-32 lg:w-40">
                  <span
                    className="text-[#747474] text-[12px] md:text-[14px] tracking-[-0.32px]"
                    style={{ fontFamily: "var(--font-sf-pro)" }}
                  >
                    {row.label}
                  </span>
                </div>
                <span
                  className={`text-white text-[12px] md:text-[13px] lg:text-[14px] tracking-[-0.28px] leading-relaxed ${
                    row.flex ? "flex-1 min-w-0" : ""
                  }`}
                  style={{ fontFamily: "var(--font-siyuan)" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
