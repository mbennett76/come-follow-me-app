import { useState } from "react";
import { TYPE_CONFIG } from "../data/weekData.js";

export default function ContentCard({ item, completed, onToggle, studyMode }) {
  const [expanded, setExpanded] = useState(true);
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.insight;

  // Filter by study mode
  if (item.type === "question" && item.mode && item.mode !== "both") {
    if (item.mode === "personal" && studyMode === "family") return null;
    if (item.mode === "family"   && studyMode === "personal") return null;
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

          {/* ── Scripture ── */}
          {item.type === "scripture" && (<>

            {/* Daily reading assignment badge — shown when dailyRef is present */}
            {item.dailyRef && (
              <div style={{
                background: "#1B3A2D", borderRadius: 10,
                padding: "10px 14px", marginBottom: 14,
              }}>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#A8D5B5", marginBottom: 3,
                }}>📖 Today's Reading Assignment</div>
                <div style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 20, fontWeight: 600, color: "#F0F7F3",
                }}>{item.dailyRef}</div>
                {item.dailySummary && (
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 13, color: "#7ABF92", marginTop: 3,
                  }}>{item.dailySummary}</div>
                )}
              </div>
            )}

            {/* Key verse */}
            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: 18,
              lineHeight: 1.75, color: "#2A3828", fontStyle: "italic",
              margin: "0 0 14px",
            }}>"{item.text}"
              <span style={{
                display: "block", fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 12, fontStyle: "normal", color: "#7AB648",
                fontWeight: 700, marginTop: 4,
              }}>— {item.reference}</span>
            </p>

            {/* Open buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              <a href={item.url} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 14, fontWeight: 700, color: cfg.color,
                background: "#fff", border: `1.5px solid ${cfg.border}`,
                padding: "8px 14px", borderRadius: 20, textDecoration: "none",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>📱 Open in Gospel Library</a>
              {item.webUrl && (
                <a href={item.webUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 600, color: "#777",
                  background: "#F5F5F5", border: "1.5px solid #DDD",
                  padding: "8px 13px", borderRadius: 20, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>🌐 Browser</a>
              )}
            </div>
            <p style={{
              fontSize: 11, color: "#BBB", margin: 0, lineHeight: 1.5,
              fontFamily: "'Source Sans 3', sans-serif",
            }}>📱 Opens Gospel Library app · 🌐 Browser as backup</p>
          </>)}

          {/* ── Manual Intro ── */}
          {item.type === "manualIntro" && (
            <div>
              <p style={{
                fontFamily: "'EB Garamond', serif", fontSize: 17,
                lineHeight: 1.8, color: "#3A1038", margin: "0 0 14px",
              }}>{item.text}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontWeight: 700, color: "#4A1942",
                  background: "#fff", border: "1.5px solid #9B59B6",
                  padding: "6px 12px", borderRadius: 20, textDecoration: "none",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}>📖 Open CFM Manual →</a>
              </div>
              <p style={{
                fontSize: 11, color: "#BBB", margin: "8px 0 0", lineHeight: 1.5,
                fontFamily: "'Source Sans 3', sans-serif",
              }}>📋 {item.source}</p>
            </div>
          )}

          {/* ── Artwork ── */}
          {item.type === "artwork" && (<>
            {item.paintings && item.paintings.map((p, i) => (
              <div key={i} style={{
                marginBottom: i < item.paintings.length - 1 ? 20 : 12,
                borderRadius: 12, overflow: "hidden",
                border: "1px solid #E8D5C0", background: "#FDF8F4",
              }}>
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  style={{ width: "100%", display: "block", maxHeight: 280, objectFit: "cover" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div style={{ padding: "10px 14px" }}>
                  <div style={{
                    fontFamily: "'EB Garamond', serif", fontSize: 16,
                    fontWeight: 600, color: "#3D1A00", marginBottom: 2,
                  }}>{p.title}</div>
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
                    color: "#C0622D", fontWeight: 700, marginBottom: 6,
                  }}>{p.artist} · {p.year}</div>
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                    color: "#666", lineHeight: 1.6, marginBottom: 8,
                  }}>{p.description}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href={p.wikiUrl} target="_blank" rel="noreferrer" style={{
                      fontSize: 11, color: "#C0622D", fontWeight: 600,
                      textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                    }}>🖼️ View full image (Wikimedia Commons) · {p.license}</a>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              <a href={item.gospelLibraryUrl} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 700, color: "#3D1A00",
                background: "#fff", border: "1.5px solid #C0622D",
                padding: "7px 13px", borderRadius: 20, textDecoration: "none",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>📱 {item.gospelLibraryLabel}</a>
            </div>
            <p style={{
              fontSize: 11, color: "#BBB", margin: "8px 0 0",
              fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.5,
            }}>Artworks shown are in the public domain. For LDS commissioned art, tap "View LDS Art" above.</p>
          </>)}

          {/* ── Map Location ── */}
          {item.type === "mapLocation" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
              color: "#555", lineHeight: 1.7, margin: "0 0 12px",
            }}>{item.description}</p>
            {item.locations && item.locations.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                {item.locations.map((loc, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    padding: "8px 0",
                    borderBottom: i < item.locations.length - 1 ? "1px solid #E8F2FA" : "none",
                  }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>📍</span>
                    <div>
                      <div style={{
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
                        fontWeight: 700, color: "#1A3A5C",
                      }}>{loc.name}</div>
                      <div style={{
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
                        color: "#777", lineHeight: 1.5,
                      }}>{loc.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{
              borderRadius: 10, overflow: "hidden",
              border: "1.5px solid #2980B9", marginBottom: 10,
              position: "relative", paddingBottom: "56.25%", height: 0,
            }}>
              <iframe
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBoxI55pCO3O-ktFqIUGc5SACA0x5KshUo&center=${item.primaryLat},${item.primaryLng}&zoom=${item.primaryZoom}&maptype=terrain`}
                title="Scripture location map"
              />
            </div>
            <a href={`https://www.google.com/maps/@${item.primaryLat},${item.primaryLng},${item.primaryZoom}z`}
              target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 700, color: "#1A3A5C",
                background: "#fff", border: "1.5px solid #2980B9",
                padding: "7px 13px", borderRadius: 20, textDecoration: "none",
                fontFamily: "'Source Sans 3', sans-serif",
              }}>🗺️ Open in Google Maps →</a>
            <p style={{
              fontSize: 11, color: "#BBB", margin: "8px 0 0",
              fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.5,
            }}>Tap any location above to explore it. Modern place names shown — ancient borders differed.</p>
          </>)}

          {/* ── Timeline ── */}
          {item.type === "timeline" && (<>
            <div style={{
              background: "#4A3000", borderRadius: 10, padding: "10px 14px", marginBottom: 14,
            }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                fontWeight: 700, color: "#D4A017", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: 2,
              }}>📅 {item.currentPeriod} · {item.approximateDate}</div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                color: "#F5E4B0", lineHeight: 1.6,
              }}>{item.biblicalContext}</div>
            </div>

            {/* Visual timeline strip */}
            <div style={{
              background: "#FFF8E7", borderRadius: 10, padding: "12px 14px", marginBottom: 14,
              border: "1px solid #E8D5A0",
            }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                fontWeight: 700, color: "#7B5E00", textTransform: "uppercase",
                letterSpacing: "0.1em", marginBottom: 10,
              }}>Biblical Timeline</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {item.timeline && item.timeline.filter(e => e.type === "biblical").map((e, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                      background: e.highlight ? "#D4A017" : e.past ? "#CCC" : e.current ? "#8B6914" : "#DDD",
                      border: e.highlight ? "2px solid #4A3000" : "none",
                    }} />
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: e.highlight ? 14 : 12,
                      fontWeight: e.highlight ? 700 : 400,
                      color: e.highlight ? "#4A3000" : e.past ? "#AAA" : "#666",
                    }}>{e.label}</div>
                    <div style={{
                      marginLeft: "auto", fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11, color: "#AAA",
                    }}>{e.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* World context */}
            <div style={{
              background: "#F0F7FA", borderRadius: 10, padding: "12px 14px",
              border: "1px solid #BDD8E8",
            }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                fontWeight: 700, color: "#1A3A5C", textTransform: "uppercase",
                letterSpacing: "0.1em", marginBottom: 8,
              }}>🌍 World Context</div>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
                color: "#444", lineHeight: 1.7, margin: "0 0 10px",
              }}>{item.worldContext}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {item.timeline && item.timeline.filter(e => e.type === "world").map((e, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: "#2980B9",
                    }} />
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 12, color: "#555",
                    }}>{e.label}</div>
                    <div style={{
                      marginLeft: "auto", fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 11, color: "#AAA",
                    }}>{e.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </>)}

          {/* ── Insight / intro / review / nextweek ── */}
          {["insight","intro","review","nextweek"].includes(item.type) && (
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 16,
              lineHeight: 1.75, color: "#3A3A3A", margin: 0,
            }}>{item.text}</p>
          )}

          {/* ── Question ── */}
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

          {/* ── Video / Line Upon Line ── */}
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
                title={item.title} frameBorder="0"
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

          {/* ── Podcast ── */}
          {item.type === "podcast" && (<>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
              color: "#555", lineHeight: 1.7, margin: "0 0 8px",
            }}>{item.description}</p>
            {item.note && <p style={{
              fontSize: 13, color: "#27AE60", fontWeight: 700,
              margin: "0 0 12px", fontFamily: "'Source Sans 3', sans-serif",
            }}>⏱ {item.note}</p>}

            {/* Episode links — Part 1, Part 2, Favorites if available */}
            {(item.podcastUrl || item.podcast2Url || item.podcastFavUrl) && (
              <div style={{ marginBottom: 10 }}>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                  fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#27AE60", marginBottom: 6,
                }}>Episode Links</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {item.podcastUrl && (
                    <a href={item.podcastUrl} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 13, fontWeight: 700, color: "#0D3D2B",
                      background: "#fff", border: "1.5px solid #27AE60",
                      padding: "7px 13px", borderRadius: 20,
                      textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                    }}>🎙️ Part 1</a>
                  )}
                  {item.podcast2Url && (
                    <a href={item.podcast2Url} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 13, fontWeight: 700, color: "#0D3D2B",
                      background: "#fff", border: "1.5px solid #27AE60",
                      padding: "7px 13px", borderRadius: 20,
                      textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                    }}>🎙️ Part 2</a>
                  )}
                  {item.podcastFavUrl && (
                    <a href={item.podcastFavUrl} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 13, fontWeight: 700, color: "#0D3D2B",
                      background: "#fff", border: "1.5px solid #27AE60",
                      padding: "7px 13px", borderRadius: 20,
                      textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                    }}>⭐ Favorites (5 min)</a>
                  )}
                </div>
              </div>
            )}

            {/* Listen on */}
            <div style={{ marginBottom: 4 }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#27AE60", marginBottom: 6,
              }}>Listen On</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href={item.appleUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 13, fontWeight: 700, color: "#0D3D2B",
                  background: "#fff", border: "1.5px solid #27AE60",
                  padding: "7px 13px", borderRadius: 20,
                  textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                }}>🎵 Apple Podcasts</a>
                <a href={item.spotifyUrl} target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 13, fontWeight: 700, color: "#0D3D2B",
                  background: "#fff", border: "1.5px solid #27AE60",
                  padding: "7px 13px", borderRadius: 20,
                  textDecoration: "none", fontFamily: "'Source Sans 3', sans-serif",
                }}>🎧 Spotify</a>
              </div>
            </div>
          </>)}

          {/* ── Article / CFM Manual ── */}
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

          {/* ── General Conference ── */}
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

          {/* ── Coming Soon placeholder ── */}
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

        </div>
      )}
    </div>
  );
}
