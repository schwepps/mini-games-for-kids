import { ICharacter } from '@/types/game';
import { 
  MahjongBoard, 
  MahjongTile, 
  MahjongLayout, 
  MahjongDifficulty 
} from '@/types/mahjong';
import { getRandomLayoutByDifficulty } from './layouts';
// Removed unused import - AdaptiveLayoutGenerator no longer needed
import { ContainerSize } from '@/hooks/shared/useContainerSize';
import { MAHJONG_LAYOUT } from '@/lib/constants/gameConstants';

/**
 * MahJong Board Generator
 * Focused on creating solvable boards with character tiles
 */
export class MahjongBoardGenerator {
  
  /**
   * Generate a solvable MahJong board (legacy method - uses static layouts)
   */
  static generateBoard(
    characters: ICharacter[], 
    difficulty: MahjongDifficulty,
    tileSize: number
  ): MahjongBoard {
    const layout = getRandomLayoutByDifficulty(difficulty);
    if (!layout) {
      throw new Error(`Layout not found for difficulty: ${difficulty}`);
    }

    const tiles = this.createTiles(layout, characters, tileSize);
    const board: MahjongBoard = {
      tiles,
      layout,
      width: this.calculateBoardWidth(layout, tileSize),
      height: this.calculateBoardHeight(layout, tileSize),
      layers: layout.maxLayers
    };

    return board;
  }

  /**
   * Generate an adaptive MahJong board that fits container constraints
   */
  static generateAdaptiveBoard(
    characters: ICharacter[], 
    difficulty: MahjongDifficulty,
    containerSize: ContainerSize,
    pairCount?: number
  ): MahjongBoard {
    // Get a random static layout for this difficulty
    const baseLayout = getRandomLayoutByDifficulty(difficulty);
    if (!baseLayout) {
      throw new Error(`No layouts found for difficulty: ${difficulty}`);
    }

    // Get optimal tile size based on container and difficulty
    const tileSize = this.getOptimalTileSize(containerSize, difficulty, pairCount);
    
    // Scale the layout to fit the container if needed
    const scaledLayout = this.scaleLayoutToContainer(baseLayout, containerSize, tileSize);
    
    // Create tiles using the scaled layout
    const tiles = this.createTiles(scaledLayout, characters, tileSize);
    
    // Calculate board dimensions
    const board: MahjongBoard = {
      tiles,
      layout: scaledLayout,
      width: this.calculateAdaptiveBoardWidth(scaledLayout, tileSize),
      height: this.calculateAdaptiveBoardHeight(scaledLayout, tileSize),
      layers: scaledLayout.maxLayers
    };

    // Center tiles within container for better UX
    this.centerTilesInContainer(board, containerSize);

    return board;
  }

  /**
   * Create tiles from pixel-perfect layout positions
   */
  static createTiles(
    layout: MahjongLayout, 
    characters: ICharacter[], 
    tileSize: number
  ): MahjongTile[] {
    const tiles: MahjongTile[] = [];
    const characterPairs = this.generateCharacterPairs(characters, layout.positions.length);
    let characterIndex = 0;

    // Create tiles from absolute pixel positions
    for (let i = 0; i < layout.positions.length; i++) {
      const position = layout.positions[i];
      if (!position) continue;

      const character = characterPairs[characterIndex];
      if (!character) continue;

      // Use direct pixel coordinates from layout (scaled by tileSize/60)
      const scaleFactor = tileSize / 60; // Base tile size is 60px
      const scaledX = position.x * scaleFactor;
      const scaledY = position.y * scaleFactor;

      const tile: MahjongTile = {
        id: position.id || `tile-${i}`,
        character,
        layer: position.layer,
        row: 0, // Legacy compatibility - not used in pixel positioning
        col: 0, // Legacy compatibility - not used in pixel positioning
        isSelectable: false,
        isSelected: false,
        isMatched: false,
        isCovered: false,
        coveredBy: [],
        supportedBy: position.supportedBy || [],
        supporting: [],
        leftBlocked: false,
        rightBlocked: false,
        leftBlockedBy: [],
        rightBlockedBy: [],
        x: scaledX,
        y: scaledY,
        z: position.layer * 6, // 6px per layer for enhanced 3D effect
        footprint: {
          minX: scaledX,
          maxX: scaledX + tileSize,
          minY: scaledY,
          maxY: scaledY + tileSize
        }
      };

      tiles.push(tile);
      characterIndex++;
    }

    return tiles;
  }

