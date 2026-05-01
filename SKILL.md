---
name: distill-design
description: Use this skill to generate well-branded interfaces and assets for Distill (the web-native ML research journal), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

Distill's visual language is **diagrammatic-editorial**: warm-paper backgrounds, two pastel accent hues (salmon = data, powder-blue = conditioning), Libre Franklin display + Crimson Text body, hand-built SVG diagrams with thin strokes. No emoji, no gradients, no shadows on body content. See `README.md` for the full system.

## Files in this skill

- `README.md` — full design system documentation (voice, visual foundations, iconography)
- `colors_and_type.css` — drop-in CSS variables and element defaults
- `assets/` — pointer-finger glyph SVG, wordmark SVG, iconography doc
- `ui_kits/article/` — TSX components for the article reader (Primitives, Chrome, Diagrams) and a fully-assembled `index.html`
- `preview/` — small HTML preview cards used in the Design System tab

## When to use what

- **Building a long-form ML/AI explainer page** → start from `ui_kits/article/index.html` and substitute prose + diagrams.
- **Building a diagram from scratch** → use `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock` from `ui_kits/article/Primitives.tsx`.
- **Just need the tokens** → import `colors_and_type.css` and use the CSS vars directly.
