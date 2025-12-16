import type { Metadata } from 'next';
import { Providers } from './providers';
import ClientLayout from './clientLayout';

import './globals.css';

export const metadata: Metadata = {
  title: 'Maengdok',
  description:
    'Maengdok - French Full Stack developer available for job opportunities in Paris and Asia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
