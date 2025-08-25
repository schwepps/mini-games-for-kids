import { ContainerSize } from '@/hooks/shared/useContainerSize';

import { MAHJONG_LAYOUT } from '@/lib/constants/gameConstants';

export interface LayerConfiguration {
  layers: number;
  gridWidth: number;
  gridHeight: number;
  tilesPerLayer: number;
  totalWidth: number;
  totalHeight: number;
}

/**
 * Device Layout Optimizer
 * Focused on device-specific calculations and constraints
 */
export class DeviceLayoutOptimizer {
  
  /**
   * Calculate optimal layer configuration based on container constraints
   */
  static calculateOptimalLayerConfiguration(
    containerSize: ContainerSize,
    totalTiles: number,
    tileSize: number,
    maxLayers?: number
  ): LayerConfiguration {
    const deviceType = this.getDeviceType(containerSize);
    const spacing = MAHJONG_LAYOUT.TILE_SPACING;
    const layerOffset = MAHJONG_LAYOUT.LAYER_OFFSET;
    
    // Device-specific layer preferences
    const layerPreferences = {
      mobile: { min: 4, max: 6, bias: 'vertical' },
      tablet: { min: 3, max: 5, bias: 'balanced' },
      desktop: { min: 2, max: 4, bias: 'horizontal' }
    };
    
    const prefs = layerPreferences[deviceType];
    const targetLayers = maxLayers ? Math.min(maxLayers, prefs.max) : prefs.max;
    
    // Calculate optimal grid dimensions for each layer count
    let bestConfig: LayerConfiguration | null = null;
    let bestScore = -1;
    
    for (let layers = prefs.min; layers <= targetLayers; layers++) {
      const tilesPerLayer = Math.ceil(totalTiles / layers);
      const gridSize = Math.ceil(Math.sqrt(tilesPerLayer));
      
      // Calculate required dimensions
      const requiredWidth = (gridSize * (tileSize + spacing)) + (layers * layerOffset);
      const requiredHeight = (gridSize * (tileSize + spacing)) + (layers * layerOffset);
      
      // Check if it fits in container
      if (requiredWidth <= containerSize.width && requiredHeight <= containerSize.height) {
        // Score based on space utilization and device preferences
        const spaceUtilization = (requiredWidth * requiredHeight) / (containerSize.width * containerSize.height);
        const deviceOptimality = deviceType === 'mobile' ? layers / targetLayers : (targetLayers - layers + 1) / targetLayers;
        const score = spaceUtilization * 0.6 + deviceOptimality * 0.4;
        
        if (score > bestScore) {
          bestScore = score;
          bestConfig = {
            layers,
            gridWidth: gridSize,
            gridHeight: gridSize,
            tilesPerLayer,
            totalWidth: requiredWidth,
            totalHeight: requiredHeight
          };
        }
      }
    }
    
    // Fallback if nothing fits
    if (!bestConfig) {
      const fallbackLayers = Math.max(1, Math.ceil(totalTiles / 12));
      const fallbackGrid = Math.ceil(Math.sqrt(Math.ceil(totalTiles / fallbackLayers)));
      
      bestConfig = {
        layers: fallbackLayers,
        gridWidth: fallbackGrid,
        gridHeight: fallbackGrid,
        tilesPerLayer: Math.ceil(totalTiles / fallbackLayers),
        totalWidth: fallbackGrid * (tileSize + 2),
        totalHeight: fallbackGrid * (tileSize + 2)
      };
    }
    
    return bestConfig;
  }
  
  /**
   * Get device type from container size
   */
  static getDeviceType(containerSize: ContainerSize): 'mobile' | 'tablet' | 'desktop' {
    if (containerSize.width < 640) return 'mobile';
    if (containerSize.width < 1024) return 'tablet';
    return 'desktop';
  }
  
  /**
   * Check if position is valid within grid bounds
   */
  static isValidPosition(row: number, col: number, config: LayerConfiguration): boolean {
    return row >= 0 && row < config.gridHeight && col >= 0 && col < config.gridWidth;
  }
  
  /**
   * Calculate layout bounds including layer offsets
   */
  static calculateLayoutBounds(positions: { row: number; col: number; layer: number }[], tileSize: number): { width: number; height: number } {
    if (positions.length === 0) return { width: 0, height: 0 };
    
    const maxRow = Math.max(...positions.map(p => p.row));
    const maxCol = Math.max(...positions.map(p => p.col));
    const maxLayer = Math.max(...positions.map(p => p.layer));
    
    const layerOffset = MAHJONG_LAYOUT.LAYER_OFFSET;
    const spacing = MAHJONG_LAYOUT.TILE_SPACING;
    
    const width = (maxCol + 1) * (tileSize + spacing) + (maxLayer * layerOffset);
    const height = (maxRow + 1) * (tileSize + spacing) + (maxLayer * layerOffset);
    
    return { width, height };
  }
}