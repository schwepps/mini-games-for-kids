/**
 * Mahjong Layouts Module - Clean Architecture Implementation
 * 
 * This module demonstrates SOLID principles:
 * - Single Responsibility: Each layout file has one layout
 * - Open/Closed: Easy to add new layouts without modifying existing code
 * - Liskov Substitution: All layouts implement same interface
 * - Interface Segregation: Focused interfaces for specific needs
 * - Dependency Inversion: Components depend on layout interfaces
 */

import { MahjongLayout, TilePosition } from '@/types/mahjong';

// Import formation layouts
import { TURTLE_FORMATION } from './formation/TurtleLayout';
import { TOWER_FORMATION } from './formation/TowerLayout';
import { PYRAMID_FORMATION } from './formation/PyramidLayout';

// Import square layouts (extracted)
import { DIAMOND_SQUARE } from './square/DiamondSquareLayout';

// Import services
import { layoutRegistry, LayoutRegistry, ILayoutRegistry } from './LayoutRegistry';
import { 
  LayoutSelector, 
  ILayoutSelector, 
  ILayoutSelectionStrategy,
  RandomSelectionStrategy,
  SequentialSelectionStrategy 
} from './LayoutSelector';

// Temporary layout definitions (will be moved to individual files)
const crossSquarePositions: TilePosition[] = [
  // Vertical arm of cross - top section
  { x: 150, y: 0, layer: 0, id: 'c1' },
  { x: 180, y: 0, layer: 0, id: 'c2' },
  { x: 210, y: 0, layer: 0, id: 'c3' },
  { x: 150, y: 30, layer: 0, id: 'c4' },
  { x: 180, y: 30, layer: 0, id: 'c5' },
  { x: 210, y: 30, layer: 0, id: 'c6' },
  { x: 150, y: 60, layer: 0, id: 'c7' },
  { x: 180, y: 60, layer: 0, id: 'c8' },
  { x: 210, y: 60, layer: 0, id: 'c9' },
  
  // Horizontal arm of cross
  { x: 30, y: 150, layer: 0, id: 'c10' },
  { x: 60, y: 150, layer: 0, id: 'c11' },
  { x: 90, y: 150, layer: 0, id: 'c12' },
  { x: 120, y: 150, layer: 0, id: 'c13' },
  { x: 240, y: 150, layer: 0, id: 'c14' },
  { x: 270, y: 150, layer: 0, id: 'c15' },
  { x: 300, y: 150, layer: 0, id: 'c16' },
  { x: 330, y: 150, layer: 0, id: 'c17' },
  
  // Vertical arm of cross - bottom section
  { x: 150, y: 240, layer: 0, id: 'c18' },
  { x: 180, y: 240, layer: 0, id: 'c19' },
  { x: 210, y: 240, layer: 0, id: 'c20' },
  { x: 150, y: 270, layer: 0, id: 'c21' },
  { x: 180, y: 270, layer: 0, id: 'c22' },
  { x: 210, y: 270, layer: 0, id: 'c23' },
  { x: 150, y: 300, layer: 0, id: 'c24' },
  { x: 180, y: 300, layer: 0, id: 'c25' },
  { x: 210, y: 300, layer: 0, id: 'c26' },
  
  { x: 150, y: 90, layer: 1, id: 'c27', supportedBy: ['c7', 'c8'] },
  { x: 180, y: 90, layer: 1, id: 'c28', supportedBy: ['c8', 'c9'] },
  { x: 210, y: 90, layer: 1, id: 'c29', supportedBy: ['c9', 'c13'] },
  
  { x: 90, y: 120, layer: 1, id: 'c30', supportedBy: ['c11', 'c12'] },
  { x: 120, y: 120, layer: 1, id: 'c31', supportedBy: ['c12', 'c13'] },
  { x: 240, y: 120, layer: 1, id: 'c32', supportedBy: ['c14', 'c15'] },
  { x: 270, y: 120, layer: 1, id: 'c33', supportedBy: ['c15', 'c16'] },
  
  { x: 90, y: 180, layer: 1, id: 'c34', supportedBy: ['c11', 'c12'] },
  { x: 120, y: 180, layer: 1, id: 'c35', supportedBy: ['c12', 'c13'] },
  { x: 240, y: 180, layer: 1, id: 'c36', supportedBy: ['c14', 'c15'] },
  { x: 270, y: 180, layer: 1, id: 'c37', supportedBy: ['c15', 'c16'] },
  
  { x: 150, y: 210, layer: 1, id: 'c38', supportedBy: ['c18', 'c19'] },
  { x: 180, y: 210, layer: 1, id: 'c39', supportedBy: ['c19', 'c20'] },
  { x: 210, y: 210, layer: 1, id: 'c40', supportedBy: ['c20', 'c14'] },
  { x: 180, y: 120, layer: 1, id: 'c41', supportedBy: ['c13', 'c14'] },
  { x: 180, y: 180, layer: 1, id: 'c42', supportedBy: ['c13', 'c14'] },
  
  { x: 120, y: 150, layer: 2, id: 'c43', supportedBy: ['c31', 'c35'] },
  { x: 150, y: 120, layer: 2, id: 'c44', supportedBy: ['c27', 'c41'] },
  { x: 180, y: 150, layer: 2, id: 'c45', supportedBy: ['c28', 'c41'] },
  { x: 210, y: 120, layer: 2, id: 'c46', supportedBy: ['c29', 'c32'] },
  { x: 240, y: 150, layer: 2, id: 'c47', supportedBy: ['c32', 'c36'] },
  { x: 150, y: 180, layer: 2, id: 'c48', supportedBy: ['c38', 'c42'] },
];

