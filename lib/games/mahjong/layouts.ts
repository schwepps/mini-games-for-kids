import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Predefined MahJong layouts for different difficulty levels
 * Each layout defines tile positions in a 3D coordinate system
 */

// Easy layout - Compact Pyramid (48 tiles, 24 pairs)
const turtleSmallPositions: TilePosition[] = [
  // Base layer (layer 0) - Foundation
  { row: 2, col: 2, layer: 0 }, { row: 2, col: 3, layer: 0 }, { row: 2, col: 4, layer: 0 }, { row: 2, col: 5, layer: 0 },
  { row: 2, col: 6, layer: 0 }, { row: 2, col: 7, layer: 0 }, { row: 2, col: 8, layer: 0 }, { row: 2, col: 9, layer: 0 },
  { row: 2, col: 10, layer: 0 }, { row: 2, col: 11, layer: 0 },
  
  { row: 3, col: 1, layer: 0 }, { row: 3, col: 2, layer: 0 }, { row: 3, col: 3, layer: 0 }, { row: 3, col: 4, layer: 0 },
  { row: 3, col: 5, layer: 0 }, { row: 3, col: 6, layer: 0 }, { row: 3, col: 7, layer: 0 }, { row: 3, col: 8, layer: 0 },
  { row: 3, col: 9, layer: 0 }, { row: 3, col: 10, layer: 0 }, { row: 3, col: 11, layer: 0 }, { row: 3, col: 12, layer: 0 },
  
  { row: 4, col: 1, layer: 0 }, { row: 4, col: 2, layer: 0 }, { row: 4, col: 3, layer: 0 }, { row: 4, col: 4, layer: 0 },
  { row: 4, col: 5, layer: 0 }, { row: 4, col: 6, layer: 0 }, { row: 4, col: 7, layer: 0 }, { row: 4, col: 8, layer: 0 },
  { row: 4, col: 9, layer: 0 }, { row: 4, col: 10, layer: 0 }, { row: 4, col: 11, layer: 0 }, { row: 4, col: 12, layer: 0 },
  
  { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 }, { row: 5, col: 4, layer: 0 }, { row: 5, col: 5, layer: 0 },
  { row: 5, col: 6, layer: 0 }, { row: 5, col: 7, layer: 0 }, { row: 5, col: 8, layer: 0 }, { row: 5, col: 9, layer: 0 },
  { row: 5, col: 10, layer: 0 }, { row: 5, col: 11, layer: 0 },

  // Layer 1 - Covers most of base layer, leaving only edges exposed
  { row: 3, col: 3, layer: 1 }, { row: 3, col: 4, layer: 1 }, { row: 3, col: 5, layer: 1 }, { row: 3, col: 6, layer: 1 },
  { row: 3, col: 7, layer: 1 }, { row: 3, col: 8, layer: 1 }, { row: 3, col: 9, layer: 1 }, { row: 3, col: 10, layer: 1 },
  
  { row: 4, col: 3, layer: 1 }, { row: 4, col: 4, layer: 1 }, { row: 4, col: 5, layer: 1 }, { row: 4, col: 6, layer: 1 },
  { row: 4, col: 7, layer: 1 }, { row: 4, col: 8, layer: 1 }, { row: 4, col: 9, layer: 1 }, { row: 4, col: 10, layer: 1 },
];

