'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MahjongSetup from './MahjongSetup';
import MahjongBoard from './MahjongBoard';
import MahjongGameStats from './MahjongGameStats';
import MahjongGameControls from './MahjongGameControls';
import MahjongCelebrationModal from './MahjongCelebrationModal';
import MahjongGameLayout from './MahjongGameLayout';
import { useMahjongGame } from '@/hooks/games/mahjong/useMahjongGame';
import { useMahjongGameUI } from '@/hooks/games/mahjong/useMahjongGameUI';
import { useContainerSize } from '@/hooks/shared/useContainerSize';
import { MahjongDifficulty } from '@/types/mahjong';

/**
 * Main Mahjong game component - now follows SRP
 * Orchestrates game flow and delegates UI concerns to focused hooks and components
 */
export default function MahjongGame() {
  const {
    // State
    gamePhase,
    difficulty,
    board,
    selectedTiles,
    matchedPairs,
    totalPairs,
    moves,
    hints,
    showingHint,
    loading,
    error,
    
    // Actions
    selectDifficulty,
    startNewGame,
    selectTile,
    showHint,
    resetGame,
    
    // Computed
    gameTime,
    isInteractionDisabled,
    hasValidMoves
  } = useMahjongGame();

  const { size: containerSize, isReady } = useContainerSize();
  const { 
    showCelebration, 
    setShowCelebration, 
    calculateDynamicSpacing
  } = useMahjongGameUI();

  const dynamicSpacing = calculateDynamicSpacing(containerSize, difficulty);

  // Show celebration when game is won
  useEffect(() => {
    if (gamePhase === 'won') {
      setShowCelebration(true);
    }
  }, [gamePhase, setShowCelebration]);

  // Event handlers with container size awareness
  const handleNewGame = () => {
    setShowCelebration(false);
    if (isReady && containerSize) {
      startNewGame(containerSize);
    } else {
      startNewGame();
    }
  };

  const handleChangeDifficulty = () => {
    setShowCelebration(false);
    resetGame();
  };

  const handleDifficultyChange = (newDifficulty: MahjongDifficulty) => {
    setShowCelebration(false);
    selectDifficulty(newDifficulty);
    setTimeout(() => {
      if (isReady && containerSize) {
        startNewGame(containerSize);
      } else {
        startNewGame();
      }
    }, 500);
  };

  const handleShowHint = () => {
    if (hints > 0 && !showingHint) {
      showHint();
    }
  };

  const handleStartNewGame = () => {
    if (isReady && containerSize) {
      startNewGame(containerSize);
    } else {
      startNewGame();
    }
  };

  // Setup phase
  if (gamePhase === 'setup') {
    return (
      <MahjongGameLayout 
        dynamicSpacing={dynamicSpacing}
        loading={loading && gamePhase === 'setup'}
        error={error}
        onRetry={resetGame}
      >
        <MahjongSetup
          difficulty={difficulty}
          onDifficultyChange={selectDifficulty}
          onStartGame={handleStartNewGame}
          loading={loading}
        />
      </MahjongGameLayout>
    );
  }

  // Playing phase
  return (
    <MahjongGameLayout 
      dynamicSpacing={dynamicSpacing}
      error={error}
      onRetry={resetGame}
    >
      {/* Game Statistics */}
      <MahjongGameStats 
        stats={{
          moves,
          matchedPairs,
          totalPairs,
          hintsRemaining: hints,
          gameTime
        }}
      />

      {/* Game Board */}
      {board && (
        <AnimatePresence mode="wait">
          <motion.div
            key="board"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full py-6 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-6"
          >
            <MahjongBoard
              board={board}
              onTileClick={selectTile}
              disabled={isInteractionDisabled}
              showHintTileIds={showingHint ? selectedTiles : []}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Game Controls */}
      <MahjongGameControls
        hints={hints}
        isInteractionDisabled={isInteractionDisabled}
        onShowHint={handleShowHint}
        onNewGame={handleNewGame}
        onChangeDifficulty={handleChangeDifficulty}
      />

      {/* No Valid Moves Warning */}
      {board && !hasValidMoves && gamePhase === 'playing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/40 rounded-xl p-4 max-w-md mx-auto">
            <div className="text-red-400 text-2xl mb-2">⚠️</div>
            <h3 className="text-red-300 font-bold mb-2">Aucun mouvement possible</h3>
            <p className="text-red-200 text-sm mb-4">
              Il n&apos;y a plus de paires disponibles. Tu peux recommencer une nouvelle partie !
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewGame}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full text-sm shadow-lg"
            >
              Nouvelle partie
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && gamePhase === 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white/90 rounded-xl p-6 text-center shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full mx-auto mb-2"
              />
              <p className="text-gray-600 font-medium">Traitement...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Modal */}
      <MahjongCelebrationModal
        open={showCelebration}
        onOpenChange={setShowCelebration}
        moves={moves}
        totalPairs={totalPairs}
        gameTime={gameTime}
        difficulty={difficulty}
        onNewGame={handleNewGame}
        onDifficultyChange={handleDifficultyChange}
      />
    </MahjongGameLayout>
  );
}