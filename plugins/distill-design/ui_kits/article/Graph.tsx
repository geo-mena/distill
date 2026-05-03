type NodeState = "active" | "pruned" | "neutral" | "highlight";

interface GraphNodeProps {
  cx: number;
  cy: number;
  r?: number;
  label?: string;
  state?: NodeState;
  fill?: string;
  stroke?: string;
  italic?: boolean;
  fontSize?: number;
}

function GraphNode({ cx, cy, r = 12, label, state = "neutral", fill, stroke, italic = false, fontSize = 16 }: GraphNodeProps) {
  const palette: Record<NodeState, { fill: string; stroke: string }> = {
    active:    { fill: "#a8c8e8", stroke: "#356aa8" },
    neutral:   { fill: "#fdfdfd", stroke: "#666" },
    pruned:    { fill: "#e8e8e4", stroke: "#c4c4c0" },
    highlight: { fill: "#fbd9d4", stroke: "#c44a3f" },
  };
  const f = fill || palette[state].fill;
  const s = stroke || palette[state].stroke;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={f} stroke={s} strokeWidth="1.5" />
      {label && (
        <text x={cx} y={cy} fontFamily="var(--font-sans)" fontSize={fontSize}
              fontStyle={italic ? "italic" : "normal"}
              fill="#2a2a2a" textAnchor="middle" dominantBaseline="central">{label}</text>
      )}
    </g>
  );
}

interface GraphEdgeProps {
  x1: number; y1: number;
  x2: number; y2: number;
  curve?: number;
  dashed?: boolean;
  arrow?: "none" | "end" | "both";
  color?: string;
  width?: number;
  highlighted?: boolean;
}

