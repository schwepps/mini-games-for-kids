import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Authentic MahJong Layouts with Pixel-Perfect Positioning
 * Tiles are positioned edge-to-edge with no gaps, creating cohesive 3D structures
 * Standard tile size: 60px x 60px (will be scaled as needed)
 */

// AUTHENTIC TURTLE FORMATION - Easy (24 tiles, 12 pairs)
// Classic mahjong turtle with realistic 3D stacking
const turtleFormationPositions: TilePosition[] = [
  // === LAYER 0 (BASE) ===
  // Turtle shell base - outer perimeter
  { x: 60, y: 0, layer: 0, id: 't1' },   // Top row
  { x: 120, y: 0, layer: 0, id: 't2' },
  { x: 180, y: 0, layer: 0, id: 't3' },
  { x: 240, y: 0, layer: 0, id: 't4' },
  
  { x: 0, y: 60, layer: 0, id: 't5' },   // Left side
  { x: 300, y: 60, layer: 0, id: 't6' }, // Right side
  
  { x: 0, y: 120, layer: 0, id: 't7' },  // Left side
  { x: 300, y: 120, layer: 0, id: 't8' }, // Right side
  
  { x: 60, y: 180, layer: 0, id: 't9' },  // Bottom row
  { x: 120, y: 180, layer: 0, id: 't10' },
  { x: 180, y: 180, layer: 0, id: 't11' },
  { x: 240, y: 180, layer: 0, id: 't12' },
  
  // Turtle head and tail
  { x: 150, y: -60, layer: 0, id: 't13' }, // Head
  { x: 150, y: 240, layer: 0, id: 't14' }, // Tail
  
  // === LAYER 1 (MIDDLE) ===
  // Positioned at intersections of base tiles
  { x: 90, y: 30, layer: 1, id: 't15', supportedBy: ['t1', 't5'] },
  { x: 150, y: 30, layer: 1, id: 't16', supportedBy: ['t2', 't3'] },
  { x: 210, y: 30, layer: 1, id: 't17', supportedBy: ['t3', 't6'] },
  
  { x: 30, y: 90, layer: 1, id: 't18', supportedBy: ['t5', 't7'] },
  { x: 270, y: 90, layer: 1, id: 't19', supportedBy: ['t6', 't8'] },
  
  { x: 90, y: 150, layer: 1, id: 't20', supportedBy: ['t7', 't9'] },
  { x: 150, y: 150, layer: 1, id: 't21', supportedBy: ['t10', 't11'] },
  { x: 210, y: 150, layer: 1, id: 't22', supportedBy: ['t11', 't8'] },
  
  // === LAYER 2 (TOP) ===
  // Final peak tiles
  { x: 120, y: 60, layer: 2, id: 't23', supportedBy: ['t15', 't16'] },
  { x: 180, y: 120, layer: 2, id: 't24', supportedBy: ['t21', 't22'] },
];

// AUTHENTIC DRAGON FORMATION - Medium (36 tiles, 18 pairs)
// Serpentine winding structure with flowing 3D layers
const dragonFormationPositions: TilePosition[] = [
  // === LAYER 0 (BASE) - Dragon body spine ===
  { x: 0, y: 120, layer: 0, id: 'd1' },     // Head
  { x: 60, y: 120, layer: 0, id: 'd2' },
  { x: 120, y: 120, layer: 0, id: 'd3' },
  { x: 180, y: 120, layer: 0, id: 'd4' },
  { x: 240, y: 120, layer: 0, id: 'd5' },   // Center body
  
  // First curve upward
  { x: 300, y: 60, layer: 0, id: 'd6' },
  { x: 360, y: 60, layer: 0, id: 'd7' },
  { x: 420, y: 60, layer: 0, id: 'd8' },
  
  // Curve back down
  { x: 480, y: 120, layer: 0, id: 'd9' },
  { x: 540, y: 120, layer: 0, id: 'd10' },
  { x: 600, y: 120, layer: 0, id: 'd11' },
  
  // Second curve downward
  { x: 660, y: 180, layer: 0, id: 'd12' },
  { x: 720, y: 180, layer: 0, id: 'd13' },
  { x: 780, y: 180, layer: 0, id: 'd14' },  // Tail
  
  // Dragon wings (extending sides)
  { x: 180, y: 60, layer: 0, id: 'd15' },
  { x: 300, y: 180, layer: 0, id: 'd16' },
  { x: 480, y: 60, layer: 0, id: 'd17' },
  { x: 600, y: 180, layer: 0, id: 'd18' },
  
  // === LAYER 1 (MIDDLE) - Dragon scales ===
  { x: 90, y: 120, layer: 1, id: 'd19', supportedBy: ['d2', 'd3'] },
  { x: 210, y: 90, layer: 1, id: 'd20', supportedBy: ['d4', 'd15'] },
  { x: 330, y: 90, layer: 1, id: 'd21', supportedBy: ['d6', 'd7'] },
  { x: 450, y: 90, layer: 1, id: 'd22', supportedBy: ['d8', 'd17'] },
  { x: 570, y: 120, layer: 1, id: 'd23', supportedBy: ['d10', 'd11'] },
  { x: 690, y: 150, layer: 1, id: 'd24', supportedBy: ['d12', 'd13'] },
  
  // Dragon crest
  { x: 240, y: 60, layer: 1, id: 'd25', supportedBy: ['d15', 'd5'] },
  { x: 360, y: 120, layer: 1, id: 'd26', supportedBy: ['d7', 'd8'] },
  { x: 540, y: 60, layer: 1, id: 'd27', supportedBy: ['d17', 'd9'] },
  { x: 660, y: 120, layer: 1, id: 'd28', supportedBy: ['d11', 'd12'] },
  
  // === LAYER 2 (TOP) - Dragon spine ridge ===
  { x: 270, y: 90, layer: 2, id: 'd29', supportedBy: ['d20', 'd25'] },
  { x: 390, y: 90, layer: 2, id: 'd30', supportedBy: ['d21', 'd26'] },
  { x: 510, y: 90, layer: 2, id: 'd31', supportedBy: ['d22', 'd27'] },
  { x: 630, y: 120, layer: 2, id: 'd32', supportedBy: ['d23', 'd28'] },
  
  // === LAYER 3 (PEAK) - Dragon crown ===
  { x: 330, y: 90, layer: 3, id: 'd33', supportedBy: ['d29', 'd30'] },
  { x: 450, y: 90, layer: 3, id: 'd34', supportedBy: ['d30', 'd31'] },
  { x: 570, y: 105, layer: 3, id: 'd35', supportedBy: ['d31', 'd32'] },
  
  // Dragon eye (center peak)
  { x: 390, y: 90, layer: 4, id: 'd36', supportedBy: ['d33', 'd34'] },
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
  name: 'Authentic Turtle',
  difficulty: 'easy',
  positions: turtleFormationPositions,
  maxLayers: 3
};

export const DRAGON_FORMATION: MahjongLayout = {
  name: 'Authentic Dragon',
  difficulty: 'medium', 
  positions: dragonFormationPositions,
  maxLayers: 5
};

export const PYRAMID_FORMATION: MahjongLayout = {
  name: 'Authentic Pyramid',
  difficulty: 'hard',
  positions: pyramidFormationPositions,
  maxLayers: 4
};

// Layout collections by difficulty
const easyLayouts = [TURTLE_FORMATION];
const mediumLayouts = [DRAGON_FORMATION];
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
  return [TURTLE_FORMATION, DRAGON_FORMATION, PYRAMID_FORMATION];
}