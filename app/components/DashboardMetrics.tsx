'use client'; 

import React from 'react';
import { useSatellitePositions } from '../hooks/useSatelliteData'; // app/hooks 폴더 접근

const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

export default function DashboardMetrics() {
    const { data, isLoading, isError, isFetching, isStale, dataUpdatedAt } = useSatellitePositions();
    
    // 데이터 로딩 상태 표시
    let statusText = '';
    let statusColor = '#007bff';

    if (isLoading) {
        statusText = 'Initializing...';
        statusColor = '#ffc107';
    } else if (isFetching) {
        statusText = 'Updating...';
        statusColor = '#17a2b8';
    } else if (isError) {
        statusText = 'Error';
        statusColor = '#dc3545';
    } else if (isStale) {
        statusText = 'Ready (Stale)';
        statusColor = '#6c757d';
    } else {
        statusText = 'Ready (Fresh)';
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 15,
            left: 15,
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '10px 15px',
            borderRadius: 8,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            fontSize: '14px',
            minWidth: '250px',
        }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                Dashboard Metrics
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Status:</span>
                <span style={{ fontWeight: 'bold', color: statusColor }}>{statusText}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Data Points:</span>
                <span style={{ fontWeight: 'bold' }}>{data ? data.length : 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Last Updated:</span>
                <span style={{ fontWeight: 'bold' }}>
                    {dataUpdatedAt ? formatTime(dataUpdatedAt) : 'N/A'}
                </span>
            </div>
        </div>
    );
}