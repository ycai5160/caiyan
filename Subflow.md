---
feature: "![[Prompt.png]]"
thumbnail: "![[thumbnails/resized/ef019b51328940137add1558414496f3_86cf658e.webp]]"
---
## 项目概述

Subflow 是一款 AI 辅助字幕编辑工具。在转录结果客观存在误差的前提下，该工具侧重于通过界面设计优化创作者处理输出内容的工作效率。
解决方案聚焦工作流的两个关键节点。首先，通过上游上下文输入，降低进入编辑器前的初始错误率。其次，通过界面优化，缩减后续的验证耗时。

**转录提示词**：系统允许创作者在转录前以自然语言描述视频内容，使 AI 在启动处理前获取相关的词汇语境。
![[Prompt.png]]
**AI 置信度可视化**：将模型的识别置信度直接呈现在转录稿中，引导用户将注意力集中于易错区域，减少低效的逐行扫描。

**安全区预览**：在导出前可视化平台界面的遮挡区域，防止字幕发布后被平台界面元素覆盖。
![[overview-safezone.png]]
---

## 问题背景

随着短视频平台内容更新频率的提高，字幕已从增强信息可读性的附加功能，转变为内容生产的标准配置。

虽然人工智能提升了语音转录的处理速度，降低了时间成本，但字幕制作的整体效率并未随之大幅提高。转录耗时缩短后，流程中出现了新的瓶颈，即创作者仍需逐行检查、修正并确认系统的输出结果。

因此，当前流程的主要挑战在于用户如何高效验证系统的生成结果。

---

## 研究与发现

### 竞品分析

目前市场的相关工具主要分为两类。第一类为转录优先型工具，如 Descript 和 Otter，侧重转录准确率与文稿处理。第二类为创作者优先型工具，如 Submagic 和 VEED，侧重动态字幕与视觉包装。这两类产品分别优化了工作流的不同环节，但均未充分解决字幕生成后的验证问题。转录工具缺乏高效的校对机制，创作者工具则假定用户会自行解决文本的准确性问题。

|**类型**|**产品**|**主要关注点**|
|---|---|---|
|转录优先型|Descript、Otter|转录准确率与文稿处理|
|创作者优先型|VEED、Submagic|动态字幕与视觉效果|

### 用户研究

我们针对 9 位视频创作者开展了问卷调研，要求受访者还原近期制作字幕的完整流程。结果显示，校对环节占整体制作时间的 30% 至 50%。部分受访者表示，期望工具能自动标注潜在的错误区域。另有受访者指出，AI 难以准确识别特定领域的网络词汇及文化背景词。

将字幕工作流拆解为五个阶段后，其时间分布规律显现。校对与样式精修阶段占据了编辑时间的主要比重，涵盖逐字核对、时间轴调整及样式一致性维护，而前期处理则相对顺畅。

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>研究发现 — 字幕工作流</title>


<!-- ── Phase rail ──────────────────────────────── -->
<div class="rail">
  <div class="rail-item"><span class="rail-pip"></span>转写前</div>
  <div class="rail-item focus"><span class="rail-pip"></span>最耗时阶段</div>
  <div class="rail-item"><span class="rail-pip"></span>转写后</div>
</div>

