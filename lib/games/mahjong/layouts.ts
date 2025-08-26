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

// DIAMOND SQUARE FORMATION - Easy (48 tiles, 24 pairs)
// Diamond pattern within square boundary, mobile-optimized
const diamondSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 24 tiles forming diamond perimeter ===
  // Top diamond point
  { x: 180, y: 0, layer: 0, id: 'd1' },
  
  // Upper diamond sides
  { x: 120, y: 30, layer: 0, id: 'd2' },
  { x: 150, y: 30, layer: 0, id: 'd3' },
  { x: 210, y: 30, layer: 0, id: 'd4' },
  { x: 240, y: 30, layer: 0, id: 'd5' },
  
  // Mid-upper sides
  { x: 90, y: 60, layer: 0, id: 'd6' },
  { x: 270, y: 60, layer: 0, id: 'd7' },
  
  // Center sides (widest point)
  { x: 60, y: 90, layer: 0, id: 'd8' },
  { x: 300, y: 90, layer: 0, id: 'd9' },
  { x: 30, y: 120, layer: 0, id: 'd10' },
  { x: 330, y: 120, layer: 0, id: 'd11' },
  { x: 0, y: 150, layer: 0, id: 'd12' },
  { x: 360, y: 150, layer: 0, id: 'd13' },
  { x: 30, y: 180, layer: 0, id: 'd14' },
  { x: 330, y: 180, layer: 0, id: 'd15' },
  
  // Lower diamond sides
  { x: 60, y: 210, layer: 0, id: 'd16' },
  { x: 300, y: 210, layer: 0, id: 'd17' },
  { x: 90, y: 240, layer: 0, id: 'd18' },
  { x: 270, y: 240, layer: 0, id: 'd19' },
  
  // Bottom diamond point area
  { x: 120, y: 270, layer: 0, id: 'd20' },
  { x: 150, y: 270, layer: 0, id: 'd21' },
  { x: 210, y: 270, layer: 0, id: 'd22' },
  { x: 240, y: 270, layer: 0, id: 'd23' },
  { x: 180, y: 300, layer: 0, id: 'd24' },
  
  // === LAYER 1 (MIDDLE) - 16 tiles ===
  { x: 150, y: 60, layer: 1, id: 'd25', supportedBy: ['d3', 'd6'] },
  { x: 180, y: 60, layer: 1, id: 'd26', supportedBy: ['d3', 'd4'] },
  { x: 210, y: 60, layer: 1, id: 'd27', supportedBy: ['d4', 'd7'] },
  
  { x: 120, y: 90, layer: 1, id: 'd28', supportedBy: ['d6', 'd8'] },
  { x: 240, y: 90, layer: 1, id: 'd29', supportedBy: ['d7', 'd9'] },
  
  { x: 90, y: 120, layer: 1, id: 'd30', supportedBy: ['d8', 'd10'] },
  { x: 270, y: 120, layer: 1, id: 'd31', supportedBy: ['d9', 'd11'] },
  
  { x: 60, y: 150, layer: 1, id: 'd32', supportedBy: ['d10', 'd12'] },
  { x: 180, y: 150, layer: 1, id: 'd33', supportedBy: ['d26', 'd30'] },
  { x: 300, y: 150, layer: 1, id: 'd34', supportedBy: ['d11', 'd13'] },
  
  { x: 90, y: 180, layer: 1, id: 'd35', supportedBy: ['d14', 'd32'] },
  { x: 270, y: 180, layer: 1, id: 'd36', supportedBy: ['d15', 'd34'] },
  
  { x: 120, y: 210, layer: 1, id: 'd37', supportedBy: ['d16', 'd35'] },
  { x: 240, y: 210, layer: 1, id: 'd38', supportedBy: ['d17', 'd36'] },
  
  { x: 150, y: 240, layer: 1, id: 'd39', supportedBy: ['d18', 'd20'] },
  { x: 210, y: 240, layer: 1, id: 'd40', supportedBy: ['d19', 'd22'] },
  
  // === LAYER 2 (TOP) - 8 tiles ===
  { x: 150, y: 90, layer: 2, id: 'd41', supportedBy: ['d25', 'd28'] },
  { x: 180, y: 90, layer: 2, id: 'd42', supportedBy: ['d26', 'd33'] },
  { x: 210, y: 90, layer: 2, id: 'd43', supportedBy: ['d27', 'd29'] },
  
  { x: 120, y: 150, layer: 2, id: 'd44', supportedBy: ['d30', 'd32'] },
  { x: 240, y: 150, layer: 2, id: 'd45', supportedBy: ['d31', 'd34'] },
  
  { x: 150, y: 210, layer: 2, id: 'd46', supportedBy: ['d35', 'd37'] },
  { x: 180, y: 210, layer: 2, id: 'd47', supportedBy: ['d33', 'd38'] },
  { x: 210, y: 210, layer: 2, id: 'd48', supportedBy: ['d36', 'd40'] },
];

