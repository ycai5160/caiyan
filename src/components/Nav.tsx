"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header
      className="container-x"
      style={{
        paddingTop: "var(--space-brand-top)",
        paddingBottom: "var(--space-brand-bottom)",
      }}
    >
      <Link
        href="/"
        className="text-fg text-[14px] md:text-[15px] font-semibold tracking-[-0.01em]"
      >
        蔡言 · UXUI设计师
      </Link>
    </header>
  );
}
