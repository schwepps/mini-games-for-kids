'use client';

import { useState, useCallback, useEffect } from 'react';
import { MahjongDifficulty } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';
import { getDeviceType, getDeviceSpacing, DeviceType } from '@/lib/games/mahjong/utils/deviceDetection';

/**
 * UI logic hook for Mahjong game
 * SSR-safe with smooth transitions after hydration
 */
export function useMahjongGameUI() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark as hydrated after first render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate dynamic spacing using consolidated utility
  // Uses consistent spacing during SSR and updates after hydration
  const calculateDynamicSpacing = useCallback((
    containerSize: ContainerSize | null,
    difficulty: MahjongDifficulty
  ) => {
    // During SSR or before container size is available, use consistent tablet spacing
    if (!isHydrated || !containerSize) {
      const fallbackDeviceType: DeviceType = 'tablet';
      return getDeviceSpacing(fallbackDeviceType, difficulty);
    }
    
    // After hydration and container size is available, use actual device type
    const deviceType = getDeviceType(containerSize);
    return getDeviceSpacing(deviceType, difficulty);
  }, [isHydrated]);

  // Device type detection using consolidated utility
  const getDeviceTypeForContainer = useCallback((containerSize: ContainerSize | null): DeviceType => {
    return getDeviceType(containerSize);
  }, []);

  return {
    showCelebration,
    setShowCelebration,
    calculateDynamicSpacing,
    getDeviceType: getDeviceTypeForContainer,
    isHydrated // Export for components that need hydration-aware behavior
  };
}