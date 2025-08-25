import { MahjongDifficulty } from '@/types/mahjong';

/**
 * MahJong Layout Calculator
 * Focused on tile positioning and responsive sizing calculations
 */
export class MahjongLayoutCalculator {
  
  /**
   * Get responsive tile size based on screen width and difficulty
   * @deprecated Use getOptimalTileSize for container-aware sizing
   */
  static getResponsiveTileSize(
    screenWidth: number, 
    difficulty: MahjongDifficulty
  ): number {
    const baseSize = {
      easy: { mobile: 48, tablet: 60, desktop: 72 },
      medium: { mobile: 44, tablet: 56, desktop: 68 },
      hard: { mobile: 40, tablet: 52, desktop: 64 }
    };

    const sizes = baseSize[difficulty];

    if (screenWidth < 640) return sizes.mobile;
    if (screenWidth < 1024) return sizes.tablet;
    return sizes.desktop;
  }
}