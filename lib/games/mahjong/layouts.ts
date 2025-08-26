import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Authentic MahJong Layouts with Pixel-Perfect Positioning
 * Tiles are positioned edge-to-edge with no gaps, creating cohesive 3D structures
 * Standard tile size: 60px x 60px (will be scaled as needed)
 */

// ENHANCED TURTLE FORMATION - Easy (48 tiles, 24 pairs)
// Expanded turtle formation maintaining square shape with strategic layering
const turtleFormationPositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 24 tiles forming turtle shell perimeter ===
  // Extended top row
  { x: 30, y: 0, layer: 0, id: 't1' },
  { x: 90, y: 0, layer: 0, id: 't2' },
  { x: 150, y: 0, layer: 0, id: 't3' },
  { x: 210, y: 0, layer: 0, id: 't4' },
  { x: 270, y: 0, layer: 0, id: 't5' },
  { x: 330, y: 0, layer: 0, id: 't6' },
  
  // Extended sides
  { x: 0, y: 30, layer: 0, id: 't7' },   // Left outer
  { x: 360, y: 30, layer: 0, id: 't8' }, // Right outer
  { x: 0, y: 90, layer: 0, id: 't9' },
  { x: 360, y: 90, layer: 0, id: 't10' },
  { x: 0, y: 150, layer: 0, id: 't11' },
  { x: 360, y: 150, layer: 0, id: 't12' },
  { x: 0, y: 210, layer: 0, id: 't13' },
  { x: 360, y: 210, layer: 0, id: 't14' },
  
  // Extended bottom row
  { x: 30, y: 240, layer: 0, id: 't15' },
  { x: 90, y: 240, layer: 0, id: 't16' },
  { x: 150, y: 240, layer: 0, id: 't17' },
  { x: 210, y: 240, layer: 0, id: 't18' },
  { x: 270, y: 240, layer: 0, id: 't19' },
  { x: 330, y: 240, layer: 0, id: 't20' },
  
  // Turtle head and tail extensions
  { x: 180, y: -60, layer: 0, id: 't21' }, // Head
  { x: 180, y: 300, layer: 0, id: 't22' }, // Tail
  
  // Inner shell ring
  { x: 60, y: 60, layer: 0, id: 't23' },
  { x: 300, y: 60, layer: 0, id: 't24' },
  
  // === LAYER 1 (MIDDLE) - 16 tiles ===
  { x: 60, y: 30, layer: 1, id: 't25', supportedBy: ['t1', 't2'] },
  { x: 120, y: 30, layer: 1, id: 't26', supportedBy: ['t2', 't3'] },
  { x: 180, y: 30, layer: 1, id: 't27', supportedBy: ['t3', 't4'] },
  { x: 240, y: 30, layer: 1, id: 't28', supportedBy: ['t4', 't5'] },
  { x: 300, y: 30, layer: 1, id: 't29', supportedBy: ['t5', 't6'] },
  
  { x: 30, y: 60, layer: 1, id: 't30', supportedBy: ['t7', 't23'] },
  { x: 330, y: 60, layer: 1, id: 't31', supportedBy: ['t8', 't24'] },
  
  { x: 30, y: 120, layer: 1, id: 't32', supportedBy: ['t9', 't11'] },
  { x: 330, y: 120, layer: 1, id: 't33', supportedBy: ['t10', 't12'] },
  
  { x: 30, y: 180, layer: 1, id: 't34', supportedBy: ['t11', 't13'] },
  { x: 330, y: 180, layer: 1, id: 't35', supportedBy: ['t12', 't14'] },
  
  { x: 60, y: 210, layer: 1, id: 't36', supportedBy: ['t15', 't16'] },
  { x: 120, y: 210, layer: 1, id: 't37', supportedBy: ['t16', 't17'] },
  { x: 180, y: 210, layer: 1, id: 't38', supportedBy: ['t17', 't18'] },
  { x: 240, y: 210, layer: 1, id: 't39', supportedBy: ['t18', 't19'] },
  { x: 300, y: 210, layer: 1, id: 't40', supportedBy: ['t19', 't20'] },
  
  // === LAYER 2 (TOP) - 8 tiles ===
  { x: 90, y: 60, layer: 2, id: 't41', supportedBy: ['t25', 't26'] },
  { x: 150, y: 60, layer: 2, id: 't42', supportedBy: ['t26', 't27'] },
  { x: 210, y: 60, layer: 2, id: 't43', supportedBy: ['t27', 't28'] },
  { x: 270, y: 60, layer: 2, id: 't44', supportedBy: ['t28', 't29'] },
  
  { x: 90, y: 180, layer: 2, id: 't45', supportedBy: ['t36', 't37'] },
  { x: 150, y: 180, layer: 2, id: 't46', supportedBy: ['t37', 't38'] },
  { x: 210, y: 180, layer: 2, id: 't47', supportedBy: ['t38', 't39'] },
  { x: 270, y: 180, layer: 2, id: 't48', supportedBy: ['t39', 't40'] },
];