const CROSS_SQUARE: MahjongLayout = {
  name: 'Cross Square',
  difficulty: 'easy',
  positions: crossSquarePositions,
  maxLayers: 2
};

// Create simplified versions of remaining layouts for initial implementation
const frameSquarePositions: TilePosition[] = [
  // Top frame
  { x: 0, y: 0, layer: 0, id: 'f1' },
  { x: 60, y: 0, layer: 0, id: 'f2' },
  { x: 120, y: 0, layer: 0, id: 'f3' },
  { x: 180, y: 0, layer: 0, id: 'f4' },
  { x: 240, y: 0, layer: 0, id: 'f5' },
  { x: 300, y: 0, layer: 0, id: 'f6' },
  
  // Left and right frame sides
  { x: 0, y: 60, layer: 0, id: 'f7' },
  { x: 300, y: 60, layer: 0, id: 'f8' },
  { x: 0, y: 120, layer: 0, id: 'f9' },
  { x: 300, y: 120, layer: 0, id: 'f10' },
  { x: 0, y: 180, layer: 0, id: 'f11' },
  { x: 300, y: 180, layer: 0, id: 'f12' },
  
  // Bottom frame
  { x: 0, y: 240, layer: 0, id: 'f13' },
  { x: 60, y: 240, layer: 0, id: 'f14' },
  { x: 120, y: 240, layer: 0, id: 'f15' },
  { x: 180, y: 240, layer: 0, id: 'f16' },
  { x: 240, y: 240, layer: 0, id: 'f17' },
  { x: 300, y: 240, layer: 0, id: 'f18' },
  
  // Center cluster base
  { x: 120, y: 120, layer: 0, id: 'f19' },
  { x: 180, y: 120, layer: 0, id: 'f20' },
  { x: 120, y: 180, layer: 0, id: 'f21' },
  { x: 180, y: 180, layer: 0, id: 'f22' },
  { x: 90, y: 90, layer: 0, id: 'f23' },
  { x: 210, y: 90, layer: 0, id: 'f24' },
  
  // Inner frame
  { x: 60, y: 60, layer: 1, id: 'f25', supportedBy: ['f2', 'f7'] },
  { x: 120, y: 60, layer: 1, id: 'f26', supportedBy: ['f3', 'f23'] },
  { x: 180, y: 60, layer: 1, id: 'f27', supportedBy: ['f4', 'f24'] },
  { x: 240, y: 60, layer: 1, id: 'f28', supportedBy: ['f5', 'f8'] },
  
  { x: 60, y: 120, layer: 1, id: 'f29', supportedBy: ['f7', 'f9'] },
  { x: 240, y: 120, layer: 1, id: 'f30', supportedBy: ['f8', 'f10'] },
  
  { x: 60, y: 180, layer: 1, id: 'f31', supportedBy: ['f9', 'f11'] },
  { x: 240, y: 180, layer: 1, id: 'f32', supportedBy: ['f10', 'f12'] },
  
  { x: 60, y: 240, layer: 1, id: 'f33', supportedBy: ['f13', 'f14'] },
  { x: 120, y: 200, layer: 1, id: 'f34', supportedBy: ['f15', 'f21'] },
  { x: 180, y: 200, layer: 1, id: 'f35', supportedBy: ['f16', 'f22'] },
  { x: 240, y: 200, layer: 1, id: 'f36', supportedBy: ['f17', 'f18'] },
  
  // Center cluster elevated
  { x: 90, y: 120, layer: 1, id: 'f37', supportedBy: ['f19', 'f23'] },
  { x: 150, y: 120, layer: 1, id: 'f38', supportedBy: ['f19', 'f20'] },
  { x: 210, y: 120, layer: 1, id: 'f39', supportedBy: ['f20', 'f24'] },
  { x: 150, y: 180, layer: 1, id: 'f40', supportedBy: ['f21', 'f22'] },
  
  { x: 90, y: 90, layer: 2, id: 'f41', supportedBy: ['f25', 'f26'] },
  { x: 150, y: 90, layer: 2, id: 'f42', supportedBy: ['f26', 'f27'] },
  { x: 210, y: 90, layer: 2, id: 'f43', supportedBy: ['f27', 'f28'] },
  
  { x: 90, y: 150, layer: 2, id: 'f44', supportedBy: ['f29', 'f37'] },
  { x: 150, y: 150, layer: 2, id: 'f45', supportedBy: ['f38', 'f40'] },
  { x: 210, y: 150, layer: 2, id: 'f46', supportedBy: ['f30', 'f39'] },
  
  { x: 120, y: 120, layer: 2, id: 'f47', supportedBy: ['f37', 'f38'] },
  { x: 180, y: 150, layer: 2, id: 'f48', supportedBy: ['f38', 'f39'] }
];

const FRAME_SQUARE: MahjongLayout = {
  name: 'Frame Square',
  difficulty: 'easy',
  positions: frameSquarePositions,
  maxLayers: 3
};

