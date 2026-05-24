import Link from "next/link";
import type { Metadata } from "next";
import MermaidChart from "@/components/MermaidChartWrapper";
import LazyVideo from "@/components/LazyVideo";

export const metadata: Metadata = {
  title: "Subflow — UX Case Study",
  description: "Subflow：面向视频创作者的 AI 字幕编辑工具。用户研究、产品设计与 MVP 交付全过程。",
};

const sf = "var(--font-sf-pro)";
const sc = "var(--font-siyuan)";

/* ── Data ─────────────────────────────────────────────── */

const principles = [
  {
    id: "01",
    title: "在错误发生前提供上下文",
    desc: "",
  },
  {
    id: "02",
    title: "在验证阶段暴露不确定性",
    desc: "",
  },
];

const decisions = [
  {
    id: "01",
    title: "转录提示词",
    image: "/prompt.mp4",
    paragraphs: [
      "AI 转录在处理垂直领域术语、嘉宾名称、网络用语与文化背景词时，识别错误率较高。根本原因在于模型在处理前缺乏对视频主题与词汇语境的了解。基于此，项目在配置阶段引入了自然语言提示词输入区域，允许创作者在转录开始前描述视频内容。该能力在语音识别模型 API 层面已经具备，但目前大多数面向创作者的工具会直接跳过该步骤进入转录。",
      "为降低认知门槛，输入框内直接提供示例作为占位提示，例如“两位主持人评测摄影机，讨论动态范围、色彩科学与传感器尺寸”。用户无需阅读额外说明，即可直观理解输入预期及其对转录结果的影响。",
    ],
  },
  {
    id: "02",
    title: "AI 置信度可视化",
    image: "/confidence.mp4",
    paragraphs: [
      "即便具备上游上下文，AI 转录仍无法完全避免误差。研究表明，用户耗时的核心不在于修改动作本身，而在于无法预判错误位置，进而导致注意力被平均分配至所有输出结果。",
      "设计重点因此转化为：如何协助用户更高效地验证 AI 输出，而非一味追求绝对准确。语音转录模型会为生成的每个词汇计算置信度分数，本设计将这一通常被隐藏的不确定性转化为导航信息，从而在模型不完美的前提下提升工作效率。",
      "在交互方式上，早期曾测试弹窗方案（点击标记词弹出建议），但这会增加操作步骤并打断校对节奏。进一步分析表明，字幕编辑属于高频微调任务，用户的核心操作为重听、判断和修改。最终方案采用内联编辑：低置信度词汇在正文中予以高亮提示，点击目标词语显示内联建议，用户可通过 Tab 键快捷确认或直接输入覆盖。",
    ],
  },
  {
    id: "03",
    title: "时间码与讲者编辑",
    image: "/timecode.mp4",
    paragraphs: [
      "用户调研指出，时间码调整耗时最长。传统时间轴拖拽高度依赖视觉估算，用户需经历拖拽、试听、微调、再次预览的循环，时间成本较高。",
      "当前 MVP 版本将时间调整拆解为两个明确步骤：利用双柄滑块快速锁定范围，并通过微调按钮以 1 帧为单位进行精准控制。这种分步操作将模糊估算转化为具备高控制感的过程，有效减少了反复预览的次数。",
    ],
  },
  {
    id: "04",
    title: "安全区预览",
    image: "/safezone.mp4",
    paragraphs: [
      "主流短视频平台常在特定区域叠加界面元素，如互动按钮与平台自带字幕。若生成字幕落入这些区域，发布后将被遮挡，而此问题在编辑阶段往往不可见。",
      "为此，视频预览区内置了安全区叠加层。开启后，系统以遮罩形式呈现各平台的界面覆盖范围。创作者可依据目标发布平台切换对应的安全区，直接在预览中排查字幕位置冲突，不增加额外的操作负担。",
    ],
  },
];

