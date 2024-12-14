'use client';
import dynamic from 'next/dynamic';

const Collect = dynamic(() => import('@/components/Collect'), {
  ssr: false,
});

interface CollectPageProps {
  params: { tokenContract: `0x${string}`; tokenId: string };
}

export default async function CollectPage({ params }: CollectPageProps) {
  const { tokenContract, tokenId } = await params;

  return <Collect tokenContract={tokenContract} tokenId={tokenId} />;
}
