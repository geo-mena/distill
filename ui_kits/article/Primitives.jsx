/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Primitives — vectors, arrows, blocks, operators
// ============================================================

function TensorVector({ cells = 5, color = "salmon", width = 28, cellHeight = 30 }) {
  const palettes = {
    salmon:   ["#fdecea", "#f8c2bb", "#f5a39b", "#f8c2bb", "#fbd9d4", "#f5a39b", "#ee847b"],
    blue:     ["#ecf3fa", "#bdd2ec", "#a8c8e8", "#bdd2ec", "#d6e4f3", "#a8c8e8", "#7eaadb"],
    lavender: ["#efedf7", "#c8c0e3", "#b8a8d8", "#c8c0e3", "#ddd9ee", "#b8a8d8", "#9a85c4"],
  };
  const strokes = { salmon: "#c44a3f", blue: "#356aa8", lavender: "#4f3d80" };
  const palette = palettes[color] || palettes.salmon;
  const stroke = strokes[color] || strokes.salmon;
  const totalH = cells * cellHeight + 4;
  return (
    <svg width={width + 4} height={totalH} viewBox={`0 0 ${width + 4} ${totalH}`} style={{ flexShrink: 0 }}>
      {Array.from({ length: cells }).map((_, i) => (
        <rect key={i} x="2" y={2 + i * cellHeight} width={width} height={cellHeight - 2}
              fill={palette[i % palette.length]} stroke={stroke} strokeWidth="1" />
      ))}
    </svg>
  );
}

function Arrow({ length = 80, dashed = false, color = "#555", label }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      {label && <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", marginBottom: 4 }}>{label}</div>}
      <svg width={length} height={20} viewBox={`0 0 ${length} 20`}>
        <line x1="2" y1="10" x2={length - 10} y2="10" stroke={color} strokeWidth="1.5"
              strokeDasharray={dashed ? "3 3" : "none"} />
        <polygon points={`${length - 10},6 ${length - 2},10 ${length - 10},14`} fill={color} />
      </svg>
    </div>
  );
}

function OperatorNode({ kind = "add", size = 40 }) {
  const r = size / 2 - 6;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="#fdfdfd" stroke="#333" strokeWidth="1.5" />
      {kind === "add" && (<><line x1={c} y1={c - r + 3} x2={c} y2={c + r - 3} stroke="#333" strokeWidth="1.5" /><line x1={c - r + 3} y1={c} x2={c + r - 3} y2={c} stroke="#333" strokeWidth="1.5" /></>)}
      {kind === "mul" && (<circle cx={c} cy={c} r="2.5" fill="#333" />)}
      {kind === "outer" && (<><line x1={c - r + 4} y1={c - r + 4} x2={c + r - 4} y2={c + r - 4} stroke="#333" strokeWidth="1.5" /><line x1={c + r - 4} y1={c - r + 4} x2={c - r + 4} y2={c + r - 4} stroke="#333" strokeWidth="1.5" /></>)}
    </svg>
  );
}

function SubNetBlock({ label, color = "salmon", height = 100, width = 36 }) {
  const fills = {
    salmon: { bg: "#fdecea", stroke: "#f5a39b" },
    "salmon-strong": { bg: "#fbd9d4", stroke: "#f5a39b" },
    blue: { bg: "#d6e4f3", stroke: "#a8c8e8" },
    lavender: { bg: "#ddd9ee", stroke: "#b8a8d8" },
  };
  const { bg, stroke } = fills[color] || fills.salmon;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="3" fill={bg} stroke={stroke} strokeWidth="1" />
      <text x={width / 2} y={height / 2} fontFamily="Libre Franklin" fontSize="12" fill="#6a6a6a"
            textAnchor="middle" transform={`rotate(-90 ${width / 2} ${height / 2})`}>{label}</text>
    </svg>
  );
}

function PointerGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" fill="#f5b942" />
      <path d="M10.5 7.4c0-.55.45-1 1-1s1 .45 1 1v3.4h.55V7.0c0-.55.45-1 1-1s1 .45 1 1v3.8h.55V7.7c0-.55.45-1 1-1s1 .45 1 1v3.6h.4c.55 0 1 .45 1 1v3c0 1.93-1.57 3.5-3.5 3.5h-2.6c-.95 0-1.85-.38-2.52-1.05l-2.7-2.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l1.4 1.4V7.4z" fill="#fff" />
    </svg>
  );
}

// ============================================================
// Citation popover
// ============================================================

function Citation({ refs = [1], bib = {} }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const onEnter = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), 120); };
  const onLeave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 100); };
  return (
    <span style={{ position: "relative", display: "inline-block" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <sup style={{
        background: "#fdfdfd", border: "1px solid #d8d8d4", borderRadius: 3,
        padding: "0 4px", fontFamily: "Libre Franklin", fontSize: 11, color: "#c44a3f",
        cursor: "pointer", marginLeft: 2, fontWeight: 500
      }}>[{refs.join(", ")}]</sup>
      {open && (
        <span style={{
          position: "absolute", top: "100%", left: 0, marginTop: 6, zIndex: 10,
          background: "#fdfdfd", border: "1px solid #d8d8d4", borderRadius: 6,
          padding: "12px 14px", boxShadow: "0 2px 8px rgba(20,20,20,0.06)",
          width: 380, fontFamily: "Crimson Text", fontSize: 14, lineHeight: 1.55, color: "#2a2a2a"
        }}>
          {refs.map((n) => bib[n] && (
            <span key={n} style={{ display: "block", marginBottom: 8 }}>
              <span style={{ fontFamily: "Libre Franklin", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
                             textTransform: "uppercase", color: "#6a6a6a", marginRight: 6 }}>[{n}]</span>
              {bib[n].authors}. <em>{bib[n].title}</em>. {bib[n].venue}.
            </span>
          ))}
        </span>
      )}
    </span>
  );
}

// ============================================================
// Figure
// ============================================================

function Figure({ n, breakout = false, children, caption }) {
  return (
    <figure style={{
      margin: "48px auto", maxWidth: breakout ? 984 : 684,
      width: "100%", display: "block"
    }}>
      <div style={{ background: "#fdfdfd", padding: "8px 0" }}>{children}</div>
      {caption && (
        <figcaption style={{
          fontFamily: "Libre Franklin", fontSize: 14, lineHeight: 1.5,
          color: "#6a6a6a", marginTop: 14, maxWidth: 684, marginLeft: "auto", marginRight: "auto"
        }}>
          {n != null && (
            <span style={{
              fontWeight: 500, fontSize: 11, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "#6a6a6a", marginRight: 6
            }}>FIGURE {n}</span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ============================================================
// Math block (KaTeX-y style — rendered as HTML)
// ============================================================

function MathBlock({ children, eqRef }) {
  return (
    <div style={{
      margin: "32px auto", maxWidth: 684, textAlign: "center",
      fontFamily: "Cambria Math, Cambria, 'Latin Modern Math', Georgia, serif",
      fontSize: 18, fontStyle: "italic", color: "#2a2a2a", position: "relative"
    }}>
      <span>{children}</span>
      {eqRef && <span style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        fontFamily: "Libre Franklin", fontSize: 13, fontStyle: "normal", color: "#6a6a6a"
      }}>({eqRef})</span>}
    </div>
  );
}

// Export
Object.assign(window, {
  TensorVector, Arrow, OperatorNode, SubNetBlock, PointerGlyph,
  Citation, Figure, MathBlock,
});
