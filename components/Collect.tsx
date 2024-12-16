'use client';
import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { useReadContract } from 'wagmi';
import { enjoyHigherABI } from '@/lib/enjoyHigher';
import Image from 'next/image';
import Info from './Info';
import Mint from './Mint';

interface Token {
  image: string;
  name: string;
}

export default function Collect({
  tokenContract,
  tokenId,
}: {
  tokenContract: `0x${string}`;
  tokenId: string;
}) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [token, setToken] = useState<Token | null>(null);

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
    <div className="w-full h-screen flex flex-col justify-between p-3 gap-4">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Enjoyr" width={32} height={32} />
          <div className="text-lg font-medium">Enjoyr</div>
        </div>
        <Info />
      </div>
      {token && (
        <div className="flex flex-col gap-2 h-full">
          <img src={token.image} alt="Token" className="w-full h-auto" />
          <h1 className="text-2xl font-medium">{token.name}</h1>
          <div className="flex gap-3 items-center ">
            <span>✧ 111</span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              2 hrs
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              2
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>
              100 $HIGHER
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="pr-2">Cult</span>
            <span className="pr-2"></span>
            <Image
              src="/logos/higher.jpg"
              alt="Higher"
              width={20}
              height={20}
            />
            <span className="flex">$HIGHER</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="pr-2">Creator</span>
            <span className="pr-2"></span>
            <Image
              src="/logos/higher.jpg"
              alt="Higher"
              width={20}
              height={20}
            />
            <span className="flex">$HIGHER</span>
          </div>
        </div>
      )}
      <Mint tokenContract={tokenContract} tokenId={tokenId} />
    </div>
  );
}
