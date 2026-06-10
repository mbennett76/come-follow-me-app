import { useState } from "react";

function buildUpdatePrompt(currentWeek, nextWeek) {
  const templateDay = currentWeek.days[1]; // Monday as template
  const templateContent = JSON.stringify(templateDay.content[0], null, 2);

  return `You are helping maintain a Come Follow Me Daily Study app (React/Vite, GitHub Pages).

Generate a complete WEEKS array entry for:
  Week Number: ${nextWeek.weekNumber}
  Title: "${nextWeek.title}"
  Scripture Range: ${nextWeek.scriptureRange}
  Date Range: ${nextWeek.dateRange}
  Theme: ${nextWeek.theme}

REQUIREMENTS:
1. 7 days (Sunday–Saturday), each with 10–15 min of content
2. Each day includes: scripture reading, study insight, discussion question (personal + family mode), and at least one of: podcast slot (Follow Him), scripture story video (search YouTube for a verified Latter Day Kids, Living Scriptures, or Line Upon Line CFM video for this exact week), or General Conference talk
3. Sunday = week overview + BibleProject or overview video
4. Wednesday = Follow Him podcast card
5. Saturday = week reflection + nextweek preview
6. Scripture links format: url: "gospellibrary://content/scriptures/ot/[book]/[chapter]", webUrl: "https://www.churchofjesuschrist.org/study/scriptures/ot/[book]/[chapter]?lang=eng"
7. Conference talks: include url AND fallbackUrl (Google search URL for the talk)
8. YouTube video embedIds: ONLY use verified IDs. Search YouTube for "Line Upon Line Come Follow Me ${nextWeek.scriptureRange}" or "Latter Day Kids Come Follow Me ${nextWeek.scriptureRange}" and use the exact video ID from the URL.

CONTENT TYPE OPTIONS:
- intro, scripture, insight, question (with mode: "personal" | "family" | "both"), video, lineUponLine, podcast, article, conference, review, nextweek

EXAMPLE CONTENT ITEM STRUCTURE:
${templateContent}

PODCAST STRUCTURE:
{ type: "podcast", icon: "🎙️", label: "Follow Him Podcast", title: "...", description: "...",
  podcastUrl: "https://followhimpodcast.com",
  spotifyUrl: "https://open.spotify.com/show/2dnak4SBEaUyWM9BBqZi9X",
  appleUrl: "https://podcasts.apple.com/us/podcast/follow-him-a-come-follow-me-podcast/id1457038461",
  note: "Suggested: first 20 minutes" }

CONFERENCE TALK STRUCTURE:
{ type: "conference", icon: "🏛️", label: "General Conference", title: "...", speaker: "...",
  conference: "April/October YEAR General Conference",
  description: "...",
  url: "https://www.churchofjesuschrist.org/study/general-conference/YEAR/MM/slug",
  fallbackUrl: "https://www.google.com/search?q=..." }

OUTPUT: Return ONLY the JavaScript object (no import/export, no surrounding code, no markdown fences). Start with { weekNumber: ${nextWeek.weekNumber}, and end with the closing }. It must be valid JS that can be pasted directly into the WEEKS array.`;
}

