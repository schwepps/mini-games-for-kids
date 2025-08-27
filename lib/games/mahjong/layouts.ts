/**
 * Legacy Mahjong Layouts File - Refactored Entry Point
 * 
 * BEFORE: 902 lines with massive SOLID violations
 * AFTER: Clean re-export from modular layout system
 * 
 * This file now serves as the main entry point, delegating to the
 * new clean architecture in ./layouts/ directory
 */

// Re-export everything from the new layout system
export {
  // Layout system services  
  layoutRegistry,
  layoutSelector,
  LayoutRegistry,
  LayoutSelector,
  
  // Layout interfaces
  type ILayoutRegistry,
  type ILayoutSelector,
  type ILayoutSelectionStrategy,
  
  // Selection strategies
  RandomSelectionStrategy,
  SequentialSelectionStrategy,
  
  // All layout objects
  TURTLE_FORMATION,
  TOWER_FORMATION,  
  PYRAMID_FORMATION,
  DIAMOND_SQUARE,
  CROSS_SQUARE,
  FRAME_SQUARE,
  STEPPED_SQUARE,
  CORNER_SQUARE,
  WINDMILL_SQUARE,
  MAZE_SQUARE,
  FORTRESS_SQUARE,
  SPIRAL_SQUARE,
  
  // Legacy API functions
  getRandomLayoutByDifficulty,
  getAllLayouts
} from './layouts/index';