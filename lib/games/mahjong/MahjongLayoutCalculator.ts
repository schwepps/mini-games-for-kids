import { MahjongDifficulty } from '@/types/mahjong';

/**
 * MahJong Layout Calculator
 * Focused on tile positioning and responsive sizing calculations
 */
export class MahjongLayoutCalculator {
  
  /**
   * Get responsive tile size based on screen width and difficulty
   * Unified with MahjongBoard.tsx tile sizing system
   */
  static getResponsiveTileSize(
    screenWidth: number, 
    difficulty: MahjongDifficulty
  ): number {
    // Updated to use consistent breakpoints (768px/1280px) and larger tile sizes
    // Aligned with MahjongBoard.tsx calculateOptimalTileSize()
    const baseSize = {
      easy: { mobile: 45, tablet: 65, desktop: 75 },
      medium: { mobile: 45, tablet: 65, desktop: 75 },
      hard: { mobile: 45, tablet: 65, desktop: 75 }
    };

    const sizes = baseSize[difficulty];

    // Use Tailwind CSS aligned breakpoints
    if (screenWidth < 768) return sizes.mobile;   // Mobile: < MD
    if (screenWidth < 1280) return sizes.tablet; // Tablet: MD to XL  
    return sizes.desktop;                         // Desktop: XL+
  }
}