function UpdateModal({ onClose, currentWeek, allWeeks }) {
  const [copied, setCopied] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Find next skeleton week after current
  const currentIdx = allWeeks.findIndex(w => w.weekNumber === currentWeek.weekNumber);
  const nextSkeletonWeek = allWeeks.slice(currentIdx + 1).find(w => w.skeleton) || allWeeks[(currentIdx + 1) % allWeeks.length];

  const prompt = buildUpdatePrompt(currentWeek, nextSkeletonWeek || currentWeek);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const copyTemplate = async () => {
    try {
      const templateJSON = JSON.stringify(currentWeek, null, 2);
      await navigator.clipboard.writeText(templateJSON);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 3000);
    } catch {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 3000);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "20px 20px 0 0",
        padding: "24px 20px 40px", maxWidth: 640, width: "100%",
        maxHeight: "85vh", overflowY: "auto",
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "#E0DDD8", borderRadius: 2, margin: "0 auto 20px" }} />

        <h3 style={{
          fontFamily: "'EB Garamond', serif", fontSize: 22,
          fontWeight: 600, color: "#1B3A2D", marginBottom: 6,
        }}>🔄 Generate Week Content</h3>

        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          color: "#666", lineHeight: 1.65, marginBottom: 20,
        }}>
          Use this prompt to generate full daily content for{" "}
          <strong>Week {nextSkeletonWeek?.weekNumber}: {nextSkeletonWeek?.scriptureRange}</strong>.
          The prompt is pre-filled — just copy and paste it into Claude.
        </p>

        {/* Step 1 */}
        <div style={{
          background: "#F0F7E8", border: "1.5px solid #7AB648",
          borderRadius: 12, padding: "14px 16px", marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, color: "#2D5016", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 8,
          }}>Step 1 — Copy the prompt</div>
          <div style={{
            background: "#fff", borderRadius: 8, padding: "10px 12px",
            fontFamily: "monospace", fontSize: 11, color: "#555",
            lineHeight: 1.5, maxHeight: 120, overflowY: "auto",
            border: "1px solid #D4E8C0", marginBottom: 10,
          }}>
            {prompt.slice(0, 300)}…
          </div>
          <button onClick={copyPrompt} style={{
            background: copied ? "#27AE60" : "#1B3A2D",
            color: "#fff", border: "none", borderRadius: 10,
            padding: "10px 18px", fontSize: 14, fontWeight: 700,
            cursor: "pointer", width: "100%",
            fontFamily: "'Source Sans 3', sans-serif",
            transition: "background 0.2s",
          }}>
            {copied ? "✓ Copied to Clipboard!" : "📋 Copy Prompt"}
          </button>
        </div>

        {/* Step 2 */}
        <div style={{
          background: "#E8EAF6", border: "1.5px solid #3F51B5",
          borderRadius: 12, padding: "14px 16px", marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, color: "#1A237E", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 8,
          }}>Step 2 — Open Claude and paste</div>
          <a href="https://claude.ai/new" target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#3F51B5", color: "#fff", borderRadius: 10,
            padding: "10px 18px", fontSize: 14, fontWeight: 700,
            textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
          }}>✨ Open Claude.ai →</a>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            color: "#666", marginTop: 8, lineHeight: 1.5,
          }}>
            Paste the copied prompt into the new chat. Claude will return a JSON block ready to paste into your app.
          </p>
        </div>

        {/* Step 3 */}
        <div style={{
          background: "#FFF8E1", border: "1.5px solid #FFC107",
          borderRadius: 12, padding: "14px 16px", marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, color: "#7B5E00", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 8,
          }}>Optional — Copy current week as template</div>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
            color: "#666", lineHeight: 1.55, marginBottom: 10,
          }}>
            Copy the current week's full JSON to paste alongside the prompt in Claude. This ensures perfect structure matching.
          </p>
          <button onClick={copyTemplate} style={{
            background: copiedTemplate ? "#27AE60" : "#FFC107",
            color: copiedTemplate ? "#fff" : "#7B5E00",
            border: "none", borderRadius: 10,
            padding: "10px 18px", fontSize: 14, fontWeight: 700,
            cursor: "pointer", width: "100%",
            fontFamily: "'Source Sans 3', sans-serif",
            transition: "background 0.2s",
          }}>
            {copiedTemplate ? "✓ Template Copied!" : "📄 Copy This Week as Template"}
          </button>
        </div>

        {/* Step 4 */}
        <div style={{
          background: "#F5F2EE", border: "1.5px solid #C0BDB8",
          borderRadius: 12, padding: "14px 16px", marginBottom: 20,
        }}>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            fontWeight: 700, color: "#555", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 8,
          }}>Step 3 — Paste into weekData.js and deploy</div>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
            color: "#666", lineHeight: 1.65, margin: 0,
          }}>
            Copy the JSON Claude generates. In your project, open{" "}
            <code style={{ background: "#E8E4DE", padding: "1px 5px", borderRadius: 4 }}>
              src/data/weekData.js
            </code>
            , find the skeleton entry for Week {nextSkeletonWeek?.weekNumber},
            and replace it with Claude's output. Then run:
          </p>
          <div style={{
            background: "#1B3A2D", borderRadius: 8, padding: "10px 12px",
            fontFamily: "monospace", fontSize: 12, color: "#A8D5B5",
            marginTop: 10, lineHeight: 1.8,
          }}>
            git add .<br />
            git commit -m "Week {nextSkeletonWeek?.weekNumber} content"<br />
            git push<br />
            npm run deploy
          </div>
        </div>

        <button onClick={onClose} style={{
          width: "100%", padding: "12px", borderRadius: 12,
          border: "1.5px solid #E0DDD8", background: "#fff",
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          fontWeight: 600, color: "#888", cursor: "pointer",
        }}>Close</button>
      </div>
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
        padding: "11px 16px", background: "#F8F6F2",
        borderBottom: "1px solid #E0DDD8",
        display: "flex", alignItems: "center", gap: 8,
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

