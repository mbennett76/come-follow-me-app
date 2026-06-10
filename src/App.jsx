import { useState, useCallback } from "react";

// ── Scripture URL helper — uses scriptures.byu.edu (always available) ────────
function scriptureUrl(book, chapter) {
  // e.g. book="1-kgs", chapter="17"
  return `https://scriptures.byu.edu/#1kgs${chapter}`;
}

// ── Week data for current CFM 2026 (Old Testament) ──────────────────────────
const CURRENT_WEEK = {
  weekNumber: 24,
  year: 2026,
  dateRange: "June 8–14, 2026",
  title: "If the Lord Be God, Follow Him",
  scriptureRange: "1 Kings 17–19",
  theme:
    "Elijah's ministry teaches us that God provides in times of drought, raises the dead, calls down fire, and whispers to us in our own wilderness moments.",
  days: [
    {
      day: 0,
      label: "Sunday",
      shortLabel: "Sun",
      title: "Overview & Invitation",
      timeEst: "10 min",
      content: [
        {
          type: "intro",
          icon: "📖",
          label: "This Week's Focus",
          text: "This week we study Elijah — one of the most dramatic prophets in the Old Testament. His confrontation with the priests of Baal, his flight to Horeb, and God's still small voice are among scripture's most enduring images.",
        },
        {
          type: "scripture",
          icon: "📜",
          label: "Opening Verse",
          reference: "1 Kings 18:21",
          text: "And Elijah came unto all the people, and said, How long halt ye between two opinions? if the Lord be God, follow him: but if Baal, then follow him.",
          url: "https://www.bible.com/bible/1/1KI.18.21.KJV",
        },
        {
          type: "video",
          icon: "🎬",
          label: "Church Video",
          title: "Old Testament: 1 Kings Overview",
          description: "A visual overview of the divided kingdom era and Elijah's ministry.",
          embedId: "5sAgME02ubs",
          url: "https://www.youtube.com/watch?v=5sAgME02ubs",
        },
        {
          type: "question",
          icon: "💭",
          label: "Reflection to Carry This Week",
          text: "Where in your life are you 'halting between two opinions'? What would it mean to more fully follow the Lord this week?",
          mode: "both",
        },
      ],
    },
    {
      day: 1,
      label: "Monday",
      shortLabel: "Mon",
      title: "Ravens & a Widow",
      timeEst: "12 min",
      content: [
        {
          type: "scripture",
          icon: "📜",
          label: "Scripture Reading",
          reference: "1 Kings 17:1–24",
          text: "Elijah declares drought, is fed by ravens at Cherith, then raises a widow's son at Zarephath.",
          url: "https://www.bible.com/bible/1/1KI.17.KJV",
        },
        {
          type: "insight",
          icon: "💡",
          label: "Study Insight",
          text: "The widow of Zarephath had only enough oil and meal for one last meal. Notice that Elijah asked her to make his cake first — a test of faith before the miracle. The barrel of meal wasted not, neither did the cruse of oil fail (v. 16). When has obedience preceded abundance in your own life?",
        },
        {
          type: "question",
          icon: "💭",
          label: "Discussion Question",
          text: "The widow was asked to give her last resources before receiving the miracle. What does this teach about how God often works? How does this apply to tithing, service, or trust?",
          mode: "both",
        },
        {
          type: "lineUponLine",
          icon: "🎥",
          label: "Line Upon Line",
          title: "1 Kings 17 — The Widow of Zarephath",
          description: "Short animated scripture video exploring Elijah's time with the widow.",
          embedId: "bm-i6tECKNI",
          url: "https://www.youtube.com/watch?v=bm-i6tECKNI",
        },
      ],
    },
    {
      day: 2,
      label: "Tuesday",
      shortLabel: "Tue",
      title: "Fire from Heaven",
      timeEst: "13 min",
      content: [
        {
          type: "scripture",
          icon: "📜",
          label: "Scripture Reading",
          reference: "1 Kings 18:1–40",
          text: "Elijah's confrontation with the 450 priests of Baal on Mount Carmel. The contest, the prayer, the fire.",
          url: "https://www.bible.com/bible/1/1KI.18.KJV",
        },
        {
          type: "insight",
          icon: "💡",
          label: "Study Insight",
          text: "Elijah repaired the altar of the Lord that was broken down (18:30) before calling on God. Spiritual power often follows restoration — of covenants, habits, or relationships with God.",
        },
        {
          type: "podcast",
          icon: "🎙️",
          label: "Follow Him Podcast",
          title: "1 Kings 17–19 with Dr. Shon Hopkin",
          description:
            "Episode 24 of the 2026 season. Dr. Hopkin discusses the ancient Near East context of the Baal cult, the covenant implications of Elijah's prayer, and what the altar repair teaches us about returning to God.",
          podcastUrl: "https://followhimpodcast.com",
          spotifyUrl: "https://open.spotify.com/show/2dnak4SBEaUyWM9BBqZi9X",
          appleUrl: "https://podcasts.apple.com/us/podcast/follow-him/id1457038461",
          note: "Suggested listening: first 18 minutes",
        },
        {
          type: "question",
          icon: "💭",
          label: "Discussion Question",
          text: "Elijah asks 'How long halt ye between two opinions?' What are the 'two opinions' people face today? How do we choose to repair our altar and recommit?",
          mode: "both",
        },
      ],
    },
    {
      day: 3,
      label: "Wednesday",
      shortLabel: "Wed",
      title: "Into the Wilderness",
      timeEst: "15 min",
      content: [
        {
          type: "scripture",
          icon: "📜",
          label: "Scripture Reading",
          reference: "1 Kings 19:1–18",
          text: "Elijah flees Jezebel, collapses under a juniper tree, is ministered to by an angel, travels to Horeb, and hears the still small voice.",
          url: "https://www.bible.com/bible/1/1KI.19.KJV",
        },
        {
          type: "insight",
          icon: "💡",
          label: "Study Insight",
          text: "After his greatest victory, Elijah fell into despair. He said 'It is enough; now, O Lord, take away my life' (v.4). God's response was not a rebuke — it was food, water, and rest. God met Elijah's physical needs before His spiritual ones. Then came the still small voice. There is deep pastoral wisdom here for how we care for one another.",
        },
        {
          type: "article",
          icon: "📰",
          label: "Liahona Article",
          title: "When You Feel Alone in the Wilderness",
          author: "Come Follow Me Manual 2026",
          publication: "Official CFM Study Guide",
          description:
            "The manual explores Elijah's experience under the juniper tree as a type for our own exhausted, discouraged moments — and God's patient, nourishing response.",
          url: "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-individuals-and-families-old-testament-2022/26?lang=eng",
        },
        {
          type: "question",
          icon: "💭",
          label: "Discussion Question",
          text: "The angel touched Elijah and said 'Arise and eat; because the journey is too great for thee.' When has God sent someone to strengthen you during a wilderness moment?",
          mode: "both",
        },
      ],
    },
    {
      day: 4,
      label: "Thursday",
      shortLabel: "Thu",
      title: "Still Small Voice",
      timeEst: "12 min",
      content: [
        {
          type: "scripture",
          icon: "📜",
          label: "Key Verses",
          reference: "1 Kings 19:11–12",
          text: "And, behold, the Lord passed by, and a great and strong wind rent the mountains, and brake in pieces the rocks before the Lord; but the Lord was not in the wind: and after the wind an earthquake; but the Lord was not in the earthquake: and after the earthquake a fire; but the Lord was not in the fire: and after the fire a still small voice.",
          url: "https://www.bible.com/bible/1/1KI.19.11-12.KJV",
        },
        {
          type: "conference",
          icon: "🏛️",
          label: "General Conference",
          title: "Hear Him",
          speaker: "President Russell M. Nelson",
          conference: "April 2020 General Conference",
          description:
            "President Nelson's landmark talk on the Savior's invitation to hear Him — and our need to reduce noise, still our minds, and listen as Elijah listened. Foundational reading alongside 1 Kings 19.",
          url: "https://www.churchofjesuschrist.org/study/general-conference/2020/04/45nelson?lang=eng",
        },
        {
          type: "question",
          icon: "💭",
          label: "Personal Reflection",
          text: "God was not in the wind, earthquake, or fire — but in the still small voice. What 'noise' in your life might be making it difficult to hear that voice? What one thing could you do differently this week?",
          mode: "personal",
        },
        {
          type: "question",
          icon: "👨‍👩‍👧",
          label: "Family Discussion",
          text: "Ask your family: If God spoke to you right now in a still small voice, what do you think He might say? What helps you feel close enough to God to hear Him?",
          mode: "family",
        },
      ],
    },
    {
      day: 5,
      label: "Friday",
      shortLabel: "Fri",
      title: "Elisha Called",
      timeEst: "10 min",
      content: [
        {
          type: "scripture",
          icon: "📜",
          label: "Scripture Reading",
          reference: "1 Kings 19:19–21",
          text: "Elijah casts his mantle upon Elisha, who leaves his oxen and follows immediately.",
          url: "https://www.bible.com/bible/1/1KI.19.19-21.KJV",
        },
        {
          type: "insight",
          icon: "💡",
          label: "Study Insight",
          text: "Elisha burned his plowing equipment and sacrificed his oxen — he left no way to go back. This is a pattern of consecration throughout scripture. Compare to Matthew 4:20: 'And they straightway left their nets, and followed him.' The Lord doesn't always call us to burn our boats, but He does call us to be willing.",
        },
        {
          type: "conference",
          icon: "🏛️",
          label: "General Conference",
          title: "Come, Follow Me",
          speaker: "President Thomas S. Monson",
          conference: "April 2013 General Conference",
          description:
            "President Monson on the pattern of leaving everything to follow Christ — illustrated beautifully by how Elisha responded without hesitation when the mantle fell on his shoulders.",
          url: "https://www.churchofjesuschrist.org/study/general-conference/2013/04/come-follow-me?lang=eng",
        },
        {
          type: "question",
          icon: "💭",
          label: "Discussion Question",
          text: "Elisha left everything when called. What does consecrated discipleship look like in everyday life — not just for prophets? What are you willing to leave behind to follow more fully?",
          mode: "both",
        },
      ],
    },
    {
      day: 6,
      label: "Saturday",
      shortLabel: "Sat",
      title: "Week Reflection",
      timeEst: "10 min",
      content: [
        {
          type: "review",
          icon: "🔄",
          label: "Week in Review",
          text: "This week you walked with Elijah through drought, fire, despair, and divine whisper. You saw God provide through ravens and a widow. You heard the still small voice after the storm. You watched a new prophet answer his call without looking back.",
        },
        {
          type: "question",
          icon: "💭",
          label: "Personal Reflection",
          text: "Which moment in Elijah's story resonated most with where you are right now? What one truth from this week do you want to carry forward?",
          mode: "personal",
        },
        {
          type: "question",
          icon: "👨‍👩‍👧",
          label: "Family Council",
          text: "As a family, discuss: What does your family's 'altar' look like — the covenant habits and practices that keep you centered on God? Is there anything that needs repairing or renewing?",
          mode: "family",
        },
        {
          type: "nextweek",
          icon: "➡️",
          label: "Coming Next Week",
          text: "Next week: 2 Kings 2–7 — Elisha receives Elijah's mantle, heals Naaman the Syrian, and multiplies oil for a widow. Themes: spiritual inheritance, unlikely healings, and abundance from nothing.",
        },
      ],
    },
  ],
};

