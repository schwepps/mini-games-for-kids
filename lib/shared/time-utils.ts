/**
 * Shared time utilities for consistent time handling across games
 */

/**
 * Format seconds into MM:SS format for display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate game duration in seconds from start time to now
 */
export function calculateGameTime(startTime: Date | null): number {
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime.getTime()) / 1000);
}

/**
 * Format a duration in a human-readable way (for longer times)
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const remainingSecs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  
  if (mins > 0) {
    return remainingSecs > 0 ? `${mins}m ${remainingSecs}s` : `${mins}m`;
  }
  
  return `${seconds}s`;
}