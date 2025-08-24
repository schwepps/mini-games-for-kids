import { ICharacter } from './game';

/**
 * Sudoku Game Types
 */

export type SudokuGamePhase = 'setup' | 'playing' | 'won';

export type SudokuDifficulty = 'easy' | 'medium' | 'hard';

export type GridSize = 4 | 6 | 9;

export interface SudokuCell {
  value: string | null; // character ID or null for empty
  character: ICharacter | null;
  isGiven: boolean; // true if this was pre-filled (not editable)
  isValid: boolean; // true if current placement is valid
  row: number;
  col: number;
  region: number; // box/region index (0-3 for 4x4, 0-5 for 6x6, 0-8 for 9x9)
}

export interface SudokuGrid {
  size: GridSize;
  cells: SudokuCell[][];
  characters: ICharacter[]; // available characters for this puzzle
  regions: number[][]; // regions definition for this grid size
}

export interface SudokuGameState {
  gamePhase: SudokuGamePhase;
  difficulty: SudokuDifficulty;
  gridSize: GridSize;
  grid: SudokuGrid | null;
  selectedCharacter: ICharacter | null;
  moves: number;
  startTime?: Date;
  loading: boolean;
  error: string | null;
  hints: boolean; // whether hints are enabled
  showingHints: boolean; // whether hints are currently displayed
  validationErrors: { row: number; col: number }[]; // cells with validation errors
}

export type SudokuGameAction = 
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SELECT_DIFFICULTY'; difficulty: SudokuDifficulty; gridSize: GridSize }
  | { type: 'START_GAME'; grid: SudokuGrid }
  | { type: 'SELECT_CHARACTER'; character: ICharacter | null }
  | { type: 'PLACE_CHARACTER'; row: number; col: number; character: ICharacter }
  | { type: 'CLEAR_CELL'; row: number; col: number }
  | { type: 'INCREMENT_MOVES' }
  | { type: 'VALIDATE_GRID' }
  | { type: 'TOGGLE_HINTS' }
  | { type: 'SHOW_HINTS'; show: boolean }
  | { type: 'RESET_GAME' }
  | { type: 'CHANGE_DIFFICULTY_REQUEST' }
  | { type: 'GAME_WON' };

export interface SudokuCellProps {
  cell: SudokuCell;
  row: number;
  col: number;
  selectedCharacter: ICharacter | null;
  isHighlighted: boolean;
  showHint: boolean;
  onClick: (row: number, col: number) => void;
  disabled: boolean;
}

export interface SudokuGridProps {
  grid: SudokuGrid;
  selectedCharacter: ICharacter | null;
  showingHints: boolean;
  validationErrors: { row: number; col: number }[];
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
}

export interface CharacterPaletteProps {
  characters: ICharacter[];
  selectedCharacter: ICharacter | null;
  onCharacterSelect: (character: ICharacter | null) => void;
  disabled: boolean;
}

export interface SudokuSetupProps {
  difficulty: SudokuDifficulty;
  onDifficultyChange: (difficulty: SudokuDifficulty) => void;
  onStartGame: () => void;
  loading: boolean;
}

export interface SudokuGameStatusProps {
  moves: number;
  startTime?: Date;
  gridSize: GridSize;
}

export interface SudokuCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moves: number;
  gridSize: GridSize;
  gameTime?: number; // in seconds
  onNewGame: () => void;
  onDifficultyChange: (difficulty: SudokuDifficulty) => void;
}

// Difficulty configurations
export interface DifficultyConfig {
  difficulty: SudokuDifficulty;
  gridSize: GridSize;
  label: string;
  emoji: string;
  description: string;
  preFilledPercentage: number; // percentage of cells to pre-fill
  ageGroup: string;
}

export const DIFFICULTY_OPTIONS: DifficultyConfig[] = [
  {
    difficulty: 'easy',
    gridSize: 4,
    label: 'Facile',
    emoji: '🌟',
    description: 'Grille 4×4',
    preFilledPercentage: 0.6,
    ageGroup: '4-6 ans'
  },
  {
    difficulty: 'medium',
    gridSize: 6,
    label: 'Moyen',
    emoji: '🎯',
    description: 'Grille 6×6',
    preFilledPercentage: 0.45,
    ageGroup: '6-8 ans'
  },
  {
    difficulty: 'hard',
    gridSize: 9,
    label: 'Difficile',
    emoji: '🚀',
    description: 'Grille 9×9',
    preFilledPercentage: 0.35,
    ageGroup: '8+ ans'
  }
];

// Modern responsive design uses Tailwind CSS classes directly
// All layout configurations are now embedded in component logic for better maintainability

// Region definitions for different grid sizes
export const REGIONS: Record<GridSize, number[][]> = {
  4: [
    [0, 1, 4, 5],   // top-left 2x2
    [2, 3, 6, 7],   // top-right 2x2
    [8, 9, 12, 13], // bottom-left 2x2
    [10, 11, 14, 15] // bottom-right 2x2
  ],
  6: [
    [0, 1, 2, 6, 7, 8],       // region 0: top-left 2x3
    [3, 4, 5, 9, 10, 11],     // region 1: top-right 2x3
    [12, 13, 14, 18, 19, 20], // region 2: middle-left 2x3
    [15, 16, 17, 21, 22, 23], // region 3: middle-right 2x3
    [24, 25, 26, 30, 31, 32], // region 4: bottom-left 2x3
    [27, 28, 29, 33, 34, 35]  // region 5: bottom-right 2x3
  ],
  9: [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],    // top-left 3x3
    [3, 4, 5, 12, 13, 14, 21, 22, 23],   // top-middle 3x3
    [6, 7, 8, 15, 16, 17, 24, 25, 26],   // top-right 3x3
    [27, 28, 29, 36, 37, 38, 45, 46, 47], // middle-left 3x3
    [30, 31, 32, 39, 40, 41, 48, 49, 50], // middle-middle 3x3
    [33, 34, 35, 42, 43, 44, 51, 52, 53], // middle-right 3x3
    [54, 55, 56, 63, 64, 65, 72, 73, 74], // bottom-left 3x3
    [57, 58, 59, 66, 67, 68, 75, 76, 77], // bottom-middle 3x3
    [60, 61, 62, 69, 70, 71, 78, 79, 80]  // bottom-right 3x3
  ]
};