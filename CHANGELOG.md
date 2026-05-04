# Changelog

## [0.4.0] - 2026-05-03

### Added

- **`/distill-design:brand-map`** slash command. Maps a product brand (primary color, accent, font preference, voice samples, target surface) onto Distill design tokens. Output: `:root { ... }` token-override CSS, component adapter notes (which existing primitives map to expected UI surfaces, with explicit pushback when Distill has no equivalent — cards, app-shell sidebars, multi-column dashboards), and a voice translation table. Closes the gap where the README's "Product styling" capability rows had no command.

### Documentation

- `SKILL.md` updates the commands table from 6 to 7 rows.
- `README.md` Commands section adds the `brand-map` row.

## [0.3.0] - 2026-05-03

### Slash commands

Six explicit slash commands wrap the most common workflows. Each is a Markdown prompt template under `plugins/distill-design/commands/` that loads the Skill and adds focused instructions plus the relevant hard constraints (no emoji, no superlatives, no year literals, English-only, palette and stroke rules).

| Command | What it does |
|---|---|
| `/distill-design:article` | Long-form article scaffold — TOC, hover citations, math, 7-section canonical footer |
| `/distill-design:diagram` | Single SVG diagram, with primitive-file selection guidance baked in |
| `/distill-design:cloud-arch` | Vendor-agnostic cloud architecture SVG using the `service-<slug>` icon library |
| `/distill-design:cover` | 1600×500 README cover banner in the article-hero pattern |
| `/distill-design:rewrite` | Text rewrite in Distill voice — first-person plural, no superlatives, sentence case |
| `/distill-design:slides` | 16:9 slide deck — one idea per slide, paper background, system sans |

The plugin manifest auto-discovers the `commands/` directory; no `plugin.json` change required.

### Documentation

- `SKILL.md` adds a "Six explicit slash commands" section above the decision tree, mapping each command to its purpose and noting that freeform requests still work via the decision tree below.

## [0.2.2] - 2026-05-03

### Coherence pass

After a Principal-Engineer audit comparing public surface (README) ↔ skill manifest (SKILL.md) ↔ deep rules (DESIGN-SYSTEM.md), two desynchronizations were corrected.

### Changed

- **`README.md` Capabilities**: extended from 11 to 16 rows. Now surfaces every domain the Skill actually covers post-v0.2.1: Diagrams (RL — `GridWorld`/`ValueHeatmap`/`PolicyArrows`), Diagrams (graphs/trees — `BeamSearchTree`/`DebateTree`/`HMMState`), Diagrams (sequence/attention — `AttentionHeatmap`/`CellGrid`/`RecurrentArrow`/`VariableTensor`), Diagrams (CNN — `ConvGrid`), Diagrams (specialized — `MoleculeViewer`/`FeynmanDiagram`/`AutomataGrid`/`DistillBoxplot`/`ImageWithAnnotations`), and Cloud architecture (the `service-<slug>` icon library). Previous Capabilities table only mentioned FiLM-style and core primitives — clients had no way to know the Skill spans the full corpus.
- **`SKILL.md` cloud-architecture decision-tree entry**: trimmed from ~280 words to ~80, delegating the full category→color mapping, missing-icon protocol, and rationale to `DESIGN-SYSTEM.md` § "Service icons for architecture diagrams" (which already has the canonical version). Saves ~140 tokens per Skill invocation; same information available on demand. Net SKILL.md size: 1468 → 1360 words.

## [0.2.1] - 2026-05-03

### Added

- **`ConvGrid`** primitive in `Heatmap.tsx` — convolutional kernel-stride-padding visualization. Renders an input grid (with optional dashed-hairline padding ring), an overlaid kernel rectangle, and an optional output grid linked back via a dashed connector. Auto-computes output size from `(input + 2·padding − kernel) / stride + 1`. Closes the receptive-field gap identified in the v0.2.0 corpus audit. Source: `computing-receptive-fields-01..08.svg`.
- Preview card `preview/components-heatmap-conv-grid.html` — two variants (stride 1 no padding; stride 2 padding 1).

### Documented

- 3 remaining single-figure corpus gaps (`ScatterOverlay`, `PipelineTeaser`, animation framework) flagged in `CLAUDE.md` "Open gaps / future work" with cost estimates and rationale for deferring — only worth implementing if a real use case appears. Skill scope decision applies the project rule against speculative primitives.

## [0.2.0] - 2026-05-03

### Full corpus distillation

Audit-driven expansion: the 131 source figures across the 10 Distill articles (2017–2021) were systematically catalogued and 17 new TSX primitives across 4 new files were added to capture the visual conventions that the FiLM-only initial release did not cover. The Skill now spans Reinforcement Learning, graphs/trees, attention/value heatmaps, recurrent feedback, chemistry, cellular automata, particle physics, raster overlays, and statistical charts.

### New primitives

