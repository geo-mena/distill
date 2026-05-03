# Contributing

Thanks for considering a contribution. AI / vibe-coded PRs are welcome — we built this Skill with Claude and use it daily — but they go through the same bar as any other PR.

## How to propose a change

1. Open an issue first if the change is non-trivial (new primitive, breaking change, scope expansion). Small fixes can skip this.
2. Fork, branch from `main`, work in a clean topic branch named like `fix/conv-grid-padding-overflow` or `feat/scatter-overlay-primitive`.
3. Open a PR against `main`. Reference the issue if there is one.

## Code and prose conventions

| Aspect | Rule |
|---|---|
| Code, comments, commit messages, docs | English |
| Commit message style | Conventional-ish prefixes (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `release:`). Body explains the *why*, not the *what* |
| Co-authored-by trailer | **Do not** add `Co-Authored-By: Claude ...` lines to commits — keep authorship clean |
| Tone in user-facing prose (README, public docs) | Principal-Engineer register: state facts, no evaluative adjectives ("robust", "comprehensive", "elegant"), no marketing superlatives |
| Year literals in user-facing prose | Avoid (`2017–2021`, `archived in 2021`). Substitute with timeless qualifiers ("now-archived", "modern", "earlier") |
| Emoji | Never in code, files, or rendered output |
| Year literals in `CHANGELOG.md` | OK — date provenance matters there |

## Adding or changing a Distill primitive

1. Read [plugins/distill-design/SKILL.md](plugins/distill-design/SKILL.md) and [plugins/distill-design/DESIGN-SYSTEM.md](plugins/distill-design/DESIGN-SYSTEM.md) first. The system has hard constraints (no emoji, no gradients, body color `rgba(0,0,0,0.8)`, strokes 1.5–2px in `#666` with rounded caps, etc.) — break them only with explicit justification in the PR.
2. Match the existing TSX style in [plugins/distill-design/ui_kits/article/Primitives.tsx](plugins/distill-design/ui_kits/article/Primitives.tsx): typed `Props` interface, sensible defaults, inline SVG, file ends with `Object.assign(window as any, { ... })`. No `import`/`export`.
3. Add a preview card under `plugins/distill-design/preview/components-<group>-<name>.html` matching the standalone HTML pattern (raw SVG, italic intro, 2–4 variants in `.row .gap-8`).
4. Update `SKILL.md` (file table + decision tree entry) and `DESIGN-SYSTEM.md` (extended-primitives table) so the new primitive is discoverable.

## Local testing

```bash
cd plugins/distill-design
python3 -m http.server 8765
```

Open `http://localhost:8765/ui_kits/article/index.html` for the article kit, or `http://localhost:8765/preview/<card>.html` for a specific component preview. The kit needs HTTP because Babel standalone fetches `.tsx` files via XHR; `file://` is blocked by CORS.

For visual verification of SVG output, prefer `chrome-devtools` over `curl`. A `curl` 200 only confirms the file is reachable; it does not resolve `@font-face` or other relative `url()` inside CSS, so layout regressions hide.

## Releases

Releases are cut by maintainers and published automatically via [.github/workflows/release.yml](.github/workflows/release.yml) when a `v*` tag is pushed.

```bash
./scripts/bump-version.sh 0.X.Y       # syncs version across the 4 manifests
# add a "## [0.X.Y] - YYYY-MM-DD" section to CHANGELOG.md
git commit -am "release: 0.X.Y"
git tag -a v0.X.Y -m "Release 0.X.Y"
git push && git push --tags
```

The workflow validates that all manifests match the tag and extracts the matching CHANGELOG section as the GitHub Release body. If versions are out of sync, the workflow fails — `bump-version.sh` is the single source of truth.