// TOWER FORMATION - Medium (48 tiles, 24 pairs)
// Square-based pagoda tower with stepped layers
const towerFormationPositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles forming square foundation ===
  // Outer square perimeter
  { x: 0, y: 0, layer: 0, id: 'tw1' },
  { x: 60, y: 0, layer: 0, id: 'tw2' },
  { x: 120, y: 0, layer: 0, id: 'tw3' },
  { x: 180, y: 0, layer: 0, id: 'tw4' },
  { x: 240, y: 0, layer: 0, id: 'tw5' },
  { x: 300, y: 0, layer: 0, id: 'tw6' },
  
  { x: 0, y: 60, layer: 0, id: 'tw7' },
  { x: 300, y: 60, layer: 0, id: 'tw8' },
  { x: 0, y: 120, layer: 0, id: 'tw9' },
  { x: 300, y: 120, layer: 0, id: 'tw10' },
  { x: 0, y: 180, layer: 0, id: 'tw11' },
  { x: 300, y: 180, layer: 0, id: 'tw12' },
  { x: 0, y: 240, layer: 0, id: 'tw13' },
  { x: 300, y: 240, layer: 0, id: 'tw14' },
  
  { x: 0, y: 300, layer: 0, id: 'tw15' },
  { x: 60, y: 300, layer: 0, id: 'tw16' },
  { x: 120, y: 300, layer: 0, id: 'tw17' },
  { x: 180, y: 300, layer: 0, id: 'tw18' },
  { x: 240, y: 300, layer: 0, id: 'tw19' },
  { x: 300, y: 300, layer: 0, id: 'tw20' },
  
  // === LAYER 1 (SECOND) - 16 tiles ===
  { x: 30, y: 30, layer: 1, id: 'tw21', supportedBy: ['tw1', 'tw2'] },
  { x: 90, y: 30, layer: 1, id: 'tw22', supportedBy: ['tw2', 'tw3'] },
  { x: 150, y: 30, layer: 1, id: 'tw23', supportedBy: ['tw3', 'tw4'] },
  { x: 210, y: 30, layer: 1, id: 'tw24', supportedBy: ['tw4', 'tw5'] },
  { x: 270, y: 30, layer: 1, id: 'tw25', supportedBy: ['tw5', 'tw6'] },
  
  { x: 30, y: 90, layer: 1, id: 'tw26', supportedBy: ['tw7', 'tw21'] },
  { x: 270, y: 90, layer: 1, id: 'tw27', supportedBy: ['tw8', 'tw25'] },
  { x: 30, y: 150, layer: 1, id: 'tw28', supportedBy: ['tw9', 'tw26'] },
  { x: 270, y: 150, layer: 1, id: 'tw29', supportedBy: ['tw10', 'tw27'] },
  { x: 30, y: 210, layer: 1, id: 'tw30', supportedBy: ['tw11', 'tw28'] },
  { x: 270, y: 210, layer: 1, id: 'tw31', supportedBy: ['tw12', 'tw29'] },
  
  { x: 30, y: 270, layer: 1, id: 'tw32', supportedBy: ['tw13', 'tw16'] },
  { x: 90, y: 270, layer: 1, id: 'tw33', supportedBy: ['tw16', 'tw17'] },
  { x: 150, y: 270, layer: 1, id: 'tw34', supportedBy: ['tw17', 'tw18'] },
  { x: 210, y: 270, layer: 1, id: 'tw35', supportedBy: ['tw18', 'tw19'] },
  { x: 270, y: 270, layer: 1, id: 'tw36', supportedBy: ['tw19', 'tw20'] },
  
  // === LAYER 2 (THIRD) - 8 tiles ===
  { x: 60, y: 60, layer: 2, id: 'tw37', supportedBy: ['tw21', 'tw22'] },
  { x: 120, y: 60, layer: 2, id: 'tw38', supportedBy: ['tw22', 'tw23'] },
  { x: 180, y: 60, layer: 2, id: 'tw39', supportedBy: ['tw23', 'tw24'] },
  { x: 240, y: 60, layer: 2, id: 'tw40', supportedBy: ['tw24', 'tw25'] },
  
  { x: 60, y: 240, layer: 2, id: 'tw41', supportedBy: ['tw32', 'tw33'] },
  { x: 120, y: 240, layer: 2, id: 'tw42', supportedBy: ['tw33', 'tw34'] },
  { x: 180, y: 240, layer: 2, id: 'tw43', supportedBy: ['tw34', 'tw35'] },
  { x: 240, y: 240, layer: 2, id: 'tw44', supportedBy: ['tw35', 'tw36'] },
  
  // === LAYER 3 (FOURTH) - 4 tiles forming tower peak ===
  { x: 90, y: 120, layer: 3, id: 'tw45', supportedBy: ['tw37', 'tw38'] },
  { x: 150, y: 120, layer: 3, id: 'tw46', supportedBy: ['tw38', 'tw39'] },
  { x: 210, y: 120, layer: 3, id: 'tw47', supportedBy: ['tw39', 'tw40'] },
  { x: 150, y: 180, layer: 3, id: 'tw48', supportedBy: ['tw41', 'tw42'] },
];

