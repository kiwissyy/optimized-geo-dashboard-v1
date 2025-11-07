"use client";

import dynamic from "next/dynamic";

// 1. LeafletMap 컴포넌트의 경로를 변수에 저장하여 Next.js 정적 분석 우회
const LeafletMapComponentPath = "./components/LeafletMap";

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
    </main>
  );
}
