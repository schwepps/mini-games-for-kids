import { LayoutPattern, PatternConfig } from './BasePattern';
import { ContainerSize } from '@/hooks/shared/useContainerSize';

/**
 * Pattern selection criteria for intelligent pattern picking
 */
export interface PatternSelectionCriteria {
  containerSize: ContainerSize;
  totalTiles: number;
  preferredComplexity?: number; // 1-5 scale
  deviceOptimized?: boolean; // Prefer device-optimized patterns
  randomSeed?: string; // For consistent randomization
}

/**
 * Registry and manager for all Mahjong layout patterns
 * Handles pattern registration, selection, and validation
 */
export class PatternRegistry {
  private static patterns: Map<string, LayoutPattern> = new Map();
  
  /**
   * Register a new layout pattern
   * @param pattern Pattern implementation to register
   */
  static registerPattern(pattern: LayoutPattern): void {
    this.patterns.set(pattern.name, pattern);
  }
  
  /**
   * Get all registered patterns
   * @returns Array of all registered patterns
   */
  static getAllPatterns(): LayoutPattern[] {
    return Array.from(this.patterns.values());
  }
  
  /**
   * Get a specific pattern by name
   * @param name Pattern name
   * @returns Pattern implementation or undefined if not found
   */
  static getPattern(name: string): LayoutPattern | undefined {
    return this.patterns.get(name);
  }
  
  /**
   * Get patterns suitable for a specific device type
   * @param deviceType Device classification
   * @returns Array of suitable patterns
   */
  static getPatternsForDevice(deviceType: 'mobile' | 'tablet' | 'desktop'): LayoutPattern[] {
    return this.getAllPatterns().filter(pattern => 
      pattern.preferredDevices.includes(deviceType)
    );
  }
  
  /**
   * Intelligently select the best pattern based on criteria
   * @param criteria Selection criteria including container size and preferences
   * @returns Selected pattern
   */
  static selectBestPattern(criteria: PatternSelectionCriteria): LayoutPattern {
    const availablePatterns = this.getAllPatterns();
    
    if (availablePatterns.length === 0) {
      throw new Error('No patterns registered. Please register at least one pattern.');
    }
    
    // Filter patterns suitable for this device
    const deviceType = this.getDeviceType(criteria.containerSize);
    let suitablePatterns = this.getPatternsForDevice(deviceType);
    
    // If no device-specific patterns, use all patterns
    if (suitablePatterns.length === 0) {
      suitablePatterns = availablePatterns;
    }
    
    // Filter by complexity preference if specified
    if (criteria.preferredComplexity) {
      const complexityFiltered = suitablePatterns.filter(pattern =>
        Math.abs(pattern.complexity - criteria.preferredComplexity!) <= 1
      );
      
      if (complexityFiltered.length > 0) {
        suitablePatterns = complexityFiltered;
      }
    }
    
    // Use deterministic randomization if seed provided, otherwise random
    let selectedIndex: number;
    if (criteria.randomSeed) {
      selectedIndex = this.seededRandom(criteria.randomSeed, suitablePatterns.length);
    } else {
      selectedIndex = Math.floor(Math.random() * suitablePatterns.length);
    }
    
    return suitablePatterns[selectedIndex]!;
  }
  
  /**
   * Select a pattern with weighted preferences based on device optimization
   * @param criteria Selection criteria
   * @returns Selected pattern with device-specific weighting
   */
  static selectWeightedPattern(criteria: PatternSelectionCriteria): LayoutPattern {
    const deviceType = this.getDeviceType(criteria.containerSize);
    const allPatterns = this.getAllPatterns();
    
    if (allPatterns.length === 0) {
      throw new Error('No patterns registered');
    }
    
    // Create weighted selection based on device optimization and mobile-first design
    const weights: { pattern: LayoutPattern; weight: number }[] = allPatterns.map(pattern => {
      let weight = 1; // Base weight
      
      // Higher weight for patterns that prefer this device type
      if (pattern.preferredDevices.includes(deviceType)) {
        weight += 2;
      }
      
      // Extra weight for mobile-optimized patterns on mobile devices
      if (deviceType === 'mobile' && pattern.mobileOptimized) {
        weight += 3;
      }
      
      // Complexity matching bonus
      if (criteria.preferredComplexity) {
        const complexityDiff = Math.abs(pattern.complexity - criteria.preferredComplexity);
        weight += Math.max(0, 2 - complexityDiff); // Closer complexity = higher weight
      }
      
      return { pattern, weight };
    });
    
    // Select based on weights
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    const random = criteria.randomSeed 
      ? this.seededRandom(criteria.randomSeed, 100) / 100 
      : Math.random();
    
    let currentWeight = 0;
    const targetWeight = random * totalWeight;
    
    for (const item of weights) {
      currentWeight += item.weight;
      if (currentWeight >= targetWeight) {
        return item.pattern;
      }
    }
    
    // Fallback to first pattern (shouldn't reach here)
    return weights[0]!.pattern;
  }
  
  /**
   * Validate if a pattern can generate a layout for given constraints
   * @param pattern Pattern to validate
   * @param config Pattern configuration
   * @returns true if pattern can handle the configuration
   */
  static validatePatternConfig(pattern: LayoutPattern, config: PatternConfig): boolean {
    try {
      // Check if pattern can fit in container
      if (!pattern.canFitInContainer(config)) {
        return false;
      }
      
      // Try generating positions (dry run)
      const positions = pattern.generatePositions(config);
      
      // Validate we got the expected number of positions
      if (positions.length !== config.totalTiles) {
        return false;
      }
      
      // Basic validation: all positions should be valid
      return positions.every(pos => 
        pos.x >= 0 && pos.y >= 0 && pos.layer >= 0
      );
      
    } catch (error) {
      console.warn(`Pattern ${pattern.name} failed validation:`, error);
      return false;
    }
  }
  
  /**
   * Get device type from container dimensions
   * @param containerSize Container dimensions
   * @returns Device type classification
   */
  private static getDeviceType(containerSize: ContainerSize): 'mobile' | 'tablet' | 'desktop' {
    if (containerSize.width < 640) return 'mobile';
    if (containerSize.width < 1024) return 'tablet';
    return 'desktop';
  }
  
  /**
   * Generate a seeded random number for consistent pattern selection
   * @param seed Random seed string
   * @param max Maximum value (exclusive)
   * @returns Seeded random number
   */
  private static seededRandom(seed: string, max: number): number {
    // Simple seeded random number generator
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % max;
  }
}

/**
 * Auto-register patterns when imported
 * This allows patterns to self-register by simply importing them
 */
export function autoRegisterPattern(pattern: LayoutPattern): void {
  PatternRegistry.registerPattern(pattern);
}