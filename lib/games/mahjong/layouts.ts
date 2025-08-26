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

// EASY LAYOUTS (24 tiles each)

// House layout - Simple house shape (24 tiles, 12 pairs)
const houseEasyPositions: TilePosition[] = [
  // Base/Foundation (layer 0)
  { row: 4, col: 2, layer: 0 }, { row: 4, col: 3, layer: 0 }, { row: 4, col: 4, layer: 0 }, 
  { row: 4, col: 5, layer: 0 }, { row: 4, col: 6, layer: 0 }, { row: 4, col: 7, layer: 0 },
  { row: 4, col: 8, layer: 0 }, { row: 4, col: 9, layer: 0 },
  
  // Walls (layer 0) 
  { row: 3, col: 2, layer: 0 }, { row: 3, col: 9, layer: 0 },
  { row: 2, col: 2, layer: 0 }, { row: 2, col: 9, layer: 0 },
  
  // Roof base (layer 1)
  { row: 3, col: 3, layer: 1 }, { row: 3, col: 4, layer: 1 }, { row: 3, col: 5, layer: 1 },
  { row: 3, col: 6, layer: 1 }, { row: 3, col: 7, layer: 1 }, { row: 3, col: 8, layer: 1 },
  
  // Roof peak (layer 1)
  { row: 2, col: 4, layer: 1 }, { row: 2, col: 5, layer: 1 }, { row: 2, col: 6, layer: 1 }, { row: 2, col: 7, layer: 1 },
  
  // Chimney (layer 1)
  { row: 1, col: 3, layer: 1 }, { row: 1, col: 4, layer: 1 }
];

// Flower layout - Petal pattern (24 tiles, 12 pairs)
const flowerEasyPositions: TilePosition[] = [
  // Center (layer 0)
  { row: 3, col: 5, layer: 0 }, { row: 3, col: 6, layer: 0 },
  { row: 4, col: 5, layer: 0 }, { row: 4, col: 6, layer: 0 },
  
  // Top petal (layer 0)
  { row: 1, col: 5, layer: 0 }, { row: 1, col: 6, layer: 0 },
  { row: 2, col: 5, layer: 0 }, { row: 2, col: 6, layer: 0 },
  
  // Right petal (layer 0)
  { row: 3, col: 7, layer: 0 }, { row: 3, col: 8, layer: 0 },
  { row: 4, col: 7, layer: 0 }, { row: 4, col: 8, layer: 0 },
  
  // Bottom petal (layer 0)
  { row: 5, col: 5, layer: 0 }, { row: 5, col: 6, layer: 0 },
  { row: 6, col: 5, layer: 0 }, { row: 6, col: 6, layer: 0 },
  
  // Left petal (layer 0)
  { row: 3, col: 3, layer: 0 }, { row: 3, col: 4, layer: 0 },
  { row: 4, col: 3, layer: 0 }, { row: 4, col: 4, layer: 0 },
  
  // Center layer 1
  { row: 3, col: 5, layer: 1 }, { row: 3, col: 6, layer: 1 },
  { row: 4, col: 5, layer: 1 }, { row: 4, col: 6, layer: 1 }
];

// Car layout - Simple car shape (24 tiles, 12 pairs)
const carEasyPositions: TilePosition[] = [
  // Car body (layer 0)
  { row: 3, col: 2, layer: 0 }, { row: 3, col: 3, layer: 0 }, { row: 3, col: 4, layer: 0 }, 
  { row: 3, col: 5, layer: 0 }, { row: 3, col: 6, layer: 0 }, { row: 3, col: 7, layer: 0 },
  { row: 3, col: 8, layer: 0 }, { row: 3, col: 9, layer: 0 },
  
  // Wheels (layer 0)
  { row: 4, col: 3, layer: 0 }, { row: 4, col: 4, layer: 0 }, // Left wheel
  { row: 4, col: 7, layer: 0 }, { row: 4, col: 8, layer: 0 }, // Right wheel
  
  // Roof (layer 1)
  { row: 2, col: 4, layer: 1 }, { row: 2, col: 5, layer: 1 }, { row: 2, col: 6, layer: 1 }, { row: 2, col: 7, layer: 1 },
  
  // Windshield (layer 1)
  { row: 3, col: 4, layer: 1 }, { row: 3, col: 5, layer: 1 }, { row: 3, col: 6, layer: 1 }, { row: 3, col: 7, layer: 1 },
  
  // Bumpers (layer 0)
  { row: 3, col: 1, layer: 0 }, { row: 3, col: 10, layer: 0 }
];

