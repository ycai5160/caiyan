"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

export default function CaseSideNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    // Pick whichever section sits closest to ~30% from the viewport top.
    const update = () => {
      const triggerY = window.innerHeight * 0.3;
      let bestId = sections[0].id;
      let bestDist = Infinity;

      for (const s of sections) {
        const top = s.getBoundingClientRect().top;
        if (top > triggerY) {
          // Past the trigger line — earlier section wins.
          break;
        }
        const dist = triggerY - top;
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }
      setActiveId(bestId);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Case study sections"
      className="hidden xl:block fixed left-8 2xl:left-16 top-1/2 -translate-y-1/2 z-40 w-[170px]"
    >
      <ul className="flex flex-col">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`group relative flex items-center gap-3 py-1.5 text-[12px] tracking-[-0.005em] transition-colors duration-200 ${
                  active ? "text-fg font-medium" : "text-tertiary"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ease-out ${
                    active ? "w-5 bg-fg" : "w-2 bg-tertiary"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
