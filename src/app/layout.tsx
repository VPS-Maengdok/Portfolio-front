import type { Metadata } from 'next';
import ClientLayout from './clientLayout';
import './globals.css';
import { Providers } from './providers';

const SITE_URL = 'https://maengdok.fr';
const TITLE =
  'Axel Baldocchi — Développeur full stack (Symfony, NestJS, React) · Paris';
const DESCRIPTION =
  'Axel Baldocchi, développeur full stack à Paris (Symfony, NestJS, React, TypeScript), disponible en CDI ou en freelance.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Axel Baldocchi',
  alternateName: 'Maengdok',
  jobTitle: 'Développeur full stack',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Paris',
    addressCountry: 'FR',
  },
  url: SITE_URL,
  sameAs: [
    'https://github.com/Maengdok',
    'https://www.linkedin.com/in/axel-baldocchi/',
  ],
  knowsAbout: [
    'Symfony',
    'PHP',
    'NestJS',
    'TypeScript',
    'React',
    'Next.js',
    'Docker',
    'PostgreSQL',
  ],
  knowsLanguage: ['fr', 'en', 'ko'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
