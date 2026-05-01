/* global React, TensorVector, Arrow, OperatorNode, SubNetBlock, PointerGlyph, Citation, Figure, MathBlock */

// ============================================================
// Diagram scenes — recreated from the FiLM article uploads
// ============================================================

function ConcatDiagram() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "24px 0", flexWrap: "nowrap" }}>
      {/* conditioning column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", textAlign: "center", maxWidth: 100 }}>
          conditioning<br/>representation
        </div>
        <TensorVector cells={3} color="blue" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Arrow length={50} />
      </div>
      <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>input</div>
      <TensorVector cells={5} color="salmon" />
      <Arrow length={50} />
      <SubNetBlock label="concatenate" color="salmon" height={140} />
      <Arrow length={50} />
      {/* concatenated vector */}
      <svg width="32" height="240" viewBox="0 0 32 240">
        <rect x="2" y="2"   width="28" height="30" fill="#a8c8e8" stroke="#356aa8" strokeWidth="1"/>
        <rect x="2" y="34"  width="28" height="30" fill="#bdd2ec" stroke="#356aa8" strokeWidth="1"/>
        <rect x="2" y="66"  width="28" height="30" fill="#a8c8e8" stroke="#356aa8" strokeWidth="1"/>
        <rect x="2" y="98"  width="28" height="30" fill="#f5a39b" stroke="#c44a3f" strokeWidth="1"/>
        <rect x="2" y="130" width="28" height="30" fill="#f8c2bb" stroke="#c44a3f" strokeWidth="1"/>
        <rect x="2" y="162" width="28" height="30" fill="#f5a39b" stroke="#c44a3f" strokeWidth="1"/>
        <rect x="2" y="194" width="28" height="30" fill="#fbd9d4" stroke="#c44a3f" strokeWidth="1"/>
      </svg>
      <Arrow length={50} />
      <SubNetBlock label="linear" color="blue" height={140} />
      <Arrow length={50} />
      <TensorVector cells={5} color="salmon" />
      <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>output</div>
    </div>
  );
}

