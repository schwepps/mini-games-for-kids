'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CharacterButtonProps } from '@/types/jacques-a-dit';
import { ProfileLoader } from '@/lib/profileLoader';
import { Card, CardContent } from '@/components/ui/card';

export default function CharacterButton({
  character,
  isShowing,
  isCorrect,
  isWrong,
  onClick,
  disabled
}: CharacterButtonProps) {
  
  const handleClick = () => {
    if (!disabled) {
      onClick(character.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick(character.id);
    }
  };

  // Get the appropriate styling based on state
  const getButtonStyling = () => {
    if (isWrong) {
      return 'ring-4 ring-red-400 bg-red-100 shadow-lg animate-shake';
    }
    if (isCorrect) {
      return 'ring-4 ring-green-400 bg-green-100 shadow-lg';
    }
    if (isShowing) {
      return 'ring-4 ring-yellow-400 bg-yellow-100 shadow-2xl scale-110';
    }
    if (disabled) {
      return 'opacity-50 cursor-not-allowed';
    }
    return 'hover:scale-105 hover:shadow-lg cursor-pointer bg-white/95';
  };

  const getImagePath = () => {
    return ProfileLoader.getImageUrl(character.image);
  };

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isShowing ? 1.1 : 1,
        rotate: isWrong ? [0, -5, 5, -5, 0] : 0
      }}
      transition={{ 
        duration: 0.3,
        rotate: { duration: 0.5, ease: "easeInOut" }
      }}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <Card 
        className={`transition-all duration-300 focus-within:outline-none ${getButtonStyling()}`}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Personnage ${character.name}`}
        aria-pressed={isShowing}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-2">
            {/* Glow effect when showing */}
            {isShowing && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            
            <Image
              src={getImagePath()}
              alt={character.name}
              width={96}
              height={96}
              className="rounded-full object-cover shadow-md"
              priority={isShowing}
              onError={(e) => {
                console.warn(`Failed to load character image: ${getImagePath()}`);
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Success/Error overlays */}
            {isCorrect && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-green-500/80 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <span className="text-white text-2xl font-bold">✓</span>
              </motion.div>
            )}

            {isWrong && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <span className="text-white text-2xl font-bold">✗</span>
              </motion.div>
            )}
          </div>
          
          {/* Character name */}
          <p className="text-center text-xs sm:text-sm font-medium text-gray-700 truncate">
            {character.name}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}