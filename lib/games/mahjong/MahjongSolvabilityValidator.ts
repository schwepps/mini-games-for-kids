import { MahjongBoard, MahjongTile } from '@/types/mahjong';

/**
 * MahJong Solvability Validator
 * Focused on game rules validation and tile selectability
 */
export class MahjongSolvabilityValidator {
  
  /**
   * Update tile selectability based on MahJong rules
   */
  static updateTileSelectability(board: MahjongBoard): void {
    board.tiles.forEach(tile => {
      if (tile.isMatched) {
        tile.isSelectable = false;
        return;
      }

      tile.isSelectable = this.isTileSelectable(tile, board);
    });
  }

  /**
   * Update coverage information for all tiles
   */
  static updateTileCoverage(board: MahjongBoard): void {
    board.tiles.forEach(tile => {
      if (tile.isMatched) {
        tile.isCovered = false;
        tile.coveredBy = [];
        return;
      }

      // Find all tiles covering this tile
      const coveringTiles = board.tiles.filter(otherTile =>
        !otherTile.isMatched &&
        otherTile.layer === tile.layer + 1 &&
        otherTile.row === tile.row &&
        otherTile.col === tile.col
      );

      tile.isCovered = coveringTiles.length > 0;
      tile.coveredBy = coveringTiles.map(t => t.id);
    });
  }

  /**
   * Check if a tile is selectable (proper MahJong rules)
   * A tile is selectable if:
   * 1. It's not covered by another tile above
   * 2. It has at least one free side (left or right)
   */
  static isTileSelectable(tile: MahjongTile, board: MahjongBoard): boolean {
    if (tile.isMatched || tile.isCovered) return false;

    // Check if at least one side is free (left OR right)
    const hasLeftTile = board.tiles.some(otherTile => 
      !otherTile.isMatched &&
      otherTile.layer === tile.layer &&
      otherTile.row === tile.row &&
      otherTile.col === tile.col - 1
    );

    const hasRightTile = board.tiles.some(otherTile => 
      !otherTile.isMatched &&
      otherTile.layer === tile.layer &&
      otherTile.row === tile.row &&
      otherTile.col === tile.col + 1
    );

    // At least one side must be free
    return !hasLeftTile || !hasRightTile;
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