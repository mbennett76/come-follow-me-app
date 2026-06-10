import { useState, useCallback } from "react";
import { WEEKS, getCurrentWeekIndex } from "./data/weekData.js";
import WeekScreen from "./screens/WeekScreen.jsx";
import ScripturesScreen from "./screens/ScripturesScreen.jsx";
import ConferenceScreen from "./screens/ConferenceScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const save = useCallback((v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }, [key, val]);
  return [val, save];
}

const NAV = [
  { id: "week",       icon: "📅", label: "This Week"  },
  { id: "scriptures", icon: "📖", label: "Scriptures" },
  { id: "conference", icon: "🏛️", label: "Conference" },
  { id: "settings",   icon: "⚙️", label: "Settings"   },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("week");
  const [studyMode, setStudyMode]         = useLocalStorage("cfm_mode", "personal");
  const [completedItems, setCompletedItems] = useLocalStorage("cfm_completed_v2", {});
  const [weekIndex, setWeekIndex]         = useLocalStorage("cfm_week_index", getCurrentWeekIndex());

  const week = WEEKS[weekIndex] || WEEKS[getCurrentWeekIndex()];
  const totalWeeks = WEEKS.length;

  const goToPrevWeek = () => setWeekIndex(i => Math.max(0, i - 1));
  const goToNextWeek = () => setWeekIndex(i => Math.min(totalWeeks - 1, i + 1));
  const goToCurrentWeek = () => setWeekIndex(getCurrentWeekIndex());
  const isCurrentWeek = weekIndex === getCurrentWeekIndex();

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EE", fontFamily: "'Source Sans 3', sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@400;600;700&display=swap" />

      {/* ── Sticky Header ── */}
      <header style={{
        background: "linear-gradient(160deg, #1B3A2D 0%, #2D5A3D 60%, #3D7A50 100%)",
        padding: "16px 16px 0",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
      }}>
        {/* Top row: title + mode toggle */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#8CC9A0", marginBottom: 2,
            }}>Come Follow Me · 2026 Old Testament</div>
            <div style={{
              fontFamily: "'EB Garamond', serif", fontSize: 20,
              fontWeight: 600, color: "#F0F7F3", lineHeight: 1.2,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{week.title}</div>
            <div style={{ fontSize: 12, color: "#7ABF92", marginTop: 2 }}>
              {week.scriptureRange} · {week.dateRange}
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{
            display: "flex", background: "rgba(255,255,255,0.12)",
            borderRadius: 20, padding: 3, gap: 2, flexShrink: 0, marginLeft: 10,
          }}>
            {["personal","family"].map(m => (
              <button key={m} onClick={() => setStudyMode(m)} style={{
                background: studyMode === m ? "#fff" : "transparent",
                color: studyMode === m ? "#1B3A2D" : "#A8D5B5",
                border: "none", borderRadius: 16,
                padding: "5px 10px", fontSize: 12, fontWeight: 700,
                cursor: "pointer", transition: "all 0.15s",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>{m === "personal" ? "🙏" : "👨‍👩‍👧"}</button>
            ))}
          </div>
        </div>

        {/* Week navigation row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          paddingBottom: 12,
        }}>
          <button onClick={goToPrevWeek} disabled={weekIndex === 0} style={{
            background: "rgba(255,255,255,0.12)", border: "none",
            color: weekIndex === 0 ? "rgba(255,255,255,0.25)" : "#fff",
            borderRadius: 8, padding: "6px 10px", fontSize: 16,
            cursor: weekIndex === 0 ? "default" : "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>←</button>

          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              fontSize: 11, color: "#A8D5B5", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              fontFamily: "'Source Sans 3', sans-serif",
            }}>Week {week.weekNumber} of {totalWeeks}</div>
            {!isCurrentWeek && (
              <button onClick={goToCurrentWeek} style={{
                background: "rgba(255,255,255,0.15)", border: "none",
                color: "#fff", borderRadius: 8, padding: "3px 10px",
                fontSize: 11, cursor: "pointer", marginTop: 2,
                fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
              }}>↩ Back to This Week</button>
            )}
          </div>

          <button onClick={goToNextWeek} disabled={weekIndex === totalWeeks - 1} style={{
            background: "rgba(255,255,255,0.12)", border: "none",
            color: weekIndex === totalWeeks - 1 ? "rgba(255,255,255,0.25)" : "#fff",
            borderRadius: 8, padding: "6px 10px", fontSize: 16,
            cursor: weekIndex === totalWeeks - 1 ? "default" : "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>→</button>
        </div>
      </header>

      {/* ── Screen Content ── */}
      <main style={{ maxWidth: 640, margin: "0 auto", paddingBottom: 80 }}>
        {activeNav === "week" && (
          <WeekScreen
            week={week}
            studyMode={studyMode}
            completedItems={completedItems}
            setCompletedItems={setCompletedItems}
          />
        )}
        {activeNav === "scriptures" && (
          <ScripturesScreen week={week} />
        )}
        {activeNav === "conference" && (
          <ConferenceScreen week={week} />
        )}
        {activeNav === "settings" && (
          <SettingsScreen
            studyMode={studyMode}
            setStudyMode={setStudyMode}
            completedItems={completedItems}
            setCompletedItems={setCompletedItems}
            currentWeek={week}
            allWeeks={WEEKS}
          />
        )}
      </main>

      {/* ── Bottom Nav ── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#fff", borderTop: "1px solid #E8E4DE",
        display: "flex", justifyContent: "space-around",
        padding: "8px 0 max(12px, env(safe-area-inset-bottom))",
        zIndex: 100, boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
      }}>
        {NAV.map(n => {
          const active = activeNav === n.id;
          return (
            <button key={n.id} onClick={() => setActiveNav(n.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              color: active ? "#1B3A2D" : "#AAA",
              fontFamily: "'Source Sans 3', sans-serif",
              padding: "4px 16px", borderRadius: 10, transition: "color 0.15s",
            }}>
              <span style={{ fontSize: 22 }}>{n.icon}</span>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, letterSpacing: "0.03em" }}>{n.label}</span>
              {active && <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1B3A2D", marginTop: 1 }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
