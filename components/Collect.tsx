'use client';
import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { useAccount, useReadContract } from 'wagmi';
import { enjoyHigherABI } from '@/lib/enjoyHigher';
import Image from 'next/image';
import Info from './Info';
import Mint from './Mint';

export default function Collect({
  tokenContract,
  tokenId,
}: {
  tokenContract: `0x${string}`;
  tokenId: string;
}) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const result = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'tokenDetails',
    args: [BigInt(tokenId)],
  });

  console.log('status', result.status);
  console.log('result', result.data);

  useEffect(() => {
    if (result.data) {
      fetch(result.data[2])
        .then((response) => response.json())
        .then((data) => {
          setToken(data);
        })
        .catch((error) => {
          console.error('Error fetching token:', error);
        });
    }
  }, [result.data]);

  useEffect(() => {
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      sdk.actions.ready();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  console.log('token', token);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Enjoyr" width={32} height={32} />
          <div className="text-lg font-medium">Enjoyr</div>
        </div>
        <Info />
      </div>
      {isConnected && <Mint tokenContract={tokenContract} tokenId={tokenId} />}
    </div>
  );
}
