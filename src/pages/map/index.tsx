import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Marker = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

export default function Map() {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    fetch("/api/map")
      .then((res) => res.json())
      .then((data) => setMarkers(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Map</h1>
      <MapContainer
        center={[51.505, -0.09] as [number, number]}
        zoom={13}
        style={{ height: "80vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
