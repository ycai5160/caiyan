import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";
import promptImg from "../../../Prompt.png";
import safezoneImg from "../../../overview-safezone.png";
import editorImg from "../../../editor.png";

export const metadata: Metadata = {
  title: "Subflow — UX Case Study",
  description: "Subflow：面向视频创作者的 AI 字幕编辑工具。用户研究、产品设计与 MVP 交付全过程。",
};

const sf  = "var(--font-sf-pro)";
const sc  = "var(--font-siyuan)";

/* ── Data ─────────────────────────────────────────────── */

const features = [
  {
    tag: "转录提示词",
    desc: "系统允许创作者在转录前以自然语言描述视频内容，使 AI 在启动处理前获取相关的词汇语境。",
    image: promptImg,
    imageAlt: "转录提示词界面",
  },
  {
    tag: "AI 置信度可视化",
    desc: "将模型的识别置信度直接呈现在转录稿中，引导用户将注意力集中于易错区域，减少低效的逐行扫描。",
    image: "/confidence.gif",
    imageAlt: "AI 置信度可视化界面",
    animated: true,
  },
  {
    tag: "安全区预览",
    desc: "在导出前可视化平台界面的遮挡区域，防止字幕发布后被平台界面元素覆盖。",
    image: safezoneImg,
    imageAlt: "安全区预览界面",
  },
];

const principles = [
  {
    id: "01",
    title: "事前干预",
    desc: "在 AI 处理前提供上下文信息，降低对事后修正工具的依赖。",
  },
  {
    id: "02",
    title: "呈现不确定性",
    desc: "向用户展示系统的识别置信度，以建立合理的系统预期。",
  },
  {
    id: "03",
    title: "保持操作上下文连贯",
    desc: "字幕校对是一项连续的阅读任务，面板切换容易中断工作流，因此所有编辑操作应集中于当前视窗内完成。",
  },
];

const decisions = [
  {
    id: "01",
    title: "转录提示词",
    paragraphs: [
      "AI 转录在处理垂直领域术语、嘉宾姓名、网络用语及文化背景词时错误率较高。由于模型在启动前缺乏视频内容信息，识别错误会增加下游的校对工作量。",
      "因此，本产品在转录开始前引入上下文提供机制。配置阶段设有文本输入框，允许创作者使用自然语言描述视频内容。输入框内提供预期格式的辅助提示，例如「两位主持人评测摄影机，讨论动态范围、色彩科学与传感器尺寸」。创作者提供描述后，该上下文信息会在 AI 处理音频前传入语音识别系统。",
      "此字段用于描述视频内容，而非向 AI 下达直接指令。界面中的辅助提示协助用户理解此区别，减少了说明文字的使用。当前市场部分消费级工具通常直接进入转录环节，缺少上下文输入步骤，该功能弥补了此环节的缺失。",
    ],
  },
  {
    id: "02",
    title: "AI 置信度可视化",
    paragraphs: [
      "即使提供上下文，AI 转录也客观存在误差，而创作者习惯逐行排查。设计的重点在于协助用户合理分配注意力，而非完全消除校对环节。",
      "AI 为生成的每个词汇计算置信度分数，以反映识别结果的可靠性。系统在视觉上对低于置信度阈值的词汇进行高亮并添加下划线，提示用户优先核查。该设计将用户的注意力从逐词扫描引导至需要人工判断的区域。",
      "针对转录错误，本设计的策略是通过界面辅助用户高效处理模型的不确定性，而非掩盖系统局限。",
      "在交互修正方面，最终方案采用轻量化的内联建议提示。备选词直接显示在标记词下方，用户可使用 Tab 键确认。若建议有误，直接输入正确内容后提示文字即自动消失，降低了视觉干扰。",
    ],
  },
  {
    id: "03",
    title: "时间码与讲者编辑",
    paragraphs: [
      "每个字幕块显示时间码和讲者标签，两者的编辑操作均在当前视窗内完成，无需切换面板。",
      "时间码：传统拖拽字幕块的方式精度较低。本方案支持点击内联时间码触发编辑层，包含滑块与输入框。滑块用于快速定位，输入框用于精确微调，实现先粗后精的调节。",
      "讲者标签：每个字幕块附带讲者标记。用户点击后可在转录稿中进行内联编辑，支持重命名、重新分配或合并讲者。此设计提高了转录稿的可读性，并支持在后续样式设定阶段按讲者快速应用字幕风格，减少了配置步骤。",
    ],
  },
  {
    id: "04",
    title: "安全区预览",
    paragraphs: [
      "短视频平台通常在画面固定区域叠加界面元素。字幕若处于该区域则易被遮挡，而在传统编辑阶段此问题较难察觉。",
      "本产品在视频预览区内置安全区叠加层开关。开启后即可显示平台界面边界，协助创作者判断并调整字幕位置，在导出前避免遮挡冲突。",
    ],
  },
];

