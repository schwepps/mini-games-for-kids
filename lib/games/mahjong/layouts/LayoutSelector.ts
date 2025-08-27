import { MahjongLayout, MahjongDifficulty } from '@/types/mahjong';
import { ILayoutRegistry } from './LayoutRegistry';

/**
 * Layout Selection Strategy Interface
 * Enables different selection algorithms (Open/Closed Principle)
 */
export interface ILayoutSelectionStrategy {
  select(layouts: MahjongLayout[]): MahjongLayout | null;
}

/**
 * Random selection strategy
 */
export class RandomSelectionStrategy implements ILayoutSelectionStrategy {
  select(layouts: MahjongLayout[]): MahjongLayout | null {
    if (layouts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * layouts.length);
    return layouts[randomIndex] || null;
  }
}

/**
 * Sequential selection strategy (for testing)
 */
export class SequentialSelectionStrategy implements ILayoutSelectionStrategy {
  private currentIndex = 0;

  select(layouts: MahjongLayout[]): MahjongLayout | null {
    if (layouts.length === 0) return null;
    const layout = layouts[this.currentIndex % layouts.length];
    this.currentIndex++;
    return layout || null;
  }
}

/**
 * Layout Selector Interface
 * Defines the contract for layout selection
 */
export interface ILayoutSelector {
  getRandomByDifficulty(difficulty: MahjongDifficulty): MahjongLayout | null;
  getAllLayouts(): MahjongLayout[];
  setSelectionStrategy(strategy: ILayoutSelectionStrategy): void;
}

/**
 * Layout Selector Service
 * Handles difficulty-based layout selection using strategy pattern
 * Implements Dependency Inversion - depends on abstractions
 */
export class LayoutSelector implements ILayoutSelector {
  private selectionStrategy: ILayoutSelectionStrategy;

  constructor(
    private registry: ILayoutRegistry,
    strategy: ILayoutSelectionStrategy = new RandomSelectionStrategy()
  ) {
    this.selectionStrategy = strategy;
  }

  /**
   * Get a random layout based on difficulty
   */
  getRandomByDifficulty(difficulty: MahjongDifficulty): MahjongLayout | null {
    const layouts = this.registry.getLayoutsByDifficulty(difficulty);
    return this.selectionStrategy.select(layouts);
  }

  /**
   * Get all available layouts
   */
  getAllLayouts(): MahjongLayout[] {
    return this.registry.getAllLayouts();
  }

  /**
   * Change the selection strategy (Strategy Pattern)
   */
  setSelectionStrategy(strategy: ILayoutSelectionStrategy): void {
    this.selectionStrategy = strategy;
  }
}