// CROSS SQUARE FORMATION - Easy (48 tiles, 24 pairs)
// Plus/cross shape within square boundary
const crossSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 24 tiles forming cross shape ===
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
  
  // === LAYER 1 (MIDDLE) - 16 tiles ===
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
  
  // === LAYER 2 (TOP) - 8 tiles ===
  { x: 120, y: 150, layer: 2, id: 'c43', supportedBy: ['c31', 'c35'] },
  { x: 150, y: 120, layer: 2, id: 'c44', supportedBy: ['c27', 'c41'] },
  { x: 180, y: 150, layer: 2, id: 'c45', supportedBy: ['c28', 'c41'] },
  { x: 210, y: 120, layer: 2, id: 'c46', supportedBy: ['c29', 'c32'] },
  { x: 240, y: 150, layer: 2, id: 'c47', supportedBy: ['c32', 'c36'] },
  { x: 150, y: 180, layer: 2, id: 'c48', supportedBy: ['c38', 'c42'] },
];

// FRAME SQUARE FORMATION - Easy (48 tiles, 24 pairs)
// Hollow square frame with center cluster
const frameSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 24 tiles forming square frame ===
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
  
  // === LAYER 1 (MIDDLE) - 16 tiles ===
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
  
  // === LAYER 2 (TOP) - 8 tiles ===
  { x: 90, y: 90, layer: 2, id: 'f41', supportedBy: ['f25', 'f26'] },
  { x: 150, y: 90, layer: 2, id: 'f42', supportedBy: ['f26', 'f27'] },
  { x: 210, y: 90, layer: 2, id: 'f43', supportedBy: ['f27', 'f28'] },
  
  { x: 90, y: 150, layer: 2, id: 'f44', supportedBy: ['f29', 'f37'] },
  { x: 150, y: 150, layer: 2, id: 'f45', supportedBy: ['f38', 'f40'] },
  { x: 210, y: 150, layer: 2, id: 'f46', supportedBy: ['f30', 'f39'] },
  
  { x: 120, y: 120, layer: 2, id: 'f47', supportedBy: ['f37', 'f38'] },
  { x: 180, y: 150, layer: 2, id: 'f48', supportedBy: ['f38', 'f39'] }
];

export const DIAMOND_SQUARE: MahjongLayout = {
  name: 'Diamond Square',
  difficulty: 'easy',
  positions: diamondSquarePositions,
  maxLayers: 3
};

export const CROSS_SQUARE: MahjongLayout = {
  name: 'Cross Square',
  difficulty: 'easy',
  positions: crossSquarePositions,
  maxLayers: 3
};

export const FRAME_SQUARE: MahjongLayout = {
  name: 'Frame Square',
  difficulty: 'easy',
  positions: frameSquarePositions,
  maxLayers: 3
};

// STEPPED SQUARE FORMATION - Medium (48 tiles, 24 pairs)
// Concentric square layers with stepped elevation
const steppedSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles forming outer square ===
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
  
  // === LAYER 1 (SECOND) - 16 tiles forming middle ring ===
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
  
  // === LAYER 2 (THIRD) - 8 tiles forming inner ring ===
  { x: 120, y: 120, layer: 2, id: 'st37', supportedBy: ['st22', 'st25'] },
  { x: 180, y: 120, layer: 2, id: 'st38', supportedBy: ['st23', 'st26'] },
  { x: 120, y: 180, layer: 2, id: 'st39', supportedBy: ['st25', 'st27'] },
  { x: 180, y: 180, layer: 2, id: 'st40', supportedBy: ['st26', 'st28'] },
  
  { x: 90, y: 150, layer: 2, id: 'st41', supportedBy: ['st33', 'st35'] },
  { x: 150, y: 90, layer: 2, id: 'st42', supportedBy: ['st33', 'st34'] },
  { x: 210, y: 150, layer: 2, id: 'st43', supportedBy: ['st34', 'st36'] },
  { x: 150, y: 210, layer: 2, id: 'st44', supportedBy: ['st35', 'st36'] },
  
  // === LAYER 3 (FOURTH) - 4 tiles forming center ===
  { x: 120, y: 150, layer: 3, id: 'st45', supportedBy: ['st37', 'st39'] },
  { x: 150, y: 120, layer: 3, id: 'st46', supportedBy: ['st37', 'st38'] },
  { x: 180, y: 150, layer: 3, id: 'st47', supportedBy: ['st38', 'st40'] },
  { x: 150, y: 180, layer: 3, id: 'st48', supportedBy: ['st39', 'st40'] }
];

