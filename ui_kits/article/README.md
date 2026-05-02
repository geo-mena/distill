# Article UI Kit — Distill

A high-fidelity recreation of the Distill article surface. The single product Distill ever shipped was an article reader: long-form, scrollable, figure-rich, no app shell. This kit builds that experience.

## Files

- `index.html` — fully assembled sample article ("FiLM: A General-Purpose Conditioning Layer") that demonstrates the full reading surface end-to-end with interactive scrubber, citation popovers, and TOC drawer.
- `Primitives.tsx` — diagram primitives: `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph`, plus prose-level building blocks `Citation`, `Figure`, `MathBlock`.
- `Chrome.tsx` — article shell: `ArticleNav` (sticky top bar), `ArticleHeader` (title block + byline + DOI), `TOCDrawer`, `ArticleFooter`.
- `Diagrams.tsx` — assembled diagram scenes from the FiLM article: `ConcatDiagram`, `BiasDiagram`, `ScalingDiagram`, `FiLMNetworkDiagram`, plus the interactive `FiLMScrubber`.

All three files are loaded by `index.html` via Babel standalone with `data-presets="typescript,react"`. They use `React.useState` / `React.useRef` directly (no destructuring at module scope) and assign their components onto `window` so the inline app script in `index.html` can pick them up. Type definitions for cross-file globals live in `../../globals.d.ts`.

## Running the preview

**Do not double-click `index.html`.** Babel standalone uses XHR to fetch the `.tsx` files for in-browser transpilation, and modern Chromium blocks XHR over `file://` (origin `null`) under CORS. You'll get a blank page and a console full of `ReferenceError: ArticleNav is not defined`.

Serve over HTTP instead. From the repo root:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765/ui_kits/article/index.html`. Any static server works (`npx serve`, `caddy file-server`, the VS Code Live Server extension, etc.) — the only requirement is HTTP, not file://.

This is not specific to the TSX migration: the original `.jsx` version had the same constraint. The `favicon.ico 404` you may see in the console is harmless (browsers auto-request it; we don't ship one).

## Design fidelity notes

- Reading column: 684px, centered, generous vertical rhythm.
- Figures break out to ~984px.
- Typography is system sans-serif (`-apple-system, system-ui, "Segoe UI", Roboto, ...`) for everything: body, headings, captions, byline. Body 17/1.7. h1 50/1.1 weight 700. h2 36/1.25 weight 600. h3 20/1.4 weight 700.
- Two-color diagram language (salmon = input/data; powder-blue = conditioning/structure).
- One reused interactive glyph: orange pointer-finger dot.
- No emoji, no fixed elements, no gradients, no drop shadows on body content.

## What's intentionally NOT here

- Auth / accounts (Distill never had them)
- Comments / annotations (Distill articles are read-only)
- Search (the original distill.pub had no in-page search)
