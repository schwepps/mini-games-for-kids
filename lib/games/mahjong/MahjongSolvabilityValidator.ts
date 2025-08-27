import { MahjongBoard, MahjongTile } from '@/types/mahjong';

/**
 * Authentic MahJong Solvability Validator
 * Implements proper mahjong rules with slide-out selectability logic
 */
export class MahjongSolvabilityValidator {
  
  /**
   * Update tile selectability based on authentic MahJong rules
   * A tile is selectable if:
   * 1. It's not covered by tiles above
   * 2. It can slide out (left OR right) without hitting other tiles
   */
  static updateTileSelectability(board: MahjongBoard): void {
    board.tiles.forEach(tile => {
      if (tile.isMatched) {
        tile.isSelectable = false;
        tile.leftBlocked = false;
        tile.rightBlocked = false;
        tile.leftBlockedBy = [];
        tile.rightBlockedBy = [];
        return;
      }

      this.updateTileCoverageForTile(tile, board);
      this.updateTileAdjacency(tile, board);
      tile.isSelectable = this.isTileSelectable(tile);
    });
  }

  /**
   * Update coverage information for all tiles
   */
  static updateTileCoverage(board: MahjongBoard): void {
    board.tiles.forEach(tile => {
      this.updateTileCoverageForTile(tile, board);
    });
  }

  /**
   * Update coverage information using authentic support relationships
   */
  static updateTileCoverageForTile(tile: MahjongTile, board: MahjongBoard): void {
    if (tile.isMatched) {
      tile.isCovered = false;
      tile.coveredBy = [];
      tile.supporting = [];
      tile.supportedBy = [];
      return;
    }

    const layoutSupportedBy = tile.supportedBy || [];
    
    const coveringTiles = board.tiles.filter(otherTile =>
      !otherTile.isMatched &&
      otherTile.layer > tile.layer &&
      this.tilesDirectlyOverlap(tile, otherTile)
    );

    const supportingTiles = board.tiles.filter(otherTile =>
      !otherTile.isMatched &&
      otherTile.layer < tile.layer &&
      (layoutSupportedBy.includes(otherTile.id) || this.tilesDirectlyOverlap(tile, otherTile))
    );

    const supportedTiles = board.tiles.filter(otherTile =>
      !otherTile.isMatched &&
      otherTile.layer > tile.layer &&
      ((otherTile.supportedBy || []).includes(tile.id) || this.tilesDirectlyOverlap(tile, otherTile))
    );

    tile.isCovered = coveringTiles.length > 0;
    tile.coveredBy = coveringTiles.map(t => t.id);
    tile.supportedBy = supportingTiles.map(t => t.id);
    tile.supporting = supportedTiles.map(t => t.id);
  }

  /**
   * Update adjacency blocking information for a specific tile
   */
  static updateTileAdjacency(tile: MahjongTile, board: MahjongBoard): void {
    if (tile.isMatched) {
      tile.leftBlocked = false;
      tile.rightBlocked = false;
      tile.leftBlockedBy = [];
      tile.rightBlockedBy = [];
      return;
    }

    const leftBlockingTiles = board.tiles.filter(otherTile =>
      !otherTile.isMatched &&
      otherTile.layer === tile.layer &&
      this.tileBlocksLeftMovement(tile, otherTile)
    );

    const rightBlockingTiles = board.tiles.filter(otherTile =>
      !otherTile.isMatched &&
      otherTile.layer === tile.layer &&
      this.tileBlocksRightMovement(tile, otherTile)
    );

    tile.leftBlocked = leftBlockingTiles.length > 0;
    tile.rightBlocked = rightBlockingTiles.length > 0;
    tile.leftBlockedBy = leftBlockingTiles.map(t => t.id);
    tile.rightBlockedBy = rightBlockingTiles.map(t => t.id);
  }

  /**
   * Check if a tile is selectable using authentic MahJong rules
   * A tile is selectable if:
   * 1. It's not covered by tiles above
   * 2. It can slide out (left OR right) without hitting other tiles
   */
  static isTileSelectable(tile: MahjongTile): boolean {
    if (tile.isMatched || tile.isCovered) return false;

    // Authentic mahjong rule: tile must be able to slide left OR right
    return !tile.leftBlocked || !tile.rightBlocked;
  }

  /**
   * Check if two tiles overlap (using footprint-based detection)
   */
  static tilesOverlap(tile1: MahjongTile, tile2: MahjongTile): boolean {
    return this.tilesDirectlyOverlap(tile1, tile2);
  }

