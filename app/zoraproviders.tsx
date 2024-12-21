'use client';

import dynamic from 'next/dynamic';

const ZoraProvider = dynamic(
  () => import('@/components/providers/ZoraProvider'),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ZoraProvider>{children}</ZoraProvider>;
}
