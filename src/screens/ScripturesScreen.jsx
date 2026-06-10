export default function ScripturesScreen({ week }) {
  const books = [
    { ref: "1 Kings 17", url: "https://www.bible.com/bible/1/1KI.17.KJV", desc: "Elijah and the widow, ravens at Cherith" },
    { ref: "1 Kings 18", url: "https://www.bible.com/bible/1/1KI.18.KJV", desc: "Mount Carmel, fire from heaven" },
    { ref: "1 Kings 19", url: "https://www.bible.com/bible/1/1KI.19.KJV", desc: "Still small voice, Elisha called" },
    { ref: "2 Kings 2", url: "https://www.bible.com/bible/1/2KI.2.KJV", desc: "Elijah taken up, Elisha receives mantle" },
    { ref: "2 Kings 4", url: "https://www.bible.com/bible/1/2KI.4.KJV", desc: "Widow's oil, Shunammite's son raised" },
    { ref: "2 Kings 5", url: "https://www.bible.com/bible/1/2KI.5.KJV", desc: "Naaman healed of leprosy" },
    { ref: "2 Kings 6", url: "https://www.bible.com/bible/1/2KI.6.KJV", desc: "Chariots of fire, eyes opened" },
  ];

  const keyVerses = [
    { ref: "1 Kings 18:21", text: "How long halt ye between two opinions? if the Lord be God, follow him.", url: "https://www.bible.com/bible/1/1KI.18.21.KJV" },
    { ref: "1 Kings 19:12", text: "And after the earthquake a fire; but the Lord was not in the fire: and after the fire a still small voice.", url: "https://www.bible.com/bible/1/1KI.19.12.KJV" },
    { ref: "2 Kings 2:9", text: "And Elisha said, I pray thee, let a double portion of thy spirit be upon me.", url: "https://www.bible.com/bible/1/2KI.2.9.KJV" },
    { ref: "2 Kings 5:13", text: "If the prophet had bid thee do some great thing, wouldest thou not have done it?", url: "https://www.bible.com/bible/1/2KI.5.13.KJV" },
    { ref: "2 Kings 6:16", text: "Fear not: for they that be with us are more than they that be with them.", url: "https://www.bible.com/bible/1/2KI.6.16.KJV" },
  ];

  return (
    <div style={{ padding: "20px 16px" }}>
      <h2 style={{
        fontFamily: "'EB Garamond', serif", fontSize: 26, fontWeight: 600,
        color: "#1B3A2D", marginBottom: 4,
      }}>Scriptures</h2>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
        color: "#888", marginBottom: 20,
      }}>{week.scriptureRange} · {week.dateRange}</p>

      {/* Chapter list */}
      <div style={{
        background: "#fff", borderRadius: 14,
        border: "1.5px solid #E0DDD8", marginBottom: 20, overflow: "hidden",
      }}>
        <div style={{
          padding: "12px 16px", background: "#F0F7E8",
          borderBottom: "1px solid #E0DDD8",
        }}>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#2D5016",
          }}>📖 This Week's Chapters</span>
        </div>
        {books.map((b, i) => (
          <a key={i} href={b.url} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "13px 16px", textDecoration: "none",
            borderBottom: i < books.length - 1 ? "1px solid #F0EDE8" : "none",
            background: "#fff",
          }}>
            <div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
                fontWeight: 700, color: "#1B3A2D",
              }}>{b.ref}</div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                color: "#888", marginTop: 2,
              }}>{b.desc}</div>
            </div>
            <span style={{ fontSize: 18, color: "#7AB648" }}>→</span>
          </a>
        ))}
      </div>

      {/* Key verses */}
      <div style={{
        background: "#fff", borderRadius: 14,
        border: "1.5px solid #E0DDD8", overflow: "hidden",
      }}>
        <div style={{
          padding: "12px 16px", background: "#F0F7E8",
          borderBottom: "1px solid #E0DDD8",
        }}>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#2D5016",
          }}>📜 Key Verses This Week</span>
        </div>
        {keyVerses.map((v, i) => (
          <a key={i} href={v.url} target="_blank" rel="noreferrer" style={{
            display: "block", padding: "14px 16px",
            borderBottom: i < keyVerses.length - 1 ? "1px solid #F0EDE8" : "none",
            textDecoration: "none",
          }}>
            <div style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
              fontWeight: 700, color: "#7AB648", letterSpacing: "0.06em",
              textTransform: "uppercase", marginBottom: 5,
            }}>{v.ref}</div>
            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: 17,
              color: "#2A3828", fontStyle: "italic", lineHeight: 1.65,
            }}>"{v.text}"</div>
          </a>
        ))}
      </div>

      {/* Bible.com note */}
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
        color: "#BBB", textAlign: "center", marginTop: 16, lineHeight: 1.6,
      }}>
        All scripture links open in Bible.com (YouVersion) for reliable access.
        You can also read these in the <strong>Gospel Library app</strong>.
      </p>
      <div style={{ height: 16 }} />
    </div>
  );
}
