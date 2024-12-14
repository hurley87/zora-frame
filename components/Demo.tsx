import { useCallback, useEffect, useState } from 'react';
import sdk, { type FrameContext } from '@farcaster/frame-sdk';
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '@/components/providers/WagmiProvider';
import { enjoyHigherABI, enjoyHigherAddress } from '@/lib/enjoyHigher';

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { writeContract: mint, data: txHash, error: mintError, isPending: isMintPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  
  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const mintToken = useCallback(() => {
    if (!mint) return;
    mint({
      address: enjoyHigherAddress,
      abi: enjoyHigherABI,
      functionName: 'mint',
      args: [BigInt(2), BigInt(1)],
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


  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">Frames v2 Demo</h1>

      <div className="mb-4">
        <h2 className="font-2xl font-bold">Context</h2>
        <button
          onClick={toggleContext}
          className="flex items-center gap-2 transition-colors"
        >
          <span
            className={`transform transition-transform ${
              isContextOpen ? 'rotate-90' : ''
            }`}
          >
            ➤
          </span>
          Tap to expand
        </button>

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
              <button
                onClick={mintToken}
                disabled={!isConnected || isMintPending}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Mint Token
              </button>
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
          </>
        )} 
    </div>
  );
}