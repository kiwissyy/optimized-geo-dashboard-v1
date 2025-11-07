// app/components/MapboxGL.tsx

'use client'; 

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Mapbox 기본 스타일 시트

// 1. 환경 변수에서 Mapbox Access Token 가져오기
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// 지도의 초기 위치 및 줌 레벨
const INITIAL_MAP_OPTIONS = {
  container: 'map-container', // 지도 DOM 요소를 넣을 ID
  style: 'mapbox://styles/mapbox/satellite-v9', // 위성 맵 스타일 사용
  center: [127.0, 37.5], // 초기 중심 좌표 (대한민국 근처) [경도, 위도]
  zoom: 6, // 초기 줌 레벨
};

export default function MapboxGL() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return; // 이미 지도가 생성되었으면 종료

    // 지도 생성
    mapRef.current = new Map({
      ...INITIAL_MAP_OPTIONS,
      container: mapContainerRef.current!, 
    });

    // 지도 로딩 완료 시 이벤트 리스너 추가 (나중에 데이터 소스 추가 시 사용)
    mapRef.current.on('load', () => {
      console.log('Map Loaded Successfully!');
    });

    // 컴포넌트 언마운트 시 지도 리소스 정리 (메모리 누수 방지)
    return () => mapRef.current?.remove();
  }, []);

  // 2. 지도를 표시할 DOM 요소
  return (
    <div 
      ref={mapContainerRef} 
      className="map-container"
      // 높이 설정을 위해 인라인 스타일 추가 (CSS 파일에서도 가능)
      style={{ width: '100%', height: 'calc(100vh - 60px)' }} 
    />
  );
}