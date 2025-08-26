import { TilePosition, MahjongLayout, MahjongDifficulty } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';

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
 * @deprecated - Use pixel-perfect layouts from layouts.ts instead
 * Adaptive Layout Generator - Minimal placeholder for compatibility
 */
export class AdaptiveLayoutGenerator {
  
  /**
   * @deprecated - Returns empty layout. Use authentic formations instead.
   */
  static generateAdaptiveLayout(config: AdaptiveLayoutConfig): MahjongLayout {
    console.warn('AdaptiveLayoutGenerator is deprecated. Use authentic formations from layouts.ts');
    
    return {
      name: 'Deprecated Adaptive',
      difficulty: config.difficulty,
      positions: [],
      maxLayers: 1
    };
  }

  /**
   * @deprecated - No longer needed with pixel-perfect layouts
   */
  static ensureSolvability(positions: TilePosition[]): TilePosition[] {
    return positions;
  }
}