function BiasDiagram() {
  return (
    <div style={{ position: "relative", padding: "20px 0" }}>
      {/* top row: conditioning -> linear -> bias vector */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", maxWidth: 110, textAlign: "right", fontWeight: 600 }}>
          conditioning<br/>representation
        </div>
        <Arrow length={50} />
        <SubNetBlock label="linear" color="blue" height={120} width={48} />
        <Arrow length={50} />
        <TensorVector cells={4} color="blue" />
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", maxWidth: 220, marginLeft: 12 }}>
          <strong>Conditional biasing</strong> first maps the <strong>conditioning representation</strong> to a bias vector.
        </div>
      </div>
      {/* bottom row: input -> + -> output */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>input</div>
        <TensorVector cells={4} color="salmon" />
        <Arrow length={120} />
        <OperatorNode kind="add" size={36} />
        <Arrow length={120} />
        <TensorVector cells={4} color="salmon" />
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>output</div>
      </div>
    </div>
  );
}

function ScalingDiagram() {
  return (
    <div style={{ position: "relative", padding: "20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", maxWidth: 110, textAlign: "right", fontWeight: 600 }}>
          conditioning<br/>representation
        </div>
        <Arrow length={50} />
        <SubNetBlock label="linear" color="blue" height={120} width={48} />
        <Arrow length={50} />
        <TensorVector cells={4} color="blue" />
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", maxWidth: 220, marginLeft: 12 }}>
          <strong>Conditional scaling</strong> first maps the <strong>conditioning representation</strong> to a scaling vector.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>input</div>
        <TensorVector cells={4} color="salmon" />
        <Arrow length={120} />
        <OperatorNode kind="mul" size={36} />
        <Arrow length={120} />
        <TensorVector cells={4} color="salmon" />
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>output</div>
      </div>
    </div>
  );
}

function FiLMNetworkDiagram() {
  return (
    <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center", gap: 60, padding: "20px 0" }}>
      {/* left: FiLM generator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 280 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", lineHeight: 1.5, marginBottom: 24, textAlign: "center" }}>
          The <strong>FiLM generator</strong> processes the conditioning information and produces parameters that describe how the target network should alter its computation.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>conditioning</div>
          <Arrow length={40} />
          <div style={{
            background: "#a8c8e8", border: "1px solid #356aa8", borderRadius: 4,
            padding: "32px 24px", fontFamily: "Libre Franklin", fontSize: 14, color: "#2a2a2a", fontWeight: 500
          }}>FiLM generator</div>
        </div>
      </div>
      <div style={{ borderLeft: "1px dashed #c4c4c0" }} />
      {/* right: FiLM-ed network */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, maxWidth: 240 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>input</div>
        <div style={{ width: 1, height: 12, background: "#888" }} />
        <div style={{ width: 180, padding: "14px 18px", background: "#fdecea", border: "1px solid #f5a39b", borderRadius: 4, fontFamily: "Libre Franklin", fontSize: 13, color: "#9a9a98", textAlign: "center" }}>sub-network</div>
        <div style={{ width: 1, height: 8, background: "#888" }} />
        <div style={{ width: 180, padding: "10px 18px", background: "#fbd9d4", border: "1px solid #f5a39b", borderRadius: 4, fontFamily: "Libre Franklin", fontSize: 13, color: "#2a2a2a", textAlign: "center", fontWeight: 600 }}>FiLM</div>
        <div style={{ width: 1, height: 8, background: "#888" }} />
        <div style={{ width: 180, padding: "14px 18px", background: "#fdecea", border: "1px solid #f5a39b", borderRadius: 4, fontFamily: "Libre Franklin", fontSize: 13, color: "#9a9a98", textAlign: "center" }}>sub-network</div>
        <div style={{ width: 1, height: 8, background: "#888" }} />
        <div style={{ width: 180, padding: "10px 18px", background: "#fbd9d4", border: "1px solid #f5a39b", borderRadius: 4, fontFamily: "Libre Franklin", fontSize: 13, color: "#2a2a2a", textAlign: "center", fontWeight: 600 }}>FiLM</div>
        <div style={{ width: 1, height: 8, background: "#888" }} />
        <div style={{ width: 180, padding: "14px 18px", background: "#fdecea", border: "1px solid #f5a39b", borderRadius: 4, fontFamily: "Libre Franklin", fontSize: 13, color: "#9a9a98", textAlign: "center" }}>sub-network</div>
        <div style={{ width: 1, height: 12, background: "#888" }} />
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>output</div>
      </div>
    </div>
  );
}

// Interactive scrubber — γ/β params control a tiny visualization
function FiLMScrubber() {
  const [gamma, setGamma] = React.useState(1.2);
  const [beta, setBeta] = React.useState(-0.4);
  const inputs = [0.3, 0.7, 0.5, 0.2, 0.8];
  const out = inputs.map((v) => v * gamma + beta);

  const cell = (v, i) => {
    const clamped = Math.max(-1, Math.min(1, v));
    const isPos = clamped >= 0;
    const intensity = Math.abs(clamped);
    const bg = isPos
      ? `rgba(168, 200, 232, ${0.25 + intensity * 0.65})`
      : `rgba(245, 163, 155, ${0.25 + intensity * 0.65})`;
    return <rect key={i} x="2" y={2 + i * 30} width="28" height="28" fill={bg} stroke="#888" strokeWidth="1" />;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, padding: "32px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>input</div>
        <svg width="32" height="160">{inputs.map((v, i) => cell(v, i))}</svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 22, minWidth: 260 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", marginBottom: 6 }}>
            <PointerGlyph size={14} />
            <span>γ (scale): <strong style={{ color: "#2a2a2a", fontFamily: "ui-monospace, SF Mono, monospace" }}>{gamma.toFixed(2)}</strong></span>
          </div>
          <input type="range" min="-2" max="2" step="0.05" value={gamma}
                 onChange={(e) => setGamma(parseFloat(e.target.value))}
                 style={{ width: "100%", accentColor: "#a8c8e8" }} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a", marginBottom: 6 }}>
            <PointerGlyph size={14} />
            <span>β (shift): <strong style={{ color: "#2a2a2a", fontFamily: "ui-monospace, SF Mono, monospace" }}>{beta.toFixed(2)}</strong></span>
          </div>
          <input type="range" min="-1" max="1" step="0.05" value={beta}
                 onChange={(e) => setBeta(parseFloat(e.target.value))}
                 style={{ width: "100%", accentColor: "#a8c8e8" }} />
        </div>
        <div style={{ fontFamily: "Crimson Text", fontStyle: "italic", fontSize: 14, color: "#6a6a6a", lineHeight: 1.5 }}>
          Each output element is γ·xᵢ + β. Drag the sliders to feel how a single γ/β pair shifts the entire activation distribution.
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontFamily: "Libre Franklin", fontSize: 13, color: "#4a4a4a" }}>output</div>
        <svg width="32" height="160">{out.map((v, i) => cell(v, i))}</svg>
      </div>
    </div>
  );
}

Object.assign(window, { ConcatDiagram, BiasDiagram, ScalingDiagram, FiLMNetworkDiagram, FiLMScrubber });
