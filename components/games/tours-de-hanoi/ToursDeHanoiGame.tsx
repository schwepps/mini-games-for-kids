'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import TowerPeg from './TowerPeg';
import CelebrationModal from './CelebrationModal';
import GameControls from './GameControls';
import GameStatus from './GameStatus';
import { useToursDeHanoiGame } from '@/hooks/games/tours-de-hanoi/useToursDeHanoiGame';
import { ToursDeHanoiGameProps, GameStats } from '@/types/tours-de-hanoi';

export default function ToursDeHanoiGame({
  characters,
  difficulty,
  onRestart
}: ToursDeHanoiGameProps) {
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const {
    gameState,
    timeElapsed,
    handleTowerClick,
    selectDisc,
    canPlaceDisc,
    toggleHint,
    resetGame
  } = useToursDeHanoiGame({
    characters,
    difficulty,
    onComplete: (stats) => {
      setGameStats(stats);
      setShowCelebration(true);
    }
  });

  const handleNewGame = () => {
    setShowCelebration(false);
    setGameStats(null);
    resetGame();
  };

  const handleChangeDifficulty = () => {
    setShowCelebration(false);
    setGameStats(null);
    onRestart();
  };

  const handleCloseCelebration = (open: boolean) => {
    setShowCelebration(open);
    if (!open && gameState.isComplete) {
      // Reset the game but stay in playing mode (like Jacques a dit)
      resetGame();
    }
  };

  const handleResetGame = () => {
    resetGame();
  };

  // Check which towers can receive the selected disc
  const getCanReceiveDisc = (towerId: number) => {
    if (!gameState.selectedDisc) return false;
    const tower = gameState.towers.find(t => t.id === towerId);
    return tower ? canPlaceDisc(gameState.selectedDisc, tower) : false;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Game Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Image
            src="/images/logo/tours-de-hanoi-logo-large.png"
            alt="Tours de Hanoi"
            width={200}
            height={200}
            className="drop-shadow-xl"
            priority
          />
        </motion.div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">
          Tours de Hanoi 🏗️
        </h1>
        <p className="text-lg text-white/90 drop-shadow">
          {difficulty.name} - {difficulty.description}
        </p>
      </motion.div>

      {/* Game Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <GameStatus
          moveCount={gameState.moveCount}
          optimalMoves={difficulty.minMoves}
          timeElapsed={timeElapsed}
          difficulty={difficulty}
        />
      </motion.div>

      {/* Instructions for Current State */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <Card className="bg-white/80 max-w-md mx-auto">
          <CardContent className="p-4">
            {gameState.selectedDisc ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">👆</span>
                <p className="text-sm font-medium text-gray-700">
                  Clique sur une tour pour déplacer <strong>{gameState.selectedDisc.character.name}</strong>
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">✋</span>
                <p className="text-sm font-medium text-gray-700">
                  Clique sur un personnage pour le sélectionner
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Hint Display */}
      <AnimatePresence>
        {gameState.showHint && gameState.hintMove && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-4"
          >
            <Card className="bg-yellow-100 border-2 border-yellow-400 max-w-sm mx-auto">
              <CardContent className="p-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">💡</span>
                  <p className="text-sm font-medium text-yellow-800">
                    Astuce : Tour {gameState.hintMove.from + 1} → Tour {gameState.hintMove.to + 1}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board - Three Towers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center items-end gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 min-h-80 sm:min-h-96"
      >
        {gameState.towers.map((tower) => (
          <TowerPeg
            key={tower.id}
            tower={tower}
            isSelected={gameState.selectedTower === tower.id}
            canReceiveDisc={getCanReceiveDisc(tower.id)}
            onSelectTower={handleTowerClick}
            onSelectDisc={selectDisc}
            selectedDisc={gameState.selectedDisc}
            gameComplete={gameState.isComplete}
            characterCount={difficulty.characterCount}
          />
        ))}
      </motion.div>

      {/* Game Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GameControls
          onReset={handleResetGame}
          onNewGame={onRestart}
          onToggleHint={toggleHint}
          showHint={gameState.showHint}
        />
      </motion.div>



      {/* Celebration Modal */}
      <CelebrationModal
        open={showCelebration}
        onOpenChange={handleCloseCelebration}
        stats={gameStats}
        onNewGame={handleNewGame}
        onChangeDifficulty={handleChangeDifficulty}
      />
    </div>
  );
}