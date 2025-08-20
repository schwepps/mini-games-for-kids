'use client';

import { motion } from 'framer-motion';
import { ICharacter, IQuestion } from '@/types/game';
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  characters: ICharacter[];
  onCharacterGuess: (character: ICharacter) => void;
  gameState: 'playing' | 'won' | 'lost';
  questionsAsked: IQuestion[];
}

export default function CharacterGrid({ 
  characters, 
  onCharacterGuess, 
  gameState
}: CharacterGridProps) {
  const canMakeGuess = gameState === 'playing' && characters.length > 1;
  const mustMakeGuess = gameState === 'playing' && characters.length === 1;

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30">
          {gameState === 'playing' && (
            <>
              {characters.length > 1 && (
                <p className="text-white text-lg font-medium">
                  🤔 Pose des questions pour éliminer des personnages, ou clique sur un personnage pour deviner !
                </p>
              )}
              {characters.length === 1 && (
                <motion.p 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-white text-xl font-bold"
                >
                  🎯 Il n&apos;en reste qu&apos;un ! Clique pour deviner !
                </motion.p>
              )}
              {characters.length === 0 && (
                <p className="text-white text-lg font-medium">
                  😅 Oups ! Il ne reste plus de personnages. Essaie une nouvelle partie !
                </p>
              )}
            </>
          )}
          {gameState === 'won' && (
            <motion.p 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-white text-xl font-bold"
            >
              🎉 Tu as trouvé le personnage caché ! Incroyable !
            </motion.p>
          )}
          {gameState === 'lost' && (
            <motion.p 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-white text-xl font-bold"
            >
              😔 Plus de chance la prochaine fois ! Réessaie !
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Character Grid */}
      <motion.div 
        layout
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 auto-rows-fr"
      >
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            layout
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
            }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={canMakeGuess || mustMakeGuess ? { 
              scale: 1.05,
              y: -8,
              transition: { duration: 0.2 }
            } : {}}
            whileTap={canMakeGuess || mustMakeGuess ? { 
              scale: 0.95 
            } : {}}
            className="h-full"
          >
            <CharacterCard
              character={character}
              onClick={() => {
                if (canMakeGuess || mustMakeGuess) {
                  onCharacterGuess(character);
                }
              }}
              isClickable={canMakeGuess || mustMakeGuess}
              isLastOne={mustMakeGuess}
              gameState={gameState}
            />
          </motion.div>
        ))}
      </motion.div>


      {/* Empty state */}
      {characters.length === 0 && gameState === 'playing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-8xl mb-4">🤷‍♀️</div>
          <p className="text-white text-xl font-bold mb-2">
            Oups ! Plus de personnages !
          </p>
          <p className="text-white/80">
            On dirait que les questions ont éliminé tout le monde. Essaie une nouvelle partie !
          </p>
        </motion.div>
      )}
    </div>
  );
}