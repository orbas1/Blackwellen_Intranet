import { DefaultTheme, DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { Appearance } from 'react-native';

import { useThemeStore } from './themeStore';
import { themeTokens } from './designTokens';

const lightTokens = themeTokens.light;
const darkTokens = themeTokens.dark;

const lightPalette = {
  primary: lightTokens.accentPrimary,
  background: lightTokens.surfaceBackground,
  card: lightTokens.surface,
  text: lightTokens.textPrimary,
  border: lightTokens.border,
  notification: lightTokens.status.warning
};

const darkPalette = {
  primary: darkTokens.accentPrimary,
  background: darkTokens.surfaceBackground,
  card: darkTokens.surface,
  text: darkTokens.textPrimary,
  border: darkTokens.border,
  notification: darkTokens.status.warning
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
    colors: lightPalette
  }),
  getCurrentMode: () => useThemeStore.getState().theme ?? systemPreference ?? 'light',
  getNavigationTheme: () =>
    useThemeStore.getState().theme === 'dark'
      ? buildNavigationTheme(DarkTheme, {
          dark: true,
          colors: darkPalette
        })
      : theme.navigation
};
