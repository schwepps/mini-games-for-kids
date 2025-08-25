'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface ContainerSize {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface ContainerConstraints {
  maxWidth: number;
  maxHeight: number;
  safeAreaTop: number;
  safeAreaBottom: number;
  safeAreaLeft: number;
  safeAreaRight: number;
}

/**
 * Hook for detecting and tracking container size changes
 * Essential for mobile-first responsive mahjong board sizing
 */
export function useContainerSize() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ContainerSize>({
    width: 0,
    height: 0,
    aspectRatio: 1
  });
  const [constraints, setConstraints] = useState<ContainerConstraints>({
    maxWidth: 0,
    maxHeight: 0,
    safeAreaTop: 0,
    safeAreaBottom: 0,
    safeAreaLeft: 0,
    safeAreaRight: 0
  });
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const updateSize = useCallback(() => {
    try {
      if (!containerRef.current) {
        // Fallback: use window dimensions if container ref is not available
        const fallbackWidth = Math.min(window.innerWidth * 0.9, 800);
        const fallbackHeight = Math.min(window.innerHeight * 0.7, 600);
        
        setSize({
          width: fallbackWidth,
          height: fallbackHeight,
          aspectRatio: fallbackWidth / fallbackHeight
        });
        setConstraints({
          maxWidth: fallbackWidth,
          maxHeight: fallbackHeight,
          safeAreaTop: 0,
          safeAreaBottom: 0,
          safeAreaLeft: 0,
          safeAreaRight: 0
        });
        setIsReady(true);
        setHasError(false);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Validate dimensions
      if (width <= 0 || height <= 0) {
        throw new Error(`Invalid container dimensions: ${width}x${height}`);
      }
      
      // Get safe area insets for mobile devices with error handling
      let safeAreaTop = 0, safeAreaBottom = 0, safeAreaLeft = 0, safeAreaRight = 0;
      try {
        const computedStyle = getComputedStyle(document.documentElement);
        safeAreaTop = parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0', 10);
        safeAreaBottom = parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0', 10);
        safeAreaLeft = parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0', 10);
        safeAreaRight = parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0', 10);
      } catch (e) {
        console.warn('Could not read safe area insets, using defaults:', e);
      }

      // Calculate available space minus safe areas and typical UI padding
      const uiPadding = window.innerWidth < 640 ? 16 : 32; // Mobile vs desktop padding
      const availableWidth = width - (safeAreaLeft + safeAreaRight + uiPadding * 2);
      const availableHeight = height - (safeAreaTop + safeAreaBottom + uiPadding * 2);

      const newSize: ContainerSize = {
        width: Math.max(0, availableWidth),
        height: Math.max(0, availableHeight), 
        aspectRatio: availableWidth > 0 ? availableWidth / availableHeight : 1
      };

      const newConstraints: ContainerConstraints = {
        maxWidth: availableWidth,
        maxHeight: availableHeight,
        safeAreaTop,
        safeAreaBottom,
        safeAreaLeft,
        safeAreaRight
      };

      setSize(newSize);
      setConstraints(newConstraints);
      setIsReady(true);
      setHasError(false);
    } catch (error) {
      console.error('Error updating container size:', error);
      setHasError(true);
      // Set fallback dimensions on error
      const fallbackWidth = Math.min(window.innerWidth * 0.9, 600);
      const fallbackHeight = Math.min(window.innerHeight * 0.6, 400);
      
      setSize({
        width: fallbackWidth,
        height: fallbackHeight,
        aspectRatio: fallbackWidth / fallbackHeight
      });
      setIsReady(true); // Still mark as ready with fallback values
    }
  }, []);

  // ResizeObserver for efficient container size tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Timeout fallback - ensure hook becomes ready within 2 seconds
    timeoutId = setTimeout(() => {
      if (!isReady) {
        console.warn('Container size detection timeout, using fallback dimensions');
        updateSize(); // This will trigger fallback logic
      }
    }, 2000);

    if (!containerRef.current) {
      // If no container ref, trigger fallback immediately  
      updateSize();
      return () => clearTimeout(timeoutId);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to debounce rapid resize events
      requestAnimationFrame(updateSize);
    });

    resizeObserver.observe(containerRef.current);

    // Initial size calculation
    updateSize();

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [updateSize, isReady]);

  // Handle orientation changes on mobile
  useEffect(() => {
    const handleOrientationChange = () => {
      // Small delay to allow for layout reflow after orientation change
      setTimeout(updateSize, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', updateSize);
    };
  }, [updateSize]);

  // Get optimal tile size based on container constraints
  const getOptimalTileSize = useCallback((totalTiles: number, layerCount: number): number => {
    if (!isReady || size.width === 0 || size.height === 0) return 48;

    // Estimate grid dimensions needed for tiles
    const tilesPerLayer = Math.ceil(totalTiles / layerCount);
    const estimatedGridSize = Math.ceil(Math.sqrt(tilesPerLayer));
    
    // Account for 3D layer offsets (10px per layer)
    const layerOffset = layerCount * 10;
    const availableWidth = size.width - layerOffset;
    const availableHeight = size.height - layerOffset;
    
    // Calculate tile size that fits within bounds
    const maxTileWidth = Math.floor(availableWidth / estimatedGridSize);
    const maxTileHeight = Math.floor(availableHeight / estimatedGridSize);
    const calculatedSize = Math.min(maxTileWidth, maxTileHeight);
    
    // Ensure minimum playable size and maximum reasonable size
    const minSize = window.innerWidth < 640 ? 32 : 40; // Smaller min on mobile
    const maxSize = window.innerWidth < 640 ? 64 : 80; // Reasonable max sizes
    
    return Math.max(minSize, Math.min(maxSize, calculatedSize));
  }, [isReady, size.width, size.height]);

  // Calculate if a board would fit within container constraints
  const willBoardFit = useCallback((boardWidth: number, boardHeight: number, layerCount: number): boolean => {
    if (!isReady) return false;
    
    const layerOffset = layerCount * 10;
    const totalWidth = boardWidth + layerOffset;
    const totalHeight = boardHeight + layerOffset;
    
    return totalWidth <= size.width && totalHeight <= size.height;
  }, [isReady, size.width, size.height]);

  return {
    containerRef,
    size,
    constraints,
    isReady,
    hasError,
    getOptimalTileSize,
    willBoardFit
  };
}

// Helper function to get device type for responsive behavior
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Helper to get recommended layer count based on device and available space
export function getRecommendedLayerCount(containerSize: ContainerSize, pairCount: number): number {
  const deviceType = getDeviceType();
  
  // Mobile: Prefer vertical stacking (more layers, compact base)
  if (deviceType === 'mobile') {
    if (pairCount <= 16) return 4;
    if (pairCount <= 24) return 5;
    return 6;
  }
  
  // Tablet: Balanced approach
  if (deviceType === 'tablet') {
    if (pairCount <= 16) return 3;
    if (pairCount <= 24) return 4;
    return 5;
  }
  
  // Desktop: Wider layouts (fewer layers, spread out)
  if (pairCount <= 16) return 2;
  if (pairCount <= 24) return 3;
  return 4;
}