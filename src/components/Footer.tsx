"use client";

export default function Footer() {
  return (
    <footer
      className="container-x"
      style={{
        paddingTop: "var(--space-footer-top)",
        paddingBottom: "var(--space-footer-bottom)",
      }}
    >
      <div
        className="flex items-baseline justify-between gap-6 text-[12px] md:text-[13px] text-muted"
      >
        <a href="mailto:caiyan615@gmail.com" className="link-underline text-fg">
          17600131580@163.com
        </a>
        <span>© 2026 蔡言</span>
      </div>
    </footer>
  );
}
