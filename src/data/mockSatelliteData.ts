export interface SatellitePosition {
  id: string;
  name: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  velocity: number;
}

const generateMockData = (count: number): SatellitePosition[] => {
  const data: SatellitePosition[] = [];
  const baseLat = 37.5;
  const baseLon = 127.0;

  for (let i = 1; i <= count; i++) {
    data.push({
      id: `SAT-${String(i).padStart(3, "0")}`,
      name: `Dum-SAT-${i}`,
      timestamp: Date.now() - Math.floor(Math.random() * 10000),
      latitude: baseLat + (Math.random() - 0.5) * 0.1,
      longitude: baseLon + (Math.random() - 0.5) * 0.1,
      velocity: 7.5 + Math.random() * 1.5,
    });
  }
  return data;
};

export const fetchSatellitePositions = async (): Promise<SatellitePosition[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return generateMockData(500); 
};