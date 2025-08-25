/**
 * Shared Game Constants
 * Common values used across different games to maintain consistency
 */

// Performance rating thresholds (percentages)
export const PERFORMANCE_THRESHOLDS = {
  EXCELLENT: 90,
  VERY_GOOD: 75,
  GOOD: 60,
  OKAY: 40
} as const;

// Performance ratings with visual elements
export const PERFORMANCE_RATINGS = {
  EXCELLENT: { rating: 'Parfait !', emoji: '🌟', color: 'text-yellow-500' },
  VERY_GOOD: { rating: 'Excellent !', emoji: '🏆', color: 'text-yellow-600' },
  GOOD: { rating: 'Très bien !', emoji: '🎯', color: 'text-blue-500' },
  OKAY: { rating: 'Bien joué !', emoji: '👏', color: 'text-green-500' },
  DEFAULT: { rating: 'Bravo !', emoji: '🎉', color: 'text-purple-500' }
} as const;

// Animation durations (milliseconds)
export const ANIMATION_DURATIONS = {
  MODAL_DELAY: 300,
  CONFETTI_DURATION: 5000,
  CARD_FLIP: 600,
  CELEBRATION_ENTRY: 500,
  STAR_ANIMATION_DELAY: 100,
  // Common component animations
  FADE_IN: 500,
  SLIDE_IN: 300,
  QUICK_TRANSITION: 200,
  MEDIUM_TRANSITION: 400,
  SLOW_TRANSITION: 600,
  HOVER_TRANSITION: 200,
  // Loading and infinite animations
  SPIN_ROTATION: 2000,
  PULSE_ANIMATION: 1500,
  BOUNCE_ANIMATION: 1800
} as const;

// Kid-friendly color schemes
export const GAME_COLORS = {
  CONFETTI: ['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD', '#F0E68C'],
  GRADIENTS: {
    CELEBRATION: 'from-yellow-100 via-pink-100 to-purple-100',
    BACKGROUND: 'from-blue-400 via-purple-400 to-pink-400',
    BUTTON: 'from-green-400 via-blue-400 to-purple-400'
  }
} as const;

// Common French game text patterns
export const GAME_TEXT = {
  CELEBRATION: {
    TITLE: 'Félicitations ! 🎉',
    SUBTITLE: 'Tu as réussi !',
    NEW_GAME: 'Rejouer !',
    CLOSE_HINT: 'Ou ferme cette fenêtre pour changer de difficulté'
  },
  ENCOURAGEMENT: {
    PERFECT: 'Performance exceptionnelle ! 🌟',
    EXCELLENT: 'Très bonne performance ! 👏',
    GOOD: 'Continue, tu progresses ! 💪',
    OKAY: 'N\'abandonne pas ! 🎯',
    DEFAULT: 'Chaque essai t\'améliore ! 🚀'
  }
} as const;

// Game state constants
export const GAME_STATES = {
  SETUP: 'setup',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost'
} as const;

// Common timing values for game mechanics
export const GAME_TIMING = {
  CARD_MATCH_DELAY: 500,
  CARD_MISMATCH_DELAY: 1500,
  MODAL_CLOSE_DELAY: 300,
  ANIMATION_STAGGER: 100
} as const;

// Spring animation constants for consistent motion
export const SPRING_CONFIGS = {
  GENTLE: { stiffness: 100, damping: 15 },
  MEDIUM: { stiffness: 200, damping: 20 },
  BOUNCY: { stiffness: 300, damping: 15 },
  STIFF: { stiffness: 500, damping: 30 },
  // Common delay values
  DELAYS: {
    SHORT: 0.1,
    MEDIUM: 0.2,
    LONG: 0.5,
    STAGGER_BASE: 0.1
  }
} as const;

// Performance calculation helpers
export const PERFORMANCE_HELPERS = {
  /**
   * Calculate efficiency percentage for guess who game
   */
  calculateGuessWhoEfficiency: (questionsAsked: number): number => {
    if (questionsAsked <= 3) return 100;
    if (questionsAsked <= 6) return 80;
    if (questionsAsked <= 10) return 60;
    return 40;
  },

  /**
   * Calculate efficiency percentage for memo game
   */
  calculateMemoEfficiency: (moves: number, totalPairs: number): number => {
    const idealMoves = totalPairs; // Perfect game = one try per pair
    return moves > 0 ? Math.round((idealMoves / moves) * 100) : 100;
  },

  /**
   * Get performance rating based on efficiency percentage
   */
  getPerformanceRating: (efficiency: number) => {
    if (efficiency >= PERFORMANCE_THRESHOLDS.EXCELLENT) return PERFORMANCE_RATINGS.EXCELLENT;
    if (efficiency >= PERFORMANCE_THRESHOLDS.VERY_GOOD) return PERFORMANCE_RATINGS.VERY_GOOD;
    if (efficiency >= PERFORMANCE_THRESHOLDS.GOOD) return PERFORMANCE_RATINGS.GOOD;
    if (efficiency >= PERFORMANCE_THRESHOLDS.OKAY) return PERFORMANCE_RATINGS.OKAY;
    return PERFORMANCE_RATINGS.DEFAULT;
  },

  /**
   * Get star rating (1-5 stars) based on efficiency
   */
  getStarRating: (efficiency: number): number => {
    return Math.min(Math.ceil(efficiency / 20), 5);
  }
} as const;

// Mahjong-specific layout constants
export const MAHJONG_LAYOUT = {
  TILE_SPACING: 4,  // Pixel spacing between tiles (increased from 2px for better visual appeal)
  LAYER_OFFSET: 10  // Pixel offset per layer for 3D effect
} as const;