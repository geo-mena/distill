type HeatmapAccent = "blue" | "lavender" | "salmon";
type CellGridState = "empty" | "alive" | "highlight" | "dim" | "active" | "pruned";
type CellGridShape = "square" | "circle";
type VariableTensorAccent = "salmon" | "blue" | "lavender" | "neutral";

interface AttentionHeatmapProps {
  weights: number[];
  orientation?: "row" | "column";
  cellSize?: number;
  color?: HeatmapAccent;
  labels?: string[];
  border?: boolean;
}

function AttentionHeatmap({
  weights,
  orientation = "column",
  cellSize = 28,
  color = "blue",
  labels,
  border = true,
}: AttentionHeatmapProps) {
  const fills: Record<HeatmapAccent, string> = { blue: "#a8c8e8", lavender: "#b8a8d8", salmon: "#e49381" };
  const strokes: Record<HeatmapAccent, string> = { blue: "#356aa8", lavender: "#4f3d80", salmon: "#c44a3f" };
  const fill = fills[color] || fills.blue;
  const stroke = strokes[color] || strokes.blue;
  const n = weights.length;
  const isCol = orientation === "column";
  const labelGutter = labels && labels.length ? 56 : 0;
  const cellsW = isCol ? cellSize : n * cellSize;
  const cellsH = isCol ? n * cellSize : cellSize;
  const w = (isCol ? cellsW : cellsW) + (isCol ? labelGutter + 4 : 4);
  const h = (isCol ? cellsH : cellsH) + (isCol ? 4 : labelGutter + 4);
  const ox = isCol ? labelGutter + 2 : 2;
  const oy = isCol ? 2 : labelGutter + 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      {weights.map((wt, i) => {
        const x = isCol ? ox : ox + i * cellSize;
        const y = isCol ? oy + i * cellSize : oy;
        const isEmpty = wt <= 0;
        const cellFill = isEmpty ? "#fdfdfd" : fill;
        const cellStroke = isEmpty ? "#d8d8d4" : (border ? stroke : "none");
        const op = isEmpty ? 1 : 0.1 + wt * 0.85;
        return (
          <rect key={i} x={x} y={y} width={cellSize - 2} height={cellSize - 2}
                fill={cellFill} fillOpacity={op}
                stroke={cellStroke} strokeWidth={isEmpty ? 0.5 : 1} />
        );
      })}
      {labels && labels.map((lab, i) => {
        if (isCol) {
          const cy = oy + i * cellSize + (cellSize - 2) / 2;
          return (
            <text key={i} x={labelGutter - 4} y={cy} fontFamily="var(--font-sans)" fontSize="12"
                  fill="#6a6a6a" textAnchor="end" dominantBaseline="middle">{lab}</text>
          );
        }
        const cx = ox + i * cellSize + (cellSize - 2) / 2;
        return (
          <text key={i} x={cx} y={labelGutter - 4} fontFamily="var(--font-sans)" fontSize="12"
                fill="#6a6a6a" textAnchor="middle">{lab}</text>
        );
      })}
    </svg>
  );
}

interface CellGridProps {
  rows: number;
  cols: number;
  cellSize?: number;
  states: CellGridState[][];
  shape?: CellGridShape;
  showGrid?: boolean;
  color?: HeatmapAccent;
  opacities?: number[][];
  gap?: number;
}

function CellGrid({
  rows,
  cols,
  cellSize = 24,
  states,
  shape = "square",
  showGrid = true,
  color = "blue",
  opacities,
  gap = 0,
}: CellGridProps) {
  const fills: Record<HeatmapAccent, string> = { blue: "#a8c8e8", lavender: "#b8a8d8", salmon: "#e49381" };
  const strokes: Record<HeatmapAccent, string> = { blue: "#356aa8", lavender: "#4f3d80", salmon: "#c44a3f" };
  const baseFill = fills[color] || fills.blue;
  const baseStroke = strokes[color] || strokes.blue;
  const step = cellSize + gap;
  const w = cols * step - gap + 4;
  const h = rows * step - gap + 4;
  const stateFill = (s: CellGridState): { fill: string; opacity: number; stroke: string } => {
    switch (s) {
      case "alive":
      case "active":
        return { fill: baseFill, opacity: 1, stroke: baseStroke };
      case "dim":
      case "pruned":
        return { fill: baseFill, opacity: 0.25, stroke: baseStroke };
      case "highlight":
        return { fill: "#fbd9d4", opacity: 1, stroke: "#c44a3f" };
      case "empty":
      default:
        return { fill: "#fdfdfd", opacity: 1, stroke: "#d8d8d4" };
    }
  };
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const s = (states[r] && states[r][c]) || "empty";
          const { fill, opacity, stroke } = stateFill(s);
          const ovr = opacities && opacities[r] && typeof opacities[r][c] === "number" ? opacities[r][c] : null;
          const op = ovr != null ? ovr : opacity;
          const x = 2 + c * step;
          const y = 2 + r * step;
          if (shape === "circle") {
            const cx = x + cellSize / 2;
            const cy = y + cellSize / 2;
            const r0 = cellSize / 2 - 1;
            return (
              <circle key={`${r}-${c}`} cx={cx} cy={cy} r={r0}
                      fill={fill} fillOpacity={op}
                      stroke={showGrid ? "#000" : stroke}
                      strokeWidth={showGrid ? 0.8 : 1} />
            );
          }
          return (
            <rect key={`${r}-${c}`} x={x} y={y} width={cellSize - 1} height={cellSize - 1}
                  fill={fill} fillOpacity={op}
                  stroke={showGrid ? "#000" : stroke}
                  strokeWidth={showGrid ? 0.8 : 1} />
          );
        })
      )}
    </svg>
  );
}