const steppedSquarePositions: TilePosition[] = [
  // Outer perimeter
  { x: 0, y: 0, layer: 0, id: 'st1' },
  { x: 60, y: 0, layer: 0, id: 'st2' },
  { x: 120, y: 0, layer: 0, id: 'st3' },
  { x: 180, y: 0, layer: 0, id: 'st4' },
  { x: 240, y: 0, layer: 0, id: 'st5' },
  { x: 300, y: 0, layer: 0, id: 'st6' },
  
  { x: 0, y: 60, layer: 0, id: 'st7' },
  { x: 300, y: 60, layer: 0, id: 'st8' },
  { x: 0, y: 120, layer: 0, id: 'st9' },
  { x: 300, y: 120, layer: 0, id: 'st10' },
  { x: 0, y: 180, layer: 0, id: 'st11' },
  { x: 300, y: 180, layer: 0, id: 'st12' },
  { x: 0, y: 240, layer: 0, id: 'st13' },
  { x: 300, y: 240, layer: 0, id: 'st14' },
  
  { x: 0, y: 300, layer: 0, id: 'st15' },
  { x: 60, y: 300, layer: 0, id: 'st16' },
  { x: 120, y: 300, layer: 0, id: 'st17' },
  { x: 180, y: 300, layer: 0, id: 'st18' },
  { x: 240, y: 300, layer: 0, id: 'st19' },
  { x: 300, y: 300, layer: 0, id: 'st20' },
  
  { x: 60, y: 60, layer: 1, id: 'st21', supportedBy: ['st2', 'st7'] },
  { x: 120, y: 60, layer: 1, id: 'st22', supportedBy: ['st3', 'st4'] },
  { x: 180, y: 60, layer: 1, id: 'st23', supportedBy: ['st4', 'st5'] },
  { x: 240, y: 60, layer: 1, id: 'st24', supportedBy: ['st5', 'st8'] },
  
  { x: 60, y: 120, layer: 1, id: 'st25', supportedBy: ['st7', 'st9'] },
  { x: 240, y: 120, layer: 1, id: 'st26', supportedBy: ['st8', 'st10'] },
  { x: 60, y: 180, layer: 1, id: 'st27', supportedBy: ['st9', 'st11'] },
  { x: 240, y: 180, layer: 1, id: 'st28', supportedBy: ['st10', 'st12'] },
  
  { x: 60, y: 240, layer: 1, id: 'st29', supportedBy: ['st11', 'st13'] },
  { x: 120, y: 240, layer: 1, id: 'st30', supportedBy: ['st16', 'st17'] },
  { x: 180, y: 240, layer: 1, id: 'st31', supportedBy: ['st17', 'st18'] },
  { x: 240, y: 240, layer: 1, id: 'st32', supportedBy: ['st12', 'st14'] },
  
  // Corner supports
  { x: 90, y: 90, layer: 1, id: 'st33', supportedBy: ['st21', 'st22'] },
  { x: 210, y: 90, layer: 1, id: 'st34', supportedBy: ['st23', 'st24'] },
  { x: 90, y: 210, layer: 1, id: 'st35', supportedBy: ['st29', 'st30'] },
  { x: 210, y: 210, layer: 1, id: 'st36', supportedBy: ['st31', 'st32'] },
  
  { x: 120, y: 120, layer: 2, id: 'st37', supportedBy: ['st22', 'st25'] },
  { x: 180, y: 120, layer: 2, id: 'st38', supportedBy: ['st23', 'st26'] },
  { x: 120, y: 180, layer: 2, id: 'st39', supportedBy: ['st25', 'st27'] },
  { x: 180, y: 180, layer: 2, id: 'st40', supportedBy: ['st26', 'st28'] },
  
  { x: 90, y: 150, layer: 2, id: 'st41', supportedBy: ['st33', 'st35'] },
  { x: 150, y: 90, layer: 2, id: 'st42', supportedBy: ['st33', 'st34'] },
  { x: 210, y: 150, layer: 2, id: 'st43', supportedBy: ['st34', 'st36'] },
  { x: 150, y: 210, layer: 2, id: 'st44', supportedBy: ['st35', 'st36'] },
  
  { x: 120, y: 150, layer: 3, id: 'st45', supportedBy: ['st37', 'st39'] },
  { x: 150, y: 120, layer: 3, id: 'st46', supportedBy: ['st37', 'st38'] },
  { x: 180, y: 150, layer: 3, id: 'st47', supportedBy: ['st38', 'st40'] },
  { x: 150, y: 180, layer: 3, id: 'st48', supportedBy: ['st39', 'st40'] }
];

const STEPPED_SQUARE: MahjongLayout = {
  name: 'Stepped Square', 
  difficulty: 'medium',
  positions: steppedSquarePositions,
  maxLayers: 4
};

