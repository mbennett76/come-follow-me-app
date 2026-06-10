import { useState } from "react";
import { TYPE_CONFIG } from "../data/weekData.js";

export default function ContentCard({ item, completed, onToggle, studyMode }) {
  const [expanded, setExpanded] = useState(true);
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.insight;

  // Filter by study mode
  if (item.type === "question" && item.mode && item.mode !== "both") {
    if (item.mode === "personal" && studyMode === "family") return null;
    if (item.mode === "family" && studyMode === "personal") return null;
  }

  return (
    <div style={{
      borderRadius: 16, border: `2px solid ${completed ? "#C8E6C9" : cfg.border}`,
      background: completed ? "#F9FFF9" : cfg.bg,
      marginBottom: 14, overflow: "hidden",
      transition: "all 0.2s ease", opacity: completed ? 0.7 : 1,
    }}>
      {/* Header */}
      <div onClick={() => setExpanded(e => !e)} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "13px 16px", cursor: "pointer", userSelect: "none",
      }}>
        <span style={{ fontSize: 20 }}>{item.icon}</span>
        <span style={{
          flex: 1, fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 13, fontWeight: 700, letterSpacing: "0.07em",
          textTransform: "uppercase", color: cfg.color,
        }}>{item.label}</span>
        <span style={{ fontSize: 11, color: "#aaa", marginRight: 6 }}>{expanded ? "▲" : "▼"}</span>
        <button onClick={e => { e.stopPropagation(); onToggle(); }} style={{
          width: 28, height: 28, borderRadius: "50%",
          border: `2px solid ${completed ? "#4CAF50" : cfg.border}`,
          background: completed ? "#4CAF50" : "transparent",
          color: completed ? "#fff" : cfg.color,
          cursor: "pointer", fontSize: 14, display: "flex",
          alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.15s",
        }}>{completed ? "✓" : "○"}</button>
      </div>

      {expanded && (
        <div style={{ padding: "0 16px 16px" }}>

          {/* Scripture */}
          {item.type === "scripture" && (<>
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: 18,
              lineHeight: 1.75, color: "#2A3828", fontStyle: "italic", margin: "0 0 12px",
            }}>"{item.text}"</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {/* Primary: Gospel Library deep link — opens app on phone */}
              <a href={item.url} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 14, fontWeight: 700, color: cfg.color,
                background: "#fff", border: `1.5px solid ${cfg.border}`,
                padding: "7px 14px", borderRadius: 20, textDecoration: "none",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>📱 Open in Gospel Library</a>
              {/* Fallback: web browser */}
              {item.webUrl && (
                <a href={item.webUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 600, color: "#777",
                  background: "#F5F5F5", border: "1.5px solid #DDD",
                  padding: "7px 13px", borderRadius: 20, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>🌐 Open in Browser</a>
              )}
            </div>
            <p style={{
              fontSize: 11, color: "#BBB", margin: "8px 0 0", lineHeight: 1.5,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>
              📱 Tap "Gospel Library" to open in the app · 🌐 "Browser" as backup
            </p>
          </>)}

          {/* Insight / intro / review / nextweek */}
          {["insight","intro","review","nextweek"].includes(item.type) && (
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 16,
              lineHeight: 1.75, color: "#3A3A3A", margin: 0,
            }}>{item.text}</p>
          )}

          {/* Question */}
          {item.type === "question" && (<>
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: 18,
              lineHeight: 1.75, color: "#3A1038", fontStyle: "italic", margin: "0 0 10px",
            }}>{item.text}</p>
            {item.mode === "family" && (
              <span style={{
                display: "inline-block", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#9B59B6", background: "#F0E6F7",
                padding: "3px 10px", borderRadius: 10,
                fontFamily: "'Source Sans 3', sans-serif",
              }}>👨‍👩‍👧 Family</span>
            )}
            {item.mode === "personal" && (
              <span style={{
                display: "inline-block", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#1A3A5C", background: "#E8F2FA",
                padding: "3px 10px", borderRadius: 10,
                fontFamily: "'Source Sans 3', sans-serif",
              }}>🙏 Personal</span>
            )}
          </>)}

          {/* Video / Line Upon Line — YouTube embed */}
          {(item.type === "video" || item.type === "lineUponLine") && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
              color: "#555", margin: "0 0 12px", lineHeight: 1.65,
            }}>{item.description}</p>
            <div style={{
              borderRadius: 10, overflow: "hidden", background: "#000",
              position: "relative", paddingBottom: "56.25%", height: 0,
            }}>
              <iframe
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                src={`https://www.youtube-nocookie.com/embed/${item.embedId}?rel=0&modestbranding=1`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a href={`https://www.youtube.com/watch?v=${item.embedId}`}
              target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 600, color: "#E8732A",
                textDecoration: "none", marginTop: 8,
                fontFamily: "'Source Sans 3', sans-serif",
              }}>▶ Open in YouTube if video doesn't load</a>
          </>)}

          {/* Podcast */}
          {item.type === "podcast" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
              color: "#555", lineHeight: 1.7, margin: "0 0 8px",
            }}>{item.description}</p>
            {item.note && <p style={{
              fontSize: 13, color: "#27AE60", fontWeight: 700,
              margin: "0 0 12px", fontFamily: "'Source Sans 3', sans-serif",
            }}>⏱ {item.note}</p>}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "Follow Him Website", url: item.podcastUrl, emoji: "🌐" },
                { label: "Apple Podcasts", url: item.appleUrl, emoji: "🎵" },
                { label: "Spotify", url: item.spotifyUrl, emoji: "🎧" },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 13, fontWeight: 700, color: "#0D3D2B",
                  background: "#fff", border: "1.5px solid #27AE60",
                  padding: "7px 13px", borderRadius: 20,
                  textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                }}>{link.emoji} {link.label}</a>
              ))}
            </div>
          </>)}

          {/* Article / CFM Manual */}
          {item.type === "article" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 12, color: "#999", margin: "0 0 4px",
            }}>{item.author} · {item.publication}</p>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
              color: "#555", lineHeight: 1.7, margin: "0 0 12px",
            }}>{item.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <a href={item.url} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 700, color: "#2C3E50",
                background: "#fff", border: "1.5px solid #95A5A6",
                padding: "7px 13px", borderRadius: 20,
                textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
              }}>📰 Open Article →</a>
              {item.fallbackUrl && (
                <a href={item.fallbackUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 600, color: "#777",
                  background: "#F5F5F5", border: "1.5px solid #DDD",
                  padding: "7px 13px", borderRadius: 20,
                  textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                }}>🔍 Search Google instead</a>
              )}
            </div>
            <p style={{
              fontSize: 11, color: "#BBB", margin: 0, lineHeight: 1.5,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>💡 If you get a 502 error, tap "Search Google" or use the Gospel Library app.</p>
          </>)}

          {/* Coming Soon placeholder */}
          {item.type === "coming" && (
            <div style={{
              background: "linear-gradient(135deg, #FFF8E1, #FFF3CC)",
              border: "1.5px dashed #FFC107",
              borderRadius: 10, padding: "14px 16px",
            }}>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
                color: "#7B5E00", lineHeight: 1.7, margin: 0,
              }}>{item.text}</p>
            </div>
          )}

          {/* General Conference */}
          {item.type === "conference" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 13, color: "#3F51B5", fontWeight: 700, margin: "0 0 4px",
            }}>{item.speaker} · {item.conference}</p>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
              color: "#555", lineHeight: 1.7, margin: "0 0 12px",
            }}>{item.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <a href={item.url} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 700, color: "#1A237E",
                background: "#fff", border: "1.5px solid #3F51B5",
                padding: "7px 13px", borderRadius: 20,
                textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
              }}>🏛️ Read Talk →</a>
              {item.fallbackUrl && (
                <a href={item.fallbackUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 600, color: "#777",
                  background: "#F5F5F5", border: "1.5px solid #DDD",
                  padding: "7px 13px", borderRadius: 20,
                  textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                }}>🔍 Search Google instead</a>
              )}
            </div>
            <p style={{
              fontSize: 11, color: "#BBB", margin: 0, lineHeight: 1.5,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>💡 If you get a 502 error, tap "Search Google" or use the Gospel Library app.</p>
          </>)}

        </div>
      )}
    </div>
  );
}