- `RL.tsx` — `GridWorld` (cliffworld-style environment with cells, paths, agents, goal/penalty), `ValueHeatmap` (opacity-modulated V(s) / Q(s,a)), `PolicyArrows` (per-cell stochastic policy as 4 inward triangular arrows).
- `Graph.tsx` — `GraphNode` (state-aware circle with label), `GraphEdge` (straight or quadratic-bezier curved), `BeamSearchTree` (layered lattice), `DebateTree` (two-sided argumentation with claim/counter coloring), `HMMState` (subscript-aware state circle).
- `Heatmap.tsx` — `AttentionHeatmap` (1D opacity-encoded weights), `CellGrid` (2D grid for CTC DP / Game of Life), `RecurrentArrow` (curved bezier feedback for LSTM/GRU), `VariableTensor` (TensorVector with per-cell width).
- `Specialized.tsx` — `MoleculeViewer` (atoms + bonds with element-keyed colors), `AutomataGrid` (multi-generation cellular automaton sequence), `FeynmanDiagram` (fermion/photon/gluon line styles), `ImageWithAnnotations` (raster overlay with annotation circles), `DistillBoxplot` (statistical boxplot in Distill palette).

### Extended palette

12 new color tokens added to `tokens/colors_and_type.css`:
- `--navy-100/300/500/-stroke` (RL optimal-policy paths).
- `--penalty-100/300/500/-stroke` (RL cliff/penalty zones).
- `--debate-orange` `#ee4900` and `--debate-blue` `#008bee` (debate-tree adversarial sides; intentionally saturated).
- `--olive-100/300/500`, `--burgundy-100/300/500`, `--slate-100/300/500` (categorical palette extension for Building Blocks attribution channels and `ImageWithAnnotations` overlays).

### Documentation

- `SKILL.md` decision tree expanded with 12 new task entries mapping use cases to the new primitives and source figures.
- `DESIGN-SYSTEM.md` adds an "Extended palette" section (with the principled "opacity-modulation as encoding" exception to the no-gradient rule), and an "Extended primitives" section with per-file reference tables linking each primitive to its canonical source figure.
- 17 new preview cards under `preview/components-{rl,graph,heatmap,specialized}-*.html`.

## [0.1.0] - 2026-05-03

### Initial public release

A Claude Skill that codifies Distill.pub's visual and editorial conventions: paper-warm `#fdfdfd` background, system sans throughout, salmon/blue/lavender diagram palette, hand-drawn 1.5–2px `#666` strokes with rounded caps. Tokens, primitives, and stroke palette validated against live `distill.pub` via a 10-article DOM audit.

### Plugin packaging
- Claude Code marketplace structure: `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` (root); `plugins/distill-design/.claude-plugin/plugin.json` (skill).
- Pi package metadata in `package.json` so `pi install git:github.com/geo-mena/distill` loads the canonical `plugins/distill-design/` skill.
- Per-tool adapter docs under `configs/`: Codex CLI, Cursor, OpenCode/opencode, OpenClaw, Pi.
- `scripts/install-claude.sh` for one-command local symlink to `~/.claude/skills/distill-design`.
- MIT license.

### Skill content
- `tokens/colors_and_type.css` — drop-in CSS variables: 3 palettes, type scale 17/36/50, spacing, radii, shadows, motion.
- `templates/design-canvas.tsx` and `templates/tweaks-panel.tsx` — author tools (Figma-style canvas wrapper, floating live-tweak panel).
- `ui_kits/article/` — TSX primitives (`TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph`, `Citation`, `Figure`, `MathBlock`), chrome (`ArticleNav`, `ArticleHeader`, `TOCDrawer`, `ArticleFooter`), pre-built diagrams (`ConcatDiagram`, `BiasDiagram`, `ScalingDiagram`, `FiLMNetworkDiagram`, `FiLMScrubber`), plus a fully-assembled FiLM article (`index.html`).
- `resources/diagrams/_service-icons.svg` — line-art icon library, 29 vendor-agnostic `service-<slug>` symbols across EDGE & DNS, COMPUTE, DATA, MESSAGING, OBSERVABILITY, NETWORKING, STORAGE, IDENTITY, EXTERNAL SINKS.
- `preview/` — 30 reference cards, one per token or component.
- `sources/` — 131 source figures from 10 Distill articles (FiLM, Neural Turing Machines, Augmented RNNs, CTC, Building Blocks, Computing Receptive Fields, GNNs, Memorization in RNNs, Paths Perspective on Value Learning, Safety Needs Social Scientists, Activation Atlas).
- `fonts/GeistPixel-Square.woff2` — pixel mono for `<code>`/`<pre>` (flagged additive; Distill itself uses the platform mono stack).
- `assets/` — pointer-glyph SVG, wordmark SVG, iconography rules.

### Documentation
- `README.md` — public-facing capabilities table, install instructions (plugin marketplace + symlink + per-tool adapters), repository map.
- `plugins/distill-design/SKILL.md` — Claude-loaded skill manifest with quick orientation, file map, decision tree, and hard constraints.
- `plugins/distill-design/DESIGN-SYSTEM.md` — deep design rules: voice, color, typography, iconography, caveats.
