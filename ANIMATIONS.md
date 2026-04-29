# Animation & Effects Reference

All animations and special effects in the portfolio, by component.

---

## Nav — `src/components/Nav.tsx`

| Element | Effect | Details |
|---------|--------|---------|
| `<nav>` | Entrance slide-in | `gsap.from` · `y: -20, opacity: 0` · 800ms · `power3.out` · 100ms delay on page load |
| Nav links | Hover fade | CSS `transition-opacity` · `hover:opacity-60` |

---

## HeroSection — `src/components/HeroSection.tsx`

| Element | Effect | Details |
|---------|--------|---------|
| Hero image | Scroll parallax | GSAP ScrollTrigger · `yPercent: -20 → 20` as hero scrolls out · `scrub: 1` · `scale: 1.3, transformOrigin: center center` — 30% extra height split evenly · `force3D: true` · `will-change: transform` |
| `查看简历` orbit button | Rotating text ring | CSS `@keyframes orbit-spin` · 12s linear infinite · SVG `textPath` on circular path (r=44) · "查看简历 · " ×4 fills the circumference |
| `查看简历` orbit button | Cursor magnetic tracking | GSAP `quickSetter` x/y · lerp factor 0.10 · pull radius 180px · linear falloff `(1 - dist/180) * 0.5` · refreshed lazily on scroll/resize |
| `查看简历` orbit button | Hover — text ring fades | CSS `transition-[color] 300ms` · `text-black/50 → text-black/20` via `group-hover` |
| `查看简历` orbit button | Hover — arrow reveals | CSS `transition-opacity 300ms` · `opacity-0 → opacity-100` on inner arrow div · diagonal ↗ SVG arrow |
| `查看简历` orbit button | Hover — border sharpens | CSS `transition-[border-color] 300ms` · `border-black/[0.12] → border-black/30` |

**Mobile / reduced-motion:** entire `mm.add(...)` block is absent on `≤768px` and `prefers-reduced-motion: reduce`. `mm.revert()` on unmount cleans all ScrollTriggers and ticker callbacks.

---

## SkillsSection — `src/components/SkillsSection.tsx`

Scroll-driven via outer `div` set to `700vh` with inner `section` sticky. ScrollTrigger maps scroll progress → active skill index.

| Element | Effect | Details |
|---------|--------|---------|
| Left skill list | Vertical centering slide | `gsap.to(listWrapperRef)` · `y = containerH/2 - itemH*(idx+0.5)` · 350ms `power2.out` on swap |
| List item (active) | Opacity highlight | `gsap.to` · `opacity: 0.12 → 1` · 180ms |
| List item (active) | Scale pulse | `gsap.fromTo` · `scale: 0.96 → 1` · 280ms `power2.out` — confirms selection |
| Index number | Directional crossfade | Outgoing: `opacity → 0, y: direction * -10` · 180ms `power2.in`. Incoming: `gsap.set y: direction * 10` then `to opacity:1, y:0` · 280ms `power2.out` |
| Detail card | Swap | Outgoing: `opacity → 0` · 180ms. Incoming: `opacity: 1` immediately (white bg covers outgoing) |
| Detail card children (`[data-stagger]`) | Directional stagger reveal | `gsap.fromTo` · `opacity:0, y: direction*10 → opacity:1, y:0` · 380ms `power2.out` · `stagger: 0.06s` per child |
| Right-edge progress bar | Scroll progress | `gsap.set scaleY: self.progress` · `transformOrigin: top center` — live 1:1 with scroll |
| Left column center line | Static rule | No animation — fixed structural divider |

**Direction awareness:** `direction: 1 | -1` derived by comparing current vs previous `self.progress` — used for number swap and stagger `y` offset direction.  
**Reduced-motion:** `reducedMotion` constant skips all `fromTo` / `to` tweens; uses `gsap.set` for instant state.

---

## ProjectSection — `src/components/ProjectSection.tsx`

| Element | Effect | Details |
|---------|--------|---------|
| Project card | Scroll entrance | `gsap.from` · `y: 48, opacity: 0` · 1000ms `power3.out` · triggers at `top 75%` · plays once |
| "View Case Study" underline | Hover expand | CSS · `w-0 → w-full` · 300ms `cubic-bezier(0.76,0,0.24,1)` |
| "View Case Study" arrow | Hover slide | CSS · `translate-x-0 → translate-x-2` · 300ms `cubic-bezier(0.76,0,0.24,1)` |

---

## WebDesignSection — `src/components/WebDesignSection.tsx`

| Element | Effect | Details |
|---------|--------|---------|
| Section heading | Scroll entrance | `gsap.from` · `y: 32, opacity: 0` · 900ms `power3.out` · triggers at `top 80%` · plays once |
| Project cards (×4) | Staggered scroll entrance | `gsap.from` · `y: 40, opacity: 0` · 800ms `power3.out` · `stagger: 0.1s` · triggers at `top 80%` · plays once |
| Card image area | Hover background lighten | CSS `transition-colors 300ms` · `bg-white/[0.06] → bg-white/[0.1]` |

---

## Footer — `src/components/Footer.tsx`

| Element | Effect | Details |
|---------|--------|---------|
| Email link | Hover color | CSS `transition-colors 300ms` · `text-white/50 → text-white` |
| Section nav links | Hover color | CSS `transition-colors 300ms` · `text-white/25 → text-white/70` |

No GSAP — static component.

---

## Global Notes

- **Easing standard:** `power3.out` for entrances, `power2.out` for interactive feedback, `power2.in` for exits. Custom `cubic-bezier(0.76,0,0.24,1)` for CSS hover transitions.
- **GPU acceleration:** All GSAP transforms use `x`/`y`/`scale`/`rotationZ` (compositor-only). `force3D: true` on parallax image.
- **No bounce/elastic easing** used anywhere.
- **`prefers-reduced-motion`:** HeroSection exits early. SkillsSection uses `gsap.set` (instant) in place of all tweens.
