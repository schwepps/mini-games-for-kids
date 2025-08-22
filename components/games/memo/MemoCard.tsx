'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MemoCardProps } from '@/types/memo';

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
          ? "border-green-400 shadow-green-200"
          : isFlipped
          ? "border-blue-400 shadow-blue-200"
          : "border-white shadow-purple-200 hover:shadow-purple-300",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:scale-105"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`Carte ${index + 1}: ${isFlipped ? card.character.name : 'cachée'}`}
      aria-pressed={isFlipped}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      initial={false}
      animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Card Back */}
      <motion.div
        className={cn(
          "absolute inset-0 w-full h-full backface-hidden",
          isFlipped && "opacity-0"
        )}
        initial={false}
        animate={isFlipped ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: isFlipped ? 0 : 0.3 }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 rounded-xl flex items-center justify-center">
          <Image
            src="/images/games/memo/card-backward.png"
            alt="Carte cachée"
            fill
            className="object-cover rounded-xl p-2"
            sizes="(max-width: 768px) 150px, 200px"
            priority
          />
          
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          
          {/* Question mark overlay for small screens */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-4xl font-bold drop-shadow-lg sm:hidden">?</span>
          </div>
        </div>
      </motion.div>

      {/* Card Front (Character) */}
      <motion.div
        className={cn(
          "absolute inset-0 w-full h-full backface-hidden",
          !isFlipped && "opacity-0"
        )}
        initial={false}
        animate={isFlipped ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: isFlipped ? 0.3 : 0 }}
        style={{ transform: "rotateY(180deg)" }}
      >
        <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
          <Image
            src={`/images/profiles/cartoon-characters/${card.character.image}`}
            alt={card.character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 150px, 200px"
          />
          
          {/* Character name overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <p className="text-white text-sm font-bold text-center truncate">
              {card.character.name}
            </p>
          </div>
          
          {/* Matched indicator */}
          {isMatched && (
            <div className="absolute top-2 right-2">
              <motion.div
                className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <span className="text-white text-sm font-bold">✓</span>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Loading/Disabled overlay */}
      {disabled && (
        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.button>
  );
});

export default MemoCard;

// CSS for backface-hidden is now in globals.css