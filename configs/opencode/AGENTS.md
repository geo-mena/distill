Use the canonical `distill-design` skill from `plugins/distill-design/`.

For OpenCode/opencode, the observed native skill path is `~/.config/opencode/skill/distill-design`. Copy the contents of `plugins/distill-design/` there.

Activate by asking OpenCode to use the `distill-design` skill for editorial articles, hand-drawn diagrams, cloud-architecture SVGs, slide decks, dashboard styling in Distill voice, or voice transformations. The skill expects to find tokens at `tokens/colors_and_type.css`, primitives at `ui_kits/article/Primitives.tsx`, the line-art icon library at `resources/diagrams/_service-icons.svg`, and 131 source figures in `sources/`.

Command-template behavior is build-dependent. The canonical skill docs and decision tree live in `plugins/distill-design/SKILL.md`; deep rules (color, typography, voice, iconography) in `plugins/distill-design/DESIGN-SYSTEM.md`. The article kit requires HTTP (`python3 -m http.server`); `file://` blocks Babel standalone XHR.
