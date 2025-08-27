'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ICharacter } from '@/types/guess-who';
import CharacterAvatar from '@/components/CharacterAvatar';
import CharacteristicIcon from './CharacteristicIcon';
import { Sparkles, Target } from 'lucide-react';

interface CharacterCardProps {
  character: ICharacter;
  onClick: () => void;
  isClickable: boolean;
  isLastOne: boolean;
  gameState: 'welcome' | 'playing' | 'won' | 'lost';
}

const CharacterCard = memo(function CharacterCard({ 
  character, 
  onClick, 
  isClickable, 
  isLastOne
}: CharacterCardProps) {
  
  return (
    <motion.div
      whileHover={isClickable ? {
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      } : {}}
      className="relative"
    >
      <Card 
        className={`
          relative overflow-hidden transition-all duration-300 border-4 h-full
          ${isClickable 
            ? 'hover:border-yellow-400 border-white/40 hover:shadow-xl cursor-pointer' 
            : 'border-white/20'
          }
          ${isLastOne 
            ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' 
            : ''
          }
          bg-white/90 backdrop-blur-sm
        `}
        onClick={onClick}
        role="button"
        tabIndex={isClickable ? 0 : -1}
        aria-label={`Select ${character.name}`}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Glow effect for last character */}
        {isLastOne && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-lg"
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        <CardContent className="p-1 relative z-10 h-full flex flex-col">
          {/* Character Avatar - full width with 4px padding */}
          <div className="relative mb-3">
            <div className="relative w-full aspect-square">
              <CharacterAvatar
                characterName={character.name}
                imageName={character.image}
                size="xl"
                className="rounded-xl shadow-md w-full h-full"
              />
              
              {/* Special indicators */}
              {isLastOne && (
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Target className="w-4 h-4 text-yellow-800" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Character Name and Characteristics - pushes to bottom */}
          <div className="text-center mt-auto">
            <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight line-clamp-2 min-h-[3rem] flex items-top justify-center">
              {character.name}
            </h3>
            
            {/* Characteristic Icons Row - Selective Display */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
              {/* Always show species and age */}
              {Boolean(character.characteristics.species) && (
                <CharacteristicIcon
                  key="species"
                  characteristic="species"
                  value={character.characteristics.species}
                  size="responsive"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              )}
              {Boolean(character.characteristics.age) && (
                <CharacteristicIcon
                  key="age"
                  characteristic="age"
                  value={character.characteristics.age}
                  size="responsive"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              )}
              
              {/* Show isSuperhero only if true */}
              {character.characteristics.isSuperhero === true && (
                <CharacteristicIcon
                  key="isSuperhero"
                  characteristic="isSuperhero"
                  value={true}
                  size="responsive"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              )}
              
              {/* Show hasHat only if true */}
              {character.characteristics.hasHat === true && (
                <CharacteristicIcon
                  key="hasHat"
                  characteristic="hasHat"
                  value={true}
                  size="responsive"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              )}
            </div>
          </div>

          {/* Last character indicator */}
          {isLastOne && isClickable && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-yellow-400 text-yellow-900 rounded-full p-3 font-bold text-sm shadow-lg"
                aria-label="Click to make your final guess"
              >
                TAP ME!
              </motion.div>
            </motion.div>
          )}

          {/* Hover effect sparkles */}
          {isClickable && (
            <motion.div
              className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-200"
              whileHover={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.character.id === nextProps.character.id &&
    prevProps.isClickable === nextProps.isClickable &&
    prevProps.isLastOne === nextProps.isLastOne &&
    prevProps.gameState === nextProps.gameState
  );
});

export default CharacterCard;