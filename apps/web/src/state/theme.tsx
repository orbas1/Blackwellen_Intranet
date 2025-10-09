import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { ThemeDefinition, ThemeId, defaultTheme, isThemeId, themeDefinitions, themeMap } from '../styles/themes';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  cycleTheme: () => void;
  themes: readonly ThemeDefinition[];
  buildTime: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'blackwellen:theme:v150';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const CONTRAST_QUERY = '(prefers-contrast: more)';

type ProviderProps = {
  children: React.ReactNode;
  value: {
    buildTime: string;
  };
};

function addMediaQueryListener(query: MediaQueryList, handler: () => void) {
  if (typeof query.addEventListener === 'function') {
    const listener = () => handler();
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }

  const legacyListener = () => handler();
  query.addListener(legacyListener);
  return () => query.removeListener(legacyListener);
}

export function ThemeProvider({ children, value }: ProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const hasExplicitChoice = useRef(false);

  const applyThemeTokens = useCallback((nextTheme: ThemeId) => {
    const definition = themeMap[nextTheme];
    if (!definition || typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = definition.id;
    root.style.colorScheme = definition.colorScheme;

    Object.entries(definition.tokens).forEach(([token, tokenValue]) => {
      root.style.setProperty(token, tokenValue);
    });

    if (definition.tokens['--surface-background']) {
      document.body.style.backgroundColor = definition.tokens['--surface-background'];
    }

    if (definition.tokens['--surface-foreground']) {
      document.body.style.color = definition.tokens['--surface-foreground'];
    }
  }, []);

  const persistTheme = useCallback((nextTheme: ThemeId) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    hasExplicitChoice.current = true;
  }, []);

  const selectTheme = useCallback((nextTheme: ThemeId, persist: boolean) => {
    setThemeState((current) => {
      if (current === nextTheme) {
        return current;
      }
      return nextTheme;
    });
    if (persist) {
      persistTheme(nextTheme);
    }
  }, [persistTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isThemeId(stored)) {
      hasExplicitChoice.current = true;
      setThemeState(stored);
      return;
    }

    const contrastQuery = window.matchMedia(CONTRAST_QUERY);
    if (contrastQuery.matches && themeMap['high-contrast']) {
      setThemeState('high-contrast');
      return;
    }

    const darkQuery = window.matchMedia(DARK_QUERY);
    if (darkQuery.matches) {
      setThemeState('dark');
    }
  }, []);

  useEffect(() => {
    applyThemeTokens(theme);
  }, [theme, applyThemeTokens]);

  useEffect(() => {
    if (typeof window === 'undefined' || hasExplicitChoice.current) {
      return;
    }

    const contrastQuery = window.matchMedia(CONTRAST_QUERY);
    const darkQuery = window.matchMedia(DARK_QUERY);

    const handleChange = () => {
      if (hasExplicitChoice.current) {
        return;
      }

      if (contrastQuery.matches && themeMap['high-contrast']) {
        setThemeState('high-contrast');
        return;
      }

      if (darkQuery.matches) {
        setThemeState('dark');
      } else {
        setThemeState(defaultTheme);
      }
    };

    const disposers = [addMediaQueryListener(contrastQuery, handleChange), addMediaQueryListener(darkQuery, handleChange)];

    return () => {
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  const setTheme = useCallback((nextTheme: ThemeId) => {
    selectTheme(nextTheme, true);
  }, [selectTheme]);

  const cycleTheme = useCallback(() => {
    const index = themeDefinitions.findIndex((definition) => definition.id === theme);
    const nextDefinition = themeDefinitions[(index + 1) % themeDefinitions.length];
    selectTheme(nextDefinition.id, true);
  }, [selectTheme, theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      cycleTheme,
      themes: themeDefinitions,
      buildTime: value.buildTime
    }),
    [cycleTheme, setTheme, theme, value.buildTime]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