// AUTHENTIC PYRAMID FORMATION - Hard (48 tiles, 24 pairs)
// Classic stepped pyramid with proper support structure
const pyramidFormationPositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles (outer perimeter) ===
  // Bottom row
  { x: 0, y: 240, layer: 0, id: 'p1' },
  { x: 60, y: 240, layer: 0, id: 'p2' },
  { x: 120, y: 240, layer: 0, id: 'p3' },
  { x: 180, y: 240, layer: 0, id: 'p4' },
  { x: 240, y: 240, layer: 0, id: 'p5' },
  { x: 300, y: 240, layer: 0, id: 'p6' },
  { x: 360, y: 240, layer: 0, id: 'p7' },
  
  // Left and right sides
  { x: 0, y: 180, layer: 0, id: 'p8' },
  { x: 360, y: 180, layer: 0, id: 'p9' },
  { x: 0, y: 120, layer: 0, id: 'p10' },
  { x: 360, y: 120, layer: 0, id: 'p11' },
  { x: 0, y: 60, layer: 0, id: 'p12' },
  { x: 360, y: 60, layer: 0, id: 'p13' },
  
  // Top row
  { x: 0, y: 0, layer: 0, id: 'p14' },
  { x: 60, y: 0, layer: 0, id: 'p15' },
  { x: 120, y: 0, layer: 0, id: 'p16' },
  { x: 180, y: 0, layer: 0, id: 'p17' },
  { x: 240, y: 0, layer: 0, id: 'p18' },
  { x: 300, y: 0, layer: 0, id: 'p19' },
  { x: 360, y: 0, layer: 0, id: 'p20' },
  
  // === LAYER 1 (SECOND) - 16 tiles ===
  // Positioned at intersections of base tiles
  { x: 30, y: 30, layer: 1, id: 'p21', supportedBy: ['p14', 'p15'] },
  { x: 90, y: 30, layer: 1, id: 'p22', supportedBy: ['p15', 'p16'] },
  { x: 150, y: 30, layer: 1, id: 'p23', supportedBy: ['p16', 'p17'] },
  { x: 210, y: 30, layer: 1, id: 'p24', supportedBy: ['p17', 'p18'] },
  { x: 270, y: 30, layer: 1, id: 'p25', supportedBy: ['p18', 'p19'] },
  { x: 330, y: 30, layer: 1, id: 'p26', supportedBy: ['p19', 'p20'] },
  
  { x: 30, y: 90, layer: 1, id: 'p27', supportedBy: ['p12', 'p21'] },
  { x: 330, y: 90, layer: 1, id: 'p28', supportedBy: ['p13', 'p26'] },
  { x: 30, y: 150, layer: 1, id: 'p29', supportedBy: ['p10', 'p27'] },
  { x: 330, y: 150, layer: 1, id: 'p30', supportedBy: ['p11', 'p28'] },
  { x: 30, y: 210, layer: 1, id: 'p31', supportedBy: ['p8', 'p29'] },
  { x: 330, y: 210, layer: 1, id: 'p32', supportedBy: ['p9', 'p30'] },
  
  { x: 90, y: 210, layer: 1, id: 'p33', supportedBy: ['p2', 'p31'] },
  { x: 150, y: 210, layer: 1, id: 'p34', supportedBy: ['p3', 'p4'] },
  { x: 210, y: 210, layer: 1, id: 'p35', supportedBy: ['p4', 'p5'] },
  { x: 270, y: 210, layer: 1, id: 'p36', supportedBy: ['p5', 'p32'] },
  
  // === LAYER 2 (THIRD) - 8 tiles ===
  { x: 60, y: 60, layer: 2, id: 'p37', supportedBy: ['p21', 'p22'] },
  { x: 120, y: 60, layer: 2, id: 'p38', supportedBy: ['p22', 'p23'] },
  { x: 180, y: 60, layer: 2, id: 'p39', supportedBy: ['p23', 'p24'] },
  { x: 240, y: 60, layer: 2, id: 'p40', supportedBy: ['p24', 'p25'] },
  { x: 300, y: 60, layer: 2, id: 'p41', supportedBy: ['p25', 'p26'] },
  
  { x: 120, y: 180, layer: 2, id: 'p42', supportedBy: ['p33', 'p34'] },
  { x: 180, y: 180, layer: 2, id: 'p43', supportedBy: ['p34', 'p35'] },
  { x: 240, y: 180, layer: 2, id: 'p44', supportedBy: ['p35', 'p36'] },
  
  // === LAYER 3 (FOURTH) - 4 tiles ===
  { x: 90, y: 90, layer: 3, id: 'p45', supportedBy: ['p37', 'p38'] },
  { x: 150, y: 90, layer: 3, id: 'p46', supportedBy: ['p38', 'p39'] },
  { x: 210, y: 90, layer: 3, id: 'p47', supportedBy: ['p39', 'p40'] },
  { x: 270, y: 90, layer: 3, id: 'p48', supportedBy: ['p40', 'p41'] },
];