// ── Content type colours ──────────────────────────────────────────────────────
const TYPE_CONFIG = {
  scripture:   { color: "#2D5016", bg: "#F0F7E8", border: "#7AB648" },
  insight:     { color: "#1A3A5C", bg: "#E8F2FA", border: "#4A90D9" },
  question:    { color: "#4A1942", bg: "#F7EEF6", border: "#9B59B6" },
  video:       { color: "#6B2D0A", bg: "#FEF3EC", border: "#E8732A" },
  podcast:     { color: "#0D3D2B", bg: "#E8F5EF", border: "#27AE60" },
  lineUponLine:{ color: "#6B2D0A", bg: "#FEF3EC", border: "#E8732A" },
  article:     { color: "#2C3E50", bg: "#ECF0F1", border: "#95A5A6" },
  conference:  { color: "#1A237E", bg: "#E8EAF6", border: "#3F51B5" },
  intro:       { color: "#37474F", bg: "#ECEFF1", border: "#90A4AE" },
  review:      { color: "#37474F", bg: "#ECEFF1", border: "#90A4AE" },
  nextweek:    { color: "#1B5E20", bg: "#E8F5E9", border: "#4CAF50" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function getTodayDayIndex() { return new Date().getDay(); }

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch { return initial; }
  });
  const save = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, save];
}

