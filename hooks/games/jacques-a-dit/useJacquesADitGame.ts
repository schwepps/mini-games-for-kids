'use client';

import { useReducer, useEffect, useCallback, useRef } from 'react';
import { IProfile } from '@/types/shared';
import { JacquesGameState, JacquesGameAction, JacquesDifficulty } from '@/types/jacques-a-dit';
import { ProfileLoader } from '@/lib/profileLoader';
import { createErrorHandler } from '@/lib/utils/errorHandling';
import { 
  jacquesGameReducer, 
  initialJacquesGameState, 
  selectRandomCharacters,
  generateSequence,
  isPlayerInputCorrect,
  isGameWon
} from '@/lib/games/jacques-a-dit/gameLogic';

export function useJacquesADitGame() {
  const [state, dispatch] = useReducer(jacquesGameReducer, initialJacquesGameState);
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // Create error handler for this component
  const handleError = createErrorHandler(
    (error) => dispatch({ type: 'SET_ERROR', error }),
    { component: 'game', operation: 'jacques-a-dit-game' }
  );

  // Load character profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  // Handle ready phase - delay before showing sequence
  useEffect(() => {
    if (state.gamePhase === 'ready') {
      const timer = setTimeout(() => {
        dispatch({ type: 'START_SHOWING_PHASE' });
      }, 2000); // 2 second delay for cards to settle
      
      return () => clearTimeout(timer);
    }
  }, [state.gamePhase]);

  // Handle sequence showing animation
  useEffect(() => {
    if (state.gamePhase === 'showing' && state.selectedDifficulty && state.currentSequence.length > 0) {
      showSequenceAnimation();
    }

    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
    };
  }, [state.gamePhase, state.currentSequence, state.selectedDifficulty]);

  // Handle waiting phase - delay before allowing player input
  useEffect(() => {
    if (state.gamePhase === 'waiting') {
      const timer = setTimeout(() => {
        dispatch({ type: 'START_PLAYING_PHASE' });
      }, 1000); // 1 second pause before allowing input
      
      return () => clearTimeout(timer);
    }
  }, [state.gamePhase]);

  // Auto-transition from wrong phase back to showing
  useEffect(() => {
    if (state.gamePhase === 'wrong') {
      const timer = setTimeout(() => {
        dispatch({ type: 'MISTAKE_MADE' });
      }, 2000); // Show wrong message for 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, [state.gamePhase]);

  // Handle round progression when player completes current round
  useEffect(() => {
    if (state.gamePhase === 'playing' && 
        state.playerInput.length === state.currentRound && 
        state.playerInput.length > 0) {
      
      const isCorrect = isPlayerInputCorrect(state.playerInput, state.currentSequence);
      
      if (isCorrect) {
        // Move to next round after a short delay
        // Win condition is handled in the reducer
        setTimeout(() => {
          dispatch({ type: 'ROUND_COMPLETE' });
        }, 1000);
      }
    }
  }, [state.gamePhase, state.playerInput, state.currentRound, state.currentSequence]);

  const loadProfile = async () => {
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
    }
  };

  const selectDifficulty = useCallback((difficulty: JacquesDifficulty) => {
    dispatch({ type: 'SELECT_DIFFICULTY', difficulty });
  }, []);

  const startNewGame = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      const profile = await loadProfile();
      if (!profile) return;
      
      dispatch({ type: 'START_GAME', characters: profile.characters });
      
    } catch (err) {
      handleError(err, 'Impossible de démarrer le jeu');
    }
  }, []);

  const showSequenceAnimation = useCallback(() => {
    if (!state.selectedDifficulty || state.currentSequence.length === 0) return;
    
    let currentIndex = 0;
    
    const showNextCharacter = () => {
      if (currentIndex < state.currentSequence.length) {
        dispatch({ type: 'SHOW_SEQUENCE', showingIndex: currentIndex });
        
        sequenceTimeoutRef.current = setTimeout(() => {
          currentIndex++;
          if (currentIndex < state.currentSequence.length) {
            // Hide current character and show next after hideDelay
            dispatch({ type: 'SHOW_SEQUENCE', showingIndex: -1 });
            sequenceTimeoutRef.current = setTimeout(showNextCharacter, state.selectedDifficulty!.hideDelay);
          } else {
            // All characters shown, switch to waiting phase
            dispatch({ type: 'SEQUENCE_SHOWN' });
          }
        }, state.selectedDifficulty!.showSpeed);
      }
    };
    
    // Start showing sequence
    showNextCharacter();
  }, [state.selectedDifficulty, state.currentSequence]);

  const handleCharacterClick = useCallback((characterId: string) => {
    if (state.gamePhase !== 'playing') return;
    
    dispatch({ type: 'PLAYER_INPUT', characterId });
  }, [state.gamePhase]);

  const resetGame = useCallback(() => {
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
    }
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const isInteractionDisabled = useCallback((): boolean => {
    return state.loading || 
           state.gamePhase === 'ready' ||
           state.gamePhase === 'showing' || 
           state.gamePhase === 'waiting' ||
           state.gamePhase === 'wrong' ||
           state.gamePhase === 'won';
  }, [state.loading, state.gamePhase]);

  // Get the character that should be showing (for visual feedback)
  const getShowingCharacter = useCallback(() => {
    if (state.showingIndex >= 0 && state.showingIndex < state.currentSequence.length) {
      const characterId = state.currentSequence[state.showingIndex];
      return state.characters.find(char => char.id === characterId);
    }
    return null;
  }, [state.showingIndex, state.currentSequence, state.characters]);

  // Check if a specific character should show visual feedback
  const getCharacterFeedback = useCallback((characterId: string) => {
    const showingCharacter = getShowingCharacter();
    const isShowing = showingCharacter?.id === characterId;
    
    // Check if this character was just played correctly or incorrectly
    const lastPlayerInput = state.playerInput[state.playerInput.length - 1];
    const expectedInput = state.currentSequence[state.playerInput.length - 1];
    
    const isCorrect = state.gamePhase === 'playing' && 
                     lastPlayerInput === characterId && 
                     lastPlayerInput === expectedInput;
                     
    const isWrong = state.gamePhase === 'wrong' && 
                    lastPlayerInput === characterId;
    
    return {
      isShowing,
      isCorrect,
      isWrong
    };
  }, [state.gamePhase, state.playerInput, state.currentSequence, getShowingCharacter]);

  return {
    // State
    gamePhase: state.gamePhase,
    selectedDifficulty: state.selectedDifficulty,
    characters: state.characters,
    sequence: state.currentSequence, // Use currentSequence for backward compatibility
    fullSequence: state.fullSequence,
    currentSequence: state.currentSequence,
    playerInput: state.playerInput,
    currentRound: state.currentRound,
    mistakes: state.mistakes,
    showingIndex: state.showingIndex,
    loading: state.loading,
    error: state.error,
    
    // Actions
    selectDifficulty,
    startNewGame,
    handleCharacterClick,
    resetGame,
    
    // Computed values
    isInteractionDisabled,
    getCharacterFeedback,
    getShowingCharacter,
    
    // Progress info
    progress: state.selectedDifficulty ? (state.currentRound / state.selectedDifficulty.targetLength) * 100 : 0,
    targetLength: state.selectedDifficulty?.targetLength || 0
  };
}