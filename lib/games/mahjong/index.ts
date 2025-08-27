/**
 * Mahjong Game Library - Clean Architecture Export
 * 
 * Following Single Responsibility Principle:
 * - Each class has one focused responsibility
 * - Main generator orchestrates sub-classes
 * - Clear separation of concerns
 */

export { MahjongGenerator } from './generator';

export { MahjongBoardGenerator } from './MahjongBoardGenerator';
export { MahjongLayoutCalculator } from './MahjongLayoutCalculator';
export { MahjongSolvabilityValidator } from './MahjongSolvabilityValidator';
export { DeviceLayoutOptimizer } from './DeviceLayoutOptimizer';


export { 
  TURTLE_FORMATION, 
  DIAMOND_SQUARE, 
  CROSS_SQUARE, 
  FRAME_SQUARE,
  TOWER_FORMATION, 
  STEPPED_SQUARE, 
  CORNER_SQUARE, 
  WINDMILL_SQUARE,
  PYRAMID_FORMATION,
  MAZE_SQUARE, 
  FORTRESS_SQUARE, 
  SPIRAL_SQUARE,
  getRandomLayoutByDifficulty,
  getAllLayouts 
} from './layouts';

export type { LayerConfiguration } from './DeviceLayoutOptimizer';