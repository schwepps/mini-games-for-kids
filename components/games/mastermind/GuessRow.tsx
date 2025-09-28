'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GuessRowProps } from '@/types/mastermind';
import { Card } from '@/components/ui/card';

export default function GuessRow({
  guess,
  currentGuess,
  isActive,
  attemptNumber,
  codeLength,
  selectedSlotIndex,
  onSlotClick,
  onCharacterRemove,
}: GuessRowProps) {
  const combination = guess ? guess.combination : currentGuess || [];
  const positionalFeedback = guess ? guess.positionalFeedback || [] : [];

  // Helper function to get border color based on positional feedback
  const getBorderColor = (index: number): string => {
    if (!guess || !positionalFeedback[index]) return '';

    switch (positionalFeedback[index]) {
      case 'correct-position':
        return 'border-green-500 border-4';
      case 'correct-character':
        return 'border-orange-500 border-4';
      case 'wrong':
        return 'border-red-500 border-4';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 mb-3">
      {/* Attempt Number */}
      <div className="w-8 sm:w-10 text-center">
        <span className={`text-sm sm:text-base font-bold ${
          isActive ? 'text-purple-600' : 'text-gray-500'
        }`}>
          #{attemptNumber}
        </span>
      </div>

      {/* Character Slots */}
      <div className="flex gap-1 sm:gap-2 flex-1">
        {Array.from({ length: codeLength }, (_, index) => {
          const character = combination[index] || null;
          const isSelected = isActive && selectedSlotIndex === index;
          const isEmpty = !character;

          return (
            <motion.div
              key={index}
              whileHover={isActive ? { scale: 1.05 } : {}}
              whileTap={isActive ? { scale: 0.95 } : {}}
              className="relative"
            >
              <Card
                className={`
                  relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                  flex items-center justify-center cursor-pointer
                  transition-all duration-200
                  ${isActive ? 'hover:shadow-lg' : ''}
                  ${isSelected ? 'ring-4 ring-purple-400 shadow-lg scale-105' : ''}
                  ${isEmpty ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-white'}
                  ${!isActive && !guess ? 'opacity-40' : ''}
                  ${getBorderColor(index)}
                `}
                onClick={() => isActive && onSlotClick && onSlotClick(index)}
              >
                <AnimatePresence mode="wait">
                  {character ? (
                    <motion.div
                      key={character.id}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                      />
                      {isActive && onCharacterRemove && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCharacterRemove(index);
                          }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          aria-label="Retirer le personnage"
                        >
                          ×
                        </button>
                      )}
                    </motion.div>
                  ) : (
                    isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-400 text-2xl"
                      >
                        ?
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </Card>
              
              {/* Slot indicator for active row */}
              {isActive && isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-purple-500" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}