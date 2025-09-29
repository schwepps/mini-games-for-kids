'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';
import CelebrationModal from './CelebrationModal';
import useMastermindGame from '@/hooks/games/mastermind/useMastermindGame';

export default function MastermindGame() {
  const {
    // State
    gamePhase,
    difficulty,
    secretCode,
    availableCharacters,
    guesses,
    currentGuess,
    selectedSlotIndex,
    attemptsRemaining,
    loading,
    error,
    
    // Actions
    selectDifficulty,
    startGame,
    selectSlot,
    placeCharacter,
    removeCharacter,
    clearCurrentGuess,
    submitGuess,
    resetGame,
    backToSetup,
    
    // Computed values
    getGameTime,
    canSubmitGuess,
  } = useMastermindGame();

  const [showCelebration, setShowCelebration] = useState(false);

  // Show celebration modal when game is won
  useEffect(() => {
    if (gamePhase === 'won') {
      setTimeout(() => setShowCelebration(true), 500);
    }
  }, [gamePhase]);

  // Handle new game from celebration modal
  const handleNewGame = () => {
    setShowCelebration(false);
    resetGame();
    if (difficulty) {
      startGame();
    }
  };

  // Handle change difficulty from celebration modal
  const handleChangeDifficulty = () => {
    setShowCelebration(false);
    backToSetup();
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            🕵️ Mastermind 🧩
          </h1>
          <p className="text-lg text-white/90 drop-shadow">
            Devine la combinaison secrète !
          </p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-6"
          >
            <Card className="bg-red-50 border-red-200 p-4 text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <Button
                onClick={resetGame}
                variant="outline"
                className="mt-3"
                size="sm"
              >
                Réessayer
              </Button>
            </Card>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Setup Phase */}
          {gamePhase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameSetup
                selectedDifficulty={difficulty}
                onDifficultyChange={selectDifficulty}
                onStartGame={startGame}
                loading={loading}
              />
            </motion.div>
          )}

          {/* Playing Phase */}
          {(gamePhase === 'playing' || gamePhase === 'won' || gamePhase === 'lost') && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Game Controls */}
              <div className="mb-4 flex flex-wrap gap-3 justify-center">
                
                {gamePhase === 'lost' && (
                  <>
                    <Button
                      onClick={() => {
                        resetGame();
                        startGame();
                      }}
                      size="lg"
                      className="font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                    >
                      🔄 Rejouer
                    </Button>
                    
                    <Button
                      onClick={backToSetup}
                      variant="outline"
                      size="lg"
                      className="font-bold bg-white/90 hover:bg-white"
                    >
                      🎯 Changer Difficulté
                    </Button>
                  </>
                )}
              </div>

              {/* Game Board */}
              <GameBoard
                secretCode={secretCode}
                guesses={guesses}
                currentGuess={currentGuess}
                selectedSlotIndex={selectedSlotIndex}
                attemptsRemaining={attemptsRemaining}
                maxAttempts={difficulty!.maxAttempts}
                codeLength={difficulty!.codeLength}
                onSlotSelect={selectSlot}
                onCharacterPlace={placeCharacter}
                onCharacterRemove={removeCharacter}
                onSubmitGuess={submitGuess}
                onClearGuess={clearCurrentGuess}
                gamePhase={gamePhase}
                availableCharacters={availableCharacters}
                canSubmitGuess={canSubmitGuess()}
              />


              {/* Celebration Modal */}
              {difficulty && (
                <CelebrationModal
                  open={showCelebration}
                  onOpenChange={setShowCelebration}
                  attempts={guesses.length}
                  maxAttempts={difficulty.maxAttempts}
                  gameTime={getGameTime()}
                  difficulty={difficulty}
                  onNewGame={handleNewGame}
                  onChangeDifficulty={handleChangeDifficulty}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}