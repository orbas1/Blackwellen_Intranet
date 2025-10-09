export type ThemeId = 'light' | 'dark' | 'twilight' | 'ember' | 'tide' | 'high-contrast';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  colorScheme: 'light' | 'dark';
  preview: readonly [string, string, string];
  tokens: Record<string, string>;
}

const auroraFocus = '#4A74EB';
const harbourSuccess = '#1D9A6C';
const warning = '#F5A524';
const danger = '#DB3A3A';
const info = '#2E90FA';

const baseLightTokens: Record<string, string> = {
  '--surface-background': '#F3F6FA',
  '--surface-color': '#FFFFFF',
  '--surface-foreground': '#1E2A38',
  '--surface-hover': 'rgba(45, 91, 227, 0.08)',
  '--sidebar-background': '#FFFFFF',
  '--sidebar-foreground': '#151920',
  '--sidebar-hover-background': 'rgba(45, 91, 227, 0.12)',
  '--accent': '#2D5BE3',
  '--accent-strong': '#2347B8',
  '--border': '#DFE4EE',
  '--border-subtle': 'rgba(21, 25, 32, 0.06)',
  '--muted': '#5A6473',
  '--text-muted': '#536074',
  '--badge-background': 'rgba(45, 91, 227, 0.12)',
  '--status-success': harbourSuccess,
  '--status-warning': warning,
  '--status-danger': danger,
  '--status-info': info,
  '--analytics-chart-primary': '#2D5BE3',
  '--analytics-chart-secondary': '#1F8A70',
  '--analytics-chart-alert': '#DB3A3A',
  '--focus-ring': auroraFocus,
  '--shadow-elevation': '0 12px 24px rgba(15, 18, 22, 0.12)'
};

const baseDarkTokens: Record<string, string> = {
  '--surface-background': '#121A24',
  '--surface-color': '#161F2B',
  '--surface-foreground': '#E6EDF6',
  '--surface-hover': 'rgba(230, 237, 246, 0.08)',
  '--sidebar-background': '#161F2B',
  '--sidebar-foreground': '#E6EDF6',
  '--sidebar-hover-background': 'rgba(122, 153, 244, 0.16)',
  '--accent': '#7A99F4',
  '--accent-strong': '#4A74EB',
  '--border': 'rgba(230, 237, 246, 0.18)',
  '--border-subtle': 'rgba(230, 237, 246, 0.1)',
  '--muted': '#C3CDD9',
  '--text-muted': '#9BA8B6',
  '--badge-background': 'rgba(122, 153, 244, 0.24)',
  '--status-success': '#6AC6A1',
  '--status-warning': '#FFC46D',
  '--status-danger': '#FF8BA0',
  '--status-info': '#6BB7FF',
  '--analytics-chart-primary': '#7A99F4',
  '--analytics-chart-secondary': '#36BBA0',
  '--analytics-chart-alert': '#FF8BA0',
  '--focus-ring': '#9CB6FF',
  '--shadow-elevation': '0 16px 32px rgba(0, 0, 0, 0.28)'
};

