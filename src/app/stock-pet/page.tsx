import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  Bell,
  Bug,
  Check,
  ExternalLink,
  Github,
  Heart,
  LineChart,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";

const RELEASE_URL = "https://github.com/andy304yang/Pet-stock/releases/download/v0.4.1/StockPet-v0.4.1.dmg";
const REPOSITORY_URL = "https://github.com/andy304yang/Pet-stock";

export const metadata: Metadata = {
  title: "持仓宠物 — 会看盘、懂情绪的 macOS 桌宠",
  description:
    "把持仓收益、当日分时、实时资讯和桌面宠物放在一起。涨了替你庆祝，跌了陪你难过，随时用小窗偷看股票。",
  keywords: ["持仓宠物", "macOS 桌宠", "股票工具", "ETF", "分时行情", "SwiftUI"],
  alternates: { canonical: "/stock-pet" },
  openGraph: {
    title: "持仓宠物 — 让一只宠物替你盯盘",
    description: "小窗看分时，宠物看收益，重要资讯实时提醒。",
    url: "/stock-pet",
    images: [{ url: "/stock-pet/landing/portfolio-dashboard.webp", width: 1820, height: 1282 }],
  },
};

function MascotMark() {
  return (
    <span className={styles.mascotMark} aria-hidden="true">
      <i />
      <i />
      <b />
    </span>
  );
}

function SparkLine({ variant = "up" }: { variant?: "up" | "soft" | "down" }) {
  const paths = {
    up: "M2 45 L13 42 L22 44 L31 35 L42 38 L52 29 L64 32 L74 21 L84 24 L95 11 L108 16 L120 4",
    soft: "M2 31 L13 27 L25 34 L37 25 L49 32 L61 30 L73 39 L84 35 L96 26 L108 29 L120 20",
    down: "M2 12 L14 16 L25 10 L37 25 L49 21 L61 33 L73 29 L85 43 L97 36 L108 47 L120 41",
  };

  return (
    <svg className={styles.sparkLine} viewBox="0 0 122 52" role="img" aria-label="当日分时曲线">
      <path className={styles.sparkGuide} d="M1 29 H121" />
      <path className={styles.sparkPath} pathLength="1" d={paths[variant]} />
      <circle cx={variant === "down" ? 120 : 120} cy={variant === "up" ? 4 : variant === "soft" ? 20 : 41} r="3.5" />
    </svg>
  );
}

