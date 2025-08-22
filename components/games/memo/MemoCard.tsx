'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MemoCardProps } from '@/types/memo';
import { ANIMATION_DURATIONS, SPRING_CONFIGS } from '@/lib/constants/gameConstants';

const MemoCard = memo(function MemoCard({
  card,
  index,
  isFlipped,
  isMatched,
  onClick,
  disabled
}: MemoCardProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      className={cn(
        "relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/50",
        isMatched
          ? "border-green-400 shadow-green-200 shadow-xl"
          : isFlipped
          ? "border-blue-400 shadow-blue-200 shadow-xl"
          : "border-white shadow-purple-200 hover:shadow-purple-300",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:scale-105 active:scale-95"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`Carte ${index + 1}: ${isFlipped ? card.character.name : 'cachée'}`}
      aria-pressed={isFlipped}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {/* Card Content - Show character if flipped OR matched */}
      {!isFlipped && !isMatched ? (
        /* Card Back */
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 180 }}
          transition={{ duration: ANIMATION_DURATIONS.MEDIUM_TRANSITION / 1000 }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 rounded-xl flex items-center justify-center">
            <Image
              src="/images/games/memo/card-backward.png"
              alt="Carte cachée"
              fill
              className="object-cover rounded-xl p-2"
              sizes="(max-width: 768px) 200px, 300px"
              priority
            />
            
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
        </motion.div>
      ) : (
        /* Card Front (Character) */
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, rotateY: -180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 180 }}
          transition={{ duration: ANIMATION_DURATIONS.MEDIUM_TRANSITION / 1000 }}
        >
          <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
            <Image
              src={`/images/profiles/cartoon-characters/${card.character.image}`}
              alt={card.character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 200px, 300px"
            />
            
            {/* Character name overlay - Enhanced for kids */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 sm:p-3">
              <p className="text-white text-sm sm:text-base font-bold text-center truncate drop-shadow-md">
                {card.character.name}
              </p>
            </div>
            
            {/* Matched indicator - Enhanced for kids */}
            {isMatched && (
              <div className="absolute top-2 right-2">
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0
                  }}
                  transition={{ 
                    delay: SPRING_CONFIGS.DELAYS.MEDIUM, 
                    type: "spring", 
                    ...SPRING_CONFIGS.BOUNCY
                  }}
                  style={{
                    boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.5)"
                  }}
                >
                  <span className="text-white text-lg sm:text-xl font-bold">✓</span>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
    </motion.button>
  );
});

export default MemoCard;