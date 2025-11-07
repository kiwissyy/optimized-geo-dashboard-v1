
'use client'; 

import React, { useRef, useEffect } from 'react';
import L, { Map } from 'leaflet';
import 'leaflet.markercluster';
import { useSatellitePositions } from '../hooks/useSatelliteData'; 
import { SatellitePosition } from '../../src/data/mockSatelliteData';


const INITIAL_MAP_OPTIONS = {
  center: [37.5, 127.0] as L.LatLngTuple, // 대한민국 중심 근처
  zoom: 11,
  minZoom: 2,
};

// 위성 위치 데이터를 지도에 마커 클러스터로 표시하는 컴포넌트
const SatelliteMarkers = ({ map, data }: { map: Map | null, data: SatellitePosition[] }) => {
  useEffect(() => {
    if (!map) return;

    const markers = (L as any).markerClusterGroup({
        chunkedLoading: true, // 대규모 데이터 로딩 최적화
        maxClusterRadius: 40, // 클러스터링 반경 설정 (40px)
    });

    // 데이터를 마커로 변환하여 클러스터 그룹에 추가
    data.forEach(sat => {
        const marker = L.marker([sat.latitude, sat.longitude]);
        
        // 팝업 정보 바인딩
        marker.bindPopup(`
            <b>${sat.name}</b><br>
            ID: ${sat.id}<br>
            속도: ${sat.velocity.toFixed(2)} km/s
        `);
        
        // 마커를 클러스터 그룹에 추가
        markers.addLayer(marker);
    });

    // 클러스터 그룹을 지도에 추가
    map.addLayer(markers);

    // 기존 클러스터 그룹 제거
    return () => {
        map.removeLayer(markers);
    };
  }, [map, data]); // map과 data가 변경될 때마다 재실행

  return null;
};

export default function LeafletMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  
  // React Query Hook을 사용하여 데이터 불러오기
  const { data: satelliteData, isLoading, isError } = useSatellitePositions();

  useEffect(() => {
    if (mapRef.current) return;

    // 지도 인스턴스 생성
    const map = L.map(mapContainerRef.current!, INITIAL_MAP_OPTIONS);
    mapRef.current = map;

    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // 컴포넌트 언마운트 시 지도 리소스 정리
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="map-info" style={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          zIndex: 1000, 
          backgroundColor: 'white', 
          padding: '8px 12px', 
          borderRadius: 4, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
      }}>
        {isLoading && <span>Loading Satellite Data... 🛰️</span>}
        {isError && <span>Error loading data. ❌</span>}
        {satelliteData && (
            <span>Live Satellites: {satelliteData.length} (Clustering Enabled)</span>
        )}
      </div>
      <div 
        ref={mapContainerRef} 
        className="map-container"
        style={{ width: '100%', height: 'calc(100vh - 60px)' }} 
      />
      {/* 데이터가 로드되면 마커 클러스터 컴포넌트를 렌더링 */}
      {satelliteData && (
        <SatelliteMarkers map={mapRef.current} data={satelliteData} />
      )}
    </>
  );
}