interface RecurrentArrowProps {
  x: number;
  y: number;
  span?: number;
  height?: number;
  color?: string;
  arrow?: boolean;
  width?: number;
  side?: "above" | "below";
}

function RecurrentArrow({
  x,
  y,
  span = 120,
  height = 40,
  color = "#8359b2",
  arrow = true,
  width = 1.5,
  side = "above",
}: RecurrentArrowProps) {
  const dir = side === "above" ? -1 : 1;
  const cx = x + span / 2;
  const cy = y + dir * height;
  const x2 = x + span;
  const path = `M ${x} ${y} Q ${cx} ${cy} ${x2} ${y}`;
  const ah = 8;
  const tip = { x: x2, y };
  const base1 = { x: x2 - ah, y: y + (dir === -1 ? -ah / 2 : ah / 2) };
  const base2 = { x: x2 - ah, y: y + (dir === -1 ? ah / 2 : -ah / 2) };
  return (
    <g>
      <path d={path} fill="none" stroke={color} strokeWidth={width} />
      {arrow && (
        <polygon points={`${base1.x},${base1.y} ${tip.x},${tip.y} ${base2.x},${base2.y}`} fill={color} />
      )}
    </g>
  );
}

interface VariableTensorCell {
  width?: number;
  color?: VariableTensorAccent;
  label?: string;
  opacity?: number;
}

interface VariableTensorProps {
  cells: VariableTensorCell[];
  cellHeight?: number;
  defaultWidth?: number;
  orientation?: "horizontal" | "vertical";
  gap?: number;
}

function VariableTensor({
  cells,
  cellHeight = 30,
  defaultWidth = 28,
  orientation = "horizontal",
  gap = 2,
}: VariableTensorProps) {
  const palette: Record<VariableTensorAccent, { fill: string; stroke: string }> = {
    salmon:   { fill: "#f5a39b", stroke: "#c44a3f" },
    blue:     { fill: "#a8c8e8", stroke: "#356aa8" },
    lavender: { fill: "#b8a8d8", stroke: "#4f3d80" },
    neutral:  { fill: "#e8e8e4", stroke: "#c4c4c0" },
  };
  const isH = orientation === "horizontal";
  let cursor = 2;
  const placed = cells.map((c) => {
    const ext = isH ? (c.width != null ? c.width : defaultWidth) : (c.width != null ? c.width : cellHeight);
    const cross = isH ? cellHeight : defaultWidth;
    const pos = cursor;
    cursor += ext + gap;
    return { c, pos, ext, cross };
  });
  const total = cursor + 2 - gap;
  const w = isH ? total : (placed[0] ? placed[0].cross + 4 : defaultWidth + 4);
  const h = isH ? cellHeight + 4 : total;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      {placed.map(({ c, pos, ext, cross }, i) => {
        const swatch = palette[c.color || "neutral"] || palette.neutral;
        const x = isH ? pos : 2;
        const y = isH ? 2 : pos;
        const rw = isH ? ext : cross;
        const rh = isH ? cross : ext;
        const op = typeof c.opacity === "number" ? c.opacity : 1;
        return (
          <g key={i}>
            <rect x={x} y={y} width={rw} height={rh}
                  fill={swatch.fill} fillOpacity={op}
                  stroke={swatch.stroke} strokeWidth="1" />
            {c.label && (
              <text x={x + rw / 2} y={y + rh / 2}
                    fontFamily="var(--font-sans)" fontSize="13" fill="#333"
                    textAnchor="middle" dominantBaseline="central">{c.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window as any, { AttentionHeatmap, CellGrid, RecurrentArrow, VariableTensor });
