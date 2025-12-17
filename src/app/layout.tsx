import type { Metadata } from 'next';
import ClientLayout from './clientLayout';
import './globals.css';
import { Providers } from './providers';

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
