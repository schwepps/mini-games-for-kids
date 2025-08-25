import { ICharacter } from '@/types/game';
import { 
  MahjongBoard, 
  MahjongTile, 
  MahjongDifficulty 
} from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';

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
   * Generate a solvable MahJong board (legacy method)
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

  /**
   * Generate an adaptive MahJong board
   */
  static generateAdaptiveBoard(
    characters: ICharacter[], 
    difficulty: MahjongDifficulty,
    containerSize: ContainerSize,
    pairCount?: number
  ): MahjongBoard {
    const board = MahjongBoardGenerator.generateAdaptiveBoard(
      characters, 
      difficulty, 
      containerSize, 
      pairCount
    );
    
    // Initialize coverage and selectability
    MahjongSolvabilityValidator.updateTileCoverage(board);
    MahjongSolvabilityValidator.updateTileSelectability(board);
    
    return board;
  }

  // Delegate tile selectability and coverage methods
  static updateTileSelectability(board: MahjongBoard): void {
    MahjongSolvabilityValidator.updateTileSelectability(board);
  }

  static updateTileCoverage(board: MahjongBoard): void {
    MahjongSolvabilityValidator.updateTileCoverage(board);
  }

  static isTileSelectable(tile: MahjongTile, board: MahjongBoard): boolean {
    return MahjongSolvabilityValidator.isTileSelectable(tile, board);
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

  // Delegate responsive sizing
  static getResponsiveTileSize(screenWidth: number, difficulty: MahjongDifficulty): number {
    return MahjongLayoutCalculator.getResponsiveTileSize(screenWidth, difficulty);
  }
}