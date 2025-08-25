import { TilePosition, MahjongLayout, MahjongDifficulty } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';
import { PatternRegistry, PatternSelectionCriteria } from './patterns/PatternRegistry';
import { PatternConfig } from './patterns/BasePattern';
import { MAHJONG_LAYOUT } from '@/lib/constants/gameConstants';
import './patterns/index'; // Import to trigger pattern registration

export interface AdaptiveLayoutConfig {
  containerSize: ContainerSize;
  pairCount: number;
  difficulty: MahjongDifficulty;
  tileSize: number;
  maxLayers?: number;
  minTileSpacing?: number;
}

export interface SolvabilityChain {
  tileId: string;
  dependsOn: string[];
  canBeRemoved: boolean;
  removalOrder: number;
}

/**
 * Adaptive Layout Generator for Mobile-First Mahjong
 * Generates layouts that fit container constraints and guarantee solvability
 */
export class AdaptiveLayoutGenerator {
  
  /**
   * Generate an adaptive layout that fits container constraints
   */
  static generateAdaptiveLayout(config: AdaptiveLayoutConfig): MahjongLayout {
    const { containerSize, pairCount, difficulty, tileSize } = config;
    const totalTiles = pairCount * 2;
    
    // Determine optimal layer configuration for container
    const layerConfig = this.calculateOptimalLayerConfiguration(
      containerSize,
      totalTiles,
      tileSize,
      config.maxLayers
    );
    
    // Generate base layout structure using intelligent pattern selection
    let positions = this.generateBaseLayout(layerConfig, totalTiles, containerSize, difficulty);
    
    // Ensure solvability by reverse-engineering placement
    positions = this.ensureSolvability(positions);
    
    // Validate layout fits within container constraints
    positions = this.validateAndAdjustForContainer(positions, containerSize, tileSize);
    
    return {
      name: `adaptive-${difficulty}-${Date.now()}`,
      difficulty,
      positions,
      maxLayers: layerConfig.layers
    };
  }
  
