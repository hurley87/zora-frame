'use client';

import ZoraCollect from '@/components/ZoraCollect';
import dynamic from 'next/dynamic';

const Collect = dynamic(() => import('@/components/Collect'), {
  ssr: false,
});

export default function App({
  tokenContract,
  tokenId,
}: {
  tokenContract: `0x${string}`;
  tokenId: string;
}) {
  if (
    tokenContract.toLowerCase() ===
    '0xf1e9bc2971f75c784d2d8689f574fbc0dc89676a'.toLowerCase()
  ) {
    return <ZoraCollect tokenContract={tokenContract} tokenId={tokenId} />;
  }
  return <Collect tokenContract={tokenContract} tokenId={tokenId} />;
}
