# Distill Design System

A design system reconstructed from the visual language of **[Distill.pub](https://distill.pub)** — the now-archived web-native journal for clear, interactive machine-learning research. The brand survives as one of the most recognizable academic-editorial design languages on the web: clean, calm, illustration-led, and built around legibility at long reading distances.

This system captures Distill's typographic, chromatic, and illustrative conventions for use in:

- Long-form technical explainers and research write-ups
- Slide decks for ML/AI content
- Diagram-heavy interfaces (visualization tools, notebooks, dashboards)
- Any product wanting a calm, scholarly, "thinking out loud" tone

---

## Sources

These source screenshots informed the system. They are **diagram clippings from Distill articles** — FiLM, Neural Turing Machines, Attention, AI Safety via Debate.

| File | What it shows |
|---|---|
| `sources/film-01-concat-conditioning.png` | Concatenation-based conditioning diagram |
| `sources/film-02-conditional-biasing.png` | Conditional biasing diagram |
| `sources/film-03-concat-bias-proof.png` | Concat ≡ conditional bias proof diagram |
| `sources/film-04-conditional-scaling.png` | Conditional scaling diagram |
| `sources/film-05-generator-network.png` | FiLM generator → FiLM-ed network |
| `sources/film-06-gamma-beta-scaling.png` | FiLM γ/β scaling+shifting on FC and conv |
| `sources/film-07-visual-reasoning.png` | FiLM in visual reasoning (Perez et al.) |
| `sources/film-08-style-transfer.png` | FiLM in artistic style transfer (Ghiasi et al.) |
| `sources/film-09-debate-tree.png` | AI Safety via Debate — debate tree (referenced inside FiLM) |
| `sources/film-10-ntm-memory-read-write.png` | Neural Turing Machine — memory + read/write |
| `sources/film-11-ntm-attention-mechanism.png` | NTM attention mechanism (softmax→interpolate→convolve→sharpen) |
| `sources/film-12-attention-weighted-sum.png` | Attention as weighted sum over memory |
| `sources/film-13-attention-rnn-overview.png` | RNN attention — Network B attends to A |
| `sources/film-14-attention-rnn-internals.png` | RNN attention — query/softmax internals |

**Additional sources from corpus audit.** A second pass scraped 9 more Distill articles (2016–2021) — figures saved as inline SVGs (preserving vector data) or downloaded image assets. Filenames follow `<article-slug>-NN-<descriptor>.<ext>`.

| Article | Files | Range |
|---|---|---|
| `paths-perspective-on-value-learning-*` | 28 | RL paths, MC vs TD, cliffworld variants |
| `augmented-rnns-*` | 24 | NTM, attention, ACT, neural programmers (2016 article — older template) |
| `ctc-*` | 20 | alignment, dynamic programming, beam search, HMM |
| `understanding-gnns-*` | 11 | GCN/GAT/GIN, molecular graphs, Laplacian |
| `aia-*` | 10 | latent space, generative model interfaces |
| `building-blocks-*` | 9 | saliency, channel attribution, semantic dictionaries |
| `computing-receptive-fields-*` | 8 | receptive field computation diagrams |
| `memorization-in-rnns-*` | 4 | LSTM/GRU webs + 1 fullpage reference |
| `safety-needs-social-scientists-*` | 3 | debate trees |

**Total**: 131 source files across 10 articles. ~12MB. The FiLM 14 are originals provided by the user; the rest were scraped from `distill.pub`.

---

## Index

Root manifest:

- `README.md` — this file
- `SKILL.md` — agent skill manifest
- `colors_and_type.css` — CSS variables for color, type, spacing, shadows
- `tsconfig.json` — TypeScript configuration for the .tsx files in this Skill
- `globals.d.ts` — ambient type declarations for `React` and cross-file component globals
- `fonts/` — self-hosted Geist Pixel Square (mono/code only); body and display use the OS system sans stack — no webfont needed
- `assets/` — logos and reference imagery
- `preview/` — small HTML cards rendered in the Design System tab
- `ui_kits/article/` — long-form article UI kit (the canonical Distill surface), TSX components + assembled `index.html`
- `design-canvas.tsx` — author tool: Figma-ish canvas wrapper (sections, artboards, post-its); not part of the Distill brand surface, used to lay out variants during design exploration
- `tweaks-panel.tsx` — author tool: floating panel with sliders/toggles/colors for live-tweaking prototype values; speaks the `__edit_mode_*` postMessage protocol so a host can persist edits back to disk
- `sources/` — source screenshots used to reconstruct the system (one per diagram, named by article + content)

## TypeScript

All React components in this Skill are `.tsx` with prop interfaces. They're loaded into `index.html` via Babel standalone with `data-presets="typescript,react"` — no build step, no `node_modules`. Types are stripped at runtime; the IDE picks them up via `tsconfig.json` + `globals.d.ts`.

## Fonts

Distill renders **everything** — body, headings, captions, byline — in the platform system sans stack:

```
-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
"Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif
```

There is no webfont download for prose or display. This was confirmed by computed-style audit on `distill.pub` (San Francisco on macOS, Segoe UI on Windows, Roboto on Android). Earlier drafts of this system claimed Libre Franklin / Crimson Text — that was incorrect and has been corrected.

**One flagged substitution: mono.** Code/mono is set to **Geist Pixel Square** (self-hosted from `fonts/GeistPixel-Square.woff2`), with the system mono stack as fallback. This is an intentional additive — Distill itself uses the platform mono stack. The pixel-grid character complements the diagrammatic visual language without conflicting with the editorial body. To revert, remove `"Geist Pixel Square"` from `--font-mono` in `colors_and_type.css`.

---

## Content fundamentals

Distill's voice is **scholarly, plain-spoken, and quietly confident**. It reads like a smart colleague walking you through a problem at a whiteboard — never marketing copy, never breathless, never condescending.

### Tone & person
- **First-person plural ("we") for narration**: *"We can decompose the matrix-vector product into two matrix-vector subproducts."* The "we" includes the reader — it's collaborative, not royal.
- **Second person ("you") sparingly**, only when addressing reader actions: *"You'd need to take a business call at a weird time."*
- **Active voice**, present tense for explanations: *"Each item is dot producted with the query."* (Yes — "dot producted." Math verbs get verbed.)
- **No hedging adverbs**. Avoid "very," "really," "quite," "incredibly." If something is large, say how large.

### Casing
- **Sentence case for headings**: *"Concatenation-based conditioning"*, not *"Concatenation-Based Conditioning"*.
- **Title case is reserved for proper nouns and named methods** (FiLM, Neural Turing Machine, GRU).
- **Bold inline for term-introduction**, not for emphasis. The first appearance of a key term is bolded; subsequent uses are not.

### Math, code, and symbols
- **Symbols are typeset, not described.** Use γ, β, ⊙, →, Σ, ←. Greek letters are used freely and assumed legible.
- **Variable names italicized inline** (math italic): *x*, *z*, *W*. Code identifiers stay upright in mono.
- **Equations are display-rendered** (KaTeX/MathJax), centered, with reference numbers only when cited.
- **"This" + concept**, not "this thing": *"This approach concatenates the conditioning representation to the input"* — name what "this" refers to.

### Captions & figure language
- Captions are full sentences ending in periods.
- Captions describe **what to look at**, not what to conclude: *"FIGURE 1 A hypothetical partial debate tree for the question 'Where should I go on vacation?'"*
- Inline figure annotations are short, declarative, and directly next to the element they label: *"Blue shows high similarity, pink high dissimilarity."*

### Lists
- Bulleted lists for parallel items only; otherwise prefer prose.
- Numbered lists for true sequences (steps, ranked items).
- Items are sentence fragments with terminal periods if they are full clauses; no period if they are noun phrases. Be consistent within a list.

### What we don't do
- **No emoji.** Ever. Distill is emoji-free; the closest thing is the occasional 👆 pointer-finger glyph in interactive diagrams to indicate a draggable element, rendered as a small orange-circle icon (not an emoji codepoint).
- **No exclamation points.**
- **No marketing superlatives** ("revolutionary," "game-changing," "powerful"). Describe what something does; let the reader decide.
- **No "let's" or contractions in formal sections.** Contractions are okay in figure annotations, but main body prose is uncontracted.

### Example paragraph (canonical voice)

> Concatenation-based conditioning simply concatenates the conditioning representation to the input. The result is passed through a linear layer to produce the output. Conditional biasing first maps the conditioning representation to a bias vector. The bias vector is then added to the input. These two approaches are mathematically equivalent — we can decompose the matrix-vector product into two matrix-vector subproducts, then add the resulting two vectors.

---

## Visual foundations

Distill's visual language is **diagrammatic-editorial**. Every page is a long-scroll reading column with embedded, generously-spaced figures rendered in a tight palette of pastel salmon and powder blue, on warm-paper white.

### Color
- **Background is paper, not sheet-white.** `#fdfdfd` to `#fbfbfb`. Pure `#ffffff` reads as harsh.
- **Two pastel accent hues** carry the diagram language:
  - **Salmon-coral** (`#e49381`) — represents *inputs / data / source vectors*. Confirmed via DOM audit on distill.pub.
  - **Powder-blue** (`#81bee4`) — represents *conditioning / parameters / generated structure*. Confirmed via DOM audit.
- **Lavender / soft purple** (`#b8a8d8`) — third accent, used for *attention, memory, and recurrence diagrams* specifically.
- **Neutrals are warm grey**, never cool. Body text is `#333` ≈ `rgba(0,0,0,0.8)` (softened, not pure black). Secondary text is `~#6a6a6a`. Hairlines are `~#d8d8d4`.
- **Saturation is always low.** No fully-saturated primaries. If you'd describe a swatch as "bold," it's wrong for Distill.
- **Highlight orange-yellow** (`#f5b942`) appears as a single accent color — only on interactive-affordance pointer-finger glyphs.

### Typography
All sizes/weights below are confirmed via DOM audit on distill.pub.

- **Family**: system sans (see "Fonts" section above) for body, display, captions — everything except code.
- **Body prose**: 17px / 1.7 line-height (≈ 28.8px), weight 400, color `rgba(0,0,0,0.8)`. Reading column ~704px wide.
- **h1**: 50px / 1.1 line-height, weight 700, letter-spacing `-0.015em`, color pure black (the only place black goes pure).
- **h2**: 36px / 1.25 line-height, weight 600.
- **h3**: 20px / 1.4 line-height, weight 700 (note: heavier than h2, not lighter — Distill's h3 is bolder-but-smaller).
- **UI / labels / figure annotations**: same system sans, 14–15px, ~1.5 line-height.
- **Mono / code**: **Geist Pixel Square** (self-hosted, see `fonts/`) with system mono stack as fallback, at 0.92em. Pixel-grid character; flagged additive (Distill itself uses system mono).
- **Math**: KaTeX / Computer Modern via MathJax — italicized variables, upright operators. Greek letters used freely.
- **Headline weight ladder**: h1 700 → h2 600 → h3 700. Nothing heavier than 700; nothing lighter than 400 in display.

### Spacing & rhythm
- **Reading column** is ~704px (the article body, confirmed via DOM audit). Figures break out wider — up to ~984px, sometimes full-bleed.
- **Vertical rhythm** is generous — paragraph spacing equals one line-height, section breaks are 2-3 line-heights.
- **8px base grid**, but figures don't snap to it; diagrams float in their own layout. UI elements (buttons, inputs) snap.
- **Section margins** are very wide — articles feel like they're floating in air.

### Layout
- **Single reading column, centered.** Sidebars are not part of Distill's article surface — when navigation exists, it's a TOC drawer that opens from the left.
- **Figures and code blocks break out** to wider widths. The widest break-out is "page bleed" but still has lateral margin on large screens.
- **No fixed elements** in articles — header scrolls away with the page. Distill is a reading experience, not an app shell.
- **Footnotes and citations are clickable popovers** — hovering a citation number expands the bib entry inline.

### Diagrams (the soul of the brand)
- **Hand-built SVG illustrations**, not stock or icon-library.
- **Strokes are thin**: 1.5–2px in `#666` (mid-grey, confirmed via SVG audit — the most-used stroke color across articles), rounded line caps.
- **Arrows are slim with small triangular heads** — not chunky chevrons.
- **Vectors-as-rectangles** is a recurring motif: a column of small colored squares represents a tensor; lighter/darker squares within suggest values.
- **Dashed lines** indicate optional or attention pathways.
- **Labels float next to elements**, not inside them. Annotation text is sans, ~14px, dark grey.
- **Diagrams have no border, no background fill.** They sit on the paper directly.
- **Vertical text labels** (`writing-mode: vertical-rl`) on stacked sub-network blocks — distinctive Distill move.

### Backgrounds & textures
- Paper white only. **No gradients, no textures, no patterns.** Distill is rigorously flat.
- One exception: very occasional faint horizontal hairline rules between sections (`#e8e8e4`).

### Borders, radii, shadows
- **Corner radius**: 4px standard, 6px for figure containers, 999px for pills/tags. Buttons are 4px. Sub-network "blocks" in diagrams are 4–8px.
- **Borders**: 1px hairline `#d8d8d4` for inputs and figure containers; **most elements have no border at all**.
- **Shadows are nearly absent.** When they appear (modals, popovers), they're soft and tight: `0 2px 8px rgba(0,0,0,0.06)`.
- **No "elevation" system** in the Material sense. Distill is two layers: paper, and ink.

### Hover, press, focus
- **Links** (in body): same color as body text (`rgba(0,0,0,0.8)`), with a permanent subtle underline (`border-bottom: 1px solid rgba(0,0,0,0.4)`). Hover darkens the underline. No color shift toward red — links are quiet and rely on the underline to signal affordance.
- **Buttons**: bg lightens ~5% on hover; no transform on press, just `opacity: 0.85`.
- **Focus rings**: 2px outline in powder-blue `#a8c8e8`, offset 2px. Visible on keyboard focus only.
- **Citation popovers**: appear on hover (delay ~150ms), fade in 100ms.

### Animation
- **Tasteful and informational, never decorative.**
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (standard "swift out") for UI; **linear or ease-in-out** for diagram playheads.
- **Durations**: 150–250ms for UI feedback, 400–800ms for diagram beats, multi-second for full visualization replays.
- **No bounces, no springs, no parallax.** Things slide and fade. Diagrams have a single play/pause/scrub control.
- Hover transitions are 150ms. Page transitions don't exist — Distill is a multi-page article site, not an SPA.

### Imagery
- **Photographic imagery is rare** — when used (e.g., the CLEVR scene image in the FiLM article), it's small, square, and sits in a plain frame inside a diagram.
- No stock photos, no illustrations of people, no 3D renders, no AI-generated imagery.

### Iconography
- **Distill barely uses icons.** The few that appear are part of diagrams (write/read pills, gates, +/×/⊙ operators) and are drawn-in rather than icon-library glyphs.
- **One reused glyph**: an orange-yellow circle with a pointer-finger 👆 representing "draggable / interactive" in figures. We render this as a 16px filled circle in `#f5b942` with a small white pointing-hand SVG.
- For UI scaffolding (article TOC, share button, etc.), we substitute **Lucide** at 1.5px stroke — closest match to the editorial line weight. **This is a substitution.** The original Distill site does not use Lucide; it has bespoke per-feature icons. See `assets/ICONOGRAPHY.md`.

### Layout transparency / blur
- **Not used.** No backdrop blur, no glassmorphism, no semi-transparent overlays. The aesthetic is opaque-paper; everything is either there or not there.

### Cards
- Cards as a UI primitive don't really exist in Distill articles. The closest analog is a **figure container**: a horizontal rule above and below, optional 1px hairline border, no shadow, no background fill. Rounded corners 6px if bordered.

---

## Iconography

See `assets/ICONOGRAPHY.md` for full details. Summary:

- Distill uses **almost no icons in body chrome**.
- **Diagram-internal glyphs** (operators like ⊙, ⊕, ×, +, →, gates, write/read pills) are part of the diagram itself — drawn fresh, not icon-library.
- **Pointer-finger orange dot** is the one reused interactive affordance.
- For UI scaffolding, we substitute **Lucide @ 1.5px stroke**. Flagged.
- **Emoji: never.** **Unicode arrows in body text: occasionally** (→, ←, ↔, ↑, ↓) — these are typed inline, not iconified.

---

## Caveats & open questions

- **Tokens validated against live distill.pub.** Color hex, font sizes, line-heights, and stroke colors in this system were verified by computed-style and SVG audits across 10 articles (2017 CTC, AIA → 2018 Building Blocks, FiLM → 2019 Safety/Social-Scientists, Memorization in RNNs, Paths Perspective, Receptive Fields → 2021 Understanding GNNs) plus the homepage. **9 of 10 articles plus the homepage match identically** (system sans, body 17/1.7/`rgba(0,0,0,0.8)`, h1 50/700, h2 36/600, h3 20/700, link `rgba(0,0,0,0.4)` border-bottom). Earlier drafts that called body "Crimson Text serif" were wrong; corrected.
- **One historical outlier**: `distill.pub/2016/augmented-rnns/` uses an older template (custom `<dt-article>` element, Georgia serif body at 20px, h1/h2 at weight 400). Distill rebuilt around the modern `<d-article>` template in 2017 and stuck with it through 2021. This system targets the canonical 2017+ template — the 2016 outlier is not represented.
- **Fonts**: body and display use the platform system sans stack — no webfont download. Mono is **flagged additive**: Geist Pixel Square (`fonts/GeistPixel-Square.woff2`) instead of system mono.
- **UI scaffolding icons substituted with Lucide.** Distill never had bespoke product chrome at scale; for nav/share/copy we use Lucide @ 1.5px stroke. See `assets/ICONOGRAPHY.md`.
- **Pointer-finger glyph reconstructed** as a typographic stand-in; it captures the orange-circle + white-pointing-hand intent but isn't a pixel lift of the original.
- **One UI kit only** (article reader). Distill never shipped a second product surface — no app shell, no dashboard, no settings UI to recreate. If you need slide layouts for talks, ask and we can add a `slides/` folder using the same visual language.
- **No Anthropic-style cream UI** — an out-of-place Import-dialog screenshot from a different product context was set aside during initial sourcing and is not part of `sources/`.
