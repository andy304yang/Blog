import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://mclarenai.cn";
const SITE_NAME = "Saylo - 全栈开发工程师";
const SITE_DESCRIPTION = "全栈开发工程师，专注于前端工程化、API 类型安全与 AI Agent 开发。造轮子，热爱开源。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["全栈开发", "前端工程化", "TypeScript", "API 类型安全", "AI Agent", "Saylo"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
