import Constants from 'expo-constants';
import { useEffect } from 'react';
import { Appearance } from 'react-native';

import { useThemeStore } from '../theme/themeStore';

export function useHydrateTheme() {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme === 'dark' || colorScheme === 'light') {
        setTheme(colorScheme);
      }
    });

    const scheme = Appearance.getColorScheme();
    if (scheme === 'dark' || scheme === 'light') {
      setTheme(scheme);
    }

    const release = Constants.expoConfig?.version ?? '0.0.0';
    console.log(`Bootstrapping Blackwellen Intranet Mobile ${release}`);

    return () => {
      subscription.remove();
    };
  }, [setTheme]);
}
