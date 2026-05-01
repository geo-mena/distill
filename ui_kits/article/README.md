# Article UI Kit — Distill

A high-fidelity recreation of the Distill article surface. The single product Distill ever shipped was an article reader: long-form, scrollable, figure-rich, no app shell. This kit builds that experience.

## Files

- `index.html` — fully assembled sample article ("FiLM: A General-Purpose Conditioning Layer") that demonstrates the full reading surface end-to-end with interactive scrubber, citation popovers, and TOC drawer.
- `ArticleHeader.jsx` — title block (title, byline, journal name, publication date, read time)
- `ArticleNav.jsx` — sticky-on-hover top bar + TOC drawer trigger
- `TOCDrawer.jsx` — left-side table-of-contents drawer
- `Figure.jsx` — figure container with FIGURE-N label and caption
- `Citation.jsx` — `[N]` inline reference with hover popover
- `Footnote.jsx` — sidenote
- `DiagramScrubber.jsx` — horizontal play/pause/scrub control for animated diagrams
- `TensorVector.jsx` — vector-as-rectangle column primitive
- `SubNetworkChain.jsx` — stacked sub-network blocks with vertical labels
- `OperatorNode.jsx` — ⊕/⊙/⊗ circle nodes
- `Arrow.jsx` — slim arrow with triangular head
- `MathBlock.jsx` — display equation with optional ref number
- `Bibliography.jsx` — end-of-article references list
- `ArticleFooter.jsx` — citation, acknowledgments, license

## Design fidelity notes

- Reading column: 684px, centered, generous vertical rhythm.
- Figures break out to ~984px.
- Body in Crimson Text 18/1.7. Heads/UI in Libre Franklin.
- Two-color diagram language (salmon = input/data; powder-blue = conditioning/structure).
- One reused interactive glyph: orange pointer-finger dot.
- No emoji, no fixed elements, no gradients, no drop shadows on body content.

## What's intentionally NOT here

- Auth / accounts (Distill never had them)
- Comments / annotations (Distill articles are read-only)
- Search (the original distill.pub had no in-page search)
