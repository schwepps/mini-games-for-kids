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
          opacity: 1,
          rotateY: 0,
          x: (tile.x - offsetX) + (tile.layer * layerOffset),
          y: (tile.y - offsetY) - (tile.layer * layerOffset),
          z: tile.z
        }}
        exit={{ 
          scale: 0,
          opacity: 0,
          rotateY: 90,
          transition: { duration: 0.4, ease: "easeInOut" }
        }}
        whileHover={tile.isSelectable && !disabled ? { 
          scale: 1.02,
          z: tile.z + 6,
          rotateX: -3,
          transition: { duration: 0.15 }
        } : {}}
        whileTap={tile.isSelectable && !disabled ? { 
          scale: 0.97,
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
          minWidth: '44px',
          minHeight: '44px',
          transformStyle: 'preserve-3d',
          zIndex: tile.layer * 10,
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
        <div
          className={`
            relative w-full h-full rounded-lg transition-all duration-200
            ${tile.isSelectable && !disabled
              ? 'cursor-pointer shadow-lg hover:shadow-2xl'
              : tile.isCovered 
                ? 'cursor-not-allowed shadow-md'
                : 'cursor-not-allowed opacity-60 grayscale'
            }
            ${tile.isSelected || showHint
              ? 'ring-4 ring-pink-400 ring-opacity-90 shadow-2xl'
              : ''
            }
          `}
          style={{
            background: tile.isSelectable 
              ? 'linear-gradient(145deg, #ffffff 0%, #fefefe 30%, #f9fafb 70%, #f3f4f6 100%)'
              : tile.isCovered 
                ? 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)'
                : 'linear-gradient(145deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%)',
            boxShadow: tile.isSelectable
              ? `
                0 ${(tile.layer + 1) * 8}px ${(tile.layer + 1) * 16}px rgba(0, 0, 0, 0.25),
                0 ${(tile.layer + 1) * 4}px ${(tile.layer + 1) * 8}px rgba(0, 0, 0, 0.15),
                0 ${tile.layer * 3}px ${tile.layer * 6}px rgba(0, 0, 0, 0.1),
                inset 0 3px 0 rgba(255, 255, 255, 0.8),
                inset 0 -3px 0 rgba(0, 0, 0, 0.1),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5)
              `
              : `
                0 ${(tile.layer + 1) * 4}px ${(tile.layer + 1) * 8}px rgba(0, 0, 0, 0.3),
                0 ${(tile.layer + 1) * 2}px ${(tile.layer + 1) * 4}px rgba(0, 0, 0, 0.2),
                0 ${tile.layer * 2}px ${tile.layer * 4}px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
            zIndex: tile.layer * 1000 + tile.row * 100 + tile.col,
            border: tile.isSelectable 
              ? '2px solid rgba(255, 255, 255, 0.9)'
              : '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
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

          {!tile.isSelectable && !tile.isMatched && !tile.isCovered && (
            <div className="absolute inset-0 rounded-lg bg-black/20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 rounded-lg" />
            </div>
          )}

          {tile.isCovered && (
            <div className="absolute inset-0 rounded-lg bg-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/30 to-black/50 rounded-lg" />
              <div className="absolute top-2 right-2 text-white/70 text-xs font-bold">
                🔒
              </div>
            </div>
          )}

          {!tile.isSelectable && !tile.isCovered && (
            <>
              {tile.leftBlocked && !tile.rightBlocked && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-orange-400 text-xs opacity-70">
                  ←❌
                </div>
              )}
              {tile.rightBlocked && !tile.leftBlocked && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400 text-xs opacity-70">
                  ❌→
                </div>
              )}
              {tile.leftBlocked && tile.rightBlocked && (
                <div className="absolute inset-0 flex items-center justify-center text-orange-500 text-xs opacity-80">
                  ←❌→
                </div>
              )}
            </>
          )}

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

        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden lg:block">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {tile.character.name}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}