# 🚀 Optimized Geo-Dashboard (Leaflet Edition)

위성 속성 정보 데이터 시각화를 목표로 **Next.js 14 (App Router)** 환경에서 구축된 대규모 위성 데이터 대시보드 프로젝트입니다. 복잡한 클라이언트 사이드 라이브러리(Leaflet)와 서버 측 렌더링(SSR) 환경 간의 충돌을 성공적으로 해결했으며, **성능 최적화** 및 **실시간 데이터 처리** 역량을 집중적으로 구현했습니다.

> [https://optimized-geo-dashboard-v1.vercel.app/](https://optimized-geo-dashboard-v1.vercel.app/)

---
## ✨ 주요 기능 및 기술 스택

| 구   분 | 핵심 기능 및 목표 | 구현 기술 |
| :--- | :--- | :--- |
| **성능 최적화** | 500개 이상의 마커를 줌 레벨에 따라 하나의 클러스터로 묶어 지도 렌더링 부하 최소화 | **Leaflet Marker Cluster** |
| **데이터 처리** | 15초마다 위성 위치 데이터를 백그라운드에서 자동 갱신하고 상태 관리 | **React Query (TanStack Query)** |
| **아키텍처** | 클라이언트 전용 라이브러리를 SSR 환경에서 안전하게 분리하고 로드하여 충돌 방지 | **Next.js 14 (App Router), `next/dynamic` (SSR: false), `transpilePackages`** |
| **UX/가시성** | 실시간 데이터 로딩 상태, 업데이트 시간, 총 데이터 포인트 수를 하단 UI에 표시 | **React Hooks, Custom UI** |

---

## ⚙️ 프로젝트 실행 방법

### 1. 환경 설정 및 설치

프로젝트 저장소를 클론한 후, 의존성 패키지를 설치합니다.

```bash
# 프로젝트 클론
git clone [Your-Repo-URL]
cd optimized-geo-dashboard-v1

# 의존성 설치
npm install
```

### 2. Leaflet 마커 이미지 설정 (필수)

Leaflet 마커 이미지가 깨지는 현상을 방지하기 위해, 라이브러리 이미지를 public 폴더로 복사하고 경로를 재정의합니다.

```bash
# 마커 이미지 복사
mkdir -p public/leaflet/images
cp node_modules/leaflet/dist/images/marker-icon-2x.png public/leaflet/images/
cp node_modules/leaflet/dist/images/marker-icon.png public/leaflet/images/
cp node_modules/leaflet/dist/images/marker-shadow.png public/leaflet/images/
```

### 3. 서버 실행

개발 서버를 실행합니다.

```bash
npm run dev
```


---

## 💡구현 시 중점 사항

### 1. Next.js App Router와 외부 라이브러리 충돌 해결

문제: Leaflet 플러그인 등 브라우저 의존 라이브러리가 Next.js 서버 환경에서 로드될 때 발생하는 ssr: false 에러 및 모듈 충돌.

해결: 
- 모든 Client Component에 'use client' 명시.

- **next/dynamic**의 ssr: false를 이용해 지도 컴포넌트를 분리.

- **next.config.js**의 transpilePackages 설정을 통해 Leaflet 라이브러리들을 서버 측에서 안전하게 처리하도록 강제하여 모든 충돌 문제를 완벽히 해결했습니다.

### 2. 대규모 데이터 시각화 최적화
Leaflet Marker Cluster 플러그인을 사용하여 수백 개의 마커를 줌 레벨에 따라 동적 그룹화했습니다. 이를 통해 렌더링 성능을 획기적으로 개선하고 대시보드의 실사용 안정성을 확보했습니다.

### 3. 고효율 실시간 데이터 관리
React Query를 도입하여 15초마다 백그라운드에서 데이터를 자동으로 갱신하고 상태를 관리했습니다. 로딩 및 페칭 상태를 UI에 명확히 표시하는 대시보드 메트릭스를 구현하여 신뢰성과 사용성을 높였습니다.