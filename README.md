# Distill Design System

A Claude Skill that gives you the visual language of **[Distill.pub](https://distill.pub)** — the now-archived web-native journal for clear, interactive ML research. The brand survives as one of the most recognizable academic-editorial design languages on the web: clean, calm, illustration-led, and built around legibility at long reading distances.

Tokens, components, and voice rules are validated against live `distill.pub` (10-article DOM audit, 2017–2021). System sans-serif throughout, two pastel diagram hues, hand-built thin-stroke SVG, no emoji, no gradients.

---

## What you can ask this skill to do

### ✍️ Editorial content in Distill voice
- **"Write a long-form on [topic] in Distill style"** — full article with TOC, citations with hover popovers, math, 7-section canonical footer
- **"Rewrite this paragraph in Distill voice"** — applies first-person plural, no marketing superlatives, no exclamation points, math-verbs verbed

### 🎨 Diagrams in the visual language
- **"Diagram an attention mechanism over memory"** — composes `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph` primitives with the salmon/blue/lavender palette
- **"Visualize this model FiLM-style"** — pre-built scenes for concat / bias / scaling / FiLM-network / interactive scrubber

### 📊 Slide decks for ML/AI talks
- **"8-slide deck on [paper]"** — paper-warm bg, system sans, one idea per slide, breakouts to figures, citations at the foot

### 🛠 Apply the system to your product
- **"Style my dashboard like Distill"** — drop-in `colors_and_type.css` tokens + TSX components copy-paste-ready
- **"Convert this brand to a scholarly-editorial system"** — maps your brand to tokens with diagram primitives

### 🖼 Throwaway mockups & exploration
- **"Quick mockup of [feature]"** — standalone HTML artifact, opens in a browser
- **"Lay out 6 variants side-by-side"** — uses `design-canvas.tsx` (Figma-ish wrapper with pan/zoom, drag-reorder, focus mode)
- **"Add a live tweaks panel for primary color and font size"** — uses `tweaks-panel.tsx` (floating, persisted via postMessage)

### 📚 Visual reference
- **"Show me how Distill diagrams [concept]"** — 131 source figures from 10 articles in `sources/`

---

## How to use it

### As a Claude Skill
```bash
# Copy or symlink to your Claude skills directory
ln -s "$(pwd)" ~/.claude/skills/distill-design
```
Then invoke with `/distill-design` in any Claude Code session, or describe an editorial/diagrammatic need and Claude will activate the skill automatically.

### As a reference for porting to your stack
- Tokens: `colors_and_type.css` (drop-in CSS variables)
- Components: `ui_kits/article/*.tsx` (copy-paste-friendly, prop-typed)
- Visual references: `preview/*.html` (one card per token/component) and `sources/*` (131 diagrams)
- Voice / color / typography rules: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)

### As a live demo (article kit)
```bash
python3 -m http.server 8765
```
Then open [http://localhost:8765/ui_kits/article/index.html](http://localhost:8765/ui_kits/article/index.html). **Don't double-click `index.html`** — Babel needs HTTP, not `file://`. See [ui_kits/article/README.md](ui_kits/article/README.md) for details.

---

## Repository map

| Path | What it is |
|---|---|
| [SKILL.md](SKILL.md) | Claude Skill manifest — read by Claude when invoked |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Full design rules: voice, color, typography, iconography, caveats |
| [colors_and_type.css](colors_and_type.css) | CSS variables: 3 palettes, type scale, spacing, radii, shadows, motion |
| [fonts/](fonts/) | Geist Pixel Square (mono only — body/display use OS system sans) |
| [assets/](assets/) | Pointer-glyph SVG, wordmark SVG, [iconography rules](assets/ICONOGRAPHY.md) |
| [ui_kits/article/](ui_kits/article/) | Article reader TSX (Primitives, Chrome, Diagrams) + assembled `index.html` |
| [design-canvas.tsx](design-canvas.tsx) | Author tool: Figma-ish canvas (sections, artboards, post-its) |
| [tweaks-panel.tsx](tweaks-panel.tsx) | Author tool: floating live-tweak panel |
| [preview/](preview/) | 30 reference cards, one per token/component |
| [sources/](sources/) | 131 source figures from 10 Distill articles (vector when possible) |
| [tsconfig.json](tsconfig.json), [globals.d.ts](globals.d.ts) | TypeScript config + ambient types (zero `node_modules`) |

---

## What it doesn't do (by design)

- No emoji, ever
- No marketing superlatives ("revolutionary", "powerful", "game-changing")
- No exclamation points in body
- No gradients, glassmorphism, or fixed/sticky elements in articles
- No simplification of math for "accessibility" — density is part of the identity
- No multi-color icons or filled glyphs
