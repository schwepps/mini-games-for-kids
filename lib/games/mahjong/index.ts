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

// Layout generation
export { AdaptiveLayoutGenerator } from './adaptiveLayoutGenerator';
export type { AdaptiveLayoutConfig } from './adaptiveLayoutGenerator';

// Static layouts and patterns
export { 
  TURTLE_FORMATION, 
  TOWER_FORMATION, 
  PYRAMID_FORMATION,
  getRandomLayoutByDifficulty,
  getAllLayouts 
} from './layouts';

// Types (re-export for convenience)
export type { LayerConfiguration } from './DeviceLayoutOptimizer';