const cornerSquarePositions: TilePosition[] = [
  // Top-left corner cluster
  { x: 0, y: 0, layer: 0, id: 'co1' },
  { x: 60, y: 0, layer: 0, id: 'co2' },
  { x: 120, y: 0, layer: 0, id: 'co3' },
  { x: 0, y: 60, layer: 0, id: 'co4' },
  { x: 60, y: 60, layer: 0, id: 'co5' },
  { x: 0, y: 120, layer: 0, id: 'co6' },
  
  // Top-right corner cluster
  { x: 240, y: 0, layer: 0, id: 'co7' },
  { x: 300, y: 0, layer: 0, id: 'co8' },
  { x: 360, y: 0, layer: 0, id: 'co9' },
  { x: 300, y: 60, layer: 0, id: 'co10' },
  { x: 360, y: 60, layer: 0, id: 'co11' },
  { x: 360, y: 120, layer: 0, id: 'co12' },
  
  // Bottom-left corner cluster
  { x: 0, y: 240, layer: 0, id: 'co13' },
  { x: 0, y: 300, layer: 0, id: 'co14' },
  { x: 0, y: 360, layer: 0, id: 'co15' },
  { x: 60, y: 300, layer: 0, id: 'co16' },
  { x: 60, y: 360, layer: 0, id: 'co17' },
  { x: 120, y: 360, layer: 0, id: 'co18' },
  
  // Bottom-right corner cluster
  { x: 240, y: 360, layer: 0, id: 'co19' },
  { x: 300, y: 300, layer: 0, id: 'co20' },
  { x: 300, y: 360, layer: 0, id: 'co21' },
  { x: 360, y: 240, layer: 0, id: 'co22' },
  { x: 360, y: 300, layer: 0, id: 'co23' },
  { x: 360, y: 360, layer: 0, id: 'co24' },
  
  // Bridges from corners toward center
  { x: 90, y: 30, layer: 1, id: 'co25', supportedBy: ['co2', 'co3'] },
  { x: 120, y: 30, layer: 1, id: 'co26', supportedBy: ['co3', 'co7'] },
  { x: 270, y: 30, layer: 1, id: 'co27', supportedBy: ['co7', 'co8'] },
  { x: 300, y: 30, layer: 1, id: 'co28', supportedBy: ['co8', 'co9'] },
  
  { x: 30, y: 90, layer: 1, id: 'co29', supportedBy: ['co4', 'co5'] },
  { x: 30, y: 150, layer: 1, id: 'co30', supportedBy: ['co5', 'co6'] },
  { x: 330, y: 90, layer: 1, id: 'co31', supportedBy: ['co10', 'co11'] },
  { x: 330, y: 150, layer: 1, id: 'co32', supportedBy: ['co11', 'co12'] },
  
  { x: 30, y: 270, layer: 1, id: 'co33', supportedBy: ['co13', 'co16'] },
  { x: 60, y: 270, layer: 1, id: 'co34', supportedBy: ['co16', 'co17'] },
  { x: 330, y: 270, layer: 1, id: 'co35', supportedBy: ['co20', 'co22'] },
  { x: 300, y: 270, layer: 1, id: 'co36', supportedBy: ['co20', 'co21'] },
  
  { x: 90, y: 330, layer: 1, id: 'co37', supportedBy: ['co16', 'co17'] },
  { x: 150, y: 330, layer: 1, id: 'co38', supportedBy: ['co17', 'co18'] },
  { x: 270, y: 330, layer: 1, id: 'co39', supportedBy: ['co19', 'co21'] },
  { x: 210, y: 330, layer: 1, id: 'co40', supportedBy: ['co19', 'co39'] },
  
  { x: 120, y: 90, layer: 2, id: 'co41', supportedBy: ['co25', 'co26'] },
  { x: 240, y: 90, layer: 2, id: 'co42', supportedBy: ['co27', 'co28'] },
  { x: 90, y: 120, layer: 2, id: 'co43', supportedBy: ['co29', 'co30'] },
  { x: 270, y: 120, layer: 2, id: 'co44', supportedBy: ['co31', 'co32'] },
  { x: 90, y: 240, layer: 2, id: 'co45', supportedBy: ['co33', 'co34'] },
  { x: 270, y: 240, layer: 2, id: 'co46', supportedBy: ['co35', 'co36'] },
  { x: 120, y: 270, layer: 2, id: 'co47', supportedBy: ['co37', 'co38'] },
  { x: 240, y: 270, layer: 2, id: 'co48', supportedBy: ['co39', 'co40'] }
];

const CORNER_SQUARE: MahjongLayout = {
  name: 'Corner Square',
  difficulty: 'medium', 
  positions: cornerSquarePositions,
  maxLayers: 3
};

