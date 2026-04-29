import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Libre_Caslon_Text, Noto_Sans_SC, Azeret_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--_font-jakarta",
  display: "swap",
});

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--_font-caslon",
  display: "swap",
});

const mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--_font-mono",
  display: "swap",
});

// Noto Sans SC = 思源黑体 (Siyuan Heiti) — Google's distribution of Source Han Sans SC
const siyuan = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--_font-siyuan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "蔡言 — UX/UI Designer & Creative Developer",
  description: "Personal portfolio of 蔡言, UX/UI Designer and Creative Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${jakarta.variable} ${caslon.variable} ${siyuan.variable} ${mono.variable}`}>
      <body className="bg-white text-black antialiased">
        <Preloader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
