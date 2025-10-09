import { NavigationContainer } from '@react-navigation/native';
import { focusManager, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './navigation/AppNavigator';
import { useHydrateTheme } from './hooks/useHydrateTheme';
import { theme } from './theme/theme';
import { useThemeStore } from './theme/themeStore';

export default function App() {
  useHydrateTheme();
  const mode = useThemeStore((state) => state.theme);
  const navigationTheme = useMemo(() => (mode === 'dark' ? theme.getNavigationTheme() : theme.navigation), [mode]);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
          }
        }
      })
  );
  const [persister] = useState(() => createAsyncStoragePersister({ storage: AsyncStorage, key: 'blackwellen-query-cache' }));

  useEffect(() => {
    const listener = (state: AppStateStatus) => {
      focusManager.setFocused(state === 'active');
    };

    const subscription = AppState.addEventListener('change', listener);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
          <AppNavigator />
        </NavigationContainer>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
