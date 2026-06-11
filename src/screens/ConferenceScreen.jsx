import { useState } from "react";
import { ALL_CONFERENCE_TALKS } from "../data/weekData.js";

export default function ConferenceScreen({ week }) {
  const [search, setSearch] = useState("");

  const filtered = ALL_CONFERENCE_TALKS.filter(t => {
    const q = search.toLowerCase();
    return !q ||
      t.title.toLowerCase().includes(q) ||
      t.speaker.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q)) ||
      t.conference.toLowerCase().includes(q);
  });

  // Use featuredTalkIds from week data if available
  const featuredIds = week.featuredTalkIds || [];
  const weekTalks = featuredIds.length > 0
    ? featuredIds.map(id => ALL_CONFERENCE_TALKS.find(t => t.id === id)).filter(Boolean)
    : [];

  return (
    <div style={{ padding: "20px 16px" }}>
      <h2 style={{
        fontFamily: "'EB Garamond', serif", fontSize: 26,
        fontWeight: 600, color: "#1B3A2D", marginBottom: 4,
      }}>General Conference</h2>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
        color: "#888", marginBottom: 16,
      }}>Talks curated for {week.scriptureRange}</p>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#fff", border: "1.5px solid #E0DDD8",
        borderRadius: 12, padding: "10px 14px", marginBottom: 20,
      }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by speaker, topic, or keyword…"
          style={{
            flex: 1, border: "none", outline: "none",
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
            background: "transparent", color: "#333",
          }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 16, color: "#aaa",
          }}>✕</button>
        )}
      </div>

      {/* Featured talks for this week */}
      {!search && weekTalks.length > 0 && (
        <>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#1A237E", marginBottom: 12,
          }}>🏛️ Featured for {week.scriptureRange}</div>
          {weekTalks.map(talk => (
            <TalkCard key={talk.id} talk={talk} featured />
          ))}
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#888", margin: "20px 0 12px",
          }}>All Curated Talks</div>
        </>
      )}

      {/* Skeleton week — no featured talks yet */}
      {!search && weekTalks.length === 0 && (
        <div style={{
          background: "#FFF8E1", border: "1.5px dashed #FFC107",
          borderRadius: 12, padding: "12px 16px", marginBottom: 20,
        }}>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
            color: "#7B5E00", margin: 0, lineHeight: 1.65,
          }}>
            Featured talks for {week.scriptureRange} haven't been curated yet.
            Browse all talks below, or generate this week's content using ⚙️ Settings → Generate Week Content.
          </p>
        </div>
      )}

      {/* All talks list */}
      {(search ? filtered : ALL_CONFERENCE_TALKS).map(talk => (
        <TalkCard key={talk.id} talk={talk} />
      ))}

      {filtered.length === 0 && (
        <div style={{
          textAlign: "center", padding: "40px 20px",
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#888",
        }}>No talks found for "{search}"</div>
      )}
      <div style={{ height: 16 }} />
    </div>
  );
}

function TalkCard({ talk, featured }) {
  return (
    <div style={{
      background: "#fff",
      border: `1.5px solid ${featured ? "#3F51B5" : "#E0DDD8"}`,
      borderRadius: 14, marginBottom: 12, overflow: "hidden",
    }}>
      {featured && (
        <div style={{
          background: "#E8EAF6", padding: "5px 14px",
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
          fontWeight: 700, color: "#3F51B5", letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>⭐ Featured this week</div>
      )}
      <div style={{ padding: "14px 16px" }}>
        <div style={{
          fontFamily: "'EB Garamond', serif", fontSize: 18,
          fontWeight: 600, color: "#1B3A2D", marginBottom: 3,
        }}>{talk.title}</div>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          color: "#3F51B5", fontWeight: 600, marginBottom: 6,
        }}>{talk.speaker} · {talk.conference}</div>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          color: "#555", lineHeight: 1.65, marginBottom: 12,
        }}>{talk.description}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href={talk.url} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 700, color: "#1A237E",
            background: "#E8EAF6", border: "1.5px solid #3F51B5",
            padding: "6px 13px", borderRadius: 20, textDecoration: "none",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>🏛️ Read Talk →</a>
          {talk.fallbackUrl && (
            <a href={talk.fallbackUrl} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: "#777",
              background: "#F5F5F5", border: "1.5px solid #DDD",
              padding: "6px 13px", borderRadius: 20, textDecoration: "none",
              fontFamily: "'Source Sans 3', sans-serif",
            }}>🔍 Search Google</a>
          )}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {talk.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, color: "#888", background: "#F5F5F5",
              padding: "2px 8px", borderRadius: 8,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
