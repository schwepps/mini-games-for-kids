/**
 * Mahjong Game Library - Clean Architecture Export
 * 
 * Following Single Responsibility Principle:
 * - Each class has one focused responsibility
 * - Main generator orchestrates sub-classes
 * - Clear separation of concerns
 */

// Main orchestrator (public API)
export { MahjongGenerator } from './generator';

// Focused sub-classes (can be used independently)
export { MahjongBoardGenerator } from './MahjongBoardGenerator';
export { MahjongLayoutCalculator } from './MahjongLayoutCalculator';
export { MahjongSolvabilityValidator } from './MahjongSolvabilityValidator';
export { DeviceLayoutOptimizer } from './DeviceLayoutOptimizer';


// Static layouts (12 square formations for randomized gameplay)
export { 
  // Easy difficulty layouts
  TURTLE_FORMATION, 
  DIAMOND_SQUARE, 
  CROSS_SQUARE, 
  FRAME_SQUARE,
  // Medium difficulty layouts
  TOWER_FORMATION, 
  STEPPED_SQUARE, 
  CORNER_SQUARE, 
  WINDMILL_SQUARE,
  // Hard difficulty layouts
  PYRAMID_FORMATION,
  MAZE_SQUARE, 
  FORTRESS_SQUARE, 
  SPIRAL_SQUARE,
  // Layout selection utilities
  getRandomLayoutByDifficulty,
  getAllLayouts 
} from './layouts';

// Types (re-export for convenience)
export type { LayerConfiguration } from './DeviceLayoutOptimizer';