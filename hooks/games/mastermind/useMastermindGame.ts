'use client';

import { useReducer, useCallback } from 'react';
import { ICharacter } from '@/types/shared';
import {
  DifficultyLevel
} from '@/types/mastermind';
import { 
  initialGameState, 
  mastermindGameReducer,
  initializeGame 
} from '@/lib/games/mastermind/gameLogic';
import {
  calculateFeedback,
  calculatePositionalFeedback,
  isGuessComplete
} from '@/lib/games/mastermind/feedbackCalculator';
import { loadRandomProfile } from '@/lib/profileLoader';

export default function useMastermindGame() {
  const [state, dispatch] = useReducer(mastermindGameReducer, initialGameState);

  // Load characters when difficulty is selected
  const startGame = useCallback(async () => {
    if (!state.difficulty) return;

    dispatch({ type: 'SET_LOADING', loading: true });

    try {
      // Load random character profile
      const profile = await loadRandomProfile();
      if (!profile || !profile.characters || profile.characters.length === 0) {
        throw new Error('Failed to load character profile');
      }

      // Initialize game with selected difficulty
      const { secretCode, availableCharacters } = initializeGame(
        state.difficulty,
        profile.characters
      );

      dispatch({ 
        type: 'START_GAME', 
        secretCode,
        availableCharacters
      });
    } catch (error) {
      console.error('Error starting game:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        error: 'Impossible de charger les personnages. Veuillez réessayer.' 
      });
    }
  }, [state.difficulty]);

  // Select difficulty
  const selectDifficulty = useCallback((difficulty: DifficultyLevel) => {
    dispatch({ type: 'SELECT_DIFFICULTY', difficulty });
  }, []);

  // Select a slot for character placement
  const selectSlot = useCallback((index: number) => {
    if (state.gamePhase !== 'playing') return;
    dispatch({ type: 'SELECT_SLOT', index });
  }, [state.gamePhase]);

  // Place a character in the current guess
  const placeCharacter = useCallback((character: ICharacter, slotIndex?: number) => {
    if (state.gamePhase !== 'playing') return;
    dispatch({ type: 'PLACE_CHARACTER', character, slotIndex });
  }, [state.gamePhase]);

  // Remove a character from a slot
  const removeCharacter = useCallback((slotIndex: number) => {
    if (state.gamePhase !== 'playing') return;
    dispatch({ type: 'REMOVE_CHARACTER', slotIndex });
  }, [state.gamePhase]);

  // Clear the current guess
  const clearCurrentGuess = useCallback(() => {
    if (state.gamePhase !== 'playing') return;
    dispatch({ type: 'CLEAR_CURRENT_GUESS' });
  }, [state.gamePhase]);

  // Submit a guess
  const submitGuess = useCallback(() => {
    if (state.gamePhase !== 'playing') return;
    if (!state.difficulty) return;
    if (!isGuessComplete(state.currentGuess, state.difficulty.codeLength)) return;

    const feedback = calculateFeedback(state.currentGuess, state.secretCode);
    const positionalFeedback = calculatePositionalFeedback(state.currentGuess, state.secretCode);
    dispatch({ type: 'SUBMIT_GUESS', feedback, positionalFeedback });
  }, [state.gamePhase, state.currentGuess, state.secretCode, state.difficulty]);


  // Reset game with same difficulty
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Go back to setup
  const backToSetup = useCallback(() => {
    dispatch({ type: 'BACK_TO_SETUP' });
  }, []);

  // Calculate game time
  const getGameTime = useCallback(() => {
    if (!state.startTime) return 0;
    const endTime = state.endTime || new Date();
    return Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);
  }, [state.startTime, state.endTime]);

  // Check if current guess can be submitted
  const canSubmitGuess = useCallback(() => {
    if (!state.difficulty) return false;
    return isGuessComplete(state.currentGuess, state.difficulty.codeLength);
  }, [state.currentGuess, state.difficulty]);

  return {
    // State
    ...state,
    
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
  };
}