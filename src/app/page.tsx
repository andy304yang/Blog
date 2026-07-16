"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { posts } from "@/lib/posts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Github,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const experiences = [
  {
    period: "2022.07 — 2026.02",
    title: "元象唯思控股（深圳）有限公司",
    role: "前端开发工程师 · SAYLO AI / XVERSE",
    copy: "从 0 到 1 参与 Saylo AI，覆盖 React Native App、Next.js 官网、流式对话、音视频、AIGC 内容与支付商业化；同时建设类型安全接口生成、Storybook 组件资产和 Agent 自动化交付链路。",
  },
];

const strengths = [
  { title: "qxun-api-generator", mark: "01 / NPM", copy: "我发布的 npm 工具，把 Swagger / OpenAPI 协议生成类型安全的 TypeScript 接口文件。" },
  { title: "Swagger → Types", mark: "02 / OPENAPI", copy: "解析接口定义、数据模型与错误码，让前后端和 Agent 使用同一份协议。" },
  { title: "TanStack Query", mark: "03 / HOOKS", copy: "在生成链路中补齐 Query / Mutation Hooks，减少重复封装与联调成本。" },
  { title: "Agent Skill", mark: "04 / AI DX", copy: "把内部接口规范生成 Agent 可读的 Skill，让 Codex 能按团队规范直接实现业务。" },
];