const phases = [
  {
    label: "配置",
    paragraphs: [
      "新建项目从上传文件或粘贴链接开始。创作者在提示词字段中以自然语言描述视频内容，并可通过语言、讲者、术语表等快捷项补充结构化参数。虽然提示词字段为非必填项，但对于包含特定专业词汇的内容，这是转录开始前影响最终准确率的关键操作。",
    ],
    image: null as string | null,
    imageAlt: "",
  },
  {
    label: "编辑",
    paragraphs: [
      "编辑器采用单一统一工作区的布局。转录稿位于界面中央，是所有校对工作发生的核心区域。视频预览位于右侧，提供实时画面参考。样式控制占据左侧面板，在视觉上保持低调，确保需要时随时可用。",
      "AI 审阅、时间码编辑、讲者编辑和安全区预览全部集成在该界面内。触发 AI 审阅后，转录稿进入专注校对模式，低置信度词汇自动高亮，内联文字呈现修改建议。安全区预览通过视频面板上的开关进行切换。时间码和讲者编辑则直接在转录块上弹出内联编辑层。此外，编辑器内置了每行字符数（CPL）检测功能，超出上限的字幕会被实时标注，避免文本溢出问题在发布后才被发现。",
    ],
    image: "/editor.png" as string | null,
    imageAlt: "编辑器界面",
  },
  {
    label: "预览与导出",
    paragraphs: [
      "在最终导出前，创作者可以开启安全区叠加层，以遮罩形式核对目标平台的界面覆盖范围。确认字幕位置无误后，即可按照所需的格式导出最终文件。",
    ],
    image: null as string | null,
    imageAlt: "",
  },
];

/* ── Page ─────────────────────────────────────────────── */

