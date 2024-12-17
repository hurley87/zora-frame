import type { Metadata } from 'next';

import '@/app/globals.css';
import { Providers } from '@/app/providers';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Farcaster Frames v2 Demo',
  description: 'A Farcaster Frames v2 demo app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
