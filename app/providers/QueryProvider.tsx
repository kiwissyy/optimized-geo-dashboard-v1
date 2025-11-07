// app/providers/QueryProvider.tsx

'use client'; // Next.js App Router에서 클라이언트 측 훅/상태 관리에 사용.

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // 개발자 도구

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // QueryClient는 애플리케이션 수명 주기 동안 유지되어야 하므로 useState로 관리합니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 설정: 데이터가 한 번 fetch 되면 5분 동안 fresh로 간주 (서버와의 통신 최소화)
            staleTime: 1000 * 60 * 5, 
            // 탭 포커스가 돌아왔을 때 자동 fetch 방지 
            refetchOnWindowFocus: false, 
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서 Query 상태를 시각적으로 확인 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}