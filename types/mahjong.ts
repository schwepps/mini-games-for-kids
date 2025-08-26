import { ICharacter } from './game';

export type MahjongDifficulty = 'easy' | 'medium' | 'hard';

export interface MahjongTile {
  id: string;
  character: ICharacter;
  
  // Enhanced 3D positioning system
  layer: number;
  row: number;
  col: number;
  x: number; // Absolute position in pixels
  y: number; // Absolute position in pixels
  z: number; // 3D depth for layering
  
  // State management
  isSelectable: boolean;
  isSelected: boolean;
  isMatched: boolean;
  
  // Enhanced coverage and support system
  isCovered: boolean; // True if tile has tiles resting on top
  coveredBy: string[]; // IDs of tiles directly covering this tile
  supportedBy: string[]; // IDs of tiles this tile rests on (supports from below)
  supporting: string[]; // IDs of tiles this tile supports (tiles resting on this tile)
  
  // Adjacency and selectability system for authentic mahjong rules
  leftBlocked: boolean; // True if cannot slide left
  rightBlocked: boolean; // True if cannot slide right
  leftBlockedBy: string[]; // IDs of tiles blocking left movement
  rightBlockedBy: string[]; // IDs of tiles blocking right movement
  
  // Tile footprint for overlap detection
  footprint: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
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
  // Absolute pixel positioning for authentic mahjong structure
  x: number; // Absolute X coordinate in pixels
  y: number; // Absolute Y coordinate in pixels
  layer: number; // Z-layer (0 = bottom layer)
  
  // Support relationships for authentic 3D structure
  supportedBy?: string[]; // IDs of tiles this tile rests on
  id?: string; // Optional tile identifier for support relationships
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
  pairCount: number; // Tiles will be created from authentic layouts
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
    description: '4 personnages différents - Formation Tortue',
    pairCount: 24, // All difficulties use 24 pairs (48 tiles) in square layouts
    characterCount: 4, // 4 characters × 6 pairs each = easier pattern recognition
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
    description: '8 personnages différents - Formation Tour',
    pairCount: 24, // All difficulties use 24 pairs (48 tiles) in square layouts
    characterCount: 8, // 8 characters × 3 pairs each = moderate cognitive load
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
    description: '12 personnages différents - Formation Pyramide',
    pairCount: 24, // All difficulties use 24 pairs (48 tiles) in square layouts
    characterCount: 12, // 12 characters × 2 pairs each = high cognitive complexity
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