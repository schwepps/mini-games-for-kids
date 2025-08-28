/**
 * Custom hook for performance rating calculations across games
 */

import { useMemo } from 'react';
import { PERFORMANCE_HELPERS } from '@/lib/constants/gameConstants';

export interface PerformanceRating {
  rating: string;
  emoji: string;
  color: string;
}

export interface UsePerformanceRatingProps {
  /** Game type for efficiency calculation */
  gameType: 'memo' | 'guessWho' | 'jacques-a-dit';
  /** Game-specific metrics */
  metrics: {
    /** For memo: number of moves, for guessWho: questions asked */
    attempts: number;
    /** For memo: total pairs, for guessWho: not used */
    target?: number;
  };
}

/**
 * Hook to calculate performance rating and efficiency across different games
 */
export function usePerformanceRating({ gameType, metrics }: UsePerformanceRatingProps) {
  const efficiency = useMemo(() => {
    switch (gameType) {
      case 'memo':
        return PERFORMANCE_HELPERS.calculateMemoEfficiency(
          metrics.attempts, 
          metrics.target || 1
        );
      case 'guessWho':
        return PERFORMANCE_HELPERS.calculateGuessWhoEfficiency(metrics.attempts);
      case 'jacques-a-dit':
        // For Jacques a dit: efficiency based on mistakes vs rounds completed
        const jacquesTarget = metrics.target || 1;
        const mistakeRatio = (metrics.attempts - jacquesTarget) / jacquesTarget;
        return Math.max(0, Math.min(100, 100 - (mistakeRatio * 50)));
      default:
        return 100;
    }
  }, [gameType, metrics.attempts, metrics.target]);

  const performance = useMemo(() => {
    return PERFORMANCE_HELPERS.getPerformanceRating(efficiency);
  }, [efficiency]);

  const starRating = useMemo(() => {
    return PERFORMANCE_HELPERS.getStarRating(efficiency);
  }, [efficiency]);

  return {
    efficiency,
    performance,
    starRating
  };
}