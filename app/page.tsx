"use client";

import dynamic from "next/dynamic";

const LeafletMapComponentPath = "./components/LeafletMap";
import DashboardMetrics from "./components/DashboardMetrics";

const DynamicLeafletMap = dynamic(() => import(LeafletMapComponentPath), {
  ssr: false,
  loading: () => (
    <p style={{ textAlign: "center", paddingTop: "50px" }}>Loading map...</p>
  ),
});

export default function HomePage() {
  return (
    <main>
      <h1
        style={{
          textAlign: "center",
          padding: "10px",
          height: "60px",
          margin: 0,
          borderBottom: "1px solid #eee",
        }}
      >
        🚀 Optimized Geo Data Dashboard (Leaflet Edition)
      </h1>
      <DynamicLeafletMap />

      <DashboardMetrics />
    </main>
  );
}
