import { ContainerSize } from '@/hooks/shared/useContainerSize';

/**
 * Device Detection Utilities
 * Consolidates device type detection logic used across components
 */

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Get device type from container size
 * SSR-safe: Uses consistent fallback to prevent hydration mismatches
 */
export function getDeviceType(containerSize: ContainerSize | null): DeviceType {
  // Use containerSize.width when available, otherwise default to tablet (768)
  // This ensures consistent behavior during SSR and initial client render
  const screenWidth = containerSize?.width || 768;
  
  if (screenWidth < 640) return 'mobile';
  if (screenWidth < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Get device-appropriate spacing classes for Tailwind
 */
export function getDeviceSpacing(deviceType: DeviceType, difficulty: string): string {
  const spacingMap = {
    mobile: difficulty === 'hard' ? 'space-y-8' : 'space-y-6',
    tablet: difficulty === 'hard' ? 'space-y-10' : 'space-y-8', 
    desktop: difficulty === 'hard' ? 'space-y-16' : 'space-y-12'
  };
  
  return spacingMap[deviceType];
}

/**
 * Check if device is touch-capable
 * SSR-safe: Returns false during SSR to prevent hydration mismatches
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get optimal tile size for device type
 */
export function getDeviceTileBounds(containerWidth: number): { min: number; max: number } {
  if (containerWidth < 640) return { min: 36, max: 56 }; // Mobile
  if (containerWidth < 1024) return { min: 44, max: 68 }; // Tablet
  return { min: 52, max: 80 }; // Desktop
}