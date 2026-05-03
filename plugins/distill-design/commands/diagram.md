---
description: Generate a single Distill-style SVG diagram, picking the right primitive file from the topic.
---
Load the distill-design skill, then produce one Distill-style SVG diagram for the subject in $@.

Workflow:

1. Read `plugins/distill-design/SKILL.md` decision tree and pick the matching primitive file. Quick map:
   - RL grid / cliffworld / value function / policy → `ui_kits/article/RL.tsx` (`GridWorld`, `ValueHeatmap`, `PolicyArrows`)
   - Beam search / HMM / debate tree / generic graph → `ui_kits/article/Graph.tsx` (`GraphNode`, `GraphEdge`, `BeamSearchTree`, `DebateTree`, `HMMState`)
   - Attention weights / CTC alignment / Game of Life / LSTM-GRU recurrence / variable tensor / convolution → `ui_kits/article/Heatmap.tsx` (`AttentionHeatmap`, `CellGrid`, `RecurrentArrow`, `VariableTensor`, `ConvGrid`)
   - Molecule / cellular automata / Feynman / annotated raster / boxplot → `ui_kits/article/Specialized.tsx` (`MoleculeViewer`, `AutomataGrid`, `FeynmanDiagram`, `ImageWithAnnotations`, `DistillBoxplot`)
   - FiLM-style conditioning (concat / bias / scaling / fan-out network) → `ui_kits/article/Diagrams.tsx` + `Primitives.tsx`
   - Generic from scratch → compose `Primitives.tsx` (`TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph`)
2. State the chosen primitive(s) in one line before generating, so the user can correct you cheaply.
3. Output a single self-contained SVG file (not TSX). The SVG must declare its own `<style>` block with the system sans stack from DESIGN-SYSTEM.md § "Fonts", define any `<symbol>` it needs in its own `<defs>`, and not depend on cross-file `<use href>` — see hard constraints below.
4. If the diagram needs a service icon (DNS, compute, database, etc.), inline-copy the matching `<symbol>` block from `plugins/distill-design/resources/diagrams/_service-icons.svg` into the SVG's own `<defs>`. The library currently has 29 symbols, all `service-<slug>` namespaced.

Output location:

- Default: `plugins/distill-design/resources/diagrams/<slug>.svg` (slug = lowercased, hyphenated topic).
- If the user asks for paste-ready output for a one-off (chat, README snippet), return the SVG inline in the response and skip the file write.

Hard constraints (non-negotiable):

- English only. Do not translate labels.
- No emoji. No multi-color icons. No gradients, no filters, no shadows.
- Strokes 1.5–2px in `#666` with `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"` unless intentional.
- Diagram palette defaults to salmon `#e49381` (data), powder-blue `#81bee4` (conditioning), lavender `#b8a8d8` (attention/memory). Use the extended palette (navy, penalty red, debate orange/blue, olive, burgundy, slate) only when the domain demands the semantic — see DESIGN-SYSTEM.md § "Extended palette".
- Solid arrows for primary flow, dashed (`stroke-dasharray="3 3"`) for optional / attention / observability paths.
- No `<use href="../_service-icons.svg#...">` cross-file refs — GitHub renders SVGs via `<img src>` which sandboxes external refs, and `file://` blocks them too. Always inline-copy the `<symbol>` into the consumer SVG's `<defs>`.
- No year literals in label text or `<title>` / `<desc>`.

Verification:

- Open the SVG with `chrome-devtools` (file:// is fine for SVGs that are inline-self-contained) and screenshot. Check the user-facing labels render with the system sans, not Times-fallback. Surface any visual issues actively rather than claiming success.
