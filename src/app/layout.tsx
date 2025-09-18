import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
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
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
