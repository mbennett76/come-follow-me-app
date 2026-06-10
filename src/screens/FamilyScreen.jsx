import { useState, useEffect, useCallback } from "react";
import {
  db, saveUserProfile, getUserProfile, createGroup, getGroup, joinGroup,
  syncProgress, saveHighlight, listenToGroupMembers, listenToGroupHighlights,
  generateUserId, generateGroupCode,
} from "../firebase.js";

const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ── Setup flow ────────────────────────────────────────────────────────────────
function SetupScreen({ onComplete }) {
  const [step, setStep] = useState("name"); // name → group → done
  const [displayName, setDisplayName] = useState("");
  const [groupChoice, setGroupChoice] = useState(null); // "create" | "join"
  const [groupName, setGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNameSubmit = () => {
    if (!displayName.trim()) { setError("Please enter your name."); return; }
    setError("");
    setStep("group");
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) { setError("Please enter a group name."); return; }
    setLoading(true);
    setError("");
    try {
      const userId = generateUserId();
      const groupCode = generateGroupCode();
      await saveUserProfile(userId, { displayName: displayName.trim(), groupCode, emoji: "🌿" });
      await createGroup(groupCode, userId, groupName.trim());
      onComplete({ userId, displayName: displayName.trim(), groupCode, groupName: groupName.trim() });
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleJoinGroup = async () => {
    if (!joinCode.trim() || joinCode.length < 4) { setError("Please enter a valid group code."); return; }
    setLoading(true);
    setError("");
    try {
      const userId = generateUserId();
      const result = await joinGroup(joinCode.trim(), userId);
      if (result.error) { setError(result.error); setLoading(false); return; }
      await saveUserProfile(userId, { displayName: displayName.trim(), groupCode: joinCode.toUpperCase(), emoji: "🌿" });
      onComplete({ userId, displayName: displayName.trim(), groupCode: joinCode.toUpperCase(), groupName: result.group.name });
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "30px 20px", maxWidth: 420, margin: "0 auto" }}>
      {step === "name" && (
        <>
          <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>👨‍👩‍👧</div>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: 26,
            fontWeight: 600, color: "#1B3A2D", textAlign: "center", marginBottom: 8,
          }}>Family Study Groups</h2>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
            color: "#888", textAlign: "center", lineHeight: 1.65, marginBottom: 28,
          }}>
            Follow each other's progress and share insights from your daily study.
          </p>
          <label style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
            fontWeight: 700, color: "#555", letterSpacing: "0.06em",
            textTransform: "uppercase", display: "block", marginBottom: 8,
          }}>Your name</label>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleNameSubmit()}
            placeholder="e.g. Marc, Sister Bennett, Dad…"
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 12,
              border: "1.5px solid #E0DDD8", fontSize: 16,
              fontFamily: "'Source Sans 3', sans-serif",
              boxSizing: "border-box", marginBottom: 8,
              outline: "none",
            }}
          />
          {error && <p style={{ color: "#E53935", fontSize: 13, marginBottom: 8, fontFamily: "'Source Sans 3', sans-serif" }}>{error}</p>}
          <button onClick={handleNameSubmit} style={{
            width: "100%", padding: "13px", borderRadius: 12,
            background: "#1B3A2D", color: "#fff", border: "none",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>Continue →</button>
        </>
      )}

      {step === "group" && (
        <>
          <button onClick={() => setStep("name")} style={{
            background: "none", border: "none", color: "#888",
            fontSize: 14, cursor: "pointer", marginBottom: 16,
            fontFamily: "'Source Sans 3', sans-serif",
          }}>← Back</button>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: 24,
            fontWeight: 600, color: "#1B3A2D", marginBottom: 6,
          }}>Hi {displayName}!</h2>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
            color: "#888", lineHeight: 1.65, marginBottom: 24,
          }}>Create a new family group or join one with a code.</p>

          {!groupChoice && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={() => setGroupChoice("create")} style={{
                padding: "16px", borderRadius: 14,
                border: "2px solid #1B3A2D", background: "#1B3A2D",
                color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                textAlign: "left",
              }}>
                <div>✨ Create a new group</div>
                <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.8, marginTop: 3 }}>
                  You'll get a shareable code for family to join
                </div>
              </button>
              <button onClick={() => setGroupChoice("join")} style={{
                padding: "16px", borderRadius: 14,
                border: "2px solid #E0DDD8", background: "#fff",
                color: "#1B3A2D", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                textAlign: "left",
              }}>
                <div>🔗 Join an existing group</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: "#888", marginTop: 3 }}>
                  Enter the 6-letter code someone shared with you
                </div>
              </button>
            </div>
          )}

          {groupChoice === "create" && (
            <>
              <button onClick={() => setGroupChoice(null)} style={{
                background: "none", border: "none", color: "#888",
                fontSize: 13, cursor: "pointer", marginBottom: 14,
                fontFamily: "'Source Sans 3', sans-serif",
              }}>← Back</button>
              <label style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                fontWeight: 700, color: "#555", letterSpacing: "0.06em",
                textTransform: "uppercase", display: "block", marginBottom: 8,
              }}>Group name</label>
              <input
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="e.g. Bennett Family, The Millers…"
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 12,
                  border: "1.5px solid #E0DDD8", fontSize: 16,
                  fontFamily: "'Source Sans 3', sans-serif",
                  boxSizing: "border-box", marginBottom: 8, outline: "none",
                }}
              />
              {error && <p style={{ color: "#E53935", fontSize: 13, marginBottom: 8, fontFamily: "'Source Sans 3', sans-serif" }}>{error}</p>}
              <button onClick={handleCreateGroup} disabled={loading} style={{
                width: "100%", padding: "13px", borderRadius: 12,
                background: loading ? "#7AB648" : "#1B3A2D",
                color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
                cursor: loading ? "default" : "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>{loading ? "Creating…" : "Create Group →"}</button>
            </>
          )}

          {groupChoice === "join" && (
            <>
              <button onClick={() => setGroupChoice(null)} style={{
                background: "none", border: "none", color: "#888",
                fontSize: 13, cursor: "pointer", marginBottom: 14,
                fontFamily: "'Source Sans 3', sans-serif",
              }}>← Back</button>
              <label style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                fontWeight: 700, color: "#555", letterSpacing: "0.06em",
                textTransform: "uppercase", display: "block", marginBottom: 8,
              }}>Group code</label>
              <input
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g. BENN26"
                maxLength={6}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 12,
                  border: "1.5px solid #E0DDD8", fontSize: 20,
                  fontFamily: "monospace", letterSpacing: "0.2em",
                  boxSizing: "border-box", marginBottom: 8, outline: "none",
                  textTransform: "uppercase",
                }}
              />
              {error && <p style={{ color: "#E53935", fontSize: 13, marginBottom: 8, fontFamily: "'Source Sans 3', sans-serif" }}>{error}</p>}
              <button onClick={handleJoinGroup} disabled={loading} style={{
                width: "100%", padding: "13px", borderRadius: 12,
                background: loading ? "#7AB648" : "#1B3A2D",
                color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
                cursor: loading ? "default" : "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>{loading ? "Joining…" : "Join Group →"}</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ── Member card ───────────────────────────────────────────────────────────────
function MemberCard({ member, isMe, currentWeekNumber }) {
  const progress = member.weekProgress?.[`w${currentWeekNumber}`];
  const pct = progress ? Math.round((progress.completedCount / Math.max(progress.totalItems, 1)) * 100) : 0;
  const dayLabel = progress ? DAY_LABELS[progress.currentDay] || "—" : "—";

  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: `2px solid ${isMe ? "#1B3A2D" : "#E8E4DE"}`,
      padding: "14px 16px", marginBottom: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: isMe ? "#1B3A2D" : "#F0F7E8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>{member.emoji || "🌿"}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
            fontWeight: 700, color: "#1B3A2D",
          }}>
            {member.displayName || "Member"}
            {isMe && <span style={{
              fontSize: 10, background: "#E8F5EE", color: "#1B6B3A",
              padding: "2px 7px", borderRadius: 8, marginLeft: 8,
              fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
            }}>You</span>}
          </div>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            color: "#888", marginTop: 1,
          }}>
            {progress ? `On ${dayLabel} · Week ${currentWeekNumber}` : "Not started yet"}
          </div>
        </div>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 18,
          fontWeight: 700, color: pct === 100 ? "#27AE60" : "#1B3A2D",
        }}>{pct}%</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "#F0EDE8", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: pct === 100
            ? "linear-gradient(90deg, #27AE60, #7AB648)"
            : "linear-gradient(90deg, #5A9E6F, #7AB648)",
          borderRadius: 3, transition: "width 0.4s ease",
        }} />
      </div>

      {/* Day indicators */}
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {DAY_LABELS.map((d, i) => {
          const done = progress?.completedDays?.[i];
          return (
            <div key={i} style={{
              flex: 1, textAlign: "center",
              fontSize: 9, fontFamily: "'Source Sans 3', sans-serif",
              color: done ? "#27AE60" : "#CCC",
              fontWeight: done ? 700 : 400,
            }}>
              {done ? "✓" : d[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Highlight card ────────────────────────────────────────────────────────────
function HighlightCard({ highlight, isMe }) {
  return (
    <div style={{
      background: isMe ? "#F0F7E8" : "#fff",
      border: `1.5px solid ${isMe ? "#7AB648" : "#E8E4DE"}`,
      borderRadius: 12, padding: "12px 14px", marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{highlight.emoji || "🌿"}</span>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          fontWeight: 700, color: "#1B3A2D",
        }}>{highlight.displayName}</span>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
          color: "#AAA", marginLeft: "auto",
        }}>{DAY_LABELS[highlight.dayIndex]}</span>
      </div>
      <p style={{
        fontFamily: "'EB Garamond', serif", fontSize: 16,
        color: "#3A3A3A", fontStyle: "italic", lineHeight: 1.65, margin: 0,
      }}>"{highlight.text}"</p>
    </div>
  );
}

// ── Share a thought ───────────────────────────────────────────────────────────
function ShareThought({ userId, displayName, weekNumber, dayIndex, onSave }) {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) return;
    setSaving(true);
    try {
      await saveHighlight(userId, displayName, weekNumber, dayIndex, text.trim());
      setSaved(true);
      setText("");
      onSave?.();
    } catch(e) {}
    setSaving(false);
  };

  if (saved) return (
    <div style={{
      background: "#E8F5EE", border: "1.5px solid #7AB648",
      borderRadius: 12, padding: "12px 14px", marginBottom: 16,
      fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
      color: "#1B6B3A", fontWeight: 600, textAlign: "center",
    }}>✓ Thought shared with your group!</div>
  );

  return (
    <div style={{
      background: "#fff", border: "1.5px solid #E0DDD8",
      borderRadius: 14, padding: "14px 16px", marginBottom: 16,
    }}>
      <div style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
        fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
        color: "#555", marginBottom: 10,
      }}>💬 Share a thought with your group</div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What stood out to you today? A verse, an insight, a question…"
        rows={3}
        style={{
          width: "100%", padding: "10px 12px", borderRadius: 10,
          border: "1.5px solid #E0DDD8", fontSize: 14,
          fontFamily: "'EB Garamond', serif", resize: "none",
          boxSizing: "border-box", outline: "none", lineHeight: 1.65,
        }}
      />
      <button onClick={handleSave} disabled={saving || !text.trim()} style={{
        marginTop: 8, width: "100%", padding: "10px",
        borderRadius: 10, border: "none",
        background: text.trim() ? "#1B3A2D" : "#E0DDD8",
        color: text.trim() ? "#fff" : "#AAA",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 14, fontWeight: 700,
        cursor: text.trim() ? "pointer" : "default",
        transition: "all 0.15s",
      }}>{saving ? "Sharing…" : "Share →"}</button>
    </div>
  );
}