// Medium layout - Three-Layer Pyramid (96 tiles, 48 pairs)
const turtleMediumPositions: TilePosition[] = [
  // Base layer (layer 0) - Foundation
  { row: 1, col: 3, layer: 0 }, { row: 1, col: 4, layer: 0 }, { row: 1, col: 5, layer: 0 }, { row: 1, col: 6, layer: 0 },
  { row: 1, col: 7, layer: 0 }, { row: 1, col: 8, layer: 0 }, { row: 1, col: 9, layer: 0 }, { row: 1, col: 10, layer: 0 },
  
  { row: 2, col: 1, layer: 0 }, { row: 2, col: 2, layer: 0 }, { row: 2, col: 3, layer: 0 }, { row: 2, col: 4, layer: 0 },
  { row: 2, col: 5, layer: 0 }, { row: 2, col: 6, layer: 0 }, { row: 2, col: 7, layer: 0 }, { row: 2, col: 8, layer: 0 },
  { row: 2, col: 9, layer: 0 }, { row: 2, col: 10, layer: 0 }, { row: 2, col: 11, layer: 0 }, { row: 2, col: 12, layer: 0 },
  
  { row: 3, col: 0, layer: 0 }, { row: 3, col: 1, layer: 0 }, { row: 3, col: 2, layer: 0 }, { row: 3, col: 3, layer: 0 },
  { row: 3, col: 4, layer: 0 }, { row: 3, col: 5, layer: 0 }, { row: 3, col: 6, layer: 0 }, { row: 3, col: 7, layer: 0 },
  { row: 3, col: 8, layer: 0 }, { row: 3, col: 9, layer: 0 }, { row: 3, col: 10, layer: 0 }, { row: 3, col: 11, layer: 0 },
  { row: 3, col: 12, layer: 0 }, { row: 3, col: 13, layer: 0 },
  
  { row: 4, col: 0, layer: 0 }, { row: 4, col: 1, layer: 0 }, { row: 4, col: 2, layer: 0 }, { row: 4, col: 3, layer: 0 },
  { row: 4, col: 4, layer: 0 }, { row: 4, col: 5, layer: 0 }, { row: 4, col: 6, layer: 0 }, { row: 4, col: 7, layer: 0 },
  { row: 4, col: 8, layer: 0 }, { row: 4, col: 9, layer: 0 }, { row: 4, col: 10, layer: 0 }, { row: 4, col: 11, layer: 0 },
  { row: 4, col: 12, layer: 0 }, { row: 4, col: 13, layer: 0 },
  
  { row: 5, col: 1, layer: 0 }, { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 }, { row: 5, col: 4, layer: 0 },
  { row: 5, col: 5, layer: 0 }, { row: 5, col: 6, layer: 0 }, { row: 5, col: 7, layer: 0 }, { row: 5, col: 8, layer: 0 },
  { row: 5, col: 9, layer: 0 }, { row: 5, col: 10, layer: 0 }, { row: 5, col: 11, layer: 0 }, { row: 5, col: 12, layer: 0 },
  
  { row: 6, col: 3, layer: 0 }, { row: 6, col: 4, layer: 0 }, { row: 6, col: 5, layer: 0 }, { row: 6, col: 6, layer: 0 },
  { row: 6, col: 7, layer: 0 }, { row: 6, col: 8, layer: 0 }, { row: 6, col: 9, layer: 0 }, { row: 6, col: 10, layer: 0 },
  
  // Layer 1 - Covers center of base layer
  { row: 2, col: 3, layer: 1 }, { row: 2, col: 4, layer: 1 }, { row: 2, col: 5, layer: 1 }, { row: 2, col: 6, layer: 1 },
  { row: 2, col: 7, layer: 1 }, { row: 2, col: 8, layer: 1 }, { row: 2, col: 9, layer: 1 }, { row: 2, col: 10, layer: 1 },
  
  { row: 3, col: 2, layer: 1 }, { row: 3, col: 3, layer: 1 }, { row: 3, col: 4, layer: 1 }, { row: 3, col: 5, layer: 1 },
  { row: 3, col: 6, layer: 1 }, { row: 3, col: 7, layer: 1 }, { row: 3, col: 8, layer: 1 }, { row: 3, col: 9, layer: 1 },
  { row: 3, col: 10, layer: 1 }, { row: 3, col: 11, layer: 1 },
  
  { row: 4, col: 2, layer: 1 }, { row: 4, col: 3, layer: 1 }, { row: 4, col: 4, layer: 1 }, { row: 4, col: 5, layer: 1 },
  { row: 4, col: 6, layer: 1 }, { row: 4, col: 7, layer: 1 }, { row: 4, col: 8, layer: 1 }, { row: 4, col: 9, layer: 1 },
  { row: 4, col: 10, layer: 1 }, { row: 4, col: 11, layer: 1 },
  
  { row: 5, col: 3, layer: 1 }, { row: 5, col: 4, layer: 1 }, { row: 5, col: 5, layer: 1 }, { row: 5, col: 6, layer: 1 },
  { row: 5, col: 7, layer: 1 }, { row: 5, col: 8, layer: 1 }, { row: 5, col: 9, layer: 1 }, { row: 5, col: 10, layer: 1 },
  
  // Layer 2 - Covers center of layer 1
  { row: 3, col: 4, layer: 2 }, { row: 3, col: 5, layer: 2 }, { row: 3, col: 6, layer: 2 }, { row: 3, col: 7, layer: 2 },
  { row: 3, col: 8, layer: 2 }, { row: 3, col: 9, layer: 2 },
  
  { row: 4, col: 4, layer: 2 }, { row: 4, col: 5, layer: 2 }, { row: 4, col: 6, layer: 2 }, { row: 4, col: 7, layer: 2 },
  { row: 4, col: 8, layer: 2 }, { row: 4, col: 9, layer: 2 },
  
  // Layer 3 - Top of pyramid
  { row: 3, col: 6, layer: 3 }, { row: 3, col: 7, layer: 3 },
  { row: 4, col: 6, layer: 3 }, { row: 4, col: 7, layer: 3 },
];

