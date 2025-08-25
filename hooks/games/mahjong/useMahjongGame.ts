'use client';

import { useCallback } from 'react';
import { MahjongDifficulty } from '@/types/mahjong';
import { MahjongGenerator } from '@/lib/games/mahjong/generator';
import { ContainerSize } from '@/hooks/shared/useContainerSize';

// Import focused sub-hooks
import { useMahjongGameState } from './useMahjongGameState';
import { useMahjongGameLogic } from './useMahjongGameLogic';
import { useMahjongGameEffects } from './useMahjongGameEffects';

/**
 * Main Mahjong game hook - orchestrates all game concerns
 * Now follows SRP by delegating to focused sub-hooks
 */
export function useMahjongGame() {
  // Pure state management
  const { state, dispatch } = useMahjongGameState();
  
  // Business logic and actions
  const gameLogic = useMahjongGameLogic(dispatch);
  
  // Side effects and reactive behaviors
  const { screenWidth } = useMahjongGameEffects(state, dispatch);

  // Enhanced actions that combine logic with container size
  const startNewGame = useCallback(async (containerSize?: ContainerSize) => {
    await gameLogic.generateBoard(state.difficulty, containerSize, screenWidth);
  }, [gameLogic, state.difficulty, screenWidth]);

  const showHint = useCallback(() => {
    if (state.hints > 0) {
      gameLogic.showHint();
      
      // Auto-hide hint after 3 seconds (moved from effects for better control)
      setTimeout(() => {
        gameLogic.hideHint();
      }, 3000);
    }
  }, [state.hints, gameLogic]);

  // Computed values
  const gameTime = gameLogic.calculateGameTime(state.startTime);
  const calculateEfficiency = useCallback(() => 
    gameLogic.calculateEfficiency(state.totalPairs, state.moves)
  , [gameLogic, state.totalPairs, state.moves]);

  return {
    // State
    gamePhase: state.gamePhase,
    difficulty: state.difficulty,
    board: state.board,
    selectedTiles: state.selectedTiles,
    matchedPairs: state.matchedPairs,
    totalPairs: state.totalPairs,
    moves: state.moves,
    hints: state.hints,
    showingHint: state.showingHint,
    startTime: state.startTime,
    loading: state.loading,
    error: state.error,
    
    // Actions
    selectDifficulty: gameLogic.selectDifficulty,
    startNewGame,
    selectTile: gameLogic.selectTile,
    showHint,
    hideHint: gameLogic.hideHint,
    resetGame: gameLogic.resetGame,
    
    // Computed
    gameTime,
    calculateEfficiency,
    isInteractionDisabled: state.loading || state.gamePhase !== 'playing',
    hasValidMoves: state.board ? MahjongGenerator.hasValidMoves(state.board) : false,
    responsiveTileSize: MahjongGenerator.getResponsiveTileSize(screenWidth, state.difficulty)
  };
}