const SAYLO_GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.xverse.aistory";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "blog">("portfolio");
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal([activeTab]);

  const openSection = (id: string) => {
    setActiveTab("portfolio");
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const openBlog = () => {
    setActiveTab("blog");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="portfolio-site">
      <header className="nav-pill">
        <button className="brand-mark" type="button" onClick={() => openSection("home")} aria-label="返回作品集首页">
          AY<span>©26</span>
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="主导航">
          <button type="button" onClick={() => openSection("about")}>介绍</button>
          <button type="button" onClick={() => openSection("projects")}>项目</button>
          <button type="button" onClick={() => openSection("experience")}>经历</button>
          <button
            id="blog-tab"
            type="button"
            className={activeTab === "blog" ? "is-active" : ""}
            onClick={openBlog}
            aria-selected={activeTab === "blog"}
          >
            博客
          </button>
          <button type="button" onClick={() => openSection("contact")}>联系我</button>
        </nav>
        <a className="github-pill" href="https://github.com/andy304yang" target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /> GitHub
        </a>
        <button className="menu-button" type="button" aria-label="切换导航" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {activeTab === "portfolio" ? (
        <div className="portfolio-view">
          <section id="home" className="hero-stage">
            <div className="hero-frame">
              <video className="hero-video" autoPlay muted loop playsInline poster="/andy-room-tv-poster.jpg">
                <source src="/andy-room-tv-loop.mp4?v=portfolio-v1" type="video/mp4" />
              </video>
              <div className="hero-noise" aria-hidden="true" />
              <div className="hero-bottom-mask" aria-hidden="true" />
              <div className="hero-content">
                <div className="hero-title-block">
                  <h1 aria-label="Andy">
                    <span>Andy</span><i aria-hidden="true" />
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="section about-section reveal-block" data-reveal>
            <div className="about-card">
              <div className="retro-tabs" aria-hidden="true">
                <span>介绍</span><span>项目</span><span>经历</span><span>博客</span><span>联系我</span><b>07/2026 · SHENZHEN</b>
              </div>
              <div className="about-layout">
                <div className="about-copy">
                  <p className="section-label">01 / ABOUT</p>
                  <h2>about <em>me!</em></h2>
                  <h3>Hello! 我是 Andy.</h3>
                  <p className="about-intro">
                    全栈开发工程师、AI 产品构建者与开源工具作者。专注前端工程化、类型安全、AI Agent 和从 0 到 1 的产品落地。
                    我喜欢把复杂问题拆成清晰路径，再把它做成真正有人使用的东西。
                  </p>
                  <div className="focus-block">
                    <span>FOCUS</span>
                    <strong>AI × PRODUCT × ENGINEERING</strong>
                    <small>Shenzhen / Remote collaboration</small>
                  </div>
                  <div className="metric-grid">
                    <div><strong>10M+</strong><span>产品累计下载</span></div>
                    <div><strong>0→1</strong><span>完整产品落地</span></div>
                    <div><strong>AI</strong><span>Agent 与模型应用</span></div>
                    <div><strong>OSS</strong><span>开源工具维护</span></div>
                  </div>
                </div>
                <div className="about-media">
                  <div className="retro-window portrait-window reveal-block" data-reveal>
                    <div className="window-bar"><span>MEET-ANDY.EXE</span><b>×</b></div>
                    <Image src="/andy.jpeg" alt="Andy Yang" width={680} height={820} priority />
                  </div>
                  <div className="retro-window socials-window reveal-block" data-reveal>
                    <div className="window-bar"><span>SOCIALS</span><b>×</b></div>
                    <a href="mailto:andy304yang@gmail.com"><Mail />andy304yang@gmail.com</a>
                    <a href="https://github.com/andy304yang" target="_blank" rel="noreferrer"><Github />github.com/andy304yang</a>
                    <span><MapPin />Shenzhen / Remote</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="section projects-section">
            <div className="section-shell">
              <div className="split-title projects-title reveal-block" data-reveal data-reveal-threshold="0.2">
                <span>看看我做了</span><em>什么</em>
              </div>

              <article className="saylo-case reveal-block" data-reveal data-reveal-threshold="0.16">
                <div className="case-heading">
                  <div>
                    <p>01 / FLAGSHIP PRODUCT</p>
                    <h3>Saylo AI</h3>
                    <span>AI 角色扮演、互动剧情、故事视频与漫画生成的一体化内容产品。</span>
                  </div>
                </div>

                <div className="saylo-overview reveal-block" data-reveal style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
                  <Image src="/saylo-product-overview.png" alt="Saylo AI 产品介绍与全球发布数据" width={1080} height={607} />
                  <a className="saylo-overview-link" href="https://sayloai.com" target="_blank" rel="noreferrer" aria-label="打开 Saylo 官网">
                    查看官网 <ArrowUpRight />
                  </a>
                </div>

                <div className="saylo-metrics" aria-label="Saylo 产品数据">
                  <div className="reveal-block" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}><strong>10M+</strong><span>全平台累计下载</span></div>
                  <div className="reveal-block" data-reveal style={{ "--reveal-delay": "260ms" } as React.CSSProperties}><strong>5M+</strong><span>Google Play 下载</span></div>
                  <div className="reveal-block" data-reveal style={{ "--reveal-delay": "360ms" } as React.CSSProperties}><strong>4.4 ★</strong><span>6 万+ 用户评价</span></div>
                  <div className="reveal-block" data-reveal style={{ "--reveal-delay": "460ms" } as React.CSSProperties}><strong>2025</strong><span>中国 AI 年度产品</span></div>
                </div>

                <div className="saylo-gallery">
                  <figure className="saylo-award reveal-block" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                    <Image src="/saylo-award-2025.png" alt="Saylo 入选 2025 中国 AI 年度产品榜单" width={1080} height={467} />
                    <figcaption>2025 中国 AI 年度产品 · AI 产品榜</figcaption>
                  </figure>
                  <a className="saylo-gallery-link reveal-block" data-reveal style={{ "--reveal-delay": "260ms" } as React.CSSProperties} href={SAYLO_GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" aria-label="在 Google Play 查看 Saylo Anime Drama">
                    <figure className="saylo-tall">
                      <Image src="/saylo-anime-drama.png" alt="Saylo Anime Drama 产品界面" width={1329} height={2880} />
                      <figcaption>Anime Drama · Google Play ↗</figcaption>
                    </figure>
                  </a>
                  <a className="saylo-gallery-link reveal-block" data-reveal style={{ "--reveal-delay": "400ms" } as React.CSSProperties} href={SAYLO_GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" aria-label="在 Google Play 查看 Saylo 故事视频与漫画功能">
                    <figure className="saylo-tall">
                      <Image src="/saylo-story-comics.png" alt="Saylo 故事视频与漫画生成功能" width={460} height={995} />
                      <figcaption>Story Videos & Comics · Google Play ↗</figcaption>
                    </figure>
                  </a>
                </div>

                <div className="case-notes reveal-block" data-reveal>
                  <p>我参与的部分</p>
                  <div>
                    <span>React Native App</span><span>Next.js 官网</span><span>SSE 流式对话</span>
                    <span>音视频与 TTS 缓存</span><span>支付商业化</span><span>Agent 工程化</span>
                  </div>
                </div>
              </article>

              <article className="metaverse-case reveal-block" data-reveal data-reveal-threshold="0.16">
                <div className="metaverse-copy">
                  <p>02 / XVERSE METAVERSE</p>
                  <h3>元宇宙互动内容</h3>
                  <span>围绕沉浸式 VR 空间互动影院、AIGC 视觉内容与跨端体验，参与把实时互动能力带进线下展会与大众传播场景。</span>
                  <div className="case-tags"><b>VR SPACE</b><b>AIGC</b><b>INTERACTIVE WEB</b><b>CROSS-PLATFORM</b></div>
                </div>
                <div className="metaverse-image reveal-block" data-reveal style={{ "--reveal-delay": "260ms" } as React.CSSProperties}>
                  <Image src="/xverse-metaverse-cctv.png" alt="元象元宇宙互动项目多次登上央视报道" width={1000} height={1141} />
                </div>
              </article>

              <article className="stock-pet-case reveal-block" data-reveal data-reveal-threshold="0.16">
                <div className="stock-pet-copy">
                  <p>03 / PERSONAL PRODUCT</p>
                  <h3>持仓宠物</h3>
                  <span>一只住在 macOS 桌面、会随着持仓收益率切换情绪和动作的股票桌宠。把数字波动变成有反馈、有陪伴感的桌面体验。</span>
                  <div className="case-tags">
                    <b>SWIFTUI</b><b>MACOS</b><b>LIVE MARKET</b><b>FRAME ANIMATION</b>
                  </div>
                  <div className="stock-pet-actions">
                    <Link href="/blog/stock-pet-desktop-companion">阅读开发总结 <ArrowRight /></Link>
                    <a href="https://github.com/andy304yang/Pet-stock/releases/tag/v0.3.3" target="_blank" rel="noreferrer">下载 macOS 版 <ArrowUpRight /></a>
                  </div>
                </div>
                <div className="stock-pet-media">
                  <Image className="stock-pet-dashboard" src="/stock-pet/dashboard.jpg" alt="持仓宠物的行情与持仓主面板" width={980} height={700} />
                  <div className="stock-pet-side-shots">
                    <Image src="/stock-pet/debug-bear.jpg" alt="红绿北极熊在下跌收益率下的调试状态" width={420} height={652} />
                    <Image src="/stock-pet/pet-store.jpg" alt="持仓宠物商城与多款动画宠物" width={440} height={560} />
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section id="experience" className="section experience-section">
            <div className="section-shell">
              <div className="split-title reveal-block" data-reveal><span>我的工作</span><em>经历</em></div>
              <div className="timeline">
                {experiences.map((item, index) => (
                  <article
                    key={item.title}
                    className="timeline-item reveal-block"
                    data-reveal
                    style={{ "--reveal-delay": `${index * 180}ms` } as React.CSSProperties}
                  >
                    <div className="timeline-number">0{index + 1}</div>
                    <div className="timeline-company">
                      <span>{item.period}</span>
                      <h3>{item.title}</h3>
                      <p>{item.role}</p>
                    </div>
                    <p className="timeline-copy">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="strengths-section">
            <div className="strengths-board">
              <div className="split-title reveal-block" data-reveal><span>我的开源</span><em>工程工具</em></div>
              <div className="strength-grid">
                {strengths.map((item, index) => (
                  <article
                    key={item.title}
                    className="reveal-block"
                    data-reveal
                    style={{ "--card-index": index, "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  >
                    <span>{item.mark}</span><h3>{item.title}</h3><p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="contact-copy reveal-block" data-reveal>
              <p>INQUIRIES</p>
              <h2>一起做更好玩的 <em>东西</em></h2>
              <span>如果你正在构建 AI 产品、开发者工具或复杂的跨端体验，欢迎来聊聊。</span>
              <div className="contact-actions">
                <a className="portfolio-button" href="mailto:andy304yang@gmail.com">发送邮件 <span><ArrowRight /></span></a>
                <a className="portfolio-button" href="https://github.com/andy304yang" target="_blank" rel="noreferrer">查看 GitHub <span><ArrowUpRight /></span></a>
              </div>
            </div>
            <footer><span>ANDY YANG · FULL-STACK ENGINEER</span><span>© 2026 · SHENZHEN</span></footer>
          </section>
        </div>
      ) : (
        <section className="blog-view" aria-labelledby="blog-title">
          <div className="blog-hero reveal-block" data-reveal>
            <button type="button" onClick={() => openSection("home")}><ArrowLeft /> 返回作品集</button>
            <p>NOTES · DOCUMENTS · ENGINEERING</p>
            <h1 id="blog-title"><span>Blog</span><em>notes</em></h1>
            <small>记录 AI 产品、前端工程、React Native 和自动化工作流。</small>
          </div>
          <div className="blog-list">
            {posts.map((post, index) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="post-row reveal-block"
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index, 4) * 70}ms` } as React.CSSProperties}
              >
                <span className="post-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="post-copy">
                  <p>{post.tags.slice(0, 3).join(" · ")}</p>
                  <h2>{post.title}</h2>
                  <span>{post.summary}</span>
                </div>
                <div className="post-meta">
                  <time>{post.date}</time><small>{post.readingTime}</small><ArrowUpRight />
                </div>
              </Link>
            ))}
          </div>
          <div className="blog-foot reveal-block" data-reveal><BookOpen /><span>{posts.length} 篇公开文档，持续更新中。</span></div>
        </section>
      )}
    </main>
  );
}