export default function SettingsScreen({ studyMode, setStudyMode, completedItems, setCompletedItems, currentWeek, allWeeks }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const totalCompleted = Object.values(completedItems).filter(Boolean).length;
  const nextSkeleton = allWeeks?.slice(allWeeks.findIndex(w => w.weekNumber === currentWeek.weekNumber) + 1).find(w => w.skeleton);

  const clearProgress = () => {
    if (window.confirm("Clear all progress? This cannot be undone.")) {
      setCompletedItems({});
    }
  };

  return (
    <div style={{ padding: "20px 16px" }}>
      {showUpdateModal && (
        <UpdateModal
          onClose={() => setShowUpdateModal(false)}
          currentWeek={currentWeek}
          allWeeks={allWeeks || []}
        />
      )}

      <h2 style={{
        fontFamily: "'EB Garamond', serif", fontSize: 26,
        fontWeight: 600, color: "#1B3A2D", marginBottom: 4,
      }}>Settings</h2>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
        color: "#888", marginBottom: 20,
      }}>Customize your study experience</p>

      {/* UPDATE CONTENT BUTTON — prominent */}
      <div style={{
        background: "linear-gradient(135deg, #1B3A2D, #2D5A3D)",
        borderRadius: 16, padding: "18px 20px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🔄</span>
          <div>
            <div style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
              fontWeight: 700, color: "#fff",
            }}>Generate Week Content</div>
            <div style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
              color: "#A8D5B5",
            }}>
              {nextSkeleton
                ? `Next up: Week ${nextSkeleton.weekNumber} — ${nextSkeleton.scriptureRange}`
                : "All weeks fully populated!"}
            </div>
          </div>
        </div>
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          color: "#A8D5B5", lineHeight: 1.6, marginBottom: 14,
        }}>
          Get a pre-filled prompt to generate full daily content for the next week.
          Copy it, open Claude, paste, and deploy.
        </p>
        <button onClick={() => setShowUpdateModal(true)} style={{
          background: "#fff", color: "#1B3A2D", border: "none",
          borderRadius: 12, padding: "11px 18px",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          fontFamily: "'Source Sans 3', sans-serif", width: "100%",
        }}>
          📋 Open Update Prompt →
        </button>
      </div>

      {/* Study Mode */}
      <Section title="Study Mode" icon="🙏">
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          color: "#666", marginBottom: 14, lineHeight: 1.6,
        }}>
          Personal shows individual reflection questions. Family shows discussion questions for group study.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          {["personal","family"].map(m => (
            <button key={m} onClick={() => setStudyMode(m)} style={{
              flex: 1, padding: "11px 10px", borderRadius: 12,
              border: `2px solid ${studyMode === m ? "#1B3A2D" : "#E0DDD8"}`,
              background: studyMode === m ? "#1B3A2D" : "#fff",
              color: studyMode === m ? "#fff" : "#666",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
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
          padding: "10px 0", borderBottom: "1px solid #F0EDE8",
        }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#555" }}>
            Items completed this season
          </span>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, color: "#1B3A2D" }}>
            {totalCompleted}
          </span>
        </div>
        <button onClick={clearProgress} style={{
          marginTop: 14, width: "100%", padding: "11px",
          borderRadius: 10, border: "1.5px solid #EF5350",
          background: "#FFF5F5", color: "#C62828",
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>🗑 Reset All Progress</button>
      </Section>

      {/* Resources */}
      <Section title="Study Resources" icon="🔗">
        {[
          { label: "Gospel Library App",   url: "https://www.churchofjesuschrist.org/pages/mobileapps", emoji: "📱" },
          { label: "Come Follow Me Manual",url: "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-individuals-and-families-old-testament-2022", emoji: "📖" },
          { label: "Follow Him Podcast",   url: "https://followhimpodcast.com", emoji: "🎙️" },
          { label: "Line Upon Line",       url: "https://www.youtube.com/@LineUponLine", emoji: "🎥" },
          { label: "Latter Day Kids",      url: "https://www.youtube.com/@LatterDayKids", emoji: "🎬" },
          { label: "BibleProject",         url: "https://bibleproject.com", emoji: "🌍" },
          { label: "Scripture Central",    url: "https://scripturecentral.org", emoji: "📚" },
          { label: "General Conference",   url: "https://www.churchofjesuschrist.org/study/general-conference", emoji: "🏛️" },
        ].map((r, i, arr) => (
          <a key={r.label} href={r.url} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "11px 0",
            borderBottom: i < arr.length - 1 ? "1px solid #F0EDE8" : "none",
            textDecoration: "none",
          }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1B3A2D", fontWeight: 600 }}>
              {r.emoji} {r.label}
            </span>
            <span style={{ color: "#7AB648", fontSize: 16 }}>→</span>
          </a>
        ))}
      </Section>

      {/* About */}
      <Section title="About" icon="ℹ️">
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.75 }}>
          <p style={{ marginBottom: 8 }}>
            <strong>Come Follow Me Daily</strong> organizes the 2026 Old Testament curriculum into a structured 10–15 minute daily study program for personal and family use.
          </p>
          <p style={{ color: "#AAA", fontSize: 12 }}>
            React + Vite · GitHub Pages · Scripture links via Gospel Library · AI via Claude Sonnet
          </p>
        </div>
      </Section>

      <div style={{ height: 16 }} />
    </div>
  );
}
