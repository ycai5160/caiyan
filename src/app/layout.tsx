import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--noto-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "蔡言 · UXUI设计师",
  description: "From design to live. — 蔡言个人作品集",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={notoSansSC.variable}>
      <head>
        <link rel="preconnect" href="https://prod.spline.design" />
      </head>
      <body>
        <Preloader />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
