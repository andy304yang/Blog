import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  BellRing,
  Bug,
  Check,
  ExternalLink,
  Github,
  LineChart,
  MonitorUp,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import StockPetMotion from "./StockPetMotion";
import LiveStockPet from "./LiveStockPet";
import styles from "./page.module.css";

const RELEASE_URL =
  "https://github.com/andy304yang/Pet-stock/releases/download/v0.4.1/StockPet-v0.4.1.dmg";
const REPOSITORY_URL = "https://github.com/andy304yang/Pet-stock";

export const metadata: Metadata = {
  title: "持仓宠物 — 让今天的收益有一点情绪",
  description:
    "一款免费的 macOS 桌面持仓工具。宠物会根据实时收益开心、膨胀、哭泣或缩小，还能查看当日分时、调试宠物素材并接收持仓资讯和异动提醒。",
  keywords: ["持仓宠物", "macOS 桌宠", "股票工具", "ETF", "分时行情", "免费软件"],
  alternates: { canonical: "/stock-pet" },
  openGraph: {
    title: "持仓宠物 — 让今天的收益有一点情绪",
    description: "实时收益变成宠物情绪，持仓行情与重要提醒留在桌面。全部功能免费。",
    url: "/stock-pet",
    images: [{ url: "/stock-pet/landing/portfolio-live.png", width: 1788, height: 1178 }],
  },
};

function Brand() {
  return (
    <span className={styles.brandInner}>
      <Image src="/stock-pet/app-icon.png" alt="" width={40} height={40} priority />
      <span>
        <b>持仓宠物</b>
        <small>STOCK PET</small>
      </span>
    </span>
  );
}

function SectionTitle({
  index,
  label,
  title,
  accent,
  description,
}: {
  index: string;
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div className={`${styles.sectionTitle} reveal-block`} data-reveal>
      <p>{index} / {label}</p>
      <h2>{title}<em>{accent}</em></h2>
      <span>{description}</span>
    </div>
  );
}

