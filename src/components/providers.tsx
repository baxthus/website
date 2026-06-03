import { QueryProvider } from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
