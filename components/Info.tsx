'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import sdk from '@farcaster/frame-sdk';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

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
        <VisuallyHidden.Root>
          <DrawerTitle>Info</DrawerTitle>
          <DrawerDescription>Info</DrawerDescription>
        </VisuallyHidden.Root>
        <div className="flex justify-between items-center">
          <div className="text-xl">Info</div>
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
            Enjoyr is a Farcaster bot that turns tokens communities into cult
            content networks!!!
          </p>
          <p>
            ❗ Tag @enjoyr and include a $TICKER, image (JPG, PNG, GIF only),
            and a name for the image
          </p>
          <p>❗ Users must have a Neynar Score of .9 to interact with Enjoyr</p>
          <div className="flex flex-col gap-0.5">
            <p>❗ Sales from each mint are split:</p>
            <ul className="flex flex-col gap-0.5 list-disc list-inside pl-6">
              <li>
                <span>45% Buy/Burn Specified $TICKER</span>
              </li>
              <li>
                <span>50% Creator</span>
              </li>
              <li>
                <span>5% Enjoyr Protocol Fee</span>
              </li>
            </ul>
          </div>
          <p>
            Check out the{' '}
            <span
              onClick={() => sdk.actions.openUrl(`#`)}
              className="underline"
            >
              announcement cast
            </span>{' '}
            for an example and read the{' '}
            <span
              onClick={() => sdk.actions.openUrl(`#`)}
              className="underline"
            >
              blog
            </span>{' '}
            to learn more including supported cult tokens.
          </p>
          <p>
            Made with 🔵❗❗❗ by{' '}
            <span
              onClick={() => sdk.actions.openUrl(`https://x.com/enjoytech`)}
              className="underline"
            >
              Enjoy Tech.
            </span>
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