const phases = [
  {
    label: "配置",
    paragraphs: [
      "新建项目支持上传文件或粘贴链接。创作者在提示词字段中描述视频内容，可以手动选择语言、应用术语库。对于包含特定词汇的内容，该步骤有助于提升初步转录的准确度。",
    ],
    image: null,
    imageAlt: "",
  },
  {
    label: "编辑",
    paragraphs: [
      "编辑器整合为单一工作区。转录稿位于界面中央，为主要校对区域。视频预览区位于右侧，提供实时画面参考。样式控制面板位于左侧，供需要时调用。",
      "AI 审阅、时间码编辑、讲者编辑和安全区预览均集成于此界面内。触发 AI 审阅后，低置信度词汇高亮显示，并内联呈现修改建议。安全区预览可通过视频面板开关切换。时间码和讲者编辑可通过点击转录块触发内联编辑层，保持操作连贯。",
    ],
    image: editorImg,
    imageAlt: "编辑器界面",
  },
  {
    label: "预览与导出",
    paragraphs: [
      "导出前，用户可通过安全区叠加层查看短视频平台的界面元素边界，检查是否存在视觉冲突。确认无误后，按所需格式导出文件。",
    ],
    image: null,
    imageAlt: "",
  },
];

/* ── Page ─────────────────────────────────────────────── */

