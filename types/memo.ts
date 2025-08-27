import { ICharacter } from './shared';

/**
 * Memory Game Types
 */

export type MemoGamePhase = 'setup' | 'playing' | 'won';

export interface MemoCard {
  id: string;
  characterId: string;
  character: ICharacter;
  pairIndex: number; // 0 or 1 to identify which card in the pair
}

export interface MemoGameState {
  gamePhase: MemoGamePhase;
  selectedPairCount: number; // 2-12 pairs (4-24 cards)
  cards: MemoCard[];
  flippedCards: number[]; // indices of currently flipped cards (max 2)
  matchedCards: number[]; // indices of matched cards
  moves: number; // count of turn attempts
  startTime?: Date;
  loading: boolean;
  error: string | null;
}

export type MemoGameAction = 
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SELECT_PAIR_COUNT'; count: number }
  | { type: 'START_GAME'; cards: MemoCard[] }
  | { type: 'FLIP_CARD'; index: number }
  | { type: 'MATCH_FOUND'; indices: number[] }
  | { type: 'NO_MATCH' }
  | { type: 'INCREMENT_MOVES' }
  | { type: 'RESET_GAME' }
  | { type: 'GAME_WON' };

export interface MemoCardProps {
  card: MemoCard;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (index: number) => void;
  disabled: boolean;
}

export interface MemoGridProps {
  cards: MemoCard[];
  flippedCards: number[];
  matchedCards: number[];
  onCardClick: (index: number) => void;
  disabled: boolean;
}

export interface GameSetupProps {
  selectedPairCount: number;
  onPairCountChange: (count: number) => void;
  onStartGame: () => void;
  loading: boolean;
}

export interface GameStatusProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  startTime?: Date;
}

export interface MemoCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moves: number;
  totalPairs: number;
  gameTime?: number; // in seconds
  onNewGame: () => void;
}

// Grid layout configuration for different card counts
export interface GridLayout {
  cols: number;
  rows: number;
  maxCardSize: string;
  gap: string;
}

export const GRID_LAYOUTS: Record<number, GridLayout> = {
  4: { cols: 2, rows: 2, maxCardSize: '180px', gap: '1rem' },
  6: { cols: 3, rows: 2, maxCardSize: '160px', gap: '0.875rem' },
  8: { cols: 4, rows: 2, maxCardSize: '140px', gap: '0.75rem' },
  10: { cols: 5, rows: 2, maxCardSize: '120px', gap: '0.75rem' },
  12: { cols: 4, rows: 3, maxCardSize: '120px', gap: '0.5rem' },
  14: { cols: 7, rows: 2, maxCardSize: '100px', gap: '0.5rem' },
  16: { cols: 4, rows: 4, maxCardSize: '110px', gap: '0.5rem' },
  18: { cols: 6, rows: 3, maxCardSize: '100px', gap: '0.5rem' },
  20: { cols: 5, rows: 4, maxCardSize: '100px', gap: '0.5rem' },
  22: { cols: 6, rows: 4, maxCardSize: '90px', gap: '0.5rem' },
  24: { cols: 6, rows: 4, maxCardSize: '90px', gap: '0.5rem' }
};

// Pair count options for the setup screen - Kid-friendly simplified levels
export const PAIR_COUNT_OPTIONS = [
  { pairs: 2, cards: 4, difficulty: 'Très facile', emoji: '🌟' },
  { pairs: 3, cards: 6, difficulty: 'Facile', emoji: '😊' },
  { pairs: 4, cards: 8, difficulty: 'Moyen', emoji: '🎯' },
  { pairs: 5, cards: 10, difficulty: 'Difficile', emoji: '🚀' },
  { pairs: 6, cards: 12, difficulty: 'Très difficile', emoji: '🏆' },
  { pairs: 8, cards: 16, difficulty: 'Expert', emoji: '🌈' }
];