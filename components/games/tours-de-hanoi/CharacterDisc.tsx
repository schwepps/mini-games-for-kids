'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProfileLoader } from '@/lib/profileLoader';
import { CharacterDiscProps } from '@/types/tours-de-hanoi';

export default function CharacterDisc({
  disc,
  isSelected,
  isTopDisc,
  canMove,
  onClick,
  position = 0,
  gameComplete = false,
  characterCount = 3
}: CharacterDiscProps) {
  
  // Size mapping: responsive sizing with aggressive reduction for higher difficulties
  const getDiscSize = (size: number, characterCount: number) => {
    // Get screen size for responsive sizing
    const isClient = typeof window !== 'undefined';
    if (!isClient) {
      // SSR fallback with character count reduction
      let baseSize = 45 + (size * 15);
      let reductionFactor = 1;
      if (characterCount === 4) {
        reductionFactor = 0.6; // 40% reduction
      } else if (characterCount === 5) {
        reductionFactor = 0.5; // 50% reduction
      }
      return Math.floor(baseSize * reductionFactor);
    }
    
    const width = window.innerWidth;
    let baseSize, increment;
    
    if (width < 640) { // Mobile
      baseSize = 32;
      increment = 12;
    } else if (width < 768) { // SM
      baseSize = 38;
      increment = 14;
    } else if (width < 1024) { // MD
      baseSize = 50;
      increment = 20;
    } else { // LG+
      baseSize = 60;
      increment = 25;
    }
    
    // Apply aggressive size reduction for higher difficulties
    let reductionFactor = 1;
    if (characterCount === 4) {
      reductionFactor = 0.6; // 40% reduction
    } else if (characterCount === 5) {
      reductionFactor = 0.5; // 50% reduction
    }
    
    return Math.floor((baseSize + (size * increment)) * reductionFactor);
  };

  const discSize = getDiscSize(disc.size, characterCount);
  const imageUrl = ProfileLoader.getImageUrl(disc.character.image);

  return (
    <motion.div
      className={`relative cursor-pointer transition-all duration-200 ${
        canMove ? '' : 'cursor-not-allowed opacity-80'
      } ${
        isSelected ? 'z-50' : 'z-10'
      }`}
      style={{ 
        width: `${discSize}px`,
        height: `${discSize}px`,
        marginBottom: position > 0 ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '-6px' : '-12px') : '0'
      }}
      onClick={canMove ? onClick : undefined}
      initial={{ scale: 0, y: -50 }}
      animate={{ 
        scale: 1,
        y: (isSelected && !gameComplete) ? -10 : 0,
        boxShadow: (isSelected && !gameComplete) ? 
          '0 15px 35px rgba(255,215,0,0.4)' : 
          '0 8px 20px rgba(0,0,0,0.2)'
      }}
      whileHover={canMove && !gameComplete ? { 
        y: isSelected ? -12 : -2
      } : {}}
      whileTap={canMove && !gameComplete ? { y: 2 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        layout: { duration: 0.3 }
      }}
      layout
    >
      {/* Character Image */}
      <div className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
        isSelected ? 'border-yellow-400' : 'border-white'
      } shadow-lg bg-white`}>
        <Image
          src={imageUrl}
          alt={disc.character.name}
          fill
          sizes={`${discSize}px`}
          className="object-cover"
          priority
        />
        
        {/* Glow Effect for Selected */}
        {isSelected && !gameComplete && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400 opacity-30"
            animate={{ 
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Top Disc Indicator */}
        {isTopDisc && canMove && !isSelected && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20"
            animate={{ 
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>


    </motion.div>
  );
}