// ── Main Family Screen ────────────────────────────────────────────────────────
export default function FamilyScreen({ currentWeek, completedItems, studyMode }) {
  const [userProfile, setUserProfile] = useLocalStorageState("cfm_user_profile", null);
  const [groupData, setGroupData] = useState(null);
  const [members, setMembers] = useState({});
  const [highlights, setHighlights] = useState([]);
  const [activeTab, setActiveTab] = useState("progress");
  const [loadingGroup, setLoadingGroup] = useState(false);
  const [copied, setCopied] = useState(false);

  const todayDayIndex = new Date().getDay();

  // Load group data when profile exists
  useEffect(() => {
    if (!userProfile?.groupCode) return;
    setLoadingGroup(true);
    getGroup(userProfile.groupCode).then(g => {
      setGroupData(g ? { ...g, code: userProfile.groupCode } : null);
      setLoadingGroup(false);
    });
  }, [userProfile?.groupCode]);

  // Listen to member profiles
  useEffect(() => {
    if (!groupData?.members) return;
    const unsub = listenToGroupMembers(groupData.members, setMembers);
    return unsub;
  }, [groupData?.members?.join(",")]);

  // Listen to highlights
  useEffect(() => {
    if (!groupData?.members) return;
    const unsub = listenToGroupHighlights(groupData.members, currentWeek.weekNumber, setHighlights);
    return unsub;
  }, [groupData?.members?.join(","), currentWeek.weekNumber]);

  // Sync my progress whenever completedItems changes
  useEffect(() => {
    if (!userProfile?.userId) return;
    const completedCount = Object.values(completedItems).filter(Boolean).length;
    const totalItems = Object.keys(completedItems).length;
    saveUserProfile(userProfile.userId, {
      weekProgress: {
        [`w${currentWeek.weekNumber}`]: {
          completedCount,
          totalItems,
          currentDay: todayDayIndex,
          completedDays: [0,1,2,3,4,5,6].map(d => {
            const dayKeys = Object.keys(completedItems).filter(k => k.includes(`_d${d}_`));
            return dayKeys.length > 0 && dayKeys.every(k => completedItems[k]);
          }),
        }
      }
    });
  }, [completedItems, userProfile?.userId]);

  const handleSetupComplete = (profile) => {
    const fullProfile = { ...profile, userId: profile.userId };
    setUserProfile(fullProfile);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(userProfile.groupCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  if (!userProfile) return <SetupScreen onComplete={handleSetupComplete} />;

  const memberList = Object.entries(members).map(([uid, data]) => ({ uid, ...data }));
  const myHighlights = highlights.filter(h => h.userId === userProfile.userId);
  const othersHighlights = highlights.filter(h => h.userId !== userProfile.userId);

  return (
    <div style={{ padding: "20px 16px" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", marginBottom: 16,
      }}>
        <div>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: 24,
            fontWeight: 600, color: "#1B3A2D", marginBottom: 2,
          }}>{groupData?.name || "Family Group"}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontFamily: "monospace", fontSize: 16, fontWeight: 700,
              color: "#1B3A2D", letterSpacing: "0.2em",
              background: "#F0F7E8", padding: "3px 10px", borderRadius: 8,
              border: "1.5px solid #7AB648",
            }}>{userProfile.groupCode}</span>
            <button onClick={copyCode} style={{
              background: copied ? "#27AE60" : "#E8F5EE",
              border: "none", borderRadius: 8, padding: "4px 10px",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              color: copied ? "#fff" : "#2D5016",
              fontFamily: "'Source Sans 3', sans-serif",
              transition: "all 0.2s",
            }}>{copied ? "✓ Copied!" : "Copy Code"}</button>
          </div>
        </div>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
          color: "#888", textAlign: "right",
        }}>
          <div style={{ fontWeight: 700, color: "#1B3A2D" }}>{userProfile.displayName}</div>
          <div>{memberList.length} member{memberList.length !== 1 ? "s" : ""}</div>
        </div>
      </div>

      {/* Share code banner */}
      <div style={{
        background: "#E8EAF6", border: "1.5px solid #3F51B5",
        borderRadius: 12, padding: "10px 14px", marginBottom: 20,
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
        color: "#1A237E", lineHeight: 1.55,
      }}>
        📲 <strong>Invite family:</strong> Share the code <strong>{userProfile.groupCode}</strong> — they open the app, tap 👨‍👩‍👧 Family, and enter it to join.
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", background: "#F0EDE8",
        borderRadius: 12, padding: 4, gap: 4, marginBottom: 20,
      }}>
        {[
          { id: "progress", label: "📊 Progress" },
          { id: "highlights", label: "💬 Thoughts" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: "8px 10px", borderRadius: 9,
            border: "none",
            background: activeTab === tab.id ? "#fff" : "transparent",
            color: activeTab === tab.id ? "#1B3A2D" : "#888",
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 400,
            cursor: "pointer", transition: "all 0.15s",
            boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Progress tab */}
      {activeTab === "progress" && (
        <>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, color: "#888", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 12,
          }}>Week {currentWeek.weekNumber} · {currentWeek.scriptureRange}</div>

          {loadingGroup && (
            <div style={{ textAlign: "center", padding: 30, color: "#AAA", fontFamily: "'Source Sans 3', sans-serif" }}>
              Loading group…
            </div>
          )}

          {/* My card first */}
          {members[userProfile.userId] && (
            <MemberCard
              member={members[userProfile.userId]}
              isMe={true}
              currentWeekNumber={currentWeek.weekNumber}
            />
          )}

          {/* Other members */}
          {memberList
            .filter(m => m.uid !== userProfile.userId)
            .map(member => (
              <MemberCard
                key={member.uid}
                member={member}
                isMe={false}
                currentWeekNumber={currentWeek.weekNumber}
              />
            ))
          }

          {memberList.length <= 1 && (
            <div style={{
              textAlign: "center", padding: "30px 20px",
              background: "#fff", borderRadius: 14,
              border: "1.5px dashed #E0DDD8",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👨‍👩‍👧</div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
                color: "#888", lineHeight: 1.65,
              }}>
                Share code <strong style={{ color: "#1B3A2D" }}>{userProfile.groupCode}</strong> with your family to see their progress here.
              </div>
            </div>
          )}
        </>
      )}

      {/* Highlights tab */}
      {activeTab === "highlights" && (
        <>
          <ShareThought
            userId={userProfile.userId}
            displayName={userProfile.displayName}
            weekNumber={currentWeek.weekNumber}
            dayIndex={todayDayIndex}
            onSave={() => {}}
          />

          {highlights.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "30px 20px",
              background: "#fff", borderRadius: 14,
              border: "1.5px dashed #E0DDD8",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💭</div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
                color: "#888", lineHeight: 1.65,
              }}>
                No thoughts shared yet this week. Be the first to share something!
              </div>
            </div>
          ) : (
            <>
              {othersHighlights.length > 0 && (
                <>
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
                    fontWeight: 700, color: "#888", letterSpacing: "0.08em",
                    textTransform: "uppercase", marginBottom: 10,
                  }}>From your group</div>
                  {othersHighlights.map((h, i) => (
                    <HighlightCard key={i} highlight={h} isMe={false} />
                  ))}
                </>
              )}
              {myHighlights.length > 0 && (
                <>
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
                    fontWeight: 700, color: "#888", letterSpacing: "0.08em",
                    textTransform: "uppercase", margin: "16px 0 10px",
                  }}>Your thoughts</div>
                  {myHighlights.map((h, i) => (
                    <HighlightCard key={i} highlight={h} isMe={true} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}

      {/* Leave group */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button onClick={() => {
          if (window.confirm("Leave this group? You can rejoin with the same code.")) {
            setUserProfile(null);
          }
        }} style={{
          background: "none", border: "none", color: "#CCC",
          fontSize: 13, cursor: "pointer",
          fontFamily: "'Source Sans 3', sans-serif",
        }}>Leave group</button>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}

// Local storage hook used inside this file
function useLocalStorageState(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const save = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, save];
}
