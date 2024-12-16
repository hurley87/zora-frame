'use client';
import dynamic from 'next/dynamic';
import { use } from 'react';

const Collect = dynamic(() => import('@/components/Collect'), {
  ssr: false,
});

interface CollectPageProps {
  params: Promise<{ tokenContract: `0x${string}`; tokenId: string }>;
}

export default function CollectPage({ params }: CollectPageProps) {
  const { tokenContract, tokenId } = use(params) as {
    tokenContract: `0x${string}`;
    tokenId: string;
  };

  return <Collect tokenContract={tokenContract} tokenId={tokenId} />;
}