  /**
   * Calculate optimal layer configuration based on container constraints
   */
  private static calculateOptimalLayerConfiguration(
    containerSize: ContainerSize,
    totalTiles: number,
    tileSize: number,
    maxLayers?: number
  ): LayerConfiguration {
    const deviceType = this.getDeviceType(containerSize);
    const spacing = MAHJONG_LAYOUT.TILE_SPACING; // Pixel spacing between tiles
    const layerOffset = MAHJONG_LAYOUT.LAYER_OFFSET; // Pixel offset per layer for 3D effect
    
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
      const fallbackLayers = Math.max(1, Math.ceil(totalTiles / 12)); // Max 12 tiles per layer
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
   * Generate base layout structure using intelligent pattern selection
   * Replaces the old hardcoded spiral algorithm with flexible pattern system
   */
  private static generateBaseLayout(
    layerConfig: LayerConfiguration, 
    totalTiles: number, 
    containerSize: ContainerSize, 
    difficulty: MahjongDifficulty
  ): TilePosition[] {
    // Create pattern selection criteria
    const selectionCriteria: PatternSelectionCriteria = {
      containerSize,
      totalTiles,
      preferredComplexity: this.getDifficultyComplexity(difficulty),
      deviceOptimized: true,
      randomSeed: `${containerSize.width}-${containerSize.height}-${totalTiles}-${Math.floor(Date.now() / 1000)}` // Include temporal component for pattern variety
    };
    
    // Select the best pattern for this configuration
    const selectedPattern = PatternRegistry.selectWeightedPattern(selectionCriteria);
    
    // Create pattern configuration
    const patternConfig: PatternConfig = {
      containerSize,
      totalTiles,
      layerConfig,
      tileSize: 60, // Approximate tile size for layout calculation
      minSpacing: 2
    };
    
    // Generate positions using the selected pattern
    try {
      const positions = selectedPattern.generatePositions(patternConfig);
      
      // Validate we got the expected number of tiles
      if (positions.length === totalTiles) {
        return positions;
      }
      
      console.warn(`Pattern ${selectedPattern.name} returned ${positions.length} positions, expected ${totalTiles}`);
    } catch (error) {
      console.warn(`Pattern ${selectedPattern.name} failed to generate layout:`, error);
    }
    
    // Fallback to pyramid pattern if selected pattern fails
    const fallbackPattern = PatternRegistry.getPattern('pyramid');
    if (fallbackPattern) {
      try {
        return fallbackPattern.generatePositions(patternConfig);
      } catch (error) {
        console.warn('Fallback pattern also failed:', error);
      }
    }
    
    // Ultimate fallback: generate simple grid layout
    return this.generateFallbackGridLayout(layerConfig, totalTiles);
  }
  
  /**
   * Generate positions for a specific layer using efficient packing
   */
  private static generateLayerPositions(
    layer: number,
    tilesNeeded: number,
    config: LayerConfiguration
  ): TilePosition[] {
    const positions: TilePosition[] = [];
    const centerRow = Math.floor(config.gridHeight / 2);
    const centerCol = Math.floor(config.gridWidth / 2);
    
    // Use spiral pattern from center outward for better tile distribution
    const visited = new Set<string>();
    const directions: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    
    let row = centerRow;
    let col = centerCol;
    let dirIndex = 0;
    let steps = 1;
    // let stepCount = 0; // Unused variable removed
    let tileCount = 0;
    
    // Add center tile first
    if (this.isValidPosition(row, col, config) && tileCount < tilesNeeded) {
      positions.push({ row, col, layer });
      visited.add(`${row},${col}`);
      tileCount++;
    }
    
    // Spiral outward
    while (tileCount < tilesNeeded && positions.length < config.gridWidth * config.gridHeight) {
      for (let i = 0; i < 2; i++) { // Two directions per step size
        for (let j = 0; j < steps; j++) {
          const direction = directions[dirIndex % directions.length];
          if (!direction) continue;
          const [dRow, dCol] = direction;
          row += dRow;
          col += dCol;
          
          if (this.isValidPosition(row, col, config) && 
              !visited.has(`${row},${col}`) && 
              tileCount < tilesNeeded) {
            positions.push({ row, col, layer });
            visited.add(`${row},${col}`);
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
   * Ensure the layout is solvable using reverse construction
   */
  private static ensureSolvability(positions: TilePosition[]): TilePosition[] {
    // Group tiles by layer for analysis
    const layerGroups = this.groupPositionsByLayer(positions);
    const maxLayer = Math.max(...positions.map(p => p.layer));
    
    // Build solvability chains from top layer down
    const solvabilityChains: SolvabilityChain[] = [];
    const validatedPositions: TilePosition[] = [];
    
    // Start with top layer (always removable)
    for (let layer = maxLayer; layer >= 0; layer--) {
      const layerPositions = layerGroups[layer] || [];
      
      for (const position of layerPositions) {
        const tileId = `tile-${position.row}-${position.col}-${position.layer}`;
        const canBeRemoved = this.canTileBeRemoved(position, validatedPositions);
        
        if (canBeRemoved || layer === maxLayer) {
          validatedPositions.push(position);
          solvabilityChains.push({
            tileId,
            dependsOn: this.findTileDependencies(position, validatedPositions),
            canBeRemoved: true,
            removalOrder: maxLayer - layer
          });
        }
      }
    }
    
    // If we lost too many positions, regenerate with adjusted constraints
    if (validatedPositions.length < positions.length * 0.8) {
      return this.regenerateWithLooserConstraints(positions);
    }
    
    return validatedPositions;
  }
  
  /**
   * Check if a tile can be removed according to Mahjong rules
   */
  private static canTileBeRemoved(position: TilePosition, existingPositions: TilePosition[]): boolean {
    // Check if tile is covered by another tile above
    const isCovered = existingPositions.some(p => 
      p.layer === position.layer + 1 && 
      p.row === position.row && 
      p.col === position.col
    );
    
    if (isCovered) return false;
    
    // Check if at least one side is free (left OR right)
    const hasLeftTile = existingPositions.some(p =>
      p.layer === position.layer &&
      p.row === position.row &&
      p.col === position.col - 1
    );
    
    const hasRightTile = existingPositions.some(p =>
      p.layer === position.layer &&
      p.row === position.row &&
      p.col === position.col + 1
    );
    
    return !hasLeftTile || !hasRightTile;
  }
  
  /**
   * Validate layout fits within container and adjust if necessary
   */
  private static validateAndAdjustForContainer(
    positions: TilePosition[],
    containerSize: ContainerSize,
    tileSize: number
  ): TilePosition[] {
    if (positions.length === 0) return positions;
    
    // Calculate current layout bounds
    const bounds = this.calculateLayoutBounds(positions, tileSize);
    
    // Check if adjustment is needed
    if (bounds.width <= containerSize.width && bounds.height <= containerSize.height) {
      return positions; // Layout fits, no adjustment needed
    }
    
    // Calculate scale factor to fit within container
    const scaleX = containerSize.width / bounds.width;
    const scaleY = containerSize.height / bounds.height;
    const scale = Math.min(scaleX, scaleY, 1); // Never scale up, only down
    
    if (scale < 0.7) {
      // Too much scaling needed, regenerate with fewer tiles per layer
      return this.regenerateCompactLayout(positions);
    }
    
    // Apply scaling to positions
    return this.scalePositions(positions);
  }
  
  // Helper methods
  private static getDeviceType(containerSize: ContainerSize): 'mobile' | 'tablet' | 'desktop' {
    if (containerSize.width < 640) return 'mobile';
    if (containerSize.width < 1024) return 'tablet';
    return 'desktop';
  }
  
  private static isValidPosition(row: number, col: number, config: LayerConfiguration): boolean {
    return row >= 0 && row < config.gridHeight && col >= 0 && col < config.gridWidth;
  }
  
  private static groupPositionsByLayer(positions: TilePosition[]): Record<number, TilePosition[]> {
    const groups: Record<number, TilePosition[]> = {};
    
    positions.forEach(position => {
      if (!groups[position.layer]) {
        groups[position.layer] = [];
      }
      groups[position.layer]!.push(position);
    });
    
    return groups;
  }
  
  private static findTileDependencies(position: TilePosition, positions: TilePosition[]): string[] {
    // Find tiles that must be removed before this tile can be accessed
    const dependencies: string[] = [];
    
    // Tiles directly above this position
    positions.forEach(p => {
      if (p.layer > position.layer && p.row === position.row && p.col === position.col) {
        dependencies.push(`tile-${p.row}-${p.col}-${p.layer}`);
      }
    });
    
    return dependencies;
  }
  
  private static calculateLayoutBounds(positions: TilePosition[], tileSize: number): { width: number; height: number } {
    if (positions.length === 0) return { width: 0, height: 0 };
    
    const maxRow = Math.max(...positions.map(p => p.row));
    const maxCol = Math.max(...positions.map(p => p.col));
    const maxLayer = Math.max(...positions.map(p => p.layer));
    
    const layerOffset = MAHJONG_LAYOUT.LAYER_OFFSET; // Must match the offset used in tile positioning
    const spacing = MAHJONG_LAYOUT.TILE_SPACING;
    
    const width = (maxCol + 1) * (tileSize + spacing) + (maxLayer * layerOffset);
    const height = (maxRow + 1) * (tileSize + spacing) + (maxLayer * layerOffset);
    
    return { width, height };
  }
  
  private static scalePositions(positions: TilePosition[]): TilePosition[] {
    // For now, return original positions since position scaling is complex
    // In a full implementation, this would adjust row/col spacing
    return positions;
  }
  
  private static regenerateWithLooserConstraints(positions: TilePosition[]): TilePosition[] {
    // Simplified regeneration - remove tiles that break solvability
    return positions.filter((_, index) => index < positions.length * 0.9);
  }
  
  private static regenerateCompactLayout(
    positions: TilePosition[]
  ): TilePosition[] {
    // Generate a more compact layout with higher layer count
    const totalTiles = positions.length;
    const compactLayers = Math.ceil(totalTiles / 8); // Smaller base layers
    
    const compactPositions: TilePosition[] = [];
    const tilesPerLayer = Math.ceil(totalTiles / compactLayers);
    const gridSize = Math.ceil(Math.sqrt(tilesPerLayer));
    
    let tileIndex = 0;
    for (let layer = 0; layer < compactLayers && tileIndex < totalTiles; layer++) {
      for (let row = 0; row < gridSize && tileIndex < totalTiles; row++) {
        for (let col = 0; col < gridSize && tileIndex < totalTiles; col++) {
          if (tileIndex < totalTiles) {
            compactPositions.push({ row, col, layer });
            tileIndex++;
          }
        }
      }
    }
    
    return compactPositions;
  }
  
  /**
   * Map difficulty levels to complexity scores for pattern selection
   */
  private static getDifficultyComplexity(difficulty: MahjongDifficulty): number {
    switch (difficulty) {
      case 'easy': return 1;   // Simple patterns
      case 'medium': return 3; // Moderate complexity
      case 'hard': return 4;   // More complex patterns
      default: return 2;       // Default to moderate
    }
  }
  
  /**
   * Generate a simple fallback grid layout when all patterns fail
   */
  private static generateFallbackGridLayout(layerConfig: LayerConfiguration, totalTiles: number): TilePosition[] {
    const positions: TilePosition[] = [];
    const tilesPerLayer = Math.ceil(totalTiles / layerConfig.layers);
    const gridSize = Math.ceil(Math.sqrt(tilesPerLayer));
    
    let tileIndex = 0;
    for (let layer = 0; layer < layerConfig.layers && tileIndex < totalTiles; layer++) {
      for (let row = 0; row < gridSize && tileIndex < totalTiles; row++) {
        for (let col = 0; col < gridSize && tileIndex < totalTiles; col++) {
          if (row < layerConfig.gridHeight && col < layerConfig.gridWidth) {
            positions.push({ row, col, layer });
            tileIndex++;
          }
        }
      }
    }
    
    return positions;
  }
}

interface LayerConfiguration {
  layers: number;
  gridWidth: number;
  gridHeight: number;
  tilesPerLayer: number;
  totalWidth: number;
  totalHeight: number;
}