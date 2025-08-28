import { ICharacter } from '@/types/shared';
import { JacquesGameState, JacquesGameAction, JACQUES_DIFFICULTIES } from '@/types/jacques-a-dit';

/**
 * Jacques a dit Game Logic
 */

export const initialJacquesGameState: JacquesGameState = {
  gamePhase: 'setup',
  selectedDifficulty: JACQUES_DIFFICULTIES[1]!, // Default to "Facile" difficulty
  characters: [],
  fullSequence: [],
  currentSequence: [],
  playerInput: [],
  currentRound: 1,
  mistakes: 0,
  showingIndex: -1,
  loading: false,
  error: null,
};

export function jacquesGameReducer(
  state: JacquesGameState, 
  action: JacquesGameAction
): JacquesGameState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading, error: null };

    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };

    case 'SELECT_DIFFICULTY':
      return { 
        ...state, 
        selectedDifficulty: action.difficulty,
        error: null 
      };

    case 'START_GAME':
      if (!state.selectedDifficulty) return state;
      
      const gameCharacters = selectRandomCharacters(
        action.characters, 
        state.selectedDifficulty.characterCount
      );
      
      // Generate full sequence for the entire game
      const fullGameSequence = generateSequence(gameCharacters, state.selectedDifficulty.targetLength);
      const firstRoundSequence = fullGameSequence.slice(0, 1);
      
      return {
        ...state,
        gamePhase: 'ready', // Start with ready phase, not showing
        characters: gameCharacters,
        fullSequence: fullGameSequence,
        currentSequence: firstRoundSequence,
        playerInput: [],
        currentRound: 1,
        mistakes: 0,
        showingIndex: -1,
        loading: false,
        error: null
      };

    case 'START_READY_PHASE':
      return {
        ...state,
        gamePhase: 'ready'
      };

    case 'START_SHOWING_PHASE':
      return {
        ...state,
        gamePhase: 'showing',
        showingIndex: 0
      };

    case 'SHOW_SEQUENCE':
      return {
        ...state,
        showingIndex: action.showingIndex,
        playerInput: [] // Reset player input when showing sequence
      };

    case 'SEQUENCE_SHOWN':
      return {
        ...state,
        gamePhase: 'waiting',
        showingIndex: -1
      };

    case 'START_WAITING_PHASE':
      return {
        ...state,
        gamePhase: 'waiting'
      };

    case 'START_PLAYING_PHASE':
      return {
        ...state,
        gamePhase: 'playing'
      };

    case 'PLAYER_INPUT':
      const newPlayerInput = [...state.playerInput, action.characterId];
      const expectedCharacterId = state.currentSequence[state.playerInput.length];
      
      // Check if input is correct
      if (action.characterId !== expectedCharacterId) {
        // Wrong input - increment mistakes and show wrong phase
        return {
          ...state,
          gamePhase: 'wrong',
          playerInput: newPlayerInput,
          mistakes: state.mistakes + 1
        };
      }

      // Correct input - just update player input, don't change phase yet
      const updatedState = {
        ...state,
        playerInput: newPlayerInput
      };

      // Check if round is complete
      if (newPlayerInput.length === state.currentRound) {
        // Check if game is won
        if (state.currentRound >= (state.selectedDifficulty?.targetLength || 5)) {
          return {
            ...updatedState,
            gamePhase: 'won'
          };
        }
        // Round complete but game continues - stay in playing phase
        // The hook will handle the transition to next round
      }

      return updatedState;

    case 'ROUND_COMPLETE':
      if (!state.selectedDifficulty) return state;
      
      const nextRound = state.currentRound + 1;
      const nextSequence = state.fullSequence.slice(0, nextRound);
      
      return {
        ...state,
        gamePhase: 'showing',
        currentRound: nextRound,
        currentSequence: nextSequence,
        playerInput: [],
        showingIndex: 0
      };

    case 'MISTAKE_MADE':
      // Reset to showing the same sequence again
      return {
        ...state,
        gamePhase: 'showing',
        playerInput: [],
        showingIndex: 0
      };

    case 'GAME_WON':
      return {
        ...state,
        gamePhase: 'won'
      };

    case 'RESET_GAME':
      return {
        ...initialJacquesGameState,
        selectedDifficulty: state.selectedDifficulty // Keep difficulty selected
      };

    default:
      return state;
  }
}

/**
 * Select random characters for the game
 */
export function selectRandomCharacters(
  allCharacters: ICharacter[], 
  count: number
): ICharacter[] {
  if (allCharacters.length < count) {
    throw new Error(`Not enough characters available. Need ${count}, have ${allCharacters.length}`);
  }

  const shuffled = [...allCharacters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Generate a random sequence of character IDs without consecutive repetitions
 */
export function generateSequence(characters: ICharacter[], length: number): string[] {
  if (characters.length === 0) {
    throw new Error('Cannot generate sequence with empty characters array');
  }
  
  const sequence: string[] = [];
  
  for (let i = 0; i < length; i++) {
    let attempts = 0;
    let characterId: string;
    
    // Prevent consecutive repetitions for better UX
    do {
      const randomIndex = Math.floor(Math.random() * characters.length);
      characterId = characters[randomIndex]?.id || '';
      attempts++;
      
      // Safety valve: if we can't find different character after many attempts,
      // allow repetition (edge case with very few characters)
      if (attempts > 50) break;
      
    } while (sequence.length > 0 && characterId === sequence[sequence.length - 1]);
    
    if (characterId) {
      sequence.push(characterId);
    }
  }
  
  return sequence;
}

/**
 * Check if player input matches the expected sequence up to the current position
 */
export function isPlayerInputCorrect(
  playerInput: string[], 
  sequence: string[]
): boolean {
  if (playerInput.length > sequence.length) return false;
  
  for (let i = 0; i < playerInput.length; i++) {
    if (playerInput[i] !== sequence[i]) return false;
  }
  
  return true;
}

/**
 * Check if the game is won
 */
export function isGameWon(
  currentRound: number, 
  targetLength: number,
  playerInput: string[],
  sequence: string[]
): boolean {
  return currentRound >= targetLength && 
         playerInput.length === currentRound && 
         isPlayerInputCorrect(playerInput, sequence);
}

/**
 * Get character by ID
 */
export function getCharacterById(characters: ICharacter[], id: string): ICharacter | undefined {
  return characters.find(char => char.id === id);
}

/**
 * Calculate performance rating based on mistakes
 */
export function calculatePerformanceRating(mistakes: number): number {
  // Perfect = 3 stars, 1-2 mistakes = 2 stars, 3+ mistakes = 1 star
  if (mistakes === 0) return 3;
  if (mistakes <= 2) return 2;
  return 1;
}