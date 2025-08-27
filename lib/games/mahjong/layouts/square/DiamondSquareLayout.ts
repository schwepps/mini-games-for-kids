import { MahjongLayout, TilePosition } from '@/types/mahjong';

/**
 * Diamond Square Layout
 * Diamond-shaped formation with layered structure
 */
const diamondSquarePositions: TilePosition[] = [
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
  
  { x: 150, y: 90, layer: 2, id: 'd41', supportedBy: ['d25', 'd28'] },
  { x: 180, y: 90, layer: 2, id: 'd42', supportedBy: ['d26', 'd33'] },
  { x: 210, y: 90, layer: 2, id: 'd43', supportedBy: ['d27', 'd29'] },
  
  { x: 120, y: 150, layer: 2, id: 'd44', supportedBy: ['d30', 'd32'] },
  { x: 240, y: 150, layer: 2, id: 'd45', supportedBy: ['d31', 'd34'] },
  
  { x: 150, y: 210, layer: 2, id: 'd46', supportedBy: ['d35', 'd37'] },
  { x: 180, y: 210, layer: 2, id: 'd47', supportedBy: ['d33', 'd38'] },
  { x: 210, y: 210, layer: 2, id: 'd48', supportedBy: ['d36', 'd40'] },
];

export const DIAMOND_SQUARE: MahjongLayout = {
  name: 'Diamond Square',
  difficulty: 'easy',
  positions: diamondSquarePositions,
  maxLayers: 3
};