"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Package,
  Terminal,
  Sparkles,
  Layers,
  FileCode,
  Zap,
  Shield,
  BookOpen,
  ExternalLink,
  Code2,
  Users,
  Cpu,
  Globe,
  Calendar,
  ArrowRight,
  Rss,
  Clock,
} from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* ---------- shared ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sky-950 text-sky-400 border border-sky-900">
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900 p-5 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="w-1 h-4 rounded-full bg-sky-500 block" />
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
        {children}
      </h2>
    </div>
  );
}

/* ---------- data ---------- */

const posts = [
  {
    slug: "qxun-api-generator-intro",
    title: "从零打造一个 Swagger → TypeScript 代码生成器",
    summary:
      "分享 qxun-api-generator 的设计思路：如何解析 OpenAPI 协议、生成 TanStack Query hooks，以及让 AI Agent 能读懂接口语义。",
    date: "2024-12-01",
    tags: ["TypeScript", "CLI", "OpenAPI"],
    readingTime: "8 min",
  },
  {
    slug: "type-safe-api-patterns",
    title: "前端类型安全接口的三种姿势",
    summary:
      "对比手写类型、tRPC、以及代码生成三种方案的取舍，以及在大型团队中我们最终选择了什么。",
    date: "2024-11-15",
    tags: ["TypeScript", "架构"],
    readingTime: "6 min",
  },
  {
    slug: "ai-agent-context",
    title: "让 AI Agent 读懂你的接口：结构化上下文实践",
    summary:
      "结合 Claude API 的实际经验，聊聊如何通过良好的类型定义和注释让 LLM 更准确地理解业务语义。",
    date: "2024-10-28",
    tags: ["AI Agent", "LLM", "工程化"],
    readingTime: "5 min",
  },
];

const features = [
  {
    icon: <Layers className="w-4 h-4" />,
    title: "Swagger → TypeScript 类型",
    desc: "解析 OpenAPI 3.0 / Swagger 2.0，自动生成完整 TypeScript 类型定义",
  },
  {
    icon: <FileCode className="w-4 h-4" />,
    title: "TanStack Query 集成",
    desc: "生成接口自动封装为 hooks，支持缓存、重试、轮询等高级特性",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "错误码自动映射",
    desc: "配置业务错误码体系，生成统一的错误处理逻辑",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    title: "Agent 可阅读的协议",
    desc: "高度结构化，LLM Agent 可快速理解接口语义",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "多项目快速复用",
    desc: "一次配置，通过 npm 包分发在各项目间保持协议同步",
  },
  {
    icon: <Cpu className="w-4 h-4" />,
    title: "高度可定制",
    desc: "支持自定义拦截器、响应转换、全局错误处理",
  },
];

/* ---------- page ---------- */

