import { useMemo } from 'react';

import { getThemeTokens } from '../theme/designTokens';
import { useThemeStore } from '../theme/themeStore';

export function useThemeTokens() {
  const mode = useThemeStore((state) => state.theme);
  return useMemo(() => getThemeTokens(mode), [mode]);
}
