---
name: distill-design
description: Use this skill to generate well-branded interfaces and assets for Distill (the web-native ML research journal), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

When invoked: if the user has not given a specific request, ask what they want to build (article, diagram, slide deck, mockup, dashboard styling, voice transform) and act as an expert Distill designer. Output either HTML artifacts (for throwaway/preview work) or production-ready code (TSX + CSS) depending on the target.

## Quick orientation

Distill's visual language is **diagrammatic-editorial**: warm-paper background, system sans-serif throughout (body + display), two pastel diagram hues (salmon `#e49381` = data, powder-blue `#81bee4` = conditioning) plus lavender `#b8a8d8` for attention/memory. Hand-built thin-stroke SVG illustrations (1.5–2px in `#666`, rounded caps). Reading column ~704px. **No emoji, no gradients, no fixed elements, no shadows on body content.** Body color is `rgba(0,0,0,0.8)`; pure black is reserved for h1 only.

Tokens validated by DOM audit on 10 articles (2017–2021). For deep rules, read `DESIGN-SYSTEM.md`.

## Files

| Path | Purpose |
|---|---|
| `colors_and_type.css` | Drop-in CSS variables (3 palettes, type scale 17/36/50, spacing, radii, shadows, motion) |
| `fonts/GeistPixel-Square.woff2` | Pixel mono for `<code>`/`<pre>` (flagged additive) |
| `assets/` | Pointer-glyph SVG + wordmark SVG + icon rules (`ICONOGRAPHY.md`) |
| `ui_kits/article/Primitives.tsx` | `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph`, `Citation`, `Figure`, `MathBlock` |
| `ui_kits/article/Chrome.tsx` | `ArticleNav`, `ArticleHeader`, `TOCDrawer`, `ArticleFooter` (7 canonical sections) |
| `ui_kits/article/Diagrams.tsx` | `ConcatDiagram`, `BiasDiagram`, `ScalingDiagram`, `FiLMNetworkDiagram`, `FiLMScrubber` |
| `ui_kits/article/index.html` | Fully-assembled FiLM article — serve via HTTP (`python3 -m http.server`), not `file://` |
| `design-canvas.tsx` | Author tool: Figma-ish canvas wrapper for laying out variants |
| `tweaks-panel.tsx` | Author tool: floating live-tweak panel (sliders / toggles / colors) |
| `preview/*.html` | 30 reference cards — one per token/component |
| `sources/` | 131 source figures from 10 Distill articles |
| `DESIGN-SYSTEM.md` | **Deep design rules: voice, color, typography, iconography, caveats. Read this when the user asks for specific values, voice transformation, or anything not directly answered above.** |

## Decision tree

| Task | Where to start |
|---|---|
| Long-form ML/AI explainer | Copy `ui_kits/article/index.html`; substitute prose, citations, diagrams |
| Diagram from scratch | Compose `Primitives.tsx` (TensorVector + Arrow + OperatorNode + SubNetBlock) |
| Slide deck for a talk | Reuse `ArticleHeader` + `Figure` + diagram primitives, paginate |
| Just need design tokens | Import `colors_and_type.css`; use `var(--ink)`, `var(--salmon-300)`, `var(--font-sans)` |
| Style a product/dashboard | Map brand to tokens; lean on flat layers, hairlines, no shadows. Reuse existing primitives (`Citation`, `Figure`, `MathBlock`) before creating new components |
| Build a card / panel / sidebar | Distill has no first-class card or app-shell primitive. Push back: offer a figure-container instead (hairline border, no shadow) or an article excerpt block |
| Build a multi-column layout | Distill is single-column reading. Push back unless user explicitly overrides — propose breakouts or sequential figures instead |
| Cover banner for a project README | Output 1600×500 SVG to `resources/covers/<project-slug>.svg`. Mirror the article-hero pattern from `ui_kits/article/Chrome.tsx`: eyebrow (uppercase 12px, letter-spacing 0.12em, `#6a6a6a`), h1 (system sans 700, 56px, letter-spacing -0.015em, color `#000`), italic subtitle (22px, `#4a4a4a`), hairline rule (`#e8e8e4`), 3-col byline grid (label 10px uppercase 0.1em / value 14px `#2a2a2a` / italic affiliation 13px `#6a6a6a`). Right column: fan-out diagram in FiLM-style — input TensorVector → vertical-rl labeled SubNetBlock → orthogonal fork (90° bent paths, never diagonal) → 3 output blocks → PointerGlyph anchor. See `resources/covers/distill-design-system.svg` as canonical reference |
| Multi-variant exploration | Embed `design-canvas.tsx` with `DCSection` + `DCArtboard` |
| Live-editable prototype | Wrap with `useTweaks` + `TweaksPanel` |
| Voice transform / caption rewriting | Read `DESIGN-SYSTEM.md` § "Content fundamentals" first |
| User uncertain | Ask 1–2 clarifying questions, then commit |

## Hard constraints (never violate without explicit user override)

- No emoji anywhere
- No marketing superlatives, no exclamation points in body, no contractions in formal sections
- No gradients, glassmorphism, semi-transparent overlays, or fixed/sticky elements in article body
- Body text is `rgba(0,0,0,0.8)`/`#333`, never pure black
- Pure `#000` reserved for h1
- Strokes 1.5–2px in `#666` with rounded caps, never pure black
- Headings in sentence case (proper nouns and named methods exempt)
- Captions describe what to look at, not what to conclude

## When working

- **Visual artifacts (slides, mocks, throwaway)**: copy assets out, create static HTML files
- **Production code**: copy TSX/CSS, adapt to the target stack (Next.js, Vite, Remix, etc.)
- **For exact values, voice samples, or anything ambiguous**: read `DESIGN-SYSTEM.md` — don't guess.