// ── Claude AI Reflection ──────────────────────────────────────────────────────
async function generateAIReflection(dayData, userMode) {
  const summary = dayData.content
    .map(c => `${c.label}: ${c.text || c.description || c.title || ""}`)
    .join("\n");
  const prompt = `You are a warm, knowledgeable Come Follow Me study companion. Based on today's study about "${dayData.title}" (1 Kings 17–19), write a brief, personal, spiritually uplifting closing reflection (3–4 sentences) for a ${userMode === "family" ? "family" : "personal"} gospel study. Be warm, specific to the content, and end with one simple actionable invitation. Content:\n${summary}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// ── ContentCard ───────────────────────────────────────────────────────────────
function ContentCard({ item, completed, onToggle, studyMode }) {
  const [expanded, setExpanded] = useState(true);
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.insight;

  // Hide questions that don't match current study mode
  if (item.type === "question" && item.mode && item.mode !== "both") {
    if (item.mode === "personal" && studyMode === "family") return null;
    if (item.mode === "family"   && studyMode === "personal") return null;
  }

  return (
    <div style={{
      borderRadius: 16,
      border: `2px solid ${completed ? "#C8E6C9" : cfg.border}`,
      background: completed ? "#F9FFF9" : cfg.bg,
      marginBottom: 16,
      overflow: "hidden",
      transition: "all 0.2s ease",
      opacity: completed ? 0.72 : 1,
    }}>
      {/* Header row */}
      <div onClick={() => setExpanded(e => !e)} style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 18px", cursor: "pointer", userSelect: "none",
      }}>
        <span style={{ fontSize: 22 }}>{item.icon}</span>
        <span style={{
          flex: 1,
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 15,           // ← increased from 13
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: cfg.color,
        }}>{item.label}</span>
        <span style={{ fontSize: 13, color: "#999", marginRight: 6 }}>
          {expanded ? "▲" : "▼"}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onToggle(); }}
          title={completed ? "Mark incomplete" : "Mark complete"}
          style={{
            width: 30, height: 30, borderRadius: "50%",
            border: `2px solid ${completed ? "#4CAF50" : cfg.border}`,
            background: completed ? "#4CAF50" : "transparent",
            color: completed ? "#fff" : cfg.color,
            cursor: "pointer", fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.15s ease",
          }}
        >{completed ? "✓" : "○"}</button>
      </div>

      {/* Body */}
      {expanded && (
        <div style={{ padding: "0 18px 18px" }}>

          {/* Scripture */}
          {item.type === "scripture" && (<>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 19,          // ← increased from 16
              lineHeight: 1.75,
              color: "#2A3828",
              fontStyle: "italic",
              margin: "0 0 12px",
            }}>"{item.text}"</p>
            <a href={item.url} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 15, color: cfg.color, fontWeight: 700,
              textDecoration: "none",
              fontFamily: "'Source Sans 3', sans-serif",
              background: "#fff", border: `1.5px solid ${cfg.border}`,
              padding: "7px 14px", borderRadius: 20,
            }}>📖 Open {item.reference} →</a>
          </>)}

          {/* Insight / intro / review / nextweek */}
          {["insight","intro","review","nextweek"].includes(item.type) && (
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 17,          // ← increased from 15
              lineHeight: 1.75,
              color: "#3A3A3A",
              margin: 0,
            }}>{item.text}</p>
          )}

          {/* Question */}
          {item.type === "question" && (
            <div>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 19,        // ← increased from 16
                lineHeight: 1.75,
                color: "#3A1038",
                fontStyle: "italic",
                margin: "0 0 10px",
              }}>{item.text}</p>
              {item.mode === "family" && (
                <span style={{
                  display: "inline-block", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#9B59B6", background: "#F0E6F7",
                  padding: "3px 10px", borderRadius: 10,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>👨‍👩‍👧 Family</span>
              )}
              {item.mode === "personal" && (
                <span style={{
                  display: "inline-block", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#1A3A5C", background: "#E8F2FA",
                  padding: "3px 10px", borderRadius: 10,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>🙏 Personal</span>
              )}
            </div>
          )}

          {/* Video / Line Upon Line */}
          {(item.type === "video" || item.type === "lineUponLine") && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 16, color: "#555", margin: "0 0 14px", lineHeight: 1.65,
            }}>{item.description}</p>
            <div style={{
              borderRadius: 12, overflow: "hidden", background: "#000",
              aspectRatio: "16/9", maxWidth: 500,
            }}>
              <iframe width="100%" height="100%"
                src={`https://www.youtube.com/embed/${item.embedId}?rel=0`}
                title={item.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen style={{ display: "block" }} />
            </div>
          </>)}

          {/* Podcast */}
          {item.type === "podcast" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 16, color: "#555", lineHeight: 1.7, margin: "0 0 10px",
            }}>{item.description}</p>
            {item.note && <p style={{
              fontSize: 14, color: "#27AE60", fontWeight: 700, margin: "0 0 14px",
              fontFamily: "'Source Sans 3', sans-serif",
            }}>⏱ {item.note}</p>}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "Follow Him Website", url: item.podcastUrl, emoji: "🌐" },
                { label: "Apple Podcasts",     url: item.appleUrl,   emoji: "🎵" },
                { label: "Spotify",            url: item.spotifyUrl, emoji: "🎧" },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 14, fontWeight: 700, color: cfg.color,
                  background: "#fff", border: `1.5px solid ${cfg.border}`,
                  padding: "7px 14px", borderRadius: 20,
                  textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                }}>{link.emoji} {link.label}</a>
              ))}
            </div>
          </>)}

          {/* Article */}
          {item.type === "article" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 13, color: "#888", margin: "0 0 5px", letterSpacing: "0.04em",
            }}>{item.author} · {item.publication}</p>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 16, color: "#555", lineHeight: 1.7, margin: "0 0 14px",
            }}>{item.description}</p>
            <a href={item.url} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 14, fontWeight: 700, color: cfg.color,
              background: "#fff", border: `1.5px solid ${cfg.border}`,
              padding: "7px 14px", borderRadius: 20,
              textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
            }}>📰 Read Article →</a>
          </>)}

          {/* General Conference */}
          {item.type === "conference" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 14, color: "#3F51B5", fontWeight: 700, margin: "0 0 5px",
            }}>{item.speaker} · {item.conference}</p>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 16, color: "#555", lineHeight: 1.7, margin: "0 0 14px",
            }}>{item.description}</p>
            <a href={item.url} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 14, fontWeight: 700, color: "#1A237E",
              background: "#fff", border: "1.5px solid #3F51B5",
              padding: "7px 14px", borderRadius: 20,
              textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
            }}>🏛️ Read Talk →</a>
          </>)}

        </div>
      )}
    </div>
  );
}

