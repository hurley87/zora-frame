'use client';
import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { useReadContract } from 'wagmi';
import { enjoyHigherABI } from '@/lib/enjoyHigher';
import Image from 'next/image';
import Info from './Info';
import Mint from './Mint';
import { cultLogo } from '@/lib/utils';

interface Token {
  image: string;
  name: string;
  attributes: {
    creator: string;
  }[];
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
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [startTime, setStartTime] = useState<bigint | null>(null);

  const { data } = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'tokenDetails',
    args: [BigInt(tokenId)],
  });

  const { data: mintCount } = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'mintCount',
    args: [BigInt(tokenId)],
  });

  const { data: burnedTokens } = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'getBurnedTokens',
    args: [BigInt(tokenId)],
  });

  const { data: symbol } = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'symbol',
    args: [],
  });

  const { data: timeLeft } = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'timeLeft',
    args: [BigInt(tokenId)],
  });

  console.log('mintCount', mintCount);
  console.log('burnedTokens', burnedTokens);
  console.log('symbol', symbol);
  console.log('timeLeft', timeLeft);

  const formatTimeLeft = (timeLeft: bigint) => {
    const seconds = Number(timeLeft) % 60;
    const minutes = Math.floor(Number(timeLeft) / 60) % 60;
    const hours = Math.floor(Number(timeLeft) / 3600) % 24;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateTimeRemaining = (
    startTime: bigint,
    initialTimeLeft: bigint
  ) => {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const elapsedTime = now - startTime;
    const remaining = initialTimeLeft - elapsedTime;
    return remaining > BigInt(0) ? remaining : BigInt(0);
  };

  useEffect(() => {
    if (data) {
      setStartTime(data[1]);
      fetch(data[2])
        .then((response) => response.json())
        .then((data) => {
          setToken(data);
        })
        .catch((error) => {
          console.error('Error fetching token:', error);
        });
    }
  }, [data]);

  useEffect(() => {
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      sdk.actions.ready();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    if (startTime && timeLeft) {
      // Calculate initial remaining time
      const remaining = calculateTimeRemaining(startTime, timeLeft);
      setFormattedTime(formatTimeLeft(remaining));

      const interval = setInterval(() => {
        const remaining = calculateTimeRemaining(startTime, timeLeft);

        setFormattedTime(formatTimeLeft(remaining));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, startTime]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  console.log('token', token);
  const creatorAddress = token?.attributes[0].creator;
  console.log('creatorAddress', creatorAddress);

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
            <span>✧ 300</span>
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
              {formattedTime}
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
              {Number(mintCount)}
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
              {Number(burnedTokens)} ${symbol}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="pr-1">Cult</span>

            <Image
              src={`/logos/${cultLogo(tokenContract)}`}
              alt="Cult"
              width={20}
              height={20}
            />
            <span className="flex">${symbol}</span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="pr-1">Creator</span>
            <Image
              src="/logos/pfp.png"
              alt="Higher"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="flex">@hurls</span>
          </div>
        </div>
      )}
      <Mint tokenContract={tokenContract} tokenId={tokenId} />
    </div>
  );
}
