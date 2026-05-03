---
description: Generate a vendor-agnostic cloud architecture SVG using the bespoke service icon library.
---
Load the distill-design skill, then produce a cloud architecture SVG for the system described in $@.

Workflow:

1. Read `plugins/distill-design/SKILL.md` decision tree row "Cloud architecture diagram" and `plugins/distill-design/DESIGN-SYSTEM.md` § "Service icons for architecture diagrams" before drawing. The category→color mapping and the missing-icon protocol live there.
2. Identify every service in the brief. For each, find the matching `<symbol id="service-<slug>">` in `plugins/distill-design/resources/diagrams/_service-icons.svg`. The library has 29 vendor-agnostic icons across EDGE & DNS, NETWORKING, COMPUTE, STORAGE, DATA, IDENTITY, MESSAGING, OBSERVABILITY, EXTERNAL SINKS. If a service is missing, either map it to the closest existing icon (e.g. AWS Lambda → `service-function`, GCP Pub/Sub → `service-pubsub`, BigQuery → `service-database` for now) or follow the missing-icon protocol in DESIGN-SYSTEM.md to draw a new 24×24 thin-stroke symbol and add it to the library before consuming it.
3. Inline-copy every needed `<symbol>` block byte-for-byte from `_service-icons.svg` into the consumer SVG's own `<defs>`. Reference each symbol via `<use href="#service-<slug>" width="20" height="20"/>` inside its enclosing block. Do not use cross-file `<use href="../_service-icons.svg#...">` — GitHub `<img src>` and `file://` both block it.
4. Lay out the architecture in horizontal bands or boxed regions: EDGE → NETWORKING → COMPUTE → DATA → OBSERVABILITY, with region/VPC/account boundaries as paper-fill `#fdfdfd` rectangles with a `#d8d8d4` 1px hairline and a 12px uppercase `#6a6a6a` letter-spacing 0.1em label in the corner.
5. Use `plugins/distill-design/resources/diagrams/multi-region-observability.svg` as the canonical layout reference; `cloudflare-tunnel-routing.svg` and `multi-tier-rds.svg` as secondary references.

Color rules (from DESIGN-SYSTEM.md § "Service icons for architecture diagrams"):

- Color goes on the enclosing block, never on the icon stroke. Icon stroke stays `#666` regardless.
- Edge / CDN / compute / orchestration (DNS, CDN, load balancer, autoscaler, compute, function, container, kubernetes, api-gateway) → block fill `#d6e4f3`, block stroke `#356aa8`.
- Data / endpoints (database, nosql, object-storage, block-storage, cache, pub/sub, queue, email, slack) → block fill `#fdecea` or `#fbd9d4`, block stroke `#c44a3f`.
- Observability (metrics, logs, alarms, events, dashboard) → block fill `#ddd9ee`, block stroke `#b8a8d8`.
- Region / VPC / account boundary → paper fill `#fdfdfd`, hairline `#d8d8d4`, label as above.

Arrow rules:

- Solid `#666` 1.5px arrow for primary data flow.
- Dashed `stroke-dasharray="3 3"` for failover, observability bus, monitoring scrape, async fanout. Label dashed arrows in 10px italic `#6a6a6a` next to the line.

Output location:

- Always: `plugins/distill-design/resources/diagrams/<slug>.svg`. Slug from the architecture purpose, not the vendor (e.g. `multi-az-web-app.svg`, not `aws-web-app.svg`).
- Include a `<title>` and `<desc>` element at the top of the SVG narrating the bands and flow, mirroring `multi-region-observability.svg`.

Hard constraints (non-negotiable):

- English only.
- Never import vendor-official AWS / GCP / Azure / Cloudflare icons. They violate the no-multi-color, no-fill, low-saturation rules. Always use the bespoke `service-<slug>` library.
- No emoji. No multi-color icons. No gradients, no shadows. Stroke `#666` 1.5px rounded caps for icons; block strokes per the category color above.
- No year literals anywhere in the SVG (`<title>`, `<desc>`, labels).
- Body / label color `#2a2a2a` or `#6a6a6a`; never pure `#000`.

Verification:

- Open the SVG with `chrome-devtools` and screenshot. The user has caught icon misalignment and stroke-color drift visually before. Run `chrome-devtools list_console_messages` to surface any `<use>` resolution warnings.
- If a new symbol was added to `_service-icons.svg`, also re-screenshot any existing diagram that uses adjacent symbols to confirm no regression.
