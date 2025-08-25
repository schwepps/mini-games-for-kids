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
      mobile: 32,   // 16px each side (px-4)
      tablet: 64,   // 32px each side (px-8)
      desktop: 96   // 48px each side (px-12)
    };
    const availableWidth = isReady && size.width > 0 ? 
      size.width - paddingByDevice[deviceType] : 800;
    
    // Enhanced responsive UI zone sizing
    const dynamicsDeviceType = availableWidth < 640 ? 'mobile' : availableWidth < 1024 ? 'tablet' : 'desktop';
    const uiZoneHeights = {
      mobile: { top: 40, bottom: 32, buffer: 80 },    // Compact UI for mobile
      tablet: { top: 48, bottom: 40, buffer: 100 },   // Moderate UI for tablet
      desktop: { top: 56, bottom: 48, buffer: 120 }   // Generous UI for desktop
    };
    
    const uiZones = uiZoneHeights[dynamicsDeviceType];
    const reservedHeight = uiZones.top + uiZones.bottom + uiZones.buffer; // Total UI space
    const availableHeight = isReady && size.height > 0 ? size.height - reservedHeight : 600;
    
    // First calculate tile bounds to understand actual content requirements
    const tileBounds = calculateTileBounds();
    
    // Content requirements = tile bounds + padding for backgrounds
    const contentWidth = Math.max(tileBounds.width + 40, board.width || 600); // Include background padding
    const contentHeight = Math.max(tileBounds.height + 40, board.height || 400);
    
    // Device-aware scaling factors for optimal UX
    const scalingDeviceType = availableWidth < 640 ? 'mobile' : availableWidth < 1024 ? 'tablet' : 'desktop';
    const deviceScaleFactors = {
      mobile: { min: 0.7, preferred: 0.85 }, // More aggressive scaling on mobile
      tablet: { min: 0.8, preferred: 0.92 }, // Moderate scaling on tablet  
      desktop: { min: 0.9, preferred: 0.98 } // Minimal scaling on desktop
    };
    
    const factors = deviceScaleFactors[scalingDeviceType];
    
    // Calculate scaling with device preferences
    const rawScaleX = availableWidth / contentWidth;
    const rawScaleY = availableHeight / contentHeight;
    const rawScale = Math.min(rawScaleX, rawScaleY, 1); // Never scale up
    
    // Apply device-aware scaling preferences
    const scale = Math.max(rawScale, factors.min); // Respect minimum scale per device
    const preferredScale = Math.min(factors.preferred, scale);
    
    // Determine final dimensions with aspect ratio preservation
    const scaledWidth = contentWidth * preferredScale;
    const scaledHeight = contentHeight * preferredScale;
    
    const finalWidth = Math.min(scaledWidth, availableWidth);
    const finalHeight = Math.min(scaledHeight, availableHeight);
    
    return {
      width: Math.max(finalWidth, 320), // Minimum mobile width
      height: Math.max(finalHeight, 240), // Minimum mobile height  
      scale: preferredScale
    };
  };

  const tileSize = board.tiles[0]?.x !== undefined && board.tiles[1]?.x !== undefined
    ? Math.abs(board.tiles[1].x - board.tiles[0].x) || 60
    : 60;

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
      // Account for 3D layer offsets (same as used in MahjongTile.tsx)
      const tileX = tile.x + (tile.layer * 10);
      const tileY = tile.y - (tile.layer * 10);
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
    mobile: 32,   // 16px each side (px-4)
    tablet: 64,   // 32px each side (px-8)
    desktop: 96   // 48px each side (px-12)
  };
  const currentWidth = isReady && size.width > 0 ? 
    size.width - paddingByDevice[currentDeviceType] : 800;
  const uiDeviceType = currentWidth < 640 ? 'mobile' : currentWidth < 1024 ? 'tablet' : 'desktop';
  const uiZoneHeights = {
    mobile: { top: 40, bottom: 32, buffer: 80 },
    tablet: { top: 48, bottom: 40, buffer: 100 },
    desktop: { top: 56, bottom: 48, buffer: 120 }
  };
  const uiZones = uiZoneHeights[uiDeviceType];

  return (
    <div 
      ref={useAdaptiveLayout && !forceStaticLayout && !hasError ? containerRef : undefined}
      className="flex flex-col gap-2 w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8"
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
        {/* Background Board Layer - Clean single layer with generous spacing */}
        <div
          id='background_layer'
          className="absolute rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl border border-slate-200/50"
          style={{
            left: `${tileBounds.minX - 50}px`, // Generous padding around tiles
            top: `${tileBounds.minY - 50}px`,
            width: `${tileBounds.width + 100}px`,
            height: `${tileBounds.height + 100}px`,
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