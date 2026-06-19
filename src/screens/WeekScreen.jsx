import { useState } from "react";
import ContentCard from "../components/ContentCard.jsx";

async function generateReflection(dayData, studyMode) {
  const summary = dayData.content.map(c =>
    `${c.label}: ${c.text || c.description || c.title || ""}`
  ).join("\n");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content:
        `You are a warm Come Follow Me study companion. Based on today's study "${dayData.title}", write a brief closing reflection (3–4 sentences) for a ${studyMode === "family" ? "family" : "personal"} gospel study. Be specific to the content and end with one simple actionable invitation.\n\nContent studied:\n${summary}` }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

function AIBox({ dayData, studyMode }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const r = await generateReflection(dayData, studyMode);
      setText(r); setDone(true);
    } catch {
      setText("Take a quiet moment to consider what stood out to you today. What one thing will you carry forward?");
      setDone(true);
    }
    setLoading(false);
  };

  return (
    <div style={{
      borderRadius: 16,
      background: "linear-gradient(135deg, #1B3A2D 0%, #2D5A3D 100%)",
      padding: 20, marginTop: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>✨</span>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
          fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8D5B5",
        }}>AI Closing Reflection</span>
      </div>
      {!done ? (
        <button onClick={generate} disabled={loading} style={{
          background: loading ? "#4A7A5A" : "#5A9E6F", color: "#fff",
          border: "none", borderRadius: 12, padding: "11px 18px",
          fontSize: 15, fontWeight: 700, cursor: loading ? "default" : "pointer",
          fontFamily: "'Source Sans 3', sans-serif", width: "100%",
        }}>{loading ? "Generating reflection…" : "Generate Today's Reflection →"}</button>
      ) : (
        <>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 18,
            lineHeight: 1.8, color: "#E8F5EE", fontStyle: "italic", margin: "0 0 12px",
          }}>{text}</p>
          <button onClick={generate} style={{
            background: "transparent", border: "1px solid #4A7A5A",
            color: "#A8D5B5", borderRadius: 8, padding: "5px 12px",
            fontSize: 12, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
          }}>Regenerate ↺</button>
        </>
      )}
    </div>
  );
}

