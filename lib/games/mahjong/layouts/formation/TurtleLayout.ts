import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Turtle Formation Layout
 * Classic turtle-shaped mahjong layout with head and tail extensions
 */
const turtleFormationPositions: TilePosition[] = [
  { x: 30, y: 0, layer: 0, id: 't1' },
  { x: 90, y: 0, layer: 0, id: 't2' },
  { x: 150, y: 0, layer: 0, id: 't3' },
  { x: 210, y: 0, layer: 0, id: 't4' },
  { x: 270, y: 0, layer: 0, id: 't5' },
  { x: 330, y: 0, layer: 0, id: 't6' },
  
  { x: 0, y: 30, layer: 0, id: 't7' },
  { x: 360, y: 30, layer: 0, id: 't8' },
  { x: 0, y: 90, layer: 0, id: 't9' },
  { x: 360, y: 90, layer: 0, id: 't10' },
  { x: 0, y: 150, layer: 0, id: 't11' },
  { x: 360, y: 150, layer: 0, id: 't12' },
  { x: 0, y: 210, layer: 0, id: 't13' },
  { x: 360, y: 210, layer: 0, id: 't14' },
  
  { x: 30, y: 240, layer: 0, id: 't15' },
  { x: 90, y: 240, layer: 0, id: 't16' },
  { x: 150, y: 240, layer: 0, id: 't17' },
  { x: 210, y: 240, layer: 0, id: 't18' },
  { x: 270, y: 240, layer: 0, id: 't19' },
  { x: 330, y: 240, layer: 0, id: 't20' },
  
  // Turtle head and tail extensions
  { x: 180, y: -60, layer: 0, id: 't21' },
  { x: 180, y: 300, layer: 0, id: 't22' },
  
  // Inner shell ring
  { x: 60, y: 60, layer: 0, id: 't23' },
  { x: 300, y: 60, layer: 0, id: 't24' },
  
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
  
  { x: 90, y: 60, layer: 2, id: 't41', supportedBy: ['t25', 't26'] },
  { x: 150, y: 60, layer: 2, id: 't42', supportedBy: ['t26', 't27'] },
  { x: 210, y: 60, layer: 2, id: 't43', supportedBy: ['t27', 't28'] },
  { x: 270, y: 60, layer: 2, id: 't44', supportedBy: ['t28', 't29'] },
  
  { x: 90, y: 180, layer: 2, id: 't45', supportedBy: ['t36', 't37'] },
  { x: 150, y: 180, layer: 2, id: 't46', supportedBy: ['t37', 't38'] },
  { x: 210, y: 180, layer: 2, id: 't47', supportedBy: ['t38', 't39'] },
  { x: 270, y: 180, layer: 2, id: 't48', supportedBy: ['t39', 't40'] },
];

export const TURTLE_FORMATION: MahjongLayout = {
  name: 'Turtle Formation',
  difficulty: 'easy',
  positions: turtleFormationPositions,
  maxLayers: 3
};