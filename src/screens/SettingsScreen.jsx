export default function SettingsScreen({ studyMode, setStudyMode, completedItems, setCompletedItems }) {
  const totalCompleted = Object.values(completedItems).filter(Boolean).length;

  const clearProgress = () => {
    if (window.confirm("Clear all progress? This cannot be undone.")) {
      setCompletedItems({});
    }
  };

  return (
    <div style={{ padding: "20px 16px" }}>
      <h2 style={{
        fontFamily: "'EB Garamond', serif", fontSize: 26,
        fontWeight: 600, color: "#1B3A2D", marginBottom: 4,
      }}>Settings</h2>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
        color: "#888", marginBottom: 24,
      }}>Customize your study experience</p>

      {/* Study Mode */}
      <Section title="Study Mode" icon="🙏">
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          color: "#666", marginBottom: 14, lineHeight: 1.6,
        }}>
          Personal mode shows individual reflection questions. Family mode shows
          discussion questions designed for group study.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          {["personal", "family"].map(m => (
            <button key={m} onClick={() => setStudyMode(m)} style={{
              flex: 1, padding: "12px 10px",
              borderRadius: 12,
              border: `2px solid ${studyMode === m ? "#1B3A2D" : "#E0DDD8"}`,
              background: studyMode === m ? "#1B3A2D" : "#fff",
              color: studyMode === m ? "#fff" : "#666",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              transition: "all 0.15s",
            }}>
              {m === "personal" ? "🙏 Personal" : "👨‍👩‍👧 Family"}
            </button>
          ))}
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress" icon="📊">
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 0", borderBottom: "1px solid #F0EDE8",
        }}>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#555",
          }}>Items completed this season</span>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
            fontWeight: 700, color: "#1B3A2D",
          }}>{totalCompleted}</span>
        </div>
        <button onClick={clearProgress} style={{
          marginTop: 14, width: "100%", padding: "11px",
          borderRadius: 10, border: "1.5px solid #EF5350",
          background: "#FFF5F5", color: "#C62828",
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>
          🗑 Reset All Progress
        </button>
      </Section>

      {/* About */}
      <Section title="About This App" icon="ℹ️">
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          color: "#666", lineHeight: 1.75,
        }}>
          <p style={{ marginBottom: 10 }}>
            <strong>Come Follow Me Daily</strong> organizes the 2026 Old Testament
            curriculum into a structured 10–15 minute daily study program.
          </p>
          <p style={{ marginBottom: 10 }}>
            Content includes scripture readings, study insights, discussion questions,
            Follow Him podcast episodes, BibleProject videos, General Conference talks,
            and AI-generated closing reflections.
          </p>
          <p style={{ marginBottom: 0, color: "#AAA", fontSize: 13 }}>
            Built with React + Vite · Deployed on GitHub Pages<br />
            Scripture links via Bible.com (YouVersion) · AI via Claude
          </p>
        </div>
      </Section>

      {/* Resources */}
      <Section title="Study Resources" icon="🔗">
        {[
          { label: "Gospel Library App", url: "https://www.churchofjesuschrist.org/pages/mobileapps", emoji: "📱" },
          { label: "Come Follow Me Manual", url: "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-individuals-and-families-old-testament-2022", emoji: "📖" },
          { label: "Follow Him Podcast", url: "https://followhimpodcast.com", emoji: "🎙️" },
          { label: "BibleProject", url: "https://bibleproject.com", emoji: "🎬" },
          { label: "Scripture Central", url: "https://scripturecentral.org", emoji: "🏛️" },
          { label: "General Conference", url: "https://www.churchofjesuschrist.org/study/general-conference", emoji: "📡" },
        ].map((r, i, arr) => (
          <a key={r.label} href={r.url} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: i < arr.length - 1 ? "1px solid #F0EDE8" : "none",
            textDecoration: "none",
          }}>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
              color: "#1B3A2D", fontWeight: 600,
            }}>{r.emoji} {r.label}</span>
            <span style={{ color: "#7AB648", fontSize: 16 }}>→</span>
          </a>
        ))}
      </Section>

      <div style={{ height: 16 }} />
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: "1.5px solid #E0DDD8", marginBottom: 16, overflow: "hidden",
    }}>
      <div style={{
        padding: "12px 16px", background: "#F8F6F2",
        borderBottom: "1px solid #E0DDD8", display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
          fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555",
        }}>{title}</span>
      </div>
      <div style={{ padding: "14px 16px" }}>{children}</div>
    </div>
  );
}
