'use client';

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
  return <Collect tokenContract={tokenContract} tokenId={tokenId} />;
}