// Layout definitions
export const TURTLE_FORMATION: MahjongLayout = {
  name: 'Enhanced Turtle',
  difficulty: 'easy',
  positions: turtleFormationPositions,
  maxLayers: 3
};

export const TOWER_FORMATION: MahjongLayout = {
  name: 'Tower Pagoda',
  difficulty: 'medium', 
  positions: towerFormationPositions,
  maxLayers: 4
};

export const PYRAMID_FORMATION: MahjongLayout = {
  name: 'Authentic Pyramid',
  difficulty: 'hard',
  positions: pyramidFormationPositions,
  maxLayers: 4
};

// Layout collections by difficulty
const easyLayouts = [TURTLE_FORMATION];
const mediumLayouts = [TOWER_FORMATION];
const hardLayouts = [PYRAMID_FORMATION];

export function getRandomLayoutByDifficulty(difficulty: string): MahjongLayout | null {
  switch (difficulty) {
    case 'easy':
      return easyLayouts[Math.floor(Math.random() * easyLayouts.length)] || null;
    case 'medium':
      return mediumLayouts[Math.floor(Math.random() * mediumLayouts.length)] || null;
    case 'hard':
      return hardLayouts[Math.floor(Math.random() * hardLayouts.length)] || null;
    default:
      return null;
  }
}

export function getAllLayouts(): MahjongLayout[] {
  return [TURTLE_FORMATION, TOWER_FORMATION, PYRAMID_FORMATION];
}