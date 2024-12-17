import { Metadata } from 'next';
import { use } from 'react';
import App from '@/app/app';

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenContract, tokenId } = await params;

  const frame = {
    version: 'next',
    imageUrl: `${appUrl}/collect/${tokenContract}/${tokenId}/opengraph-image`,
    button: {
      title: 'Launch Frame',
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
