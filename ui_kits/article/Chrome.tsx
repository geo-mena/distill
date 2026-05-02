interface ArticleNavProps {
  onOpenTOC: () => void;
}

function ArticleNav({ onOpenTOC }: ArticleNavProps) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 20, background: "rgba(253,253,253,0.94)",
      borderBottom: "1px solid #e8e8e4", backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)"
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "12px 24px",
        display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-sans)", fontSize: 14
      }}>
        <button onClick={onOpenTOC} aria-label="Open table of contents" style={{
          background: "transparent", border: "1px solid transparent", borderRadius: 4,
          padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          fontFamily: "var(--font-sans)", fontSize: 14, color: "#2a2a2a"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="14" y2="17" />
          </svg>
          Contents
        </button>
        <div style={{ flex: 1 }} />
        <a href="#" style={{
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "#2a2a2a",
          letterSpacing: "-0.01em", textDecoration: "none", borderBottom: "none"
        }}>Distill</a>
        <div style={{ flex: 1 }} />
        <button style={{
          background: "transparent", border: "1px solid transparent", borderRadius: 4,
          padding: "6px 10px", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, color: "#2a2a2a"
        }}>Cite</button>
        <button style={{
          background: "transparent", border: "1px solid transparent", borderRadius: 4,
          padding: "6px 10px", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14, color: "#2a2a2a"
        }}>Share</button>
      </div>
    </nav>
  );
}

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  authors: string;
  affiliation?: string;
  date: string;
  journal?: string;
}

function ArticleHeader({ title, subtitle, authors, affiliation, date, journal = "Distill" }: ArticleHeaderProps) {
  return (
    <header style={{
      maxWidth: 684, margin: "0 auto", padding: "96px 24px 40px",
      fontFamily: "var(--font-sans)"
    }}>
      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#6a6a6a", marginBottom: 24
      }}>{journal}</div>
      <h1 style={{
        fontFamily: "var(--font-sans)", fontSize: 52, fontWeight: 700, lineHeight: 1.1,
        letterSpacing: "-0.02em", color: "#2a2a2a", margin: 0, textWrap: "balance"
      } as React.CSSProperties}>{title}</h1>
      {subtitle && <p style={{
        fontFamily: "var(--font-sans)", fontStyle: "italic", fontSize: 22, lineHeight: 1.4,
        color: "#4a4a4a", marginTop: 18, marginBottom: 0
      }}>{subtitle}</p>}
      <div style={{
        marginTop: 40, paddingTop: 18, borderTop: "1px solid #e8e8e4",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24,
        fontSize: 13, color: "#6a6a6a"
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Authors</div>
          <div style={{ color: "#2a2a2a" }}>{authors}</div>
          {affiliation && <div style={{ fontStyle: "italic", color: "#6a6a6a", marginTop: 2 }}>{affiliation}</div>}
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Published</div>
          <div style={{ color: "#2a2a2a" }}>{date}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>DOI</div>
          <div style={{ color: "#2a2a2a", fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 12 }}>10.23915/distill.00046</div>
        </div>
      </div>
    </header>
  );
}

interface TOCItem {
  id: string;
  label: string;
  depth: 1 | 2;
}

interface TOCDrawerProps {
  open: boolean;
  onClose: () => void;
  items?: TOCItem[];
}

function TOCDrawer({ open, onClose, items = [] }: TOCDrawerProps) {
  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(20,20,20,0.18)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity 200ms cubic-bezier(0.4,0,0.2,1)", zIndex: 30
      }} />
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 320,
        background: "#fdfdfd", borderRight: "1px solid #e8e8e4",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 240ms cubic-bezier(0.4,0,0.2,1)", zIndex: 31,
        padding: "24px 28px", overflowY: "auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6a6a6a" }}>Contents</div>
          <div style={{ flex: 1 }} />
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "#6a6a6a" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.85 }}>
          {items.map((it, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              <a href={`#${it.id}`} onClick={onClose} style={{
                textDecoration: "none", display: "block",
                paddingLeft: it.depth === 2 ? 16 : 0,
                fontWeight: it.depth === 1 ? 500 : 400,
                fontSize: it.depth === 2 ? 13 : 14,
                color: it.depth === 2 ? "#6a6a6a" : "#2a2a2a"
              }}>{it.label}</a>
            </li>
          ))}
        </ol>
      </aside>
    </>
  );
}

interface ArticleFooterProps {
  acknowledgments?: any;
  authorContributions?: any;
  reviewLinks?: { label: string; href: string }[];
  references?: any;
  updates?: any;
  reuseNote?: any;
  citation?: string;
}

function ArticleFooter({
  acknowledgments = "This article is a recreation made for design-system reference. The original figures, prose, and ideas are credited to their authors.",
  authorContributions,
  reviewLinks,
  references,
  updates = "If you see mistakes or want to suggest changes, please create an issue on GitHub.",
  reuseNote = "Diagrams and text are licensed under Creative Commons Attribution CC-BY 4.0 with the source available on GitHub, unless noted otherwise. The figures that have been reused from other sources don't fall under this license and can be recognized by a note in their caption: \"Figure from …\".",
  citation = `Dumoulin et al., "Feature-wise transformations", Distill, 2018.`,
}: ArticleFooterProps) {
  const labelStyle: React.CSSProperties = {
    fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
    marginBottom: 6, color: "#6a6a6a",
  };
  const Section = ({ label, children }: { label: string; children: any }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={labelStyle}>{label}</div>
      <div>{children}</div>
    </div>
  );
  return (
    <footer style={{
      maxWidth: 704, margin: "0 auto", padding: "64px 24px 96px",
      fontFamily: "var(--font-sans)", fontSize: 13, color: "#6a6a6a", lineHeight: 1.6
    }}>
      <hr style={{ border: "none", borderTop: "1px solid #e8e8e4", margin: "0 0 32px" }} />
      {acknowledgments && <Section label="Acknowledgments">{acknowledgments}</Section>}
      {authorContributions && <Section label="Author Contributions">{authorContributions}</Section>}
      {reviewLinks && reviewLinks.length > 0 && (
        <Section label="Discussion and Review">
          {reviewLinks.map((r, i) => (
            <span key={i} style={{ display: "inline-block", marginRight: 16 }}>
              <a href={r.href} style={{ color: "#2a2a2a", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.4)" }}>{r.label}</a>
            </span>
          ))}
        </Section>
      )}
      {references && <Section label="References">{references}</Section>}
      <Section label="Updates and Corrections">{updates}</Section>
      <Section label="Reuse">{reuseNote}</Section>
      <Section label="Citation">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, background: "#faf9f6", border: "1px solid #e8e8e4", borderRadius: 4, padding: "10px 12px", color: "#2a2a2a", overflowX: "auto", whiteSpace: "nowrap" }}>
          {citation}
        </div>
      </Section>
    </footer>
  );
}

Object.assign(window as any, { ArticleNav, ArticleHeader, TOCDrawer, ArticleFooter });
