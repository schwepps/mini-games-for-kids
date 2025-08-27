import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Pyramid Formation Layout
 * Multi-layered pyramid structure with stepped layers
 */
const pyramidFormationPositions: TilePosition[] = [
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
  
  { x: 60, y: 60, layer: 2, id: 'p37', supportedBy: ['p21', 'p22'] },
  { x: 120, y: 60, layer: 2, id: 'p38', supportedBy: ['p22', 'p23'] },
  { x: 180, y: 60, layer: 2, id: 'p39', supportedBy: ['p23', 'p24'] },
  { x: 240, y: 60, layer: 2, id: 'p40', supportedBy: ['p24', 'p25'] },
  { x: 300, y: 60, layer: 2, id: 'p41', supportedBy: ['p25', 'p26'] },
  
  { x: 120, y: 180, layer: 2, id: 'p42', supportedBy: ['p33', 'p34'] },
  { x: 180, y: 180, layer: 2, id: 'p43', supportedBy: ['p34', 'p35'] },
  { x: 240, y: 180, layer: 2, id: 'p44', supportedBy: ['p35', 'p36'] },
  
  { x: 90, y: 90, layer: 3, id: 'p45', supportedBy: ['p37', 'p38'] },
  { x: 150, y: 90, layer: 3, id: 'p46', supportedBy: ['p38', 'p39'] },
  { x: 210, y: 90, layer: 3, id: 'p47', supportedBy: ['p39', 'p40'] },
  { x: 270, y: 90, layer: 3, id: 'p48', supportedBy: ['p40', 'p41'] },
];

export const PYRAMID_FORMATION: MahjongLayout = {
  name: 'Pyramid Formation',
  difficulty: 'hard',
  positions: pyramidFormationPositions,
  maxLayers: 4
};