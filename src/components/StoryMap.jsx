import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon paths (Leaflet/Vite asset issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Bible Maps reference data ─────────────────────────────────────────────
// Official Church Bible Maps (churchofjesuschrist.org/study/scriptures/bible-maps)
// Each map's image is bounded using Dead Sea (south) + north of Sea of Galilee
// as approximate anchor corners for a simple rectangular overlay fit.
export const BIBLE_MAPS = {
  2: { title: "Israel's Exodus from Egypt and Entry into Canaan",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/3f15d8b9b06c511c0e3ff0bf9d4a1e7b0d6e1234/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-2?lang=eng",
       bounds: [[28.5, 30.5], [34.0, 37.5]] },
  3: { title: "The Division of the 12 Tribes",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/b1d4f8c9e06c511c0e3ff0bf9d4a1e7b0d6e5678/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-3?lang=eng",
       bounds: [[30.8, 34.5], [33.4, 36.0]] },
  4: { title: "The Empire of David and Solomon",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/eda9b1e4449b5687243bd4f1e2bac3bdd9b78d46/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-4?lang=eng",
       bounds: [[29.3, 32.5], [34.6, 39.0]] },
  5: { title: "The Assyrian Empire",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/ce99fff711a3b3e883865c8162cbbc09dc1bb272/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-5?lang=eng",
       bounds: [[24.0, 32.0], [39.0, 48.0]] },
  6: { title: "The New Babylonian Empire and the Kingdom of Egypt",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/4a3f5e6c711a3b3e883865c8162cbbc09dc1cd83/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-6?lang=eng",
       bounds: [[22.0, 28.0], [38.0, 48.0]] },
  7: { title: "The Persian Empire",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/5b4f6e7d822b4c4f994976d273dccd0adc2de94/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-7?lang=eng",
       bounds: [[10.0, 25.0], [42.0, 65.0]] },
  9: { title: "The World of the Old Testament",
       imageUrl: "https://www.churchofjesuschrist.org/imgs/86f8ad300977fd0835d7f71f6e12c9ec235dab22/full/!1200,/0/default",
       sourceUrl: "https://www.churchofjesuschrist.org/study/scriptures/bible-maps/map-9?lang=eng",
       bounds: [[12.0, 22.0], [42.0, 50.0]] },
};

export default function StoryMap({ mapPeriod, primaryLat, primaryLng, primaryZoom, locations, weekLabel }) {
  const [showAncient, setShowAncient] = useState(true);
  const mapInfo = BIBLE_MAPS[mapPeriod] || BIBLE_MAPS[4];

  return (
    <div>
      {/* Toggle control */}
      <div style={{
        display: "flex", gap: 8, marginBottom: 10, alignItems: "center",
      }}>
        <button
          onClick={() => setShowAncient(true)}
          style={{
            flex: 1, padding: "8px 12px", borderRadius: 20,
            border: showAncient ? "2px solid #C0622D" : "1.5px solid #DDD",
            background: showAncient ? "#FDF0E8" : "#fff",
            color: showAncient ? "#C0622D" : "#999",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>📜 Ancient Map</button>
        <button
          onClick={() => setShowAncient(false)}
          style={{
            flex: 1, padding: "8px 12px", borderRadius: 20,
            border: !showAncient ? "2px solid #2980B9" : "1.5px solid #DDD",
            background: !showAncient ? "#EBF4FB" : "#fff",
            color: !showAncient ? "#2980B9" : "#999",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>🌍 Modern Map</button>
      </div>

      <div style={{
        borderRadius: 12, overflow: "hidden",
        border: "1.5px solid #DDD", height: 320,
      }}>
        <MapContainer
          center={[primaryLat, primaryLng]}
          zoom={primaryZoom}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={showAncient ? 0.25 : 1}
          />
          {showAncient && (
            <ImageOverlay
              url={mapInfo.imageUrl}
              bounds={mapInfo.bounds}
              opacity={0.85}
            />
          )}
          {locations && locations.map((loc, i) => (
            <Marker key={i} position={[loc.lat, loc.lng]}>
              <Popup>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#1A3A5C" }}>
                    {loc.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>
                    {loc.note}
                  </div>
                  {loc.otherWeeks && loc.otherWeeks.length > 0 && (
                    <div style={{
                      fontSize: 11, color: "#7B5E00", background: "#FFF8E7",
                      padding: "4px 8px", borderRadius: 6, marginTop: 4,
                    }}>
                      📍 Also visited in: {loc.otherWeeks.join(", ")}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <p style={{
          fontSize: 11, color: "#999", margin: 0,
          fontFamily: "'Source Sans 3', sans-serif",
        }}>{showAncient ? `Bible Map: ${mapInfo.title}` : "Modern terrain map"}</p>
        <a href={mapInfo.sourceUrl} target="_blank" rel="noreferrer" style={{
          fontSize: 11, color: "#C0622D", fontWeight: 600,
          fontFamily: "'Source Sans 3', sans-serif", textDecoration: "none",
        }}>View Official LDS Map →</a>
      </div>
    </div>
  );
}
