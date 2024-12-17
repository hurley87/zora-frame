import { Metadata } from 'next';
import { use } from 'react';
import App from '@/app/app';
import { http } from 'viem';
import { createPublicClient } from 'viem';
import { base } from 'viem/chains';
import { enjoyHigherABI } from '@/lib/enjoyHigher';

interface CollectPageProps {
  params: Promise<{ tokenContract: `0x${string}`; tokenId: string }>;
}

const appUrl = process.env.NEXT_PUBLIC_URL;

interface Props {
  params: Promise<{
    tokenContract: `0x${string}`;
    tokenId: string;
  }>;
}

const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenContract, tokenId } = await params;

  // get the token metadata
  const result = (await publicClient.readContract({
    abi: enjoyHigherABI,
    address: tokenContract,
    functionName: 'uri',
    args: [BigInt(tokenId)],
  })) as string;

  const metadata = await fetch(result);
  const metadataJson = await metadata.json();
  const imageUrl = metadataJson.image;

  const frame = {
    version: 'next',
    imageUrl,
    button: {
      title: 'Mint',
      action: {
        type: 'launch_frame',
        name: 'Farcaster Frames v2 Demo',
        url: `${appUrl}/collect/${tokenContract}/${tokenId}/`,
        splashImageUrl: `${appUrl}/logo.png`,
        splashBackgroundColor: '#f7f7f7',
      },
    },
  };

  return {
    title: `Collect ${tokenId}`,
    description: `A personalized hello frame for ${tokenId}`,
    openGraph: {
      title: `Collect ${tokenId}`,
      description: `A personalized hello frame for ${tokenId}`,
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  };
}
export default function CollectFrame({ params }: CollectPageProps) {
  const { tokenContract, tokenId } = use(params) as {
    tokenContract: `0x${string}`;
    tokenId: string;
  };

  return <App tokenContract={tokenContract} tokenId={tokenId} />;
}
