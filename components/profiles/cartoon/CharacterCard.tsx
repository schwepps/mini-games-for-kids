'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ICharacter } from '@/types/game';
import CharacterAvatar from '@/components/CharacterAvatar';
import { Crown, Sparkles, Target } from 'lucide-react';

interface CharacterCardProps {
  character: ICharacter;
  onClick: () => void;
  isClickable: boolean;
  isLastOne: boolean;
  gameState: 'welcome' | 'playing' | 'won' | 'lost';
}

export default function CharacterCard({ 
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

        <CardContent className="p-3 relative z-10 h-full flex flex-col">
          {/* Character Avatar */}
          <div className="relative mb-3 flex justify-center">
            <div className="relative">
              <CharacterAvatar
                characterName={character.name}
                imageName={character.image}
                size="lg"
                className="rounded-xl shadow-md"
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

              {/* Superhero indicator */}
              {(character.characteristics.isSuperhero as boolean) && (
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Character Name - pushes to bottom */}
          <div className="text-center mt-auto">
            <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight">
              {character.name}
            </h3>
            
            {/* Quick characteristics */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {/* Age badge */}
              <Badge 
                variant="secondary" 
                className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700"
              >
                {character.characteristics.age === 'child' && '👶'}
                {character.characteristics.age === 'teen' && '🧑'}
                {character.characteristics.age === 'adult' && '👩'}
                {character.characteristics.age === 'elderly' && '👴'}
              </Badge>
              
              {/* Species badge */}
              <Badge 
                variant="secondary" 
                className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700"
              >
                {character.characteristics.species === 'human' && '👤'}
                {character.characteristics.species === 'animal' && '🐾'}
                {character.characteristics.species === 'robot' && '🤖'}
                {character.characteristics.species === 'alien' && '👽'}
                {character.characteristics.species === 'monster' && '👹'}
              </Badge>
            </div>
          </div>

          {/* Click indicator */}
          {isClickable && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 rounded-lg transition-colors duration-200"
              whileHover={isLastOne ? {
                backgroundColor: "rgba(255, 255, 0, 0.2)"
              } : {}}
            >
              {isLastOne && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-yellow-400 text-yellow-900 rounded-full p-2 font-bold text-xs shadow-lg"
                >
                  TAP ME!
                </motion.div>
              )}
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
}