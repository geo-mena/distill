---
name: distill-design
description: Use this skill to generate well-branded interfaces and assets for Distill (the web-native ML research journal), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

When invoked: if the user has not given a specific request, ask what they want to build (article, diagram, slide deck, mockup, dashboard styling, voice transform) and act as an expert Distill designer. Output either HTML artifacts (for throwaway/preview work) or production-ready code (TSX + CSS) depending on the target.

Seven explicit slash commands wrap the most common workflows — they all load this Skill and add a focused prompt:

| Command | What it does |
|---|---|
| `/distill-design:article` | Generate a long-form article (TOC, citations, math, 7-section footer) |
| `/distill-design:diagram` | Generate one SVG diagram, picking the right primitive file from the topic |
| `/distill-design:cloud-arch` | Generate a vendor-agnostic cloud architecture SVG using the `service-<slug>` icon library |
| `/distill-design:cover` | Generate a 1600×500 README cover banner in the article-hero pattern |
| `/distill-design:rewrite` | Rewrite text in Distill voice — first-person plural, no superlatives, sentence case |
| `/distill-design:slides` | Generate a 16:9 slide deck — one idea per slide, paper background, system sans |
| `/distill-design:brand-map` | Map a product brand onto Distill tokens — override CSS, component adapter notes, voice translation table |

Use the commands when the user's intent maps cleanly to one of these tasks. For freeform requests outside those buckets, work directly from the decision tree below.

## Quick orientation

Distill's visual language is **diagrammatic-editorial**: warm-paper background, system sans-serif throughout (body + display), two pastel diagram hues (salmon `#e49381` = data, powder-blue `#81bee4` = conditioning) plus lavender `#b8a8d8` for attention/memory. Hand-built thin-stroke SVG illustrations (1.5–2px in `#666`, rounded caps). Reading column ~704px. **No emoji, no gradients, no fixed elements, no shadows on body content.** Body color is `rgba(0,0,0,0.8)`; pure black is reserved for h1 only.

Tokens validated by DOM audit on 10 articles (2017–2021). For deep rules, read `DESIGN-SYSTEM.md`.

## Files

| Path | Purpose |
|---|---|
| `tokens/colors_and_type.css` | Drop-in CSS variables (3 palettes, type scale 17/36/50, spacing, radii, shadows, motion) |
| `fonts/GeistPixel-Square.woff2` | Pixel mono for `<code>`/`<pre>` (flagged additive) |
| `assets/` | Pointer-glyph SVG + wordmark SVG + icon rules (`ICONOGRAPHY.md`) |
| `ui_kits/article/Primitives.tsx` | `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph`, `Citation`, `Figure`, `MathBlock` |
| `ui_kits/article/Chrome.tsx` | `ArticleNav`, `ArticleHeader`, `TOCDrawer`, `ArticleFooter` (7 canonical sections) |
| `ui_kits/article/Diagrams.tsx` | `ConcatDiagram`, `BiasDiagram`, `ScalingDiagram`, `FiLMNetworkDiagram`, `FiLMScrubber` |
| `ui_kits/article/RL.tsx` | `GridWorld`, `ValueHeatmap`, `PolicyArrows` — cliffworld grids, value-function heatmaps, stochastic policy arrows |
| `ui_kits/article/Graph.tsx` | `GraphNode`, `GraphEdge`, `BeamSearchTree`, `DebateTree`, `HMMState` — generic node/edge primitives, beam-search lattices, debate trees, HMM state circles |
| `ui_kits/article/Heatmap.tsx` | `AttentionHeatmap`, `CellGrid`, `RecurrentArrow`, `VariableTensor`, `ConvGrid` — opacity-modulated weights, CTC DP / Game of Life grids, LSTM/GRU recurrence arcs, variable-width tensor cells, convolutional kernel-stride-padding visualization |
| `ui_kits/article/Specialized.tsx` | `MoleculeViewer`, `AutomataGrid`, `FeynmanDiagram`, `ImageWithAnnotations`, `DistillBoxplot` — chemistry, cellular automata, particle-physics, raster overlays, statistical boxplots |
| `ui_kits/article/index.html` | Fully-assembled FiLM article — serve via HTTP (`python3 -m http.server`), not `file://` |
| `templates/design-canvas.tsx` | Author tool: Figma-ish canvas wrapper for laying out variants |
| `templates/tweaks-panel.tsx` | Author tool: floating live-tweak panel (sliders / toggles / colors) |
| `preview/*.html` | 30 reference cards — one per token/component |
| `sources/` | 131 source figures from 10 Distill articles |
| `resources/diagrams/_service-icons.svg` | Canonical line-art icon library for cloud-architecture diagrams (17 symbols: `service-dns`, `service-cdn`, `service-load-balancer`, `service-compute`, `service-database`, `service-pubsub`, `service-function`, `service-metrics`, `service-logs`, `service-alarms`, `service-events`, `service-dashboard`, etc.). Vendor-agnostic naming. Each `<symbol>` is 24×24 viewBox, stroke `#666`, monochrome. Inline-copy into consumer SVG `<defs>` for portability |
| `DESIGN-SYSTEM.md` | **Deep design rules: voice, color, typography, iconography, caveats. Read this when the user asks for specific values, voice transformation, or anything not directly answered above.** |

