'use client';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { showBanner } from './banner';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => showBanner(), []);

  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class">
        <ToastProvider />
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
