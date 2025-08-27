import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Tower Formation Layout
 * Multi-layered tower structure with square perimeter base
 */
const towerFormationPositions: TilePosition[] = [
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
  
  { x: 60, y: 60, layer: 2, id: 'tw37', supportedBy: ['tw21', 'tw22'] },
  { x: 120, y: 60, layer: 2, id: 'tw38', supportedBy: ['tw22', 'tw23'] },
  { x: 180, y: 60, layer: 2, id: 'tw39', supportedBy: ['tw23', 'tw24'] },
  { x: 240, y: 60, layer: 2, id: 'tw40', supportedBy: ['tw24', 'tw25'] },
  
  { x: 60, y: 240, layer: 2, id: 'tw41', supportedBy: ['tw32', 'tw33'] },
  { x: 120, y: 240, layer: 2, id: 'tw42', supportedBy: ['tw33', 'tw34'] },
  { x: 180, y: 240, layer: 2, id: 'tw43', supportedBy: ['tw34', 'tw35'] },
  { x: 240, y: 240, layer: 2, id: 'tw44', supportedBy: ['tw35', 'tw36'] },
  
  { x: 90, y: 120, layer: 3, id: 'tw45', supportedBy: ['tw37', 'tw38'] },
  { x: 150, y: 120, layer: 3, id: 'tw46', supportedBy: ['tw38', 'tw39'] },
  { x: 210, y: 120, layer: 3, id: 'tw47', supportedBy: ['tw39', 'tw40'] },
  { x: 150, y: 180, layer: 3, id: 'tw48', supportedBy: ['tw41', 'tw42'] },
];

export const TOWER_FORMATION: MahjongLayout = {
  name: 'Tower Formation',
  difficulty: 'medium',
  positions: towerFormationPositions,
  maxLayers: 4
};