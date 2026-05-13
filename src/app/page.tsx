"use client";

import { useState } from "react";
import {
  Github,
  Package,
  Terminal,
  Sparkles,
  Layers,
  FileCode,
  Zap,
  Shield,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Code2,
  Users,
  Cpu,
  Globe,
} from "lucide-react";

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      {children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
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
      className={`rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function CodeSnippet({ children }: { children: React.ReactNode }) {
  return <pre className="code-block overflow-x-auto">{children}</pre>;
}

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Swagger → TypeScript 类型",
      desc: "解析 OpenAPI 3.0 / Swagger 2.0 协议，自动生成完整的 TypeScript 类型定义，告别手写接口类型的繁琐与错误",
    },
    {
      icon: <FileCode className="w-5 h-5" />,
      title: "TanStack Query 集成",
      desc: "生成的接口自动封装为 TanStack Query hooks，支持缓存、自动重试、轮询、乐观更新等高级特性",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "错误码自动映射",
      desc: "配置公司内部错误码体系，生成统一的错误处理逻辑，Agent 能准确理解业务错误的语义",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Agent 可阅读的协议",
      desc: "生成的接口文档结构化程度高，LLM Agent 可快速理解接口语义，实现符合公司规范的接口调用",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "多项目快速复用",
      desc: "一次配置，各项目通用。团队无需重复定义接口，通过 npm 包分发保持协议同步",
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "高度可定制",
      desc: "模板引擎支持自定义请求拦截器、响应转换、全局错误处理等，适应不同项目的架构风格",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-slate-100">Saylo</span>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a
              href="https://github.com/andy304yang"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/qxun-api-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              npm
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Section id="hero">
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Open Source Developer
          </div>
          <h1 className="text-5xl font-bold text-slate-100 mb-4 tracking-tight">
            你好，我是 Saylo
          </h1>
          <p className="text-xl text-slate-400 mb-3 font-medium">
            全栈开发工程师
          </p>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            专注于前端工程化、API 类型安全与 AI Agent 开发。喜欢造轮子，坚信好的工具能解放生产力。
          </p>

          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <a
              href="https://github.com/andy304yang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/qxun-api-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-900 text-sm font-semibold transition-colors"
            >
              <Package className="w-4 h-4" />
              qxun-api-generator
            </a>
          </div>
        </div>

        <div className="flex justify-center pb-4">
          <a
            href="#project"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </Section>

      {/* Project: qxun-api-generator */}
      <Section id="project">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  qxun-api-generator
                </h2>
                <p className="text-sm text-slate-500">
                  Swagger 协议 → 前端类型安全接口
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-2xl">
              一款将后台 Swagger / OpenAPI 协议自动生成前端 TypeScript
              接口文件的 CLI 工具。结合 TanStack Query 错误码映射，生成
              Agent 可阅读的接口协议，让不同项目能快速复用统一的接口规范。
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Tag>
                <Code2 className="w-3 h-3" /> TypeScript
              </Tag>
              <Tag>
                <Globe className="w-3 h-3" /> OpenAPI 3.0
              </Tag>
              <Tag>
                <Users className="w-3 h-3" /> TanStack Query
              </Tag>
              <Tag>
                <BookOpen className="w-3 h-3" /> CLI Tool
              </Tag>
              <Tag>
                <Sparkles className="w-3 h-3" /> AI-Agent Ready
              </Tag>
            </div>

            <div className="flex gap-3 mt-5">
              <a
                href="https://www.npmjs.com/package/qxun-api-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 transition-colors"
              >
                <Package className="w-4 h-4" />
                npm
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/andy304yang/qxun-api-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {features.map((f, i) => (
              <Card
                key={i}
                className={`cursor-pointer transition-all ${
                  activeFeature === i
                    ? "border-sky-500/40 bg-sky-500/5"
                    : "hover:border-slate-600"
                }`}
                onClick={() => setActiveFeature(i)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-sky-400 shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-100 text-sm mb-1">
                      {f.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Code Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                1. 安装
              </h4>
              <CodeSnippet>
                <span className="comment"># 全局安装</span>
                {"\n"}
                <span className="function">npm</span>{" "}
                <span className="keyword">install</span> -g qxun-api-generator
                {"\n\n"}
                <span className="comment"># 或在项目中安装</span>
                {"\n"}
                <span className="function">npm</span>{" "}
                <span className="keyword">install</span> --save-dev qxun-api-generator
              </CodeSnippet>
            </Card>

            <Card>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                2. 配置 qxun.config.ts
              </h4>
              <CodeSnippet>
                <span className="keyword">import</span>{" "}
                {"{"}{" "}
                <span className="type">defineConfig</span>{" "}
                {"}"}{" "}
                <span className="keyword">from</span>{" "}
                <span className="string">"qxun-api-generator"</span>;
                {"\n\n"}
                <span className="keyword">export default</span>{" "}
                <span className="function">defineConfig</span>
                {"({"}
                {"\n"}  {"  "}
                <span className="variable">specUrl</span>:{" "}
                <span className="string">"https://api.example.com/swagger.json"</span>,
                {"\n"}  {"  "}
                <span className="variable">outputDir</span>:{" "}
                <span className="string">"./src/api"</span>,
                {"\n"}  {"  "}
                <span className="variable">errorCodes</span>:{" "}
                {"{"}
                {"\n"}  {"    "}
                <span className="variable">401</span>:{" "}
                <span className="string">"UnauthorizedError"</span>,
                {"\n"}  {"    "}
                <span className="variable">403</span>:{" "}
                <span className="string">"PermissionDenied"</span>,
                {"\n"}  {"    "}
                <span className="variable">500</span>: <span className="string">"ServerError"</span>,{"\n"}
                {`}`}
              </CodeSnippet>
            </Card>

            <Card className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                3. 运行生成 &amp; 使用
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <CodeSnippet>
                    <span className="comment"># 生成接口文件</span>
                    {"\n"}
                    <span className="function">npx</span> qxun-api-generator
                    {"\n\n"}
                    <span className="comment"># 输出结构</span>
                    {"\n"}
                    <span className="string">src/api/</span>
                    {"\n"}  {"  "}
                    <span className="string">types.ts      </span>
                    <span className="comment">// 类型定义</span>
                    {"\n"}  {"  "}
                    <span className="string">users.ts       </span>
                    <span className="comment">// 用户模块接口</span>
                    {"\n"}  {"  "}
                    <span className="string">products.ts    </span>
                    <span className="comment">// 商品模块接口</span>
                    {"\n"}  {"  "}
                    <span className="string">errors.ts      </span>
                    <span className="comment">// 错误码映射</span>
                  </CodeSnippet>
                </div>
                <div>
                  <CodeSnippet>
                    <span className="comment">// 自动生成的 TanStack Query hooks</span>
                    {"\n"}
                    <span className="keyword">import</span> {"{"}{" "}
                    <span className="type">useUserList</span>,{" "}
                    <span className="type">useUserDetail</span>{" "}
                    {"}"} <span className="keyword">from</span>{" "}
                    <span className="string">"./api/users"</span>;
                    {"\n\n"}
                    <span className="comment">// 组件中使用</span>
                    {"\n"}
                    <span className="keyword">const</span> {`{`} <span className="variable">data</span>, <span className="variable">isPending</span> {`}`} = <span className="function">useUserList</span>
                    ({`{`}
                    <span className="variable">page</span>: 1,
                    <span className="variable">pageSize</span>: 20,
                    {`})`}
                  </CodeSnippet>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* About / Experience */}
      <Section id="about">
        <div className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-800/50">
          <h2 className="text-2xl font-bold text-slate-100 mb-8">
            关于我
          </h2>

          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React / Next.js",
                  "Node.js / FastAPI",
                  "TanStack Query",
                  "Tailwind CSS",
                  "Docker",
                  "腾讯云",
                  "GitHub Actions",
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                开源项目
              </h3>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      qxun-api-generator
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Swagger → TypeScript + TanStack Query 代码生成器
                    </p>
                  </div>
                  <a
                    href="https://www.npmjs.com/package/qxun-api-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:text-sky-300 shrink-0 flex items-center gap-1"
                  >
                    <Package className="w-3.5 h-3.5" />
                    npm
                  </a>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      Dream
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      AI 驱动的 Excel 智能处理平台（Next.js + FastAPI）
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">
                    Private
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                个人理念
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                坚信好的开发工具能解放生产力。喜欢从实际业务中抽象通用解，
                热衷于造轮子、写 CLI 工具、搞前端工程化。相信类型安全是最好的文档，
                而 AI Agent 的能力取决于给它多少结构化的上下文。
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* GitHub CTA */}
      <Section id="github">
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <Card className="text-center py-12">
            <Github className="w-10 h-10 text-slate-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-100 mb-2">
              欢迎来 GitHub 看看
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
              如果 qxun-api-generator 对你有帮助，欢迎 star。
              有问题也可以提 Issue。
            </p>
            <a
              href="https://github.com/andy304yang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              github.com/andy304yang
            </a>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Saylo · Built with Next.js · Hosted on{" "}
            <a
              href="https://cloud.tencent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              腾讯云
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
