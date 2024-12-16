'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function Info() {
  return (
    <Drawer>
      <DrawerTrigger>
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
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Info</div>
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
          <p className="text-xs opacity-50">
            *Until $ENJOY is on Base (eta Q1 2025), fees dedicated to $ENJOY
            will be manually bridged from Zora to Base and used to buy/burn.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