// MEDIUM LAYOUTS (36 tiles each)

// Butterfly layout - Symmetrical wings (36 tiles, 18 pairs)
const butterflyMediumPositions: TilePosition[] = [
  // Body (layer 0)
  { row: 2, col: 6, layer: 0 }, { row: 3, col: 6, layer: 0 }, { row: 4, col: 6, layer: 0 }, { row: 5, col: 6, layer: 0 },
  
  // Left upper wing (layer 0)
  { row: 1, col: 3, layer: 0 }, { row: 1, col: 4, layer: 0 }, { row: 1, col: 5, layer: 0 },
  { row: 2, col: 2, layer: 0 }, { row: 2, col: 3, layer: 0 }, { row: 2, col: 4, layer: 0 }, { row: 2, col: 5, layer: 0 },
  { row: 3, col: 3, layer: 0 }, { row: 3, col: 4, layer: 0 }, { row: 3, col: 5, layer: 0 },
  
  // Right upper wing (layer 0) - Mirror of left
  { row: 1, col: 7, layer: 0 }, { row: 1, col: 8, layer: 0 }, { row: 1, col: 9, layer: 0 },
  { row: 2, col: 7, layer: 0 }, { row: 2, col: 8, layer: 0 }, { row: 2, col: 9, layer: 0 }, { row: 2, col: 10, layer: 0 },
  { row: 3, col: 7, layer: 0 }, { row: 3, col: 8, layer: 0 }, { row: 3, col: 9, layer: 0 },
  
  // Left lower wing (layer 0)
  { row: 4, col: 3, layer: 0 }, { row: 4, col: 4, layer: 0 }, { row: 4, col: 5, layer: 0 },
  { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 }, { row: 5, col: 4, layer: 0 }, { row: 5, col: 5, layer: 0 },
  
  // Right lower wing (layer 0) - Mirror of left
  { row: 4, col: 7, layer: 0 }, { row: 4, col: 8, layer: 0 }, { row: 4, col: 9, layer: 0 },
  { row: 5, col: 7, layer: 0 }, { row: 5, col: 8, layer: 0 }, { row: 5, col: 9, layer: 0 }, { row: 5, col: 10, layer: 0 },
  
  // Wing highlights (layer 1)
  { row: 2, col: 3, layer: 1 }, { row: 2, col: 9, layer: 1 },
  { row: 5, col: 3, layer: 1 }, { row: 5, col: 9, layer: 1 }
];

// Bridge layout - Two towers with connecting bridge (36 tiles, 18 pairs)
const bridgeMediumPositions: TilePosition[] = [
  // Left tower base (layer 0)
  { row: 4, col: 1, layer: 0 }, { row: 4, col: 2, layer: 0 }, { row: 4, col: 3, layer: 0 },
  { row: 5, col: 1, layer: 0 }, { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 },
  
  // Right tower base (layer 0)
  { row: 4, col: 9, layer: 0 }, { row: 4, col: 10, layer: 0 }, { row: 4, col: 11, layer: 0 },
  { row: 5, col: 9, layer: 0 }, { row: 5, col: 10, layer: 0 }, { row: 5, col: 11, layer: 0 },
  
  // Left tower middle (layer 1)
  { row: 3, col: 1, layer: 1 }, { row: 3, col: 2, layer: 1 }, { row: 3, col: 3, layer: 1 },
  
  // Right tower middle (layer 1)
  { row: 3, col: 9, layer: 1 }, { row: 3, col: 10, layer: 1 }, { row: 3, col: 11, layer: 1 },
  
  // Left tower top (layer 2)
  { row: 2, col: 1, layer: 2 }, { row: 2, col: 2, layer: 2 }, { row: 2, col: 3, layer: 2 },
  
  // Right tower top (layer 2)
  { row: 2, col: 9, layer: 2 }, { row: 2, col: 10, layer: 2 }, { row: 2, col: 11, layer: 2 },
  
  // Bridge span (layer 1)
  { row: 3, col: 4, layer: 1 }, { row: 3, col: 5, layer: 1 }, { row: 3, col: 6, layer: 1 }, 
  { row: 3, col: 7, layer: 1 }, { row: 3, col: 8, layer: 1 },
  
  // Bridge supports (layer 0)
  { row: 4, col: 4, layer: 0 }, { row: 4, col: 8, layer: 0 },
  { row: 5, col: 5, layer: 0 }, { row: 5, col: 7, layer: 0 }
];