export default function Home() {
  const [tab, setTab] = useState<"posts" | "project">("posts");
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800 bg-[#0a0f1a]/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-5 h-13 flex items-center justify-between" style={{ height: 52 }}>
          <span className="font-bold text-slate-100 tracking-tight">
            Saylo<span className="text-sky-400">.</span>
          </span>
          <div className="flex items-center gap-5 text-sm text-slate-500">
            <button onClick={() => setTab("posts")} className={`transition-colors hover:text-slate-200 ${tab === "posts" ? "text-slate-200" : ""}`}>
              博客
            </button>
            <button onClick={() => setTab("project")} className={`transition-colors hover:text-slate-200 ${tab === "project" ? "text-slate-200" : ""}`}>
              项目
            </button>
            <a href="https://github.com/andy304yang" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <GitHubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-5 pt-20">

        {/* ── Hero ── */}
        <section className="py-12 border-b border-slate-800">
          <div className="flex items-start gap-5">
            <Image
              src="/andy.jpeg"
              alt="Saylo"
              width={64}
              height={64}
              className="rounded-2xl object-cover object-top flex-shrink-0"
              style={{ width: 64, height: 64 }}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-slate-100 mb-1">你好，我是 Saylo</h1>
              <p className="text-sm text-slate-500 mb-3">
                全栈开发工程师 · 开源工具作者 · AI Agent 探索者
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                专注于前端工程化、API 类型安全与 AI Agent 开发。
                喜欢造轮子，坚信好的工具能解放生产力。
                这里记录我的技术思考和开源经历。
              </p>
              <div className="flex gap-2 mt-4">
                <a href="https://github.com/andy304yang" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors">
                  <GitHubIcon className="w-3.5 h-3.5" />
                  andy304yang
                </a>
                <a href="https://www.npmjs.com/package/qxun-api-generator" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-950 hover:bg-sky-900 text-sky-400 border border-sky-900 transition-colors">
                  <Package className="w-3.5 h-3.5" />
                  npm
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tab Toggle ── */}
        <div className="flex gap-1 mt-7 mb-6 p-1 rounded-lg bg-slate-900 w-fit">
          {(["posts", "project"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                tab === t
                  ? "bg-slate-700 text-slate-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {t === "posts" ? <><Rss className="w-3.5 h-3.5" /> 博客文章</> : <><Terminal className="w-3.5 h-3.5" /> 开源项目</>}
            </button>
          ))}
        </div>

        {/* ── Posts Tab ── */}
        {tab === "posts" && (
          <section className="pb-16 space-y-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col gap-2.5 p-5 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-slate-100 group-hover:text-sky-400 transition-colors leading-snug text-[15px]">
                    {post.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{post.summary}</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{post.readingTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {/* Tech stack */}
            <div className="pt-8">
              <SectionLabel>技术栈</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React / Next.js", "Node.js", "FastAPI", "TanStack Query", "Tailwind CSS", "Docker", "GitHub Actions"]
                  .map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </section>
        )}

        {/* ── Project Tab ── */}
        {tab === "project" && (
          <section className="pb-16">
            {/* Header */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 mb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-sky-950 border border-sky-900 flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-100">qxun-api-generator</h2>
                  <p className="text-xs text-slate-500">Swagger 协议 → 前端类型安全接口</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                将 Swagger / OpenAPI 协议自动生成前端 TypeScript 接口文件的 CLI 工具。
                结合 TanStack Query 和错误码映射，生成 Agent 可阅读的接口协议。
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <Tag><Code2 className="w-3 h-3" />TypeScript</Tag>
                <Tag><Globe className="w-3 h-3" />OpenAPI 3.0</Tag>
                <Tag><Users className="w-3 h-3" />TanStack Query</Tag>
                <Tag><BookOpen className="w-3 h-3" />CLI</Tag>
                <Tag><Sparkles className="w-3 h-3" />AI-Agent Ready</Tag>
              </div>
              <div className="flex gap-4">
                <a href="https://www.npmjs.com/package/qxun-api-generator" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 transition-colors">
                  <Package className="w-4 h-4" />npm<ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://github.com/andy304yang/qxun-api-generator" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  <GitHubIcon className="w-4 h-4" />Source Code<ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Features */}
            <SectionLabel>核心功能</SectionLabel>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((f, i) => (
                <Card
                  key={i}
                  className={`cursor-pointer transition-all hover:border-slate-700 ${activeFeature === i ? "border-sky-800 bg-sky-950/50" : ""}`}
                  onClick={() => setActiveFeature(i)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-sky-400 flex-shrink-0">{f.icon}</div>
                    <div>
                      <h3 className="font-medium text-slate-100 text-sm mb-1">{f.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Code examples */}
            <SectionLabel>快速上手</SectionLabel>
            <div className="space-y-3">
              <Card>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">安装</p>
                <pre className="code-block">
<span className="cmt"># 全局安装</span>{"\n"}
<span className="fn">npm</span> <span className="kw">install</span> -g qxun-api-generator{"\n\n"}
<span className="cmt"># 或项目内安装</span>{"\n"}
<span className="fn">npm</span> <span className="kw">install</span> --save-dev qxun-api-generator
                </pre>
              </Card>

              <Card>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">配置 qxun.config.ts</p>
                <pre className="code-block">
<span className="kw">import</span> {"{ "}<span className="typ">defineConfig</span>{" }"} <span className="kw">from</span> <span className="str">"qxun-api-generator"</span>;{"\n\n"}
<span className="kw">export default</span> <span className="fn">defineConfig</span>{"({"}{"\n"}
{"  "}<span className="var">specUrl</span>: <span className="str">"https://api.example.com/swagger.json"</span>,{"\n"}
{"  "}<span className="var">outputDir</span>: <span className="str">"./src/api"</span>,{"\n"}
{"  "}<span className="var">errorCodes</span>: {"{ "}401: <span className="str">"Unauthorized"</span>, 403: <span className="str">"Forbidden"</span>{" },"}{"\n"}
{"})"}
                </pre>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">运行</p>
                  <pre className="code-block">
<span className="fn">npx</span> qxun-api-generator{"\n\n"}
<span className="cmt"># 输出结构</span>{"\n"}
<span className="str">src/api/</span>{"\n"}
{"  "}<span className="str">types.ts</span>   <span className="cmt">// 类型</span>{"\n"}
{"  "}<span className="str">users.ts</span>   <span className="cmt">// 用户接口</span>{"\n"}
{"  "}<span className="str">errors.ts</span>  <span className="cmt">// 错误码</span>
                  </pre>
                </Card>
                <Card>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">使用</p>
                  <pre className="code-block">
<span className="kw">import</span> {"{ "}<span className="typ">useUserList</span>{" }"}{"\n"}
{"  "}<span className="kw">from</span> <span className="str">"./api/users"</span>;{"\n\n"}
<span className="kw">const</span> {"{ "}<span className="var">data</span>{" }"} = <span className="fn">useUserList</span>{"({"}{"\n"}
{"  "}<span className="var">page</span>: 1,{"\n"}
{"  "}<span className="var">pageSize</span>: 20,{"\n"}
{"})"}
                  </pre>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-5 py-6 flex items-center justify-between">
          <p className="text-xs text-slate-700">© {new Date().getFullYear()} Saylo · Built with Next.js · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-500 transition-colors">粤ICP备2026057233号-1</a></p>
          <a href="https://github.com/andy304yang" target="_blank" rel="noopener noreferrer"
            className="text-slate-700 hover:text-slate-400 transition-colors">
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