<!-- ── 5 stage columns ─────────────────────────── -->
<div class="stages">

  <!-- 1. 导入媒体 -->
  <div class="stage">
    <div class="stage-name">
      <span class="stage-icon">📥</span>
      <span class="stage-label">导入媒体</span>
    </div>
    <div class="block">
      <p class="block-row-label pain">痛点</p>
      <div class="items pain">
        <div class="item"><div class="item-dot"></div><span>上传路径不直观</span></div>
        <div class="item"><div class="item-dot"></div><span>文件上传失败且缺乏明确提示</span></div>
      </div>
    </div>
    <div class="block">
      <p class="block-row-label opp">设计机会</p>
      <div class="items opp">
        <div class="item"><div class="item-dot"></div><span>失败时提供清晰错误提示与重试入口</span></div>
      </div>
    </div>
  </div>

  <!-- 2. 生成转写文本 -->
  <div class="stage">
    <div class="stage-name">
      <span class="stage-icon">⚙️</span>
      <span class="stage-label">生成转写文本</span>
    </div>
    <div class="block">
      <p class="block-row-label pain">痛点</p>
      <div class="items pain">
        <div class="item"><div class="item-dot"></div><span>转写等待过程缺乏进度感知</span></div>
        <div class="item"><div class="item-dot"></div><span>音频质量差时准确率下降，但无预警</span></div>
      </div>
    </div>
    <div class="block">
      <p class="block-row-label opp">设计机会</p>
      <div class="items opp">
        <div class="item"><div class="item-dot"></div><span>显示剩余时间与进度</span></div>
        <div class="item"><div class="item-dot"></div><span>低质量音频提前给出风险提示</span></div>
      </div>
    </div>
  </div>

  <!-- 3. 校正文稿与样式精修 — FOCUS -->
  <div class="stage focus">
    <div class="stage-name">
      <span class="stage-icon">✏️</span>
      <span class="stage-label">校正文稿与样式精修</span>
    </div>
    <div class="block">
      <div class="focus-badge">⏱ 最耗时</div>
      <p class="block-row-label pain">痛点</p>
      <div class="items pain">
        <div class="item"><div class="item-dot"></div><span>需逐句核对，无法快速定位错误</span></div>
        <div class="item"><div class="item-dot"></div><span>同类词汇错误反复出现</span></div>
        <div class="item"><div class="item-dot"></div><span>时间码细调繁琐耗时</span></div>
        <div class="item"><div class="item-dot"></div><span>多条视频难以保持样式统一</span></div>
      </div>
    </div>
    <div class="block">
      <p class="block-row-label opp">设计机会</p>
      <div class="items opp">
        <div class="item"><div class="item-dot"></div><span>文本—时间轴联动编辑</span></div>
        <div class="item"><div class="item-dot"></div><span>快速定位最可能出错的位置</span></div>
        <div class="item"><div class="item-dot"></div><span>建立项目级样式库与预设</span></div>
      </div>
    </div>
  </div>

  <!-- 4. 多语字幕与本地化 -->
  <div class="stage">
    <div class="stage-name">
      <span class="stage-icon">🌐</span>
      <span class="stage-label">多语字幕与本地化</span>
    </div>
    <div class="block">
      <p class="block-row-label pain">痛点</p>
      <div class="items pain">
        <div class="item"><div class="item-dot"></div><span>译文始终需要二次修订</span></div>
        <div class="item"><div class="item-dot"></div><span>网络词汇、文化梗与专业术语难以识别</span></div>
      </div>
    </div>
    <div class="block">
      <p class="block-row-label opp">设计机会</p>
      <div class="items opp">
        <div class="item"><div class="item-dot"></div><span>翻译时自动应用术语库</span></div>
      </div>
    </div>
  </div>

  <!-- 5. 预览与导出 -->
  <div class="stage">
    <div class="stage-name">
      <span class="stage-icon">📤</span>
      <span class="stage-label">预览与导出</span>
    </div>
    <div class="block">
      <p class="block-row-label pain">痛点</p>
      <div class="items pain">
        <div class="item"><div class="item-dot"></div><span>不同平台需要多种导出格式</span></div>
        <div class="item"><div class="item-dot"></div><span>文件命名混乱</span></div>
      </div>
    </div>
    <div class="block">
      <p class="block-row-label opp">设计机会</p>
      <div class="items opp">
        <div class="item"><div class="item-dot"></div><span>按平台保存导出预设</span></div>
        <div class="item"><div class="item-dot"></div><span>自动生成包含信息的文件名</span></div>
      </div>
    </div>
  </div>

</div><!-- /.stages -->

</body>
</html>

---

## 洞察

分析用户实际耗时的环节后，可总结出四项主要规律。第一，AI 在处理视频时缺乏上下文信息，无法获取主题、讲者及专有词汇，导致部分错误在转录前已经产生。第二，系统缺乏跨项目的记忆机制，相同词汇在不同视频中容易重复识别错误。第三，在编辑阶段，创作者由于无法预判错误位置，需要对各行字幕分配同等注意力，增加了认知负担。第四，执行修正操作时，时间码、讲者及样式等调整功能分散于不同面板，增加了操作复杂度。

初步研究将问题界定为字幕校对耗时较长。进一步分析表明，主要问题不在于 AI 的准确率上限，而在于用户需要全面检查所有输出内容。即使转录整体准确率较高，由于界面未提供 AI 识别置信度的相关提示，创作者仍需逐行排查。因此，生成成本虽然下降，验证成本依然较高。

上述分析为产品设计提供了方向。产品的核心目标设定为协助用户更高效地处理具有误差的 AI 输出结果，而非单纯提升 AI 准确率。产品理念从自动化优先转向优化人机协作工作流，将 AI 的功能扩展至降低用户在验证阶段的认知负荷。

核心议题：如何设计一套 AI 辅助的字幕工作流，以协助创作者高效完成从转录到发布的完整流程。

---

## 设计原则

基于上述规律，本产品确立了三项设计原则。

第一，事前干预。在 AI 处理前提供上下文信息，降低对事后修正工具的依赖。

第二，呈现不确定性。向用户展示系统的识别置信度，以建立合理的系统预期。

第三，保持操作上下文连贯。字幕校对是一项连续的阅读任务，面板切换容易中断工作流，因此所有编辑操作应集中于当前视窗内完成。

---

## 设计决策

### 决策一：转录提示词

AI 转录在处理垂直领域术语、嘉宾姓名、网络用语及文化背景词时错误率较高。由于模型在启动前缺乏视频内容信息，识别错误会增加下游的校对工作量。

因此，本产品在转录开始前引入上下文提供机制。配置阶段设有文本输入框，允许创作者使用自然语言描述视频内容。输入框内提供预期格式的辅助提示，例如，两位主持人评测摄影机，讨论动态范围、色彩科学与传感器尺寸。创作者提供描述后，该上下文信息会在 AI 处理音频前传入语音识别系统。

