'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MahjongBoard as MahjongBoardType } from '@/types/mahjong';
import MahjongTile from './MahjongTile';
import { useContainerSize } from '@/hooks/shared/useContainerSize';

interface MahjongBoardProps {
  board: MahjongBoardType;
  onTileClick: (tileId: string) => void;
  disabled: boolean;
  showHintTileIds?: string[];
  useAdaptiveLayout?: boolean;
}

export default function MahjongBoard({ 
  board, 
  onTileClick, 
  disabled,
  showHintTileIds = [],
  useAdaptiveLayout = true
}: MahjongBoardProps) {
  
  const { containerRef, size, isReady, hasError } = useContainerSize();
  const [startTime] = useState(Date.now());
  const [forceStaticLayout, setForceStaticLayout] = useState(false);
  
  // Calculate dynamic container size that encompasses actual tile content
  const calculateDynamicDimensions = () => {
    if (forceStaticLayout || hasError || !useAdaptiveLayout) {
      return {
        width: board.width || 600,
        height: board.height || 400,
        scale: 1
      };
    }

    // Get available space with enhanced device-aware adjustments
    // Progressive padding based on device type for better visual spacing
    const deviceType = isReady && size.width > 0 ? 
      (size.width < 640 ? 'mobile' : size.width < 1024 ? 'tablet' : 'desktop') : 'tablet';
    const paddingByDevice = {
      mobile: 8,    // 4px each side (px-1)
      tablet: 16,   // 8px each side (px-2)
      desktop: 16   // 8px each side (px-2)
    };
    const availableWidth = isReady && size.width > 0 ? 
      size.width - paddingByDevice[deviceType] : 800;
    
    // Enhanced responsive UI zone sizing
    const dynamicsDeviceType = availableWidth < 640 ? 'mobile' : availableWidth < 1024 ? 'tablet' : 'desktop';
    const uiZoneHeights = {
      mobile: { top: 24, bottom: 20, buffer: 48 },    // Optimized for game area
      tablet: { top: 30, bottom: 24, buffer: 60 },    // Balanced UI for tablet
      desktop: { top: 34, bottom: 28, buffer: 72 }    // Efficient UI for desktop
    };
    
    const uiZones = uiZoneHeights[dynamicsDeviceType];
    const reservedHeight = uiZones.top + uiZones.bottom + uiZones.buffer; // Total UI space
    const availableHeight = isReady && size.height > 0 ? size.height - reservedHeight : 600;
    
    // First calculate tile bounds to understand actual content requirements
    const tileBounds = calculateTileBounds();
    
    // Content requirements = actual tile bounds + adequate padding for tall formations
    const structurePadding = Math.max(40, Math.round(tileSize * 0.4)); // Dynamic padding based on tile size
    const contentWidth = Math.max(tileBounds.width + structurePadding, board.width || 600);
    const contentHeight = Math.max(tileBounds.height + structurePadding, board.height || 400);
    
    // Device-aware scaling factors for optimal UX
    const scalingDeviceType = availableWidth < 640 ? 'mobile' : availableWidth < 1024 ? 'tablet' : 'desktop';
    const deviceScaleFactors = {
      mobile: { min: 0.6, preferred: 0.8 }, // More aggressive scaling for tall formations on mobile
      tablet: { min: 0.7, preferred: 0.9 }, // Moderate scaling on tablet  
      desktop: { min: 0.8, preferred: 0.95 } // Conservative scaling on desktop
    };
    
    const factors = deviceScaleFactors[scalingDeviceType];
    
    // Calculate scaling with priority on fitting tall formations
    const rawScaleX = availableWidth / contentWidth;
    const rawScaleY = availableHeight / contentHeight;
    const rawScale = Math.min(rawScaleX, rawScaleY, 1); // Never scale up
    
    // For very tall formations, prioritize fitting over preferred scale
    const isVeryTall = contentHeight > availableHeight * 0.8;
    const adaptiveScale = isVeryTall 
      ? Math.max(rawScale, factors.min * 0.9) // Allow more aggressive scaling for tall formations
      : Math.max(rawScale, factors.min);
    
    const preferredScale = Math.min(factors.preferred, adaptiveScale);
    
    // Determine final dimensions ensuring tall formations fit
    const scaledWidth = contentWidth * preferredScale;
    const scaledHeight = contentHeight * preferredScale;
    
    const finalWidth = Math.min(scaledWidth, availableWidth);
    // For tall formations, allow container to grow beyond initial available height if needed
    const finalHeight = isVeryTall 
      ? Math.max(scaledHeight, Math.min(contentHeight * factors.min, availableHeight * 1.2))
      : Math.min(scaledHeight, availableHeight);
    
    return {
      width: Math.max(finalWidth, 320), // Minimum mobile width
      height: Math.max(finalHeight, 240), // Minimum mobile height  
      scale: preferredScale
    };
  };

  // Dynamic tile sizing based on screen size and tile density
  const calculateOptimalTileSize = () => {
    // Get available dimensions
    const deviceType = isReady && size.width > 0 ? 
      (size.width < 640 ? 'mobile' : size.width < 1024 ? 'tablet' : 'desktop') : 'tablet';
    
    // Base tile sizes by device type for optimal UX
    const baseTileSizes = {
      mobile: 45,   // Smaller for mobile screens
      tablet: 55,   // Medium for tablets
      desktop: 65   // Larger for desktop
    };
    
    // Try to calculate spacing from tile positions (if available)
    let spacingBasedSize = 60;
    if (board.tiles[0]?.x !== undefined && board.tiles[1]?.x !== undefined) {
      spacingBasedSize = Math.abs(board.tiles[1].x - board.tiles[0].x) || 60;
    }
    
    // Choose between base size and spacing-based size
    const deviceBaseSize = baseTileSizes[deviceType];
    const preferredSize = Math.min(spacingBasedSize, deviceBaseSize);
    
    // Ensure minimum touch target size (44px) and reasonable maximum (80px)
    return Math.max(44, Math.min(preferredSize, 80));
  };
  
  const tileSize = calculateOptimalTileSize();
  
  // Calculate proportional 3D layer offset (15% of tile size)
  const layerOffset = Math.round(tileSize * 0.15);

  // Calculate actual tile bounds for dynamic background sizing
  const calculateTileBounds = () => {
    if (board.tiles.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    board.tiles.forEach(tile => {
      // Account for proportional 3D layer offsets
      const tileX = tile.x + (tile.layer * layerOffset);
      const tileY = tile.y - (tile.layer * layerOffset);
      const tileRight = tileX + tileSize;
      const tileBottom = tileY + tileSize;

      minX = Math.min(minX, tileX);
      minY = Math.min(minY, tileY);
      maxX = Math.max(maxX, tileRight);
      maxY = Math.max(maxY, tileBottom);
    });

    return {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  const { width: containerWidth, height: containerHeight, scale } = calculateDynamicDimensions();

  const tileBounds = calculateTileBounds();

  // Show loading indicator only briefly, then render board with fallback dimensions
  const showLoadingSpinner = useAdaptiveLayout && !isReady && Date.now() - startTime < 1000;
  
  if (showLoadingSpinner) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"
        />
        <div className="ml-4 text-gray-600">
          Préparation du plateau...
        </div>
      </div>
    );
  }

  // Get device-specific UI zone heights for consistent styling
  const currentDeviceType = isReady && size.width > 0 ? 
    (size.width < 640 ? 'mobile' : size.width < 1024 ? 'tablet' : 'desktop') : 'tablet';
  const paddingByDevice = {
    mobile: 8,    // 4px each side (px-1)
    tablet: 16,   // 8px each side (px-2)
    desktop: 16   // 8px each side (px-2)
  };
  const currentWidth = isReady && size.width > 0 ? 
    size.width - paddingByDevice[currentDeviceType] : 800;
  const uiDeviceType = currentWidth < 640 ? 'mobile' : currentWidth < 1024 ? 'tablet' : 'desktop';
  const uiZoneHeights = {
    mobile: { top: 24, bottom: 20, buffer: 48 },
    tablet: { top: 30, bottom: 24, buffer: 60 },
    desktop: { top: 34, bottom: 28, buffer: 72 }
  };
  const uiZones = uiZoneHeights[uiDeviceType];

  return (
    <div 
      ref={useAdaptiveLayout && !forceStaticLayout && !hasError ? containerRef : undefined}
      className="flex flex-col gap-2 w-full px-1 sm:px-2 py-2 sm:py-3 lg:py-4"
      style={{ 
        minHeight: `${containerHeight + uiZones.buffer}px`, // Device-aware UI space
        height: 'auto' // Allow height to grow as needed
      }}
    >
      {/* Top UI Bar - Layer Indicator */}
      <div 
        className="flex justify-end items-center px-2"
        style={{ height: `${uiZones.top}px` }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/20">
          <div className="flex items-center gap-2">
            <span 
              className={`font-bold text-gray-700 ${uiDeviceType === 'mobile' ? 'text-xs' : uiDeviceType === 'tablet' ? 'text-sm' : 'text-base'}`}
            >
              {board.layers} niveaux
            </span>
          </div>
        </div>
      </div>

      {/* Game Board Container - Pure game content */}
      <div id='parent_div' className="flex-1 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            maxWidth: '100%', // Allow full width utilization
            maxHeight: '100%', // Allow full height utilization
            transformStyle: 'preserve-3d',
            perspective: useAdaptiveLayout ? '1200px' : '1500px',
            perspectiveOrigin: 'center 35%',
            // Apply proportional scaling when content exceeds container
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'center center'
          }}
        >
        {/* Background Board Layer - Positioned to center under normalized tile formation */}
        <div
          id='background_layer'
          className="absolute rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl border border-slate-200/50"
          style={{
            // Position relative to container origin with proper padding (tiles are normalized to 0,0)
            left: `${-Math.max(12, Math.round(tileSize * 0.2))}px`,
            top: `${-Math.max(12, Math.round(tileSize * 0.2))}px`,
            width: `${tileBounds.width + 2 * Math.max(12, Math.round(tileSize * 0.2))}px`,
            height: `${tileBounds.height + 2 * Math.max(12, Math.round(tileSize * 0.2))}px`,
            transform: 'translateZ(-20px) rotateX(1deg)',
            background: `
              radial-gradient(circle at center, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.7)),
              linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
            `,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)'
          }}
        />

        {/* Render Tiles with 3D Container */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)', // Create stacking context for tiles
          }}
        >
          {board.tiles.map((tile) => (
            <MahjongTile
              key={tile.id}
              tile={tile}
              tileSize={tileSize}
              onTileClick={onTileClick}
              disabled={disabled}
              showHint={showHintTileIds.includes(tile.id)}
              offsetX={tileBounds.minX}
              offsetY={tileBounds.minY}
              layerOffset={layerOffset}
            />
          ))}
        </div>

        </motion.div>
      </div>

      {/* Bottom UI Bar - Emergency Controls */}
      {(hasError || (!isReady && Date.now() - startTime > 3000)) && (
        <div 
          className="flex justify-end items-center px-2"
          style={{ height: `${uiZones.bottom}px` }}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setForceStaticLayout(true)}
            className={`bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-full shadow-lg font-medium border border-orange-400/50 ${
              uiDeviceType === 'mobile' ? 'text-xs' : uiDeviceType === 'tablet' ? 'text-sm' : 'text-base'
            }`}
            title="Activer le mode statique en cas de problème d'affichage"
          >
            {hasError ? '⚠️ Mode statique' : '🔧 Forcer affichage'}
          </motion.button>
        </div>
      )}
    </div>
  );
}