  /**
   * Generate character pairs ensuring even distribution
   */
  private static generateCharacterPairs(characters: ICharacter[], totalTiles: number): ICharacter[] {
    const pairs: ICharacter[] = [];
    const availableChars = [...characters];
    const pairsNeeded = totalTiles / 2;

    // Shuffle available characters
    for (let i = availableChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = availableChars[i];
      if (temp && availableChars[j]) {
        availableChars[i] = availableChars[j];
        availableChars[j] = temp;
      }
    }

    // Create pairs
    for (let i = 0; i < pairsNeeded; i++) {
      const char = availableChars[i % availableChars.length];
      if (char) {
        pairs.push(char, char); // Add each character twice for pair
      }
    }

    // Shuffle the pairs to randomize placement
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairs[i];
      if (temp && pairs[j]) {
        pairs[i] = pairs[j];
        pairs[j] = temp;
      }
    }

    return pairs;
  }

  /**
   * Calculate board dimensions from pixel positions
   */
  private static calculateBoardDimensions(
    positions: { x: number; y: number; layer: number }[],
    tileSize: number
  ): { width: number; height: number; maxLayer: number } {
    if (positions.length === 0) {
      return { width: 0, height: 0, maxLayer: 0 };
    }

    const scaleFactor = tileSize / 60; // Base tile size is 60px
    let maxX = 0;
    let maxY = 0;
    let maxLayer = 0;

    positions.forEach(pos => {
      const scaledX = pos.x * scaleFactor;
      const scaledY = pos.y * scaleFactor;
      
      maxX = Math.max(maxX, scaledX + tileSize);
      maxY = Math.max(maxY, scaledY + tileSize);
      maxLayer = Math.max(maxLayer, pos.layer);
    });

    // Add layer offset for 3D effect
    const layerOffset = maxLayer * 6;
    
    return {
      width: maxX + layerOffset,
      height: maxY + layerOffset,
      maxLayer
    };
  }

  /**
   * Calculate board width using pixel-perfect dimensions
   */
  private static calculateBoardWidth(layout: MahjongLayout, tileSize: number): number {
    const dimensions = this.calculateBoardDimensions(layout.positions, tileSize);
    return dimensions.width;
  }

  /**
   * Calculate board height using pixel-perfect dimensions
   */
  private static calculateBoardHeight(layout: MahjongLayout, tileSize: number): number {
    const dimensions = this.calculateBoardDimensions(layout.positions, tileSize);
    return dimensions.height;
  }

  /**
   * Center tiles within the container for better UX
   */
  static centerTilesInContainer(board: MahjongBoard, containerSize: ContainerSize): void {
    if (board.tiles.length === 0) return;

    const tileSize = this.estimateTileSizeFromBoard(board);
    const renderingWidth = Math.max(
      Math.min(containerSize.width - 32, board.width || 600),
      320
    );
    const renderingHeight = Math.max(
      Math.min(containerSize.height - 100, board.height || 400),
      240
    );

    const bounds = this.calculateTileStructureBounds(board.tiles, tileSize);
    const offsetX = Math.max(0, (renderingWidth - bounds.width) / 2);
    const offsetY = Math.max(0, (renderingHeight - bounds.height) / 2);
    
    board.tiles.forEach(tile => {
      tile.x += offsetX;
      tile.y += offsetY;
    });
  }

  // Helper methods
  private static estimateTileSizeFromBoard(board: MahjongBoard): number {
    if (board.tiles.length >= 2) {
      const tile1 = board.tiles[0];
      const tile2 = board.tiles.find(t => 
        Math.abs(t.x - tile1!.x) > 0 && Math.abs(t.y - tile1!.y) < 30
      ) || board.tiles[1];
      
      if (tile1 && tile2 && tile1.x !== undefined && tile2.x !== undefined) {
        const estimatedSize = Math.abs(tile2.x - tile1.x);
        if (estimatedSize > 20 && estimatedSize < 100) {
          return estimatedSize;
        }
      }
    }
    
    return 60;
  }

  private static calculateTileStructureBounds(tiles: MahjongTile[], tileSize: number) {
    if (tiles.length === 0) {
      return { width: 0, height: 0, minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    tiles.forEach(tile => {
      const tileLeft = tile.x + (tile.layer * 10);
      const tileTop = tile.y - (tile.layer * 10);
      const tileRight = tileLeft + tileSize;
      const tileBottom = tileTop + tileSize;

      minX = Math.min(minX, tileLeft);
      minY = Math.min(minY, tileTop);
      maxX = Math.max(maxX, tileRight);
      maxY = Math.max(maxY, tileBottom);
    });

    return {
      width: maxX - minX,
      height: maxY - minY,
      minX,
      minY,
      maxX,
      maxY
    };
  }

  /**
   * Get optimal tile size based on container constraints and difficulty
   */
  static getOptimalTileSize(
    containerSize: ContainerSize,
    difficulty: MahjongDifficulty,
    pairCount?: number
  ): number {
    const targetPairCount = pairCount || this.getPairCountForDifficulty(difficulty);
    const totalTiles = targetPairCount * 2;
    const maxLayers = this.getMaxLayersForDevice(containerSize);
    
    const tilesPerLayer = Math.ceil(totalTiles / maxLayers);
    const estimatedGridSize = Math.ceil(Math.sqrt(tilesPerLayer));
    
    const layerOffset = maxLayers * 10;
    const spacing = MAHJONG_LAYOUT.TILE_SPACING;
    const availableWidth = containerSize.width - layerOffset - (spacing * estimatedGridSize);
    const availableHeight = containerSize.height - layerOffset - (spacing * estimatedGridSize);
    
    const maxTileWidth = Math.floor(availableWidth / estimatedGridSize);
    const maxTileHeight = Math.floor(availableHeight / estimatedGridSize);
    const calculatedSize = Math.min(maxTileWidth, maxTileHeight);
    
    const deviceBounds = this.getDeviceTileBounds(containerSize.width);
    return Math.max(deviceBounds.min, Math.min(deviceBounds.max, calculatedSize));
  }

  /**
   * Get pair count for difficulty level
   */
  static getPairCountForDifficulty(difficulty: MahjongDifficulty): number {
    const pairCounts = {
      easy: 12,
      medium: 18,
      hard: 24
    };
    
    return pairCounts[difficulty];
  }

  /**
   * Get maximum layers for device type
   */
  static getMaxLayersForDevice(containerSize: ContainerSize): number {
    const width = containerSize.width;
    
    if (width < 640) return 5;
    if (width < 1024) return 4;
    return 3;
  }

  /**
   * Get device-appropriate tile size bounds
   */
  static getDeviceTileBounds(containerWidth: number): { min: number; max: number } {
    if (containerWidth < 640) return { min: 36, max: 56 };
    if (containerWidth < 1024) return { min: 44, max: 68 };
    return { min: 52, max: 80 };
  }

  /**
   * Calculate adaptive board dimensions
   */
  static calculateAdaptiveBoardWidth(
    layout: MahjongLayout, 
    tileSize: number
  ): number {
    const calculatedWidth = this.calculateBoardWidth(layout, tileSize);
    const maxLayer = Math.max(...layout.positions.map(p => p.layer));
    const layerOffset = maxLayer * 10;
    
    return calculatedWidth + layerOffset;
  }

  static calculateAdaptiveBoardHeight(
    layout: MahjongLayout, 
    tileSize: number
  ): number {
    const calculatedHeight = this.calculateBoardHeight(layout, tileSize);
    const maxLayer = Math.max(...layout.positions.map(p => p.layer));
    const layerOffset = maxLayer * 10;
    
    return calculatedHeight + layerOffset;
  }

  /**
   * Scale a static layout to fit within container constraints
   * Preserves the shape and structure while adapting to screen size
   */
  static scaleLayoutToContainer(
    layout: MahjongLayout,
    containerSize: ContainerSize,
    tileSize: number
  ): MahjongLayout {
    if (layout.positions.length === 0) {
      return layout;
    }

    // Find the bounds of the original layout using pixel coordinates
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    layout.positions.forEach(pos => {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    });

    // Calculate original layout dimensions in pixels
    const originalWidth = maxX - minX + 60; // Add tile width
    const originalHeight = maxY - minY + 60; // Add tile height
    const maxLayer = Math.max(...layout.positions.map(p => p.layer));
    
    // Calculate space needed including layer offsets
    const layerOffset = maxLayer * 6; // 6px per layer offset
    const scaleFactor = tileSize / 60; // Scale based on tile size
    
    const requiredWidth = (originalWidth * scaleFactor) + layerOffset;
    const requiredHeight = (originalHeight * scaleFactor) + layerOffset;
    
    // Check if scaling is needed
    const availableWidth = containerSize.width - 32; // padding
    const availableHeight = containerSize.height - 100; // UI elements
    
    let layoutScaleFactor = 1;
    
    if (requiredWidth > availableWidth || requiredHeight > availableHeight) {
      // Calculate scale factor to fit container
      const widthScale = availableWidth / requiredWidth;
      const heightScale = availableHeight / requiredHeight;
      layoutScaleFactor = Math.min(widthScale, heightScale, 1); // Never scale up, only down
      
      // Ensure minimum playable size
      layoutScaleFactor = Math.max(layoutScaleFactor, 0.5);
    }

    // If no scaling needed, return original
    if (layoutScaleFactor === 1) {
      return layout;
    }

    // Scale the positions using pixel coordinates
    const scaledPositions = layout.positions.map(pos => ({
      x: Math.round((pos.x - minX) * layoutScaleFactor) + minX,
      y: Math.round((pos.y - minY) * layoutScaleFactor) + minY,
      layer: pos.layer, // Don't scale layers
      supportedBy: pos.supportedBy,
      id: pos.id
    }));

    // Return scaled layout
    return {
      ...layout,
      positions: scaledPositions
    };
  }
}