export default function WeekScreen({ week, studyMode, completedItems, setCompletedItems }) {
  const todayIndex = new Date().getDay();
  const dayStorageKey = `cfm_active_day_w${week.weekNumber}`;
  const [activeDay, setActiveDayState] = useState(() => {
    try {
      const saved = localStorage.getItem(dayStorageKey);
      return saved !== null ? JSON.parse(saved) : todayIndex;
    } catch { return todayIndex; }
  });
  const setActiveDay = (day) => {
    setActiveDayState(day);
    try { localStorage.setItem(dayStorageKey, JSON.stringify(day)); } catch {}
  };
  const dayData = week.days[activeDay];

  const totalItems = week.days.reduce((a, d) => a + d.content.length, 0);
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const weekPct = Math.round((completedCount / totalItems) * 100);

  const visibleItems = dayData.content.filter(c => {
    if (c.type !== "question" || !c.mode || c.mode === "both") return true;
    if (c.mode === "personal" && studyMode === "family") return false;
    if (c.mode === "family" && studyMode === "personal") return false;
    return true;
  });
  const dayDoneCount = visibleItems.filter((_, i) =>
    completedItems[`w${week.weekNumber}_d${activeDay}_${dayData.content.indexOf(visibleItems[i])}`]
  ).length;

  const toggle = (dayIdx, itemIdx) => {
    const key = `w${week.weekNumber}_d${dayIdx}_${itemIdx}`;
    setCompletedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Week progress bar */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 13, color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}>
            Week {week.weekNumber} · {week.dateRange}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#27AE60", fontFamily: "'Source Sans 3', sans-serif" }}>
            {weekPct}% complete
          </span>
        </div>
        <div style={{ height: 5, background: "#E8E4DE", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${weekPct}%`,
            background: "linear-gradient(90deg, #5A9E6F, #7AB648)",
            borderRadius: 3, transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Day tabs */}
      <div style={{
        display: "flex", gap: 6, padding: "12px 16px 0",
        overflowX: "auto", scrollbarWidth: "none",
      }}>
        {week.days.map((d, i) => {
          const isActive = i === activeDay;
          const isToday = i === todayIndex;
          const allKeys = d.content.map((_, ci) => `w${week.weekNumber}_d${i}_${ci}`);
          const dDone = allKeys.length > 0 && allKeys.every(k => completedItems[k]);
          return (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              flex: "0 0 auto", padding: "8px 14px",
              borderRadius: 10, border: `2px solid ${isActive ? "#1B3A2D" : isToday ? "#7AB648" : "#E0DDD8"}`,
              background: isActive ? "#1B3A2D" : isToday ? "#F0F7E8" : "#fff",
              color: isActive ? "#fff" : isToday ? "#1B3A2D" : "#888",
              cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: isActive || isToday ? 700 : 400,
              fontSize: 13, transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}>
              {d.shortLabel}{dDone ? " ✓" : ""}{isToday && !isActive ? " •" : ""}
            </button>
          );
        })}
      </div>

      {/* Day content */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{
          display: "flex", alignItems: "baseline",
          justifyContent: "space-between", marginBottom: 4,
        }}>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: 26,
            fontWeight: 600, color: "#1B3A2D", margin: 0,
          }}>{dayData.title}</h2>
          <span style={{
            fontSize: 13, color: "#888", fontFamily: "'Source Sans 3', sans-serif",
            whiteSpace: "nowrap", marginLeft: 10,
          }}>~{dayData.timeEst}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{
            fontSize: 13, color: "#27AE60", fontWeight: 600,
            fontFamily: "'Source Sans 3', sans-serif",
          }}>{dayDoneCount}/{visibleItems.length} complete</span>
          {activeDay === todayIndex && (
            <span style={{
              fontSize: 11, background: "#E8F5EE", color: "#1B6B3A",
              border: "1px solid #A8D5B5", padding: "2px 9px",
              borderRadius: 10, fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase", fontFamily: "'Source Sans 3', sans-serif",
            }}>Today</span>
          )}
        </div>

        {/* Mode indicator */}
        <div style={{
          background: studyMode === "family" ? "#F7EEF6" : "#E8F2FA",
          border: `1.5px solid ${studyMode === "family" ? "#9B59B6" : "#4A90D9"}`,
          borderRadius: 10, padding: "9px 14px", marginBottom: 14,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>{studyMode === "family" ? "👨‍👩‍👧" : "🙏"}</span>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600,
            color: studyMode === "family" ? "#4A1942" : "#1A3A5C",
          }}>
            {studyMode === "family" ? "Family Study Mode" : "Personal Study Mode"}
          </span>
        </div>

        {/* Cards */}
        {dayData.content.map((item, i) => (
          <ContentCard
            key={`w${week.weekNumber}_d${activeDay}_${i}_${studyMode}`}
            item={item}
            completed={!!completedItems[`w${week.weekNumber}_d${activeDay}_${i}`]}
            onToggle={() => toggle(activeDay, i)}
            studyMode={studyMode}
          />
        ))}

        <AIBox dayData={dayData} studyMode={studyMode} />

        {/* Day complete */}
        {dayDoneCount === visibleItems.length && visibleItems.length > 0 && (
          <div style={{
            textAlign: "center", padding: 22, marginTop: 14,
            background: "linear-gradient(135deg, #E8F5EE, #F0FAF4)",
            borderRadius: 16, border: "2px solid #A8D5B5",
          }}>
            <div style={{ fontSize: 30, marginBottom: 6 }}>🌿</div>
            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: 20,
              color: "#1B3A2D", fontWeight: 600,
            }}>{dayData.label} complete</div>
            <div style={{
              fontSize: 14, color: "#4A7A5A", marginTop: 4,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>
              Well done. Come back tomorrow for{" "}
              {week.days[(activeDay + 1) % 7]?.title || "the next day's study"}.
            </div>
          </div>
        )}
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}
