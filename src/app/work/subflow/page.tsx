import Link from "next/link";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "Subflow — UX Case Study",
  description: "Subflow：面向视频创作者的 AI 字幕编辑工具。用户研究、产品设计与 MVP 交付全过程。",
};

const sf  = "var(--font-sf-pro)";
const sc  = "var(--font-siyuan)";

/* ── Data ─────────────────────────────────────────────── */

const features = [
  {
    tag: "AI 置信度可视化",
    desc: "将转录的不确定性直接呈现在文本中，让创作者知道应该把注意力集中在哪里。",
  },
  {
    tag: "精准时间码编辑",
    desc: "以内联双模式编辑器取代时间轴拖拽，支持粗调与精调两种操作方式。",
  },
  {
    tag: "安全区预览",
    desc: "在导出前将平台 UI 遮挡区域可视化，避免字幕发布后被界面元素覆盖。",
  },
];

const decisions = [
  {
    id: "01",
    title: "AI 置信度可视化",
    paragraphs: [
      "AI 转录无法保证 100% 准确，而创作者倾向于逐行检查所有内容。设计机会在于帮助用户在校对过程中合理分配注意力。",
      "AI 为每个转录词附带置信度分数，衡量模型对识别结果的确定程度。低于阈值的词汇会在视觉上被标记，提示用户这些位置值得重点核查。目标是将注意力从对每个词的均等扫描，引导至真正需要判断的地方。",
      "在修正交互上，我最初探索了弹出层方案——点击标记词触发建议弹窗。问题在于需要额外的操作步骤才能看到备选内容，打断了校对节奏。最终改为幽灵建议方案：备选词内联显示在标记词下方，按 Tab 键一键确认；若建议有误，直接输入即可，幽灵文字立即消失，不产生干扰。",
      "校对体验因此更接近阅读，而非逐条审核。",
    ],
  },
  {
    id: "02",
    title: "时间码编辑",
    paragraphs: [
      "调整字幕时间轴是字幕工作流中最耗时的步骤之一。传统的时间轴拖拽操作存在两个问题：拖拽目标区域小且难以精准点击，帧级定位所需的精度超出了拖拽交互的可靠范围。",
      "解决方案是以双模式时间码编辑器取代拖拽操作。时间码内联显示在每个字幕块旁，点击后弹出包含滑块与输入框的编辑层。滑块用于粗略定位，输入框用于精确调整。编辑操作在上下文中完成，无需切换至独立面板。",
      "两种模式分别对应创作者思考时间的两个层级——先确定大致范围，再精确到具体帧。",
    ],
  },
  {
    id: "03",
    title: "术语库",
    paragraphs: [
      "专有名词是 AI 转录中误识率最高的类别。在没有记忆机制的情况下，创作者需要在每个视频中重复修正相同的词汇。设计挑战在于如何建立这种记忆，同时不增加独立的操作任务。",
      "术语库在转录配置阶段预先加载——早于 AI 处理音频。选择术语库后，工具提示会确认即将应用的词汇范围，让创作者在提交转录前对 AI 的处理优先级有明确预期。",
      "编辑过程中，修正某个词汇时会同步出现内联「添加至术语库」选项，一键保存，不中断当前编辑流程。",
    ],
  },
  {
    id: "04",
    title: "安全区预览",
    paragraphs: [
      "TikTok、Reels 等平台会在视频画面固定区域叠加界面元素——按钮、操作手柄、平台字幕。字幕若落在这些区域，发布后会被遮挡，但问题在编辑阶段不可见。",
      "视频预览区内置可切换的安全区叠加层，使潜在冲突在导出前可见。操作不增加额外步骤——一次切换，边界即刻显示，创作者可以直接判断是否需要调整位置。",
    ],
  },
];

const phases = [
  {
    label: "配置",
    paragraphs: [
      "新建项目从上传文件或粘贴链接开始。配置界面将决策控制在最小范围——音频语言与讲者标签均为自动检测，创作者只需选择转录模型，并决定是否应用术语库。对于已有字幕文件的用户，「导入现有字幕」选项在此阶段直接可见。",
    ],
  },
  {
    label: "编辑",
    paragraphs: [
      "编辑界面将转录稿、视频预览与样式控制集于同一屏幕，创作者无需切换界面即可完成字幕制作的完整流程。",
      "触发 AI 审阅后，转录稿进入专注校对模式——低置信度词汇高亮并添加下划线标记，幽灵建议内联显示。创作者只需处理被标记的词汇，按 Tab 键确认建议，或直接输入修正内容。",
      "字幕时间调整通过内联时间码编辑器完成——点击任意字幕块上的时间戳，弹出包含滑块与输入框的编辑层，分别对应粗调与精调两种操作需求。",
      "当修正词涉及重复出现的专有名词时，内联「添加至术语库」选项同步出现，一键保存，不中断当前编辑流程。",
    ],
  },
  {
    label: "预览与导出",
    paragraphs: [
      "导出前，视频预览中的安全区叠加层将平台界面冲突区域可视化——直接显示 TikTok、Reels 等平台的界面元素将覆盖视频画面的具体位置。确认无误后，按所需格式导出文件。",
    ],
  },
];

