'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import SudokuSetup from './SudokuSetup';
import SudokuGrid from './SudokuGrid';
import CharacterPalette from './CharacterPalette';
import SudokuCelebrationModal from './SudokuCelebrationModal';
import SudokuGameStats from './SudokuGameStats';
import SudokuGameControls from './SudokuGameControls';
import SudokuLoadingState from './SudokuLoadingState';
import SudokuErrorState from './SudokuErrorState';
import { useSudokuGame } from '@/hooks/games/sudoku/useSudokuGame';
import { SudokuDifficulty } from '@/types/sudoku';

export default function SudokuGame() {
  const {
    // State
    gamePhase,
    difficulty,
    gridSize,
    grid,
    selectedCharacter,
    moves,
    loading,
    error,
    hints,
    showingHints,
    validationErrors,
    
    // Actions
    selectDifficulty,
    startNewGame,
    selectCharacter,
    placeCharacter,
    toggleHints,
    resetGame,
    changeDifficulty,
    
    // Computed
    gameTime,
    isInteractionDisabled
  } = useSudokuGame();

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

  const handleDifficultyChange = (newDifficulty: SudokuDifficulty) => {
    setShowCelebration(false);
    selectDifficulty(newDifficulty);
    setTimeout(() => {
      startNewGame();
    }, 500);
  };

  // Loading state
  if (loading && gamePhase === 'setup') {
    return <SudokuLoadingState />;
  }

  // Error state
  if (error) {
    return <SudokuErrorState error={error} onReset={resetGame} />;
  }

  // Setup phase
  if (gamePhase === 'setup') {
    return (
      <SudokuSetup
        difficulty={difficulty}
        onDifficultyChange={selectDifficulty}
        onStartGame={startNewGame}
        loading={loading}
      />
    );
  }

  // Playing phase
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Image
          src="/images/logo/sudoku-logo-large.png"
          alt="Sudoku - Jeu de Sudoku"
          width={200}
          height={200}
          className="mx-auto drop-shadow-lg"
          priority
        />
        <SudokuGameStats 
          moves={moves}
          gameTime={gameTime}
          gridSize={gridSize}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
        {grid && (
          <>
            <SudokuGrid
              grid={grid}
              selectedCharacter={selectedCharacter}
              showingHints={showingHints}
              validationErrors={validationErrors}
              onCellClick={placeCharacter}
              disabled={isInteractionDisabled}
            />

            <CharacterPalette
              characters={grid.characters}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={selectCharacter}
              disabled={isInteractionDisabled}
            />
          </>
        )}

        <SudokuGameControls
          hints={hints}
          isInteractionDisabled={isInteractionDisabled}
          onToggleHints={toggleHints}
          onChangeDifficulty={changeDifficulty}
          onNewGame={handleNewGame}
        />
        </div>

        <AnimatePresence>
          {loading && gamePhase === 'playing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-lg p-6 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-2"
                />
                <p className="text-gray-600">Validation...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SudokuCelebrationModal
        open={showCelebration}
        onOpenChange={setShowCelebration}
        moves={moves}
        gridSize={gridSize}
        gameTime={gameTime}
        onNewGame={handleNewGame}
        onDifficultyChange={handleDifficultyChange}
      />
    </div>
  );
}