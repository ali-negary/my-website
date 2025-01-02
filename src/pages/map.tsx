import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

type Marker = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const MarkerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

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
          <MarkerComponent
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>{marker.title}</Popup>
          </MarkerComponent>
        ))}
      </MapContainer>
    </div>
  );
}
