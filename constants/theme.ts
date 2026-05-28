export const theme = {
  colors: {
    background: ['#1a1a2e', '#16213e', '#0f3460'] as const,
    primary: '#4da6ff',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.70)',
      muted: 'rgba(255, 255, 255, 0.45)',
    },
    cardGlass: 'rgba(255, 255, 255, 0.10)',
    borderGlass: 'rgba(255, 255, 255, 0.20)',
    error: '#ff6b8a',
    errorBg: 'rgba(255, 107, 138, 0.12)',
  },

  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  shadow: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.30,
      shadowRadius: 20,
      elevation: 10,
    },
  },
};

export type Theme = typeof theme;