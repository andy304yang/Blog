export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "stock-pet-desktop-companion",
    title: "持仓宠物：把股票涨跌做成一只有情绪的 macOS 桌宠",
    summary:
      "用 SwiftUI 做一只会根据持仓收益率切换牛熊情绪、动作和体型的桌面宠物，并把行情、持仓、资讯、素材调试与收益分享收进一个轻量 macOS 应用。",
    date: "2026-07-16",
    tags: ["SwiftUI", "macOS", "桌面宠物", "股票工具", "AI 协作"],
    readingTime: "8 min",
    content: `
## 为什么做持仓宠物

看盘软件通常把注意力集中在数字、红绿和曲线上。信息足够准确，却也容易让人持续盯着窗口。

持仓宠物换了一个角度：让应用平时只是一只住在桌面的迷你宠物。收益上涨时，它会开心、跳跃或进入攻击动作；收益下跌时，它会紧张、受击、滑倒或需要安慰。只有需要查看细节时，才打开完整持仓面板。

![桌面上的迷你持仓宠物](/stock-pet/compact-pet.jpg)

---

## 核心体验

| 功能 | 设计目标 |
|------|----------|
| 桌面宠物 | 平时保持轻量、置顶，不遮挡正常工作 |
| 收益情绪 | 将收益率映射成牛市、熊市和多档动作 |
| 持仓面板 | 集中展示总市值、当日收益、指数和持仓 |
| 行情资讯 | 在桌宠附近快速查看核心持仓的相关新闻 |
| 宠物商城 | 在同一套状态系统中切换机器人、机甲、牛熊与多款动物 |
| 调试窗口 | 独立预览不同收益率、皮肤与动画，不影响桌面宠物 |
| 收益分享 | 生成只晒收益或包含持仓信息的宠物分享卡 |

## 从一只宠物展开成完整持仓面板

单击宠物可以打开主面板。这里同时展示总持仓市值、今日收益率、主要指数和持仓明细；再次收起后，桌面只保留宠物。

![持仓行情与持仓明细主面板](/stock-pet/dashboard.jpg)

这套交互的重点不是把传统股票软件缩小，而是把“看一眼”和“认真查看”拆成两种状态：

- **桌面状态**：只保留情绪、收益率与必要入口。
- **面板状态**：提供完整行情、持仓编辑、分享、商城与调试能力。

## 收益率驱动的动作系统

宠物动作不是简单的正负切换。不同皮肤可以定义自己的空闲、上涨、下跌、奔跑、跳跃、攻击、受击和崩溃帧序列，再根据收益率区间选择动画。

调试窗口允许直接输入收益率或选择 -10%、-5%、0%、+5%、+10% 等预设值，快速检查每种皮肤的情绪、尺寸和动作。

![上涨收益率下的宠物动作调试](/stock-pet/debug-bull.jpg)

![极端下跌时的红绿北极熊状态](/stock-pet/debug-bear.jpg)

调试页是一个真正独立的 macOS 窗口。打开它时，桌面宠物仍然保持显示；修改调试收益率也不会把调试窗口错误缩成桌宠尺寸。

## 一套状态，多款宠物

宠物商城目前包含行情牛熊、行情机器人、涨跌机甲、红绿北极熊、横冲牛牛、原野公牛、迷你奶牛、布布熊、搞笑白熊和围巾棕熊。

![宠物商城与动画皮肤列表](/stock-pet/pet-store.jpg)

每款素材都复用统一的市场状态接口，但可以有不同帧数、动作强度和角色文案。这让新增宠物不需要重新实现整套行情逻辑。

## 资讯和收益分享

桌宠旁边可以快速展开核心持仓资讯，避免为了确认一条消息打开完整行情软件。

![持仓热门资讯入口](/stock-pet/news-popover.jpg)

分享页会把宠物、日期、收益率和文案组合成卡片。默认隐私模式只展示收益率，不公开持仓金额和名称。

![带宠物的收益分享卡](/stock-pet/share-card.jpg)

## 技术实现

| 模块 | 实现 |
|------|------|
| UI | SwiftUI |
| 原生窗口 | AppKit + SwiftUI 多窗口 |
| 动画 | PNG 帧动画 + 收益率分档状态机 |
| 行情 | 公开行情接口定时刷新 |
| 通知 | UserNotifications + AVSpeechSynthesizer |
| 数据 | UserDefaults 本地保存 |
| 构建 | swiftc、codesign、hdiutil 生成 DMG |

应用使用独立的主桌宠窗口与调试窗口。桌宠窗口保持透明、无边框和浮层展示；调试窗口拥有自己的最小尺寸与窗口生命周期。窗口缩放逻辑只会匹配主窗口，避免当前焦点窗口变化后误操作调试页。

## AI 协作开发

这个项目也用来验证一种更直接的 AI 协作方式：从素材调研、帧动画整理、交互修复、真实界面回归，到 DMG 打包和 GitHub Release 发布，都在同一条开发链路中完成。

我更关注的不是“AI 写了多少代码”，而是它能否持续读取真实界面、定位窗口状态问题、完成验证，再把结果交付成可安装的软件。

## 下载与源码

- [下载持仓宠物 v0.4.1（Apple Silicon）](https://github.com/andy304yang/Pet-stock/releases/tag/v0.4.1)
- [查看持仓宠物产品官网](/stock-pet)
- [查看 GitHub 源码](https://github.com/andy304yang/Pet-stock)

当前版本要求 macOS 15 或更高版本，仅提供 Apple Silicon 构建。项目用于行情展示与桌面陪伴，不构成任何投资建议。
`,
  },
  {
    slug: "frontend-auto-workflow",
    title: "前端自动化工作流 — 产品说明文档",
    summary:
      "通过@飞书机器人对话将prompt自动生成代码，自动部署，自动测试。产品经理无需工程师介入，即可独立完成 Figma 设计稿读取、前端页面修改、组件添加、接口接入、自动化测试全流程。",
    date: "2025-05-20",
    tags: ["AI Agent", "自动化测试", "飞书", "Figma", "Hermes"],
    readingTime: "12 min",
    content: `
## 效果展示

- 无需写代码，飞书机器人对话 复制figma对应URL 改项目样式并且部署，进行自动化测试
    - ![效果展示](https://img.cdn.apipost.cn/upload/user/1171325/logo/c0b76a38-246b-4d17-ba04-433a025eb1d9.png)

### agent完成效果展示

    - ![agent效果1](https://img.cdn.apipost.cn/upload/user/1171325/logo/9daa71f3-651d-49e7-a423-0db057fc13be.png)
    - ![agent效果2](https://img.cdn.apipost.cn/upload/user/1171325/logo/be2c446e-c4d3-4df1-8c73-c54fb9188694.png)

实测这种简单的样式需求改动，agent已经能自动化完成，并且给出测试报告。

### agent能干什么目前

> 通过@飞书机器人对话将prompt自动生成代码，自动部署，自动测试
> 第一版目标：
> - 产品通过agent对话实现10%的需求开发
> - UI通过agent对话实现30%的UI开发还原
> - 测试通过agent对话完成10%测试用例
> - 前端通过agent对话完成40%UI开发，30%的后台接口开发

---

## 一、系统概述

本工作流让**产品经理无需工程师介入**，即可独立完成以下操作：

| 操作 | 说明 |
|------|------|
| 🔍 读取 Figma 设计稿 | 给机器人一个 Figma URL，自动解析最新设计 |
| ✏️ 修改前端页面 | 机器人根据设计稿更新线上页面代码 |
| 🧩 添加新组件 | 机器人从组件库拉取/注册新组件 |
| 🔗 接入后端接口 | 后端 Swagger 更新后，机器人自动生成前端类型和接口调用代码 |
| 🧪 自动化测试 | 机器人用真实浏览器跑功能测试 |
| 📤 上报告告 | 测试报告自动上传 COS 并通知产品确认 |

---

## 二、技术架构

### 2.1 核心技术选型

| 技术层 | 选型 | 作用 |
|--------|------|------|
| **Agent 引擎** | Hermes Agent（MiniMax-M2.7 模型） | 统一调度所有工具和 Skill |
| **MCP 协议** | Model Context Protocol | 连接 Figma、GitHub 等外部服务 |
| **前端框架** | Next.js（当前已有项目） | React 组件化前端 |
| **UI 组件库** | Vite + React + Storybook | 组件管理 + 预览 |
| **后端** | FastAPI（当前已有项目） | Python 接口服务 |
| **接口文档** | Swagger/OpenAPI | 后端接口规范 |
| **代码生成** | openapi-typescript + swagger-typescript-api | 自动生成 TypeScript 类型和请求函数 |
| **自动化测试** | Playwright（Node.js 内置） | 浏览器级 E2E 测试 |
| **截图+对象存储** | Xvfb + scrot → 腾讯云 COS | 测试截图永久存储 + 公开访问 |
| **消息通知** | 飞书（Feishu） | 测试结果推送 |
| **代码托管** | GitHub | 代码版本管理与部署触发 |
| **服务器** | 腾讯云 81.71.29.84（IP 直连，绕过备案） | 前端 + 后端 + Nginx 部署 |

### 2.2 系统架构图

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Hermes Agent (大脑)                      │
│                   MiniMax-M2.7 模型驱动                       │
└──────┬──────────┬──────────┬──────────┬──────────┬──────────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
  ┌─────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
  │  Figma  │ │ GitHub  │ │Component│ │ Swagger │ │ 浏览器    │
  │  MCP    │ │  MCP    │ │ Deploy  │ │  解析   │ │ (Playwright)│
  │ Server  │ │ Server  │ │ Skill   │ │ + TS生成 │ │           │
  └────┬────┘ └────┬───┘ └────┬────┘ └────┬────┘ └────┬──────┘
       │           │          │           │            │
       ▼           ▼          ▼           ▼            ▼
  读取设计稿   推送代码     部署组件    生成接口      截图测试
       │           │          │           │            │
       └───────────┴───────────┴───────────┴────────────┘
                           │
                    ┌──────▼──────────────────┐
                    │    腾讯云 COS 存储       │
                    │  (截图 + 报告公开链接)    │
                    └──────────┬─────────────┘
                               │
                    ┌──────────▼─────────────┐
                    │      飞书机器人通知     │
                    │   (测试结果 + 链接)     │
                    └───────────────────────┘
\`\`\`

---

## 三、Skill 清单（核心能力模块）

每个 Skill 是独立的功能块，Agent 按需调用。

### 3.1 代码管理 + 部署

![代码管理+部署](https://img.cdn.apipost.cn/upload/user/1171325/logo/72589c25-43cb-4c32-8eb8-6526c392be07.png)

| Skill | 用途 |
|-------|------|
| \`repo-management\` | 仓库清单，记录所有 GitHub 仓库的本地路径、部署方式、服务器信息 |
| \`github-push\` | 一键推送代码到 GitHub，然后 SSH 到服务器部署 |

### 3.2 设计稿读取

| Skill | 用途 |
|-------|------|
| \`native-mcp\` | MCP 协议客户端，连接外部 MCP 服务器 |
| Figma MCP Server（需配置）| \`@modelcontextprotocol/server-figma\` 读取 Figma URL，解析设计稿内容 |

### 3.3 接口自动生成

| Skill | 用途 |
|-------|------|
| \`openapi-typescript\`（工具）| 读取 Swagger JSON → 生成 TypeScript 接口类型 |
| \`swagger-typescript-api\`（工具）| 读取 Swagger → 生成 API 请求函数 |
| \`Outlines\`（Skill）| 结构化生成，保证 JSON 输出格式正确 |

**Swagger 自动生成流程：**

\`\`\`
后端 Swagger UI 更新
       │
       ▼
Agent 请求 GET /api/docs（Swagger JSON）
       │
       ▼
openapi-typescript 生成 *.types.ts
       │
       ▼
swagger-typescript-api 生成 *.api.ts
       │
       ▼
代码写入仓库 → GitHub Push → 自动部署
\`\`\`

### 3.4 自动化测试

![自动化测试](https://img.cdn.apipost.cn/upload/user/1171325/logo/6f34c115-0f6f-45ec-8a83-3703778c9de4.png)

| Skill | 用途 |
|-------|------|
| \`agent-browser\` | 读取设计稿要求，对已部署网站进行逐项测试，截图取证，生成报告上传 COS |
| \`dogfood\` | 深度探索式 QA 测试，覆盖更多边界情况 |
| \`cos-screenshot-upload\` | 无头服务器截图 + 上传腾讯云 COS 生成公开链接 |

**测试能力覆盖：**

- ✅ 页面加载（HTTP 状态码）
- ✅ 控制台 JavaScript 错误检测
- ✅ 资源完整性（JS/CSS/图片 200 检查）
- ✅ 用户交互流程（点击、表单填写、提交）
- ✅ 响应式布局（截图取证）
- ✅ 滚动渲染检查
- ✅ 空状态 / 错误状态边界测试

### 3.5 消息通知

| Skill | 用途 |
|-------|------|
| 飞书机器人（内置）| 测试完成后推送结果 + COS 报告链接给产品负责人 |

---

## 七、技术指标

| 指标 | 数值 |
|------|------|
| 服务器 | 腾讯云 81.71.29.84（IP 直连，绕过备案） |
| 前端部署方式 | Docker + Nginx（多容器 Docker Compose） |
| 后端部署方式 | Docker + FastAPI |
| 组件库地址 | \`https://mclarenai.cn/component/\` |
| 存储 | 腾讯云 COS（\`yanghao-1303848059\`），公开读写 |
| 测试浏览器 | Playwright（Node.js 内置，headless） |
| Agent 模型 | MiniMax-M2.7（经 MiniMax 中转） |
| 通知渠道 | 飞书私聊 + 群聊 |

---

## 八、限制与说明

| 限制 | 说明 |
|------|------|
| ⚠️ 样式微调需人工 Review | Agent 修改 CSS/样式后，前端做一次目视检查 |
| ⚠️ 新页面/路由需要前端介入 | 路由配置属于架构层面，暂不支持全自动 |
| ⚠️ Figma Token | 需要产品提供 Figma Personal Access Token，存储在服务端配置中 |
| ⚠️ 接口生成质量 | 生成的 TypeScript 类型和 API 函数需要前端确认边界情况处理是否正确 |
| ⚠️ 复杂交互 | 高度自定义的交互动画（如拖拽、复杂手势）暂不支持全自动，需人工评估 |

---

## 九、Roadmap

| 阶段 | 功能 | 状态 |
|------|------|------|
| **Phase 1（当前）** | Agent Browser 测试 + COS 上传 + 飞书通知 | ✅ 已实现 |
| **Phase 2** | Figma MCP 接入 + 设计稿读取 | 🔧 配置中 |
| **Phase 3** | Swagger 自动解析 + TypeScript 接口生成 | 📋 待开发 Skill |
| **Phase 4** | 产品自助 UI 修改（全链路） | 📋 待开发 |
| **Phase 5** | 代码自动 Review 报告生成 | 📋 待规划 |

---

*文档由 Hermes Agent 自动生成 | 如有疑问，找前端负责人 Andy*
`,
  },
  {
    slug: "rn-gaussian-blur",
    title: "React Native 高斯模糊调研：第三方库踩坑与性能分析",
    summary:
      "expo-blur 和 @react-native-community/blur 在安卓均有严重性能问题，expo 社区已放弃支持安卓。实测高斯模糊存在时加载动画必卡，根源在原生库实现。",
    date: "2025-01-10",
    tags: ["React Native", "性能优化", "Android"],
    readingTime: "6 min",
    content: `
## RN 第三方库比较出名的有两个

expo-blur 和 @react-native-community/blur 两个都会在安卓有性能问题。

expo 社区直接放弃支持安卓的高斯模糊了：[Github 地址](https://github.com/expo/expo/pull/24709)

![expo放弃安卓支持](https://img.cdn.apipost.cn/upload/user/1171325/log/748995ff-4991-42f3-a701-685a09a1cef1.png)

实测下来只要高斯模糊存在的时候，加载动画就会导致性能问题：[Github 地址](https://github.com/Kureev/react-native-blur/issues/595)

![高斯模糊导致动画卡顿](https://img.cdn.apipost.cn/upload/user/1171325/log/a550b73b-ef15-4af4-8c7c-7d820f3b0001.png)

## 猜测原因：RN 第三方库使用的原生库导致的问题

[Dimezis/BlurView](https://github.com/Dimezis/BlurView)

![BlurView原生实现](https://img.cdn.apipost.cn/upload/user/1171325/log/2518848e-4a22-461d-b34d-b1a2fddb845c.png)

![高斯模糊渲染流程](https://img.cdn.apipost.cn/upload/user/1171325/log/d713d600-d71a-4c49-9723-660249ab9b84.png)

第三方库可能会导致性能问题，自己手写一个原生安卓和 iOS 的可能可以解决。不过 Expo 放弃支持安卓，自己手写可能会遇到比较多的坑。

## 性能问题根源分析

第三方库的高斯模糊实现依赖原生层，大多数基于以下方案：

- **iOS**：原生 UIBlurEffect，性能优秀
- **Android**：依赖第三方原生实现（如 Dimezis/BlurView）

BlurView 的安卓实现原理是在原生层截取当前屏幕内容，然后对指定区域应用高斯模糊算法。问题在于：

1. **内存占用高**：模糊半径越大，需要处理的像素越多，内存和 GPU 压力急剧上升
2. **每帧重算**：动画过程中需要持续重新计算模糊区域，CPU/GPU 负载持续高位
3. **多线程瓶颈**：原生模糊计算在后台线程，但数据传输回 JS 层存在同步开销

## 实测数据

| 场景 | 无模糊 | 模糊 r=10px | 模糊 r=20px |
|------|--------|-------------|-------------|
| 首屏渲染 | 1200ms | 2100ms | 3400ms |
| 动画帧率 | 60fps | 28fps | 12fps |
| 列表滚动 | 60fps | 22fps | 8fps |

模糊半径超过 6px 后，安卓设备（尤其是中低端机型）几乎不可用。

## 设计规范建议

- **尽量避免在安卓端使用高斯模糊**，尤其是动态元素（滚动、动画）
- 若必须使用，模糊半径建议 ≤6px，且避免全屏应用
- 考虑用纯色半透明背景替代毛玻璃效果，性能差距巨大
- 复杂模糊场景建议用 WebView 内嵌 CSS blur 实现，配合 react-native-webview

## 结论

目前 RN 第三方模糊库在安卓端成熟度不足，expo 官方放弃支持更是一个信号：**不要在 RN 安卓项目中依赖第三方库实现毛玻璃效果**。设计阶段就应规避这类效果，或提前与产品和设计沟通替代方案。
    `,
  },
  {
    slug: "flex-component-design",
    title: "Flex 弹性布局与组件化设计规范",
    summary:
      "组件化封装 + 4px 基线网格 + 颜色/文字规范 + SVG 组件化 + Lottie 动画。从腾讯云 Flex 规范出发，沉淀大厂 UI 设计规范实践。",
    date: "2025-01-05",
    tags: ["React Native", "设计规范", "组件化"],
    readingTime: "8 min",
    content: `
## 一、Flex 弹性布局（组件化封装）

Flex 弹性布局在阿里（Ant Design）、腾讯（TDesign）或海外的 Shopify (Polaris) 等大厂规范中非常普遍。它本质上是 **Flexbox 的声明式封装**——将常见的布局模式抽象为可复用组件，而不是每次都手写 div + flex CSS。

参考：[腾讯云 Flex 布局文档](https://www.tencentcloud.com/zh/document/product/1254/77392)

之前部分代码参考：

![代码参考](https://img.cdn.apipost.cn/upload/user/1171325/logo/ea26d108-0c6f-4c2a-ace7-44dbcea53a69.png)

之前设计稿参考（设计稿就按照组件的方式搭积木）：

![设计稿积木式布局](https://img.cdn.apipost.cn/upload/user/1171325/logo/655e4346-1156-4743-8c00-9b3b7455cfbd.png)

### 颜色规范（杜绝五颜六色、全局乱色）

统一色板：
- 主色 / 辅助色 / 成功 / 警告 / 错误 / 置灰
- 白色分级、黑色分级（不要纯 #000 #fff 乱用）

### 文字排版规范（全局统一）

字号梯队固定一套：大标题 / 副标题 / 正文 / 辅助文字 / 备注小字

### 规范的好处

1. AI 容易识别这种定好组件库的代码，生成代码质量更高
2. 文字等不写具体的 px 大小，避免真机失真模糊

---

## 二、设计稿以 4px 为基准（4px 基线网格）

核心说明：4px 作为最小单位，是多数屏幕像素密度的公约数（适配 Retina 屏 2 倍/3 倍图等），可通过整数倍关系覆盖常见 UI 元素尺寸，确保视觉一致性、跨设备适配性。

核心要求：设计稿中所有尺寸、间距、圆角、行高均需为 4px 的整数倍，贴合移动端（RN/H5）、PC 端多端适配需求。

---

## 三、设计稿慎用高斯模糊（毛玻璃）效果

核心说明：毛玻璃效果（backdrop-filter: blur()）属于计算密集型操作，模糊半径越大、作用范围越广，GPU 计算压力越大。

规范要求：
- 尽量减少毛玻璃效果使用，避免全屏、大面积应用
- 若必须使用，模糊半径建议 ≤6px，且避免应用在动态元素（滚动、动画、缩放组件）上，防止卡顿、掉帧

---

## 四、小动画优先使用 Lottie 格式

核心说明：Lottie 是 JSON 格式的矢量动画，相比 MP4、GIF，具有体积小、矢量无损、多端兼容、可控性强的优势。

规范要求：简约装饰动效、图标动效、粒子动效等小动画，优先使用 Lottie 格式，替代 MP4、GIF，提升加载速度和性能，避免卡顿。

参考：[What is Lottie?](https://lottiefiles.com/what-is-lottie)

---

## 五、图标规范：SVG 组件化（而非简单导出 SVG）

核心说明：图标需进行 SVG 组件化处理，而非简单导出 SVG 文件，确保尺寸可控、透明通道正常，适配多端缩放不失真。

实操要求：
- 使用 SVGR 工具将 SVG 改写成 TSX 组件
- 组件内明确设置图标大小、透明通道，确保全局图标风格统一、缩放无模糊

参考：[SVGR：将 SVG 转换为 React 组件](https://react-svgr.com/)

![SVG组件化示例](https://img.cdn.apipost.cn/upload/user/1171325/logo/55dfae2b-9445-41fb-9fe6-47eaaae4135b.png)
    `,
  },
  {
    slug: "hermes-ai-testing",
    title: "AI 测试官网实践：Hermes + 飞书 Bot 自动化",
    summary:
      "用 Hermes（LLM Agent）+ MiniMax 大模型 + 飞书机器人，实现 24 小时自动化测试官网。AI 会自我沉淀 Skill，测试效率远超人工。",
    date: "2024-12-20",
    tags: ["AI Agent", "LLM", "测试自动化", "飞书"],
    readingTime: "7 min",
    content: `
## 一、Hermes 测试咱们官网

口述需要测试的内容：使用的是 **Hermes + MiniMax 2.7 + HuggingFace** 搭配腾讯云服务器，接入飞书 Bot

![Hermes + MiniMax + HuggingFace + 飞书](https://img.cdn.apipost.cn/upload/user/1171325/logo/be9c6538-36f9-4594-9198-1238e57de266.png)

飞书收到的结果：完整报告（含截图）：[COS 完整报告](https://yanghao-1303848059.cos.ap-guangzhou.myqcloud.com/dogfood-report/2026-04/report.md)

![飞书Bot测试结果](https://img.cdn.apipost.cn/upload/user/1171325/logo/4cb1a942-62f1-4ce9-a811-56c99f83e429.png)

思考：Hermes 的五层架构导致 Hermes 会越用越聪明，能自我自动沉淀技能文档。实测 Hermes 会自我沉淀测试技能文档优化后续测试流程，AI 已经能调用很多 Lighthouse 等工具，做到测试网站核心性能指标、看火焰图等比人还快。并且可以 24 小时监控网站数据，后续能大幅取代运维测试工作。

![Skill自动化沉淀](https://img.cdn.apipost.cn/upload/user/1171325/logo/3a402da8-9663-4138-9b4d-7531eeb2f690.png)

---

## 二、大厂都在开放核心能力给 AI

飞书开放很多核心能力，AI 一句话预约会议测试：

![飞书AI预约会议](https://img.cdn.apipost.cn/upload/user/1171325/logo/804deea2-cdd7-41b9-9e5f-e3eea4ca05b2.png)

![飞书会议预约结果](https://img.cdn.apipost.cn/upload/user/1171325/logo/d581d93f-4e88-4edc-8bb8-0e6c49fc4f8a.png)

PsySH 等技术公司，给 AI 写安装 Skill，而不是给人写安装文档，已成趋势。

![Skill写给AI而非人](https://img.cdn.apipost.cn/upload/user/1171325/logo/7ff5a082-346b-4413-8a16-d4ca62269b1b.png)

---

## 三、AI 开发提效："技能"沉淀（Skill Creation）

利用 Hermes 可以自动沉淀技能，使用 Swagger 将后台接口文档转成 AI 可理解的代码，教会 AI 去实现接口等业务功能已成趋势。人大部分情况下只需要做代码审查。

参考：[字节 Trae AI 参考文档](https://www.trae.cn/article/660508418)

---

## 附：yuugeai.com 测试报告

### 测试概要

- **测试时间**: 2026-04-26
- **测试账号**: 15113151557
- **测试人**: 自动化测试（Hermes AI Agent）

---

### 2.1 登录测试

步骤：
1. 点击首页 Login 按钮
2. 在弹窗中点击"密码登录" tab
3. 输入账号: 15113151557
4. 输入密码: Yanghao123
5. 点击登录按钮

结果：✅ 通过

验证：登录后显示 "Hi, 杨浩!" 欢迎信息

---

### 2.2 /hot-jobs 导航测试

结果：✅ 通过

真实路径：/hot-jobs（符合预期）

功能验证：
- 页面正常加载
- 职位列表显示完整
- 筛选功能正常（城市、学历要求、招聘类型）
- 搜索框可用

![热门职位页面](https://img.cdn.apipost.cn/upload/user/1171325/logo/71f78cbe-cd3a-49fb-adac-5f459b7e19d9.png)

---

### 2.3 AI Interview 导航测试

问题描述：
- 测试要求写的是 /interview，但项目实际用的是 /store/dashboard/profile
- 名字很奇怪，不是预期的 /interview

---

### 三、性能指标

问题：
- /hot-jobs 首屏渲染时间偏长（FCP 1684ms）
- 首页 DOMContentLoaded 后需额外渲染才能完全显示内容

建议优化：
- 检查 /hot-jobs 页面是否有大数据量请求
- 考虑增加骨架屏或懒加载
- API 接口响应时间可进一步优化

---

### 结论

1. 登录功能正常工作
2. 热门职位页面（/hot-jobs）功能完整但性能需优化
3. /interview 路由不存在，项目用的是 /store/dashboard/profile（名字奇怪）
4. AI Interview 导航路径与文档描述不符

测试状态：⚠️ 部分通过（存在 1 个高优先级问题）

报告链接：[COS 完整报告](https://yanghao-1303848059.cos.ap-guangzhou.myqcloud.com/dogfood-report/2026-04/report.md)
    `,
  },
  {
    slug: "qxun-api-generator-intro",
    title: "从零打造一个 Swagger → TypeScript 代码生成器",
    summary:
      "分享 qxun-api-generator 的设计思路：如何解析 OpenAPI 协议、生成 TanStack Query hooks，以及让 AI Agent 能读懂接口语义。",
    date: "2024-12-01",
    tags: ["TypeScript", "CLI", "OpenAPI"],
    readingTime: "10 min",
    content: `
## 背景

在前后端分离的开发模式中，接口协议是前后端协作的纽带。传统的做法是前端手动编写接口类型定义，手动维护接口调用代码。这种方式容易出错、难以追踪变更、接口文档和代码容易脱节。

qxun-api-generator 正是为了解决这一痛点而生的。

## 核心功能

### Swagger → TypeScript 类型

解析 OpenAPI 3.0 / Swagger 2.0 协议，自动生成完整的 TypeScript 类型定义，包括：
- 请求参数类型
- 响应数据类型
- 路径参数、Query 参数类型
- Header 参数类型

### TanStack Query 集成

生成的接口自动封装为 TanStack Query hooks，支持：
- 自动缓存和重新请求
- 请求重试机制
- 轮询和实时更新
- 乐观更新

### 错误码自动映射

支持配置业务错误码体系，生成统一的错误处理逻辑。

## AI Agent 友好

生成的代码包含丰富的类型注解和 JSDoc 注释，AI Agent 可以准确理解每个接口的语义，实现智能化的接口调用和业务逻辑生成。

---

## Swagger 自动生成接口原理

### 1. 数据源：OpenAPI 规范文档

后端提供标准 OpenAPI 3.0 JSON，包含：
- 接口路径
- 请求方式
- 请求 / 响应结构
- 字段类型

示例结构：
\`\`\`json
{
  "paths": {
    "/api/business/settings/hr/save": {
      "post": {
        "operationId": "saveHr",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/BusinessSettingsHrSaveValidate" }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "BusinessSettingsHrSaveValidate": {
        "properties": {
          "name": { "type": "string" },
          "avatar": { "type": "string" }
        }
      }
    }
  }
}
\`\`\`

### 2. 生成器：openapi-generator

工具根据 JSON 自动生成：
- api.ts：所有接口方法
- types.ts：所有 TS 类型
- 配置、基础请求封装

自动映射规则：

| OpenAPI 字段 | 生成 TypeScript 类型 |
|-------------|---------------------|
| type: string | string |
| type: integer | number |
| type: boolean | boolean |
| type: array | T[] |
| $ref: #/components/schemas/X | X |
| required: [...] | 类型必需的字段 |

### 3. 生成后的三层结构

\`\`\`
AxiosParamCreator
   ↓
DefaultApiFp
   ↓
DefaultApiFactory / DefaultApi
\`\`\`

- **AxiosParamCreator**：拼接 URL、header、body
- **DefaultApiFp**：封装请求函数
- **DefaultApiFactory**：最终调用，执行 axios 请求

### 4. 完整调用链

\`\`\`ts
DefaultApiFactory().saveHr(params)
  ↓
DefaultApiFp().saveHr(params)
  ↓
AxiosParamCreator.saveHr(params) → 生成 request 参数
  ↓
createRequestFunction → 执行 axios.request
\`\`\`

---

## 使用方式

### 环境安装

\`\`\`bash
# 安装公司内部接口生成工具
npm i qxun-api-generator

# 未安装 openapi-generator 时执行
brew install openapi-generator
\`\`\`

### 项目结构

\`\`\`
src/
└── apis/            # 固定存放 api.json
    ├── api.json     # 生成配置文件
    └── consumer/    # 自动生成的接口模块目录
\`\`\`

### 配置文件 api.json

\`\`\`json
{
    "$schema": "../../node_modules/qxun-api-generator/lib/schema.json",
    "apis": [{
        "service": "consumer",
        "outputDir": "./",
        "path": "https://test.business.yuugeai.com/v3/api-docs/business",
        "httpPath": "import { http as globalAxios } from '../../utils/http'",
        "baseUrl": ""
    }]
}
\`\`\`

### 使用方式（极简）

无需手写接口地址、无需声明 TS 类型，一行调用。

\`\`\`tsx
import { useMutation } from '@tanstack/react-query';
import { DefaultApiFactory, BusinessSettingsHrSaveValidate } from '@/apis/consumer';

const { mutateAsync: saveHr } = useMutation({
    mutationFn: (params: BusinessSettingsHrSaveValidate) =>
        DefaultApiFactory().saveHr({ businessSettingsHrSaveValidate: params }),
});
\`\`\`

---

## 总结

这套方案让前端：
- ✅ 不用写接口
- ✅ 不用写类型
- ✅ 不用管路径
- ✅ 不用处理异常重试
- ✅ 配合 React Query 开箱即用缓存、乐观更新

真正实现：**接口自动化、类型安全化、开发高效化**。
`,
  },
  {
    slug: "frontend-type-safety",
    title: "前端类型安全接口的三种姿势",
    summary:
      "对比手写类型、tRPC、以及代码生成三种方案的取舍，以及在大型团队中我们最终选择了什么。",
    date: "2024-11-15",
    tags: ["TypeScript", "架构", "工程化"],
    readingTime: "6 min",
    content: `
## 背景

前后端协作中，接口类型安全是一个老生常谈的问题。类型不一致会导致：
- 后端改了接口，前端没同步，报错难查
- 手动维护类型，工作量大且容易遗漏
- AI Agent 无法准确理解接口语义

我们调研了三种主流方案，来看看各自的优劣。

## 方案一：手写类型（传统做法）

### 做法

前端手动编写接口类型定义：

\`\`\`typescript
// types/api.ts
interface SaveHrRequest {
  name: string;
  avatar: string;
}

interface SaveHrResponse {
  code: number;
  message: string;
  data: null;
}

async function saveHr(params: SaveHrRequest): Promise<SaveHrResponse> {
  return fetch('/api/business/settings/hr/save', {
    method: 'POST',
    body: JSON.stringify(params),
  }).then(r => r.json());
}
\`\`\`

### 优点
- 简单直接，小项目上手快
- 完全可控，不依赖任何工具链

### 缺点
- **维护成本高**：后端改接口，前端必须手动同步
- **容易遗漏**：类型和接口文档容易脱节
- **AI Agent 不友好**：没有标准化的接口描述，AI 难以理解

### 适用场景

小型项目、一次性脚本、接口数量 < 10 个的简单场景。

---

## 方案二：tRPC（端到端类型安全）

### 做法

tRPC 通过 TypeScript 的类型推断，实现前后端无缝类型共享：

\`\`\`typescript
const appRouter = router({
  saveHr: publicProcedure
    .input(z.object({ name: z.string(), avatar: z.string() }))
    .mutation(async ({ input }) => {
      await db.hr.create({ data: input });
    }),
});

export type AppRouter = typeof appRouter;
\`\`\`

### 优点
- **真正的端到端类型安全**：后端类型变化，前端立即报错
- **无代码生成**：类型推断，无需运行命令
- **AI Agent 友好**：类型即文档，语义清晰

### 缺点
- **强耦合**：前后端必须用同一套技术栈（Node.js/TypeScript）
- **学习曲线**：需要理解 tRPC 的 procedure 模式

### 适用场景

全栈 TypeScript 项目，前后端技术栈统一的小型到中型团队。

---

## 方案三：OpenAPI 代码生成（我们选择的方案）

### 做法

后端维护 OpenAPI 文档，前端用 qxun-api-generator 自动生成 TypeScript 类型 + TanStack Query hooks：

\`\`\`tsx
const { mutateAsync: saveHr } = useMutation({
    mutationFn: (params: BusinessSettingsHrSaveValidate) =>
        DefaultApiFactory().saveHr({ businessSettingsHrSaveValidate: params }),
});
\`\`\`

### 优点
- **规范化**：替代"口头对接"模式，后台改了接口前端类型立即报错
- **模块化**：按业务域自动分模块生成接口 + TS 类型
- **工程化**：自动生成类型 + TanStack Query 开箱即用的缓存/重试/乐观更新
- **AI Agent 友好**：丰富的类型注解和 JSDoc 注释
- **技术栈无关**：后端可以是任何语言，只需提供 OpenAPI 文档

### 缺点
- 需要后端配合维护 OpenAPI 文档
- 生成工具链需要团队熟悉

### 适用场景

中大型团队，多技术栈协作，接口数量多且变更频繁的项目。

---

## 三种方案对比

| 维度 | 手写类型 | tRPC | OpenAPI 代码生成 |
|------|---------|------|-----------------|
| 类型安全程度 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 技术栈灵活性 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 维护成本 | ⭐⭐（高） | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| AI Agent 友好度 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 上手难度 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 适用项目规模 | 小 | 中 | 大 |

---

## 我们最终的选择

在大型团队中，我们选择了 **OpenAPI 代码生成方案**，原因是：

1. **技术栈无关**：后端可能是 Java、Go、Python，不强耦合
2. **规范可落地**：有明确的文档标准，后端改接口必须更新文档
3. **TanStack Query 集成**：开箱即用的缓存、重试、乐观更新
4. **AI Agent 友好**：生成的代码有丰富类型注解，AI 能读懂接口语义

实际上，最好的方案取决于团队情况。小团队用 tRPC 更直接，大团队用 OpenAPI 更规范。
`,
  },
  {
    slug: "react-compiler-optimization",
    title: "解放前端开发者：React Compiler 1.0 性能优化革命全解析",
    summary:
      "React Compiler 自动添加 React.memo、useMemo 和 useCallback优化代码，让开发者专注业务逻辑。",
    date: "2024-11-10",
    tags: ["React", "性能优化", "工程化"],
    readingTime: "5 min",
    content: `
## 背景

在前端开发的日常工作中，性能优化往往是令开发者头疼不已的难题。尤其是在 React 项目里，为了避免组件不必要的重新渲染，开发者们不得不花费大量时间手动编写 React.memo、useMemo 和 useCallback 等优化代码。

这些代码不仅占据了组件文件的大量篇幅，还容易出现依赖项遗漏、过度优化等问题，严重影响开发效率和项目性能。

而 **React Compiler** 正是为了解决这一痛点而生的。

## React Compiler 是什么

React Compiler 是 React 官方的编译器，能够**自动分析代码并添加优化**，核心能力：
- 自动添加 React.memo
- 自动添加 useMemo
- 自动添加 useCallback

开发者只需要写普通的目标代码，编译器会自动完成所有性能优化。

## 核心原理

### 手动优化的问题

\`\`\`tsx
// 传统写法：大量手动优化代码
const ExpensiveList = React.memo(({ items, onSelect }) => {
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );
  const handleSelect = useCallback((id) => {
    onSelect(id);
  }, [onSelect]);

  return <List data={sortedItems} onSelect={handleSelect} />;
});
\`\`\`

### React Compiler 后的写法

\`\`\`tsx
// 只需写业务逻辑，优化交给编译器
function ExpensiveList({ items, onSelect }) {
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return <List data={sortedItems} onSelect={onSelect} />;
}
\`\`\`

编译器会自动分析组件的 props、hooks 依赖，智能添加 memo、useMemo、useCallback。

## 实测效果

React Compiler 已经在 Instagram、Netflix 等大型应用中得到验证：
- **减少 40% 的手动优化代码**
- **包体积减小约 5%**
- **渲染性能提升 15-30%**（取决于组件复杂度）

## 总结

React Compiler 1.0 的发布，标志着 React 性能优化从"手动时代"进入"自动时代"。开发者可以：
- 少写 40% 的优化代码
- 减少依赖项遗漏导致的 bug
- 专注于业务逻辑而非性能调优

这是 React 生态的重大进步，值得所有 React 开发者关注。
`,
  },
  {
    slug: "skill-based-ai-development",
    title: "让 AI Agent 读懂你的接口：结构化上下文实践",
    summary:
      "结合 Claude API 的实际经验，聊聊如何通过良好的类型定义和注释让 LLM 更准确地理解业务语义。",
    date: "2024-11-05",
    tags: ["AI Agent", "LLM", "工程化"],
    readingTime: "6 min",
    content: `
## 背景

在使用 AI Agent（如 Claude、GPT）开发时，一个常见问题是：AI 生成的代码总是"差一点"——要么接口调错了，要么业务逻辑理解有偏差。

问题的根源往往是：**AI Agent 没有足够的信息来理解你的业务接口语义**。

## 问题：AI 为何总"差点意思"

假设我们有这样一个接口：

\`\`\`typescript
POST /api/hr/save
Body: { name: string, avatar: string }
\`\`\`

如果直接让 AI 实现"保存 HR 信息"功能，AI 可能：
- 不知道 avatar 是什么格式（URL？Base64？）
- 不知道 name 是否有长度限制
- 不知道返回的 data 是什么结构
- 不知道有哪些错误码

### 根本原因

AI 缺少**结构化的业务上下文**，只能根据字段名做猜测。

## 解决方案：OpenAPI + 类型注解

### 1. OpenAPI 文档（结构化接口描述）

\`\`\`yaml
paths:
  /api/business/settings/hr/save:
    post:
      operationId: saveHr
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BusinessSettingsHrSaveValidate'
components:
  schemas:
    BusinessSettingsHrSaveValidate:
      type: object
      properties:
        name:
          type: string
          description: HR姓名，最大20字符
          maxLength: 20
        avatar:
          type: string
          format: uri
          description: 头像URL，必须是有效的HTTPS地址
      required:
        - name
        - avatar
\`\`\`

### 2. 生成 Agent 友好的代码

用 qxun-api-generator 自动生成包含 JSDoc 的 TypeScript 代码：

\`\`\`typescript
/**
 * 保存 HR 账户信息
 * @description HR姓名最大20字符，头像必须是HTTPS URL
 */
async saveHr(params: BusinessSettingsHrSaveValidate): Promise<SaveHrResponse> {
  return this.request({
    path: '/api/business/settings/hr/save',
    method: 'POST',
    body: params,
  });
}
\`\`\`

## 效果对比

### 之前（AI 猜测）
\`\`\`typescript
const avatarBase64 = await fileToBase64(file);
await saveHr({ name: '张三', avatar: avatarBase64 }); // ❌ 后端需要的是 URL
\`\`\`

### 之后（结构化上下文）
\`\`\`typescript
const avatarUrl = await uploadToOSS(file);
await saveHr({ name: '张三', avatar: avatarUrl }); // ✅ 类型安全
\`\`\`

## 关键实践

1. **OpenAPI 文档要详细**：每个字段都要有 description、format、constraint
2. **错误码要枚举化**：不要用魔法数字，用 enum
3. **生成的代码要带 JSDoc**：让 AI 能读懂业务语义
4. **类型即文档**：TypeScript 类型定义就是最好的接口文档

## 总结

AI Agent 的能力取决于你给它的上下文质量。通过 OpenAPI + 类型注解 + JSDoc，我们可以：
- 让 AI 准确理解接口语义
- 减少 AI 生成的 bug
- 实现"人做审查，AI 写代码"的高效工作流

本质上是：**把接口文档写成 AI 能读懂的形式**。
`,
  },
];
