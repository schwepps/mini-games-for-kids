import { ICharacter } from '@/types/guess-who';
import { 
  MahjongBoard, 
  MahjongTile, 
  MahjongDifficulty 
} from '@/types/mahjong';

/**
 * MahJong Game Generator
 * Creates solvable MahJong boards with cartoon characters
 */

// Import focused sub-classes
import { MahjongBoardGenerator } from './MahjongBoardGenerator';
import { MahjongLayoutCalculator } from './MahjongLayoutCalculator';
import { MahjongSolvabilityValidator } from './MahjongSolvabilityValidator';

/**
 * MahJong Game Generator - Orchestrator class
 * Now follows SRP by delegating to focused sub-classes
 */
export class MahjongGenerator {
  
  /**
   * Generate authentic MahJong board using predefined layouts
   * Uses traditional formations (Turtle, Dragon, Pyramid) with proper mahjong rules
   */
  static generateBoard(
    characters: ICharacter[], 
    difficulty: MahjongDifficulty,
    tileSize: number
  ): MahjongBoard {
    const board = MahjongBoardGenerator.generateBoard(characters, difficulty, tileSize);
    
    // Initialize coverage and selectability
    MahjongSolvabilityValidator.updateTileCoverage(board);
    MahjongSolvabilityValidator.updateTileSelectability(board);
    
    return board;
  }


  static updateTileSelectability(board: MahjongBoard): void {
    MahjongSolvabilityValidator.updateTileSelectability(board);
  }

  static updateTileCoverage(board: MahjongBoard): void {
    MahjongSolvabilityValidator.updateTileCoverage(board);
  }

  static isTileSelectable(tile: MahjongTile): boolean {
    return MahjongSolvabilityValidator.isTileSelectable(tile);
  }

  static canMatchTiles(tile1: MahjongTile, tile2: MahjongTile): boolean {
    return MahjongSolvabilityValidator.canMatchTiles(tile1, tile2);
  }

  static isGameWon(board: MahjongBoard): boolean {
    return MahjongSolvabilityValidator.isGameWon(board);
  }

  static findHintPair(board: MahjongBoard): [MahjongTile, MahjongTile] | null {
    return MahjongSolvabilityValidator.findHintPair(board);
  }

  static hasValidMoves(board: MahjongBoard): boolean {
    return MahjongSolvabilityValidator.hasValidMoves(board);
  }

  static matchTiles(board: MahjongBoard, tile1Id: string, tile2Id: string): boolean {
    return MahjongSolvabilityValidator.matchTiles(board, tile1Id, tile2Id);
  }

  static getResponsiveTileSize(screenWidth: number, difficulty: MahjongDifficulty): number {
    return MahjongLayoutCalculator.getResponsiveTileSize(screenWidth, difficulty);
  }
}