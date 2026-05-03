---
description: Generate a 1600×500 SVG cover banner for a project README in the article-hero pattern.
---
Load the distill-design skill, then produce a 1600×500 SVG cover banner for the project named in $@.

Workflow:

1. Read `plugins/distill-design/SKILL.md` decision tree row "Cover banner for a project README" — it lists every measurement. Then read the canonical reference at `plugins/distill-design/resources/covers/distill-design-system.svg` and the article-hero source at `plugins/distill-design/ui_kits/article/Chrome.tsx` (`ArticleHeader` component).
2. From $@, extract: project name (h1), one-sentence subtitle, and three byline cells (default labels: SCOPE, VALIDATED, OUTPUT — but adapt to the project; e.g. for a library it might be SURFACE, RUNTIME, SHIPS WITH). If the user only gave a name, ask one clarifying question for the subtitle and 3-cell content.
3. Write a single self-contained SVG with `viewBox="0 0 1600 500"`, paper background `#fdfdfd`, and an embedded `<style>` block mirroring `distill-design-system.svg` exactly — same class names, same sizes.

Layout (from the canonical reference; do not deviate):

- Background: `<rect width="1600" height="500" fill="#fdfdfd"/>`.
- Left column (eyebrow + h1 + subtitle + hairline + 3-col byline grid):
  - Eyebrow: x=96 y=140, class `eyebrow` — `font-size: 12px; font-weight: 500; letter-spacing: 1.44px; fill: #6a6a6a;`. Content: uppercase 2-token tagline ending in the project name's domain.
  - h1: x=96 y=200, class `h1` — `font-size: 56px; font-weight: 700; letter-spacing: -0.84px; fill: #000;`. (Pure `#000` is allowed here — h1 is the only place.)
  - Subtitle: x=96 y=255, class `sub` — `font-size: 22px; font-style: italic; fill: #4a4a4a;`.
  - Hairline rule: `<line x1="96" y1="296" x2="960" y2="296" stroke="#e8e8e4" stroke-width="1"/>`.
  - 3-col byline grid: cells at x=96 / x=384 / x=672, label at y=320 (class `meta-label`, 10px uppercase 0.1em fill `#6a6a6a`), value at y=346 (class `meta-value`, 14px fill `#2a2a2a`), italic affiliation at y=367 (class `meta-aff`, 13px italic fill `#6a6a6a`).
- Right column (FiLM-style fan-out diagram):
  - Caption "prompt" (or context-appropriate noun) at x=1070 y=160, class `stack-label`, text-anchor middle.
  - Input TensorVector: 4 stacked salmon cells, x=1056, widths 28, alternating shades from the `Primitives.tsx` salmon palette (`#fdecea`, `#f8c2bb`, `#f5a39b`, `#fbd9d4`), stroke `#c44a3f`.
  - Arrow input → block: solid `#666` 1.5px from (1098,240) to (1158,240), with a triangular `#666` arrowhead.
  - "Design system"-style block: 70×160 rounded rect at (1170,170), fill `#fbd9d4`, stroke `#c44a3f`, with a vertical-rl label rotated -90° centered in the block (class `vlabel`, 13px medium fill `#2a2a2a`).
  - Fork stem: solid line (1240,240) → (1280,240).
  - 3 orthogonal branches (90° bends, never diagonal): stem at x=1280 forks to top (y=175), mid (y=240), bottom (y=305), each ending at x=1322 with a triangular arrowhead.
  - 3 output blocks at x=1334, width=120, height=40, rx=4, fill `#fdecea`, stroke `#c44a3f`. Labels via class `out-label` (14px medium `#2a2a2a`), text-anchor middle, centered in each block. Use 3 nouns describing the project's output surface.
  - "n artifacts"-style mini-label below the bottom block, class `stack-label`.
  - PointerGlyph end-stop: orange-yellow circle `#f5b942` with white pointing-hand path (copy from `distill-design-system.svg`), translated to anchor the right edge near the mid output.

Hard constraints (non-negotiable):

- English only.
- No emoji.
- No year literals anywhere in the cover (`2017–2021` is in the canonical reference because the canonical IS the system itself; for any other project, omit dates entirely or use timeless qualifiers).
- No marketing superlatives in the subtitle. State what the project does in plain terms.
- Pure `#000` is allowed on h1 only. Body labels stay `#2a2a2a` / `#4a4a4a` / `#6a6a6a`.
- Strokes `#666` 1.5px rounded caps. No gradients, no shadows.
- Output is a single self-contained SVG — embedded `<style>`, no external font, no external `<use href>`.

Output location:

- Always: `plugins/distill-design/resources/covers/<project-slug>.svg`. If the user is generating a cover for an external repo and wants it back inline for paste, return the SVG in the response too.

Verification:

- Open the SVG with `chrome-devtools` and screenshot at 1600×500. Visually compare to `resources/covers/distill-design-system.svg`. Check: h1 weight 700 in pure black, subtitle italic, hairline at y=296, three cells aligned, fan-out branches orthogonal not diagonal, PointerGlyph orange not red.
