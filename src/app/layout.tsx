import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Footer from '@/components/Footer';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
});

const title = 'baxthus';
const description = 'BREATHE SMOKE WHERE THE AIR IS FRESH';
const url = 'https://baxt.fun';
const favicon = `${url}/favicon.webp`;

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: favicon,
  },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    images: [favicon],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [favicon],
    creator: '@baxthus',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.className} flex flex-col items-center p-4 antialiased`}
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
