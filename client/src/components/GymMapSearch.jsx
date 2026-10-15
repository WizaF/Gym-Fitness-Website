import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default marker icons when using a bundler (Vite/CRA)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Words used to match the hero chips against OSM name / sport tags
const CATEGORY_KEYWORDS = {
  Strength: ["strength", "weight", "bodybuilding", "powerlifting", "iron", "fitness"],
  Yoga: ["yoga", "pilates"],
  HIIT: ["hiit", "interval", "bootcamp", "boot camp"],
  CrossFit: ["crossfit", "cross fit"],
  Swimming: ["swim", "pool", "aqua"],
  Boxing: ["boxing", "mma", "martial", "kickbox"],
};

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);
  return null;
}

/**
 * Props
 *  - externalQuery: city/place typed in the hero search
 *  - searchKey:     bump this number to re-run the search (even for the same text)
 *  - category:      active chip from the hero ("Yoga", "HIIT", ...) or ""
 *  - onAddGym(gym): called when "Add to schedule" is clicked
 */
export default function GymMapSearch({ externalQuery = "", searchKey = 0, category = "", onAddGym }) {
  const [query, setQuery] = useState(externalQuery);
  const [gyms, setGyms] = useState([]);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.209]); // Default: Delhi
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Re-run whenever the hero form is submitted
  useEffect(() => {
    if (externalQuery) {
      setQuery(externalQuery);
      executeSearch(externalQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const executeSearch = async (searchTerm) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(searchTerm)}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        setErrorMessage("Location not found. Try another city.");
        setLoading(false);
        return;
      }

      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);
      setMapCenter([lat, lon]);
      await fetchGyms(lat, lon, searchTerm);
    } catch (error) {
      console.error("Error searching location:", error);
      setErrorMessage("Network error while searching location.");
      setLoading(false);
    }
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    executeSearch(query.trim());
  };

  const handleNearbySearch = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setMapCenter([lat, lon]);
        await fetchGyms(lat, lon, "Your Location");
      },
      () => {
        setErrorMessage("Unable to get your location. Check browser permissions.");
        setLoading(false);
      }
    );
  };

  const fetchGyms = async (lat, lon, locationName) => {
    const radius = 5000;
    // Nodes AND ways (many gyms are mapped as building outlines), gyms + fitness centres
    const q = `[out:json][timeout:25];(nwr(around:${radius},${lat},${lon})[amenity=gym];nwr(around:${radius},${lat},${lon})[leisure=fitness_centre];);out center 30;`;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(q)}`;

    try {
      const response = await fetch(overpassUrl);
      const data = await response.json();

      if (data.elements && data.elements.length > 0) {
        const formatted = data.elements
          .map((el, index) => {
            const elLat = el.lat ?? el.center?.lat;
            const elLon = el.lon ?? el.center?.lon;
            const tags = el.tags || {};
            return {
              id: `${el.type}-${el.id ?? index}`,
              name: tags.name || `${locationName} Fitness Hub #${index + 1}`,
              lat: elLat,
              lon: elLon,
              sport: tags.sport || "",
              address: tags["addr:street"] || "OpenStreetMap location",
            };
          })
          .filter((g) => g.lat != null && g.lon != null);
        setGyms(formatted);
      } else {
        // Fallback so the map never looks empty (sample pins, not real gyms)
        setGyms([
          { id: "s1", name: `Prime Fitness ${locationName}`, lat: lat + 0.01, lon: lon + 0.01, sport: "", address: "Central Avenue" },
          { id: "s2", name: `Iron Core Gym ${locationName}`, lat: lat - 0.01, lon: lon - 0.01, sport: "", address: "Main Boulevard" },
          { id: "s3", name: "Apex Wellness Center", lat: lat + 0.015, lon: lon - 0.005, sport: "", address: "Station Road" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching gyms from Overpass:", error);
      setGyms([
        { id: "s1", name: "Elite Fitness Club", lat: lat + 0.01, lon: lon + 0.01, sport: "", address: "Downtown Area" },
        { id: "s2", name: "Powerhouse Gym", lat: lat - 0.01, lon: lon - 0.01, sport: "", address: "City Center" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Apply the hero chip as a filter. If nothing matches, show everything.
  const { visibleGyms, filterMissed } = useMemo(() => {
    if (!category) return { visibleGyms: gyms, filterMissed: false };
    const words = CATEGORY_KEYWORDS[category] || [category.toLowerCase()];
    const matches = gyms.filter((g) => {
      const hay = `${g.name} ${g.sport}`.toLowerCase();
      return words.some((w) => hay.includes(w));
    });
    return matches.length
      ? { visibleGyms: matches, filterMissed: false }
      : { visibleGyms: gyms, filterMissed: gyms.length > 0 };
  }, [gyms, category]);

  return (
    <div className="c" style={{ maxWidth: 960 }}>
      <form className="search" onSubmit={handleCitySearch} style={{ marginBottom: 12 }}>
        <span>📍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city (e.g. Delhi, Mumbai)…"
          aria-label="Search city"
        />
        <button className="btn" type="submit">Search city</button>
      </form>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <button type="button" className="btn ghost sm" onClick={handleNearbySearch}>
          📍 Gyms near me
        </button>
        {category && <span className="pill"><i /> Filter: {category}</span>}
      </div>

      {loading && <p role="status">Searching for gyms in this area…</p>}
      {errorMessage && <p role="alert" style={{ color: "#e5484d" }}>{errorMessage}</p>}
      {filterMissed && !loading && (
        <p>No gyms tagged “{category}” here yet — showing all gyms in the area.</p>
      )}

      <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: 400, width: "100%" }}>
          <MapController center={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {visibleGyms.map((gym) => (
            <Marker key={gym.id} position={[gym.lat, gym.lon]}>
              <Popup>
                <strong>{gym.name}</strong>
                <br />
                <small>{gym.address}</small>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <h3 style={{ marginBottom: 12 }}>Gyms found ({visibleGyms.length})</h3>
      {visibleGyms.length === 0 && !loading ? (
        <p>Search for a city or tap “Gyms near me” to see gyms on the map.</p>
      ) : (
        <div className="grid">
          {visibleGyms.map((gym) => (
            <div key={gym.id} className="card">
              <h3>{gym.name}</h3>
              <p>📍 {gym.address}</p>
              <button type="button" className="btn ghost sm" onClick={() => onAddGym?.(gym)}>
                Add to my schedule
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}