# Distill Design System

![Distill Design System cover](plugins/distill-design/resources/covers/distill-design-system.svg)

A Claude Skill that codifies the visual and editorial conventions of [Distill.pub](https://distill.pub), the web-native ML research journal archived in 2021.

The system targets the modern article template in use 2017–2021. Tokens, component sizes, link styling, and stroke palette were validated against live `distill.pub` via a 10-article DOM audit. The 2016 outlier — Georgia serif body, custom `<dt-article>` element — is out of scope.

## Capabilities

Coverage spans the full Distill 2017–2021 corpus — 10 articles, 131 source figures audited and distilled into reusable primitives.

| Category | Prompt | Output |
|---|---|---|
| Editorial in Distill voice | *"Write a long-form on [topic] in Distill style"* | Article with TOC, hover citations, math, 7-section canonical footer |
| Editorial in Distill voice | *"Rewrite this paragraph in Distill voice"* | First-person plural, no marketing superlatives, no exclamation points, math-verbs verbed |
| Diagrams — core | *"Diagram an attention mechanism over memory"* | Composed primitives: `TensorVector`, `Arrow`, `OperatorNode`, `SubNetBlock`, `PointerGlyph`, on the salmon/blue/lavender palette |
| Diagrams — FiLM | *"Visualize this model FiLM-style"* | Pre-built scenes — concat, bias, scaling, FiLM-network, interactive scrubber |
| Diagrams — RL | *"Show a cliffworld with the optimal policy and value function"* | `GridWorld` for cells, paths, agents, goal and penalty cells; `ValueHeatmap` for opacity-encoded V(s) and Q(s,a); `PolicyArrows` for 4-direction stochastic policy |
| Diagrams — graphs and trees | *"Beam search lattice for CTC"* / *"Argumentation tree"* | `GraphNode`, `GraphEdge`; `BeamSearchTree` with active, pruned and neutral states; `DebateTree` with claim and counter sides; `HMMState` with subscript labels |
| Diagrams — sequence and attention | *"Attention heatmap over tokens"* / *"CTC alignment matrix"* | `AttentionHeatmap` — 1D, opacity-modulated; `CellGrid` for CTC DP and Game of Life; `RecurrentArrow` for LSTM/GRU feedback; `VariableTensor` with per-cell width |
| Diagrams — CNN | *"Receptive field with stride 2 padding 1"* | `ConvGrid` — input grid, kernel overlay, padding ring, output cell linkage; output size auto-computed |
| Diagrams — specialized | *"Benzene molecule"* / *"e+ e− → q q̄ Feynman diagram"* / *"Game of Life evolution"* / *"GNN validation accuracy boxplot"* | `MoleculeViewer`, `FeynmanDiagram`, `AutomataGrid`, `DistillBoxplot`, `ImageWithAnnotations` for raster overlays with categorical circles |
| Cloud architecture | *"Multi-region observability diagram"* | Hand-drawn vendor-agnostic SVG using the `service-<slug>` line-art icon library — 29 symbols across edge, compute, data, messaging, observability, networking, storage, identity |
| Slide decks | *"8-slide deck on [paper]"* | Paper-warm background, system sans, one idea per slide, figure breakouts, citations at the foot |
| Product styling | *"Style my dashboard like Distill"* | Drop-in `tokens/colors_and_type.css` tokens; TSX components copy-paste-ready |
| Product styling | *"Convert this brand to a scholarly-editorial system"* | Brand-to-token mapping with diagram primitives |
| Mockups | *"Quick mockup of [feature]"* | Standalone HTML artifact |
| Mockups | *"Lay out 6 variants side-by-side"* | Uses [templates/design-canvas.tsx](plugins/distill-design/templates/design-canvas.tsx) — pan, zoom, drag-reorder, focus mode |
| Mockups | *"Add a live tweaks panel for primary color and font size"* | Uses [templates/tweaks-panel.tsx](plugins/distill-design/templates/tweaks-panel.tsx) — floating panel, postMessage-persisted |
| Visual reference | *"Show me how Distill diagrams [concept]"* | 131 source figures from 10 articles in [sources/](plugins/distill-design/sources/) |

## Examples

Reference architecture diagrams in the system's visual language — vendor-agnostic, hand-drawn line art, paper-warm palette, dashed arrows for failover, replication, and observability.

### Multi-region observability

![Multi-region observability architecture](plugins/distill-design/resources/diagrams/multi-region-observability.svg)

[`plugins/distill-design/resources/diagrams/multi-region-observability.svg`](plugins/distill-design/resources/diagrams/multi-region-observability.svg) — multi-region AWS architecture in four bands. EDGE: Route 53 failover routing with per-region health checks, fronted by CloudFront. COMPUTE: two regions, sa-east-1 PRIMARY and us-east-1 SECONDARY, each with ALB → Auto-Scaling Group → 2 EC2 → RDS. CLOUDWATCH: metrics, logs, alarms, EventBridge, dashboard. NOTIFICATIONS: SNS fanning to email and a Lambda Slack notifier.

### Multi-tier app with RDS

![Multi-tier app with RDS Multi-AZ and read replica](plugins/distill-design/resources/diagrams/multi-tier-rds.svg)

[`plugins/distill-design/resources/diagrams/multi-tier-rds.svg`](plugins/distill-design/resources/diagrams/multi-tier-rds.svg) — three-tier app on AWS with RDS Multi-AZ and Read Replica. Users → Route 53 → Application Load Balancer in the public subnet → EC2 A and B in private subnets → RDS Primary in sa-east-1a, PostgreSQL. Multi-AZ Standby in sa-east-1b via synchronous replication; Read Replica in sa-east-1c via asynchronous replication. RDS Automated Backups with 7-day retention, S3 Manual Snapshots, CloudWatch metrics and alarms.

## Install

### Claude Code marketplace

```bash
/plugin marketplace add geo-mena/distill
/plugin install distill-design@distill-design-marketplace
```

Restart Claude Code. Invoke with `/distill-design`, or describe an editorial or diagrammatic task — the skill activates by description match.

### Claude Code local symlink

```bash
./scripts/install-claude.sh
```

Symlinks `plugins/distill-design/` to `~/.claude/skills/distill-design`. For iteration on the skill itself.

### Other agents

Per-tool adapters under [configs/](configs/): [Codex](configs/codex/AGENTS.md), [Cursor](configs/cursor/distill-design.mdc), [OpenCode](configs/opencode/AGENTS.md), [OpenClaw](configs/openclaw/AGENTS.md), [Pi](configs/pi/AGENTS.md). Each adapter points the target agent to the canonical skill at `plugins/distill-design/`.

## Repository map

| Path | Purpose |
|---|---|
| [plugins/distill-design/SKILL.md](plugins/distill-design/SKILL.md) | Skill manifest, read by Claude on invocation |
| [plugins/distill-design/DESIGN-SYSTEM.md](plugins/distill-design/DESIGN-SYSTEM.md) | Design rules — voice, color, typography, iconography, caveats |
| [plugins/distill-design/tokens/colors_and_type.css](plugins/distill-design/tokens/colors_and_type.css) | CSS variables — three palettes, type scale, spacing, radii, shadows, motion |
| [plugins/distill-design/fonts/](plugins/distill-design/fonts/) | Geist Pixel Square, mono only. Body and display use the OS system sans stack |
| [plugins/distill-design/assets/](plugins/distill-design/assets/) | Pointer-glyph SVG, wordmark SVG, [iconography rules](plugins/distill-design/assets/ICONOGRAPHY.md) |
| [plugins/distill-design/ui_kits/article/](plugins/distill-design/ui_kits/article/) | Article reader — `Primitives.tsx`, `Chrome.tsx`, `Diagrams.tsx`, `RL.tsx`, `Graph.tsx`, `Heatmap.tsx`, `Specialized.tsx`, plus the assembled `index.html` |
| [plugins/distill-design/templates/](plugins/distill-design/templates/) | Author tools — `design-canvas.tsx`, `tweaks-panel.tsx` |
| [plugins/distill-design/preview/](plugins/distill-design/preview/) | 48 reference cards, one per token or component |
| [plugins/distill-design/sources/](plugins/distill-design/sources/) | 131 source figures from 10 Distill articles |
| [plugins/distill-design/resources/diagrams/](plugins/distill-design/resources/diagrams/) | Output diagrams and the `_service-icons.svg` line-art icon library, 29 vendor-agnostic symbols |
| [.claude-plugin/](.claude-plugin/) | Plugin manifest and marketplace metadata |
| [configs/](configs/) | Per-agent adapters — Codex, Cursor, OpenCode, OpenClaw, Pi |
| [scripts/](scripts/) | `install-claude.sh` for the Claude Code symlink, `bump-version.sh` for releases |

## Out of scope

- Emoji.
- Marketing superlatives — "revolutionary", "powerful", "game-changing".
- Exclamation points in body text.
- Gradients, glassmorphism, fixed or sticky elements in articles.
- Simplification of math notation. Density is part of the identity.
- Multi-color or filled icons.
- 2016 Distill template.
