Use the canonical `distill-design` skill from `plugins/distill-design/`.

OpenClaw support is lightweight rules guidance, not a native plugin adapter. Point the agent at `plugins/distill-design/SKILL.md` and ask it to follow that workflow when producing Distill-style editorial articles, hand-drawn diagrams, cloud-architecture SVGs, slide decks, or dashboard styling.

Hard constraints come from `plugins/distill-design/SKILL.md` § "Hard constraints" and `plugins/distill-design/DESIGN-SYSTEM.md`: paper-warm `#fdfdfd` background, system sans for body and display, salmon/blue/lavender diagram palette, hand-drawn 1.5–2px `#666` strokes with rounded caps, no emoji, no gradients, no fixed elements.

If OpenClaw does not support command templates, read `plugins/distill-design/SKILL.md` end-to-end. The article kit at `plugins/distill-design/ui_kits/article/index.html` needs HTTP (`python3 -m http.server`) — `file://` blocks Babel standalone.
