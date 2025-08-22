import { ICharacter } from '@/types/game';
import { MemoCard, MemoGameState, MemoGameAction } from '@/types/memo';

/**
 * Memory Game Logic Utilities
 */

/**
 * Fisher-Yates shuffle algorithm for array randomization
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

/**
 * Select random characters for the game
 * If we need more characters than available, reuse characters
 */
export function selectRandomCharacters(characters: ICharacter[], count: number): ICharacter[] {
  if (count <= characters.length) {
    // Normal case: we have enough unique characters
    const shuffled = shuffleArray(characters);
    return shuffled.slice(0, count);
  } else {
    // Need to reuse characters
    const result: ICharacter[] = [];
    const shuffled = shuffleArray(characters);
    
    // Fill with unique characters first
    result.push(...shuffled);
    
    // Then add duplicates as needed
    let remaining = count - characters.length;
    let index = 0;
    while (remaining > 0) {
      result.push(shuffled[index % shuffled.length]!);
      index++;
      remaining--;
    }
    
    return shuffleArray(result); // Shuffle the final list
  }
}

/**
 * Create card pairs from selected characters
 */
export function createCardPairs(characters: ICharacter[]): MemoCard[] {
  const cards: MemoCard[] = [];
  
  characters.forEach((character) => {
    // Create two cards for each character
    cards.push({
      id: `${character.id}_0`,
      characterId: character.id,
      character,
      pairIndex: 0
    });
    
    cards.push({
      id: `${character.id}_1`, 
      characterId: character.id,
      character,
      pairIndex: 1
    });
  });
  
  return shuffleArray(cards);
}

/**
 * Generate a complete set of shuffled cards for the game
 */
export function generateGameCards(characters: ICharacter[], pairCount: number): MemoCard[] {
  const selectedCharacters = selectRandomCharacters(characters, pairCount);
  return createCardPairs(selectedCharacters);
}

/**
 * Check if two cards form a matching pair
 */
export function isMatchingPair(cards: MemoCard[], index1: number, index2: number): boolean {
  const card1 = cards[index1];
  const card2 = cards[index2];
  
  if (!card1 || !card2) return false;
  
  return card1.characterId === card2.characterId;
}

/**
 * Check if the game is won (all cards are matched)
 */
export function isGameWon(matchedCards: number[], totalCards: number): boolean {
  return matchedCards.length === totalCards;
}

/**
 * Calculate game duration in seconds
 */
export function calculateGameDuration(startTime?: Date): number {
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime.getTime()) / 1000);
}

/**
 * Get grid layout CSS classes based on card count
 */
export function getGridLayoutClasses(cardCount: number): string {
  switch (cardCount) {
    case 4: return 'grid-cols-2 grid-rows-2 max-w-md';
    case 6: return 'grid-cols-3 grid-rows-2 max-w-2xl';
    case 8: return 'grid-cols-4 grid-rows-2 max-w-3xl';
    case 10: return 'grid-cols-5 grid-rows-2 max-w-4xl';
    case 12: return 'grid-cols-4 grid-rows-3 max-w-3xl';
    case 14: return 'grid-cols-7 grid-rows-2 max-w-5xl';
    case 16: return 'grid-cols-4 grid-rows-4 max-w-3xl';
    case 18: return 'grid-cols-6 grid-rows-3 max-w-4xl';
    case 20: return 'grid-cols-5 grid-rows-4 max-w-4xl';
    case 22: return 'grid-cols-6 grid-rows-4 max-w-5xl';
    case 24: return 'grid-cols-6 grid-rows-4 max-w-5xl';
    default: return 'grid-cols-2 grid-rows-2 max-w-md';
  }
}

/**
 * Get responsive grid layout CSS classes
 */
export function getResponsiveGridClasses(cardCount: number): string {
  const baseClasses = 'grid gap-2 sm:gap-3 md:gap-4 justify-center items-center mx-auto';
  
  switch (cardCount) {
    case 4: 
      return `${baseClasses} grid-cols-2 max-w-xs sm:max-w-sm`;
    case 6: 
      return `${baseClasses} grid-cols-2 sm:grid-cols-3 max-w-sm sm:max-w-md`;
    case 8: 
      return `${baseClasses} grid-cols-2 sm:grid-cols-4 max-w-sm sm:max-w-lg`;
    case 10: 
      return `${baseClasses} grid-cols-2 sm:grid-cols-5 max-w-sm sm:max-w-2xl`;
    case 12: 
      return `${baseClasses} grid-cols-3 sm:grid-cols-4 max-w-md sm:max-w-xl`;
    case 14: 
      return `${baseClasses} grid-cols-2 sm:grid-cols-7 max-w-sm sm:max-w-3xl`;
    case 16: 
      return `${baseClasses} grid-cols-4 sm:grid-cols-4 max-w-md sm:max-w-lg`;
    case 18: 
      return `${baseClasses} grid-cols-3 sm:grid-cols-6 max-w-md sm:max-w-2xl`;
    case 20: 
      return `${baseClasses} grid-cols-4 sm:grid-cols-5 max-w-lg sm:max-w-2xl`;
    case 22: 
      return `${baseClasses} grid-cols-3 sm:grid-cols-6 max-w-md sm:max-w-3xl`;
    case 24: 
      return `${baseClasses} grid-cols-4 sm:grid-cols-6 max-w-lg sm:max-w-3xl`;
    default: 
      return `${baseClasses} grid-cols-2 max-w-xs`;
  }
}

/**
 * Reducer for memo game state management
 */
export function memoGameReducer(state: MemoGameState, action: MemoGameAction): MemoGameState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
      
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
      
    case 'SELECT_PAIR_COUNT':
      return { 
        ...state, 
        selectedPairCount: action.count,
        error: null 
      };
      
    case 'START_GAME':
      return {
        ...state,
        gamePhase: 'playing',
        cards: action.cards,
        flippedCards: [],
        matchedCards: [],
        moves: 0,
        startTime: new Date(),
        loading: false,
        error: null
      };
      
    case 'FLIP_CARD':
      // Don't flip if card is already flipped, matched, or we have 2 cards flipped
      if (
        state.flippedCards.includes(action.index) ||
        state.matchedCards.includes(action.index) ||
        state.flippedCards.length >= 2
      ) {
        return state;
      }
      
      const newFlippedCards = [...state.flippedCards, action.index];
      
      return {
        ...state,
        flippedCards: newFlippedCards
      };
      
    case 'MATCH_FOUND':
      return {
        ...state,
        matchedCards: [...state.matchedCards, ...action.indices],
        flippedCards: []
      };
      
    case 'NO_MATCH':
      return {
        ...state,
        flippedCards: []
      };
      
    case 'INCREMENT_MOVES':
      return {
        ...state,
        moves: state.moves + 1
      };
      
    case 'GAME_WON':
      return {
        ...state,
        gamePhase: 'won'
      };
      
    case 'RESET_GAME':
      return {
        ...state,
        gamePhase: 'setup',
        cards: [],
        flippedCards: [],
        matchedCards: [],
        moves: 0,
        startTime: undefined,
        error: null
      };
      
    default:
      return state;
  }
}

/**
 * Initial state for the memo game
 */
export const initialMemoGameState: MemoGameState = {
  gamePhase: 'setup',
  selectedPairCount: 3, // Default to 3 pairs (6 cards)
  cards: [],
  flippedCards: [],
  matchedCards: [],
  moves: 0,
  loading: false,
  error: null
};