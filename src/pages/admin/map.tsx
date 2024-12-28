import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MarkerType = {
  id?: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

const AddMarker = ({
  setNewMarker,
}: {
  setNewMarker: (marker: MarkerType) => void;
}) => {
  useMapEvents({
    click(e) {
      setNewMarker({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        title: "New Marker",
        description: "Description for new marker",
      });
    },
  });
  return null;
};

export default function AdminMap() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [newMarker, setNewMarker] = useState<MarkerType | null>(null);

  useEffect(() => {
    fetch("/api/map")
      .then((res) => res.json())
      .then((data) => setMarkers(data));
  }, []);

  const saveMarker = async () => {
    if (newMarker) {
      const response = await fetch("/api/map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMarker),
      });

      if (response.ok) {
        const savedMarker = await response.json();
        setMarkers((prev) => [...prev, savedMarker]);
        setNewMarker(null); // Clear the temporary marker
        alert("Marker added!");
      } else {
        alert("Failed to add marker.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Manage Map</h1>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "500px", width: "80%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarker setNewMarker={setNewMarker} />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>
              <h3>{marker.title}</h3>
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}
        {newMarker && (
          <Marker position={[newMarker.latitude, newMarker.longitude]}>
            <Popup>
              <h3>{newMarker.title}</h3>
              <p>{newMarker.description}</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {newMarker && (
        <button
          onClick={saveMarker}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save New Marker
        </button>
      )}
    </div>
  );
}