// CORNER SQUARE FORMATION - Medium (48 tiles, 24 pairs)
// Squares clustered in corners with center connections
const cornerSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles in corner clusters ===
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
  
  // === LAYER 1 (SECOND) - 16 tiles bridging corners ===
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
  
  // === LAYER 2 (THIRD) - 8 tiles connecting toward center ===
  { x: 120, y: 90, layer: 2, id: 'co41', supportedBy: ['co25', 'co26'] },
  { x: 240, y: 90, layer: 2, id: 'co42', supportedBy: ['co27', 'co28'] },
  { x: 90, y: 120, layer: 2, id: 'co43', supportedBy: ['co29', 'co30'] },
  { x: 270, y: 120, layer: 2, id: 'co44', supportedBy: ['co31', 'co32'] },
  { x: 90, y: 240, layer: 2, id: 'co45', supportedBy: ['co33', 'co34'] },
  { x: 270, y: 240, layer: 2, id: 'co46', supportedBy: ['co35', 'co36'] },
  { x: 120, y: 270, layer: 2, id: 'co47', supportedBy: ['co37', 'co38'] },
  { x: 240, y: 270, layer: 2, id: 'co48', supportedBy: ['co39', 'co40'] }
];

// WINDMILL SQUARE FORMATION - Medium (48 tiles, 24 pairs)
// Pinwheel pattern in square boundary with rotating arms
const windmillSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles forming windmill arms ===
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
  
  // === LAYER 1 (SECOND) - 16 tiles forming inner windmill ===
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
  
  // === LAYER 2 (THIRD) - 8 tiles forming center hub ===
  { x: 150, y: 90, layer: 2, id: 'w37', supportedBy: ['w21', 'w22'] },
  { x: 210, y: 90, layer: 2, id: 'w38', supportedBy: ['w23', 'w24'] },
  { x: 240, y: 150, layer: 2, id: 'w39', supportedBy: ['w25', 'w26'] },
  { x: 240, y: 210, layer: 2, id: 'w40', supportedBy: ['w27', 'w28'] },
  { x: 180, y: 240, layer: 2, id: 'w41', supportedBy: ['w29', 'w30'] },
  { x: 120, y: 240, layer: 2, id: 'w42', supportedBy: ['w31', 'w32'] },
  { x: 120, y: 180, layer: 2, id: 'w43', supportedBy: ['w33', 'w34'] },
  { x: 120, y: 120, layer: 2, id: 'w44', supportedBy: ['w35', 'w36'] },
  
  // === LAYER 3 (FOURTH) - 4 tiles center point ===
  { x: 150, y: 120, layer: 3, id: 'w45', supportedBy: ['w37', 'w44'] },
  { x: 180, y: 150, layer: 3, id: 'w46', supportedBy: ['w38', 'w39'] },
  { x: 210, y: 180, layer: 3, id: 'w47', supportedBy: ['w40', 'w41'] },
  { x: 150, y: 210, layer: 3, id: 'w48', supportedBy: ['w42', 'w43'] }
];

export const STEPPED_SQUARE: MahjongLayout = {
  name: 'Stepped Square',
  difficulty: 'medium',
  positions: steppedSquarePositions,
  maxLayers: 4
};

export const CORNER_SQUARE: MahjongLayout = {
  name: 'Corner Square',
  difficulty: 'medium',
  positions: cornerSquarePositions,
  maxLayers: 3
};

export const WINDMILL_SQUARE: MahjongLayout = {
  name: 'Windmill Square',
  difficulty: 'medium',
  positions: windmillSquarePositions,
  maxLayers: 4
};

// MAZE SQUARE FORMATION - Hard (48 tiles, 24 pairs)
// Complex square maze pattern with intricate pathways
const mazeSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 24 tiles forming maze walls ===
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
  
  // === LAYER 1 (SECOND) - 16 tiles creating upper maze level ===
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
  
  // === LAYER 2 (THIRD) - 6 tiles forming complex maze bridges ===
  { x: 60, y: 120, layer: 2, id: 'm42', supportedBy: ['m30', 'm31'] },
  { x: 120, y: 90, layer: 2, id: 'm43', supportedBy: ['m31', 'm32'] },
  { x: 240, y: 120, layer: 2, id: 'm44', supportedBy: ['m33', 'm36'] },
  { x: 120, y: 180, layer: 2, id: 'm45', supportedBy: ['m37', 'm38'] },
  { x: 180, y: 150, layer: 2, id: 'm46', supportedBy: ['m35', 'm39'] },
  { x: 210, y: 180, layer: 2, id: 'm47', supportedBy: ['m39', 'm40'] },
  
  // === LAYER 3 (FOURTH) - 2 tiles forming maze peaks ===
  { x: 90, y: 150, layer: 3, id: 'm48', supportedBy: ['m42', 'm45'] },
  { x: 180, y: 120, layer: 3, id: 'm49', supportedBy: ['m43', 'm46'] }
];

