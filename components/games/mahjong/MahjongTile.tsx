'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MahjongTile as MahjongTileType } from '@/types/mahjong';
import { ProfileLoader } from '@/lib/profileLoader';

interface MahjongTileProps {
  tile: MahjongTileType;
  tileSize: number;
  onTileClick: (tileId: string) => void;
  disabled: boolean;
  showHint?: boolean;
  offsetX?: number;
  offsetY?: number;
  layerOffset?: number;
}

export default function MahjongTile({ 
  tile, 
  tileSize, 
  onTileClick, 
  disabled,
  showHint = false,
  offsetX = 0,
  offsetY = 0,
  layerOffset = 10
}: MahjongTileProps) {
  
  const handleClick = () => {
    if (!disabled && tile.isSelectable && !tile.isMatched) {
      onTileClick(tile.id);
    }
  };

  // Don't render matched tiles (but show covered tiles in 3D structure)
  if (tile.isMatched) {
    return null;
  }

  const imageUrl = ProfileLoader.getImageUrl(tile.character.image);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tile.id}
        layout
        initial={{ 
          scale: 0.8, 
          opacity: 0,
          rotateY: -90 
        }}
        animate={{ 
          scale: 1, 
          opacity: tile.isCovered ? 0.7 : 1, // Dimmed for covered tiles
          rotateY: 0,
          x: (tile.x - offsetX) + (tile.layer * layerOffset), // Normalized position with proportional layer offset
          y: (tile.y - offsetY) - (tile.layer * layerOffset), // Normalized position with tiles "resting" on lower ones
          z: tile.z
        }}
        exit={{ 
          scale: 0,
          opacity: 0,
          rotateY: 90,
          transition: { duration: 0.4, ease: "easeInOut" }
        }}
        whileHover={tile.isSelectable && !disabled ? { 
          scale: 1.02, // Reduced scale for better mobile performance
          z: tile.z + 6,
          rotateX: -3, // Subtle rotation for mobile
          transition: { duration: 0.15 }
        } : {}}
        whileTap={tile.isSelectable && !disabled ? { 
          scale: 0.97, // Improved tap feedback
          transition: { duration: 0.1 }
        } : {}}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="absolute cursor-pointer touch-manipulation"
        style={{
          width: tileSize,
          height: tileSize,
          minWidth: '44px', // Ensure minimum touch target size
          minHeight: '44px',
          transformStyle: 'preserve-3d',
        }}
        onClick={handleClick}
        role="button"
        tabIndex={tile.isSelectable && !disabled ? 0 : -1}
        aria-label={`Tuile ${tile.character.name}${tile.isSelectable ? ', sélectionnable' : ', non sélectionnable'}`}
        aria-pressed={tile.isSelected}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && tile.isSelectable && !disabled) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Tile Container with 3D Effects */}
        <div
          className={`
            relative w-full h-full rounded-lg transition-all duration-200
            ${tile.isSelectable && !disabled
              ? 'cursor-pointer shadow-lg hover:shadow-2xl'
              : tile.isCovered 
                ? 'cursor-not-allowed' 
                : 'cursor-not-allowed opacity-60 grayscale'
            }
            ${tile.isSelected || showHint
              ? 'ring-4 ring-pink-400 ring-opacity-90 shadow-2xl'
              : ''
            }
          `}
          style={{
            background: tile.isSelectable 
              ? 'linear-gradient(145deg, #ffffff, #fef7f7)'
              : 'linear-gradient(145deg, #f0f0f0, #e8e8e8)',
            boxShadow: `
              0 ${(tile.layer + 1) * 6}px ${(tile.layer + 1) * 12}px rgba(0, 0, 0, 0.3),
              0 ${(tile.layer + 1) * 3}px ${(tile.layer + 1) * 6}px rgba(0, 0, 0, 0.2),
              0 ${tile.layer * 2}px ${tile.layer * 4}px rgba(0, 0, 0, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.7),
              inset 0 -2px 0 rgba(0, 0, 0, 0.15)
            `,
            zIndex: tile.layer * 100 + tile.row * 10 + tile.col,
            border: '2px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Character Image */}
          <div className="absolute inset-1 rounded-md overflow-hidden bg-white/90">
            <Image
              src={imageUrl}
              alt={tile.character.name}
              width={tileSize - 8}
              height={tileSize - 8}
              className="w-full h-full object-cover rounded-md"
              loading="eager"
              unoptimized
            />
          </div>

          {/* Selection Indicator */}
          <AnimatePresence>
            {(tile.isSelected || showHint) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-300/30 to-purple-300/30 border-3 border-pink-400"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0px rgba(236, 72, 153, 0.8)',
                      '0 0 0 12px rgba(236, 72, 153, 0)',
                    ]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    ease: "easeOut" 
                  }}
                  className="absolute inset-0 rounded-lg"
                />
                {/* Sparkle effect */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1 right-1 text-yellow-400 text-xs"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute bottom-1 left-1 text-yellow-300 text-xs"
                  >
                    ⭐
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Pulse Animation */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 rounded-lg bg-yellow-300/30"
              />
            )}
          </AnimatePresence>

          {/* Non-selectable Overlay */}
          {!tile.isSelectable && !tile.isMatched && !tile.isCovered && (
            <div className="absolute inset-0 rounded-lg bg-black/20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 rounded-lg" />
            </div>
          )}

          {/* Covered Tile Overlay */}
          {tile.isCovered && (
            <div className="absolute inset-0 rounded-lg bg-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/30 to-black/50 rounded-lg" />
              <div className="absolute top-2 right-2 text-white/70 text-xs font-bold">
                🔒
              </div>
            </div>
          )}

          {/* 3D Edge Effect */}
          <div 
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.4) 0%, 
                  transparent 50%, 
                  rgba(0, 0, 0, 0.1) 100%
                )
              `
            }}
          />
        </div>

        {/* Character Name Tooltip (visible on hover for larger screens) */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden lg:block">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {tile.character.name}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}