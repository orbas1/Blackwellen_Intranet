import { Theme } from './themeStore';

export interface ThemeTokens {
  surfaceBackground: string;
  surface: string;
  surfaceSubtle: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnAccent: string;
  accentPrimary: string;
  accentStrong: string;
  status: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  statusBackground: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  analyticsStatus: {
    exceeding: string;
    onTrack: string;
    watch: string;
    atRisk: string;
  };
  alertBackground: {
    critical: string;
    high: string;
    medium: string;
    low: string;
  };
  tileBackground: string;
  raisedCardShadow: string;
}

export const themeTokens: Record<Theme, ThemeTokens> = {
  light: {
    surfaceBackground: '#F3F6FA',
    surface: '#FFFFFF',
    surfaceSubtle: '#EEF1F8',
    border: '#DFE4EE',
    borderSubtle: 'rgba(21, 25, 32, 0.08)',
    textPrimary: '#1E2A38',
    textSecondary: '#536074',
    textMuted: '#4B5162',
    textOnAccent: '#FFFFFF',
    accentPrimary: '#2D5BE3',
    accentStrong: '#2347B8',
    status: {
      success: '#1D9A6C',
      warning: '#F5A524',
      danger: '#DB3A3A',
      info: '#2E90FA'
    },
    statusBackground: {
      success: 'rgba(29, 154, 108, 0.12)',
      warning: 'rgba(245, 165, 36, 0.16)',
      danger: 'rgba(219, 58, 58, 0.16)',
      info: 'rgba(46, 144, 250, 0.16)'
    },
    analyticsStatus: {
      exceeding: '#1D9A6C',
      onTrack: '#2D5BE3',
      watch: '#F5A524',
      atRisk: '#DB3A3A'
    },
    alertBackground: {
      critical: '#FDECEA',
      high: '#FFF4E5',
      medium: '#E8F0FE',
      low: '#EDF5F1'
    },
    tileBackground: '#F6F8FC',
    raisedCardShadow: 'rgba(15, 18, 22, 0.08)'
  },
  dark: {
    surfaceBackground: '#121A24',
    surface: '#161F2B',
    surfaceSubtle: '#1F2937',
    border: 'rgba(230, 237, 246, 0.18)',
    borderSubtle: 'rgba(230, 237, 246, 0.1)',
    textPrimary: '#E6EDF6',
    textSecondary: '#9BA8B6',
    textMuted: '#C3CDD9',
    textOnAccent: '#161F2B',
    accentPrimary: '#7A99F4',
    accentStrong: '#4A74EB',
    status: {
      success: '#6AC6A1',
      warning: '#FFC46D',
      danger: '#FF8BA0',
      info: '#6BB7FF'
    },
    statusBackground: {
      success: 'rgba(106, 198, 161, 0.2)',
      warning: 'rgba(255, 196, 109, 0.22)',
      danger: 'rgba(255, 139, 160, 0.22)',
      info: 'rgba(107, 183, 255, 0.22)'
    },
    analyticsStatus: {
      exceeding: '#6AC6A1',
      onTrack: '#7A99F4',
      watch: '#FFC46D',
      atRisk: '#FF8BA0'
    },
    alertBackground: {
      critical: 'rgba(255, 139, 160, 0.24)',
      high: 'rgba(255, 196, 109, 0.2)',
      medium: 'rgba(122, 153, 244, 0.16)',
      low: 'rgba(54, 187, 160, 0.16)'
    },
    tileBackground: '#1F2A3A',
    raisedCardShadow: 'rgba(0, 0, 0, 0.4)'
  }
};

export function getThemeTokens(theme: Theme): ThemeTokens {
  return themeTokens[theme];
}
