import { DefaultTheme, DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { Appearance } from 'react-native';

import { useThemeStore } from './themeStore';

const palette = {
  primary: '#366fff',
  background: '#f7f8fb',
  card: '#ffffff',
  text: '#141824',
  border: '#dfe3f0',
  notification: '#ff7d54'
};

function buildNavigationTheme(base: NavigationTheme, overrides: Partial<NavigationTheme>): NavigationTheme {
  return {
    ...base,
    colors: {
      ...base.colors,
      ...overrides.colors
    }
  };
}

const systemPreference = Appearance.getColorScheme();

export const theme = {
  navigation: buildNavigationTheme(DefaultTheme, {
    dark: false,
    colors: {
      primary: palette.primary,
      background: palette.background,
      card: palette.card,
      text: palette.text,
      border: palette.border,
      notification: palette.notification
    }
  }),
  getCurrentMode: () => useThemeStore.getState().theme ?? systemPreference ?? 'light',
  getNavigationTheme: () =>
    useThemeStore.getState().theme === 'dark'
      ? buildNavigationTheme(DarkTheme, {
          dark: true,
          colors: {
            primary: palette.primary
          }
        })
      : theme.navigation
};
