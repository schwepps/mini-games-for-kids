'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CharacterPaletteProps } from '@/types/sudoku';
import { ICharacter } from '@/types/guess-who';
import { ProfileLoader } from '@/lib/profileLoader';

export default function CharacterPalette({
  characters,
  selectedCharacter,
  onCharacterSelect,
  disabled
}: CharacterPaletteProps) {

  const handleCharacterClick = (character: ICharacter) => {
    if (disabled) return;
    
    // If clicking on already selected character, deselect it
    if (selectedCharacter?.id === character.id) {
      onCharacterSelect(null);
    } else {
      onCharacterSelect(character);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, character: ICharacter) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCharacterClick(character);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-4"
      >
        <h3 className="text-lg font-bold text-white mb-2 drop-shadow">
          🎭 Choisis un personnage
        </h3>
        {selectedCharacter && (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white/90 text-sm drop-shadow"
          >
            Sélectionné : <span className="font-bold text-yellow-300">{selectedCharacter.name}</span>
          </motion.p>
        )}
      </motion.div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
        <div className={`grid gap-3 justify-center ${
          characters.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' :
          characters.length <= 6 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' :
          'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9'
        }`}>
          {characters.map((character, index) => {
            const isSelected = selectedCharacter?.id === character.id;
            
            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                className={`relative aspect-square rounded-xl border-3 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/50 min-h-[60px] min-w-[60px] ${
                  disabled ? 'cursor-not-allowed opacity-50' : ''
                } ${
                  isSelected
                    ? 'bg-yellow-100 border-yellow-400 shadow-lg ring-4 ring-yellow-300/50 transform scale-105'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handleCharacterClick(character)}
                onKeyDown={(e) => handleKeyDown(e, character)}
                tabIndex={disabled ? -1 : 0}
                role="button"
                aria-label={`Sélectionner ${character.name}${isSelected ? ' (actuellement sélectionné)' : ''}`}
                aria-pressed={isSelected}
              >
                <div className="absolute inset-2">
                  <Image
                    src={ProfileLoader.getImageUrl(character.image)}
                    alt={character.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 640px) 60px, (max-width: 768px) 70px, 80px"
                  />
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    >
                      <span className="text-white font-bold text-sm">✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 border-3 border-yellow-400 rounded-xl pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {character.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-4"
        >
          <p className="text-gray-600 text-sm">
            {selectedCharacter 
              ? "💡 Clique sur une case de la grille pour placer ce personnage"
              : "👆 Clique sur un personnage pour le sélectionner"
            }
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}