export default function SubflowCaseStudy() {
  return (
    <main className="bg-bg text-fg min-h-screen" style={{ fontFamily: sc }}>

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-50 border-b border-edge bg-bg/90 backdrop-blur-md">
        <div className="max-w-[680px] mx-auto px-6 md:px-0 h-[52px] flex items-center justify-between">
          <Link
            href="/#ux"
            className="text-muted text-[13px] hover:text-fg transition-colors duration-200"
            style={{ fontFamily: sf }}
          >
            ← Work
          </Link>
          <span className="text-muted text-[12px] tracking-wide" style={{ fontFamily: sf }}>
            约 5 分钟
          </span>
        </div>
      </nav>

      <article className="max-w-[680px] mx-auto px-6 md:px-0 pt-14 md:pt-20 pb-28 md:pb-36">

        {/* ── Header ── */}
        <header className="mb-14 md:mb-18">
          <p
            className="text-accent text-[11px] tracking-[0.28em] uppercase mb-5"
            style={{ fontFamily: sf }}
          >
            UX Design · 个人项目
          </p>

          <h1
            className="font-bold leading-[0.9] tracking-[-0.04em] text-fg mb-5"
            style={{ fontFamily: sf, fontSize: "clamp(56px, 10vw, 96px)" }}
          >
            Subflow
          </h1>

          <p className="text-secondary text-[19px] leading-[1.7] tracking-[-0.3px] mb-12">
            面向视频创作者的 AI 字幕编辑工具
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 pt-8 border-t border-edge">
            {[
              { label: "角色", value: "独立设计师" },
              { label: "阶段", value: "MVP" },
              { label: "工具", value: "Figma · Claude Code" },
              { label: "年份", value: "2026" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-muted text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: sf }}>
                  {label}
                </span>
                <span className="text-fg text-[14px] tracking-[-0.2px]" style={{ fontFamily: sf }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* ── Body ── */}
        <div className="flex flex-col gap-14 md:gap-18">

          {/* 项目概述 */}
          <Section label="项目概述">
            <p className="body-p">
              Subflow 是一款人工智能驱动的字幕编辑工具，旨在减轻 AI 转录后的人工校对负担。通过上下文输入与置信度可视化，帮助创作者更高效地处理 AI 输出结果。
            </p>
          </Section>

          {/* 问题背景 */}
          <Section label="问题背景">
            <p className="body-p">
              随着短视频平台内容更新节奏持续加快，AI 转录已显著缩短字幕生成所需的时间。当前市场的工具已具备自动转录、讲者识别、动态字幕与模板化包装等功能。
            </p>
            <p className="body-p">
              然而，对创作者而言，字幕制作并非仅限于生成文本。在实际工作流中，专有词汇识别、时间码调整、字幕样式设置等后续编辑需求依然存在。因此，本项目的关注点在于：在 AI 已经达到了一定的生成效率前提下，字幕工作流中仍存在哪些影响编辑体验的核心问题。
            </p>
          </Section>

          {/* 研究与发现 */}
          <Section label="研究与发现">
            <SubSection title="竞品分析">
              <p className="body-p">
                当前市场的相关工具主要分为两类：转录优先型（如 Descript、Otter）与创作者优先型（如 VEED、Submagic、Captions）。前者侧重准确率与文稿处理，视觉样式定制能力有限；后者侧重动态字幕与视觉包装，但转写准确率参差不齐。两类产品分别优化了工作流的不同阶段，但覆盖范围都受限于自身定位。
              </p>
              <CompetitiveMatrix />
            </SubSection>

            <SubSection title="用户研究">
              <p className="body-p">
                通过对 9 位视频创作者进行开放式调研，并要求受访者还原最近一次的字幕制作流程，结果显示，校对环节占据了总制作时间的 30% 至 50%。受访者的反馈集中揭示了几个反复出现的问题：AI 容易错误识别网络词汇与文化背景词，且相同词汇会在不同视频中重复出错；时间码调整是最耗时的单一步骤，主要原因是需要反复聆听音频以对齐时间。多位受访者明确指出，理想的工具应当能够主动标记潜在错误位置，而非依赖人工逐句排查。
              </p>
            </SubSection>

            <SubSection title="工作流阶段分析">
              <WorkflowTable />
            </SubSection>
          </Section>

          {/* 核心洞察 */}
          <Section label="核心洞察">
            <p className="body-p">
              研究后发现，问题主要集中在两个干预点。
            </p>
            <p className="body-p">
              <strong className="text-fg font-bold">上游层面，AI 缺乏上下文。</strong>模型在处理视频时对主题、讲者和词汇缺乏背景认知，导致部分错误在转录生成前就已存在。
            </p>
            <p className="body-p">
              <strong className="text-fg font-bold">下游层面，用户缺乏反馈信号。</strong>即使整体转录准确率较高，创作者在编辑阶段也无法准确定位问题区域，从而不得不对所有字幕投入均等的注意力。
            </p>
            <p className="body-p">
              因此，核心痛点不仅在于 AI 准确率的物理上限，更在于整个工作流缺少针对错误产生前与错误验证时的有效干预机制。
            </p>
          </Section>

          {/* 设计原则 */}
          <Section label="设计原则">
            <div className="flex flex-col gap-5 pb-5">
            <p className="body-p">
            针对上述洞察，本产品确立了两项核心设计原则：
            </p>
              {principles.map((p) => (
                <div key={p.id} className="flex gap-5 ">
                  <span className="shrink-0 text-muted text-[12px] tabular-nums pt-0.5 w-5" style={{ fontFamily: sf }}>
                    {p.id}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-fg text-[15px] font-bold tracking-[-0.3px]" style={{ fontFamily: sf }}>
                      {p.title}
                    </span>
                    {p.desc && (
                      <span className="text-secondary text-[15px] leading-[1.8] tracking-[-0.2px]">
                        {p.desc}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <ProblemStructure />
          </Section>

          {/* 核心设计 */}
          <Section label="核心设计">
            <div className="flex flex-col">
              {decisions.map((d) => (
                <div key={d.id} className="pt-10 md:pt-12 border-t border-edge first:border-t-0 first:pt-0">
                  <span
                    aria-hidden="true"
                    className="block font-bold leading-none select-none mb-3 tracking-[-0.05em]"
                    style={{ fontFamily: sf, fontSize: "clamp(64px, 10vw, 88px)", color: "var(--color-edge-lg)" }}
                  >
                    {d.id}
                  </span>
                  <h3
                    className="text-fg text-[20px] md:text-[22px] font-bold tracking-[-0.5px] leading-tight mb-7"
                    style={{ fontFamily: sf }}
                  >
                    {d.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {d.paragraphs.map((p, i) => (
                      <p key={i} className="body-p">{p}</p>
                    ))}
                  </div>
                  {d.image && (
                    <div className="mt-6 pb-10 md:pb-12">
                      <LazyVideo
                        src={d.image}
                        className="w-full rounded-lg"
                        style={{ border: "1px solid var(--color-edge)" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

        

          {/* 回顾与反思 */}
          <Section label="回顾与反思">
            <p className="body-p">
              在 AI 产品设计领域，行业常优先关注生成速度、模型准确率与自动化程度。本项目实践表明，在 AI 输出不可避免存在误差的前提下，协助用户对输出结果建立信任与掌控感同样关键。转录提示词与置信度可视化的核心目的并非替代用户决策，而是赋能用户更高效地理解、验证与修正 AI 的输出内容。
            </p>
            <p className="body-p">
              目前项目仍存在一处设计缺口：提示词输入缺乏明确的反馈回路。用户提供上下文后，系统未能直观展示哪些转录结果因此得到了优化。这种干预效果的不可见性，增加了用户建立系统信任的难度。
            </p>
            <SubSection title="后续方向">
              <div className="border-y border-edge divide-y divide-edge">
                {[
                  {
                    title: "多语言支持",
                    desc: "当前流程将不同语言视为独立项目处理。支持双语轨道与原始字幕并行编辑，是产品下一阶段的核心演进方向。",
                  },
                  {
                    title: "多人同时发言场景",
                    desc: "现有数据模型基于字幕块的线性排列假设，无法有效处理时间码重叠。解决该问题需重构基础架构，以支持双轨时间结构、字幕位置独立分区及多讲者的差异化样式设置。",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-fg text-[15px] font-bold tracking-[-0.3px]" style={{ fontFamily: sf }}>
                        {item.title}
                      </span>
                      <span className="text-secondary text-[15px] leading-[1.8] tracking-[-0.2px]">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SubSection>
          </Section>

        </div>

        {/* ── Footer nav ── */}
        <div className="mt-20 md:mt-24 pt-8 border-t border-edge flex items-center justify-between">
          <Link
            href="/#ux"
            className="text-muted text-[13px] hover:text-fg transition-colors duration-200"
            style={{ fontFamily: sf }}
          >
            ← Back to Work
          </Link>
          <span className="text-muted text-[12px] tracking-[0.15em] uppercase" style={{ fontFamily: sf }}>
            蔡言 · 2026
          </span>
        </div>

      </article>
    </main>
  );
}

/* ── Layout helpers ────────────────────────────────────── */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <span
          className="text-accent text-[10px] tracking-[0.28em] uppercase font-bold shrink-0"
          style={{ fontFamily: "var(--font-sf-pro)" }}
        >
          {label}
        </span>
        <div className="flex-1 h-px bg-edge" />
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 pt-8 first:pt-0">
      <p className="text-muted text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "var(--font-sf-pro)" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

/* ── Workflow table ────────────────────────────────────── */

function WorkflowTable() {
  const rows = [
    {
      phase: "导入媒体文件",
      problem: "文件格式与来源多样，容易出现导入障碍。",
      opportunity: "明确支持的格式范围，提供清晰的错误提示。",
      focus: false,
    },
    {
      phase: "生成转录文稿",
      problem: "特定领域词汇与文化背景词识别失败率高。",
      opportunity: "转录前提供上下文输入。",
      focus: false,
    },
    {
      phase: "校对与样式精修",
      problem: "需要逐句核对，无法快速定位高误差区域；时间码细调耗时最长。",
      opportunity: "将模型置信度呈现给用户，实现时间轴与文稿联动编辑。",
      focus: true,
    },
    {
      phase: "多语字幕",
      problem: "译文需要二次修订；网络词汇与文化背景词难以处理。",
      opportunity: "界定为 MVP 范围外，作为后续演进方向。",
      focus: false,
    },
    {
      phase: "预览与导出",
      problem: "平台界面遮挡区域在编辑阶段不可见，发布后才暴露问题。",
      opportunity: "在导出前将平台安全区可视化。",
      focus: false,
    },
  ];

  const thStyle: React.CSSProperties = {
    fontFamily: "var(--font-sf-pro)",
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--color-muted)",
    padding: "10px 14px",
    textAlign: "left",
    fontWeight: 500,
  };

  const tdStyle: React.CSSProperties = {
    fontFamily: "var(--font-siyuan)",
    fontSize: 13,
    lineHeight: 1.7,
    letterSpacing: "-0.1px",
    padding: "12px 14px",
    verticalAlign: "top",
    color: "var(--color-secondary)",
  };

  const tdPhaseStyle: React.CSSProperties = {
    ...tdStyle,
    fontFamily: "var(--font-sf-pro)",
    fontSize: 12,
    color: "var(--color-fg)",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };

  return (
    <div className="border border-edge overflow-x-auto">
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-edge)" }}>
            <th style={{ ...thStyle, width: "28%" }}>工作流阶段</th>
            <th style={{ ...thStyle, borderLeft: "1px solid var(--color-edge)" }}>核心问题</th>
            <th style={{ ...thStyle, borderLeft: "1px solid var(--color-edge)" }}>设计机会</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.phase}
              style={{
                borderBottom: i < rows.length - 1 ? "1px solid var(--color-edge)" : "none",
                background: row.focus ? "var(--color-surface)" : "transparent",
              }}
            >
              <td style={tdPhaseStyle}>
                {row.focus && (
                  <span
                    style={{
                      display: "inline-block",
                      marginBottom: 4,
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-sf-pro)",
                    }}
                  >
                    最耗时
                  </span>
                )}
                <br style={row.focus ? undefined : { display: "none" }} />
                {row.phase}
              </td>
              <td style={{ ...tdStyle, borderLeft: "1px solid var(--color-edge)" }}>{row.problem}</td>
              <td style={{ ...tdStyle, borderLeft: "1px solid var(--color-edge)" }}>{row.opportunity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Problem structure ─────────────────────────────────── */

function ProblemStructure() {
  const W = 680;
  const H = 460;
  const accent = "var(--color-accent)";
  const fg = "var(--color-fg)";
  const edge = "var(--color-edge)";
  const muted = "var(--color-muted)";

  const stages = ["配置", "转录", "校对", "导出"];
  const boxW = 130;
  const boxH = 48;
  const startX = 30;
  const gap = (W - startX * 2 - boxW * stages.length) / (stages.length - 1);
  const xs = stages.map((_, i) => startX + i * (boxW + gap));

  const upstreamIdx = 1;
  const downstreamIdx = 2;

  const workflowY = 30;
  const problemY = 150;
  const principleY = 320;
  const zoneW = xs[upstreamIdx] + boxW - xs[0];
  const zoneH = 92;

  const groups = [
    {
      x: xs[0],
      targetIdx: upstreamIdx,
      problemEyebrow: "上游问题",
      problemTitle: "AI 缺少上下文",
      principleEyebrow: "设计原则 01",
      principleTitle: "事前干预",
    },
    {
      x: xs[downstreamIdx],
      targetIdx: downstreamIdx,
      problemEyebrow: "下游问题",
      problemTitle: "用户缺少反馈信号",
      principleEyebrow: "设计原则 02",
      principleTitle: "暴露不确定性",
    },
  ];

  return (
    <div className="border border-edge bg-bg" style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block"
        role="img"
        aria-label="设计原则结构图：从工作流问题映射到对应设计原则"
      >
        {/* Workflow row (top) */}
        {stages.map((s, i) => {
          const isHighlight = i === upstreamIdx || i === downstreamIdx;
          return (
            <g key={s}>
              <rect
                x={xs[i]}
                y={workflowY}
                width={boxW}
                height={boxH}
                fill="none"
                stroke={edge}
                strokeWidth={1}
              />
              <text
                x={xs[i] + boxW / 2}
                y={workflowY + boxH / 2 + 5}
                textAnchor="middle"
                fontFamily="var(--font-sf-pro)"
                fontSize="14"
                fontWeight={isHighlight ? 700 : 500}
                fill={fg}
              >
                {s}
              </text>
            </g>
          );
        })}

        {/* Stage-to-stage arrows */}
        {stages.slice(0, -1).map((_, i) => {
          const arrowX = xs[i] + boxW + gap / 2;
          const arrowY = workflowY + boxH / 2;
          return (
            <polyline
              key={i}
              points={`${arrowX - 4},${arrowY - 4} ${arrowX + 2},${arrowY} ${arrowX - 4},${arrowY + 4}`}
              fill="none"
              stroke={muted}
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Problem + Principle groups */}
        {groups.map((g, i) => {
          const stageCenterX = xs[g.targetIdx] + boxW / 2;
          const zoneCenterX = g.x + zoneW / 2;
          return (
            <g key={i}>
              {/* Workflow -> Problem connector */}
              <line
                x1={stageCenterX}
                y1={workflowY + boxH}
                x2={stageCenterX}
                y2={problemY}
                stroke={muted}
                strokeWidth={1}
                strokeDasharray="3 3"
              />

              {/* Problem zone */}
              <rect x={g.x} y={problemY} width={zoneW} height={zoneH} fill="none" stroke={edge} strokeWidth={1} />
              <text x={zoneCenterX} y={problemY + 30} textAnchor="middle" fontFamily="var(--font-sf-pro)" fontSize="9" letterSpacing="2.5" fontWeight={600} fill={muted}>
                {g.problemEyebrow}
              </text>
              <text x={zoneCenterX} y={problemY + 62} textAnchor="middle" fontFamily="var(--font-sf-pro)" fontSize="17" fontWeight={700} fill={fg}>
                {g.problemTitle}
              </text>

              {/* Problem -> Principle connector with arrowhead */}
              <line
                x1={zoneCenterX}
                y1={problemY + zoneH}
                x2={zoneCenterX}
                y2={principleY}
                stroke={muted}
                strokeWidth={1.25}
              />
              <polyline
                points={`${zoneCenterX - 5},${principleY - 6} ${zoneCenterX},${principleY} ${zoneCenterX + 5},${principleY - 6}`}
                fill="none"
                stroke={muted}
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Principle zone (only accent in the diagram) */}
              <rect x={g.x} y={principleY} width={zoneW} height={zoneH} fill={accent} fillOpacity={0.12} stroke="#a8280680" strokeWidth={1} />
              <text x={zoneCenterX} y={principleY + 30} textAnchor="middle" fontFamily="var(--font-sf-pro)" fontSize="9" letterSpacing="2.5" fontWeight={600} fill={accent}>
                {g.principleEyebrow}
              </text>
              <text x={zoneCenterX} y={principleY + 62} textAnchor="middle" fontFamily="var(--font-sf-pro)" fontSize="17" fontWeight={700} fill={fg}>
                {g.principleTitle}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Competitive matrix ────────────────────────────────── */

function CompetitiveMatrix() {
  const W = 400;
  const H = 400;
  const padL = 44;
  const padR = 24;
  const padT = 24;
  const padB = 44;
  const x1 = padL;
  const x2 = W - padR;
  const y1 = padT;
  const y2 = H - padB;

  const toX = (v: number) => x1 + (v / 100) * (x2 - x1);
  const toY = (v: number) => y2 - (v / 100) * (y2 - y1);

  const products: {
    name: string;
    logo: string;
    x: number;
    y: number;
    anchor?: "start" | "end" | "middle";
    dy?: number;
  }[] = [
    { name: "Descript", logo: "/Descripts_logo.jpeg", x: 90, y: 32, dy: -18 },
    { name: "Otter", logo: "/Otter_logo.jpeg", x: 72, y: 12, dy: 22 },
    { name: "VEED", logo: "/Veed_logo.png", x: 36, y: 62, dy: -18 },
    { name: "Submagic", logo: "/submagic_logo.jpg", x: 14, y: 92, dy: 22 },
    { name: "Captions", logo: "/Captions_logo.jpg", x: 24, y: 78, dy: 22 },
  ];

  const logoR = 12;

  return (
    <div className="border border-edge bg-bg" style={{ width: "100%", maxWidth: 510, marginInline: "auto" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block"
        role="img"
        aria-label="竞品矩阵图：横轴为文本编辑能力，纵轴为视觉包装能力"
      >
        {/* mid lines */}
        <line x1={toX(50)} y1={y1} x2={toX(50)} y2={y2} stroke="var(--color-edge)" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1={x1} y1={toY(50)} x2={x2} y2={toY(50)} stroke="var(--color-edge)" strokeWidth="0.5" strokeDasharray="2 3" />

        {/* axes */}
        <line x1={x1} y1={y2} x2={x2} y2={y2} stroke="var(--color-fg)" strokeWidth="1" />
        <line x1={x1} y1={y1} x2={x1} y2={y2} stroke="var(--color-fg)" strokeWidth="1" />

        {/* axis arrows */}
        <polygon points={`${x2},${y2} ${x2 - 6},${y2 - 3} ${x2 - 6},${y2 + 3}`} fill="var(--color-fg)" />
        <polygon points={`${x1},${y1} ${x1 - 3},${y1 + 6} ${x1 + 3},${y1 + 6}`} fill="var(--color-fg)" />

        {/* axis labels */}
        <text
          x={(x1 + x2) / 2}
          y={H - 14}
          textAnchor="middle"
          fontFamily="var(--font-sf-pro)"
          fontSize="11"
          fill="var(--color-muted)"
          letterSpacing="1"
        >
          文本编辑能力
        </text>
        <text
          x={16}
          y={(y1 + y2) / 2}
          textAnchor="middle"
          fontFamily="var(--font-sf-pro)"
          fontSize="11"
          fill="var(--color-muted)"
          letterSpacing="1"
          transform={`rotate(-90, 16, ${(y1 + y2) / 2})`}
        >
          视觉包装能力
        </text>

        {/* axis end markers */}
        <text x={x1 + 4} y={y2 - 6} fontFamily="var(--font-sf-pro)" fontSize="9" fill="var(--color-muted)" letterSpacing="1">低</text>
        <text x={x2 - 4} y={y2 - 6} textAnchor="end" fontFamily="var(--font-sf-pro)" fontSize="9" fill="var(--color-muted)" letterSpacing="1">高</text>
        <text x={x1 + 6} y={y1 + 10} fontFamily="var(--font-sf-pro)" fontSize="9" fill="var(--color-muted)" letterSpacing="1">高</text>

        {/* clip paths for logo circles */}
        <defs>
          {products.map((p) => {
            const cx = toX(p.x);
            const cy = toY(p.y);
            return (
              <clipPath key={p.name} id={`logo-clip-${p.name}`}>
                <circle cx={cx} cy={cy} r={logoR} />
              </clipPath>
            );
          })}
        </defs>

        {/* products */}
        {products.map((p) => {
          const cx = toX(p.x);
          const cy = toY(p.y);
          const labelX = cx;
          const labelY = cy + (p.dy ?? 0);
          return (
            <g key={p.name}>
              <image
                href={p.logo}
                x={cx - logoR}
                y={cy - logoR}
                width={logoR * 2}
                height={logoR * 2}
                clipPath={`url(#logo-clip-${p.name})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle
                cx={cx}
                cy={cy}
                r={logoR}
                fill="none"
                stroke="var(--color-edge)"
                strokeWidth={1}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fontFamily="var(--font-sf-pro)"
                fontSize="11"
                fontWeight={500}
                fill="var(--color-fg)"
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

