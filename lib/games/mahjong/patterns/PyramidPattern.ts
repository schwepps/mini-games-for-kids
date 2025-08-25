import { LayoutPattern, PatternConfig, createPosition } from './BasePattern';
import { TilePosition } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';
import { autoRegisterPattern } from './PatternRegistry';

/**
 * Pyramid Pattern - Spiral from center outward creating pyramid-like structures
 * This is a refined version of the original spiral algorithm with mobile optimizations
 */
export class PyramidPattern extends LayoutPattern {
  readonly name = 'pyramid';
  readonly description = 'Spiral pyramid structure building from center outward';
  readonly mobileOptimized = true;
  readonly complexity = 2; // Moderate complexity for solvability
  readonly preferredDevices: ('mobile' | 'tablet' | 'desktop')[] = ['mobile', 'tablet', 'desktop'];

  generatePositions(config: PatternConfig): TilePosition[] {
    const positions: TilePosition[] = [];
    let tileCount = 0;
    
    // Build layers from bottom to top
    for (let layer = 0; layer < config.layerConfig.layers && tileCount < config.totalTiles; layer++) {
      const tilesInThisLayer = Math.min(
        config.layerConfig.tilesPerLayer,
        config.totalTiles - tileCount
      );
      
      const layerPositions = this.generateSpiralLayer(
        layer,
        tilesInThisLayer,
        config.layerConfig
      );
      
      positions.push(...layerPositions);
      tileCount += tilesInThisLayer;
    }
    
    return positions.slice(0, config.totalTiles);
  }

  /**
   * Generate positions for a specific layer using spiral pattern
   * @param layer Current layer number (0 = bottom)
   * @param tilesNeeded Number of tiles needed for this layer
   * @param layerConfig Layer configuration
   * @returns Array of positions for this layer
   */
  private generateSpiralLayer(
    layer: number,
    tilesNeeded: number,
    layerConfig: { gridWidth: number; gridHeight: number }
  ): TilePosition[] {
    const positions: TilePosition[] = [];
    const visited = new Set<string>();
    
    // Start from center
    const { centerRow, centerCol } = this.getGridCenter(layerConfig.gridWidth, layerConfig.gridHeight);
    
    // Spiral directions: right, down, left, up
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    let row = centerRow;
    let col = centerCol;
    let dirIndex = 0;
    let steps = 1;
    let tileCount = 0;
    
    // Place center tile first
    if (this.isValidPosition(row, col, layerConfig.gridWidth, layerConfig.gridHeight) && tileCount < tilesNeeded) {
      positions.push(createPosition(row, col, layer));
      visited.add(`${row},${col}`);
      tileCount++;
    }
    
    // Spiral outward
    while (tileCount < tilesNeeded && positions.length < layerConfig.gridWidth * layerConfig.gridHeight) {
      // Two directions per step size (right+down, left+up, etc.)
      for (let i = 0; i < 2 && tileCount < tilesNeeded; i++) {
        for (let j = 0; j < steps && tileCount < tilesNeeded; j++) {
          const direction = directions[dirIndex];
          if (!direction) break;
          const [dRow, dCol] = direction;
          if (dRow === undefined || dCol === undefined) break;
          row += dRow;
          col += dCol;
          
          const posKey = `${row},${col}`;
          if (
            this.isValidPosition(row, col, layerConfig.gridWidth, layerConfig.gridHeight) &&
            !visited.has(posKey)
          ) {
            positions.push(createPosition(row, col, layer));
            visited.add(posKey);
            tileCount++;
          }
        }
        dirIndex = (dirIndex + 1) % 4;
      }
      steps++;
    }
    
    return positions;
  }

  /**
   * Override layer recommendations for mobile-first pyramid design
   */
  override getRecommendedLayers(containerSize: ContainerSize, totalTiles: number): number {
    const deviceType = this.getDeviceType(containerSize);
    
    // Pyramid works best with moderate layer counts
    if (deviceType === 'mobile') {
      // Mobile: prefer more layers for vertical efficiency
      if (totalTiles <= 24) return 4;
      if (totalTiles <= 36) return 5;
      return 6;
    } else if (deviceType === 'tablet') {
      // Tablet: balanced approach
      if (totalTiles <= 24) return 3;
      if (totalTiles <= 36) return 4;
      return 5;
    } else {
      // Desktop: can spread wider, fewer layers
      if (totalTiles <= 24) return 2;
      if (totalTiles <= 36) return 3;
      return 4;
    }
  }
}

// Auto-register this pattern
const pyramidPattern = new PyramidPattern();
autoRegisterPattern(pyramidPattern);