// Castle layout - Simple castle with walls (36 tiles, 18 pairs)
const castleMediumPositions: TilePosition[] = [
  // Foundation wall (layer 0)
  { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 }, { row: 5, col: 4, layer: 0 }, 
  { row: 5, col: 5, layer: 0 }, { row: 5, col: 6, layer: 0 }, { row: 5, col: 7, layer: 0 },
  { row: 5, col: 8, layer: 0 }, { row: 5, col: 9, layer: 0 }, { row: 5, col: 10, layer: 0 },
  
  // Wall towers (layer 1)
  { row: 4, col: 2, layer: 1 }, { row: 4, col: 3, layer: 1 }, // Left tower
  { row: 4, col: 5, layer: 1 }, { row: 4, col: 6, layer: 1 }, { row: 4, col: 7, layer: 1 }, // Center section
  { row: 4, col: 9, layer: 1 }, { row: 4, col: 10, layer: 1 }, // Right tower
  
  // Upper towers (layer 2)
  { row: 3, col: 2, layer: 2 }, { row: 3, col: 10, layer: 2 }, // Corner towers
  { row: 3, col: 5, layer: 2 }, { row: 3, col: 6, layer: 2 }, { row: 3, col: 7, layer: 2 }, // Keep/main tower
  
  // Battlements (layer 2)
  { row: 4, col: 4, layer: 2 }, { row: 4, col: 8, layer: 2 },
  
  // Central keep (layer 3)
  { row: 2, col: 5, layer: 3 }, { row: 2, col: 6, layer: 3 }, { row: 2, col: 7, layer: 3 },
  { row: 1, col: 6, layer: 3 }, // Highest tower
  
  // Gate area (layer 0)
  { row: 5, col: 5, layer: 0 }, { row: 5, col: 7, layer: 0 }, // Already included in foundation
  
  // Additional wall sections (layer 1)
  { row: 4, col: 4, layer: 1 }, { row: 4, col: 8, layer: 1 }
];

// HARD LAYOUTS (48 tiles each)

// Spider layout - Central body with radiating legs (48 tiles, 24 pairs)
const spiderHardPositions: TilePosition[] = [
  // Central body (layer 1)
  { row: 4, col: 6, layer: 1 }, { row: 4, col: 7, layer: 1 }, { row: 4, col: 8, layer: 1 },
  { row: 5, col: 6, layer: 1 }, { row: 5, col: 7, layer: 1 }, { row: 5, col: 8, layer: 1 },
  { row: 6, col: 6, layer: 1 }, { row: 6, col: 7, layer: 1 }, { row: 6, col: 8, layer: 1 },
  
  // Leg 1 - Top left (layer 0)
  { row: 1, col: 2, layer: 0 }, { row: 2, col: 3, layer: 0 }, { row: 3, col: 4, layer: 0 },
  
  // Leg 2 - Top (layer 0)
  { row: 1, col: 7, layer: 0 }, { row: 2, col: 7, layer: 0 }, { row: 3, col: 7, layer: 0 },
  
  // Leg 3 - Top right (layer 0)
  { row: 1, col: 12, layer: 0 }, { row: 2, col: 11, layer: 0 }, { row: 3, col: 10, layer: 0 },
  
  // Leg 4 - Right (layer 0)
  { row: 5, col: 12, layer: 0 }, { row: 5, col: 11, layer: 0 }, { row: 5, col: 10, layer: 0 },
  
  // Leg 5 - Bottom right (layer 0)
  { row: 9, col: 12, layer: 0 }, { row: 8, col: 11, layer: 0 }, { row: 7, col: 10, layer: 0 },
  
  // Leg 6 - Bottom (layer 0)
  { row: 9, col: 7, layer: 0 }, { row: 8, col: 7, layer: 0 }, { row: 7, col: 7, layer: 0 },
  
  // Leg 7 - Bottom left (layer 0)
  { row: 9, col: 2, layer: 0 }, { row: 8, col: 3, layer: 0 }, { row: 7, col: 4, layer: 0 },
  
  // Leg 8 - Left (layer 0)
  { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 }, { row: 5, col: 4, layer: 0 },
  
  // Body connections (layer 0)
  { row: 4, col: 5, layer: 0 }, { row: 4, col: 9, layer: 0 },
  { row: 6, col: 5, layer: 0 }, { row: 6, col: 9, layer: 0 },
  { row: 3, col: 7, layer: 0 }, { row: 7, col: 7, layer: 0 },
  
  // Upper body (layer 2)
  { row: 4, col: 7, layer: 2 }, { row: 5, col: 7, layer: 2 }, { row: 6, col: 7, layer: 2 }
];

