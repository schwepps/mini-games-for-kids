'use client';

import { useCallback } from 'react';
import { IProfile } from '@/types/guess-who';
import { MahjongDifficulty, DIFFICULTY_OPTIONS } from '@/types/mahjong';
import { ProfileLoader } from '@/lib/profileLoader';
import { createErrorHandler } from '@/lib/utils/errorHandling';
import { calculateGameTime } from '@/lib/shared/time-utils';
import { MahjongGenerator } from '@/lib/games/mahjong/generator';
import { ContainerSize } from '@/hooks/shared/useContainerSize';

/**
 * Game logic hook for Mahjong
 * Handles business logic: profile loading, board generation, game mechanics
 */
export function useMahjongGameLogic(dispatch: (action: any) => void) {
  // Error handler
  const handleError = createErrorHandler(
    (error) => dispatch({ type: 'SET_ERROR', error }),
    { component: 'game', operation: 'mahjong-game' }
  );

  // Load character profile
  const loadProfile = useCallback(async (): Promise<IProfile | null> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const profile = await ProfileLoader.loadProfile('cartoon-characters');
      
      if (!profile || profile.characters.length === 0) {
        throw new Error('No characters available for the game');
      }
      
      dispatch({ type: 'SET_LOADING', loading: false });
      return profile;
    } catch (err) {
      handleError(err, 'Impossible de charger les personnages du jeu');
      return null;
    }
  }, [dispatch, handleError]);

  // Generate game board
  const generateBoard = useCallback(async (
    difficulty: MahjongDifficulty,
    containerSize?: ContainerSize,
    screenWidth?: number
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      const profile = await loadProfile();
      if (!profile) return;
      
      const difficultyConfig = DIFFICULTY_OPTIONS.find(opt => opt.difficulty === difficulty);
      if (!difficultyConfig) return;
      
      // Select characters for this difficulty
      const shuffledCharacters = [...profile.characters].sort(() => Math.random() - 0.5);
      const gameCharacters = shuffledCharacters.slice(0, difficultyConfig.characterCount);
      
      // Generate board - ALWAYS use authentic predefined layouts
      const tileSize = MahjongGenerator.getResponsiveTileSize(
        containerSize?.width || screenWidth || 768, 
        difficulty
      );
      const board = MahjongGenerator.generateBoard(gameCharacters, difficulty, tileSize);
      
      dispatch({ type: 'START_GAME', board });
      
    } catch (err) {
      handleError(err, 'Impossible de démarrer le jeu');
    }
  }, [dispatch, loadProfile, handleError]);

  // Game actions
  const selectDifficulty = useCallback((difficulty: MahjongDifficulty) => {
    dispatch({ type: 'SELECT_DIFFICULTY', difficulty });
  }, [dispatch]);

  const selectTile = useCallback((tileId: string) => {
    dispatch({ type: 'SELECT_TILE', tileId });
  }, [dispatch]);

  const showHint = useCallback(() => {
    dispatch({ type: 'SHOW_HINT', tileIds: [] });
    dispatch({ type: 'USE_HINT' });
  }, [dispatch]);

  const hideHint = useCallback(() => {
    dispatch({ type: 'HIDE_HINT' });
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, [dispatch]);

  // Computed values
  const calculateEfficiency = useCallback((totalPairs: number, moves: number): number => {
    if (totalPairs === 0) return 0;
    
    // Perfect efficiency would be exactly totalPairs moves
    const perfectMoves = totalPairs;
    const actualMoves = Math.max(1, moves);
    
    return Math.min(100, Math.round((perfectMoves / actualMoves) * 100));
  }, []);

  const getCalculatedGameTime = useCallback((startTime: Date | null): number => {
    return calculateGameTime(startTime);
  }, []);

  return {
    // Actions
    selectDifficulty,
    selectTile,
    showHint,
    hideHint,
    resetGame,
    generateBoard,
    
    // Utilities
    calculateEfficiency,
    calculateGameTime: getCalculatedGameTime
  };
}