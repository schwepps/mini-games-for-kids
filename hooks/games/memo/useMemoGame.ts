'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { IProfile } from '@/types/guess-who';
import { MemoGameState, MemoGameAction } from '@/types/memo';
import { ProfileLoader } from '@/lib/profileLoader';
import { createErrorHandler } from '@/lib/utils/errorHandling';
import { GAME_TIMING } from '@/lib/constants/gameConstants';
import { 
  memoGameReducer, 
  initialMemoGameState, 
  generateGameCards, 
  isMatchingPair, 
  isGameWon,
  calculateGameDuration
} from '@/lib/games/memo/gameLogic';

export function useMemoGame() {
  const [state, dispatch] = useReducer(memoGameReducer, initialMemoGameState);
  
  // Create error handler for this component
  const handleError = createErrorHandler(
    (error) => dispatch({ type: 'SET_ERROR', error }),
    { component: 'game', operation: 'memo-game' }
  );
  
  // Load character profile
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      // Using the same character profile as the guess who game
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

  const selectPairCount = useCallback((count: number) => {
    if (count < 2 || count > 12) {
      dispatch({ type: 'SET_ERROR', error: 'Le nombre de paires doit être entre 2 et 12' });
      return;
    }
    dispatch({ type: 'SELECT_PAIR_COUNT', count });
  }, []);

  const startNewGame = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      const profile = await loadProfile();
      if (!profile) return;
      
      const gameCards = generateGameCards(profile.characters, state.selectedPairCount);
      dispatch({ type: 'START_GAME', cards: gameCards });
      
    } catch (err) {
      handleError(err, 'Impossible de démarrer le jeu');
    }
  }, [state.selectedPairCount]);

  const flipCard = useCallback((cardIndex: number) => {
    if (state.gamePhase !== 'playing') return;
    
    // Don't allow flipping if card is already flipped, matched, or we have 2 cards showing
    if (
      state.flippedCards.includes(cardIndex) ||
      state.matchedCards.includes(cardIndex) ||
      state.flippedCards.length >= 2
    ) {
      return;
    }

    dispatch({ type: 'FLIP_CARD', index: cardIndex });
    
    // Check for match when second card is flipped
    const newFlippedCards = [...state.flippedCards, cardIndex];
    
    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const isMatch = isMatchingPair(state.cards, firstIndex!, secondIndex!);
      
      // Increment moves counter
      dispatch({ type: 'INCREMENT_MOVES' });
      
      if (isMatch) {
        // Match found - keep cards visible
        setTimeout(() => {
          dispatch({ type: 'MATCH_FOUND', indices: [firstIndex!, secondIndex!] });
          
          // Check if game is won
          const newMatchedCards = [...state.matchedCards, firstIndex!, secondIndex!];
          if (isGameWon(newMatchedCards, state.cards.length)) {
            dispatch({ type: 'GAME_WON' });
          }
        }, GAME_TIMING.CARD_MATCH_DELAY);
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          dispatch({ type: 'NO_MATCH' });
        }, GAME_TIMING.CARD_MISMATCH_DELAY);
      }
    }
  }, [state.gamePhase, state.flippedCards, state.matchedCards, state.cards]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Calculate derived values
  const matchedPairs = Math.floor(state.matchedCards.length / 2);
  const totalPairs = Math.floor(state.cards.length / 2);
  const gameTime = calculateGameDuration(state.startTime);
  
  // Progress percentage for UI
  const progress = totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;

  // Check if a card should be visible (flipped or matched)
  const isCardVisible = useCallback((cardIndex: number) => {
    return state.flippedCards.includes(cardIndex) || state.matchedCards.includes(cardIndex);
  }, [state.flippedCards, state.matchedCards]);

  // Check if a card is matched
  const isCardMatched = useCallback((cardIndex: number) => {
    return state.matchedCards.includes(cardIndex);
  }, [state.matchedCards]);

  // Check if card interactions are disabled
  const isInteractionDisabled = useCallback(() => {
    return state.flippedCards.length >= 2 || state.loading || state.gamePhase !== 'playing';
  }, [state.flippedCards.length, state.loading, state.gamePhase]);

  return {
    // Game state
    gamePhase: state.gamePhase,
    selectedPairCount: state.selectedPairCount,
    cards: state.cards,
    flippedCards: state.flippedCards,
    matchedCards: state.matchedCards,
    moves: state.moves,
    loading: state.loading,
    error: state.error,
    
    // Derived state
    matchedPairs,
    totalPairs,
    progress,
    gameTime,
    
    // Actions
    selectPairCount,
    startNewGame,
    flipCard,
    resetGame,
    
    // Helper functions
    isCardVisible,
    isCardMatched,
    isInteractionDisabled
  };
}