---
register: brand
---

## Design Context

### Users
Hiring managers at product companies and design studios, plus fellow designers and developers who encounter the site through referrals or social. Viewing context: desktop during work hours, mobile while commuting. The job: quickly assess whether 蔡言's taste, range, and technical execution meet the bar, then decide to reach out.

### Brand Personality
Precise · Considered · Quiet

The portfolio is a proof of capability, not a mood board. The site shouldn't try to be impressive; it should step aside so the work speaks. Every element earns its place; anything decorative gets cut.

### Aesthetic Direction
Light, minimal, product-feeling. Reference points: Notion's editorial calm, Vercel's product clarity, Swiss typographic restraint translated to the web. Anti-references: Webflow templates, Awwwards-maximalism, AI-generated "dark portfolio with neon accents", glassmorphism, gradient text, identical card grids, SaaS hero-metric layouts.

**Palette (restrained).** White background, near-black foreground, four-step neutral gray scale, no chromatic accent. Hex tokens in `globals.css`:
- `--color-bg: #ffffff`
- `--color-fg: #0a0a0a`
- `--color-secondary: #404040` (body copy)
- `--color-muted: #737373` (labels, meta)
- `--color-tertiary: #a3a3a3` (faintest meta)
- `--color-edge: #ececec` (hairlines)
- `--color-surface: #f5f5f5`, `--color-surface-2: #ededed` (card surfaces)
- `--color-accent` exists in the token set but is intentionally set to `#0a0a0a` (same as fg). No orange, no color accent. The previous brand orange (`#f43e0c`) was removed.

**Typography (bilingual).** SF Pro Display for Latin, Noto Sans SC for CJK, stacked in one font-family with per-character font matching. No inline `var(--font-siyuan)` overrides on element-level styles; trust the body cascade. Two baseline sizes (16px semibold for headings and card labels, 12–14px regular for body / meta), with project titles bumped to 20–24px as the only hierarchical break.

**Layout.** Twelve-column grid throughout. Content sections use a 5/7 split (text left, visual right). Vertical rhythm via fluid `clamp()` tokens (`--space-section-lg/md/sm`, `--space-grid-gutter`, `--space-stack-lg`, `--space-bento-gap`) so spacing breathes with viewport. Section weight drives padding: section 01 (headline product project, Subflow) gets the most air, 02 (showcase carousel) medium, 03 (core skills bento, conclusion) tightest.

### Design Principles

1. **Space is the primary design tool.** Tight where related, generous between groups. Use fluid `clamp()` so spacing scales with viewport. Never equal padding everywhere.
2. **Hierarchy through size and color, not decoration.** Four gray steps plus two type sizes are enough. No border-left accents, no gradient text, no glass cards, no chromatic accent.
3. **Hover effects are intentionally rare.** Removed globally (`.card-lift` and `.link-underline` are now static with `cursor: pointer` only). The single exception is the Subflow project link: hover advances the top-right arrow and sweeps a fill into the underline. That asymmetry is deliberate, because Subflow is the primary call-to-action on the page.
4. **Motion serves orientation, never performance.** GSAP scroll-fade on section entry, clip-reveal on slide / index changes, sweep-fill on the Subflow underline. Ease-out exponential curves only; no bounce, no elastic.
5. **Mobile recomposes**, doesn't shrink. Grid stacks, left/right become top/bottom, carousel cards reflow to 70vw width. Recompose for the device; don't downscale the desktop layout.
6. **Bilingual is the brand.** SF Pro for Latin, Noto Sans SC for CJK. Per-character font fallback in one shared stack; never force one font to render the other language's glyphs.
7. **Restraint is the signature.** One headline per section, one motion idiom per interaction, one accent (gray). Cumulative quietness reads as confidence.

### Stack
Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP + @gsap/react · Swiper 12 · Lenis smooth scroll. Animation hooks live alongside components in `src/components/`; spacing and font tokens live in `src/app/globals.css`.
