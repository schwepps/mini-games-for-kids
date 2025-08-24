'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SudokuCellProps } from '@/types/sudoku';
import { ProfileLoader } from '@/lib/profileLoader';

export default function SudokuCell({
  cell,
  row,
  col,
  selectedCharacter,
  isHighlighted,
  showHint,
  onClick,
  disabled
}: SudokuCellProps) {

  const handleClick = () => {
    if (!disabled) {
      onClick(row, col);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine cell styling based on state
  const getCellStyling = () => {
    let baseClasses = "relative aspect-square rounded-lg border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ";
    
    if (disabled) {
      baseClasses += "cursor-not-allowed ";
    }

    if (cell.isGiven) {
      // Pre-filled cells
      baseClasses += "bg-blue-100 border-blue-300 shadow-inner ";
    } else if (!cell.isValid && cell.value) {
      // Invalid placement
      baseClasses += "bg-red-100 border-red-400 shadow-md ";
    } else if (isHighlighted) {
      // Highlighted for selection
      baseClasses += "bg-yellow-200 border-yellow-400 shadow-md ring-2 ring-yellow-300 ";
    } else if (showHint) {
      // Hint cell
      baseClasses += "bg-green-100 border-green-300 shadow-md ring-2 ring-green-200 animate-pulse ";
    } else if (cell.value) {
      // Filled cell
      baseClasses += "bg-white border-gray-300 shadow-sm hover:shadow-md ";
    } else {
      // Empty cell
      baseClasses += "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 ";
    }

    if (!disabled && !cell.isGiven) {
      baseClasses += "hover:scale-102 active:scale-98 ";
    }

    return baseClasses;
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: (row * 3 + col) * 0.05 }}
      className={getCellStyling()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={
        cell.character 
          ? `Cellule ligne ${row + 1}, colonne ${col + 1}: ${cell.character.name}${cell.isGiven ? ' (pré-rempli)' : ''}${!cell.isValid ? ' (invalide)' : ''}`
          : `Cellule vide ligne ${row + 1}, colonne ${col + 1}${showHint ? ' (suggestion)' : ''}`
      }
      aria-pressed={isHighlighted}
    >
      <div className="absolute inset-0 flex items-center justify-center p-1">
        {cell.character ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-full h-full"
          >
            <Image
              src={ProfileLoader.getImageUrl(cell.character.image)}
              alt={cell.character.name}
              fill
              className="object-contain rounded"
              sizes="(max-width: 640px) 40px, (max-width: 1024px) 56px, 72px"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {showHint && selectedCharacter && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-3/4 h-3/4"
              >
                <Image
                  src={ProfileLoader.getImageUrl(selectedCharacter.image)}
                  alt={`Suggestion: ${selectedCharacter.name}`}
                  fill
                  className="object-contain rounded opacity-60"
                  sizes="(max-width: 640px) 32px, (max-width: 1024px) 44px, 56px"
                />
              </motion.div>
            )}
            {!showHint && (
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.5 }}
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gray-300 rounded-full opacity-30"
              />
            )}
          </div>
        )}
      </div>

      {cell.isGiven && (
        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full" />
      )}

      {!cell.isValid && cell.value && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"
        />
      )}

      {showHint && (
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 text-green-500 text-xs sm:text-sm"
        >
          💡
        </motion.div>
      )}

      {isHighlighted && (
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-2 border-yellow-400 rounded-lg pointer-events-none"
        />
      )}
    </motion.div>
  );
}