// FORTRESS SQUARE FORMATION - Hard (48 tiles, 24 pairs)
// Fortified square with internal defensive structure
const fortressSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles forming fortress walls ===
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
  
  // === LAYER 1 (SECOND) - 16 tiles forming defensive positions ===
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
  
  // === LAYER 2 (THIRD) - 8 tiles forming fortress towers ===
  { x: 90, y: 90, layer: 2, id: 'fo43', supportedBy: ['fo27', 'fo28'] },
  { x: 150, y: 90, layer: 2, id: 'fo44', supportedBy: ['fo28', 'fo29'] },
  { x: 210, y: 90, layer: 2, id: 'fo45', supportedBy: ['fo29', 'fo30'] },
  { x: 270, y: 90, layer: 2, id: 'fo46', supportedBy: ['fo30', 'fo31'] },
  
  { x: 90, y: 210, layer: 2, id: 'fo47', supportedBy: ['fo38', 'fo39'] },
  { x: 150, y: 210, layer: 2, id: 'fo48', supportedBy: ['fo39', 'fo40'] },
  { x: 210, y: 210, layer: 2, id: 'fo49', supportedBy: ['fo40', 'fo41'] },
  { x: 270, y: 210, layer: 2, id: 'fo50', supportedBy: ['fo41', 'fo42'] },
  
  // === LAYER 3 (FOURTH) - 4 tiles forming fortress keep ===
  { x: 120, y: 150, layer: 3, id: 'fo51', supportedBy: ['fo43', 'fo44'] },
  { x: 180, y: 150, layer: 3, id: 'fo52', supportedBy: ['fo33', 'fo36'] },
  { x: 240, y: 150, layer: 3, id: 'fo53', supportedBy: ['fo45', 'fo46'] },
  { x: 180, y: 210, layer: 3, id: 'fo54', supportedBy: ['fo47', 'fo48'] }
];

// SPIRAL SQUARE FORMATION - Hard (48 tiles, 24 pairs)
// Square spiral from center outward with complex layering
const spiralSquarePositions: TilePosition[] = [
  // === LAYER 0 (BASE) - 20 tiles forming outer spiral arms ===
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
  
  // === LAYER 1 (SECOND) - 16 tiles continuing spiral elevation ===
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
  
  // === LAYER 2 (THIRD) - 8 tiles forming spiral peaks ===
  { x: 120, y: 60, layer: 2, id: 's42', supportedBy: ['s26', 's10'] },
  { x: 60, y: 120, layer: 2, id: 's43', supportedBy: ['s26', 's27'] },
  { x: 60, y: 180, layer: 2, id: 's44', supportedBy: ['s28', 's29'] },
  { x: 120, y: 270, layer: 2, id: 's45', supportedBy: ['s30', 's31'] },
  { x: 180, y: 270, layer: 2, id: 's46', supportedBy: ['s32', 's33'] },
  { x: 240, y: 270, layer: 2, id: 's47', supportedBy: ['s34', 's35'] },
  { x: 300, y: 180, layer: 2, id: 's48', supportedBy: ['s36', 's37'] },
  { x: 300, y: 120, layer: 2, id: 's49', supportedBy: ['s38', 's39'] },
  
  // === LAYER 3 (FOURTH) - 4 tiles spiral center peaks ===
  { x: 90, y: 90, layer: 3, id: 's50', supportedBy: ['s42', 's43'] },
  { x: 90, y: 270, layer: 3, id: 's51', supportedBy: ['s44', 's45'] },
  { x: 270, y: 270, layer: 3, id: 's52', supportedBy: ['s46', 's47'] },
  { x: 270, y: 90, layer: 3, id: 's53', supportedBy: ['s48', 's49'] }
];

export const MAZE_SQUARE: MahjongLayout = {
  name: 'Maze Square',
  difficulty: 'hard',
  positions: mazeSquarePositions,
  maxLayers: 4
};

export const FORTRESS_SQUARE: MahjongLayout = {
  name: 'Fortress Square',
  difficulty: 'hard',
  positions: fortressSquarePositions,
  maxLayers: 4
};

export const SPIRAL_SQUARE: MahjongLayout = {
  name: 'Spiral Square',
  difficulty: 'hard',
  positions: spiralSquarePositions,
  maxLayers: 4
};

// Layout collections by difficulty
const easyLayouts = [TURTLE_FORMATION, DIAMOND_SQUARE, CROSS_SQUARE, FRAME_SQUARE];
const mediumLayouts = [TOWER_FORMATION, STEPPED_SQUARE, CORNER_SQUARE, WINDMILL_SQUARE];
const hardLayouts = [PYRAMID_FORMATION, MAZE_SQUARE, FORTRESS_SQUARE, SPIRAL_SQUARE];

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
  return [
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
    SPIRAL_SQUARE
  ];
}