export default function SubflowCaseStudy() {
  return (
    <main className="bg-bg text-fg min-h-screen" style={{ fontFamily: sc }}>
      <ReadingProgress />

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
            约 10 分钟
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

        {/* ── Body ── */}
        <div className="flex flex-col gap-14 md:gap-18">

          {/* Overview */}
          <Section label="项目概述">
            <p className="body-p">
              Subflow 是一款 AI 辅助字幕编辑工具。在转录结果客观存在误差的前提下，该工具侧重于通过界面设计优化创作者处理输出内容的工作效率。
            </p>
            <p className="body-p">
              解决方案聚焦工作流的两个关键节点。首先，通过上游上下文输入，降低进入编辑器前的初始错误率。其次，通过界面优化，缩减后续的验证耗时。
            </p>
            <div className="border-y border-edge divide-y divide-edge">
              {features.map((f, i) => (
                <div key={f.tag} className="py-5">
                  <div className="flex gap-5">
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
                  {f.image && (
                    f.animated
                      ? <img src={f.image as string} alt={f.imageAlt} className="w-full border border-edge mt-4" />
                      : <Image src={f.image} alt={f.imageAlt} className="w-full border border-edge mt-4" placeholder="blur" />
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Problem */}
          <Section label="问题背景">
            <p className="body-p">
              随着短视频平台内容更新频率的提高，字幕已从增强信息可读性的附加功能，转变为内容生产的标准配置。
            </p>
            <p className="body-p">
              虽然人工智能提升了语音转录的处理速度，降低了时间成本，但字幕制作的整体效率并未随之大幅提高。转录耗时缩短后，流程中出现了新的瓶颈，即创作者仍需逐行检查、修正并确认系统的输出结果。
            </p>
            <p className="body-p">
              因此，当前流程的主要挑战在于用户如何高效验证系统的生成结果。
            </p>
          </Section>

          {/* Research */}
          <Section label="研究与发现">
            <SubSection title="竞品分析">
              <p className="body-p">
                目前市场的相关工具主要分为两类。第一类为转录优先型工具，如 Descript 和 Otter，侧重转录准确率与文稿处理。第二类为创作者优先型工具，如 Submagic 和 VEED，侧重动态字幕与视觉包装。这两类产品分别优化了工作流的不同环节，但均未充分解决字幕生成后的验证问题。转录工具缺乏高效的校对机制，创作者工具则假定用户会自行解决文本的准确性问题。
              </p>
            </SubSection>

            <SubSection title="用户研究">
              <p className="body-p">
                我们针对 9 位视频创作者开展了问卷调研，要求受访者还原近期制作字幕的完整流程。结果显示，校对环节占整体制作时间的 30% 至 50%。部分受访者表示，期望工具能自动标注潜在的错误区域。另有受访者指出，AI 难以准确识别特定领域的网络词汇及文化背景词。
              </p>
              <p className="body-p">
                将字幕工作流拆解为五个阶段后，其时间分布规律显现。校对与样式精修阶段占据了编辑时间的主要比重，涵盖逐字核对、时间轴调整及样式一致性维护，而前期处理则相对顺畅。
              </p>
              <WorkflowChart />
            </SubSection>
          </Section>

          {/* Insights */}
          <Section label="洞察">
            <p className="body-p">
              分析用户实际耗时的环节后，可总结出四项主要规律。第一，AI 在处理视频时缺乏上下文信息，无法获取主题、讲者及专有词汇，导致部分错误在转录前已经产生。第二，系统缺乏跨项目的记忆机制，相同词汇在不同视频中容易重复识别错误。第三，在编辑阶段，创作者由于无法预判错误位置，需要对各行字幕分配同等注意力，增加了认知负担。第四，执行修正操作时，时间码、讲者及样式等调整功能分散于不同面板，增加了操作复杂度。
            </p>
            <p className="body-p">
              初步研究将问题界定为字幕校对耗时较长。进一步分析表明，主要问题不在于 AI 的准确率上限，而在于用户需要全面检查所有输出内容。即使转录整体准确率较高，由于界面未提供 AI 识别置信度的相关提示，创作者仍需逐行排查。因此，生成成本虽然下降，验证成本依然较高。
            </p>
            <p className="body-p">
              上述分析为产品设计提供了方向。产品的核心目标设定为协助用户更高效地处理具有误差的 AI 输出结果，而非单纯提升 AI 准确率。产品理念从自动化优先转向优化人机协作工作流，将 AI 的功能扩展至降低用户在验证阶段的认知负荷。
            </p>
            <div className="bg-surface px-8 py-10">
              <p className="text-fg text-[18px] md:text-[20px] leading-[1.65] tracking-[-0.4px]">
                如何设计一套 AI 辅助的字幕工作流，以协助创作者高效完成从转录到发布的完整流程？
              </p>
            </div>
          </Section>

          {/* Design Principles */}
          <Section label="设计原则">
            <p className="body-p">基于上述规律，本产品确立了三项设计原则。</p>
            <div className="border-y border-edge divide-y divide-edge">
              {principles.map((p) => (
                <div key={p.id} className="flex gap-5 py-5">
                  <span
                    className="shrink-0 text-muted text-[12px] tabular-nums pt-0.5 w-5"
                    style={{ fontFamily: sf }}
                  >
                    {p.id}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-fg text-[15px] font-bold tracking-[-0.3px]"
                      style={{ fontFamily: sf }}
                    >
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

          {/* Design Decisions */}
          <Section label="设计决策">
            <div className="flex flex-col">
              {decisions.map((d) => (
                <div key={d.id} className="pt-10 md:pt-12 border-t border-edge">
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
              Subflow 的架构划分为两个主要区域。项目主页用于管理项目、术语库及预设资产，项目工作空间用于执行编辑。编辑器采用单屏工作界面，整合了 AI 审阅、安全区预览和样式控制等功能，减少了视图切换。
            </p>
            <p className="body-p">
              项目内部遵循配置、编辑、导出的线性工作流。主要决策在配置阶段完成，使编辑器功能集中于校对与样式调整。
            </p>
            <div className="flex flex-col mt-4">
              {phases.map((ph, i) => (
                <div key={ph.label} className="py-8 border-t border-edge">
                  <div className="flex items-baseline gap-3 mb-5">
                    <span
                      className="text-muted text-[11px] tabular-nums shrink-0"
                      style={{ fontFamily: sf }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-fg text-[15px] font-bold tracking-[-0.3px]"
                      style={{ fontFamily: sf }}
                    >
                      {ph.label}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {ph.paragraphs.map((p, j) => (
                      <p key={j} className="body-p">
                        {p}
                      </p>
                    ))}
                    {ph.image && (
                      <Image
                        src={ph.image}
                        alt={ph.imageAlt}
                        className="w-full border border-edge mt-2"
                        placeholder="blur"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

         

          {/* Retrospective */}
          <Section label="回顾与反思">
            <p className="body-p">
              本项目的核心洞察在于重新分析流程瓶颈，即传统工作流在错误发生前后均未提供有效的干预手段。转录提示词机制为模型提供上下文，降低了初始错误率；AI 置信度可视化提供了视觉提示，提高了校对效率。
            </p>
            <p className="body-p">
              项目仍有两处改进空间。第一，转录提示词功能缺少反馈回路。用户难以直观感知 AI 如何利用提供的上下文，这影响了功能信任度的建立。第二，缺少针对初次使用的引导机制。运行前提供功能预览或效果对比有助于提升使用体验。
            </p>
            <p className="body-p">
              此外，多语言字幕支持是后续的重要方向。针对跨市场分发需求，支持第二语言轨道的并行编辑将是下一阶段的开发重点。
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
    <div className="flex flex-col gap-4 pt-8 first:pt-0">
      <p
        className="text-muted text-[10px] tracking-[0.22em] uppercase"
        style={{ fontFamily: "var(--font-sf-pro)" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function WorkflowChart() {
  const stages = [
    {
      icon: "📥",
      label: "导入媒体",
      badge: null,
      focus: false,
      pain: ["上传路径不直观", "文件上传失败且缺乏明确提示"],
      opp:  ["失败时提供清晰错误提示与重试入口"],
    },
    {
      icon: "⚙️",
      label: "生成转写文本",
      badge: null,
      focus: false,
      pain: ["转写等待过程缺乏进度感知", "音频质量差时准确率下降，但无预警"],
      opp:  ["显示剩余时间与进度", "低质量音频提前给出风险提示"],
    },
    {
      icon: "✏️",
      label: "校正文稿与样式精修",
      badge: "⏱ 最耗时",
      focus: true,
      pain: ["需逐句核对，无法快速定位错误", "同类词汇错误反复出现", "时间码细调繁琐耗时", "多条视频难以保持样式统一"],
      opp:  ["文本—时间轴联动编辑", "快速定位最可能出错的位置", "建立项目级样式库与预设"],
    },
    {
      icon: "🌐",
      label: "多语字幕与本地化",
      badge: null,
      focus: false,
      pain: ["译文始终需要二次修订", "网络词汇、文化梗与专业术语难以识别"],
      opp:  ["翻译时自动应用术语库"],
    },
    {
      icon: "📤",
      label: "预览与导出",
      badge: null,
      focus: false,
      pain: ["不同平台需要多种导出格式", "文件命名混乱"],
      opp:  ["按平台保存导出预设", "自动生成包含信息的文件名"],
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(900px, 100vw)",
      }}
    >
      <div className="overflow-x-auto px-6 md:px-0">
        <div style={{ minWidth: 560 }}>

          {/* Phase rail */}
          <div
            className="grid mb-3"
            style={{ gridTemplateColumns: "2fr 1fr 2fr" }}
          >
            <div>
              <p className="text-muted text-[9px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: sf }}>
                转写前
              </p>
              <div className="h-px bg-edge" />
            </div>
            <div className="px-px">
              <p className="text-accent text-[9px] tracking-[0.2em] uppercase mb-2 text-center" style={{ fontFamily: sf }}>
                最耗时
              </p>
              <div className="h-px bg-accent" />
            </div>
            <div>
              <p className="text-muted text-[9px] tracking-[0.2em] uppercase mb-2 text-right" style={{ fontFamily: sf }}>
                转写后
              </p>
              <div className="h-px bg-edge" />
            </div>
          </div>

          {/* Columns */}
          <div
            className="grid gap-px bg-edge border border-edge"
            style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            {stages.map((s) => (
              <div
                key={s.label}
                className={`flex flex-col p-3 ${s.focus ? "bg-surface" : "bg-bg"}`}
              >
                {s.badge && (
                  <p
                    className="text-accent text-[9px] tracking-[0.1em] uppercase font-bold mb-2"
                    style={{ fontFamily: sf }}
                  >
                    {s.badge}
                  </p>
                )}

                <div className="mb-3">
                  <div className="text-sm mb-1">{s.icon}</div>
                  <p
                    className={`text-[11px] font-bold leading-snug tracking-[-0.2px] ${s.focus ? "text-fg" : "text-secondary"}`}
                    style={{ fontFamily: sf }}
                  >
                    {s.label}
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-[9px] tracking-[0.15em] uppercase text-muted mb-1.5" style={{ fontFamily: sf }}>
                    痛点
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {s.pain.map((item, i) => (
                      <div key={i} className="flex gap-1.5 items-start">
                        <div
                          className="shrink-0 rounded-full bg-accent mt-[5px]"
                          style={{ width: 3, height: 3 }}
                        />
                        <span className="text-[11px] text-secondary leading-snug" style={{ fontFamily: sc }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-muted mb-1.5" style={{ fontFamily: sf }}>
                    设计机会
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {s.opp.map((item, i) => (
                      <div key={i} className="flex gap-1.5 items-start">
                        <div
                          className="shrink-0 rounded-full mt-[5px]"
                          style={{ width: 3, height: 3, background: "var(--color-edge-lg)" }}
                        />
                        <span className="text-[11px] text-muted leading-snug" style={{ fontFamily: sc }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
