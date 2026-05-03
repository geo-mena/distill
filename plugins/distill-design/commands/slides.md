---
description: Generate a Distill-style slide deck on a topic or paper — paper background, system sans, one idea per slide.
---
Load the distill-design skill, then produce a slide deck in the Distill visual language for the topic in $@.

Workflow:

1. Read `plugins/distill-design/SKILL.md` decision tree row "Slide deck for a talk" and `plugins/distill-design/DESIGN-SYSTEM.md` § "Visual foundations" before drafting. There is no shipped `slides/` UI kit — you reuse `ArticleHeader`, `Figure`, and the diagram primitives, paginated.
2. Outline the deck first as a numbered list of slide titles in sentence case. Default 10–14 slides unless the user specified. Each slide carries one idea. Pause for confirmation only if the user asked you to.
3. Generate a single self-contained HTML file. Each slide is a `<section>` with `width: 1280px; height: 720px;` (16:9), `background: #fdfdfd;`, padded `64px 96px`, sized via `aspect-ratio: 16/9` so it scales. Use CSS scroll-snap on the parent container so each slide snaps to viewport. Include a thin slide counter (`12 / 14`) bottom-right in 12px `#6a6a6a`.
4. Compose slides from the existing primitives. For diagram-heavy slides, use a "figure breakout" layout — the diagram sits in the upper two-thirds, a one-line caption in the lower third (14px `#6a6a6a`, mirroring `Figure` from `Primitives.tsx`). For prose slides, use the `ArticleHeader` typography ladder: eyebrow (11px uppercase `#6a6a6a` letter-spacing 0.12em) → title (36px weight 600, sentence case) → body (17px `rgba(0,0,0,0.8)` line-height 1.7). One idea per slide.
5. Citations at the foot of each slide that references external work: 11px `#6a6a6a`, format `[N] Authors, Title, Venue.` — same `Citation` look from `Primitives.tsx` minus the hover popover (slides are not interactive). A consolidated References slide at the end is also acceptable.
6. Embed diagrams using the same primitive selection as `/distill-design:diagram`. Pull components from `Primitives.tsx`, `Diagrams.tsx`, `RL.tsx`, `Graph.tsx`, `Heatmap.tsx`, `Specialized.tsx`. The HTML loads them via Babel standalone exactly like `ui_kits/article/index.html` — copy that scaffold's `<head>` and adapt.

Slide structure conventions:

- Title slide: eyebrow (talk venue / date if user gave one), h1 56px weight 700 pure `#000` on a single line (or 2-line wrap), italic subtitle 22px `#4a4a4a`, byline grid like `ArticleHeader`. No diagram on the title slide.
- Section divider slides: h2 36px weight 600 centered, paper background, no other content. Used to mark major sections of the deck.
- Idea slides: title (h2 ladder) + one diagram or one short paragraph (≤ 60 words). Never both at full size.
- Figure breakout slides: full-bleed diagram with a one-line caption. The caption describes what to look at.
- Closing slide: a single sentence summary, citation list below if not on its own slide, contact line in 13px italic `#6a6a6a` (no email-as-hyperlink-blue, just plain text — Distill links are quiet).

Output location:

- Default: `plugins/distill-design/preview/slides-<slug>.html`. The user opens it in a browser and uses arrow keys / scroll-snap to navigate.
- If the user wants a printable PDF, mention they can use `chrome-devtools` "Print → Save as PDF" with custom paper size 1280×720.

Hard constraints (non-negotiable):

- English only. Never translate the slide content.
- No emoji on any slide.
- No marketing superlatives. No exclamation points. Sentence case headings.
- Body color `rgba(0,0,0,0.8)`; pure `#000` on h1 only (title slide and any per-slide h1, which should be rare — most slides use h2 36px).
- Strokes 1.5–2px in `#666` rounded caps for any embedded SVG.
- No gradients, no shadows on slide content, no fixed elements (the slide counter is part of the slide flow, not fixed).
- No year literals in slide content unless the topic genuinely dates a specific paper.
- Background `#fdfdfd` only. Never pure white. Never a colored slide background — color belongs in the diagrams.

Verification:

- Serve via `cd plugins/distill-design && python3 -m http.server 8765` (Babel standalone needs HTTP).
- Open `http://localhost:8765/preview/slides-<slug>.html` and verify visually with `chrome-devtools` — take a screenshot of the title slide and one figure-breakout slide. Check: aspect ratio holds at 16:9, system sans not Times-fallback, scroll-snap advances one slide per scroll.