  /**
   * Check if two tiles directly overlap in pixel space (strict overlap)
   */
  static tilesDirectlyOverlap(tile1: MahjongTile, tile2: MahjongTile): boolean {
    if (!tile1.footprint || !tile2.footprint) {
      const overlapX = Math.abs(tile1.x - tile2.x) < 60;
      const overlapY = Math.abs(tile1.y - tile2.y) < 60;
      return overlapX && overlapY;
    }

    return !(
      tile1.footprint.maxX <= tile2.footprint.minX ||
      tile1.footprint.minX >= tile2.footprint.maxX ||
      tile1.footprint.maxY <= tile2.footprint.minY ||
      tile1.footprint.minY >= tile2.footprint.maxY
    );
  }

  /**
   * Check if otherTile blocks tile's leftward movement (pixel-perfect)
   */
  static tileBlocksLeftMovement(tile: MahjongTile, otherTile: MahjongTile): boolean {
    if (!tile.footprint || !otherTile.footprint) {
      const isToTheLeft = otherTile.x < tile.x;
      const isTouching = Math.abs(otherTile.x + 60 - tile.x) < 5;
      const verticalOverlap = Math.abs(otherTile.y - tile.y) < 60;
      return isToTheLeft && isTouching && verticalOverlap;
    }

    // Check if otherTile is directly adjacent to the left and prevents sliding
    const isDirectlyLeft = Math.abs(otherTile.footprint.maxX - tile.footprint.minX) < 5;
    const verticalOverlap = !(
      otherTile.footprint.maxY <= tile.footprint.minY ||
      otherTile.footprint.minY >= tile.footprint.maxY
    );

    return isDirectlyLeft && verticalOverlap;
  }

  /**
   * Check if otherTile blocks tile's rightward movement (pixel-perfect)
   */
  static tileBlocksRightMovement(tile: MahjongTile, otherTile: MahjongTile): boolean {
    if (!tile.footprint || !otherTile.footprint) {
      const isToTheRight = otherTile.x > tile.x;
      const isTouching = Math.abs(tile.x + 60 - otherTile.x) < 5;
      const verticalOverlap = Math.abs(otherTile.y - tile.y) < 60;
      return isToTheRight && isTouching && verticalOverlap;
    }

    const isDirectlyRight = Math.abs(tile.footprint.maxX - otherTile.footprint.minX) < 5;
    const verticalOverlap = !(
      otherTile.footprint.maxY <= tile.footprint.minY ||
      otherTile.footprint.minY >= tile.footprint.maxY
    );

    return isDirectlyRight && verticalOverlap;
  }

  /**
   * Check if two tiles can be matched
   */
  static canMatchTiles(tile1: MahjongTile, tile2: MahjongTile): boolean {
    if (!tile1.isSelectable || !tile2.isSelectable) return false;
    if (tile1.id === tile2.id) return false;
    return tile1.character.id === tile2.character.id;
  }

  /**
   * Check if the game is won (all tiles matched)
   */
  static isGameWon(board: MahjongBoard): boolean {
    return board.tiles.every(tile => tile.isMatched);
  }

  /**
   * Find hint pairs - returns first available matching pair
   */
  static findHintPair(board: MahjongBoard): [MahjongTile, MahjongTile] | null {
    const selectableTiles = board.tiles.filter(tile => tile.isSelectable);

    for (let i = 0; i < selectableTiles.length; i++) {
      for (let j = i + 1; j < selectableTiles.length; j++) {
        const tile1 = selectableTiles[i];
        const tile2 = selectableTiles[j];
        
        if (tile1 && tile2 && this.canMatchTiles(tile1, tile2)) {
          return [tile1, tile2];
        }
      }
    }

    return null;
  }

  /**
   * Check if the game has valid moves remaining
   */
  static hasValidMoves(board: MahjongBoard): boolean {
    return this.findHintPair(board) !== null;
  }

  /**
   * Check if two tiles can be matched (pure function - no mutations)
   */
  static matchTiles(board: MahjongBoard, tile1Id: string, tile2Id: string): boolean {
    const tile1 = board.tiles.find(t => t.id === tile1Id);
    const tile2 = board.tiles.find(t => t.id === tile2Id);

    if (!tile1 || !tile2) return false;
    if (!this.canMatchTiles(tile1, tile2)) return false;

    return true;
  }
}