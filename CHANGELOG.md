# Changelog

## [0.1.0] - 2026-05-03

### Initial public release

A Claude Skill that codifies Distill.pub's visual and editorial conventions: paper-warm `#fdfdfd` background, system sans throughout, salmon/blue/lavender diagram palette, hand-drawn 1.5–2px `#666` strokes with rounded caps. Tokens, primitives, and stroke palette validated against live `distill.pub` via a 10-article DOM audit.

### Plugin packaging
- Claude Code marketplace structure: `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` (root); `plugins/distill-design/.claude-plugin/plugin.json` (skill).
- Pi package metadata in `package.json` so `pi install git:github.com/geo-mena/distill` loads the canonical `plugins/distill-design/` skill.
- Per-tool adapter docs under `configs/`: Codex CLI, Cursor, OpenCode/opencode, OpenClaw, Pi.
- `install-claude.sh` for one-command local symlink to `~/.claude/skills/distill-design`.
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