const windmillSquarePositions: TilePosition[] = [
  // North arm
  { x: 150, y: 0, layer: 0, id: 'w1' },
  { x: 180, y: 0, layer: 0, id: 'w2' },
  { x: 210, y: 0, layer: 0, id: 'w3' },
  { x: 180, y: 30, layer: 0, id: 'w4' },
  { x: 210, y: 30, layer: 0, id: 'w5' },
  
  // East arm
  { x: 330, y: 120, layer: 0, id: 'w6' },
  { x: 360, y: 120, layer: 0, id: 'w7' },
  { x: 360, y: 150, layer: 0, id: 'w8' },
  { x: 330, y: 180, layer: 0, id: 'w9' },
  { x: 360, y: 180, layer: 0, id: 'w10' },
  
  // South arm
  { x: 150, y: 330, layer: 0, id: 'w11' },
  { x: 180, y: 330, layer: 0, id: 'w12' },
  { x: 180, y: 360, layer: 0, id: 'w13' },
  { x: 150, y: 360, layer: 0, id: 'w14' },
  { x: 120, y: 330, layer: 0, id: 'w15' },
  
  // West arm
  { x: 0, y: 150, layer: 0, id: 'w16' },
  { x: 30, y: 150, layer: 0, id: 'w17' },
  { x: 0, y: 180, layer: 0, id: 'w18' },
  { x: 30, y: 180, layer: 0, id: 'w19' },
  { x: 30, y: 210, layer: 0, id: 'w20' },
  
  { x: 120, y: 60, layer: 1, id: 'w21', supportedBy: ['w1', 'w4'] },
  { x: 150, y: 60, layer: 1, id: 'w22', supportedBy: ['w2', 'w4'] },
  { x: 180, y: 60, layer: 1, id: 'w23', supportedBy: ['w4', 'w5'] },
  { x: 240, y: 60, layer: 1, id: 'w24', supportedBy: ['w5', 'w6'] },
  
  { x: 270, y: 90, layer: 1, id: 'w25', supportedBy: ['w6', 'w7'] },
  { x: 270, y: 120, layer: 1, id: 'w26', supportedBy: ['w7', 'w8'] },
  { x: 270, y: 150, layer: 1, id: 'w27', supportedBy: ['w8', 'w9'] },
  { x: 270, y: 210, layer: 1, id: 'w28', supportedBy: ['w9', 'w10'] },
  
  { x: 240, y: 270, layer: 1, id: 'w29', supportedBy: ['w10', 'w11'] },
  { x: 210, y: 270, layer: 1, id: 'w30', supportedBy: ['w11', 'w12'] },
  { x: 180, y: 270, layer: 1, id: 'w31', supportedBy: ['w12', 'w13'] },
  { x: 120, y: 270, layer: 1, id: 'w32', supportedBy: ['w14', 'w15'] },
  
  { x: 90, y: 240, layer: 1, id: 'w33', supportedBy: ['w15', 'w16'] },
  { x: 90, y: 210, layer: 1, id: 'w34', supportedBy: ['w16', 'w17'] },
  { x: 90, y: 180, layer: 1, id: 'w35', supportedBy: ['w17', 'w18'] },
  { x: 90, y: 120, layer: 1, id: 'w36', supportedBy: ['w19', 'w20'] },
  
  { x: 150, y: 90, layer: 2, id: 'w37', supportedBy: ['w21', 'w22'] },
  { x: 210, y: 90, layer: 2, id: 'w38', supportedBy: ['w23', 'w24'] },
  { x: 240, y: 150, layer: 2, id: 'w39', supportedBy: ['w25', 'w26'] },
  { x: 240, y: 210, layer: 2, id: 'w40', supportedBy: ['w27', 'w28'] },
  { x: 180, y: 240, layer: 2, id: 'w41', supportedBy: ['w29', 'w30'] },
  { x: 120, y: 240, layer: 2, id: 'w42', supportedBy: ['w31', 'w32'] },
  { x: 120, y: 180, layer: 2, id: 'w43', supportedBy: ['w33', 'w34'] },
  { x: 120, y: 120, layer: 2, id: 'w44', supportedBy: ['w35', 'w36'] },
  
  { x: 150, y: 120, layer: 3, id: 'w45', supportedBy: ['w37', 'w44'] },
  { x: 180, y: 150, layer: 3, id: 'w46', supportedBy: ['w38', 'w39'] },
  { x: 210, y: 180, layer: 3, id: 'w47', supportedBy: ['w40', 'w41'] },
  { x: 150, y: 210, layer: 3, id: 'w48', supportedBy: ['w42', 'w43'] }
];

const WINDMILL_SQUARE: MahjongLayout = {
  name: 'Windmill Square',
  difficulty: 'medium',
  positions: windmillSquarePositions,
  maxLayers: 4
};

