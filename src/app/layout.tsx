import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Noto_Sans_SC, Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--noto-sc",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "蔡言 · UXUI设计师",
  description: "蔡言个人作品集 — UXUI 设计师 / 创意开发者",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} ${geist.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
