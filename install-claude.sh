#!/bin/bash
# install-claude.sh - Install distill-design as a Claude Code skill via symlink

set -e

SKILL_DIR="$HOME/.claude/skills/distill-design"
REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_DIR="$REPO_ROOT/plugins/distill-design"

if [ ! -f "$PLUGIN_DIR/SKILL.md" ]; then
    echo "error: $PLUGIN_DIR/SKILL.md not found. Run this from the repo root." >&2
    exit 1
fi

mkdir -p "$(dirname "$SKILL_DIR")"

if [ -L "$SKILL_DIR" ] || [ -e "$SKILL_DIR" ]; then
    echo "Removing existing $SKILL_DIR..."
    rm -rf "$SKILL_DIR"
fi

ln -s "$PLUGIN_DIR" "$SKILL_DIR"
echo "Symlinked $PLUGIN_DIR -> $SKILL_DIR"
echo ""
echo "Done. Invoke with /distill-design in any Claude Code session."
