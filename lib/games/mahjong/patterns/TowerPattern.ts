import { LayoutPattern, PatternConfig, createPosition } from './BasePattern';
import { TilePosition } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';
import { autoRegisterPattern } from './PatternRegistry';

/**
 * Tower Pattern - Narrow base building straight up
 * Perfect for mobile portrait orientation and touch interaction
 */
export class TowerPattern extends LayoutPattern {
  readonly name = 'tower';
  readonly description = 'Narrow tower structure building straight up - perfect for mobile';
  readonly mobileOptimized = true;
  readonly complexity = 1; // Simple structure, easy solvability
  readonly preferredDevices: ('mobile' | 'tablet' | 'desktop')[] = ['mobile', 'tablet'];

  generatePositions(config: PatternConfig): TilePosition[] {
    const positions: TilePosition[] = [];
    let tileCount = 0;
    
    // Calculate optimal base size for tower
    const baseSize = this.calculateTowerBaseSize(config.totalTiles, config.layerConfig.layers);
    
    // Build tower from bottom to top
    for (let layer = 0; layer < config.layerConfig.layers && tileCount < config.totalTiles; layer++) {
      const tilesInThisLayer = Math.min(
        this.getTilesForTowerLayer(layer, baseSize, config.layerConfig.layers),
        config.totalTiles - tileCount
      );
      
      const layerPositions = this.generateTowerLayer(
        layer,
        tilesInThisLayer,
        baseSize,
        config.layerConfig
      );
      
      positions.push(...layerPositions);
      tileCount += tilesInThisLayer;
    }
    
    return positions.slice(0, config.totalTiles);
  }

  /**
   * Calculate optimal base size for the tower based on total tiles and layers
   * @param totalTiles Total number of tiles to place
   * @param totalLayers Total number of layers
   * @returns Base size (width/height of base layer)
   */
  private calculateTowerBaseSize(totalTiles: number, totalLayers: number): number {
    // Start with a compact base and build up
    const avgTilesPerLayer = totalTiles / totalLayers;
    
    // Tower base should be small but accommodate tiles efficiently
    if (avgTilesPerLayer <= 4) return 2; // 2x2 base
    if (avgTilesPerLayer <= 9) return 3; // 3x3 base
    if (avgTilesPerLayer <= 16) return 4; // 4x4 base
    return 5; // 5x5 base for very large towers
  }

  /**
   * Calculate how many tiles should be in each tower layer
   * Tower gets narrower as it goes up
   * @param layer Current layer (0 = bottom)
   * @param baseSize Base layer size
   * @param totalLayers Total number of layers
   * @returns Number of tiles for this layer
   */
  private getTilesForTowerLayer(layer: number, baseSize: number, totalLayers: number): number {
    // Tower tapers as it goes up
    const tapering = 1 - (layer / (totalLayers + 1)) * 0.3; // Gradual tapering
    const layerSize = Math.max(1, Math.floor(baseSize * tapering));
    
    // Square area for this layer size
    return layerSize * layerSize;
  }

  /**
   * Generate positions for a tower layer
   * @param layer Current layer number
   * @param tilesNeeded Number of tiles needed for this layer
   * @param baseSize Base size of the tower
   * @param layerConfig Layer configuration
   * @returns Array of positions for this layer
   */
  private generateTowerLayer(
    layer: number,
    tilesNeeded: number,
    baseSize: number,
    layerConfig: { gridWidth: number; gridHeight: number }
  ): TilePosition[] {
    const positions: TilePosition[] = [];
    
    // Calculate current layer size (tapers as we go up)
    const tapering = 1 - (layer / 10) * 0.3; // Gradual tapering
    const currentSize = Math.max(1, Math.floor(baseSize * tapering));
    
    // Center the layer within the grid
    const { centerRow, centerCol } = this.getGridCenter(layerConfig.gridWidth, layerConfig.gridHeight);
    const offset = Math.floor(currentSize / 2);
    
    let tileCount = 0;
    
    // Fill layer from center outward in a square pattern
    for (let r = 0; r < currentSize && tileCount < tilesNeeded; r++) {
      for (let c = 0; c < currentSize && tileCount < tilesNeeded; c++) {
        const row = centerRow - offset + r;
        const col = centerCol - offset + c;
        
        if (this.isValidPosition(row, col, layerConfig.gridWidth, layerConfig.gridHeight)) {
          positions.push(createPosition(row, col, layer));
          tileCount++;
        }
      }
    }
    
    return positions;
  }

  /**
   * Override layer recommendations for tower design
   * Towers work best with more layers to create height
   */
  override getRecommendedLayers(containerSize: ContainerSize, totalTiles: number): number {
    const deviceType = this.getDeviceType(containerSize);
    
    // Towers prefer more layers to build height
    if (deviceType === 'mobile') {
      // Mobile: maximize vertical building for portrait orientation
      if (totalTiles <= 24) return 6;
      if (totalTiles <= 36) return 7;
      return 8;
    } else if (deviceType === 'tablet') {
      // Tablet: still prefer height but more moderate
      if (totalTiles <= 24) return 5;
      if (totalTiles <= 36) return 6;
      return 7;
    } else {
      // Desktop: can still build towers but less extreme
      if (totalTiles <= 24) return 4;
      if (totalTiles <= 36) return 5;
      return 6;
    }
  }

  /**
   * Tower patterns fit well in narrow containers
   */
  override canFitInContainer(config: PatternConfig): boolean {
    // Towers are designed to be narrow and tall, so they fit well in most containers
    const baseSize = this.calculateTowerBaseSize(config.totalTiles, config.layerConfig.layers);
    const requiredWidth = baseSize * (config.tileSize + config.minSpacing);
    const requiredHeight = baseSize * (config.tileSize + config.minSpacing);
    
    // Add some buffer for 3D layer offsets
    const bufferWidth = config.layerConfig.layers * 10;
    const bufferHeight = config.layerConfig.layers * 10;
    
    return (requiredWidth + bufferWidth) <= config.containerSize.width && 
           (requiredHeight + bufferHeight) <= config.containerSize.height;
  }
}

// Auto-register this pattern
const towerPattern = new TowerPattern();
autoRegisterPattern(towerPattern);