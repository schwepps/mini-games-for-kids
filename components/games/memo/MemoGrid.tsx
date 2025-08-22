'use client';

import { motion } from 'framer-motion';
import MemoCard from './MemoCard';
import { MemoGridProps } from '@/types/memo';
import { getResponsiveGridClasses } from '@/lib/games/memo/gameLogic';

export default function MemoGrid({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
  disabled
}: MemoGridProps) {
  
  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-8 border-white border-t-yellow-400 rounded-full mx-auto mb-4"
          />
          <p className="text-white text-lg font-medium">Préparation des cartes...</p>
        </div>
      </div>
    );
  }

  const gridClasses = getResponsiveGridClasses(cards.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center"
    >
      <div className={gridClasses}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(index);
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0, rotateY: -180 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0 
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px]"
            >
              <MemoCard
                card={card}
                index={index}
                isFlipped={isFlipped}
                isMatched={isMatched}
                onClick={onCardClick}
                disabled={disabled}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Alternative compact layout for smaller screens
export function CompactMemoGrid({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
  disabled
}: MemoGridProps) {
  if (cards.length === 0) return null;

  // For mobile, use a more compact layout
  const getCompactGridClasses = (cardCount: number) => {
    const baseClasses = 'grid gap-1.5 justify-center items-center mx-auto w-full';
    
    switch (cardCount) {
      case 4: return `${baseClasses} grid-cols-2 max-w-[200px]`;
      case 6: return `${baseClasses} grid-cols-3 max-w-[300px]`;
      case 8: return `${baseClasses} grid-cols-4 max-w-[320px]`;
      case 10: return `${baseClasses} grid-cols-5 max-w-[400px]`;
      case 12: return `${baseClasses} grid-cols-4 max-w-[320px]`;
      case 14: return `${baseClasses} grid-cols-4 max-w-[320px]`;
      case 16: return `${baseClasses} grid-cols-4 max-w-[320px]`;
      case 18: return `${baseClasses} grid-cols-6 max-w-[480px]`;
      case 20: return `${baseClasses} grid-cols-5 max-w-[400px]`;
      case 22: return `${baseClasses} grid-cols-6 max-w-[480px]`;
      case 24: return `${baseClasses} grid-cols-6 max-w-[480px]`;
      default: return `${baseClasses} grid-cols-2 max-w-[200px]`;
    }
  };

  return (
    <div className="w-full flex justify-center px-2">
      <div className={getCompactGridClasses(cards.length)}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(index);
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.05,
                type: "spring"
              }}
              className="w-full aspect-square min-w-[60px] max-w-[80px]"
            >
              <MemoCard
                card={card}
                index={index}
                isFlipped={isFlipped}
                isMatched={isMatched}
                onClick={onCardClick}
                disabled={disabled}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}