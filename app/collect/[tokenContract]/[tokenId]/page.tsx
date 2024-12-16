import { Metadata } from 'next';
import { use } from 'react';
import Collect from '@/components/Collect';

interface CollectPageProps {
  params: Promise<{ tokenContract: `0x${string}`; tokenId: string }>;
}

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: 'next',
  imageUrl: `${appUrl}/logo.png`,
  button: {
    title: 'Launch Frame',
    action: {
      type: 'launch_frame',
      name: 'Enjoyr',
      url: `${appUrl}/frames/hello/`,
      splashImageUrl: `${appUrl}/logo.png`,
      splashBackgroundColor: '#f7f7f7',
    },
  },
};

export const metadata: Metadata = {
  title: 'Hello, world!',
  description: 'A simple hello world frame',
  openGraph: {
    title: 'Hello, world!',
    description: 'A simple hello world frame',
  },
  other: {
    'fc:frame': JSON.stringify(frame),
  },
};

export default function CollectPage({ params }: CollectPageProps) {
  const { tokenContract, tokenId } = use(params) as {
    tokenContract: `0x${string}`;
    tokenId: string;
  };

  return <Collect tokenContract={tokenContract} tokenId={tokenId} />;
}
