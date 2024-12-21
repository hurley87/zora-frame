import type { Metadata } from 'next';

import '@/app/globals.css';
import { Providers } from '@/app/zoraproviders';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Enjoyr',
  description: 'A Enjoyr app',
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
