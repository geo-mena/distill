Use the canonical `distill-design` skill from `plugins/distill-design/`.

For Pi, prefer `pi install git:github.com/geo-mena/distill-design-system` or install a local checkout with `pi install ./distill-design-system`. The package metadata points to `./plugins/distill-design` for the skill.

Do not keep manual installer copies alongside a package install. If a previous symlink or copy exists at `~/.pi/agent/skills/distill-design`, remove it before relying on the package.

Activate with `$distill-design` after restarting Pi. The skill covers Distill-style editorial articles, hand-drawn diagrams, cloud-architecture SVGs, slide decks, dashboard styling, and voice transformations. Tokens live at `tokens/colors_and_type.css`; TSX primitives at `ui_kits/article/Primitives.tsx`; line-art icon library at `resources/diagrams/_service-icons.svg`; 131 source figures from 10 Distill articles in `sources/`.

The article kit requires HTTP (`python3 -m http.server` from the plugin root); `file://` blocks Babel standalone XHR.