export default function StockPetLandingPage() {
  return (
    <main className={styles.site}>
      <header className={styles.navShell}>
        <Link className={styles.brand} href="/stock-pet" aria-label="持仓宠物首页">
          <MascotMark />
          <span>持仓宠物</span>
          <small>STOCK PET</small>
        </Link>
        <nav className={styles.navLinks} aria-label="产品导航">
          <a href="#features">功能</a>
          <a href="#emotion">宠物</a>
          <a href="#debug">自定义</a>
          <a href="#download">下载</a>
        </nav>
        <a className={styles.navDownload} href={RELEASE_URL}>
          <ArrowDownToLine aria-hidden="true" />
          <span>下载 macOS 版</span>
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.liveDot} />
            macOS 桌面行情陪伴 · v0.4.1
          </div>
          <h1>
            不必一直盯盘。
            <span>让宠物替你看。</span>
          </h1>
          <p>
            小窗看当日分时，宠物读懂你的实时收益。涨了替你庆祝，跌了陪你难过，重要消息第一时间提醒。
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={RELEASE_URL}>
              <ArrowDownToLine aria-hidden="true" />
              免费下载 v0.4.1
              <span>Apple Silicon</span>
            </a>
            <a className={styles.ghostButton} href={REPOSITORY_URL} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              GitHub 源码
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
          <div className={styles.trustRow}>
            <span><Check />开源</span>
            <span><Check />数据仅保存在本机</span>
            <span><Check />macOS 15+</span>
          </div>
        </div>

        <div className={styles.heroProduct} aria-label="持仓宠物主界面展示">
          <div className={styles.productHalo} aria-hidden="true" />
          <div className={styles.windowFrame}>
            <div className={styles.windowTopbar}>
              <div><span /><span /><span /></div>
              <b>持仓行情</b>
              <small>每 2 秒刷新</small>
            </div>
            <Image
              src="/stock-pet/landing/portfolio-dashboard.webp"
              alt="持仓宠物完整行情面板，展示指数、持仓市值、收益和当日分时曲线"
              width={1820}
              height={1282}
              priority
            />
          </div>
          <div className={`${styles.floatingCard} ${styles.profitCard}`}>
            <span>今日收益</span>
            <strong>+1.13%</strong>
            <SparkLine />
          </div>
          <div className={`${styles.floatingCard} ${styles.refreshCard}`}>
            <RefreshCw />
            <div><strong>行情已更新</strong><span>刚刚</span></div>
          </div>
        </div>

        <div className={styles.heroTicker} aria-label="产品能力">
          <span>当日分时</span><i />
          <span>收益情绪</span><i />
          <span>实时通知</span><i />
          <span>宠物自定义</span><i />
          <span>小窗置顶</span>
        </div>
      </section>

      <section id="features" className={styles.introSection}>
        <div className={styles.sectionHeading}>
          <p>01 / GLANCEABLE MARKET</p>
          <h2>该知道的行情，<em>一眼就够。</em></h2>
          <span>把“看一眼”和“认真看盘”拆成两种状态。忙的时候只留一扇小窗，需要时再展开完整持仓。</span>
        </div>

        <div className={styles.glanceGrid}>
          <article className={styles.compactFeature}>
            <div className={styles.featureNumber}>01</div>
            <div className={styles.featureCopy}>
              <div className={styles.iconChip}><LineChart /></div>
              <p>小窗偷看</p>
              <h3>每只股票的当日分时，始终在手边。</h3>
              <span>窗口可以缩得很小并保持置顶，继续显示股票名称、持仓总值、收益率和实时分时曲线。</span>
              <ul>
                <li><Check />四角等比缩放</li>
                <li><Check />记住上次窗口大小</li>
                <li><Check />股票与 ETF 都支持</li>
              </ul>
            </div>
            <div className={styles.compactVisual}>
              <div className={styles.compactGlow} />
              <Image
                src="/stock-pet/landing/compact-market.webp"
                alt="持仓宠物小窗模式，显示当日收益和股票分时曲线"
                width={680}
                height={600}
              />
              <div className={styles.miniQuote}>
                <span>纳指科技 ETF</span>
                <SparkLine variant="soft" />
                <strong>+1.89%</strong>
              </div>
            </div>
          </article>

          <article className={styles.fullPanelFeature}>
            <div>
              <span className={styles.featureNumber}>02</span>
              <p>完整面板</p>
              <h3>从指数到持仓，不离开桌面。</h3>
              <span>主要指数、总市值、今日收益和每只股票的分时曲线集中展示，支持搜索名称、证券代码和拼音首字母。</span>
            </div>
            <div className={styles.marketStats}>
              <div><small>持仓总值</small><strong>¥28.00万</strong></div>
              <div><small>今日收益</small><strong>+1.13%</strong></div>
              <SparkLine />
            </div>
          </article>
        </div>
      </section>

      <section id="emotion" className={styles.emotionSection}>
        <div className={styles.emotionBackdrop} aria-hidden="true">+1.13%</div>
        <div className={styles.emotionVisual}>
          <div className={styles.petStage}>
            <span className={styles.petOrbit} />
            <Image
              src="/stock-pet/landing/pet-profit.webp"
              alt="盈利时开心庆祝的水豚宠物"
              width={320}
              height={350}
            />
          </div>
          <div className={styles.emotionScale}>
            <span>悲伤</span>
            <div><i /><i /><i /><i /><b /></div>
            <span>庆祝</span>
          </div>
        </div>
        <div className={styles.emotionCopy}>
          <p>02 / PROFIT HAS EMOTION</p>
          <h2>数字会波动，<br /><em>陪伴一直在。</em></h2>
          <span>
            宠物会根据你的实时收益切换表情、体型和动作。小涨微笑，大涨跳跃庆祝；亏损时委屈、缩小，但不让焦虑占满整个桌面。
          </span>
          <div className={styles.emotionRules}>
            <div><b>±1%</b><span>安静陪伴</span></div>
            <div><b>&gt; 2%</b><span>明显开心</span></div>
            <div><b>&gt; 5%</b><span>高强度庆祝</span></div>
          </div>
        </div>
      </section>

      <section id="debug" className={styles.customSection}>
        <div className={styles.sectionHeading}>
          <p>03 / MAKE IT YOURS</p>
          <h2>不只一只宠物，<em>也不只一种情绪。</em></h2>
          <span>选择喜欢的角色，再用独立调试面板预览每档收益下的表情、尺寸、动作和播放速度。</span>
        </div>

        <div className={styles.customGrid}>
          <div className={styles.debugPreview}>
            <div className={styles.debugChrome}>
              <span /><span /><span />
              <b>宠物调试</b>
            </div>
            <Image
              src="/stock-pet/landing/pet-debug.webp"
              alt="持仓宠物自定义和素材调试窗口"
              width={924}
              height={1900}
            />
          </div>
          <div className={styles.customCopy}>
            <div className={styles.customCard}>
              <div className={styles.iconChip}><Heart /></div>
              <span>宠物商城</span>
              <h3>换一只更像你的桌面搭子。</h3>
              <p>原创行情机器人与多款高清动画皮肤共用同一套收益状态系统。</p>
            </div>
            <div className={styles.customCard}>
              <div className={styles.iconChip}><Bug /></div>
              <span>独立调试</span>
              <h3>先预览，再放到桌面。</h3>
              <p>拖动收益率、调节播放速度、触发动作，不覆盖真实持仓数据。</p>
            </div>
            <div className={styles.stateStrip}>
              <div><span>-5.00%</span><SparkLine variant="down" /></div>
              <div><span>0.00%</span><SparkLine variant="soft" /></div>
              <div className={styles.activeState}><span>+5.00%</span><SparkLine /></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.notifySection}>
        <div className={styles.notifyCopy}>
          <p>04 / NEVER MISS THE SIGNAL</p>
          <h2>消息到了，<br /><em>它先告诉你。</em></h2>
          <span>
            持仓热门资讯按分钟自动刷新。应用即使保持在桌宠状态，也会更新未读数量，并通过 macOS 原生通知显示来源、标题和对应股票。
          </span>
          <div className={styles.notifyPoints}>
            <span><Bell />原生通知</span>
            <span><RefreshCw />每分钟刷新</span>
            <span><ShieldCheck />只关注你的持仓</span>
          </div>
        </div>
        <div className={styles.notifyVisual}>
          <div className={styles.notificationCard}>
            <MascotMark />
            <div>
              <span>腾讯控股 · 热门资讯</span>
              <strong>腾讯混元上线一周，模型调用量持续增长</strong>
              <small>刚刚 · 持仓宠物</small>
            </div>
          </div>
          <div className={styles.newsWindow}>
            <Image
              src="/stock-pet/news-popover.jpg"
              alt="持仓热门资讯列表"
              width={510}
              height={528}
            />
          </div>
          <span className={styles.bellBadge}><Bell />3</span>
        </div>
      </section>

      <section id="download" className={styles.downloadSection}>
        <div className={styles.downloadOrb} aria-hidden="true"><MascotMark /></div>
        <p><Sparkles />STOCK PET FOR MAC</p>
        <h2>让今天的涨跌，<br />变成桌面上的一点情绪。</h2>
        <span>开源、轻量、数据留在本机。现在下载持仓宠物 v0.4.1。</span>
        <div className={styles.downloadActions}>
          <a className={styles.primaryButton} href={RELEASE_URL}>
            <ArrowDownToLine />下载 macOS 安装包
            <ArrowRight />
          </a>
          <a className={styles.ghostButton} href={REPOSITORY_URL} target="_blank" rel="noreferrer">
            <Github />查看 GitHub
          </a>
        </div>
        <small>需要 macOS 15.0 或更高版本 · Apple Silicon · 本项目不构成投资建议</small>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/">
          <MascotMark />
          <span>持仓宠物</span>
        </Link>
        <p>Designed &amp; built by Andy Yang · Shenzhen · 2026</p>
        <div>
          <Link href="/">返回 Andy 的主页</Link>
          <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
