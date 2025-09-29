'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import MahjongSetup from './MahjongSetup';
import MahjongBoard from './MahjongBoard';
import MahjongGameStats from './MahjongGameStats';
import MahjongGameControls from './MahjongGameControls';
import MahjongCelebrationModal from './MahjongCelebrationModal';
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
    selectDifficulty,
    startNewGame,
    selectTile,
    showHint,
    resetGame,
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


  useEffect(() => {
    if (gamePhase === 'won') {
      setShowCelebration(true);
    }
  }, [gamePhase, setShowCelebration]);


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


  // Loading state
  if (loading && gamePhase === 'setup') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-8 border-white border-t-indigo-400 rounded-full mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Préparation...</h2>
          <p className="text-white/80 text-lg">Mélange des tuiles en cours !</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oups !</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          >
            Réessayer
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gamePhase === 'setup') {
    return (
      <div className="min-h-screen p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 pb-8">
          <div className={`space-y-6 transition-all duration-300 ${dynamicSpacing}`}>
            <MahjongSetup
              difficulty={difficulty}
              onDifficultyChange={selectDifficulty}
              onStartGame={handleStartNewGame}
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 pb-8">
        <div className={`space-y-6 transition-all duration-300 ${dynamicSpacing}`}>
          <Image
            src="/images/logo/mahjong-logo-large.png"
            alt="Mahjong - Jeu de Mahjong"
            width={200}
            height={200}
            className="mx-auto drop-shadow-lg"
            priority
          />
          <MahjongGameStats
            stats={{
              moves,
              matchedPairs,
              totalPairs,
              hintsRemaining: hints,
              gameTime
            }}
          />
          {board && (
            <AnimatePresence mode="wait">
              <motion.div
                key="board"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full px-2 sm:px-4 lg:px-6 mt-4 sm:mt-6 lg:mt-8 mb-24"
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
        </div>
      </div>
    </div>
  );
}