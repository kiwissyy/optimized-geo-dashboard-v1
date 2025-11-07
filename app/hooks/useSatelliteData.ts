'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSatellitePositions, SatellitePosition } from '../../src/data/mockSatelliteData';
const QUERY_KEY = ['satellitePositions'];

export const useSatellitePositions = () => {
  return useQuery<SatellitePosition[], Error>({
    queryKey: QUERY_KEY,
    queryFn: fetchSatellitePositions,
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 15,
  });
};