const mazeSquarePositions: TilePosition[] = [
  // Outer maze walls
  { x: 0, y: 0, layer: 0, id: 'm1' },
  { x: 60, y: 0, layer: 0, id: 'm2' },
  { x: 120, y: 0, layer: 0, id: 'm3' },
  { x: 180, y: 0, layer: 0, id: 'm4' },
  { x: 240, y: 0, layer: 0, id: 'm5' },
  { x: 300, y: 0, layer: 0, id: 'm6' },
  
  { x: 0, y: 60, layer: 0, id: 'm7' },
  { x: 300, y: 60, layer: 0, id: 'm8' },
  { x: 0, y: 120, layer: 0, id: 'm9' },
  { x: 300, y: 120, layer: 0, id: 'm10' },
  { x: 0, y: 180, layer: 0, id: 'm11' },
  { x: 300, y: 180, layer: 0, id: 'm12' },
  
  { x: 0, y: 240, layer: 0, id: 'm13' },
  { x: 60, y: 240, layer: 0, id: 'm14' },
  { x: 120, y: 240, layer: 0, id: 'm15' },
  { x: 180, y: 240, layer: 0, id: 'm16' },
  { x: 240, y: 240, layer: 0, id: 'm17' },
  { x: 300, y: 240, layer: 0, id: 'm18' },
  
  // Internal maze walls creating pathways
  { x: 60, y: 60, layer: 0, id: 'm19' },
  { x: 120, y: 60, layer: 0, id: 'm20' },
  { x: 240, y: 60, layer: 0, id: 'm21' },
  { x: 60, y: 180, layer: 0, id: 'm22' },
  { x: 180, y: 180, layer: 0, id: 'm23' },
  { x: 240, y: 180, layer: 0, id: 'm24' },
  
  { x: 30, y: 30, layer: 1, id: 'm25', supportedBy: ['m1', 'm2'] },
  { x: 90, y: 30, layer: 1, id: 'm26', supportedBy: ['m2', 'm3'] },
  { x: 150, y: 30, layer: 1, id: 'm27', supportedBy: ['m3', 'm4'] },
  { x: 210, y: 30, layer: 1, id: 'm28', supportedBy: ['m4', 'm5'] },
  { x: 270, y: 30, layer: 1, id: 'm29', supportedBy: ['m5', 'm6'] },
  
  { x: 30, y: 90, layer: 1, id: 'm30', supportedBy: ['m7', 'm19'] },
  { x: 90, y: 90, layer: 1, id: 'm31', supportedBy: ['m19', 'm20'] },
  { x: 180, y: 90, layer: 1, id: 'm32', supportedBy: ['m20', 'm8'] },
  { x: 270, y: 90, layer: 1, id: 'm33', supportedBy: ['m8', 'm21'] },
  
  { x: 30, y: 150, layer: 1, id: 'm34', supportedBy: ['m9', 'm11'] },
  { x: 150, y: 150, layer: 1, id: 'm35', supportedBy: ['m32', 'm23'] },
  { x: 270, y: 150, layer: 1, id: 'm36', supportedBy: ['m10', 'm12'] },
  
  { x: 30, y: 210, layer: 1, id: 'm37', supportedBy: ['m22', 'm14'] },
  { x: 90, y: 210, layer: 1, id: 'm38', supportedBy: ['m14', 'm15'] },
  { x: 150, y: 210, layer: 1, id: 'm39', supportedBy: ['m15', 'm16'] },
  { x: 210, y: 210, layer: 1, id: 'm40', supportedBy: ['m16', 'm17'] },
  { x: 270, y: 210, layer: 1, id: 'm41', supportedBy: ['m17', 'm24'] },
  
  { x: 60, y: 120, layer: 2, id: 'm42', supportedBy: ['m30', 'm31'] },
  { x: 120, y: 90, layer: 2, id: 'm43', supportedBy: ['m31', 'm32'] },
  { x: 240, y: 120, layer: 2, id: 'm44', supportedBy: ['m33', 'm36'] },
  { x: 120, y: 180, layer: 2, id: 'm45', supportedBy: ['m37', 'm38'] },
  { x: 180, y: 150, layer: 2, id: 'm46', supportedBy: ['m35', 'm39'] },
  { x: 210, y: 180, layer: 2, id: 'm47', supportedBy: ['m39', 'm40'] },
  
  { x: 90, y: 150, layer: 3, id: 'm48', supportedBy: ['m42', 'm45'] },
  { x: 180, y: 120, layer: 3, id: 'm49', supportedBy: ['m43', 'm46'] }
];

const MAZE_SQUARE: MahjongLayout = {
  name: 'Maze Square',
  difficulty: 'hard',
  positions: mazeSquarePositions,
  maxLayers: 4
};

