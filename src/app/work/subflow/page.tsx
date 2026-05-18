import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import MermaidChart from "@/components/MermaidChartWrapper";

export const metadata: Metadata = {
  title: "Subflow — UX Case Study",
  description: "Subflow：面向视频创作者的 AI 字幕编辑工具。用户研究、产品设计与 MVP 交付全过程。",
};

const sf = "var(--font-sf-pro)";
const sc = "var(--font-siyuan)";

/* ── Data ─────────────────────────────────────────────── */

const features = [
  {
    tag: "转录提示词",
    desc: "允许创作者在转录前以自然语言描述视频内容，使 AI 在处理前掌握正确的词汇语境。",
    image: "/Prompt.png",
    imageAlt: "转录提示词界面",
    animated: false,
  },
  {
    tag: "AI 置信度可视化",
    desc: "将模型的不确定性直接呈现在转录稿中，引导创作者精准定位需要核查的区域，免去逐行扫描的负担。",
    image: "/confidence.gif",
    imageAlt: "AI 置信度可视化界面",
    animated: true,
  },
  {
    tag: "安全区预览",
    desc: "在导出前将平台的界面遮挡区域可视化，避免字幕发布后被平台元素覆盖。",
    image: "/overview-safezone.png",
    imageAlt: "安全区预览界面",
    animated: false,
  },
];

const principles = [
  {
    id: "01",
    title: "事前干预",
    desc: "在错误发生前为 AI 提供上下文，而非仅仅提供事后修正工具。直接应对上游 AI 缺乏上下文的问题。",
  },
  {
    id: "02",
    title: "呈现不确定性",
    desc: "将模型的识别置信度直接呈现给用户，使创作者能够定向导航并调整转录稿，免去逐行审核的负担。直接应对下游用户缺乏信号的问题。",
  },
];