// Hard layout - Five-Layer Pyramid (144 tiles, 72 pairs) 
const turtleLargePositions: TilePosition[] = [
  // Base layer (layer 0) - Large foundation
  { row: 0, col: 4, layer: 0 }, { row: 0, col: 5, layer: 0 }, { row: 0, col: 6, layer: 0 }, { row: 0, col: 7, layer: 0 },
  { row: 0, col: 8, layer: 0 }, { row: 0, col: 9, layer: 0 },
  
  { row: 1, col: 2, layer: 0 }, { row: 1, col: 3, layer: 0 }, { row: 1, col: 4, layer: 0 }, { row: 1, col: 5, layer: 0 },
  { row: 1, col: 6, layer: 0 }, { row: 1, col: 7, layer: 0 }, { row: 1, col: 8, layer: 0 }, { row: 1, col: 9, layer: 0 },
  { row: 1, col: 10, layer: 0 }, { row: 1, col: 11, layer: 0 },
  
  { row: 2, col: 0, layer: 0 }, { row: 2, col: 1, layer: 0 }, { row: 2, col: 2, layer: 0 }, { row: 2, col: 3, layer: 0 },
  { row: 2, col: 4, layer: 0 }, { row: 2, col: 5, layer: 0 }, { row: 2, col: 6, layer: 0 }, { row: 2, col: 7, layer: 0 },
  { row: 2, col: 8, layer: 0 }, { row: 2, col: 9, layer: 0 }, { row: 2, col: 10, layer: 0 }, { row: 2, col: 11, layer: 0 },
  { row: 2, col: 12, layer: 0 }, { row: 2, col: 13, layer: 0 },
  
  { row: 3, col: 0, layer: 0 }, { row: 3, col: 1, layer: 0 }, { row: 3, col: 2, layer: 0 }, { row: 3, col: 3, layer: 0 },
  { row: 3, col: 4, layer: 0 }, { row: 3, col: 5, layer: 0 }, { row: 3, col: 6, layer: 0 }, { row: 3, col: 7, layer: 0 },
  { row: 3, col: 8, layer: 0 }, { row: 3, col: 9, layer: 0 }, { row: 3, col: 10, layer: 0 }, { row: 3, col: 11, layer: 0 },
  { row: 3, col: 12, layer: 0 }, { row: 3, col: 13, layer: 0 },
  
  { row: 4, col: 0, layer: 0 }, { row: 4, col: 1, layer: 0 }, { row: 4, col: 2, layer: 0 }, { row: 4, col: 3, layer: 0 },
  { row: 4, col: 4, layer: 0 }, { row: 4, col: 5, layer: 0 }, { row: 4, col: 6, layer: 0 }, { row: 4, col: 7, layer: 0 },
  { row: 4, col: 8, layer: 0 }, { row: 4, col: 9, layer: 0 }, { row: 4, col: 10, layer: 0 }, { row: 4, col: 11, layer: 0 },
  { row: 4, col: 12, layer: 0 }, { row: 4, col: 13, layer: 0 },
  
  { row: 5, col: 0, layer: 0 }, { row: 5, col: 1, layer: 0 }, { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 },
  { row: 5, col: 4, layer: 0 }, { row: 5, col: 5, layer: 0 }, { row: 5, col: 6, layer: 0 }, { row: 5, col: 7, layer: 0 },
  { row: 5, col: 8, layer: 0 }, { row: 5, col: 9, layer: 0 }, { row: 5, col: 10, layer: 0 }, { row: 5, col: 11, layer: 0 },
  { row: 5, col: 12, layer: 0 }, { row: 5, col: 13, layer: 0 },
  
  { row: 6, col: 2, layer: 0 }, { row: 6, col: 3, layer: 0 }, { row: 6, col: 4, layer: 0 }, { row: 6, col: 5, layer: 0 },
  { row: 6, col: 6, layer: 0 }, { row: 6, col: 7, layer: 0 }, { row: 6, col: 8, layer: 0 }, { row: 6, col: 9, layer: 0 },
  { row: 6, col: 10, layer: 0 }, { row: 6, col: 11, layer: 0 },
  
  { row: 7, col: 4, layer: 0 }, { row: 7, col: 5, layer: 0 }, { row: 7, col: 6, layer: 0 }, { row: 7, col: 7, layer: 0 },
  { row: 7, col: 8, layer: 0 }, { row: 7, col: 9, layer: 0 },
  
  // Layer 1 - Covers most of base layer
  { row: 1, col: 4, layer: 1 }, { row: 1, col: 5, layer: 1 }, { row: 1, col: 6, layer: 1 }, { row: 1, col: 7, layer: 1 },
  { row: 1, col: 8, layer: 1 }, { row: 1, col: 9, layer: 1 },
  
  { row: 2, col: 2, layer: 1 }, { row: 2, col: 3, layer: 1 }, { row: 2, col: 4, layer: 1 }, { row: 2, col: 5, layer: 1 },
  { row: 2, col: 6, layer: 1 }, { row: 2, col: 7, layer: 1 }, { row: 2, col: 8, layer: 1 }, { row: 2, col: 9, layer: 1 },
  { row: 2, col: 10, layer: 1 }, { row: 2, col: 11, layer: 1 },
  
  { row: 3, col: 2, layer: 1 }, { row: 3, col: 3, layer: 1 }, { row: 3, col: 4, layer: 1 }, { row: 3, col: 5, layer: 1 },
  { row: 3, col: 6, layer: 1 }, { row: 3, col: 7, layer: 1 }, { row: 3, col: 8, layer: 1 }, { row: 3, col: 9, layer: 1 },
  { row: 3, col: 10, layer: 1 }, { row: 3, col: 11, layer: 1 },
  
  { row: 4, col: 2, layer: 1 }, { row: 4, col: 3, layer: 1 }, { row: 4, col: 4, layer: 1 }, { row: 4, col: 5, layer: 1 },
  { row: 4, col: 6, layer: 1 }, { row: 4, col: 7, layer: 1 }, { row: 4, col: 8, layer: 1 }, { row: 4, col: 9, layer: 1 },
  { row: 4, col: 10, layer: 1 }, { row: 4, col: 11, layer: 1 },
  
  { row: 5, col: 2, layer: 1 }, { row: 5, col: 3, layer: 1 }, { row: 5, col: 4, layer: 1 }, { row: 5, col: 5, layer: 1 },
  { row: 5, col: 6, layer: 1 }, { row: 5, col: 7, layer: 1 }, { row: 5, col: 8, layer: 1 }, { row: 5, col: 9, layer: 1 },
  { row: 5, col: 10, layer: 1 }, { row: 5, col: 11, layer: 1 },
  
  { row: 6, col: 4, layer: 1 }, { row: 6, col: 5, layer: 1 }, { row: 6, col: 6, layer: 1 }, { row: 6, col: 7, layer: 1 },
  { row: 6, col: 8, layer: 1 }, { row: 6, col: 9, layer: 1 },
  
  // Layer 2 - Covers center of layer 1
  { row: 2, col: 4, layer: 2 }, { row: 2, col: 5, layer: 2 }, { row: 2, col: 6, layer: 2 }, { row: 2, col: 7, layer: 2 },
  { row: 2, col: 8, layer: 2 }, { row: 2, col: 9, layer: 2 },
  
  { row: 3, col: 4, layer: 2 }, { row: 3, col: 5, layer: 2 }, { row: 3, col: 6, layer: 2 }, { row: 3, col: 7, layer: 2 },
  { row: 3, col: 8, layer: 2 }, { row: 3, col: 9, layer: 2 },
  
  { row: 4, col: 4, layer: 2 }, { row: 4, col: 5, layer: 2 }, { row: 4, col: 6, layer: 2 }, { row: 4, col: 7, layer: 2 },
  { row: 4, col: 8, layer: 2 }, { row: 4, col: 9, layer: 2 },
  
  { row: 5, col: 4, layer: 2 }, { row: 5, col: 5, layer: 2 }, { row: 5, col: 6, layer: 2 }, { row: 5, col: 7, layer: 2 },
  { row: 5, col: 8, layer: 2 }, { row: 5, col: 9, layer: 2 },
  
  // Layer 3 - Smaller center section
  { row: 3, col: 5, layer: 3 }, { row: 3, col: 6, layer: 3 }, { row: 3, col: 7, layer: 3 }, { row: 3, col: 8, layer: 3 },
  { row: 4, col: 5, layer: 3 }, { row: 4, col: 6, layer: 3 }, { row: 4, col: 7, layer: 3 }, { row: 4, col: 8, layer: 3 },
  
  // Layer 4 - Top of pyramid
  { row: 3, col: 6, layer: 4 }, { row: 3, col: 7, layer: 4 },
  { row: 4, col: 6, layer: 4 }, { row: 4, col: 7, layer: 4 },
];

export const MAHJONG_LAYOUTS: MahjongLayout[] = [
  {
    name: 'turtle-small',
    difficulty: 'easy',
    positions: turtleSmallPositions,
    maxLayers: 2
  },
  {
    name: 'turtle-medium',
    difficulty: 'medium',
    positions: turtleMediumPositions,
    maxLayers: 4
  },
  {
    name: 'turtle-large',
    difficulty: 'hard',
    positions: turtleLargePositions,
    maxLayers: 5
  }
];

export function getLayoutByName(name: string): MahjongLayout | undefined {
  return MAHJONG_LAYOUTS.find(layout => layout.name === name);
}

export function getLayoutByDifficulty(difficulty: string): MahjongLayout | undefined {
  return MAHJONG_LAYOUTS.find(layout => layout.difficulty === difficulty);
}