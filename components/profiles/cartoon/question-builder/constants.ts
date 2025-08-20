/**
 * Shared constants for question-builder components
 * Reduces duplication and improves maintainability
 */

// Common button styles
export const BUTTON_STYLES = {
  base: 'h-28 w-full rounded-2xl relative border-4',
  yesButton: 'bg-green-500 hover:bg-green-600 text-white border-green-400 hover:border-green-300',
  noButton: 'bg-red-500 hover:bg-red-600 text-white border-red-400 hover:border-red-300',
  enumButton: 'p-4 bg-white/90 hover:bg-white text-gray-800 border-gray-300 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all',
} as const;

// Common badge styles
export const BADGE_STYLES = {
  base: 'absolute -top-2 -right-2 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg',
} as const;

// Common image dimensions
export const IMAGE_DIMENSIONS = {
  default: { width: 80, height: 80 },
} as const;