// Cross layout - Large layered cross (48 tiles, 24 pairs)
const crossHardPositions: TilePosition[] = [
  // Horizontal bar - Base layer (layer 0)
  { row: 4, col: 1, layer: 0 }, { row: 4, col: 2, layer: 0 }, { row: 4, col: 3, layer: 0 },
  { row: 4, col: 4, layer: 0 }, { row: 4, col: 5, layer: 0 }, { row: 4, col: 6, layer: 0 },
  { row: 4, col: 7, layer: 0 }, { row: 4, col: 8, layer: 0 }, { row: 4, col: 9, layer: 0 },
  { row: 4, col: 10, layer: 0 }, { row: 4, col: 11, layer: 0 }, { row: 4, col: 12, layer: 0 },
  
  { row: 5, col: 1, layer: 0 }, { row: 5, col: 2, layer: 0 }, { row: 5, col: 3, layer: 0 },
  { row: 5, col: 4, layer: 0 }, { row: 5, col: 5, layer: 0 }, { row: 5, col: 6, layer: 0 },
  { row: 5, col: 7, layer: 0 }, { row: 5, col: 8, layer: 0 }, { row: 5, col: 9, layer: 0 },
  { row: 5, col: 10, layer: 0 }, { row: 5, col: 11, layer: 0 }, { row: 5, col: 12, layer: 0 },
  
  // Vertical bar - Base layer (layer 0)
  { row: 1, col: 6, layer: 0 }, { row: 1, col: 7, layer: 0 },
  { row: 2, col: 6, layer: 0 }, { row: 2, col: 7, layer: 0 },
  { row: 3, col: 6, layer: 0 }, { row: 3, col: 7, layer: 0 },
  { row: 6, col: 6, layer: 0 }, { row: 6, col: 7, layer: 0 },
  { row: 7, col: 6, layer: 0 }, { row: 7, col: 7, layer: 0 },
  { row: 8, col: 6, layer: 0 }, { row: 8, col: 7, layer: 0 },
  
  // Center intersection (layer 1)
  { row: 4, col: 6, layer: 1 }, { row: 4, col: 7, layer: 1 },
  { row: 5, col: 6, layer: 1 }, { row: 5, col: 7, layer: 1 },
  
  // Layer 1 horizontal extensions
  { row: 4, col: 4, layer: 1 }, { row: 4, col: 5, layer: 1 }, { row: 4, col: 8, layer: 1 }, { row: 4, col: 9, layer: 1 },
  { row: 5, col: 4, layer: 1 }, { row: 5, col: 5, layer: 1 }, { row: 5, col: 8, layer: 1 }, { row: 5, col: 9, layer: 1 },
  
  // Layer 1 vertical extensions
  { row: 2, col: 6, layer: 1 }, { row: 2, col: 7, layer: 1 },
  { row: 3, col: 6, layer: 1 }, { row: 3, col: 7, layer: 1 },
  { row: 6, col: 6, layer: 1 }, { row: 6, col: 7, layer: 1 },
  { row: 7, col: 6, layer: 1 }, { row: 7, col: 7, layer: 1 }
];

