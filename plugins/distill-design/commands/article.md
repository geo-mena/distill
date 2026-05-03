---
description: Generate a long-form Distill-style article on a topic — TOC, hover citations, math, 7-section footer.
---
Load the distill-design skill, then produce a long-form Distill-style article on the topic given in $@.

Workflow:

1. Read `plugins/distill-design/SKILL.md` first for the file table and the decision tree, then `plugins/distill-design/DESIGN-SYSTEM.md` § "Content fundamentals" and § "Typography" for voice and exact display sizes.
2. If the topic is ambiguous (paper not named, audience unstated, length unstated), ask one clarifying question. Otherwise commit.
3. Outline the article first as a numbered list of h2 sections in sentence case, with one-line descriptions. Pause for confirmation only if the user asked you to. Otherwise proceed.
4. Copy `plugins/distill-design/ui_kits/article/index.html` as the scaffold. Replace prose, citations, and diagrams; keep the `<head>`, the Babel-standalone setup, the `<link>` to `../../tokens/colors_and_type.css`, and the `<script src>` lines for `Primitives.tsx`, `Chrome.tsx`, `Diagrams.tsx`, and any of `RL.tsx` / `Graph.tsx` / `Heatmap.tsx` / `Specialized.tsx` you need.
5. Use `ArticleNav`, `ArticleHeader`, `TOCDrawer`, and `ArticleFooter` from `Chrome.tsx`. The footer must include all 7 canonical sections (Acknowledgments, Author Contributions, Discussion and Review, References, Updates and Corrections, Reuse, Citation) — each is a prop on `ArticleFooter`. Pass meaningful values; do not leave the defaults.
6. Inline citations use the `Citation` primitive from `Primitives.tsx` with a `bib` map. Equations use `MathBlock`. Figures use `Figure` with `n` (figure number) and `caption`. Diagrams inside figures compose primitives — pick the right file via the SKILL decision tree (RL → `RL.tsx`, beam search / HMM → `Graph.tsx`, attention / convolution / recurrent → `Heatmap.tsx`, molecule / Feynman / annotated raster → `Specialized.tsx`, generic FiLM-style → `Diagrams.tsx` + `Primitives.tsx`).
7. Default output location: a sibling HTML file under `plugins/distill-design/preview/article-<slug>.html`. If the user asks for a TSX-only scaffold to drop into their own app, return a `.tsx` file with the article body component (no `<html>` shell) and list the imports they need.

Voice and prose constraints (non-negotiable):

- English only. Never translate the artifact, even if this conversation is in another language.
- First-person plural ("we") for narration; second person ("you") only when addressing reader actions.
- Active voice, present tense. Math verbs get verbed ("dot producted", "softmaxed").
- Sentence case for headings. Title case reserved for proper nouns and named methods.
- No emoji anywhere. No exclamation points in body. No contractions in formal sections.
- No marketing superlatives ("revolutionary", "powerful", "robust", "comprehensive", "elegant", "game-changing"). State what the thing does; let the reader judge.
- No year literals in the article body unless the topic genuinely requires dating a specific paper. Prefer "now-archived", "modern", "earlier".
- Captions describe what to look at, not what to conclude.

Visual constraints (non-negotiable):

- Body color `rgba(0,0,0,0.8)` (≈ `#333`). Pure `#000` only on the h1.
- Reading column 704px; figures may break out to 984px via the `breakout` prop on `Figure`.
- Strokes 1.5–2px in `#666` with `stroke-linecap="round"`. No multi-color icons. No gradients, no shadows on body content, no fixed elements.
- Background `#fdfdfd`. Never pure white.

Verification:

- After writing, serve via `cd plugins/distill-design && python3 -m http.server 8765` (Babel standalone fetches the `.tsx` files via XHR — `file://` is blocked by CORS).
- Open `http://localhost:8765/preview/article-<slug>.html` and verify visually with `chrome-devtools` (screenshot, list-network-requests). The user values verification; do not claim the article is correct without inspecting the rendered output.
