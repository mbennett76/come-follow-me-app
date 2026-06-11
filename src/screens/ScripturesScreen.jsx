export default function ScripturesScreen({ week }) {
  const chapters = week.scriptureChapters || [];
  const keyVerses = week.keyVerses || [];
  const isSkeleton = week.skeleton || (!week.scriptureChapters);

  return (
    <div style={{ padding: "20px 16px" }}>
      <h2 style={{
        fontFamily: "'EB Garamond', serif", fontSize: 26,
        fontWeight: 600, color: "#1B3A2D", marginBottom: 4,
      }}>Scriptures</h2>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
        color: "#888", marginBottom: 6,
      }}>{week.scriptureRange} · {week.dateRange}</p>

      {/* Gospel Library tip */}
      <div style={{
        background: "#E8F5EE", border: "1.5px solid #7AB648",
        borderRadius: 12, padding: "10px 14px", marginBottom: 20,
        display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>📱</span>
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          color: "#2D5016", margin: 0, lineHeight: 1.6,
        }}>
          <strong>Gospel Library links</strong> open directly in your Gospel Library app.
          Each chapter also has a <strong>browser backup</strong> if needed.
        </p>
      </div>

      {/* Skeleton week fallback */}
      {isSkeleton && (
        <div style={{
          background: "#FFF8E1", border: "1.5px dashed #FFC107",
          borderRadius: 12, padding: "14px 16px", marginBottom: 20,
        }}>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
            color: "#7B5E00", margin: "0 0 12px", lineHeight: 1.65,
          }}>
            Detailed chapter breakdown for this week hasn't been added yet.
            You can read the full scripture block in Gospel Library:
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="gospellibrary://content/scriptures/ot" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 700, color: "#2D5016",
              background: "#F0F7E8", border: "1.5px solid #7AB648",
              padding: "7px 13px", borderRadius: 20, textDecoration: "none",
              fontFamily: "'Source Sans 3', sans-serif",
            }}>📱 Open Gospel Library</a>
            <a href="https://www.churchofjesuschrist.org/study/scriptures/ot?lang=eng"
              target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: "#777",
              background: "#F5F5F5", border: "1.5px solid #DDD",
              padding: "7px 13px", borderRadius: 20, textDecoration: "none",
              fontFamily: "'Source Sans 3', sans-serif",
            }}>🌐 Browser</a>
          </div>
        </div>
      )}

      {/* Chapter list */}
      {chapters.length > 0 && (
        <div style={{
          background: "#fff", borderRadius: 14,
          border: "1.5px solid #E0DDD8", marginBottom: 20, overflow: "hidden",
        }}>
          <div style={{
            padding: "11px 16px", background: "#F0F7E8",
            borderBottom: "1px solid #E0DDD8",
          }}>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2D5016",
            }}>📖 This Week's Chapters</span>
          </div>
          {chapters.map((b, i) => (
            <div key={i} style={{
              padding: "13px 16px",
              borderBottom: i < chapters.length - 1 ? "1px solid #F0EDE8" : "none",
            }}>
              <div style={{ marginBottom: 8 }}>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
                  fontWeight: 700, color: "#1B3A2D",
                }}>{b.ref}</div>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                  color: "#888", marginTop: 2,
                }}>{b.desc}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={b.appUrl} style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 12, fontWeight: 700, color: "#2D5016",
                  background: "#F0F7E8", border: "1.5px solid #7AB648",
                  padding: "5px 11px", borderRadius: 16, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>📱 Gospel Library</a>
                <a href={b.webUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 12, fontWeight: 600, color: "#777",
                  background: "#F5F5F5", border: "1.5px solid #DDD",
                  padding: "5px 11px", borderRadius: 16, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>🌐 Browser</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key verses */}
      {keyVerses.length > 0 && (
        <div style={{
          background: "#fff", borderRadius: 14,
          border: "1.5px solid #E0DDD8", overflow: "hidden",
        }}>
          <div style={{
            padding: "11px 16px", background: "#F0F7E8",
            borderBottom: "1px solid #E0DDD8",
          }}>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2D5016",
            }}>📜 Key Verses This Week</span>
          </div>
          {keyVerses.map((v, i) => (
            <div key={i} style={{
              padding: "14px 16px",
              borderBottom: i < keyVerses.length - 1 ? "1px solid #F0EDE8" : "none",
            }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                fontWeight: 700, color: "#7AB648", letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: 6,
              }}>{v.ref}</div>
              <div style={{
                fontFamily: "'EB Garamond', serif", fontSize: 17,
                color: "#2A3828", fontStyle: "italic",
                lineHeight: 1.65, marginBottom: 10,
              }}>"{v.text}"</div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={v.appUrl} style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 12, fontWeight: 700, color: "#2D5016",
                  background: "#F0F7E8", border: "1.5px solid #7AB648",
                  padding: "5px 11px", borderRadius: 16, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>📱 Gospel Library</a>
                <a href={v.webUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 12, fontWeight: 600, color: "#777",
                  background: "#F5F5F5", border: "1.5px solid #DDD",
                  padding: "5px 11px", borderRadius: 16, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>🌐 Browser</a>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ height: 16 }} />
    </div>
  );
}
