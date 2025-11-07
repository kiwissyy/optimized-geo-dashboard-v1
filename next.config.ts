import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Leaflet 및 클러스터링 라이브러리를 트랜스파일하도록 설정.
  transpilePackages: [
    "leaflet",
    "leaflet.markercluster",
    "@tanstack/react-query",
  ],
};

export default nextConfig;
