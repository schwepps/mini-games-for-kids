'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { gameButton, outlineButton } from '@/lib/styles/buttonUtils';
import GuessRow from './GuessRow';
import CharacterSelector from './CharacterSelector';
import { GameBoardProps } from '@/types/mastermind';

export default function GameBoard({
  secretCode,
  guesses,
  currentGuess,
  selectedSlotIndex,
  attemptsRemaining,
  maxAttempts,
  codeLength,
  onSlotSelect,
  onCharacterPlace,
  onCharacterRemove,
  onSubmitGuess,
  onClearGuess,
  gamePhase,
  availableCharacters,
  canSubmitGuess,
}: GameBoardProps) {
  const currentAttempt = maxAttempts - attemptsRemaining + 1;
  const isGameActive = gamePhase === 'playing';

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="bg-white/95 shadow-2xl border-2 border-purple-200">
        <div className="p-4 sm:p-6">
          {/* Secret Code Area (Hidden) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-center">
              <h3 className="text-white font-bold text-lg mb-2">Code Secret 🔒</h3>
              <div className="flex justify-center gap-2">
                {Array.from({ length: codeLength }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center"
                    animate={gamePhase === 'won' || gamePhase === 'lost' ? {
                      rotateY: [0, 180],
                    } : {}}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    {gamePhase === 'won' || gamePhase === 'lost' ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <Image
                          src={secretCode[i]?.image || '/images/placeholder.png'}
                          alt="Secret"
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                        />
                      </motion.div>
                    ) : (
                      <span className="text-white text-2xl">❓</span>
                    )}
                  </motion.div>
                ))}
              </div>
              {(gamePhase === 'won' || gamePhase === 'lost') && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-white mt-2"
                >
                  {gamePhase === 'won' ? 'Bravo ! Tu as trouvé ! 🎉' : 'La combinaison était... 😊'}
                </motion.p>
              )}
            </Card>
          </motion.div>

          {/* Game Status */}
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm sm:text-base">
              <span className="font-bold text-purple-600">Essai:</span>{' '}
              <span className="font-bold">{currentAttempt}/{maxAttempts}</span>
            </div>
            <div className="text-sm sm:text-base">
              <span className="font-bold text-purple-600">Restants:</span>{' '}
              <span className={`font-bold ${attemptsRemaining <= 3 ? 'text-red-500' : 'text-gray-700'}`}>
                {attemptsRemaining}
              </span>
            </div>
          </div>

          {/* Guess History */}
          <div className="py-6 max-h-[300px] overflow-y-auto flex flex-col items-center">
            {/* Previous Guesses */}
            {guesses.map((guess, index) => (
              <GuessRow
                key={guess.id}
                guess={guess}
                isActive={false}
                attemptNumber={index + 1}
                codeLength={codeLength}
              />
            ))}

            {/* Current Guess Row */}
            {isGameActive && (
              <GuessRow
                guess={null}
                currentGuess={currentGuess}
                isActive={true}
                attemptNumber={currentAttempt}
                codeLength={codeLength}
                selectedSlotIndex={selectedSlotIndex}
                onSlotClick={onSlotSelect}
                onCharacterRemove={onCharacterRemove}
              />
            )}

            {/* Empty rows for remaining attempts */}
            {isGameActive && attemptsRemaining > 1 && (
              <>
                {Array.from({ length: attemptsRemaining - 1 }, (_, i) => (
                  <GuessRow
                    key={`empty-${i}`}
                    guess={null}
                    isActive={false}
                    attemptNumber={currentAttempt + i + 1}
                    codeLength={codeLength}
                  />
                ))}
              </>
            )}
          </div>

          {/* Action Buttons */}
          {isGameActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-3 justify-center mb-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onClearGuess}
                  size="lg"
                  className="border-2 border-purple-500 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-full px-6 py-3 transition-all duration-200 shadow-purple-400/30"
                  disabled={currentGuess.every(slot => slot === null)}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Effacer
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onSubmitGuess}
                  size="lg"
                  disabled={!canSubmitGuess}
                  className={canSubmitGuess
                    ? gameButton('newGame', 'shadow-green-400/30')
                    : 'bg-gray-400 cursor-not-allowed text-white font-bold rounded-full px-6 py-3'
                  }
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Valider
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Character Selector */}
          {isGameActive && (
            <CharacterSelector
              availableCharacters={availableCharacters}
              selectedSlotIndex={selectedSlotIndex}
              currentGuess={currentGuess}
              onCharacterSelect={(character) => onCharacterPlace(character)}
              disabled={!isGameActive}
            />
          )}

          {/* Game Over Messages */}
          {gamePhase === 'lost' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <Card className="bg-gradient-to-r from-red-100 to-orange-100 p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Dommage ! 😢
                </h2>
                <p className="text-gray-700">
                  Tu n&apos;as pas trouvé la combinaison secrète cette fois-ci.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Continue à t&apos;entraîner, tu y arriveras ! 💪
                </p>
              </Card>
            </motion.div>
          )}
        </div>
        </Card>
      </div>
    </div>
  );
}