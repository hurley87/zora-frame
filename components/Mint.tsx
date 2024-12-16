'use client';
import { useCallback, useState } from 'react';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { enjoyHigherABI } from '@/lib/enjoyHigher';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export default function Mint({
  tokenContract,
  tokenId,
}: {
  tokenContract: `0x${string}`;
  tokenId: string;
}) {
  const COST_PER_TOKEN = 111;
  const [mintAmount, setMintAmount] = useState(1);
  const [customMintAmount, setCustomMintAmount] = useState(false);
  const { isConnected } = useAccount();
  const {
    writeContract: mint,
    data: txHash,
    error: mintError,
    isPending: isMintPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const mintToken = useCallback(() => {
    if (!mint) return;
    mint({
      address: tokenContract,
      abi: enjoyHigherABI,
      functionName: 'mint',
      args: [BigInt(tokenId), BigInt(mintAmount)],
      value: BigInt(111000000000000),
    });
  }, [mint, tokenContract, tokenId]);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="w-full">Mint</Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 flex flex-col gap-4">
        <VisuallyHidden.Root>
          <DrawerTitle>Mint</DrawerTitle>
          <DrawerDescription>Mint a token</DrawerDescription>
        </VisuallyHidden.Root>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Mint</div>
          <DrawerClose>
            <div className="text-sm text-gray-500">
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </DrawerClose>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-2">
            <button
              className={`w-full border border-black rounded-full h-8 ${
                mintAmount === 1 ? 'bg-black text-white' : ''
              }`}
              onClick={() => {
                setMintAmount(1);
                setCustomMintAmount(false);
              }}
            >
              1
            </button>
            <button
              className={`w-full border border-black rounded-full h-8 ${
                mintAmount === 10 ? 'bg-black text-white' : ''
              }`}
              onClick={() => {
                setMintAmount(10);
                setCustomMintAmount(false);
              }}
            >
              10
            </button>
            <button
              className={`w-full border border-black rounded-full h-8 ${
                mintAmount === 100 ? 'bg-black text-white' : ''
              }`}
              onClick={() => {
                setMintAmount(100);
                setCustomMintAmount(false);
              }}
            >
              100
            </button>
            <button
              className={`w-full px-3 border border-black rounded-full h-8 ${
                customMintAmount ? 'bg-black text-white' : ''
              }`}
              onClick={() => {
                setMintAmount(1);
                setCustomMintAmount(true);
              }}
            >
              Custom
            </button>
          </div>
          {customMintAmount && (
            <div className="flex gap-2">
              <button
                className="w-full max-w-8 border border-black rounded-full h-8"
                onClick={() => setMintAmount(mintAmount - 1)}
              >
                -
              </button>
              <div className="w-full border border-black rounded-full h-8 flex items-center justify-center">
                {mintAmount}
              </div>
              <button
                className="w-full max-w-8 border border-black rounded-full h-8"
                onClick={() => setMintAmount(mintAmount + 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex justify-between">
              <span className="font-medium">Total Cost</span>
              <span>✧ {mintAmount * COST_PER_TOKEN}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span className="font-medium">↳ Creator (50%)</span>
              <span>✧ {(mintAmount * COST_PER_TOKEN * 0.5).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span className="font-medium">↳ $HIGHER Buy/Burn (45%)</span>
              <span>✧ {(mintAmount * COST_PER_TOKEN * 0.45).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span className="font-medium">↳ Enjoyr Protocol Fee (5%)</span>
              <span>✧ {(mintAmount * COST_PER_TOKEN * 0.05).toFixed(2)}</span>
            </div>
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={mintToken}
              disabled={!isConnected || isMintPending}
            >
              Mint
            </Button>
            {mintError && renderError(mintError)}
            {txHash && (
              <div className="mt-2 text-xs">
                <div>Hash: {txHash}</div>
                <div>
                  Status:{' '}
                  {isConfirming
                    ? 'Confirming...'
                    : isConfirmed
                    ? 'Confirmed!'
                    : 'Pending'}
                </div>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