function GraphEdge({ x1, y1, x2, y2, curve = 0, dashed = false, arrow = "none", color = "#666", width = 1.5, highlighted = false }: GraphEdgeProps) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const cx = mx + px * curve;
  const cy = my + py * curve;
  const d = curve === 0 ? `M ${x1} ${y1} L ${x2} ${y2}` : `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  const sw = highlighted ? 2.5 : width;
  const op = highlighted ? 0.85 : 0.4;

  // Arrowhead geometry: tangent at endpoint
  const arrowSize = 7;
  function head(ax: number, ay: number, fromX: number, fromY: number) {
    const adx = ax - fromX;
    const ady = ay - fromY;
    const al = Math.sqrt(adx * adx + ady * ady) || 1;
    const ux = adx / al;
    const uy = ady / al;
    const bx = ax - ux * arrowSize;
    const by = ay - uy * arrowSize;
    const lx = bx + (-uy) * (arrowSize * 0.5);
    const ly = by + (ux) * (arrowSize * 0.5);
    const rx = bx - (-uy) * (arrowSize * 0.5);
    const ry = by - (ux) * (arrowSize * 0.5);
    return `${ax},${ay} ${lx},${ly} ${rx},${ry}`;
  }
  const tangentSrc = curve === 0 ? { x: x1, y: y1 } : { x: cx, y: cy };

  return (
    <g opacity={op}>
      <path d={d} fill="none" stroke={color} strokeWidth={sw}
            strokeDasharray={dashed ? "4 3" : "none"} strokeLinecap="round" />
      {(arrow === "end" || arrow === "both") && (
        <polygon points={head(x2, y2, tangentSrc.x, tangentSrc.y)} fill={color} />
      )}
      {arrow === "both" && (
        <polygon points={head(x1, y1, tangentSrc.x, tangentSrc.y)} fill={color} />
      )}
    </g>
  );
}

interface BeamLayerNode {
  id: string;
  label?: string;
  state?: NodeState;
  italic?: boolean;
}
interface BeamLayer {
  nodes: BeamLayerNode[];
}
interface BeamEdge {
  from: string;
  to: string;
  highlighted?: boolean;
}

interface BeamSearchTreeProps {
  width?: number;
  height?: number;
  layers: BeamLayer[];
  edges: BeamEdge[];
  nodeRadius?: number;
}

function BeamSearchTree({ width = 700, height = 280, layers, edges, nodeRadius = 12 }: BeamSearchTreeProps) {
  const padX = 40;
  const padY = 30;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const stepX = layers.length > 1 ? innerW / (layers.length - 1) : 0;

  const positions: Record<string, { x: number; y: number; node: BeamLayerNode }> = {};
  layers.forEach((layer, li) => {
    const n = layer.nodes.length;
    layer.nodes.forEach((node, ni) => {
      const x = padX + li * stepX;
      const y = n === 1 ? padY + innerH / 2 : padY + (ni * innerH) / (n - 1);
      positions[`${li}:${node.id}`] = { x, y, node };
    });
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ flexShrink: 0 }}>
      {edges.map((e, i) => {
        const a = positions[e.from];
        const b = positions[e.to];
        if (!a || !b) return null;
        return <GraphEdge key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} highlighted={e.highlighted} />;
      })}
      {Object.entries(positions).map(([key, p]) => (
        <GraphNode key={key} cx={p.x} cy={p.y} r={nodeRadius}
                   label={p.node.label} state={p.node.state} italic={p.node.italic} />
      ))}
    </svg>
  );
}

interface DebateBranch {
  side: "claim" | "counter";
  label: string;
  bold?: boolean;
  children?: DebateBranch[];
}

interface DebateTreeProps {
  width?: number;
  height?: number;
  rootClaim: string;
  branches: DebateBranch[];
  nodeKind?: "dot" | "pill";
}

function DebateTree({ width = 1000, height = 350, rootClaim, branches, nodeKind = "dot" }: DebateTreeProps) {
  const colors = { claim: "#ee4900", counter: "#008bee" };

  // Compute leaf count per subtree to allocate horizontal space.
  function leafCount(b: DebateBranch): number {
    if (!b.children || b.children.length === 0) return 1;
    return b.children.reduce((s, c) => s + leafCount(c), 0);
  }
  const totalLeaves = branches.reduce((s, b) => s + leafCount(b), 0) || 1;

  // Compute max depth to set vertical step.
  function depth(b: DebateBranch): number {
    if (!b.children || b.children.length === 0) return 1;
    return 1 + Math.max(...b.children.map(depth));
  }
  const maxDepth = branches.length === 0 ? 1 : Math.max(...branches.map(depth));
  const padTop = 40;
  const padBottom = 30;
  const rootY = padTop;
  const stepY = (height - padTop - padBottom - 30) / Math.max(maxDepth, 1);

  // Layout: assign x-center per branch using leaf-fraction allocation.
  type Placed = {
    branch: DebateBranch;
    x: number;
    y: number;
    children: Placed[];
  };

  const padX = 40;
  const innerW = width - padX * 2;

  function place(b: DebateBranch, level: number, leftLeaves: number, parentLeaves: number, parentX: number, parentSpan: number): Placed {
    const lc = leafCount(b);
    const x = parentX + ((leftLeaves + lc / 2) / parentLeaves) * parentSpan - parentSpan / 2;
    const y = rootY + (level + 1) * stepY;
    let acc = 0;
    const childSpan = (lc / parentLeaves) * parentSpan;
    const childLeftEdge = x;
    const children: Placed[] = (b.children || []).map((c) => {
      const cl = leafCount(c);
      const placed = place(c, level + 1, acc, lc, x, childSpan);
      acc += cl;
      return placed;
    });
    return { branch: b, x, y, children };
  }

  const rootX = width / 2;
  let acc = 0;
  const placed: Placed[] = branches.map((b) => {
    const lc = leafCount(b);
    const p = place(b, 0, acc, totalLeaves, rootX, innerW);
    acc += lc;
    return p;
  });

  // Helpers for rendering pill vs dot.
  function PillNode({ x, y, side, label, bold }: { x: number; y: number; side: "claim" | "counter"; label: string; bold?: boolean }) {
    const fontSize = 13;
    const pad = { x: 14, y: 8 };
    // Estimate pill width by char count (no canvas measure available here).
    const charW = fontSize * 0.55;
    const w = Math.max(label.length * charW + pad.x * 2, 40);
    const h = fontSize + pad.y * 2;
    return (
      <g>
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={10} ry={10}
              fill="#fdfdfd" stroke={colors[side]} strokeWidth={2} />
        <text x={x} y={y} fontFamily="var(--font-sans)" fontSize={fontSize}
              fontWeight={bold ? 700 : 500}
              fill={colors[side]} textAnchor="middle" dominantBaseline="central">{label}</text>
      </g>
    );
  }

  function DotNode({ x, y, side, label, bold }: { x: number; y: number; side: "claim" | "counter"; label: string; bold?: boolean }) {
    return (
      <g>
        <circle cx={x} cy={y} r={2.5} fill={colors[side]} />
        <text x={x + 8} y={y} fontFamily="var(--font-sans)" fontSize={12}
              fontWeight={bold ? 700 : 400}
              fill={colors[side]} dominantBaseline="central">{label}</text>
      </g>
    );
  }

  function renderBranch(p: Placed, parentX: number, parentY: number, parentSide: "claim" | "counter" | null): any {
    const usePill = (p.branch.bold || nodeKind === "pill");
    const sideColor = colors[p.branch.side];
    return (
      <g key={`${p.x}-${p.y}-${p.branch.label}`}>
        <GraphEdge x1={parentX} y1={parentY} x2={p.x} y2={p.y}
                   color={sideColor} highlighted={!!p.branch.bold} />
        {usePill
          ? <PillNode x={p.x} y={p.y} side={p.branch.side} label={p.branch.label} bold={p.branch.bold} />
          : <DotNode  x={p.x} y={p.y} side={p.branch.side} label={p.branch.label} bold={p.branch.bold} />}
        {p.children.map((c) => renderBranch(c, p.x, p.y, p.branch.side))}
      </g>
    );
  }

  const rootFontSize = 14;
  const rootCharW = rootFontSize * 0.55;
  const rootW = Math.max(rootClaim.length * rootCharW + 28, 80);
  const rootH = rootFontSize + 18;

  return (
    <div style={{ width, maxWidth: "100%" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
        {/* Root pill */}
        <g>
          <rect x={rootX - rootW / 2} y={rootY - rootH / 2} width={rootW} height={rootH}
                rx={10} ry={10} fill="#fdfdfd" stroke="#2a2a2a" strokeWidth={2} />
          <text x={rootX} y={rootY} fontFamily="var(--font-sans)" fontSize={rootFontSize}
                fontWeight={600} fill="#2a2a2a" textAnchor="middle" dominantBaseline="central">{rootClaim}</text>
        </g>
        {placed.map((p) => renderBranch(p, rootX, rootY + rootH / 2, null))}
      </svg>
    </div>
  );
}

interface HMMStateProps {
  cx: number;
  cy: number;
  r?: number;
  symbol?: string;
  subscript?: string | number;
  fill?: string;
  stroke?: string;
  italic?: boolean;
}

function HMMState({ cx, cy, r = 25, symbol, subscript, fill = "#d3d3d3", stroke = "#000", italic = true }: HMMStateProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="1.5" />
      {symbol && (
        <text x={cx} y={cy} fontFamily="var(--font-sans)" fontSize={20}
              fontStyle={italic ? "italic" : "normal"} fill="#2a2a2a"
              textAnchor="middle" dominantBaseline="central">
          {symbol}
          {subscript != null && (
            <tspan fontSize={12} fontStyle="normal" dx={1} dy={6}>{String(subscript)}</tspan>
          )}
        </text>
      )}
    </g>
  );
}

Object.assign(window as any, { GraphNode, GraphEdge, BeamSearchTree, DebateTree, HMMState });