const fortressSquarePositions: TilePosition[] = [
  // Outer fortress walls
  { x: 0, y: 0, layer: 0, id: 'fo1' },
  { x: 60, y: 0, layer: 0, id: 'fo2' },
  { x: 120, y: 0, layer: 0, id: 'fo3' },
  { x: 180, y: 0, layer: 0, id: 'fo4' },
  { x: 240, y: 0, layer: 0, id: 'fo5' },
  { x: 300, y: 0, layer: 0, id: 'fo6' },
  { x: 360, y: 0, layer: 0, id: 'fo7' },
  
  { x: 0, y: 60, layer: 0, id: 'fo8' },
  { x: 360, y: 60, layer: 0, id: 'fo9' },
  { x: 0, y: 120, layer: 0, id: 'fo10' },
  { x: 360, y: 120, layer: 0, id: 'fo11' },
  { x: 0, y: 180, layer: 0, id: 'fo12' },
  { x: 360, y: 180, layer: 0, id: 'fo13' },
  { x: 0, y: 240, layer: 0, id: 'fo14' },
  { x: 360, y: 240, layer: 0, id: 'fo15' },
  
  { x: 0, y: 300, layer: 0, id: 'fo16' },
  { x: 60, y: 300, layer: 0, id: 'fo17' },
  { x: 120, y: 300, layer: 0, id: 'fo18' },
  { x: 180, y: 300, layer: 0, id: 'fo19' },
  { x: 240, y: 300, layer: 0, id: 'fo20' },
  { x: 300, y: 300, layer: 0, id: 'fo21' },
  { x: 360, y: 300, layer: 0, id: 'fo22' },
  
  // Inner defensive positions
  { x: 120, y: 120, layer: 0, id: 'fo23' },
  { x: 240, y: 120, layer: 0, id: 'fo24' },
  { x: 120, y: 180, layer: 0, id: 'fo25' },
  { x: 240, y: 180, layer: 0, id: 'fo26' },
  
  { x: 60, y: 60, layer: 1, id: 'fo27', supportedBy: ['fo2', 'fo8'] },
  { x: 120, y: 60, layer: 1, id: 'fo28', supportedBy: ['fo3', 'fo23'] },
  { x: 180, y: 60, layer: 1, id: 'fo29', supportedBy: ['fo4', 'fo5'] },
  { x: 240, y: 60, layer: 1, id: 'fo30', supportedBy: ['fo5', 'fo24'] },
  { x: 300, y: 60, layer: 1, id: 'fo31', supportedBy: ['fo6', 'fo9'] },
  
  { x: 60, y: 120, layer: 1, id: 'fo32', supportedBy: ['fo8', 'fo10'] },
  { x: 180, y: 120, layer: 1, id: 'fo33', supportedBy: ['fo23', 'fo24'] },
  { x: 300, y: 120, layer: 1, id: 'fo34', supportedBy: ['fo9', 'fo11'] },
  
  { x: 60, y: 180, layer: 1, id: 'fo35', supportedBy: ['fo10', 'fo12'] },
  { x: 180, y: 180, layer: 1, id: 'fo36', supportedBy: ['fo25', 'fo26'] },
  { x: 300, y: 180, layer: 1, id: 'fo37', supportedBy: ['fo11', 'fo13'] },
  
  { x: 60, y: 240, layer: 1, id: 'fo38', supportedBy: ['fo14', 'fo17'] },
  { x: 120, y: 240, layer: 1, id: 'fo39', supportedBy: ['fo18', 'fo25'] },
  { x: 180, y: 240, layer: 1, id: 'fo40', supportedBy: ['fo18', 'fo19'] },
  { x: 240, y: 240, layer: 1, id: 'fo41', supportedBy: ['fo20', 'fo26'] },
  { x: 300, y: 240, layer: 1, id: 'fo42', supportedBy: ['fo15', 'fo21'] },
  
  { x: 90, y: 90, layer: 2, id: 'fo43', supportedBy: ['fo27', 'fo28'] },
  { x: 150, y: 90, layer: 2, id: 'fo44', supportedBy: ['fo28', 'fo29'] },
  { x: 210, y: 90, layer: 2, id: 'fo45', supportedBy: ['fo29', 'fo30'] },
  { x: 270, y: 90, layer: 2, id: 'fo46', supportedBy: ['fo30', 'fo31'] },
  
  { x: 90, y: 210, layer: 2, id: 'fo47', supportedBy: ['fo38', 'fo39'] },
  { x: 150, y: 210, layer: 2, id: 'fo48', supportedBy: ['fo39', 'fo40'] },
  { x: 210, y: 210, layer: 2, id: 'fo49', supportedBy: ['fo40', 'fo41'] },
  { x: 270, y: 210, layer: 2, id: 'fo50', supportedBy: ['fo41', 'fo42'] },
  
  { x: 120, y: 150, layer: 3, id: 'fo51', supportedBy: ['fo43', 'fo44'] },
  { x: 180, y: 150, layer: 3, id: 'fo52', supportedBy: ['fo33', 'fo36'] },
  { x: 240, y: 150, layer: 3, id: 'fo53', supportedBy: ['fo45', 'fo46'] },
  { x: 180, y: 210, layer: 3, id: 'fo54', supportedBy: ['fo47', 'fo48'] }
];

const FORTRESS_SQUARE: MahjongLayout = {
  name: 'Fortress Square', 
  difficulty: 'hard',
  positions: fortressSquarePositions,
  maxLayers: 4
};

