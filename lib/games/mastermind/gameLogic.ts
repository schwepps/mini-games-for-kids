import { ICharacter } from '@/types/shared';
import {
  MastermindGameState,
  MastermindGameAction,
  DifficultyLevel,
  Guess
} from '@/types/mastermind';
import { generateSecretCode, checkVictory } from './feedbackCalculator';

/**
 * Initial game state
 */
export const initialGameState: MastermindGameState = {
  gamePhase: 'setup',
  difficulty: null,
  secretCode: [],
  availableCharacters: [],
  guesses: [],
  currentGuess: [],
  selectedSlotIndex: null,
  attemptsRemaining: 0,
  startTime: undefined,
  endTime: undefined,
  showHelp: false,
  loading: false,
  error: null,
};

/**
 * Game reducer to handle state transitions
 */
export function mastermindGameReducer(
  state: MastermindGameState,
  action: MastermindGameAction
): MastermindGameState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
      
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
      
    case 'SELECT_DIFFICULTY':
      return {
        ...state,
        difficulty: action.difficulty,
        attemptsRemaining: action.difficulty.maxAttempts,
      };
      
    case 'START_GAME':
      return {
        ...state,
        gamePhase: 'playing',
        secretCode: action.secretCode,
        availableCharacters: action.availableCharacters,
        currentGuess: new Array(state.difficulty!.codeLength).fill(null),
        guesses: [],
        attemptsRemaining: state.difficulty!.maxAttempts,
        selectedSlotIndex: 0,
        startTime: new Date(),
        endTime: undefined,
        loading: false,
      };
      
    case 'SELECT_SLOT':
      return {
        ...state,
        selectedSlotIndex: state.selectedSlotIndex === action.index ? null : action.index,
      };
      
    case 'PLACE_CHARACTER': {
      const newGuess = [...state.currentGuess];
      const targetIndex = action.slotIndex !== undefined 
        ? action.slotIndex 
        : state.selectedSlotIndex;
        
      if (targetIndex !== null && targetIndex >= 0 && targetIndex < newGuess.length) {
        newGuess[targetIndex] = action.character;
        
        // Auto-advance to next empty slot
        let nextSlot = null;
        for (let i = targetIndex + 1; i < newGuess.length; i++) {
          if (newGuess[i] === null) {
            nextSlot = i;
            break;
          }
        }
        // If no empty slot after current, look from beginning
        if (nextSlot === null) {
          for (let i = 0; i < targetIndex; i++) {
            if (newGuess[i] === null) {
              nextSlot = i;
              break;
            }
          }
        }
        
        return {
          ...state,
          currentGuess: newGuess,
          selectedSlotIndex: nextSlot,
        };
      }
      return state;
    }
    
    case 'REMOVE_CHARACTER': {
      const newGuess = [...state.currentGuess];
      newGuess[action.slotIndex] = null;
      return {
        ...state,
        currentGuess: newGuess,
        selectedSlotIndex: action.slotIndex,
      };
    }
    
    case 'CLEAR_CURRENT_GUESS':
      return {
        ...state,
        currentGuess: new Array(state.difficulty!.codeLength).fill(null),
        selectedSlotIndex: 0,
      };
      
    case 'SUBMIT_GUESS': {
      const newGuess: Guess = {
        id: `guess-${state.guesses.length}`,
        combination: [...state.currentGuess],
        feedback: action.feedback,
        positionalFeedback: action.positionalFeedback,
        attemptNumber: state.guesses.length + 1,
        timestamp: new Date(),
      };
      
      const isVictory = checkVictory(state.currentGuess, state.secretCode);
      const newAttemptsRemaining = state.attemptsRemaining - 1;
      
      if (isVictory) {
        return {
          ...state,
          gamePhase: 'won',
          guesses: [...state.guesses, newGuess],
          endTime: new Date(),
          attemptsRemaining: newAttemptsRemaining,
        };
      }
      
      if (newAttemptsRemaining === 0) {
        return {
          ...state,
          gamePhase: 'lost',
          guesses: [...state.guesses, newGuess],
          endTime: new Date(),
          attemptsRemaining: 0,
        };
      }
      
      return {
        ...state,
        guesses: [...state.guesses, newGuess],
        currentGuess: new Array(state.difficulty!.codeLength).fill(null),
        selectedSlotIndex: 0,
        attemptsRemaining: newAttemptsRemaining,
      };
    }
    
    case 'TOGGLE_HELP':
      return { ...state, showHelp: !state.showHelp };
      
    case 'GAME_WON':
      return {
        ...state,
        gamePhase: 'won',
        endTime: new Date(),
      };
      
    case 'GAME_LOST':
      return {
        ...state,
        gamePhase: 'lost',
        endTime: new Date(),
      };
      
    case 'RESET_GAME':
      if (!state.difficulty) return initialGameState;
      return {
        ...initialGameState,
        difficulty: state.difficulty,
        gamePhase: 'setup',
      };
      
    case 'BACK_TO_SETUP':
      return {
        ...initialGameState,
        gamePhase: 'setup',
      };
      
    default:
      return state;
  }
}

/**
 * Get a random subset of characters for the game
 */
export function selectGameCharacters(
  allCharacters: ICharacter[],
  count: number
): ICharacter[] {
  const shuffled = [...allCharacters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Initialize a new game with the selected difficulty
 */
export function initializeGame(
  difficulty: DifficultyLevel,
  allCharacters: ICharacter[]
): { secretCode: ICharacter[]; availableCharacters: ICharacter[] } {
  const availableCharacters = selectGameCharacters(allCharacters, difficulty.characterCount);
  const secretCode = generateSecretCode(
    availableCharacters,
    difficulty.codeLength,
    difficulty.allowDuplicates
  );
  
  return { secretCode, availableCharacters };
}