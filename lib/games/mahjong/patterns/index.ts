// Export all pattern-related classes and interfaces
export { LayoutPattern, createPosition } from './BasePattern';
export type { PatternConfig } from './BasePattern';
export { PatternRegistry, autoRegisterPattern } from './PatternRegistry';
export type { PatternSelectionCriteria } from './PatternRegistry';

// Import patterns to trigger auto-registration
import './PyramidPattern';
import './TowerPattern';

// Export pattern classes for direct usage if needed
export { PyramidPattern } from './PyramidPattern';
export { TowerPattern } from './TowerPattern';