// Fortress layout - Complex castle with multiple towers (48 tiles, 24 pairs)
const fortressHardPositions: TilePosition[] = [
  // Main wall foundation (layer 0)
  { row: 6, col: 2, layer: 0 }, { row: 6, col: 3, layer: 0 }, { row: 6, col: 4, layer: 0 },
  { row: 6, col: 5, layer: 0 }, { row: 6, col: 6, layer: 0 }, { row: 6, col: 7, layer: 0 },
  { row: 6, col: 8, layer: 0 }, { row: 6, col: 9, layer: 0 }, { row: 6, col: 10, layer: 0 },
  { row: 6, col: 11, layer: 0 }, { row: 6, col: 12, layer: 0 },
  
  // Side walls (layer 0)
  { row: 5, col: 2, layer: 0 }, { row: 4, col: 2, layer: 0 }, { row: 3, col: 2, layer: 0 },
  { row: 5, col: 12, layer: 0 }, { row: 4, col: 12, layer: 0 }, { row: 3, col: 12, layer: 0 },
  
  // Main wall level 1 (layer 1)
  { row: 5, col: 3, layer: 1 }, { row: 5, col: 4, layer: 1 }, { row: 5, col: 5, layer: 1 },
  { row: 5, col: 6, layer: 1 }, { row: 5, col: 7, layer: 1 }, { row: 5, col: 8, layer: 1 },
  { row: 5, col: 9, layer: 1 }, { row: 5, col: 10, layer: 1 }, { row: 5, col: 11, layer: 1 },
  
  // Corner towers (layer 2)
  { row: 4, col: 3, layer: 2 }, { row: 3, col: 3, layer: 2 }, { row: 2, col: 3, layer: 2 },
  { row: 4, col: 11, layer: 2 }, { row: 3, col: 11, layer: 2 }, { row: 2, col: 11, layer: 2 },
  
  // Central keep (layer 2)
  { row: 4, col: 6, layer: 2 }, { row: 4, col: 7, layer: 2 }, { row: 4, col: 8, layer: 2 },
  { row: 3, col: 6, layer: 2 }, { row: 3, col: 7, layer: 2 }, { row: 3, col: 8, layer: 2 },
  
  // Keep tower (layer 3)
  { row: 2, col: 6, layer: 3 }, { row: 2, col: 7, layer: 3 }, { row: 2, col: 8, layer: 3 },
  { row: 1, col: 7, layer: 3 },
  
  // Gatehouse (layer 1)
  { row: 5, col: 6, layer: 1 }, { row: 5, col: 8, layer: 1 }
];

export const MAHJONG_LAYOUTS: MahjongLayout[] = [
  // EASY LAYOUTS (24 tiles, 12 pairs)
  {
    name: 'turtle-small',
    difficulty: 'easy',
    positions: turtleSmallPositions,
    maxLayers: 2
  },
  {
    name: 'house-easy',
    difficulty: 'easy',
    positions: houseEasyPositions,
    maxLayers: 2
  },
  {
    name: 'flower-easy',
    difficulty: 'easy',
    positions: flowerEasyPositions,
    maxLayers: 2
  },
  {
    name: 'car-easy',
    difficulty: 'easy',
    positions: carEasyPositions,
    maxLayers: 2
  },

  // MEDIUM LAYOUTS (36 tiles, 18 pairs)
  {
    name: 'turtle-medium',
    difficulty: 'medium',
    positions: turtleMediumPositions,
    maxLayers: 4
  },
  {
    name: 'butterfly-medium',
    difficulty: 'medium',
    positions: butterflyMediumPositions,
    maxLayers: 3
  },
  {
    name: 'bridge-medium',
    difficulty: 'medium',
    positions: bridgeMediumPositions,
    maxLayers: 3
  },
  {
    name: 'castle-medium',
    difficulty: 'medium',
    positions: castleMediumPositions,
    maxLayers: 3
  },

  // HARD LAYOUTS (48 tiles, 24 pairs)
  {
    name: 'turtle-large',
    difficulty: 'hard',
    positions: turtleLargePositions,
    maxLayers: 5
  },
  {
    name: 'spider-hard',
    difficulty: 'hard',
    positions: spiderHardPositions,
    maxLayers: 3
  },
  {
    name: 'cross-hard',
    difficulty: 'hard',
    positions: crossHardPositions,
    maxLayers: 4
  },
  {
    name: 'fortress-hard',
    difficulty: 'hard',
    positions: fortressHardPositions,
    maxLayers: 4
  }
];;

export function getLayoutByName(name: string): MahjongLayout | undefined {
  return MAHJONG_LAYOUTS.find(layout => layout.name === name);
}

export function getLayoutByDifficulty(difficulty: string): MahjongLayout | undefined {
  return MAHJONG_LAYOUTS.find(layout => layout.difficulty === difficulty);
}

export function getLayoutsByDifficulty(difficulty: string): MahjongLayout[] {
  return MAHJONG_LAYOUTS.filter(layout => layout.difficulty === difficulty);
}

export function getRandomLayoutByDifficulty(difficulty: string): MahjongLayout | undefined {
  const layouts = getLayoutsByDifficulty(difficulty);
  if (layouts.length === 0) {
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * layouts.length);
  return layouts[randomIndex];
}

export function getAllAvailableLayouts(): MahjongLayout[] {
  return [...MAHJONG_LAYOUTS];
}

export function getLayoutsByDifficultyCount(difficulty: string): number {
  return getLayoutsByDifficulty(difficulty).length;
}
