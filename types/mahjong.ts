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
    description: '12 paires - Formation Tortue Authentique',
    pairCount: 12, // Uses authentic turtle formation (24 tiles)
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
    description: '18 paires - Formation Dragon Authentique',
    pairCount: 18, // Uses authentic dragon formation (36 tiles)
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
    description: '24 paires - Formation Pyramide Authentique',
    pairCount: 24, // Uses authentic pyramid formation (48 tiles)
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