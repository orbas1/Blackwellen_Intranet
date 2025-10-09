import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';

import { ThemeProvider } from '../state/theme';
import { PreferenceProvider } from '../state/preferences';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  const value = useMemo(() => ({
    buildTime: __BUILD_TIME__
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <PreferenceProvider>
        <ThemeProvider value={value}>{children}</ThemeProvider>
      </PreferenceProvider>
    </QueryClientProvider>
  );
}