export const themeDefinitions: readonly ThemeDefinition[] = [
  {
    id: 'light',
    name: 'Aurora Light',
    description: 'Default palette anchored to Aurora blues with Granite neutrals for daytime environments.',
    colorScheme: 'light',
    preview: ['#2D5BE3', '#1F8A70', '#F3F6FA'],
    tokens: baseLightTokens
  },
  {
    id: 'dark',
    name: 'Midnight Dark',
    description: 'Dark interface balancing luminous accents and elevated surfaces for low-light usage.',
    colorScheme: 'dark',
    preview: ['#7A99F4', '#36BBA0', '#121A24'],
    tokens: baseDarkTokens
  },
  {
    id: 'twilight',
    name: 'Twilight Campaign',
    description: 'Emo variant with electric violet accents for culture and engagement campaigns.',
    colorScheme: 'dark',
    preview: ['#6B4EFF', '#3BD3F5', '#140F1F'],
    tokens: {
      ...baseDarkTokens,
      '--surface-background': '#140F1F',
      '--surface-color': '#1D152B',
      '--surface-foreground': '#F5EFFF',
      '--surface-hover': 'rgba(245, 239, 255, 0.08)',
      '--sidebar-background': '#1D152B',
      '--sidebar-foreground': '#F5EFFF',
      '--sidebar-hover-background': 'rgba(107, 78, 255, 0.22)',
      '--accent': '#6B4EFF',
      '--accent-strong': '#4B33CC',
      '--border': 'rgba(245, 239, 255, 0.22)',
      '--border-subtle': 'rgba(245, 239, 255, 0.12)',
      '--muted': 'rgba(245, 239, 255, 0.72)',
      '--text-muted': 'rgba(245, 239, 255, 0.68)',
      '--badge-background': 'rgba(107, 78, 255, 0.24)',
      '--status-success': '#5FD4B1',
      '--status-warning': '#FFC36D',
      '--status-danger': '#FF7A9C',
      '--status-info': '#6BB7FF',
      '--analytics-chart-primary': '#6B4EFF',
      '--analytics-chart-secondary': '#3BD3F5',
      '--analytics-chart-alert': '#FF7A9C',
      '--focus-ring': '#3BD3F5',
      '--shadow-elevation': '0 22px 48px rgba(7, 3, 14, 0.42)'
    }
  },
  {
    id: 'ember',
    name: 'Ember Campaign',
    description: 'Warm emo palette for recognition drives and wellbeing activations.',
    colorScheme: 'dark',
    preview: ['#FF5E7E', '#FFC36D', '#1B1014'],
    tokens: {
      ...baseDarkTokens,
      '--surface-background': '#1B1014',
      '--surface-color': '#25141B',
      '--surface-foreground': '#FFEFF3',
      '--surface-hover': 'rgba(255, 239, 243, 0.08)',
      '--sidebar-background': '#25141B',
      '--sidebar-foreground': '#FFEFF3',
      '--sidebar-hover-background': 'rgba(255, 94, 126, 0.22)',
      '--accent': '#FF5E7E',
      '--accent-strong': '#E04163',
      '--border': 'rgba(255, 239, 243, 0.22)',
      '--border-subtle': 'rgba(255, 239, 243, 0.14)',
      '--muted': 'rgba(255, 239, 243, 0.75)',
      '--text-muted': 'rgba(255, 239, 243, 0.7)',
      '--badge-background': 'rgba(255, 94, 126, 0.22)',
      '--status-success': '#6FD5B7',
      '--status-warning': '#FFD47A',
      '--status-danger': '#FF8FA7',
      '--status-info': '#7DC3FF',
      '--analytics-chart-primary': '#FF5E7E',
      '--analytics-chart-secondary': '#FFC36D',
      '--analytics-chart-alert': '#FF8FA7',
      '--focus-ring': '#FFC36D',
      '--shadow-elevation': '0 22px 48px rgba(12, 2, 6, 0.46)'
    }
  },
  {
    id: 'tide',
    name: 'Tide Campaign',
    description: 'Vibrant teal and aqua blend for sustainability or operations spotlights.',
    colorScheme: 'light',
    preview: ['#3BD3F5', '#1F8A70', '#EBF9FB'],
    tokens: {
      ...baseLightTokens,
      '--surface-background': '#EBF9FB',
      '--surface-color': '#FFFFFF',
      '--surface-foreground': '#0F2B32',
      '--surface-hover': 'rgba(31, 138, 112, 0.12)',
      '--sidebar-background': '#FFFFFF',
      '--sidebar-foreground': '#0F2B32',
      '--sidebar-hover-background': 'rgba(59, 211, 245, 0.18)',
      '--accent': '#3BD3F5',
      '--accent-strong': '#1F8A70',
      '--border': '#A8DCE4',
      '--border-subtle': 'rgba(15, 43, 50, 0.08)',
      '--muted': '#2C5E68',
      '--text-muted': '#3C7280',
      '--badge-background': 'rgba(59, 211, 245, 0.18)',
      '--status-success': '#2EB391',
      '--status-warning': '#F5A524',
      '--status-danger': '#E06363',
      '--status-info': '#1E90D6',
      '--analytics-chart-primary': '#3BD3F5',
      '--analytics-chart-secondary': '#1F8A70',
      '--analytics-chart-alert': '#E06363',
      '--focus-ring': '#1F8A70',
      '--shadow-elevation': '0 16px 32px rgba(4, 38, 44, 0.16)'
    }
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'WCAG AAA compliant high-contrast mode for low-vision accessibility needs.',
    colorScheme: 'dark',
    preview: ['#FFFFFF', '#000000', '#2D5BE3'],
    tokens: {
      '--surface-background': '#000000',
      '--surface-color': '#000000',
      '--surface-foreground': '#FFFFFF',
      '--surface-hover': 'rgba(255, 255, 255, 0.12)',
      '--sidebar-background': '#000000',
      '--sidebar-foreground': '#FFFFFF',
      '--sidebar-hover-background': '#1A1A1A',
      '--accent': '#2D5BE3',
      '--accent-strong': '#FFFFFF',
      '--border': '#FFFFFF',
      '--border-subtle': '#B8C2D3',
      '--muted': '#FFFFFF',
      '--text-muted': '#FFFFFF',
      '--badge-background': '#2D5BE3',
      '--status-success': '#00FF87',
      '--status-warning': '#FFD400',
      '--status-danger': '#FF4D4D',
      '--status-info': '#4DB3FF',
      '--analytics-chart-primary': '#2D5BE3',
      '--analytics-chart-secondary': '#00E5B0',
      '--analytics-chart-alert': '#FF4D4D',
      '--focus-ring': '#FFFFFF',
      '--shadow-elevation': '0 0 0 rgba(0, 0, 0, 0)'
    }
  }
];

export const themeMap: Record<ThemeId, ThemeDefinition> = themeDefinitions.reduce(
  (acc, theme) => {
    acc[theme.id] = theme;
    return acc;
  },
  {} as Record<ThemeId, ThemeDefinition>
);

export const defaultTheme: ThemeId = 'light';

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && value in themeMap;
}
