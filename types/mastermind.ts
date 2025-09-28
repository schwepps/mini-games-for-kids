import { ICharacter } from './shared';

/**
 * Mastermind Game Types
 */

export type MastermindGamePhase = 'setup' | 'playing' | 'won' | 'lost';

export type FeedbackPegType = 'correct-position' | 'correct-character' | 'none';

export interface DifficultyLevel {
  id: string;
  level: string;
  codeLength: number;
  maxAttempts: number;
  allowDuplicates: boolean;
  characterCount: number; // How many different characters to use
  emoji: string;
  description: string;
}

export interface FeedbackPeg {
  type: FeedbackPegType;
  emoji: string; // ⭐ for correct position, 💖 for correct character
}

export interface Guess {
  id: string;
  combination: (ICharacter | null)[];
  feedback: FeedbackPeg[];
  positionalFeedback?: ('correct-position' | 'correct-character' | 'wrong' | null)[];
  attemptNumber: number;
  timestamp: Date;
}

export interface MastermindGameState {
  gamePhase: MastermindGamePhase;
  difficulty: DifficultyLevel | null;
  secretCode: ICharacter[];
  availableCharacters: ICharacter[];
  guesses: Guess[];
  currentGuess: (ICharacter | null)[];
  selectedSlotIndex: number | null;
  attemptsRemaining: number;
  startTime?: Date;
  endTime?: Date;
  showHelp: boolean;
  loading: boolean;
  error: string | null;
}

export type MastermindGameAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SELECT_DIFFICULTY'; difficulty: DifficultyLevel }
  | { type: 'START_GAME'; secretCode: ICharacter[]; availableCharacters: ICharacter[] }
  | { type: 'SELECT_SLOT'; index: number }
  | { type: 'PLACE_CHARACTER'; character: ICharacter; slotIndex?: number }
  | { type: 'REMOVE_CHARACTER'; slotIndex: number }
  | { type: 'CLEAR_CURRENT_GUESS' }
  | { type: 'SUBMIT_GUESS'; feedback: FeedbackPeg[]; positionalFeedback: ('correct-position' | 'correct-character' | 'wrong' | null)[] }
  | { type: 'TOGGLE_HELP' }
  | { type: 'GAME_WON' }
  | { type: 'GAME_LOST' }
  | { type: 'RESET_GAME' }
  | { type: 'BACK_TO_SETUP' };

// Component Props Interfaces
export interface MastermindGameProps {
  // Main game component props (if needed)
}

export interface GameSetupProps {
  selectedDifficulty: DifficultyLevel | null;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  onStartGame: () => void;
  loading: boolean;
}

export interface GameBoardProps {
  secretCode: ICharacter[];
  guesses: Guess[];
  currentGuess: (ICharacter | null)[];
  selectedSlotIndex: number | null;
  attemptsRemaining: number;
  maxAttempts: number;
  codeLength: number;
  onSlotSelect: (index: number) => void;
  onCharacterPlace: (character: ICharacter, slotIndex?: number) => void;
  onCharacterRemove: (slotIndex: number) => void;
  onSubmitGuess: () => void;
  onClearGuess: () => void;
  gamePhase: MastermindGamePhase;
  availableCharacters: ICharacter[];
  canSubmitGuess: boolean;
}

export interface CharacterSelectorProps {
  availableCharacters: ICharacter[];
  selectedSlotIndex: number | null;
  currentGuess: (ICharacter | null)[];
  onCharacterSelect: (character: ICharacter) => void;
  disabled: boolean;
}

export interface FeedbackDisplayProps {
  feedback: FeedbackPeg[];
  codeLength: number;
}

export interface GuessRowProps {
  guess: Guess | null;
  currentGuess?: (ICharacter | null)[];
  isActive: boolean;
  attemptNumber: number;
  codeLength: number;
  selectedSlotIndex?: number | null;
  onSlotClick?: (index: number) => void;
  onCharacterRemove?: (slotIndex: number) => void;
}

export interface HistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guesses: Guess[];
}

export interface MastermindCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attempts: number;
  maxAttempts: number;
  gameTime?: number; // in seconds
  difficulty: DifficultyLevel;
  onNewGame: () => void;
  onChangeDifficulty: () => void;
}

// Difficulty configurations
export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    id: 'very-easy',
    level: 'Très facile',
    codeLength: 3,
    maxAttempts: 10,
    allowDuplicates: false,
    characterCount: 6,
    emoji: '🌟',
    description: '3 personnages, 10 essais'
  },
  {
    id: 'easy',
    level: 'Facile',
    codeLength: 4,
    maxAttempts: 10,
    allowDuplicates: false,
    characterCount: 6,
    emoji: '😊',
    description: '4 personnages, 10 essais'
  },
  {
    id: 'medium',
    level: 'Moyen',
    codeLength: 4,
    maxAttempts: 8,
    allowDuplicates: false,
    characterCount: 8,
    emoji: '🎯',
    description: '4 personnages, 8 essais'
  },
  {
    id: 'hard',
    level: 'Difficile',
    codeLength: 4,
    maxAttempts: 8,
    allowDuplicates: true,
    characterCount: 6,
    emoji: '🚀',
    description: '4 personnages (doublons), 8 essais'
  },
  {
    id: 'expert',
    level: 'Expert',
    codeLength: 5,
    maxAttempts: 10,
    allowDuplicates: true,
    characterCount: 8,
    emoji: '🏆',
    description: '5 personnages (doublons), 10 essais'
  }
];

// Helper constants
export const FEEDBACK_SYMBOLS = {
  CORRECT_POSITION: '⭐',
  CORRECT_CHARACTER: '💖',
  NONE: '❌'
} as const;

