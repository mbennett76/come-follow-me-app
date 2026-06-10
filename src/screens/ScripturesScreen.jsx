export default function ScripturesScreen({ week }) {
  const books = [
    {
      ref: "1 Kings 17", desc: "Elijah and the widow, ravens at Cherith",
      appUrl: "gospellibrary://content/scriptures/ot/1-kgs/17",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs/17?lang=eng",
    },
    {
      ref: "1 Kings 18", desc: "Mount Carmel, fire from heaven",
      appUrl: "gospellibrary://content/scriptures/ot/1-kgs/18",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs/18?lang=eng",
    },
    {
      ref: "1 Kings 19", desc: "Still small voice, Elisha called",
      appUrl: "gospellibrary://content/scriptures/ot/1-kgs/19",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs/19?lang=eng",
    },
    {
      ref: "2 Kings 2", desc: "Elijah taken up, Elisha receives mantle",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/2",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/2?lang=eng",
    },
    {
      ref: "2 Kings 4", desc: "Widow's oil, Shunammite's son raised",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/4",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/4?lang=eng",
    },
    {
      ref: "2 Kings 5", desc: "Naaman healed of leprosy",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/5",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/5?lang=eng",
    },
    {
      ref: "2 Kings 6", desc: "Chariots of fire, eyes opened",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/6",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/6?lang=eng",
    },
  ];

  const keyVerses = [
    {
      ref: "1 Kings 18:21",
      text: "How long halt ye between two opinions? if the Lord be God, follow him.",
      appUrl: "gospellibrary://content/scriptures/ot/1-kgs/18.21#p21",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs/18?lang=eng&id=p21#p21",
    },
    {
      ref: "1 Kings 19:12",
      text: "And after the earthquake a fire; but the Lord was not in the fire: and after the fire a still small voice.",
      appUrl: "gospellibrary://content/scriptures/ot/1-kgs/19.12#p12",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs/19?lang=eng&id=p12#p12",
    },
    {
      ref: "2 Kings 2:9",
      text: "I pray thee, let a double portion of thy spirit be upon me.",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/2.9#p9",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/2?lang=eng&id=p9#p9",
    },
    {
      ref: "2 Kings 5:13",
      text: "If the prophet had bid thee do some great thing, wouldest thou not have done it?",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/5.13#p13",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/5?lang=eng&id=p13#p13",
    },
    {
      ref: "2 Kings 6:16",
      text: "Fear not: for they that be with us are more than they that be with them.",
      appUrl: "gospellibrary://content/scriptures/ot/2-kgs/6.16#p16",
      webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs/6?lang=eng&id=p16#p16",
    },
  ];

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

      {/* App tip banner */}
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

      {/* Chapter list */}
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
        {books.map((b, i) => (
          <div key={i} style={{
            padding: "13px 16px",
            borderBottom: i < books.length - 1 ? "1px solid #F0EDE8" : "none",
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

      {/* Key verses */}
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

      <div style={{ height: 16 }} />
    </div>
  );
}