// ── AI Reflection Box ─────────────────────────────────────────────────────────
function AIReflectionBox({ dayData, studyMode }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await generateAIReflection(dayData, studyMode);
      setText(result);
      setGenerated(true);
    } catch {
      setText("Take a quiet moment to reflect on what stood out to you today. What is one thing you felt or learned that you want to carry forward?");
      setGenerated(true);
    }
    setLoading(false);
  };

  return (
    <div style={{
      borderRadius: 16,
      background: "linear-gradient(135deg, #1B3A2D 0%, #2D5A3D 100%)",
      padding: 22, marginTop: 8, marginBottom: 4,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 22 }}>✨</span>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 14, fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#A8D5B5",
        }}>AI Closing Reflection</span>
      </div>
      {!generated ? (
        <button onClick={generate} disabled={loading} style={{
          background: loading ? "#4A7A5A" : "#5A9E6F",
          color: "#fff", border: "none", borderRadius: 12,
          padding: "12px 20px", fontSize: 16, fontWeight: 700,
          cursor: loading ? "default" : "pointer",
          fontFamily: "'Source Sans 3', sans-serif",
          width: "100%", transition: "background 0.2s",
        }}>
          {loading ? "Generating…" : "Generate Today's Reflection →"}
        </button>
      ) : (
        <div>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 19, lineHeight: 1.8,
            color: "#E8F5EE", fontStyle: "italic", margin: "0 0 14px",
          }}>{text}</p>
          <button onClick={generate} style={{
            background: "transparent", border: "1px solid #4A7A5A",
            color: "#A8D5B5", borderRadius: 8, padding: "6px 14px",
            fontSize: 13, cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>Regenerate ↺</button>
        </div>
      )}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function ComeFollowMeApp() {
  const todayIndex = getTodayDayIndex();
  const [activeDay, setActiveDay] = useState(todayIndex);
  const [studyMode, setStudyMode] = useLocalStorage("cfm_mode", "personal");
  const [completedItems, setCompletedItems] = useLocalStorage("cfm_completed_w24", {});

  const week = CURRENT_WEEK;
  const dayData = week.days[activeDay];

  // Progress
  const totalItems = week.days.reduce((acc, d) => acc + d.content.length, 0);
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const weekPct = Math.round((completedCount / totalItems) * 100);

  const dayCompletedCount = dayData.content.filter(
    (_, i) => completedItems[`${activeDay}_${i}`]
  ).length;

  // Only count items that are visible in current mode
  const visibleDayItems = dayData.content.filter(c => {
    if (c.type !== "question" || !c.mode || c.mode === "both") return true;
    if (c.mode === "personal" && studyMode === "family") return false;
    if (c.mode === "family" && studyMode === "personal") return false;
    return true;
  });

  const toggleItem = (dayIdx, itemIdx) => {
    const key = `${dayIdx}_${itemIdx}`;
    setCompletedItems({ ...completedItems, [key]: !completedItems[key] });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EE", fontFamily: "'Source Sans 3', sans-serif" }}>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@400;600;700&display=swap" />

      {/* ── Header ── */}
      <header style={{
        background: "linear-gradient(160deg, #1B3A2D 0%, #2D5A3D 60%, #3D7A50 100%)",
        padding: "22px 20px 0",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#8CC9A0", marginBottom: 4,
            }}>Come Follow Me · 2026</div>
            <div style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 24,          // ← increased from 20
              fontWeight: 600, color: "#F0F7F3", lineHeight: 1.2,
            }}>{week.title}</div>
            <div style={{ fontSize: 14, color: "#7ABF92", marginTop: 3 }}>
              {week.scriptureRange} · {week.dateRange}
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{
            display: "flex", background: "rgba(255,255,255,0.12)",
            borderRadius: 22, padding: 4, gap: 2, flexShrink: 0, marginLeft: 12,
          }}>
            {["personal","family"].map(m => (
              <button key={m} onClick={() => setStudyMode(m)} style={{
                background: studyMode === m ? "#fff" : "transparent",
                color: studyMode === m ? "#1B3A2D" : "#A8D5B5",
                border: "none", borderRadius: 18,
                padding: "6px 13px",
                fontSize: 13,          // ← increased from 12
                fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>
                {m === "personal" ? "🙏 Personal" : "👨‍👩‍👧 Family"}
              </button>
            ))}
          </div>
        </div>

        {/* Week progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: "#7ABF92" }}>Week progress</span>
            <span style={{ fontSize: 13, color: "#7ABF92", fontWeight: 700 }}>{weekPct}%</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${weekPct}%`,
              background: "linear-gradient(90deg, #7ABF92, #A8D5B5)",
              borderRadius: 3, transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Day tabs */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto", scrollbarWidth: "none" }}>
          {week.days.map((d, i) => {
            const isActive = i === activeDay;
            const isToday = i === todayIndex;
            const dDone = d.content.every((_, ci) => completedItems[`${i}_${ci}`]);
            return (
              <button key={i} onClick={() => setActiveDay(i)} style={{
                flex: "0 0 auto",
                padding: "9px 14px",
                borderRadius: "10px 10px 0 0",
                border: "none",
                background: isActive ? "#F5F2EE" : isToday ? "rgba(255,255,255,0.15)" : "transparent",
                color: isActive ? "#1B3A2D" : isToday ? "#F0F7F3" : "#7ABF92",
                cursor: "pointer", transition: "all 0.15s ease",
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700,         // ← increased from 11
                  letterSpacing: "0.04em",
                  fontFamily: "'Source Sans 3', sans-serif",
                  textAlign: "center",
                }}>
                  {d.shortLabel}
                  {isToday && !isActive && (
                    <span style={{
                      display: "block", width: 5, height: 5,
                      background: "#7ABF92", borderRadius: "50%", margin: "3px auto 0",
                    }} />
                  )}
                  {dDone && <span style={{ display: "block", fontSize: 11 }}>✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Day content ── */}
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "22px 16px 40px" }}>

        {/* Day heading */}
        <div style={{ marginBottom: 22 }}>
          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "space-between", marginBottom: 6,
          }}>
            <div style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 30,          // ← increased from 26
              fontWeight: 600, color: "#1B3A2D", lineHeight: 1.2,
            }}>{dayData.title}</div>
            <span style={{
              fontSize: 14, color: "#888",
              fontFamily: "'Source Sans 3', sans-serif",
              whiteSpace: "nowrap", marginLeft: 10,
            }}>~{dayData.timeEst}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              fontSize: 14, color: "#27AE60", fontWeight: 600,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>{dayCompletedCount}/{visibleDayItems.length} complete</span>
            {activeDay === todayIndex && (
              <span style={{
                fontSize: 12, background: "#E8F5EE", color: "#1B6B3A",
                border: "1px solid #A8D5B5", padding: "3px 10px", borderRadius: 10,
                fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>Today</span>
            )}
          </div>
        </div>

        {/* Mode banner — shows what mode is active */}
        <div style={{
          background: studyMode === "family"
            ? "linear-gradient(90deg, #F7EEF6, #EDE0F5)"
            : "linear-gradient(90deg, #E8F2FA, #D8EAF7)",
          border: `1.5px solid ${studyMode === "family" ? "#9B59B6" : "#4A90D9"}`,
          borderRadius: 12, padding: "10px 16px", marginBottom: 18,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>{studyMode === "family" ? "👨‍👩‍👧" : "🙏"}</span>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 15, fontWeight: 600,
            color: studyMode === "family" ? "#4A1942" : "#1A3A5C",
          }}>
            {studyMode === "family"
              ? "Family Study Mode — discussion questions shown"
              : "Personal Study Mode — personal reflection questions shown"}
          </span>
        </div>

        {/* Content cards — key includes studyMode so cards re-render on toggle */}
        {dayData.content.map((item, i) => (
          <ContentCard
            key={`${activeDay}_${i}_${studyMode}`}
            item={item}
            completed={!!completedItems[`${activeDay}_${i}`]}
            onToggle={() => toggleItem(activeDay, i)}
            studyMode={studyMode}
          />
        ))}

        <AIReflectionBox dayData={dayData} studyMode={studyMode} />

        {/* Day complete celebration */}
        {dayCompletedCount === visibleDayItems.length && visibleDayItems.length > 0 && (
          <div style={{
            textAlign: "center", padding: 24, marginTop: 16,
            background: "linear-gradient(135deg, #E8F5EE, #F0FAF4)",
            borderRadius: 16, border: "2px solid #A8D5B5",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
            <div style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 22, color: "#1B3A2D", fontWeight: 600,
            }}>{dayData.label} complete</div>
            <div style={{
              fontSize: 15, color: "#4A7A5A", marginTop: 6,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>
              Well done. Come back tomorrow for{" "}
              {week.days[(activeDay + 1) % 7]?.title || "the next day's study"}.
            </div>
          </div>
        )}
      </main>

      {/* ── Bottom nav ── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#fff", borderTop: "1px solid #E8E4DE",
        padding: "10px 20px 16px",
        display: "flex", justifyContent: "space-around",
        zIndex: 100, boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
      }}>
        {[
          { icon: "📅", label: "This Week", view: "week" },
          { icon: "📖", label: "Scriptures", view: "scriptures" },
          { icon: "🏛️", label: "Conference", view: "conference" },
          { icon: "⚙️", label: "Settings", view: "settings" },
        ].map(nav => (
          <button key={nav.view} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            background: "none", border: "none", cursor: "pointer",
            color: nav.view === "week" ? "#1B3A2D" : "#AAA",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>
            <span style={{ fontSize: 22 }}>{nav.icon}</span>
            <span style={{
              fontSize: 11, fontWeight: nav.view === "week" ? 700 : 400,
              letterSpacing: "0.04em",
            }}>{nav.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ height: 72 }} />
    </div>
  );
}
