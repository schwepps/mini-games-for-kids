import { ICharacter } from './shared';

// Difficulty levels for the game
export const DIFFICULTY_LEVELS = {
  SUPER_FACILE: {
    id: 'super-facile',
    name: 'Super Facile',
    characterCount: 2,
    emoji: '🌟',
    minMoves: 3,
    description: 'Parfait pour débuter !',
    color: 'from-green-400 to-blue-400'
  },
  FACILE: {
    id: 'facile', 
    name: 'Facile',
    characterCount: 3,
    emoji: '⭐',
    minMoves: 7,
    description: 'Un bon défi !',
    color: 'from-blue-400 to-purple-400'
  },
  MOYEN: {
    id: 'moyen',
    name: 'Moyen',
    characterCount: 4,
    emoji: '🌈',
    minMoves: 15,
    description: 'Pour les champions !',
    color: 'from-purple-400 to-pink-400'
  },
  DIFFICILE: {
    id: 'difficile',
    name: 'Difficile',
    characterCount: 5,
    emoji: '🚀',
    minMoves: 31,
    description: 'Super défi !',
    color: 'from-pink-400 to-red-400'
  }
} as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS];
export type DifficultyId = DifficultyLevel['id'];

// Character disc with size information
export interface CharacterDisc {
  character: ICharacter;
  size: number; // 1 is smallest, higher numbers are bigger
  id: string;
}

// Tower/Peg structure
export interface Tower {
  id: number; // 0, 1, or 2 for the three towers
  discs: CharacterDisc[];
  isSource?: boolean;
  isTarget?: boolean;
}

// Game state
export interface GameState {
  towers: Tower[];
  selectedDisc: CharacterDisc | null;
  selectedTower: number | null;
  moveCount: number;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  difficulty: DifficultyLevel;
  showHint: boolean;
  hintMove: { from: number; to: number } | null;
  history: GameMove[];
}

// Move representation
export interface GameMove {
  from: number;
  to: number;
  disc: CharacterDisc;
  timestamp: number;
}

// Setup props
export interface GameSetupProps {
  selectedDifficulty: DifficultyLevel | null;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  onStartGame: () => void;
  loading: boolean;
}

// Main game props
export interface ToursDeHanoiGameProps {
  characters: ICharacter[];
  difficulty: DifficultyLevel;
  onRestart: () => void;
}

// Game statistics
export interface GameStats {
  moveCount: number;
  optimalMoves: number;
  timeElapsed: number;
  efficiency: number;
  difficulty: DifficultyLevel;
  hintsUsed: number;
}

// Tower component props
export interface TowerPegProps {
  tower: Tower;
  isSelected: boolean;
  canReceiveDisc: boolean;
  onSelectTower: (towerId: number) => void;
  onSelectDisc: (disc: CharacterDisc) => void;
  selectedDisc: CharacterDisc | null;
  gameComplete?: boolean; // Whether game is completed
  characterCount: number; // Total number of characters for size calculations
}

// Character disc component props
export interface CharacterDiscProps {
  disc: CharacterDisc;
  isSelected: boolean;
  isTopDisc: boolean;
  canMove: boolean;
  onClick: () => void;
  position?: number; // Stack position from bottom
  gameComplete?: boolean; // Prevents animations when game is complete
  characterCount?: number; // Total number of characters for size reduction
}

// Game controls props
export interface GameControlsProps {
  onReset: () => void;
  onNewGame: () => void;
  onToggleHint: () => void;
  showHint: boolean;
}

// Game status props
export interface GameStatusProps {
  moveCount: number;
  optimalMoves: number;
  timeElapsed: number;
  difficulty: DifficultyLevel;
}

