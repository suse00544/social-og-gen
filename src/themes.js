'use strict';

/**
 * Built-in theme definitions for social-og-gen.
 * Each theme provides CSS custom properties that the HTML template consumes.
 */

const themes = {
  'gradient-purple': {
    name: 'Gradient Purple',
    description: 'Rich purple-to-pink gradient with white text',
    vars: {
      '--bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      '--text-color': '#ffffff',
      '--subtitle-color': 'rgba(255, 255, 255, 0.85)',
      '--meta-color': 'rgba(255, 255, 255, 0.7)',
      '--accent-color': '#f093fb',
      '--card-bg': 'rgba(255, 255, 255, 0.08)',
      '--card-border': 'rgba(255, 255, 255, 0.15)',
    },
  },

  'gradient-blue': {
    name: 'Gradient Blue',
    description: 'Cool blue-to-cyan gradient, modern feel',
    vars: {
      '--bg': 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
      '--text-color': '#ffffff',
      '--subtitle-color': 'rgba(255, 255, 255, 0.85)',
      '--meta-color': 'rgba(255, 255, 255, 0.65)',
      '--accent-color': '#4fc3f7',
      '--card-bg': 'rgba(255, 255, 255, 0.06)',
      '--card-border': 'rgba(79, 195, 247, 0.3)',
    },
  },

  'dark-minimal': {
    name: 'Dark Minimal',
    description: 'Clean dark background with sharp white text',
    vars: {
      '--bg': 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
      '--text-color': '#f0f0f0',
      '--subtitle-color': 'rgba(240, 240, 240, 0.8)',
      '--meta-color': 'rgba(240, 240, 240, 0.55)',
      '--accent-color': '#e94560',
      '--card-bg': 'rgba(255, 255, 255, 0.04)',
      '--card-border': 'rgba(233, 69, 96, 0.3)',
    },
  },

  'light-clean': {
    name: 'Light Clean',
    description: 'Bright white background with dark text, minimal style',
    vars: {
      '--bg': 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
      '--text-color': '#1a1a1a',
      '--subtitle-color': 'rgba(26, 26, 26, 0.75)',
      '--meta-color': 'rgba(26, 26, 26, 0.5)',
      '--accent-color': '#6366f1',
      '--card-bg': 'rgba(0, 0, 0, 0.03)',
      '--card-border': 'rgba(99, 102, 241, 0.2)',
    },
  },

  sunset: {
    name: 'Sunset',
    description: 'Warm orange-to-red gradient evoking golden hour',
    vars: {
      '--bg': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
      '--text-color': '#ffffff',
      '--subtitle-color': 'rgba(255, 255, 255, 0.9)',
      '--meta-color': 'rgba(255, 255, 255, 0.75)',
      '--accent-color': '#fff176',
      '--card-bg': 'rgba(255, 255, 255, 0.1)',
      '--card-border': 'rgba(255, 241, 118, 0.3)',
    },
  },

  ocean: {
    name: 'Ocean',
    description: 'Deep sea blue-to-teal, calm and professional',
    vars: {
      '--bg': 'linear-gradient(135deg, #0d324d 0%, #7f5a83 30%, #a0d2db 100%)',
      '--text-color': '#ffffff',
      '--subtitle-color': 'rgba(255, 255, 255, 0.85)',
      '--meta-color': 'rgba(255, 255, 255, 0.65)',
      '--accent-color': '#a0d2db',
      '--card-bg': 'rgba(255, 255, 255, 0.07)',
      '--card-border': 'rgba(160, 210, 219, 0.3)',
    },
  },

  forest: {
    name: 'Forest',
    description: 'Natural green-to-emerald gradient, earthy tones',
    vars: {
      '--bg': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      '--text-color': '#ffffff',
      '--subtitle-color': 'rgba(255, 255, 255, 0.88)',
      '--meta-color': 'rgba(255, 255, 255, 0.68)',
      '--accent-color': '#a8e6cf',
      '--card-bg': 'rgba(255, 255, 255, 0.08)',
      '--card-border': 'rgba(168, 230, 207, 0.3)',
    },
  },

  midnight: {
    name: 'Midnight',
    description: 'Deep black with subtle blue shimmer, premium feel',
    vars: {
      '--bg': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d1b2a 100%)',
      '--text-color': '#e8e8e8',
      '--subtitle-color': 'rgba(232, 232, 232, 0.8)',
      '--meta-color': 'rgba(232, 232, 232, 0.5)',
      '--accent-color': '#818cf8',
      '--card-bg': 'rgba(129, 140, 248, 0.06)',
      '--card-border': 'rgba(129, 140, 248, 0.25)',
    },
  },

  neon: {
    name: 'Neon',
    description: 'Dark background with vibrant neon green accents, cyberpunk vibes',
    vars: {
      '--bg': 'linear-gradient(180deg, #0f0f0f 0%, #1a0a2e 100%)',
      '--text-color': '#00ff88',
      '--subtitle-color': 'rgba(0, 255, 136, 0.8)',
      '--meta-color': 'rgba(0, 255, 136, 0.55)',
      '--accent-color': '#00ff88',
      '--card-bg': 'rgba(0, 255, 136, 0.04)',
      '--card-border': 'rgba(0, 255, 136, 0.3)',
    },
  },

  rose: {
    name: 'Rosé',
    description: 'Soft pink-to-blush gradient, elegant and warm',
    vars: {
      '--bg': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
      '--text-color': '#2d1b1b',
      '--subtitle-color': 'rgba(45, 27, 27, 0.75)',
      '--meta-color': 'rgba(45, 27, 27, 0.5)',
      '--accent-color': '#e91e63',
      '--card-bg': 'rgba(233, 30, 99, 0.06)',
      '--card-border': 'rgba(233, 30, 99, 0.2)',
    },
  },
};

/**
 * Get a theme by name. Returns undefined if not found.
 */
function getTheme(name) {
  return themes[name];
}

/**
 * List all available theme names.
 */
function listThemes() {
  return Object.keys(themes);
}

/**
 * Get theme descriptions for help/display.
 */
function describeThemes() {
  return Object.entries(themes).map(([key, theme]) => ({
    key,
    name: theme.name,
    description: theme.description,
  }));
}

module.exports = { themes, getTheme, listThemes, describeThemes };