export default function StockPetLandingPage() {
  return (
    <main className={styles.site}>
      <StockPetMotion />
      <header className={styles.navShell}>
        <Link className={styles.brand} href="/stock-pet" aria-label="持仓宠物首页">
          <Brand />
        </Link>
        <nav className={styles.navLinks} aria-label="产品介绍导航">
          <a href="#emotion">宠物情绪</a>
          <a href="#market">持仓行情</a>
          <a href="#custom">自由调试</a>
          <a href="#alerts">资讯提醒</a>
        </nav>
        <a className={styles.navDownload} href={RELEASE_URL}>
          <ArrowDownToLine aria-hidden="true" />
          <span>免费下载</span>
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroLead}>
            <div className={styles.freeTag}><Sparkles />macOS 桌面持仓陪伴</div>
            <h1>一只会看收益的桌宠。<span>现在，全部免费。</span></h1>
          </div>
          <div className={styles.heroDetails}>
            <p>
              持仓宠物把冰冷的涨跌变成桌面上的陪伴。赚了，它替你开心、跳跃、慢慢膨胀；亏了，它会哭泣、变小，安静陪你度过波动。
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={RELEASE_URL}>
                <ArrowDownToLine />免费下载 v0.4.1
                <span>Apple Silicon</span>
              </a>
              <a className={styles.secondaryButton} href="#market">
                <Play />查看产品功能
              </a>
            </div>
            <div className={styles.trustRow}>
              <span><Check />所有功能免费</span>
              <span><Check />开源</span>
              <span><Check />数据保存在本机</span>
            </div>
          </div>
        </div>

        <div id="hero-emotions" className={styles.heroEmotionCards} aria-label="宠物会随收益变化表情、动作和体型">
          <article className={styles.heroEmotionCard}>
            <div className={styles.storyCopy}>
              <span className={styles.profitDot} />
              <small>收益上涨</small>
              <h2>从微笑，到开心得装不下。</h2>
              <p>小涨时轻轻微笑，涨幅越大，跳动和漂浮越明显；大涨时宠物会膨胀、庆祝，分享你的快乐。</p>
            </div>
            <LiveStockPet rate={0.05} />
          </article>
          <article className={styles.heroEmotionCard}>
            <div className={styles.storyCopy}>
              <span className={styles.lossDot} />
              <small>收益下跌</small>
              <h2>会难过，也会安静地陪你。</h2>
              <p>亏损时宠物会垂下眼睛、哭泣并变小。它不会制造更多焦虑，只把情绪留在一个柔软的角落。</p>
            </div>
            <LiveStockPet rate={-4.2} />
          </article>
        </div>
      </section>

      <section id="emotion" className={styles.emotionSection}>
        <SectionTitle
          index="01"
          label="PROFIT BECOMES EMOTION"
          title="它不预测涨跌，"
          accent="它懂你的心情。"
          description="宠物直接读取持仓的今日总收益率，用表情、动作和体型告诉你此刻发生了什么。无需打开行情页，抬眼就能知道今天过得怎么样。"
        />

        <div className={`${styles.emotionSteps} reveal-block`} data-reveal aria-label="收益对应宠物状态">
          <div><b>±1%</b><span>平静陪伴</span></div>
          <div><b>&gt; 1%</b><span>开始微笑</span></div>
          <div><b>&gt; 2%</b><span>明显开心</span></div>
          <div><b>&gt; 5%</b><span>强烈庆祝</span></div>
          <div><b>&lt; 0%</b><span>难过变小</span></div>
        </div>
      </section>

      <section id="market" className={styles.marketSection}>
        <SectionTitle
          index="02"
          label="YOUR PORTFOLIO AT A GLANCE"
          title="不打开交易软件，"
          accent="也能看清今天。"
          description="持仓总市值、今日收益、主要指数和每只股票的当日分时都集中在一个窗口。它可以缩成桌面小窗，也可以展开认真查看。"
        />

        <div className={`${styles.dashboardFrame} reveal-block`} data-reveal>
          <div className={styles.frameTop}>
            <span><LineChart />持仓行情</span>
            <small>真实运行界面 · 行情自动刷新</small>
          </div>
          <Image
            src="/stock-pet/landing/portfolio-live.png"
            alt="持仓宠物行情主页面真实截图，展示持仓总市值、今日收益率、指数和每只股票的当日分时"
            width={1788}
            height={1178}
          />
        </div>

        <div className={`${styles.marketBenefits} reveal-block`} data-reveal>
          <div><MonitorUp /><b>小窗偷看</b><span>窗口可缩放、置顶，并记住上一次大小。</span></div>
          <div><LineChart /><b>当日分时</b><span>股票、ETF 与主要指数走势一眼看清。</span></div>
          <div><ShieldCheck /><b>数据留在本机</b><span>持仓配置不上传到我们的服务器。</span></div>
        </div>
      </section>

      <section id="custom" className={styles.customSection}>
        <div className={`${styles.customCopy} reveal-block`} data-reveal>
          <p>03 / MAKE IT YOURS</p>
          <h2>换一只喜欢的，<em>再亲手调出它的情绪。</em></h2>
          <span>
            从宠物素材库选择桌面搭子，再进入独立调试面板。你可以输入任意收益率、改变动画速度、播放动作，先看效果，再回到真实持仓。
          </span>
          <div className={styles.customPoints}>
            <span><Check />自由选择宠物素材</span>
            <span><Check />预览不同收益状态</span>
            <span><Check />调节动画播放速度</span>
            <span><Check />调试不影响真实数据</span>
          </div>
        </div>
        <div className={`${styles.debugShot} reveal-block`} data-reveal>
          <div className={styles.frameTop}>
            <span><Bug />宠物调试</span>
            <small>真实运行界面</small>
          </div>
          <Image
            src="/stock-pet/landing/pet-debug-live.png"
            alt="宠物素材选择和动画调试面板真实截图"
            width={1336}
            height={1554}
          />
        </div>
      </section>

      <section id="alerts" className={styles.alertSection}>
        <SectionTitle
          index="04"
          label="TIMELY PORTFOLIO ALERTS"
          title="重要变化发生时，"
          accent="不用等你想起来看。"
          description="通知栏会聚合当前持仓的热门资讯，也会在收益或持仓出现值得关注的变化时主动提醒。内容与持仓相关，不用在信息流里反复筛选。"
        />

        <div className={styles.alertGrid}>
          <article className={`${styles.alertCard} reveal-block`} data-reveal>
            <div>
              <BellRing />
              <span>持仓热门资讯</span>
              <h3>只看与你有关的财经热点。</h3>
              <p>根据当前持仓聚合热门资讯，显示来源、标题与相关股票。</p>
            </div>
            <Image
              src="/stock-pet/landing/notification-news-live.png"
              alt="持仓热门资讯 macOS 原生通知真实截图"
              width={710}
              height={168}
            />
          </article>
          <article className={`${styles.alertCard} reveal-block`} data-reveal>
            <div>
              <Zap />
              <span>持仓异动提醒</span>
              <h3>涨跌达到状态时，宠物也会告诉你。</h3>
              <p>收益变化触发原生通知，同时同步宠物此刻的情绪状态。</p>
            </div>
            <Image
              src="/stock-pet/landing/notification-profit-live.png"
              alt="持仓收益异动 macOS 原生通知真实截图"
              width={704}
              height={132}
            />
          </article>
        </div>
      </section>

      <section id="download" className={`${styles.downloadSection} reveal-block`} data-reveal>
        <Image src="/stock-pet/app-icon.png" alt="持仓宠物应用图标" width={108} height={108} />
        <p><Sparkles />NO SUBSCRIPTION · NO PAYWALL</p>
        <h2>以上这些，<br /><span>现在全部免费。</span></h2>
        <p className={styles.downloadIntro}>
          宠物情绪、实时收益、当日分时、素材调试、持仓资讯与异动通知，没有订阅，也没有隐藏付费功能。
        </p>
        <div className={styles.freeChecklist}>
          <span><Check />免费使用</span>
          <span><Check />GitHub 开源</span>
          <span><Check />本地保存</span>
          <span><Check />持续更新</span>
        </div>
        <div className={styles.downloadActions}>
          <a className={styles.primaryButton} href={RELEASE_URL}>
            <ArrowDownToLine />下载 macOS 安装包<ArrowRight />
          </a>
          <a className={styles.secondaryButton} href={REPOSITORY_URL} target="_blank" rel="noreferrer">
            <Github />查看 GitHub<ExternalLink />
          </a>
        </div>
        <small>需要 macOS 15.0 或更高版本 · Apple Silicon · 页面素材均为真实产品截图 · 本项目不构成投资建议</small>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/"><Brand /></Link>
        <p>Designed &amp; built by Andy Yang · 2026</p>
        <div>
          <Link href="/">返回主页</Link>
          <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