## Decision tree

| Task | Where to start |
|---|---|
| Long-form ML/AI explainer | Copy `ui_kits/article/index.html`; substitute prose, citations, diagrams |
| Diagram from scratch | Compose `Primitives.tsx` (TensorVector + Arrow + OperatorNode + SubNetBlock) |
| RL / cliffworld / value-function visualization | Use `RL.tsx`: `GridWorld` for environment, `ValueHeatmap` for V(s)/Q(s,a) (opacity-modulated), `PolicyArrows` for stochastic policies. Extended palette: navy `#2a2d7c` for optimal paths, penalty red `#bd5f36` for cliffs. Source: `paths-perspective-on-value-learning-*.svg` |
| Beam search / HMM / lattice diagrams | Use `Graph.tsx`: `GraphNode` + `GraphEdge` for arbitrary graphs, `BeamSearchTree` for layered lattices with state semantics (active/pruned/neutral), `HMMState` for subscript-bearing state circles. Source: `ctc-14-beam-search.svg`, `ctc-17-hmm.svg` |
| Debate trees / argumentation diagrams | Use `Graph.tsx` `DebateTree` with two-sided coloring (claim=`#ee4900`, counter=`#008bee`). These two saturated hues are debate-specific extensions, not part of the canonical 3-color palette. Source: `safety-needs-social-scientists-01.svg`, `film-09-debate-tree.png` |
| Attention heatmap / opacity-encoded weights | Use `Heatmap.tsx` `AttentionHeatmap` (1D vector with `opacity = 0.1 + weight * 0.85`). Negative values use salmon, positive use blue/lavender. Source: `augmented-rnns-07-diagram.svg`, `ctc-13-ctc-cost.svg` |
| CTC alignment / DP matrix / Game of Life grids | Use `Heatmap.tsx` `CellGrid` (circle shape for CTC DP cost matrix, square for binary cellular automata). Source: `ctc-13-ctc-cost.svg`, `understanding-gnns-08-game-of-life-example.svg` |
| LSTM/GRU recurrent feedback arrow | Use `Heatmap.tsx` `RecurrentArrow` (curved bezier feedback, default lavender stroke `#8359b2`). Source: `memorization-in-rnns-02-lstm-web.svg`, `augmented-rnns-15-diagram.svg` |
| CTC variable-length character runs | Use `Heatmap.tsx` `VariableTensor` (TensorVector variant with per-cell width override). Source: `ctc-08-full-collapse-from-audio.svg` |
| Convolutional receptive field / kernel sweep | Use `Heatmap.tsx` `ConvGrid` (input grid + kernel overlay, optional padding ring with dashed hairline, optional output grid linked back via dashed line, auto-computed output size from `(input + 2*padding − kernel) / stride + 1`). Source: `computing-receptive-fields-01..08.svg` |
| Molecular structure (atoms + bonds) | Use `Specialized.tsx` `MoleculeViewer`. Element auto-color: O salmon, N blue, S olive, C grey, H faint. Bond order 1/2/3 + aromatic ring style. Source: `understanding-gnns-02-trigalloyl-glucose-molecule.svg` |
| Cellular automata (Game of Life, etc.) | Use `Specialized.tsx` `AutomataGrid` (multi-generation horizontal/vertical sequence with arrows between steps). Source: `understanding-gnns-08-game-of-life-example.svg` |
| Particle-physics Feynman diagram | Use `Specialized.tsx` `FeynmanDiagram` (fermion solid, photon sinusoid, gluon helix). Source: `aia-01-feynmann-diagram.svg` |
| Raster image with annotation circles (AIA / Building Blocks) | Use `Specialized.tsx` `ImageWithAnnotations`. Extended categorical palette: olive `#8a8233`, burgundy `#8c3a4a`, slate `#4f6470` (in addition to salmon/blue/lavender) for distinguishing 4+ overlay categories. Source: `aia-10-cycle.svg`, `building-blocks-01-activation-pca.png` |
| Statistical boxplot in Distill palette | Use `Specialized.tsx` `DistillBoxplot` (replaces matplotlib defaults `#1f77b4`/`#ff7f0e` with on-brand pastels per group). Source: `understanding-gnns-10-validation-accuracy-boxplot.svg` |
| Cloud architecture diagram (AWS / GCP / Azure / generic) | Output SVG to `resources/diagrams/<slug>.svg`. **Inline-copy** the needed `<symbol>` blocks from `resources/diagrams/_service-icons.svg` into the consumer SVG's own `<defs>` (cross-file `<use href>` is blocked under GitHub `<img src>` and `file://` CORS), then reference via `<use href="#service-<slug>" width="20" height="20"/>`. Color goes on the **enclosing block**, never the icon stroke (`#666`). Solid arrows for primary flow; dashed (`stroke-dasharray="3 3"`) for failover/observability. **Never import vendor-official icons.** **For the full category→color mapping, the missing-icon protocol, and the rationale, read `DESIGN-SYSTEM.md` § "Service icons for architecture diagrams".** |
| Slide deck for a talk | Reuse `ArticleHeader` + `Figure` + diagram primitives, paginate |
| Just need design tokens | Import `tokens/colors_and_type.css`; use `var(--ink)`, `var(--salmon-300)`, `var(--font-sans)` |
| Style a product/dashboard | Map brand to tokens; lean on flat layers, hairlines, no shadows. Reuse existing primitives (`Citation`, `Figure`, `MathBlock`) before creating new components |
| Build a card / panel / sidebar | Distill has no first-class card or app-shell primitive. Push back: offer a figure-container instead (hairline border, no shadow) or an article excerpt block |
| Build a multi-column layout | Distill is single-column reading. Push back unless user explicitly overrides — propose breakouts or sequential figures instead |
| Cover banner for a project README | Output 1600×500 SVG to `resources/covers/<project-slug>.svg`. Mirror the article-hero pattern from `ui_kits/article/Chrome.tsx`: eyebrow (uppercase 12px, letter-spacing 0.12em, `#6a6a6a`), h1 (system sans 700, 56px, letter-spacing -0.015em, color `#000`), italic subtitle (22px, `#4a4a4a`), hairline rule (`#e8e8e4`), 3-col byline grid (label 10px uppercase 0.1em / value 14px `#2a2a2a` / italic affiliation 13px `#6a6a6a`). Right column: fan-out diagram in FiLM-style — input TensorVector → vertical-rl labeled SubNetBlock → orthogonal fork (90° bent paths, never diagonal) → 3 output blocks → PointerGlyph anchor. See `resources/covers/distill-design-system.svg` as canonical reference |
| Multi-variant exploration | Embed `templates/design-canvas.tsx` with `DCSection` + `DCArtboard` |
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
