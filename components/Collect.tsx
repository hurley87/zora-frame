'use client';
import { useCallback, useEffect, useState } from 'react';
import sdk, { type FrameContext } from '@farcaster/frame-sdk';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import { config } from '@/components/providers/WagmiProvider';
import { enjoyHigherABI } from '@/lib/enjoyHigher';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function Collect({
  tokenContract,
  tokenId,
}: {
  tokenContract: `0x${string}`;
  tokenId: string;
}) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  const result = useReadContract({
    address: tokenContract,
    abi: enjoyHigherABI,
    functionName: 'uri',
    args: [BigInt(tokenId)],
  });

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

  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  console.log('status', result.status);
  console.log('result', result.data);
  const uri = result.data;

  useEffect(() => {
    const fetchToken = async () => {
      if (!uri) return;
      const response = await fetch(uri);
      const data = await response.json();
      setToken(data);
    };
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      fetchToken();
    }
  }, [isSDKLoaded, uri]);

  const mintToken = useCallback(() => {
    if (!mint) return;
    mint({
      address: tokenContract,
      abi: enjoyHigherABI,
      functionName: 'mint',
      args: [BigInt(tokenId), BigInt(1)],
      value: BigInt(111000000000000),
    });
  }, [mint]);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  };

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  const toggleContext = () => {
    setIsContextOpen(!isContextOpen);
  };

  const openURL = () => {
    sdk.actions.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const close = () => {
    sdk.actions.close();
  };

  console.log('token', token);

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <div className="mb-4">
        {isContextOpen && (
          <div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
              {JSON.stringify(context, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <button
        onClick={openURL}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Open UR
      </button>
      <button
        onClick={close}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Close
      </button>
      {address && (
        <div className="my-2 text-xs">
          Address: <pre className="inline">{address}</pre>
        </div>
      )}
      <div className="mb-4">
        <button
          onClick={() =>
            isConnected
              ? disconnect()
              : connect({ connector: config?.connectors[0] })
          }
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
      {isConnected && (
        <>
          <div className="mb-4">
            <Drawer>
              <DrawerTrigger>
                <Button>Mint</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    <Button
                      onClick={mintToken}
                      disabled={!isConnected || isMintPending}
                    >
                      Mint Token
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
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </>
      )}
    </div>
  );
}
