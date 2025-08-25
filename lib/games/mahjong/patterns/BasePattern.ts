import { TilePosition } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';

export interface LayerConfiguration {
  layers: number;
  gridWidth: number;
  gridHeight: number;
  tilesPerLayer: number;
  totalWidth: number;
  totalHeight: number;
}

export interface PatternConfig {
  containerSize: ContainerSize;
  totalTiles: number;
  layerConfig: LayerConfiguration;
  tileSize: number;
  minSpacing: number;
}

/**
 * Base interface for all Mahjong layout patterns
 * Each pattern creates a unique 3D architectural style
 */
export abstract class LayoutPattern {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly mobileOptimized: boolean;
  abstract readonly complexity: number; // 1-5 scale for solvability validation intensity
  
  /**
   * Device types this pattern works best on
   */
  abstract readonly preferredDevices: ('mobile' | 'tablet' | 'desktop')[];
  
  /**
   * Generate tile positions for this pattern
   * @param config Pattern configuration including container constraints
   * @returns Array of tile positions forming the pattern's 3D structure
   */
  abstract generatePositions(config: PatternConfig): TilePosition[];
  
  /**
   * Validate if this pattern can fit within container constraints
   * @param config Pattern configuration
   * @returns true if pattern can fit, false otherwise
   */
  canFitInContainer(config: PatternConfig): boolean {
    const requiredWidth = config.layerConfig.totalWidth;
    const requiredHeight = config.layerConfig.totalHeight;
    
    return requiredWidth <= config.containerSize.width && 
           requiredHeight <= config.containerSize.height;
  }
  
  /**
   * Get recommended layer count for this pattern based on device and tile count
   * @param containerSize Container dimensions
   * @param totalTiles Total number of tiles to place
   * @returns Recommended number of layers
   */
  getRecommendedLayers(containerSize: ContainerSize, totalTiles: number): number {
    const deviceType = this.getDeviceType(containerSize);
    
    // Default layer recommendations by device (can be overridden by patterns)
    if (deviceType === 'mobile') {
      return Math.min(6, Math.ceil(totalTiles / 8)); // Prefer vertical stacking
    } else if (deviceType === 'tablet') {
      return Math.min(5, Math.ceil(totalTiles / 12)); // Balanced approach
    } else {
      return Math.min(4, Math.ceil(totalTiles / 16)); // Prefer horizontal spread
    }
  }
  
  /**
   * Calculate if a position is valid within grid constraints
   * @param row Row position
   * @param col Column position
   * @param gridWidth Maximum grid width
   * @param gridHeight Maximum grid height
   * @returns true if position is valid
   */
  protected isValidPosition(row: number, col: number, gridWidth: number, gridHeight: number): boolean {
    return row >= 0 && row < gridHeight && col >= 0 && col < gridWidth;
  }
  
  /**
   * Get device type from container dimensions
   * @param containerSize Container dimensions
   * @returns Device type classification
   */
  protected getDeviceType(containerSize: ContainerSize): 'mobile' | 'tablet' | 'desktop' {
    if (containerSize.width < 640) return 'mobile';
    if (containerSize.width < 1024) return 'tablet';
    return 'desktop';
  }
  
  /**
   * Calculate the center position of a grid
   * @param gridWidth Grid width
   * @param gridHeight Grid height
   * @returns Center row and column
   */
  protected getGridCenter(gridWidth: number, gridHeight: number): { centerRow: number; centerCol: number } {
    return {
      centerRow: Math.floor(gridHeight / 2),
      centerCol: Math.floor(gridWidth / 2)
    };
  }
}

/**
 * Helper function to create position objects
 * @param row Row position in grid
 * @param col Column position in grid  
 * @param layer Layer/height position
 * @returns TilePosition object
 */
export function createPosition(row: number, col: number, layer: number): TilePosition {
  return { row, col, layer };
}