此字段用于描述视频内容，而非向 AI 下达直接指令。界面中的辅助提示协助用户理解此区别，减少了说明文字的使用。当前市场部分消费级工具通常直接进入转录环节，缺少上下文输入步骤，该功能弥补了此环节的缺失。

---

### 决策二：AI 置信度可视化

即使提供上下文，AI 转录也客观存在误差，而创作者习惯逐行排查。设计的重点在于协助用户合理分配注意力，而非完全消除校对环节。

AI 为生成的每个词汇计算置信度分数，以反映识别结果的可靠性。系统在视觉上对低于置信度阈值的词汇进行高亮并添加下划线，提示用户优先核查。该设计将用户的注意力从逐词扫描引导至需要人工判断的区域。

针对转录错误，本设计的策略是通过界面辅助用户高效处理模型的不确定性，而非掩盖系统局限。

在交互修正方面，最终方案采用轻量化的内联建议提示。备选词直接显示在标记词下方，用户可使用 Tab 键确认。若建议有误，直接输入正确内容后提示文字即自动消失，降低了视觉干扰。

---

### 决策三：时间码与讲者编辑

每个字幕块显示时间码和讲者标签，两者的编辑操作均在当前视窗内完成，无需切换面板。

时间码：传统拖拽字幕块的方式精度较低。本方案支持点击内联时间码触发编辑层，包含滑块与输入框。滑块用于快速定位，输入框用于精确微调，实现先粗后精的调节。

讲者标签：每个字幕块附带讲者标记。用户点击后可在转录稿中进行内联编辑，支持重命名、重新分配或合并讲者。此设计提高了转录稿的可读性，并支持在后续样式设定阶段按讲者快速应用字幕风格，减少了配置步骤。

---



### 决策四：安全区预览

短视频平台通常在画面固定区域叠加界面元素。字幕若处于该区域则易被遮挡，而在传统编辑阶段此问题较难察觉。

本产品在视频预览区内置安全区叠加层开关。开启后即可显示平台界面边界，协助创作者判断并调整字幕位置，在导出前避免遮挡冲突。

---

## 设计呈现

Subflow 的架构划分为两个主要区域。项目主页用于管理项目、术语库及预设资产，项目工作空间用于执行编辑。编辑器采用单屏工作界面，整合了 AI 审阅、安全区预览和样式控制等功能，减少了视图切换。

项目内部遵循配置、编辑、导出的线性工作流。主要决策在配置阶段完成，使编辑器功能集中于校对与样式调整。

---

### 配置

新建项目支持上传文件或粘贴链接。创作者在提示词字段中描述视频内容，可以手动选择语言、应用术语库。对于包含特定词汇的内容，该步骤有助于提升初步转录的准确度。

---

### 编辑

编辑器整合为单一工作区。转录稿位于界面中央，为主要校对区域。视频预览区位于右侧，提供实时画面参考。样式控制面板位于左侧，供需要时调用。

AI 审阅、时间码编辑、讲者编辑和安全区预览均集成于此界面内。触发 AI 审阅后，低置信度词汇高亮显示，并内联呈现修改建议。安全区预览可通过视频面板开关切换。时间码和讲者编辑可通过点击转录块触发内联编辑层，保持操作连贯。
![[屏幕截图 2026-05-17 184028.png]]


---

### 预览与导出

导出前，用户可通过安全区叠加层查看短视频平台的界面元素边界，检查是否存在视觉冲突。
确认无误后，按所需格式导出文件。

---

## 轻量验证

为测试交互方案对降低验证负荷的有效性，我邀请了 2 位视频创作者对交互原型进行了可用性测试。测试重点在于观察行为模式，特别是置信度可视化对转录稿浏览方式的影响。

参与者使用预置错误的测试转录稿，完成校对、修正、调整时间码及导出字幕的编辑流程。

测试结果显示，参与者优先关注高亮词汇，快速浏览其余内容，并借助内联建议进行修正。用户的校对模式从全文扫描转变为优先级导向模式。反馈表明，置信度提示优化了注意力分配，明确了需要核查的区域。

测试验证了直观呈现不确定性可改变用户分配注意力的方式，进而提升验证效率。

---

## 回顾与反思

本项目的核心洞察在于重新分析流程瓶颈，即传统工作流在错误发生前后均未提供有效的干预手段。转录提示词机制为模型提供上下文，降低了初始错误率；AI 置信度可视化提供了视觉提示，提高了校对效率。

项目仍有两处改进空间。第一，转录提示词功能缺少反馈回路。用户难以直观感知 AI 如何利用提供的上下文，这影响了功能信任度的建立。第二，缺少针对初次使用的引导机制。运行前提供功能预览或效果对比有助于提升使用体验。

此外，多语言字幕支持是后续的重要方向。针对跨市场分发需求，支持第二语言轨道的并行编辑将是下一阶段的开发重点。

本项目的实践表明，在 AI 输出客观存在误差的条件下，合理的交互机制能够有效协助用户保持高效的工作状态。