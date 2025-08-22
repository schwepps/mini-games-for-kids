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
              className="w-full h-full"
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

