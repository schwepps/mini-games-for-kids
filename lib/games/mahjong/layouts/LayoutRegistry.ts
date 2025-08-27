import { MahjongLayout, MahjongDifficulty } from '@/types/mahjong';

/**
 * Layout Registry Interface
 * Defines the contract for layout management
 */
export interface ILayoutRegistry {
  register(layout: MahjongLayout): void;
  getLayout(name: string): MahjongLayout | null;
  getLayoutsByDifficulty(difficulty: MahjongDifficulty): MahjongLayout[];
  getAllLayouts(): MahjongLayout[];
  getLayoutNames(): string[];
}

/**
 * Central registry for all Mahjong layouts
 * Implements Single Responsibility Principle - only manages layout registration
 */
export class LayoutRegistry implements ILayoutRegistry {
  private layouts: Map<string, MahjongLayout> = new Map();
  private layoutsByDifficulty: Map<MahjongDifficulty, MahjongLayout[]> = new Map([
    ['easy', []],
    ['medium', []],
    ['hard', []]
  ]);

  /**
   * Register a new layout in the registry
   */
  register(layout: MahjongLayout): void {
    this.layouts.set(layout.name, layout);
    
    const difficultyLayouts = this.layoutsByDifficulty.get(layout.difficulty) || [];
    difficultyLayouts.push(layout);
    this.layoutsByDifficulty.set(layout.difficulty, difficultyLayouts);
  }

  /**
   * Get a specific layout by name
   */
  getLayout(name: string): MahjongLayout | null {
    return this.layouts.get(name) || null;
  }

  /**
   * Get all layouts for a specific difficulty
   */
  getLayoutsByDifficulty(difficulty: MahjongDifficulty): MahjongLayout[] {
    return [...(this.layoutsByDifficulty.get(difficulty) || [])];
  }

  /**
   * Get all registered layouts
   */
  getAllLayouts(): MahjongLayout[] {
    return Array.from(this.layouts.values());
  }

  /**
   * Get all layout names
   */
  getLayoutNames(): string[] {
    return Array.from(this.layouts.keys());
  }
}

// Export singleton instance
export const layoutRegistry = new LayoutRegistry();