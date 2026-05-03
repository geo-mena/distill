Use the canonical `distill-design` skill from `plugins/distill-design/`.

For Codex CLI, copy the skill to `~/.codex/skills/distill-design`. The skill reads `SKILL.md`, `DESIGN-SYSTEM.md`, and the assets under `tokens/`, `templates/`, `ui_kits/`, `preview/`, `resources/`, `sources/`, `fonts/`, `assets/`.

Activate by asking Codex to use `$distill-design` or the `distill-design` skill before writing editorial-style articles, diagram SVGs, slide decks, dashboard styling, or voice transformations. Generated artifacts go to whichever path the user requests; defaults match what `SKILL.md` decision tree specifies (`resources/diagrams/<slug>.svg`, `resources/covers/<slug>.svg`).

Command-template support varies by Codex version. If prompts are unavailable, read `plugins/distill-design/SKILL.md` and follow its workflow manually. The article kit at `plugins/distill-design/ui_kits/article/index.html` requires HTTP serving (Babel standalone XHR + `file://` CORS) — use `python3 -m http.server` from the plugin root.
