type GridCellState = "empty" | "agent" | "goal" | "penalty" | "wall" | "visited";
type RLPathColor = "navy" | "penalty" | "ink";
type HeatmapColor = "blue" | "lavender" | "salmon";

interface GridWorldPath {
  points: Array<[number, number]>;
  color?: RLPathColor;
  width?: number;
  dashed?: boolean;
}

interface GridWorldProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  cells?: GridCellState[][];
  paths?: GridWorldPath[];
  goalAt?: [number, number];
  penaltyEdge?: "right" | "bottom";
  agents?: Array<[number, number]>;
  ghostAgents?: Array<[number, number]>;
  showAgentDots?: boolean;
}

function GridWorld({
  rows = 5,
  cols = 6,
  cellSize = 28,
  cells = [],
  paths = [],
  goalAt,
  penaltyEdge,
  agents = [],
  ghostAgents = [],
  showAgentDots = true,
}: GridWorldProps) {
  const pad = 4;
  const w = cols * cellSize + pad * 2;
  const h = rows * cellSize + pad * 2;
  const pathFills: Record<RLPathColor, string> = { navy: "#2a2d7c", penalty: "#bd5f36", ink: "#333" };
  const cellFills: Record<GridCellState, string> = {
    empty:   "#e7ebe8",
    agent:   "#e7ebe8",
    goal:    "#e7ebe8",
    penalty: "#bd5f36",
    wall:    "#cac9cc",
    visited: "#dde2dd",
  };
  const cx = (c: number) => pad + c * cellSize + cellSize / 2;
  const cy = (r: number) => pad + r * cellSize + cellSize / 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const state = (cells[r] && cells[r][c]) || "empty";
          return (
            <rect key={`${r}-${c}`} x={pad + c * cellSize + 1} y={pad + r * cellSize + 1}
                  width={cellSize - 2} height={cellSize - 2} fill={cellFills[state]} />
          );
        })
      )}
      {penaltyEdge === "bottom" && (
        <rect x={pad + 1} y={pad + (rows - 1) * cellSize + 1}
              width={cols * cellSize - 2} height={cellSize - 2} fill="#bd5f36" />
      )}
      {penaltyEdge === "right" && (
        <rect x={pad + (cols - 1) * cellSize + 1} y={pad + 1}
              width={cellSize - 2} height={rows * cellSize - 2} fill="#bd5f36" />
      )}
      {goalAt && (
        <rect x={pad + goalAt[0] * cellSize + cellSize * 0.28}
              y={pad + goalAt[1] * cellSize + cellSize * 0.28}
              width={cellSize * 0.44} height={cellSize * 0.44} fill="#333" />
      )}
      {paths.map((p, i) => {
        const d = p.points.map(([c, r], idx) => `${idx === 0 ? "M" : "L"}${cx(c)} ${cy(r)}`).join(" ");
        const stroke = pathFills[p.color || "navy"];
        return (
          <path key={`p-${i}`} d={d} fill="none" stroke={stroke}
                strokeWidth={p.width || 3} strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={p.dashed ? "4 4" : "none"} />
        );
      })}
      {showAgentDots && ghostAgents.map(([c, r], i) => (
        <circle key={`g-${i}`} cx={cx(c)} cy={cy(r)} r="4" fill="#cac9cc" />
      ))}
      {showAgentDots && agents.map(([c, r], i) => (
        <circle key={`a-${i}`} cx={cx(c)} cy={cy(r)} r="4" fill="#333" />
      ))}
    </svg>
  );
}

interface ValueHeatmapProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  values: number[][];
  color?: HeatmapColor;
  showValues?: boolean;
  precision?: number;
}

