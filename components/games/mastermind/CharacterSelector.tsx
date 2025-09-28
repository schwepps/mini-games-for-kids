'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { CharacterSelectorProps } from '@/types/mastermind';

export default function CharacterSelector({
  availableCharacters,
  selectedSlotIndex,
  currentGuess,
  onCharacterSelect,
  disabled,
}: CharacterSelectorProps) {
  
  // Check if a character is already used in the current guess
  const isCharacterUsed = (characterId: string) => {
    return currentGuess.some(char => char?.id === characterId);
  };

  return (
    <div className="mt-6 p-4 bg-white/95 rounded-xl shadow-lg mx-auto max-w-fit">
      <div className="text-center mb-3">
        <h3 className="text-sm sm:text-base font-bold text-purple-700">
          {selectedSlotIndex !== null ? (
            <>Choisis un personnage pour la position {selectedSlotIndex + 1} 👇</>
          ) : (
            <>Clique sur une case vide pour placer un personnage 👆</>
          )}
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {availableCharacters.map((character, index) => {
          const isUsed = isCharacterUsed(character.id);
          
          return (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={!disabled && selectedSlotIndex !== null ? { scale: 1.1, y: -5 } : {}}
              whileTap={!disabled && selectedSlotIndex !== null ? { scale: 0.9 } : {}}
            >
              <Card
                className={`
                  relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                  cursor-pointer transition-all duration-200 py-1 px-1
                  ${disabled || selectedSlotIndex === null ? 'opacity-50 cursor-not-allowed' : ''}
                  ${isUsed ? 'ring-2 ring-green-400 opacity-70' : 'hover:shadow-xl hover:ring-2 hover:ring-purple-400'}
                  bg-white
                `}
                onClick={() => {
                  if (!disabled && selectedSlotIndex !== null) {
                    onCharacterSelect(character);
                  }
                }}
                role="button"
                tabIndex={disabled || selectedSlotIndex === null ? -1 : 0}
                aria-label={`Sélectionner ${character.name}`}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !disabled && selectedSlotIndex !== null) {
                    e.preventDefault();
                    onCharacterSelect(character);
                  }
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  />
                  {isUsed && (
                    <div className="absolute inset-0 bg-green-500/20 rounded flex items-center justify-center">
                      <span className="text-green-600 text-2xl">✓</span>
                    </div>
                  )}
                </div>
              </Card>
              
              {/* Character name tooltip on hover */}
              <motion.div
                className="text-center mt-1"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-xs text-gray-600 font-medium">
                  {character.name.split(' ')[0]}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {disabled && (
        <p className="text-center mt-3 text-sm text-gray-500">
          Sélection désactivée
        </p>
      )}
    </div>
  );
}