import { ICharacter } from '@/types/game';
import { 
  MahjongBoard, 
  MahjongTile, 
  MahjongLayout, 
  MahjongDifficulty 
} from '@/types/mahjong';
import { MAHJONG_LAYOUTS } from './layouts';
import { AdaptiveLayoutGenerator, AdaptiveLayoutConfig } from './adaptiveLayoutGenerator';
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
    const layout = MAHJONG_LAYOUTS.find(l => l.difficulty === difficulty);
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
    // Get optimal tile size based on container and difficulty
    const tileSize = this.getOptimalTileSize(containerSize, difficulty, pairCount);
    
    // Calculate pair count based on difficulty if not provided
    const targetPairCount = pairCount || this.getPairCountForDifficulty(difficulty);
    
    // Generate adaptive layout
    const config: AdaptiveLayoutConfig = {
      containerSize,
      pairCount: targetPairCount,
      difficulty,
      tileSize,
      maxLayers: this.getMaxLayersForDevice(containerSize),
      minTileSpacing: MAHJONG_LAYOUT.TILE_SPACING
    };
    
    const layout = AdaptiveLayoutGenerator.generateAdaptiveLayout(config);
    
    // Create tiles using the adaptive layout
    const tiles = this.createTiles(layout, characters, tileSize);
    const board: MahjongBoard = {
      tiles,
      layout,
      width: this.calculateAdaptiveBoardWidth(layout, tileSize),
      height: this.calculateAdaptiveBoardHeight(layout, tileSize),
      layers: layout.maxLayers
    };

    // Center tiles within container for better UX
    this.centerTilesInContainer(board, containerSize);

    return board;
  }

  /**
   * Create tiles from layout and characters
   */
  static createTiles(
    layout: MahjongLayout, 
    characters: ICharacter[], 
    tileSize: number
  ): MahjongTile[] {
    const tiles: MahjongTile[] = [];
    const characterPairs = this.generateCharacterPairs(characters, layout.positions.length);
    let characterIndex = 0;

    // Create tiles from layout positions
    for (let i = 0; i < layout.positions.length; i++) {
      const position = layout.positions[i];
      if (!position) continue;

      const character = characterPairs[characterIndex];
      if (!character) continue;

      const { x, y } = this.calculateTilePixelPosition(position, tileSize);

      const tile: MahjongTile = {
        id: `tile-${i}`,
        character,
        layer: position.layer,
        row: position.row,
        col: position.col,
        isSelectable: false,
        isSelected: false,
        isMatched: false,
        isCovered: false,
        coveredBy: [],
        x,
        y,
        z: position.layer * 4 // 4px per layer for 3D effect
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
   * Calculate pixel position for a tile based on grid position and size
   */
  private static calculateTilePixelPosition(
    position: { row: number; col: number; layer: number },
    tileSize: number
  ): { x: number; y: number } {
    const spacing = MAHJONG_LAYOUT.TILE_SPACING;
    const x = position.col * (tileSize + spacing);
    const y = position.row * (tileSize + spacing);
    
    return { x, y };
  }

  /**
   * Calculate board dimensions
   */
  private static calculateBoardWidth(layout: MahjongLayout, tileSize: number): number {
    const maxCol = Math.max(...layout.positions.map(p => p.col));
    return (maxCol + 1) * (tileSize + 2) + tileSize;
  }

  private static calculateBoardHeight(layout: MahjongLayout, tileSize: number): number {
    const maxRow = Math.max(...layout.positions.map(p => p.row));
    return (maxRow + 1) * (tileSize + 2) + tileSize;
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
      const tile2 = board.tiles.find(t => t.row === tile1?.row && t.col !== tile1?.col) || board.tiles[1];
      
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
}