function ValueHeatmap({
  rows,
  cols,
  cellSize = 28,
  values,
  color = "blue",
  showValues = false,
  precision = 2,
}: ValueHeatmapProps) {
  const r = rows ?? values.length;
  const c = cols ?? (values[0] ? values[0].length : 0);
  const pad = 4;
  const w = c * cellSize + pad * 2;
  const h = r * cellSize + pad * 2;
  const fills: Record<HeatmapColor, string> = {
    blue:     "#a8c8e8",
    lavender: "#b8a8d8",
    salmon:   "#e49381",
  };
  const negFill = "#e49381";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      {Array.from({ length: r }).map((_, ri) =>
        Array.from({ length: c }).map((_, ci) => {
          const v = (values[ri] && values[ri][ci]) || 0;
          const fill = v < 0 ? negFill : fills[color];
          const op = 0.15 + Math.min(1, Math.abs(v)) * 0.65;
          return (
            <g key={`${ri}-${ci}`}>
              <rect x={pad + ci * cellSize} y={pad + ri * cellSize}
                    width={cellSize} height={cellSize}
                    fill={fill} fillOpacity={op}
                    stroke="#e7ebe8" strokeWidth="1" />
              {showValues && (
                <text x={pad + ci * cellSize + cellSize / 2}
                      y={pad + ri * cellSize + cellSize / 2 + 4}
                      fontFamily="var(--font-sans)" fontSize="11" fill="#333"
                      textAnchor="middle">{v.toFixed(precision)}</text>
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}

interface PolicyCell {
  up?: number;
  down?: number;
  left?: number;
  right?: number;
}

interface PolicyArrowsProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  policy: PolicyCell[][];
  arrowColor?: string;
  showCellOutline?: boolean;
}

function PolicyArrows({
  rows,
  cols,
  cellSize = 32,
  policy,
  arrowColor = "#58595b",
  showCellOutline = true,
}: PolicyArrowsProps) {
  const r = rows ?? policy.length;
  const c = cols ?? (policy[0] ? policy[0].length : 0);
  const pad = 4;
  const w = c * cellSize + pad * 2;
  const h = r * cellSize + pad * 2;
  const inactive = "#b2b3c3";
  const maxLen = cellSize * 0.36;
  const baseW = cellSize * 0.18;
  const renderArrow = (cx: number, cy: number, dir: "up" | "down" | "left" | "right", prob: number) => {
    const active = prob > 0.001;
    const fill = active ? arrowColor : inactive;
    const op = active ? 0.2 + prob * 0.8 : 0.45;
    const len = active ? Math.max(maxLen * 0.35, maxLen * prob) : maxLen * 0.35;
    let pts = "";
    if (dir === "up")    pts = `${cx},${cy - len} ${cx - baseW / 2},${cy} ${cx + baseW / 2},${cy}`;
    if (dir === "down")  pts = `${cx},${cy + len} ${cx - baseW / 2},${cy} ${cx + baseW / 2},${cy}`;
    if (dir === "left")  pts = `${cx - len},${cy} ${cx},${cy - baseW / 2} ${cx},${cy + baseW / 2}`;
    if (dir === "right") pts = `${cx + len},${cy} ${cx},${cy - baseW / 2} ${cx},${cy + baseW / 2}`;
    return <polygon points={pts} fill={fill} fillOpacity={op} />;
  };
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      {Array.from({ length: r }).map((_, ri) =>
        Array.from({ length: c }).map((_, ci) => {
          const cell = (policy[ri] && policy[ri][ci]) || {};
          const cx = pad + ci * cellSize + cellSize / 2;
          const cy = pad + ri * cellSize + cellSize / 2;
          return (
            <g key={`${ri}-${ci}`}>
              {showCellOutline && (
                <rect x={pad + ci * cellSize} y={pad + ri * cellSize}
                      width={cellSize} height={cellSize}
                      fill="none" stroke="#e7ebe8" strokeWidth="1" />
              )}
              {renderArrow(cx, cy, "up",    cell.up    || 0)}
              {renderArrow(cx, cy, "down",  cell.down  || 0)}
              {renderArrow(cx, cy, "left",  cell.left  || 0)}
              {renderArrow(cx, cy, "right", cell.right || 0)}
            </g>
          );
        })
      )}
    </svg>
  );
}

Object.assign(window as any, { GridWorld, ValueHeatmap, PolicyArrows });
