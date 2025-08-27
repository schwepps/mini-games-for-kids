'use client';

import { useState, useCallback, useEffect } from 'react';
import { MahjongDifficulty } from '@/types/mahjong';
import { ContainerSize } from '@/hooks/shared/useContainerSize';
import { getDeviceType, getDeviceSpacing, DeviceType } from '@/lib/shared/device-utils';

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
    const screenWidth = containerSize?.width || 768;
    const deviceType = getDeviceType(screenWidth);
    const spacingSize = difficulty === 'hard' ? 'large' : 'medium';
    return getDeviceSpacing(deviceType, spacingSize);
  }, [isHydrated]);

  // Device type detection using consolidated utility
  const getDeviceTypeForContainer = useCallback((containerSize: ContainerSize | null): DeviceType => {
    const screenWidth = containerSize?.width || 768;
    return getDeviceType(screenWidth);
  }, []);

  return {
    showCelebration,
    setShowCelebration,
    calculateDynamicSpacing,
    getDeviceType: getDeviceTypeForContainer,
    isHydrated // Export for components that need hydration-aware behavior
  };
}