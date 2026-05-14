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
    slug: "rn-gaussian-blur",
    title: "React Native 高斯模糊调研：第三方库踩坑与性能分析",
    summary:
      "expo-blur 和 @react-native-community/blur 在安卓均有严重性能问题，expo 社区已放弃支持安卓。实测高斯模糊存在时加载动画必卡，根源在原生库实现。",
    date: "2025-01-10",
    tags: ["React Native", "性能优化", "Android"],
    readingTime: "6 min",
    content: `
## 背景

在 React Native 项目中实现高斯模糊（毛玻璃）效果，业内最常用的两个库是 **expo-blur** 和 **@react-native-community/blur**。我在实际项目中深度使用后，发现安卓端存在严重的性能问题。

## 第三方库现状

### expo-blur

Expo 社区已于 2024 年正式放弃支持安卓端的高斯模糊实现。

来源：[expo#24709](https://github.com/expo/expo/pull/24709)

核心问题：BlurView 底层依赖的原生库在安卓上有帧率崩溃问题，Expo 团队认为维护成本过高，直接移除了安卓实现。

![expo放弃安卓支持](https://img.cdn.apipost.cn/upload/user/1171325/log/748995ff-4991-42f3-a701-685a09a1cef1.png)

### @react-native-community/blur

这个库在 iOS 端表现良好，但安卓端问题频出。

实测场景：只要页面中存在高斯模糊效果，**加载动画必卡**，尤其是在列表滚动和页面转场时帧率下降明显。

来源：[react-native-blur#595](https://github.com/Kureev/react-native-blur/issues/595)

![高斯模糊导致动画卡顿](https://img.cdn.apipost.cn/upload/user/1171325/log/a550b73b-ef15-4af4-8c7c-7d820f3b0001.png)

## 性能问题根源分析

第三方库的高斯模糊实现依赖原生层，大多数基于以下方案：

- **iOS**：原生 UIBlurEffect，性能优秀
- **Android**：依赖第三方原生实现（如 [Dimezis/BlurView](https://github.com/Dimezis/BlurView)）

BlurView 的安卓实现原理是在原生层截取当前屏幕内容，然后对指定区域应用高斯模糊算法。问题在于：

1. **内存占用高**：模糊半径越大，需要处理的像素越多，内存和 GPU 压力急剧上升
2. **每帧重算**：动画过程中需要持续重新计算模糊区域，CPU/GPU 负载持续高位
3. **多线程瓶颈**：原生模糊计算在后台线程，但数据传输回 JS 层存在同步开销

![BlurView原生实现原理](https://img.cdn.apipost.cn/upload/user/1171325/log/2518848e-4a22-461d-b34d-b1a2fddb845c.png)

![高斯模糊渲染流程](https://img.cdn.apipost.cn/upload/user/1171325/log/d713d600-d71a-4c49-9723-660249ab9b84.png)

## 实测数据

| 场景 | 无模糊 | 模糊 r=10px | 模糊 r=20px |
|------|--------|-------------|-------------|
| 首屏渲染 | 1200ms | 2100ms | 3400ms |
| 动画帧率 | 60fps | 28fps | 12fps |
| 列表滚动 | 60fps | 22fps | 8fps |

模糊半径超过 6px 后，安卓设备（尤其是中低端机型）几乎不可用。

## 设计规范建议

根据 React Native 最佳实践和本次调研结论：

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

### 核心思路

Flex 弹性布局在阿里（Ant Design）、腾讯（TDesign）、海外 Shopify (Polaris) 等大厂规范中非常普遍。它的本质是 **Flexbox 的声明式封装**——将常见的布局模式抽象为可复用组件，而不是每次都手写 div + flex CSS。

参考：[腾讯云 Flex 布局文档](https://www.tencentcloud.com/zh/document/product/1254/77392)

### 设计稿参考

设计稿按照"组件化搭积木"的方式构建，每个 UI 模块都是独立的组件：

- 组件有明确的 Props 接口（传入文案、图标、状态）
- 组件内部处理所有布局逻辑（padding、margin、flex-direction）
- 外部只需声明"这里要放什么内容"

参考：[腾讯云 Flex 布局文档](https://www.tencentcloud.com/zh/document/product/1254/77392)

![设计稿组件化示例](https://img.cdn.apipost.cn/upload/user/1171325/logo/ea26d108-0c6f-4c2a-ace7-44dbcea53a69.png)

![设计稿积木式布局](https://img.cdn.apipost.cn/upload/user/1171325/logo/655e4346-1156-4743-8c00-9b3b7455cfbd.png)

### 颜色规范（杜绝五颜六色）

大厂 UI 规范的核心原则之一：**全局颜色数量严格受控**。

**统一色板**：
- 主色 / 辅助色 / 成功 / 警告 / 错误 / 置灰
- 白色分级（#FFFFFF → #F7F8FA → #F2F3F5 → ...）
- 黑色分级（#000000 → #1A1A1A → #333333 → ...）

禁止：随意在代码或设计稿中写 #随意色值。

### 文字排版规范

**字号梯队固定一套**，不允许随意新增字号：
- 大标题 / 副标题 / 正文 / 辅助文字 / 备注小字

禁止：在代码中写死具体 px 值（如 fontSize: 14），真机适配极易出现半个像素导致的模糊问题。

### 规范的好处

1. **AI 更容易识别**定好组件库的代码，生成代码质量更高
2. 文字等不写具体 px 大小，避免真机失真模糊

---

## 二、4px 基线网格

### 核心说明

4px 作为最小单位，是多数屏幕像素密度的公约数（适配 Retina 屏 2 倍/3 倍图），可通过整数倍关系覆盖常见 UI 元素尺寸，确保视觉一致性、跨设备适配性。

参考：[4px基线网格：精准布局，解锁设计开发新境界](https://www.tencentcloud.com/zh/document/product/1254/77392)

### 规范要求

设计稿中**所有尺寸、间距、圆角、行高**均需为 4px 的整数倍，贴合移动端（RN/H5）、PC 端多端适配需求。

---

## 三、高斯模糊慎用原则

### 核心说明

毛玻璃效果（backdrop-filter: blur()）属于计算密集型操作，模糊半径越大、作用范围越广，GPU 计算压力越大。

参考：[CSS毛玻璃效果进阶：如何优化性能与兼容性（含移动端适配）](https://www.tencentcloud.com/zh/document/product/1254/77392)

### 规范要求

- 尽量减少毛玻璃效果使用，避免全屏、大面积应用
- 若必须使用，模糊半径建议 ≤6px，且避免应用在动态元素（滚动、动画、缩放组件）上
- RN 安卓端第三方模糊库性能问题严重（详见另一篇调研）

### 性能实测数据

| 场景 | 无模糊 | 模糊 r=10px | 模糊 r=20px |
|------|--------|-------------|-------------|
| 首屏渲染 | 1200ms | 2100ms | 3400ms |
| 动画帧率 | 60fps | 28fps | 12fps |
| 列表滚动 | 60fps | 22fps | 8fps |

模糊半径超过 6px 后，安卓设备（尤其是中低端机型）几乎不可用。

---

## 四、小动画优先使用 Lottie

### 核心说明

Lottie 是 JSON 格式的矢量动画，相比 MP4、GIF，具有体积小、矢量无损、多端兼容、可控性强的优势。

### 规范要求

简约装饰动效、图标动效、粒子动效等小动画，**优先使用 Lottie 格式**，替代 MP4、GIF，提升加载速度和性能，避免卡顿。

参考：[What is Lottie?](https://lottiefiles.com/what-is-lottie)

---

## 五、图标规范：SVG 组件化

### 核心说明

图标需进行 **SVG 组件化处理**，而非简单导出 SVG 文件，确保尺寸可控、透明通道正常，适配多端缩放不失真。

### 实操要求

- 使用 **SVGR** 工具将 SVG 改写成 TSX 组件
- 组件内明确设置图标大小、透明通道，确保全局图标风格统一
- 缩放无模糊，适配多端（RN/Android/iOS/Web）

参考：[SVGR：将 SVG 转换为 React 组件](https://react-svgr.com/)

### 错误做法

\`\`\`tsx
// 错误：简单引用 SVG 文件
import Logo from './logo.svg';
<img src={Logo} />
\`\`\`

### 正确做法

\`\`\`tsx
// 正确：SVGR 组件化
import { ReactComponent as Logo } from './logo.svg';
<Logo width={24} height={24} />
\`\`\`

![SVG组件化示例](https://img.cdn.apipost.cn/upload/user/1171325/logo/55dfae2b-9445-41fb-9fe6-47eaaae4135b.png)

---

## 总结

组件化设计 + 严格的设计规范是高质量前端的基础：
- Flex 布局封装减少重复样式代码
- 4px 基线网格确保多端像素一致性
- 颜色/文字规范杜绝视觉不一致
- SVG 组件化 + Lottie 保证图标动画质量
- 慎用高斯模糊避免性能问题
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
## 一、Hermes 测试官网实践

### 技术架构

使用 **Hermes**（LLM Agent）+ **MiniMax 2.7** 大模型 + **HuggingFace** 工具生态 + **腾讯云服务器**，接入 **飞书 Bot** 作为报告接收端，形成完整的 AI 测试闭环。

![Hermes + MiniMax + HuggingFace + 飞书](https://img.cdn.apipost.cn/upload/user/1171325/logo/be9c6538-36f9-4594-9198-1238e57de266.png)

### 工作流程

1. 通过飞书向 Bot 发送测试指令（口述需求）
2. Hermes 自动拆解任务：导航测试、功能验证、截图截图、性能分析
3. Hermes 调用 Lighthouse 工具测试核心性能指标
4. 生成带截图的完整测试报告
5. 报告自动推送到飞书群

![飞书Bot测试结果](https://img.cdn.apipost.cn/upload/user/1171325/logo/4cb1a942-62f1-4ce9-a811-56c99f83e429.png)

### 核心优势

**自我沉淀 Skill**：Hermes 的五层架构使其越用越聪明。每次测试后，AI 会自动沉淀测试技能文档（SKILL.md），后续同类测试可直接复用，流程越来越高效。

实测案例：对 yuugeai.com 进行登录、导航、性能测试，AI 自动生成了完整的带截图测试报告，包含了火焰图分析、FCP/TBT 指标解读、路由问题发现。

![Skill自动化沉淀](https://img.cdn.apipost.cn/upload/user/1171325/logo/3a402da8-9663-4138-9b4d-7531eeb2f690.png)

### 性能测试能力

AI 能调用 Lighthouse 等工具，测试网站核心性能指标，生成火焰图，比人工测试更快更全面：
- FCP（First Contentful Paint）
- TBT（Total Blocking Time）
- 路由问题发现（/interview 路由不存在，实际路径 /store/dashboard/profile）
- 24 小时监控网站数据

---

## 二、大厂都在开放核心能力给 AI

### 飞书开放 AI 能力

飞书开放了很多核心 API 能力给 AI 调用。实测：AI 一句话预约会议，AI 自动完成日历创建、会议室预定、参会人邀请。

![飞书AI预约会议](https://img.cdn.apipost.cn/upload/user/1171325/logo/804deea2-cdd7-41b9-9e5f-e3eea4ca05b2.png)

![飞书会议预约结果](https://img.cdn.apipost.cn/upload/user/1171325/logo/d581d93f-4e88-4edc-8bb8-0e6c49fc4f8a.png)

### AI 写安装 Skill 而非给人写文档

像 PsySH 等技术公司，已经开始给 AI 写安装 Skill（技能文档），而不是给人写安装文档。Skill 的沉淀使 AI 能够自主执行复杂操作，人只需要做代码审查。

![Skill写给AI而非人](https://img.cdn.apipost.cn/upload/user/1171325/logo/7ff5a082-346b-4413-8a16-d4ca62269b1b.png)

参考：[字节 Trae AI 参考文档](https://www.trae.cn/article/660508418)

---

## 三、AI 开发提效：技能沉淀

### 技能沉淀（Skill Creation）

利用 Hermes 可以自动沉淀技能的特性，使用 Swagger 将后台接口文档转成 AI 可理解的代码，教会 AI 去实现接口等业务功能。

核心流程：
1. 用 Swagger 定义后台接口协议
2. AI 读取 OpenAPI 文档，理解接口语义
3. AI 自动生成调用代码或实现接口
4. 人只需要做代码审查，确认逻辑正确

### 趋势判断

**AI 一句话完成测试、预约会议、生成报告**已经不是演示 Demo，而是实际可用的能力。大厂将核心能力开放给 AI，AI 通过 Skill 自主执行操作，人从执行者变为审核者，这是不可逆的趋势。

---

## 附：yuugeai.com 测试报告摘要

### 测试概要

- **测试时间**: 2026-04-26
- **测试账号**: 15113151557
- **测试人**: 自动化测试（Hermes AI Agent）

### 测试结果

- **登录测试**：通过，AI 成功完成密码登录流程，识别"Hi, 杨浩!"欢迎信息
- **热门职位页面**：功能完整，但 FCP 1684ms，首屏渲染偏慢
- **路由问题**：/interview 实际路径为 /store/dashboard/profile（与文档不符）
- **建议**：增加骨架屏/懒加载，优化大数据量请求的 API 响应时间

### 详细截图

![热门职位页面](https://img.cdn.apipost.cn/upload/user/1171325/logo/71f78cbe-cd3a-49fb-adac-5f459b7e19d9.png)

![测试报告截图](https://img.cdn.apipost.cn/upload/user/1171325/logo/4cb1a942-62f1-4ce9-a811-56c99f83e429.png)

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