const flowSteps = [
  { node: "上传文件 / 粘贴链接",   note: "" },
  { node: "转录配置",               note: "语言 · 模型 · 术语库" },
  { node: "AI 处理",                note: "音频转录" },
  { node: "编辑界面",               note: "转录稿 · 时间码 · 拆分 · 合并" },
  { node: "AI 审阅（可选）",        note: "置信度高亮 · 幽灵建议" },
  { node: "字幕样式",               note: "预设或自定义" },
  { node: "预览",                   note: "安全区检查" },
  { node: "导出",                   note: "" },
];

/* ── Page ─────────────────────────────────────────────── */

export default function SubflowCaseStudy() {
  return (
    <main className="bg-bg text-fg min-h-screen" style={{ fontFamily: sc }}>
      <ReadingProgress />

      {/* ── Sticky nav ── */}
      <nav
        className="sticky top-0 z-50 border-b border-edge bg-bg/90 backdrop-blur-md"
      >
        <div
          className="max-w-[680px] mx-auto px-6 md:px-0 h-[52px] flex items-center justify-between"
        >
          <Link
            href="/#ux"
            className="text-muted text-[13px] hover:text-fg transition-colors duration-200"
            style={{ fontFamily: sf }}
          >
            ← Work
          </Link>
          <span
            className="text-muted text-[12px] tracking-wide"
            style={{ fontFamily: sf }}
          >
            约 8 分钟
          </span>
        </div>
      </nav>

      <article
        className="max-w-[680px] mx-auto px-6 md:px-0 pt-14 md:pt-20 pb-28 md:pb-36"
      >

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

          <p
            className="text-secondary text-[19px] leading-[1.7] tracking-[-0.3px] mb-12"
          >
            面向视频创作者的 AI 字幕编辑工具
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 pt-8 border-t border-edge">
            {[
              { label: "角色", value: "独立设计师" },
              { label: "阶段", value: "MVP" },
              { label: "工具", value: "Figma" },
              { label: "年份", value: "2026" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span
                  className="text-muted text-[10px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: sf }}
                >
                  {label}
                </span>
                <span
                  className="text-fg text-[14px] tracking-[-0.2px]"
                  style={{ fontFamily: sf }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </header>

        <hr className="border-edge mb-14 md:mb-18" />

        {/* ── Body ── */}
        <div className="flex flex-col gap-14 md:gap-18">

          {/* Overview */}
          <Section label="项目概述">
            <p className="body-p">
              字幕制作是创作者工作流中最后一个尚未被自动化解决的环节。AI 负责转录，但校对、时间轴调整和样式设定仍由创作者手动完成。
            </p>
            <p className="body-p">
              Subflow 是一款 AI 辅助字幕编辑工具，针对三个具体的效率瓶颈进行设计：
            </p>

            <div className="border-y border-edge divide-y divide-edge">
              {features.map((f, i) => (
                <div key={f.tag} className="flex gap-5 py-5">
                  <span
                    className="shrink-0 text-muted text-[12px] tabular-nums pt-0.5 w-5"
                    style={{ fontFamily: sf }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-fg text-[15px] font-bold tracking-[-0.3px]"
                      style={{ fontFamily: sf }}
                    >
                      {f.tag}
                    </span>
                    <span className="text-secondary text-[15px] leading-[1.8] tracking-[-0.2px]">
                      {f.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Problem */}
          <Section label="问题背景">
            <p className="body-p">
              AI 转录本应消除视频制作中最耗时的环节之一。对大多数创作者而言，转录本身确实快了——但随之而来的校对阶段并没有。
            </p>
            <p className="body-p">
              工具已经存在，摩擦依然存在。我想弄清楚原因。
            </p>
          </Section>

          {/* Research */}
          <Section label="研究与发现">
            <SubSection title="竞品分析">
              <p className="body-p">
                市场上的工具大致分为两类：以 Descript、Otter 为代表的转录优先型工具，注重准确率但样式控制有限；以 Submagic、VEED 为代表的创作者优先型工具，注重视觉效果但将转录稿视为黑箱——只输出结果，没有置信度信号，也没有校对工作流。
              </p>
              <p className="body-p">
                没有任何工具覆盖完整的闭环：生成 → 校对 → 修正 → 样式。
              </p>
            </SubSection>

            <SubSection title="用户研究">
              <p className="body-p">
                我对 9 位视频创作者进行了开放式问卷调研，要求他们逐步还原上一次字幕制作的完整过程。
              </p>
              <p className="body-p">
                结果呈现出一致的规律：校对环节占据了总制作时间的 30–50%。最耗力的步骤始终相同——逐行检查，却不知道哪里出了错。一位受访者描述了他理想中的工具：「能标注出可能有误的位置」——他们希望 AI 展示自己的不确定性，而不是将其隐藏。
              </p>
              <p className="body-p">
                专有名词是第二高频的痛点——相同的错误在每一个视频中反复出现，工具没有记忆机制。
              </p>
            </SubSection>

            <SubSection title="设计机会">
              <p className="body-p">
                问题的核心不在于构建一个更快的转录引擎，而在于重新设计校对体验——让创作者把时间花在判断上，而不是花在寻找错误上。
              </p>
            </SubSection>
          </Section>

          {/* Design Direction */}
          <Section label="设计方向">
            <p className="body-p">
              在进入设计之前，我梳理了创作者当前的字幕编辑流程，重点标注时间实际流向何处。
            </p>
            <p className="body-p">
              流程表面上清晰：生成转录稿 → 校对 → 调整时间轴 → 设定样式 → 导出。但其中两个步骤存在结构性问题。校对环节在没有任何错误信号的情况下，默认成为全文逐行扫描——每一行都获得同等关注，无论实际出错概率高低。时间轴调整进一步加剧了这一问题——拖拽操作难以精准落点，创作者反复过冲、回调、重试。研究中 30–50% 的时间损耗，主要集中在这两个步骤。
            </p>

            

            {/* Key question — background treatment, no banned border-l */}
            <div className="bg-surface px-8 py-8 text-center">
              <p
                className="text-fg text-[17px] md:text-[18px] leading-[1.7] tracking-[-0.3px]"
              >
                我们如何设计一套 AI 辅助的字幕工作流，帮助创作者高效完成从转录到可发布字幕的全过程？
              </p>
            </div>
          </Section>

          {/* Design Decisions */}
          <Section label="设计决策">
            <div className="flex flex-col">
              {decisions.map((d) => (
                <div key={d.id} className="pt-10 md:pt-12 border-t border-edge">
                  {/* Large decorative number */}
                  <span
                    aria-hidden="true"
                    className="block font-bold leading-none select-none mb-3 tracking-[-0.05em]"
                    style={{
                      fontFamily: sf,
                      fontSize: "clamp(64px, 10vw, 88px)",
                      color: "var(--color-edge-lg)",
                    }}
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
                      <p key={i} className="body-p">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Design Presentation */}
          <Section label="设计呈现">
            <p className="body-p">
              Subflow 采用线性三阶段流程：配置 → 编辑 → 导出。每个阶段的设计目标一致：减少创作者需要主动做出的决策，让注意力保持在内容本身。
            </p>
            <div className="flex flex-col mt-4">
              {phases.map((ph, i) => (
                <div
                  key={ph.label}
                  className={`py-8 border-t border-edge ${i === phases.length - 1 ? "border-b" : ""}`}
                >
                  <h3
                    className="text-fg text-[15px] font-bold tracking-[-0.3px] mb-5"
                    style={{ fontFamily: sf }}
                  >
                    {ph.label}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {ph.paragraphs.map((p, j) => (
                      <p key={j} className="body-p">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Retrospective */}
          <Section label="回顾与反思">
            <p className="body-p">
              这个项目中最值得回顾的决策是 AI 置信度可视化——不在于执行层面的复杂度，而在于问题的定义方式。面对转录错误时，直觉反应往往是寻求更好的模型。设计的转变在于重新提问：界面如何帮助用户在模型并不完美的前提下更高效地工作。这一从「模型质量」到「交互质量」的框架转换，决定了整个编辑体验的设计方向。
            </p>
            <p className="body-p">
              回顾来看，最明显的设计缺口在于 AI 审阅功能本身的可发现性。这是产品差异化程度最高的功能，但它是可选的，依赖用户主动触发。初次使用的创作者若未注意到这个入口，将得到一份普通的转录稿，没有任何校对引导——而这恰恰是该功能要解决的核心问题。在转录完成后增加一个合适的引导提示，是目前最直接的改进方向。
            </p>
            <p className="body-p">
              多语言字幕支持是 MVP 范围外最重要的未解问题。需要在多个市场发布内容的创作者，往往需要为同一视频生成不同语言的字幕轨道，但当前流程将每种语言视为独立项目处理。在原始字幕旁边支持第二语言轨道的并行编辑，是产品下一阶段最清晰的演进方向。
            </p>
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
          <span
            className="text-muted text-[12px] tracking-[0.15em] uppercase"
            style={{ fontFamily: sf }}
          >
            蔡言 · 2026
          </span>
        </div>

      </article>
    </main>
  );
}

/* ── Layout helpers ────────────────────────────────────── */

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pt-6 first:pt-0">
      <h3
        className="text-fg text-[14px] font-bold tracking-[-0.2px]"
        style={{ fontFamily: "var(--font-sf-pro)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
