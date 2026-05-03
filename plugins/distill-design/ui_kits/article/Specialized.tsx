type AtomElement = "C" | "H" | "O" | "N" | "S" | "P" | "F" | "Cl" | "Br" | string;
type AnnotationAccent = "salmon" | "blue" | "lavender" | "olive" | "burgundy" | "slate";

interface MoleculeAtom {
  id: string;
  cx: number;
  cy: number;
  element: AtomElement;
  showLabel?: boolean;
}

interface MoleculeBond {
  from: string;
  to: string;
  order?: 1 | 2 | 3;
  style?: "solid" | "aromatic";
}

interface MoleculeViewerProps {
  width?: number;
  height?: number;
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
  atomRadius?: number;
}

function MoleculeViewer({ width = 300, height = 220, atoms, bonds, atomRadius = 8 }: MoleculeViewerProps) {
  const elementColors: Record<string, string> = {
    C: "#666", O: "#c45a44", N: "#3a7fbd", S: "#8a8233", H: "#9a9a98",
    P: "#b06f80", F: "#8a8233", Cl: "#8a8233", Br: "#c45a44",
  };
  const atomMap: Record<string, MoleculeAtom> = {};
  for (const a of atoms) atomMap[a.id] = a;
  const bondStroke = "#666";
  const bondWidth = 1.5;

  const renderBond = (b: MoleculeBond, i: number) => {
    const a = atomMap[b.from];
    const c = atomMap[b.to];
    if (!a || !c) return null;
    const dx = c.cx - a.cx;
    const dy = c.cy - a.cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy;
    const py = ux;
    const trim = atomRadius + 1;
    const x1 = a.cx + ux * trim;
    const y1 = a.cy + uy * trim;
    const x2 = c.cx - ux * trim;
    const y2 = c.cy - uy * trim;
    const order = b.order || 1;
    const style = b.style || "solid";
    if (style === "aromatic") {
      const off = 3;
      return (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={bondStroke} strokeWidth={bondWidth} />
          <line x1={x1 + px * off} y1={y1 + py * off} x2={x2 + px * off} y2={y2 + py * off}
                stroke={bondStroke} strokeWidth={bondWidth} strokeDasharray="3 2" />
        </g>
      );
    }
    if (order === 1) {
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={bondStroke} strokeWidth={bondWidth} />;
    }
    if (order === 2) {
      const off = 3;
      return (
        <g key={i}>
          <line x1={x1 + px * off / 2} y1={y1 + py * off / 2}
                x2={x2 + px * off / 2} y2={y2 + py * off / 2} stroke={bondStroke} strokeWidth={bondWidth} />
          <line x1={x1 - px * off / 2} y1={y1 - py * off / 2}
                x2={x2 - px * off / 2} y2={y2 - py * off / 2} stroke={bondStroke} strokeWidth={bondWidth} />
        </g>
      );
    }
    const off = 3;
    return (
      <g key={i}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={bondStroke} strokeWidth={bondWidth} />
        <line x1={x1 + px * off} y1={y1 + py * off} x2={x2 + px * off} y2={y2 + py * off}
              stroke={bondStroke} strokeWidth={bondWidth} />
        <line x1={x1 - px * off} y1={y1 - py * off} x2={x2 - px * off} y2={y2 - py * off}
              stroke={bondStroke} strokeWidth={bondWidth} />
      </g>
    );
  };

  return (
    <div style={{ display: "inline-block" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g>{bonds.map(renderBond)}</g>
        <g>
          {atoms.map((a) => {
            const fill = elementColors[a.element] || "#666";
            const showLabel = a.showLabel != null ? a.showLabel : a.element !== "C";
            if (!showLabel) {
              return <circle key={a.id} cx={a.cx} cy={a.cy} r={2} fill={fill} />;
            }
            return (
              <g key={a.id}>
                <circle cx={a.cx} cy={a.cy} r={atomRadius} fill="#fdfdfd" />
                <text x={a.cx} y={a.cy + 4} textAnchor="middle"
                      fontFamily="var(--font-sans)" fontSize="13" fontWeight="500" fill={fill}>
                  {a.element}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

interface AutomataGridProps {
  generations: boolean[][][];
  cellSize?: number;
  showArrows?: boolean;
  liveColor?: string;
  deadColor?: string;
  border?: string;
  arrowColor?: string;
  layout?: "horizontal" | "vertical";
}

function AutomataGrid({
  generations, cellSize = 12, showArrows = true,
  liveColor = "#333", deadColor = "#fdfdfd", border = "#666", arrowColor = "#000",
  layout = "horizontal",
}: AutomataGridProps) {
  if (!generations.length) return <svg width={0} height={0} />;
  const rows = generations[0].length;
  const cols = generations[0][0].length;
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;
  const arrowGap = showArrows ? 36 : 16;
  const horizontal = layout === "horizontal";
  const totalW = horizontal
    ? generations.length * gridW + (generations.length - 1) * arrowGap + 4
    : gridW + 4;
  const totalH = horizontal
    ? gridH + 4
    : generations.length * gridH + (generations.length - 1) * arrowGap + 4;

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {generations.map((grid, gi) => {
        const ox = horizontal ? 2 + gi * (gridW + arrowGap) : 2;
        const oy = horizontal ? 2 : 2 + gi * (gridH + arrowGap);
        return (
          <g key={gi}>
            {grid.map((row, ri) =>
              row.map((alive, ci) => (
                <rect key={`${ri}-${ci}`}
                      x={ox + ci * cellSize} y={oy + ri * cellSize}
                      width={cellSize} height={cellSize}
                      fill={alive ? liveColor : deadColor}
                      stroke={border} strokeWidth="0.5" />
              ))
            )}
            {showArrows && gi < generations.length - 1 && (
              horizontal ? (
                <g>
                  <line x1={ox + gridW + 6} y1={oy + gridH / 2}
                        x2={ox + gridW + arrowGap - 8} y2={oy + gridH / 2}
                        stroke={arrowColor} strokeWidth="1.5" />
                  <polygon
                    points={`${ox + gridW + arrowGap - 8},${oy + gridH / 2 - 4} ${ox + gridW + arrowGap},${oy + gridH / 2} ${ox + gridW + arrowGap - 8},${oy + gridH / 2 + 4}`}
                    fill={arrowColor} />
                </g>
              ) : (
                <g>
                  <line x1={ox + gridW / 2} y1={oy + gridH + 6}
                        x2={ox + gridW / 2} y2={oy + gridH + arrowGap - 8}
                        stroke={arrowColor} strokeWidth="1.5" />
                  <polygon
                    points={`${ox + gridW / 2 - 4},${oy + gridH + arrowGap - 8} ${ox + gridW / 2},${oy + gridH + arrowGap} ${ox + gridW / 2 + 4},${oy + gridH + arrowGap - 8}`}
                    fill={arrowColor} />
                </g>
              )
            )}
          </g>
        );
      })}
    </svg>
  );
}

interface FeynmanExternal {
  x: number;
  y: number;
  label: string;
  arrow?: "in" | "out" | "none";
  style?: "fermion" | "photon" | "gluon";
}

interface FeynmanVertex {
  x: number;
  y: number;
}

interface FeynmanEdge {
  from: number;
  to: number;
  style: "fermion" | "photon" | "gluon";
  label?: string;
}

interface FeynmanDiagramProps {
  width?: number;
  height?: number;
  externals: FeynmanExternal[];
  vertices: FeynmanVertex[];
  edges: FeynmanEdge[];
}

function FeynmanDiagram({ width = 320, height = 220, externals, vertices, edges }: FeynmanDiagramProps) {
  const fermionColor = "#333";
  const photonColor = "#3a7fbd";
  const gluonColor = "#6e58a6";
  const sw = 1.5;

  const resolve = (idx: number) =>
    idx < 0 ? externals[-idx - 1] : vertices[idx];

  const photonPath = (x1: number, y1: number, x2: number, y2: number, amp: number = 6, wavelen: number = 14) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const n = Math.max(2, Math.round(len / wavelen));
    const step = len / n;
    let d = `M ${x1} ${y1}`;
    for (let i = 0; i < n; i++) {
      const s0 = i * step;
      const s1 = s0 + step / 2;
      const s2 = s0 + step;
      const sign = i % 2 === 0 ? 1 : -1;
      const cxs = x1 + ux * s1 + nx * amp * sign;
      const cys = y1 + uy * s1 + ny * amp * sign;
      const ex = x1 + ux * s2;
      const ey = y1 + uy * s2;
      d += ` Q ${cxs} ${cys} ${ex} ${ey}`;
    }
    return d;
  };

  const gluonPath = (x1: number, y1: number, x2: number, y2: number) => {
    // helix: alternating arcs forming a coil along the segment
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const wavelen = 10;
    const amp = 5;
    const n = Math.max(2, Math.round(len / wavelen));
    const step = len / n;
    let d = `M ${x1} ${y1}`;
    for (let i = 0; i < n; i++) {
      const sa = i * step;
      const sb = sa + step;
      const ax = x1 + ux * sa;
      const ay = y1 + uy * sa;
      const bx = x1 + ux * sb;
      const by = y1 + uy * sb;
      const sign = i % 2 === 0 ? 1 : -1;
      const cax = ax + nx * amp * sign + ux * step * 0.3;
      const cay = ay + ny * amp * sign + uy * step * 0.3;
      const cbx = bx + nx * amp * sign - ux * step * 0.3;
      const cby = by + ny * amp * sign - uy * step * 0.3;
      d += ` C ${cax} ${cay} ${cbx} ${cby} ${bx} ${by}`;
    }
    return d;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g>
        {edges.map((e, i) => {
          const a = resolve(e.from);
          const b = resolve(e.to);
          if (!a || !b) return null;
          if (e.style === "fermion") {
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const px = -uy;
            const py = ux;
            const head = 5;
            return (
              <g key={i}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={fermionColor} strokeWidth={sw} />
                <polygon
                  points={`${mx + ux * head},${my + uy * head} ${mx - ux * head + px * head * 0.7},${my - uy * head + py * head * 0.7} ${mx - ux * head - px * head * 0.7},${my - uy * head - py * head * 0.7}`}
                  fill={fermionColor} />
                {e.label && (
                  <text x={mx + px * 14} y={my + py * 14}
                        fontFamily="var(--font-sans)" fontSize="13" fontStyle="italic"
                        fill={fermionColor} textAnchor="middle">{e.label}</text>
                )}
              </g>
            );
          }
          if (e.style === "photon") {
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const px = dy / len;
            const py = -dx / len;
            return (
              <g key={i}>
                <path d={photonPath(a.x, a.y, b.x, b.y)} fill="none" stroke={photonColor} strokeWidth={sw} />
                {e.label && (
                  <text x={mx + px * 14} y={my + py * 14}
                        fontFamily="var(--font-sans)" fontSize="13" fontStyle="italic"
                        fill={photonColor} textAnchor="middle">{e.label}</text>
                )}
              </g>
            );
          }
          // gluon
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const px = dy / len;
          const py = -dx / len;
          return (
            <g key={i}>
              <path d={gluonPath(a.x, a.y, b.x, b.y)} fill="none" stroke={gluonColor} strokeWidth={sw} />
              {e.label && (
                <text x={mx + px * 14} y={my + py * 14}
                      fontFamily="var(--font-sans)" fontSize="13" fontStyle="italic"
                      fill={gluonColor} textAnchor="middle">{e.label}</text>
              )}
            </g>
          );
        })}
      </g>
      <g>
        {vertices.map((v, i) => (
          <circle key={i} cx={v.x} cy={v.y} r="2" fill="#000" />
        ))}
      </g>
      <g>
        {externals.map((ex, i) => (
          <text key={i} x={ex.x} y={ex.y}
                fontFamily="var(--font-sans)" fontSize="14" fontStyle="italic" fill="#2a2a2a"
                textAnchor="middle" dominantBaseline="middle">{ex.label}</text>
        ))}
      </g>
    </svg>
  );
}

interface ImageAnnotation {
  cx: number;
  cy: number;
  r?: number;
  label: string;
  labelOffset?: [number, number];
  color?: AnnotationAccent;
}

interface ImageWithAnnotationsProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  annotations: ImageAnnotation[];
  caption?: any;
}

function ImageWithAnnotations({ src, width, height, alt = "", annotations, caption }: ImageWithAnnotationsProps) {
  const colorMap: Record<AnnotationAccent, string> = {
    salmon: "#e49381",
    blue: "#81bee4",
    lavender: "#b8a8d8",
    olive: "#8a8233",
    burgundy: "#8c3a4a",
    slate: "#4f6470",
  };
  return (
    <div style={{ display: "inline-block" }}>
      <div style={{ position: "relative", width, height }}>
        <img src={src} alt={alt} width={width} height={height}
             style={{ display: "block", width, height }} />
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
             style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
          {annotations.map((ann, i) => {
            const r = ann.r != null ? ann.r : 14;
            const color = colorMap[ann.color || "salmon"];
            const offset = ann.labelOffset || [r + 8, 0];
            return (
              <g key={i}>
                <circle cx={ann.cx} cy={ann.cy} r={r} fill="none" stroke={color} strokeWidth="2" />
                <text x={ann.cx + offset[0]} y={ann.cy + offset[1] + 4}
                      fontFamily="var(--font-sans)" fontSize="13" fill={color}>{ann.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {caption && (
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5,
          color: "#6a6a6a", marginTop: 10
        }}>{caption}</div>
      )}
    </div>
  );
}

interface BoxplotGroup {
  label: string;
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
  outliers?: number[];
  color?: AnnotationAccent;
}

interface DistillBoxplotProps {
  width?: number;
  height?: number;
  groups: BoxplotGroup[];
  yLabel?: string;
  yDomain?: [number, number];
  showGrid?: boolean;
}

function DistillBoxplot({
  width = 480, height = 280, groups, yLabel, yDomain, showGrid = true,
}: DistillBoxplotProps) {
  const fills: Record<AnnotationAccent, string> = {
    salmon: "#fbd9d4", blue: "#c8e0f1", lavender: "#ddd9ee",
    olive: "#d8d4a3", burgundy: "#d8b3bc", slate: "#b8c2c8",
  };
  const strokes: Record<AnnotationAccent, string> = {
    salmon: "#c44a3f", blue: "#356aa8", lavender: "#4f3d80",
    olive: "#8a8233", burgundy: "#8c3a4a", slate: "#4f6470",
  };

  const padL = yLabel ? 56 : 40;
  const padR = 12;
  const padT = 16;
  const padB = 36;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  let domainLo: number;
  let domainHi: number;
  if (yDomain) {
    domainLo = yDomain[0];
    domainHi = yDomain[1];
  } else {
    let lo = Infinity;
    let hi = -Infinity;
    for (const g of groups) {
      lo = Math.min(lo, g.min, ...(g.outliers || []));
      hi = Math.max(hi, g.max, ...(g.outliers || []));
    }
    const pad = (hi - lo) * 0.08 || 1;
    domainLo = lo - pad;
    domainHi = hi + pad;
  }
  const range = domainHi - domainLo || 1;
  const yScale = (v: number) => padT + plotH - ((v - domainLo) / range) * plotH;

  const niceTicks = (lo: number, hi: number, count: number) => {
    const span = hi - lo;
    const step0 = span / count;
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const stepNorm = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
    const step = stepNorm * mag;
    const start = Math.ceil(lo / step) * step;
    const ticks: number[] = [];
    for (let v = start; v <= hi + step * 1e-6; v += step) ticks.push(Number(v.toFixed(10)));
    return ticks;
  };
  const ticks = niceTicks(domainLo, domainHi, 5);

  const slotW = plotW / groups.length;
  const boxW = Math.min(slotW * 0.55, 60);

  return (
    <div style={{ display: "inline-block" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {showGrid && (
          <g>
            {ticks.map((t, i) => (
              <line key={i} x1={padL} y1={yScale(t)} x2={padL + plotW} y2={yScale(t)}
                    stroke="#e8e8e4" strokeWidth="1" />
            ))}
          </g>
        )}
        <g>
          {ticks.map((t, i) => (
            <text key={i} x={padL - 8} y={yScale(t) + 4} textAnchor="end"
                  fontFamily="var(--font-sans)" fontSize="12" fill="#9a9a98">{t}</text>
          ))}
        </g>
        {yLabel && (
          <text x={14} y={padT + plotH / 2}
                fontFamily="var(--font-sans)" fontSize="12" fill="#6a6a6a"
                textAnchor="middle"
                transform={`rotate(-90 14 ${padT + plotH / 2})`}>{yLabel}</text>
        )}
        <g>
          {groups.map((g, gi) => {
            const cx = padL + slotW * (gi + 0.5);
            const accent = g.color || "blue";
            const fill = fills[accent];
            const stroke = strokes[accent];
            const yMin = yScale(g.min);
            const yMax = yScale(g.max);
            const yQ1 = yScale(g.q1);
            const yQ3 = yScale(g.q3);
            const yMed = yScale(g.median);
            const half = boxW / 2;
            const capW = boxW * 0.5;
            return (
              <g key={gi}>
                {/* whisker line */}
                <line x1={cx} y1={yMax} x2={cx} y2={yMin} stroke="#666" strokeWidth="1" strokeLinecap="round" />
                {/* whisker caps */}
                <line x1={cx - capW / 2} y1={yMax} x2={cx + capW / 2} y2={yMax} stroke="#666" strokeWidth="1" strokeLinecap="round" />
                <line x1={cx - capW / 2} y1={yMin} x2={cx + capW / 2} y2={yMin} stroke="#666" strokeWidth="1" strokeLinecap="round" />
                {/* box */}
                <rect x={cx - half} y={yQ3} width={boxW} height={yQ1 - yQ3}
                      fill={fill} stroke={stroke} strokeWidth="1" />
                {/* median */}
                <line x1={cx - half} y1={yMed} x2={cx + half} y2={yMed} stroke={stroke} strokeWidth="1.5" />
                {/* outliers */}
                {(g.outliers || []).map((o, oi) => (
                  <circle key={oi} cx={cx} cy={yScale(o)} r="3"
                          fill="none" stroke={stroke} strokeWidth="1" />
                ))}
                {/* group label */}
                <text x={cx} y={padT + plotH + 20} textAnchor="middle"
                      fontFamily="var(--font-sans)" fontSize="12" fill="#4a4a4a">{g.label}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

Object.assign(window as any, { MoleculeViewer, AutomataGrid, FeynmanDiagram, ImageWithAnnotations, DistillBoxplot });