const decisions = [
  {
    id: "01",
    title: "转录提示词",
    paragraphs: [
      "AI 转录在处理垂直术语、嘉宾名字、网络用语和文化背景词等特定领域词汇时，失败率最高。由于模型在处理前对视频内容一无所知，每一次识别失败都会直接增加下游的校对工作量。",
      "为此，在配置阶段增加了自由文本输入框，允许创作者在转录开始前以自然语言描述视频内容。选择自然语言而非词汇列表，是因为它能同时传递场景、讲者和词汇语境，无需创作者提前预判哪些词汇可能出错。输入框底部设有语言、讲者、术语表三个快捷项，作为结构化的补充输入。自然语言负责处理场景级的上下文，而快捷标签则用于处理明确指定的参数。",
      "界面标题采用了提问方式以直接传达输入的预期形式，从而降低认知门槛。下方的提示文本进一步缩短了学习曲线，初次使用的创作者无需猜测书写内容，示例本身即是格式说明。目前大多数面向创作者的消费级工具会直接跳过该步骤进入转录。由于该能力在 API 层面已经具备，产品层面的缺口主要取决于设计决策。",
    ],
  },
  {
    id: "02",
    title: "AI 置信度可视化",
    paragraphs: [
      "即便引入了上游的上下文输入，AI 转录也无法保证完全准确，而创作者往往习惯于逐行检查所有内容。因此，设计机会在于帮助用户在校对过程中合理分配注意力，而非彻底消除校对环节。",
      "AI 会为每个转录词汇生成置信度分数，用以衡量识别结果的确定程度。低于设定阈值的词汇会在视觉上通过高亮和下划线进行标记，提示用户重点核查。此举旨在将用户的注意力从均等扫描引导至真正需要人工判断的区域。",
      "在面对转录错误时，行业的常见反应是追求更完美的模型。而本设计则转换了思考视角：在模型并不完美的前提下，界面如何帮助用户更高效地工作。通过将模型的不确定性转化为导航工具，而非将其隐藏，从而提升效率。",
      "在修正交互方面，前期曾探索过弹出层方案，即点击标记词触发建议弹窗。但该方案需要额外的操作步骤才能看到备选内容，容易打断校对节奏。最终优化为内联文本方案：备选词直接显示在标记词下方，用户按下 Tab 键即可一键确认；若建议有误，直接输入新文本即可，提示文字会立即消失，不产生任何干扰。",
    ],
  },
  {
    id: "03",
    title: "时间码与讲者编辑",
    paragraphs: [
      "调研显示，时间轴调整是耗时最长的单一步骤。传统的时间轴拖拽依赖视觉估算，用户需要寻找字幕块、拖拽至大概位置、预览并反复微调，多次循环累积了较高的时间成本。",
      "本设计将对轴流程拆分为两个明确的操作步骤：利用双柄滑块锁定大致范围，对应字幕的持续时长；利用微调按钮以 0.1 秒为单位进行精准控制。将模糊的估算替换为高控制感的两步操作，从而减少反复预览的次数。",
      "同时，讲者标签直接显示在字幕块上。针对访谈、综艺和双人对话等内容，多位讲者的字幕在视觉上需要明确区分。如果讲者信息不准确，样式的分配就难以进行。用户点击讲者标签即可直接完成重命名、重新分配或合并讲者。标注完成后，系统将独立设定每位讲者的字幕风格，一次配置即可应用至全片，无需逐条处理。",
    ],
  },
  {
    id: "04",
    title: "安全区预览",
    paragraphs: [
      "主流短视频平台通常会在画面的固定区域叠加界面元素，如按钮、操作手柄和平台自带字幕。如果字幕落在这些区域，发布后就会被遮挡，而这一问题在传统的编辑阶段是不可见的。",
      "为此，视频预览区内置了安全区叠加层。开启后，界面会以遮罩形式标示各个平台的界面覆盖范围，使潜在的视觉冲突在导出前清晰可见。创作者可以根据目标发布平台自由切换安全区，直接在预览中判断是否需要调整字幕位置，无需增加额外的操作步骤。",
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
            约 12 分钟
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
              { label: "工具", value: "Figma" },
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
              Subflow 是一款 AI 字幕编辑工具。由于 AI 转录结果客观存在误差，该工具侧重于通过界面设计优化创作者处理输出内容的效率。其核心策略是在转录开始前减少可预见的错误，并在编辑阶段降低验证内容所需的认知成本。
            </p>
            <div className="border-y border-edge divide-y divide-edge">
              {features.map((f, i) => (
                <div key={f.tag} className="py-5">
                  <div className="flex gap-5">
                    <span className="shrink-0 text-muted text-[12px] tabular-nums pt-0.5 w-5" style={{ fontFamily: sf }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-fg text-[15px] font-bold tracking-[-0.3px]" style={{ fontFamily: sf }}>
                        {f.tag}
                      </span>
                      <span className="text-secondary text-[15px] leading-[1.8] tracking-[-0.2px]">
                        {f.desc}
                      </span>
                    </div>
                  </div>
                  {f.image && (
                    f.animated
                      ? <img src={f.image} alt={f.imageAlt} loading="lazy" decoding="async" className="w-full border border-edge mt-4" />
                      : <Image src={f.image} alt={f.imageAlt} className="w-full border border-edge mt-4" width={1920} height={1080} sizes="(max-width: 767px) calc(100vw - 48px), 680px" style={{ width: "100%", height: "auto" }} />
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* 问题背景 */}
          <Section label="问题背景">
            <p className="body-p">
              新媒体平台的高频更新节奏对内容生产效率提出了持续挑战。为了跟上更新频率，创作者需要压缩整个制作流程的周期，字幕制作也是其中关键的一环。
            </p>
            <p className="body-p">
              虽然 AI 转录加快了文稿生成的初速度，但对创作者而言，理想的字幕工具应当贯穿完整流程。这包括准确识别视频中的专有词汇、精准对轴以及控制句子长度以避免文本溢出。对于短视频和综艺创作者，还需要为特定字幕添加视觉效果。在这些精细化需求方面，现有的 AI 转录工具仍有较大的提升空间。
            </p>
          </Section>

          {/* 研究与发现 */}
          <Section label="研究与发现">
            <SubSection title="竞品分析">
              <p className="body-p">
                市场上的相关工具大致分为两类：以 Descript 和 Otter 为代表的转录优先型工具，以及以 Submagic、VEED 和 Captions 为代表的创作者优先型工具。
              </p>
              <p className="body-p">
                转录优先型工具侧重于准确率与文稿处理，其编辑体验完全围绕文本展开，但视觉样式定制能力有限。创作者优先型工具则侧重于视觉输出，提供动态字幕模板与平台预设，但转写准确率参差不齐。这两类工具各自优化了工作流的不同环节，但覆盖范围都受限于其核心定位。
              </p>
            </SubSection>

            <SubSection title="用户研究">
              <p className="body-p">
                通过对 9 位视频创作者进行开放式问卷调研，并要求受访者逐步还原上一次字幕制作的完整过程，结果显示校对环节占据了总制作时间的 30% 到 50%。
              </p>
              <p className="body-p">
                受访者的描述揭示了具体的痛点。部分受访者表示，理想中的工具应当能够自动标注出可能有误的位置，而不是由人工逐行排查。同时，AI 经常无法识别特定视频内容中的网络词汇和文化背景词，且在后续的视频制作中会重复出现相同的错误。在提及最耗时的步骤时，多位受访者均指向了时间轴调整，主要原因在于需要反复聆听音频以对齐时间，这一过程消耗了大量时间。
              </p>
            </SubSection>

            <SubSection title="工作流阶段分析">
              <WorkflowTable />
            </SubSection>
          </Section>

          {/* 核心洞察 */}
          <Section label="核心洞察">
            <p className="body-p">
              研究表明，问题主要集中在两个干预点。
            </p>
            <p className="body-p">
              <strong className="text-fg font-bold">上游层面，AI 缺乏上下文。</strong>模型在处理每个视频时对主题、讲者和词汇一无所知，这导致某些错误在转录稿生成之前就已经注定。
            </p>
            <p className="body-p">
              <strong className="text-fg font-bold">下游层面，用户缺乏反馈信号。</strong>在编辑阶段，创作者无法判断问题具体出在哪里，因此不得不对每一行文本投入相同的注意力，造成了精力浪费。此外，用户的操作也分散在不同的面板之间，例如时间码、讲者信息和样式调整分别位于不同区域。
            </p>
            <p className="body-p">
              初步研究将问题界定为字幕校对耗时较长。进一步分析表明，核心问题不在于 AI 准确率的绝对上限，而在于用户需要全面检查所有输出内容。即便转录整体准确率较高，由于界面未能提供 AI 识别置信度的相关提示，创作者仍需逐行排查。因此，虽然生成成本有所下降，但验证成本依然较高。
            </p>
            <div className="bg-surface px-8 py-10">
              <p className="text-fg text-[18px] md:text-[20px] leading-[1.65] tracking-[-0.4px]">
                如何通过界面设计，帮助创作者更高效地处理 AI 转录输出中不可避免的误差？
              </p>
            </div>
          </Section>

          {/* 设计原则 */}
          <Section label="设计原则">
            <p className="body-p">针对上述问题洞察，本产品确立了两项核心设计原则。</p>
            <div className="border-y border-edge divide-y divide-edge">
              {principles.map((p) => (
                <div key={p.id} className="flex gap-5 py-5">
                  <span className="shrink-0 text-muted text-[12px] tabular-nums pt-0.5 w-5" style={{ fontFamily: sf }}>
                    {p.id}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-fg text-[15px] font-bold tracking-[-0.3px]" style={{ fontFamily: sf }}>
                      {p.title}
                    </span>
                    <span className="text-secondary text-[15px] leading-[1.8] tracking-[-0.2px]">
                      {p.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 设计决策 */}
          <Section label="设计决策">
            <div className="flex flex-col">
              {decisions.map((d) => (
                <div key={d.id} className="pt-10 md:pt-12 border-t border-edge">
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
                  <div className="flex flex-col gap-4 pb-10 md:pb-12">
                    {d.paragraphs.map((p, i) => (
                      <p key={i} className="body-p">{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 设计呈现 */}
          <Section label="设计呈现">
            <p className="body-p">
              Subflow 的核心结构由两个主要区域组成：用于管理项目的项目主页，以及进行核心编辑的项目空间。在项目内部，编辑器采用了统一的单屏工作界面。AI 审阅、安全区预览和样式控制均集成在此界面中，而非相互独立的视图。
            </p>
            <p className="body-p">
              项目内的操作流程呈现线性结构，分为配置、编辑和导出三个阶段。决策在配置阶段前置完成，使编辑器能够完全专注于校对与样式调整。
            </p>

            <MermaidChart />

            <div className="flex flex-col mt-4">
              {phases.map((ph, i) => (
                <div key={ph.label} className="py-8 border-t border-edge">
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-muted text-[11px] tabular-nums shrink-0" style={{ fontFamily: sf }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-fg text-[15px] font-bold tracking-[-0.3px]" style={{ fontFamily: sf }}>
                      {ph.label}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {ph.paragraphs.map((p, j) => (
                      <p key={j} className="body-p">{p}</p>
                    ))}
                    {ph.image && (
                      <Image
                        src={ph.image}
                        alt={ph.imageAlt}
                        className="w-full border border-edge mt-2"
                        width={1920}
                        height={1080}
                        sizes="(max-width: 767px) calc(100vw - 48px), 680px"
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 回顾与反思 */}
          <Section label="回顾与反思">
            <p className="body-p">
              在开发 AI 产品的过程中，通常直觉上会把重心放在提升模型能力上，例如追求更准确、更快速和更自动化。但该项目表明，在 AI 输出不可避免存在误差的前提下，如何让用户对整个工作过程保有掌控感，是更具设计价值的课题。转录提示词和置信度可视化并非替用户做决定，而是将关键信息和控制权重新交还给用户。
            </p>
            <p className="body-p">
              同时，设计中仍存在一处需要正视的缺口。转录提示词目前缺乏明确的反馈回路。创作者在转录前描述了视频内容，但后续无法直观地看到 AI 如何利用了这些信息，例如哪些词汇因提示词而得到了改善。这种干预过程的不可见性，使得用户在实际使用中难以逐渐建立对该功能的强信任感。
            </p>
            <SubSection title="后续方向">
              <div className="border-y border-edge divide-y divide-edge">
                {[
                  {
                    title: "多语言支持",
                    desc: "需要跨市场发布的创作者通常需要为同一段视频制作多语种字幕轨道，而当前的流程将每种语言视为独立项目处理。支持第二语言轨道与原始字幕的并行编辑，是产品未来最重要的演进方向。",
                  },
                  {
                    title: "多人同时说话",
                    desc: "当前的数据模型假设字幕块呈线性顺序排列，且每个时间段仅对应一条字幕。当出现两人重叠发言时，这一假设便不再适用。解决该问题需要系统支持时间码重叠的双轨结构、独立的位置分区以及按轨道分设的视觉样式，这已超出了现有编辑器的基础架构范围。",
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