const spiralSquarePositions: TilePosition[] = [
  // Starting from center and spiraling outward
  { x: 180, y: 150, layer: 0, id: 's1' }, // Center start
  
  // First spiral ring
  { x: 180, y: 120, layer: 0, id: 's2' },
  { x: 210, y: 120, layer: 0, id: 's3' },
  { x: 210, y: 150, layer: 0, id: 's4' },
  { x: 210, y: 180, layer: 0, id: 's5' },
  { x: 180, y: 180, layer: 0, id: 's6' },
  { x: 150, y: 180, layer: 0, id: 's7' },
  { x: 150, y: 150, layer: 0, id: 's8' },
  { x: 150, y: 120, layer: 0, id: 's9' },
  
  // Second spiral ring
  { x: 150, y: 90, layer: 0, id: 's10' },
  { x: 180, y: 90, layer: 0, id: 's11' },
  { x: 210, y: 90, layer: 0, id: 's12' },
  { x: 240, y: 90, layer: 0, id: 's13' },
  { x: 240, y: 120, layer: 0, id: 's14' },
  { x: 240, y: 150, layer: 0, id: 's15' },
  { x: 240, y: 180, layer: 0, id: 's16' },
  { x: 240, y: 210, layer: 0, id: 's17' },
  { x: 210, y: 210, layer: 0, id: 's18' },
  { x: 180, y: 210, layer: 0, id: 's19' },
  { x: 150, y: 210, layer: 0, id: 's20' },
  { x: 120, y: 210, layer: 0, id: 's21' },
  { x: 120, y: 180, layer: 0, id: 's22' },
  { x: 120, y: 150, layer: 0, id: 's23' },
  { x: 120, y: 120, layer: 0, id: 's24' },
  { x: 120, y: 90, layer: 0, id: 's25' },
  
  { x: 90, y: 90, layer: 1, id: 's26', supportedBy: ['s10', 's25'] },
  { x: 90, y: 120, layer: 1, id: 's27', supportedBy: ['s24', 's25'] },
  { x: 90, y: 150, layer: 1, id: 's28', supportedBy: ['s22', 's23'] },
  { x: 90, y: 180, layer: 1, id: 's29', supportedBy: ['s21', 's22'] },
  { x: 90, y: 210, layer: 1, id: 's30', supportedBy: ['s20', 's21'] },
  { x: 120, y: 240, layer: 1, id: 's31', supportedBy: ['s20', 's19'] },
  { x: 150, y: 240, layer: 1, id: 's32', supportedBy: ['s19', 's18'] },
  { x: 180, y: 240, layer: 1, id: 's33', supportedBy: ['s18', 's17'] },
  { x: 210, y: 240, layer: 1, id: 's34', supportedBy: ['s17', 's16'] },
  { x: 240, y: 240, layer: 1, id: 's35', supportedBy: ['s16', 's15'] },
  { x: 270, y: 210, layer: 1, id: 's36', supportedBy: ['s15', 's14'] },
  { x: 270, y: 180, layer: 1, id: 's37', supportedBy: ['s14', 's13'] },
  { x: 270, y: 150, layer: 1, id: 's38', supportedBy: ['s13', 's12'] },
  { x: 270, y: 120, layer: 1, id: 's39', supportedBy: ['s12', 's11'] },
  { x: 270, y: 90, layer: 1, id: 's40', supportedBy: ['s11', 's10'] },
  { x: 270, y: 60, layer: 1, id: 's41', supportedBy: ['s10', 's11'] },
  
  { x: 120, y: 60, layer: 2, id: 's42', supportedBy: ['s26', 's10'] },
  { x: 60, y: 120, layer: 2, id: 's43', supportedBy: ['s26', 's27'] },
  { x: 60, y: 180, layer: 2, id: 's44', supportedBy: ['s28', 's29'] },
  { x: 120, y: 270, layer: 2, id: 's45', supportedBy: ['s30', 's31'] },
  { x: 180, y: 270, layer: 2, id: 's46', supportedBy: ['s32', 's33'] },
  { x: 240, y: 270, layer: 2, id: 's47', supportedBy: ['s34', 's35'] },
  { x: 300, y: 180, layer: 2, id: 's48', supportedBy: ['s36', 's37'] },
  { x: 300, y: 120, layer: 2, id: 's49', supportedBy: ['s38', 's39'] },
  
  { x: 90, y: 90, layer: 3, id: 's50', supportedBy: ['s42', 's43'] },
  { x: 90, y: 270, layer: 3, id: 's51', supportedBy: ['s44', 's45'] },
  { x: 270, y: 270, layer: 3, id: 's52', supportedBy: ['s46', 's47'] },
  { x: 270, y: 90, layer: 3, id: 's53', supportedBy: ['s48', 's49'] }
];

const SPIRAL_SQUARE: MahjongLayout = {
  name: 'Spiral Square',
  difficulty: 'hard',
  positions: spiralSquarePositions,
  maxLayers: 4
};

/**
 * Initialize the layout registry with all available layouts
 * This function registers all layouts from their individual files
 */
function initializeLayouts(): void {
  // Register formation layouts
  layoutRegistry.register(TURTLE_FORMATION);
  layoutRegistry.register(TOWER_FORMATION);
  layoutRegistry.register(PYRAMID_FORMATION);

  // Register extracted square layouts
  layoutRegistry.register(DIAMOND_SQUARE);

  // Register remaining square layouts (temporary - until fully extracted)
  layoutRegistry.register(CROSS_SQUARE);
  layoutRegistry.register(FRAME_SQUARE);
  layoutRegistry.register(STEPPED_SQUARE);
  layoutRegistry.register(CORNER_SQUARE);
  layoutRegistry.register(WINDMILL_SQUARE);
  layoutRegistry.register(MAZE_SQUARE);
  layoutRegistry.register(FORTRESS_SQUARE);
  layoutRegistry.register(SPIRAL_SQUARE);
}

// Initialize layouts on module load
initializeLayouts();

// Create default layout selector
const layoutSelector = new LayoutSelector(layoutRegistry);

// Export public API (Clean Interface)
export {
  // Services
  layoutRegistry,
  layoutSelector,
  LayoutRegistry,
  LayoutSelector,
  
  // Interfaces
  type ILayoutRegistry,
  type ILayoutSelector,
  type ILayoutSelectionStrategy,
  
  // Strategies
  RandomSelectionStrategy,
  SequentialSelectionStrategy,
  
  // Individual layouts (for direct access if needed)
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
  SPIRAL_SQUARE
};

// Legacy API compatibility functions
export function getRandomLayoutByDifficulty(difficulty: string): MahjongLayout | null {
  const validDifficulty = difficulty as 'easy' | 'medium' | 'hard';
  return layoutSelector.getRandomByDifficulty(validDifficulty);
}

export function getAllLayouts(): MahjongLayout[] {
  return layoutSelector.getAllLayouts();
}