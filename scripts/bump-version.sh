#!/bin/bash
# bump-version.sh - Sync the version string across all manifests.
#
# Usage:
#   ./scripts/bump-version.sh 0.2.0           # apply
#   ./scripts/bump-version.sh 0.2.0 --dry-run # preview without writing

set -e

if [ -z "$1" ]; then
    echo "usage: $0 <new-version> [--dry-run]" >&2
    echo "       $0 0.2.0" >&2
    exit 1
fi

NEW_VERSION="$1"
DRY_RUN=0
[ "$2" = "--dry-run" ] && DRY_RUN=1

# Validate semver (major.minor.patch, optional pre-release suffix)
if ! [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$ ]]; then
    echo "error: '$NEW_VERSION' is not a valid semver string (expected X.Y.Z or X.Y.Z-suffix)" >&2
    exit 1
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG="$REPO_ROOT/package.json"
MARKET="$REPO_ROOT/.claude-plugin/marketplace.json"
MARKET_PLUGIN="$REPO_ROOT/.claude-plugin/plugin.json"
PLUGIN="$REPO_ROOT/plugins/distill-design/.claude-plugin/plugin.json"

for f in "$PKG" "$MARKET" "$MARKET_PLUGIN" "$PLUGIN"; do
    [ -f "$f" ] || { echo "error: missing $f" >&2; exit 1; }
done

echo "Bumping version to $NEW_VERSION"
[ "$DRY_RUN" = 1 ] && echo "(dry-run — no files will be written)"
echo ""

bump() {
    local file="$1"
    local jq_filter="$2"
    local current new
    current="$(python3 -c "import json,sys; d=json.load(open('$file')); print($jq_filter)")"
    if [ "$current" = "$NEW_VERSION" ]; then
        echo "  $file: already $NEW_VERSION (no change)"
        return
    fi
    echo "  $file: $current -> $NEW_VERSION"
    if [ "$DRY_RUN" = 0 ]; then
        python3 -c "
import json
with open('$file') as fh: d = json.load(fh)
$jq_filter_set
with open('$file', 'w') as fh:
    json.dump(d, fh, indent=2)
    fh.write('\n')
"
    fi
}

# package.json: top-level "version"
echo "package.json:"
jq_filter_set="d['version'] = '$NEW_VERSION'"
bump "$PKG" "d['version']"

# marketplace.json: top-level metadata.version + plugins[0].version
echo "marketplace.json:"
jq_filter_set="d['metadata']['version'] = '$NEW_VERSION'"
bump "$MARKET" "d['metadata']['version']"
jq_filter_set="d['plugins'][0]['version'] = '$NEW_VERSION'"
bump "$MARKET" "d['plugins'][0]['version']"

# .claude-plugin/plugin.json: marketplace wrapper manifest, top-level "version"
echo ".claude-plugin/plugin.json:"
jq_filter_set="d['version'] = '$NEW_VERSION'"
bump "$MARKET_PLUGIN" "d['version']"

# plugins/distill-design/.claude-plugin/plugin.json: top-level "version"
echo "plugins/distill-design/.claude-plugin/plugin.json:"
jq_filter_set="d['version'] = '$NEW_VERSION'"
bump "$PLUGIN" "d['version']"

echo ""
if [ "$DRY_RUN" = 1 ]; then
    echo "Dry-run complete. Re-run without --dry-run to apply."
else
    echo "Done. Next steps:"
    echo "  1. Add a '## [$NEW_VERSION] - $(date +%Y-%m-%d)' section to CHANGELOG.md"
    echo "  2. git commit -am \"release: $NEW_VERSION\""
    echo "  3. git tag -a v$NEW_VERSION -m \"Release $NEW_VERSION\""
    echo "  4. git push && git push --tags"
    echo "  (the release workflow at .github/workflows/release.yml will create the GitHub Release automatically)"
fi
