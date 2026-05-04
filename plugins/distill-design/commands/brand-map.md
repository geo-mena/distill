---
description: Map a product brand to Distill design tokens — palette, typography, components, voice.
---
Load the distill-design skill, then map the brand described in $@ to Distill design tokens, producing the override CSS, the component adapter notes, and the voice translation guidelines.

Workflow:

1. Read `plugins/distill-design/SKILL.md` decision tree rows "Just need design tokens" and "Style a product/dashboard", then `plugins/distill-design/DESIGN-SYSTEM.md` § "Color", § "Typography", and § "Content fundamentals" before mapping.
2. Parse $@ for brand inputs: brand name, primary brand color (hex), accent or secondary color (if any), font preference (system / serif / specific webfont), voice samples or tone descriptors, and the target surface (dashboard, marketing site, docs portal, internal tool). If a critical input is missing (no primary color, no surface type), ask one clarifying question. Otherwise commit.
3. State the mapping rationale in 2–3 lines before producing the artifact: which Distill conventions stay (paper background, low saturation, hairline borders, 1.5–2px strokes, no gradients, no shadows on body content) and which brand inputs map onto which Distill slots.
4. Produce three deliverables in order:

   a. **Token override CSS** — a `:root { ... }` block that overrides the relevant `--*` variables from `plugins/distill-design/tokens/colors_and_type.css`. Map the brand primary onto a Distill slot semantically (data → salmon, conditioning → blue, attention/memory → lavender; pick the closest match for the brand's intended emotional register). Keep `--paper`, `--ink`, `--ink-soft`, `--ink-muted`, `--hairline`, all spacing tokens, and the type scale untouched unless the brand explicitly requires divergence. Output the CSS as a code block, ready to drop into the consumer app over the base import.

   b. **Component adapter notes** — a numbered list mapping the user's expected UI surfaces (buttons, inputs, cards, navigation, data tables, charts) onto the closest existing primitives in `plugins/distill-design/`. Reuse `Citation`, `Figure`, `MathBlock`, `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph` before proposing anything new. Where Distill has no equivalent (cards, app-shell sidebar, multi-column dashboards), follow the pushback from the SKILL decision tree: propose a figure-container or article-excerpt block instead of a card; propose breakouts or sequential figures instead of multi-column.

   c. **Voice translation table** — three columns: typical brand phrasing (input), Distill-voice rewrite (output), one-line note on the rule applied (e.g. "dropped marketing superlative", "rewrote in first-person plural"). Include 4–6 representative pairs covering: hero headline, feature description, CTA button label, error message, empty-state copy, footer microcopy. Use the user's voice samples from $@ as input where provided.

Voice and prose constraints (non-negotiable):

- English only. Never translate the artifact, even if this conversation is in another language.
- Sentence case for headings and CTAs. Title case only for proper nouns and named methods.
- No emoji anywhere. No exclamation points in body. No contractions in formal sections.
- No marketing superlatives ("revolutionary", "powerful", "robust", "comprehensive", "elegant", "seamless", "cutting-edge", "next-generation"). State what the thing does.
- No year literals in the brand artifact unless the topic genuinely requires dating something.
- First-person plural ("we") for narration in voice rewrites; second person ("you") only when addressing user actions directly.

Visual constraints (non-negotiable):

- Background `#fdfdfd` (paper) — never pure white, never a colored fill.
- Body color `rgba(0,0,0,0.8)` (≈ `#333`). Pure `#000` reserved for h1 only.
- Strokes 1.5–2px in `#666` (or the brand-overridden equivalent in the same low-saturation register) with `stroke-linecap="round"`. No multi-color icons, no gradients, no shadows on body content.
- If the brand primary is fully saturated, desaturate it to fit the Distill register before mapping (e.g. `#3b82f6` brand blue → `#81bee4`-adjacent shade, kept under the Distill saturation ceiling). State this transformation explicitly in the rationale so the user can override if they reject the desaturation.

Output location:

- Default: return the three deliverables inline in the response (the user typically copy-pastes the override CSS into their app and applies the voice/component notes manually).
- If the user explicitly asks for a file, write the override CSS to `plugins/distill-design/tokens/<brand-slug>.css` so it sits next to the canonical `colors_and_type.css` and can be `@import`-ed after it.

Pushback expectations:

- Distill has no first-class card, sidebar, multi-column dashboard, or notification toast primitive. If the user's surface expects those, surface this trade-off in the rationale before producing the mapping. Do not invent a "Distill card" — propose the figure-container alternative and let the user accept or reject.
- If the brand demands gradients, glassmorphism, fully saturated primaries, or large drop shadows, state plainly that those violate the system and offer the closest in-system alternative. The user can override, but they should override knowingly.

Verification:

- After producing the override CSS, verify the brand primary mapping makes sense by mentally rendering one paragraph of body text plus one button using the new tokens. If the result reads as off-brand for the user (too far from their primary), flag it.
- For voice rewrites, read each output back against the canonical paragraph in `DESIGN-SYSTEM.md` § "Content fundamentals". If the rewrite reads more like marketing copy than that paragraph, redo it.
