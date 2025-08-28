'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';
import SequenceDisplay from './SequenceDisplay';
import GameControls from './GameControls';
import CelebrationModal from './CelebrationModal';
import { useJacquesADitGame } from '@/hooks/games/jacques-a-dit/useJacquesADitGame';

export default function JacquesADitGame() {
  const {
    gamePhase,
    selectedDifficulty,
    characters,
    sequence,
    playerInput,
    currentRound,
    mistakes,
    showingIndex,
    loading,
    error,
    selectDifficulty,
    startNewGame,
    handleCharacterClick,
    resetGame,
    isInteractionDisabled,
    targetLength
  } = useJacquesADitGame();

  const [showCelebration, setShowCelebration] = useState(false);

  // Show celebration when game is won
  useEffect(() => {
    if (gamePhase === 'won') {
      setShowCelebration(true);
    }
  }, [gamePhase]);

  const handleNewGame = () => {
    setShowCelebration(false);
    startNewGame();
  };

  const handleChangeDifficulty = () => {
    setShowCelebration(false);
    resetGame();
  };

  // Loading state
  if (loading && characters.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-8 border-white border-t-yellow-400 rounded-full mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Préparation...</h2>
          <p className="text-white/80 text-lg">Jacques prépare les personnages !</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center bg-white/90 backdrop-blur-sm">
          <CardContent className="space-y-4">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-red-600">Oups !</h2>
            <p className="text-gray-600">{error}</p>
            <Button 
              onClick={resetGame} 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Logo */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <Image
            src="/images/logo/jacques-a-dit-logo-large.png"
            alt="Jacques a dit - Jeu de Mémoire"
            width={200}
            height={200}
            className="mx-auto drop-shadow-lg"
            priority
            onError={() => {
              console.warn('Logo not found, using fallback');
            }}
          />
          <motion.p 
            className="text-white/90 text-lg lg:text-xl mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {gamePhase === 'setup' 
              ? 'Choisis ta difficulté et teste ta mémoire !' 
              : 'Mémorise et répète la séquence de Jacques !'}
          </motion.p>
        </motion.div>

        {/* Game Content based on phase */}
        <AnimatePresence mode="wait">
          
          {/* Setup Phase */}
          {gamePhase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <GameSetup
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={selectDifficulty}
                onStartGame={startNewGame}
                loading={loading}
              />
            </motion.div>
          )}

          {/* Gameplay Phases (ready, showing, waiting, playing, wrong) */}
          {(gamePhase === 'ready' || gamePhase === 'showing' || gamePhase === 'waiting' || gamePhase === 'playing' || gamePhase === 'wrong') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              
              {/* Sequence Display */}
              <SequenceDisplay
                currentRound={currentRound}
                targetLength={targetLength}
                mistakes={mistakes}
                gamePhase={gamePhase}
              />

              {/* Game Board */}
              <div className="flex justify-center">
                <GameBoard
                  characters={characters}
                  showingIndex={showingIndex}
                  playerInput={playerInput}
                  sequence={sequence}
                  gamePhase={gamePhase}
                  onCharacterClick={handleCharacterClick}
                  disabled={isInteractionDisabled()}
                />
              </div>

              {/* Game Controls */}
              <GameControls
                onNewGame={handleNewGame}
                onChangeDifficulty={handleChangeDifficulty}
                disabled={isInteractionDisabled()}
              />
            </motion.div>
          )}

          {/* Won Phase (handled by modal, but show brief message) */}
          {gamePhase === 'won' && !showCelebration && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-green-400 rounded-3xl p-8 inline-block shadow-2xl mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Bravo ! 🎉
                </h2>
                <p className="text-white/90 text-xl">
                  Tu as terminé tous les tours !
                </p>
              </div>
              
              {/* Game Controls */}
              <GameControls
                onNewGame={handleNewGame}
                onChangeDifficulty={handleChangeDifficulty}
                disabled={false}
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Celebration Modal */}
        <CelebrationModal
          open={showCelebration}
          onOpenChange={setShowCelebration}
          currentRound={currentRound}
          mistakes={mistakes}
          difficultyName={selectedDifficulty?.name || ''}
          onNewGame={handleNewGame}
        />
      </div>
    </div>
  );
}