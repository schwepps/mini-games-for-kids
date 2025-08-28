import { ICharacter } from './shared';

/**
 * Jacques a dit Game Types
 */

export type JacquesGamePhase = 'setup' | 'ready' | 'showing' | 'waiting' | 'playing' | 'wrong' | 'won';

export interface JacquesDifficulty {
  id: string;
  name: string;
  emoji: string;
  characterCount: number; // How many characters to use (3-8)
  targetLength: number;   // Sequence length to win (5-10)
  showSpeed: number;      // ms per character show (1500-600ms)
  hideDelay: number;      // ms between character shows (500-200ms)
}

export interface JacquesGameState {
  gamePhase: JacquesGamePhase;
  selectedDifficulty: JacquesDifficulty | null;
  characters: ICharacter[]; // Selected subset of characters for the game
  fullSequence: string[];   // Complete game sequence (full target length)
  currentSequence: string[]; // Current round's subsequence (fullSequence.slice(0, currentRound))
  playerInput: string[];    // Player's current input sequence
  currentRound: number;     // Current sequence length (starts at 1)
  mistakes: number;         // Number of mistakes made (for star rating)
  showingIndex: number;     // Index of character currently showing (-1 if none)
  loading: boolean;
  error: string | null;
}

export type JacquesGameAction = 
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SELECT_DIFFICULTY'; difficulty: JacquesDifficulty }
  | { type: 'START_GAME'; characters: ICharacter[] }
  | { type: 'START_READY_PHASE' }
  | { type: 'START_SHOWING_PHASE' }
  | { type: 'SHOW_SEQUENCE'; showingIndex: number }
  | { type: 'SEQUENCE_SHOWN' }
  | { type: 'START_WAITING_PHASE' }
  | { type: 'START_PLAYING_PHASE' }
  | { type: 'PLAYER_INPUT'; characterId: string }
  | { type: 'ROUND_COMPLETE' }
  | { type: 'MISTAKE_MADE' }
  | { type: 'GAME_WON' }
  | { type: 'RESET_GAME' };

export interface CharacterButtonProps {
  character: ICharacter;
  isShowing: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  onClick: (characterId: string) => void;
  disabled: boolean;
}

export interface GameBoardProps {
  characters: ICharacter[];
  showingIndex: number;
  playerInput: string[];
  sequence: string[];
  gamePhase: JacquesGamePhase;
  onCharacterClick: (characterId: string) => void;
  disabled: boolean;
}

export interface GameSetupProps {
  selectedDifficulty: JacquesDifficulty | null;
  onDifficultyChange: (difficulty: JacquesDifficulty) => void;
  onStartGame: () => void;
  loading: boolean;
}

export interface SequenceDisplayProps {
  currentRound: number;
  targetLength: number;
  mistakes: number;
  gamePhase: JacquesGamePhase;
}

export interface JacquesCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRound: number;
  mistakes: number;
  difficultyName: string;
  onNewGame: () => void;
}

// Difficulty levels configuration
export const JACQUES_DIFFICULTIES: JacquesDifficulty[] = [
  {
    id: 'tres-facile',
    name: 'Très facile',
    emoji: '🌟',
    characterCount: 3,
    targetLength: 5,
    showSpeed: 1500,
    hideDelay: 500
  },
  {
    id: 'facile',
    name: 'Facile',
    emoji: '😊',
    characterCount: 4,
    targetLength: 6,
    showSpeed: 1200,
    hideDelay: 400
  },
  {
    id: 'moyen',
    name: 'Moyen',
    emoji: '🎯',
    characterCount: 5,
    targetLength: 7,
    showSpeed: 1000,
    hideDelay: 350
  },
  {
    id: 'difficile',
    name: 'Difficile',
    emoji: '🚀',
    characterCount: 6,
    targetLength: 8,
    showSpeed: 800,
    hideDelay: 300
  },
  {
    id: 'expert',
    name: 'Expert',
    emoji: '🏆',
    characterCount: 8,
    targetLength: 10,
    showSpeed: 600,
    hideDelay: 200
  }
];

// Grid layout configuration for different character counts
export interface GridLayout {
  cols: number;
  rows: number;
  maxCardSize: string;
  gap: string;
}

export const JACQUES_GRID_LAYOUTS: Record<number, GridLayout> = {
  3: { cols: 3, rows: 1, maxCardSize: '120px', gap: '1rem' },
  4: { cols: 2, rows: 2, maxCardSize: '140px', gap: '1rem' },
  5: { cols: 3, rows: 2, maxCardSize: '120px', gap: '0.875rem' },
  6: { cols: 3, rows: 2, maxCardSize: '110px', gap: '0.75rem' },
  8: { cols: 4, rows: 2, maxCardSize: '100px', gap: '0.75rem' }
};