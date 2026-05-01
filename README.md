# Distill Design System

A design system reconstructed from the visual language of **[Distill.pub](https://distill.pub)** — the now-archived web-native journal for clear, interactive machine-learning research. The brand survives as one of the most recognizable academic-editorial design languages on the web: clean, calm, illustration-led, and built around legibility at long reading distances.

This system captures Distill's typographic, chromatic, and illustrative conventions for use in:

- Long-form technical explainers and research write-ups
- Slide decks for ML/AI content
- Diagram-heavy interfaces (visualization tools, notebooks, dashboards)
- Any product wanting a calm, scholarly, "thinking out loud" tone

---

## Sources

These uploads informed the system. They are **diagram clippings from Distill articles** (FiLM, Neural Turing Machines / Attention, AI Safety via Debate) plus one product screenshot showing an "Import" dialog in a separate cream-coloured UI which we've set aside as out-of-scope.

| File | What it shows |
|---|---|
| `uploads/Screenshot ... 1.42.34 PM.png` | Concatenation-based conditioning diagram |
| `uploads/Screenshot ... 1.42.39 PM.png` | Conditional biasing diagram |
| `uploads/Screenshot ... 1.42.56 PM.png` | Concat ≡ conditional bias proof diagram |
| `uploads/Screenshot ... 1.43.12 PM.png` | Conditional scaling diagram |
| `uploads/Screenshot ... 1.43.35 PM.png` | FiLM generator → FiLM-ed network |
| `uploads/Screenshot ... 1.43.42 PM.png` | FiLM γ/β scaling+shifting on FC and conv |
| `uploads/Screenshot ... 1.44.13 PM.png` | FiLM in visual reasoning (Perez et al.) |
| `uploads/Screenshot ... 1.44.16 PM.png` | FiLM in artistic style transfer (Ghiasi et al.) |
| `uploads/Screenshot ... 1.45.50 PM.png` | AI Safety via Debate — debate tree |
| `uploads/Screenshot ... 1.47.02 PM.png` | Neural Turing Machine — memory + read/write |
| `uploads/Screenshot ... 1.47.17 PM.png` | Attention as weighted sum over memory |
| `uploads/Screenshot ... 1.47.37 PM.png` | NTM attention mechanism (softmax→interpolate→convolve→sharpen) |
| `uploads/Screenshot ... 1.47.50 PM.png` | RNN attention — Network B attends to A |
| `uploads/Screenshot ... 1.47.56 PM.png` | RNN attention — query/softmax internals |

The cream-coloured "Import" screenshot (`1.42.22 PM.png`) is from a different product context (Anthropic-style cream UI) and is **not** part of this system.

---

## Index

Root manifest:

- `README.md` — this file
- `colors_and_type.css` — CSS variables for color, type, spacing, shadows
- `SKILL.md` — agent skill manifest
- `fonts/` — webfont files (or Google Fonts substitutes — see below)
- `assets/` — logos and reference imagery
- `preview/` — small HTML cards rendered in the Design System tab
- `ui_kits/article/` — long-form article UI kit (the canonical Distill surface)
- `slides/` — sample slide layouts using Distill's visual language

## Font substitution flag

Distill historically uses **Libre Franklin** (display/headings) and **Libre Baskerville** / **Crimson Text**-family serifs (body) plus a system mono. We load Libre Franklin and Crimson Text from **Google Fonts** as substitutes — they are the originals, just CDN-hosted rather than self-hosted.

**One flagged substitution: mono.** Code/mono is set to **Geist Pixel Square** (self-hosted from `fonts/GeistPixel-Square.woff2`), with the system mono stack as fallback. This is an intentional departure from Distill's original system-mono — it gives code blocks a distinctive pixel-grid character that complements the diagrammatic visual language. If you want to revert to the original behavior, remove "Geist Pixel Square" from `--font-mono` in `colors_and_type.css`.

If you have access to the original Distill display/serif webfonts (woff2), drop them into `fonts/` and update the `@font-face` blocks at the top of `colors_and_type.css`.

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
  - **Salmon-coral** (`#f5a39b`-ish) — represents *inputs / data / source vectors*.
  - **Powder-blue** (`#a8c8e8`-ish) — represents *conditioning / parameters / generated structure*.
- **Lavender / soft purple** (`#b8a8d8`-ish) — third accent, used for *attention, memory, and recurrence diagrams* specifically.
- **Neutrals are warm grey**, never cool. Body text is `#2a2a2a` (not pure black). Secondary text is `~#6a6a6a`. Hairlines are `~#d8d8d4`.
- **Saturation is always low.** No fully-saturated primaries. If you'd describe a swatch as "bold," it's wrong for Distill.
- **Highlight orange-yellow** (`#f5b942`) appears as a single accent color — only on interactive-affordance pointer-finger glyphs.

### Typography
- **Display & headings**: Libre Franklin, weights 400 / 600 / 700. Tight tracking on h1; default elsewhere.
- **Body prose**: serif (Crimson Text or Libre Baskerville), 18–20px, 1.7 line-height, max line length ~62ch.
- **UI / labels / figure annotations**: Libre Franklin sans-serif, 14–15px, ~1.5 line-height.
- **Mono / code**: **Geist Pixel Square** (self-hosted, see `fonts/`) with system mono stack as fallback, at 0.92em. Pixel-grid character; flagged substitution from Distill's original system-mono.
- **Math**: KaTeX / Computer Modern via MathJax — italicized variables, upright operators.
- **Headline weight is restrained**: h1 uses 700, h2/h3 use 600. Nothing heavier than 700; nothing lighter than 400 in display.

### Spacing & rhythm
- **Reading column** is fixed at ~684px (the article body). Figures break out wider — up to ~984px, sometimes full-bleed.
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
- **Strokes are thin**: 1.5–2px black or `#333`, rounded line caps.
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
- **Links** (in body): underline appears on hover; color shifts subtly toward salmon/red `#c44`. No color change on inactive links.
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

- **Source material was screenshots only.** No code or Figma access; CSS values (exact hex, line-heights) are reconstructed by eye plus close knowledge of distill.pub's published style. Verify against any internal source-of-truth before shipping production work.
- **Webfonts**: Libre Franklin and Crimson Text are loaded from Google Fonts (originals, just CDN-hosted). **Mono is flagged**: substituted with self-hosted Geist Pixel Square (`fonts/GeistPixel-Square.woff2`) instead of the system mono stack. If you have the original Distill display/serif woff2 files, drop them in `fonts/` and update `colors_and_type.css`.
- **UI scaffolding icons substituted with Lucide.** Distill never had bespoke product chrome at scale; for nav/share/copy we use Lucide @ 1.5px stroke. See `assets/ICONOGRAPHY.md`.
- **Pointer-finger glyph reconstructed** as a typographic stand-in; it captures the orange-circle + white-pointing-hand intent but isn't a pixel lift of the original.
- **One UI kit only** (article reader). Distill never shipped a second product surface — no app shell, no dashboard, no settings UI to recreate. If you need slide layouts for talks, ask and we can add a `slides/` folder using the same visual language.
- **No Anthropic-style cream UI** — the one out-of-place Import-dialog screenshot in the uploads is from a different product context and was set aside.
