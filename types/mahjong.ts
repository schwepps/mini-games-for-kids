import { ICharacter } from './game';

export type MahjongDifficulty = 'easy' | 'medium' | 'hard';

export interface MahjongTile {
  id: string;
  character: ICharacter;
  layer: number;
  row: number;
  col: number;
  isSelectable: boolean;
  isSelected: boolean;
  isMatched: boolean;
  isCovered: boolean; // True if tile is covered by another tile above
  coveredBy: string[]; // IDs of tiles covering this tile
  x: number; // Position in pixels
  y: number; // Position in pixels
  z: number; // Layer depth
}

export interface MahjongBoard {
  tiles: MahjongTile[];
  layout: MahjongLayout;
  width: number;
  height: number;
  layers: number;
}

export interface MahjongLayout {
  name: string;
  difficulty: MahjongDifficulty;
  positions: TilePosition[];
  maxLayers: number;
}

export interface TilePosition {
  row: number;
  col: number;
  layer: number;
}

export interface MahjongGameState {
  gamePhase: 'setup' | 'playing' | 'won';
  difficulty: MahjongDifficulty;
  board: MahjongBoard | null;
  selectedTiles: string[];
  matchedPairs: number;
  totalPairs: number;
  moves: number;
  hints: number;
  showingHint: boolean;
  startTime: Date | null;
  loading: boolean;
  error: string | null;
}

export type MahjongGameAction = 
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SELECT_DIFFICULTY'; difficulty: MahjongDifficulty }
  | { type: 'START_GAME'; board: MahjongBoard }
  | { type: 'SELECT_TILE'; tileId: string }
  | { type: 'MATCH_TILES'; tileIds: string[] }
  | { type: 'DESELECT_TILES'; tileIds: string[] }
  | { type: 'SHOW_HINT'; tileIds: string[] }
  | { type: 'HIDE_HINT' }
  | { type: 'USE_HINT' }
  | { type: 'RESET_GAME' }
  | { type: 'GAME_WON' };

export interface MahjongDifficultyConfig {
  difficulty: MahjongDifficulty;
  displayName: string;
  description: string;
  layoutName: string; // @deprecated - kept for legacy compatibility
  pairCount: number; // New mobile-first approach
  characterCount: number;
  hintsAvailable: number;
  tileSize: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const DIFFICULTY_OPTIONS: MahjongDifficultyConfig[] = [
  {
    difficulty: 'easy',
    displayName: 'Facile',
    description: '12 paires - Parfait pour débuter !',
    layoutName: 'turtle-small', // @deprecated
    pairCount: 12, // 24 tiles total - manageable for beginners
    characterCount: 4, // Fewer character types = easier matching
    hintsAvailable: 5,
    tileSize: {
      mobile: 48,
      tablet: 56,
      desktop: 64
    }
  },
  {
    difficulty: 'medium',
    displayName: 'Moyen',
    description: '18 paires - Un bon défi !',
    layoutName: 'turtle-medium', // @deprecated
    pairCount: 18, // 36 tiles total - balanced challenge
    characterCount: 6, // Moderate character variety
    hintsAvailable: 3,
    tileSize: {
      mobile: 44,
      tablet: 52,
      desktop: 60
    }
  },
  {
    difficulty: 'hard',
    displayName: 'Difficile',
    description: '24 paires - Pour les experts !',
    layoutName: 'turtle-large', // @deprecated
    pairCount: 24, // 48 tiles total - expert level
    characterCount: 8, // High character variety = harder matching
    hintsAvailable: 1,
    tileSize: {
      mobile: 40,
      tablet: 48,
      desktop: 56
    }
  }
];

export interface MahjongStats {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  hintsUsed: number;
  gameTime: number;
  efficiency: number;
}