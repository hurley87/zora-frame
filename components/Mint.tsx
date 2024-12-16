'use client';
import { useCallback } from 'react';
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
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
export default function Mint({
  tokenContract,
  tokenId,
}: {
  tokenContract: `0x${string}`;
  tokenId: string;
}) {
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
      args: [BigInt(tokenId), BigInt(1)],
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
        <Button>Mint</Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 flex flex-col gap-4">
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
          <p>
            Enjoyr is a Farcaster bot that turns tokens on Base into cult
            content networks!!!
          </p>
          <p>
            ❗ Tag @enjoyr and include a $TICKER, image, and name for the image
            (JPG, PNG, GIF).
          </p>
          <p>
            ❗ Enjoyr creates a 6 hr open-edition 1155 in a contract dedicated
            to the specified $TICKER and replies with a frame to mint. Users
            must have a Neynar Score of .9 to interact with Enjoyr.
          </p>
          <p>
            ❗ Sales from each mint are split accordingly: 45% Buy/Burn,
            Specified $TICKER*, 50% Creator, 5% Enjoyr Protocol Fee.
          </p>
          <p>
            Check out the announcement cast for an example and read the blog to
            learn more including supported cult tokens.
          </p>
          <p>Made with 🔵❗❗❗ by Enjoy Tech.</p>
        </div>
        <DrawerFooter>
          <Button onClick={mintToken} disabled={!isConnected || isMintPending}>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
