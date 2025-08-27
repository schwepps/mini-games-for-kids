/**
 * Shared device detection utilities for responsive design across games
 */

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Get device type based on screen width
 * Uses standard breakpoints consistent with Tailwind CSS
 */
export function getDeviceType(screenWidth: number): DeviceType {
  if (screenWidth < 640) return 'mobile';   // < sm
  if (screenWidth < 1024) return 'tablet';  // sm to lg
  return 'desktop';                         // >= lg
}

/**
 * Check if device is touch-capable
 * SSR-safe: Returns false during server-side rendering
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get appropriate spacing classes based on device type
 */
export function getDeviceSpacing(deviceType: DeviceType, size: 'small' | 'medium' | 'large' = 'medium'): string {
  const spacingMap = {
    mobile: {
      small: 'space-y-2',
      medium: 'space-y-4',
      large: 'space-y-6'
    },
    tablet: {
      small: 'space-y-3',
      medium: 'space-y-6',
      large: 'space-y-8'
    },
    desktop: {
      small: 'space-y-4',
      medium: 'space-y-8',
      large: 'space-y-12'
    }
  };
  
  return spacingMap[deviceType][size];
}

/**
 * Get appropriate padding classes based on device type
 */
export function getDevicePadding(deviceType: DeviceType, size: 'small' | 'medium' | 'large' = 'medium'): string {
  const paddingMap = {
    mobile: {
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6'
    },
    tablet: {
      small: 'p-3',
      medium: 'p-6',
      large: 'p-8'
    },
    desktop: {
      small: 'p-4',
      medium: 'p-8',
      large: 'p-12'
    }
  };
  
  return paddingMap[deviceType][size];
}