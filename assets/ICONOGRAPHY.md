# Iconography

Distill is **almost entirely free of UI icons**. The brand's visual richness comes from bespoke per-article diagrams, not from a shared icon set. This document captures what little iconography does exist, plus our substitutions for product-shell needs that go beyond the original journal.

---

## 1. Diagram glyphs (native)

These are drawn fresh as part of each article's SVG illustration. They are NOT reusable assets — but they share a consistent visual grammar:

| Glyph | Rendered as | Used for |
|---|---|---|
| ⊕ | A circle with a + inside, hairline stroke | Element-wise addition |
| ⊙ | A circle with a • inside | Element-wise multiplication / Hadamard |
| ⊗ | A circle with × inside | Cross / outer product |
| → | Slim arrow with small triangular head | Data flow |
| ⇢ | Slim dashed arrow | Optional / attention pathway |
| { } | Hairline curly braces | "These N things group together" |

All operators are drawn at 1.5px stroke in `#333` on a transparent or paper-white background. Never filled with color — the surrounding tensor cells carry color.

## 2. The one reused glyph: pointer-finger

The orange-yellow filled circle with a white pointing hand is Distill's single piece of cross-article iconography. It marks a draggable / interactive element in figures.

- File: `pointer-glyph.svg`
- Size: render at **16px** inline next to small elements, **20px** for diagram-internal.
- Background: `var(--highlight)` (`#f5b942`)
- Foreground: white pointing-hand silhouette

Don't use it for anything other than "this thing in the diagram is interactive."

## 3. UI scaffolding icons (substitution — flagged)

The original distill.pub site has a minimal nav with bespoke per-feature icons. For UI elements outside the article body (TOC drawer, share, theme toggle, copy-to-clipboard) we substitute **[Lucide](https://lucide.dev)** at **1.5px stroke**, loaded from CDN.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="menu" stroke-width="1.5"></i>
```

Why Lucide:

- 1.5px stroke matches Distill's diagram line weight.
- Rounded line caps match the diagram aesthetic.
- Open-license, breadth of coverage, no design liberties.

**This is a flagged substitution.** If/when bespoke icons exist for the consuming product, drop them in `assets/icons/` and reference by name.

## 4. What we do NOT use

- **Emoji.** Body, UI, headers — none.
- **Filled icons / Material-style.** All icons are line-icons, never solid.
- **Multi-color icons.** Icons are monochrome; color comes from the surrounding context.
- **Icons inside body prose.** Inline ornaments break Distill's reading rhythm. The exception is **inline math symbols** (γ, β, →, Σ) which are typeset glyphs, not icons.
- **Icons-as-decoration.** Every icon must label or afford an action. No "stars next to features," no "ribbons next to sections."

## 5. Unicode characters used inline

These are typed directly in body prose, treated as typography rather than icons:

- → ← ↔ ↑ ↓  — directional arrows in equations and inline references
- ⊕ ⊙ ⊗  — math operators (also drawn in diagrams)
- γ β α θ ε ω  — Greek letters for parameters
- ≡ ≈ ≠ ≤ ≥  — math relations
- ′ ″  — primes for derivatives
- … — ellipsis
- — – -  — em, en, hyphen (use them correctly)

## 6. Substitutions we made for this design system

| Need | Original Distill | Substitute used here | Reason |
|---|---|---|---|
| TOC drawer / hamburger | Bespoke SVG | Lucide `menu` | No accessible original |
| Share / copy-link | Bespoke SVG | Lucide `share-2`, `link` | No accessible original |
| Theme toggle | None (Distill is light-only) | Lucide `sun` / `moon` | New affordance; flagged as additive |
| Search | None on article pages | Lucide `search` | New affordance; flagged as additive |
| Webfonts | Self-hosted Libre Franklin / Crimson | Google Fonts CDN | Convenience |

---

**Action for the user:** if any of these substitutions don't match an internal style guide, drop replacements in `assets/icons/` and update this doc.
