import { ICharacter } from '@/types/shared';
import { FeedbackPeg, FEEDBACK_SYMBOLS } from '@/types/mastermind';

/**
 * Calculate feedback for a guess compared to the secret code
 * Returns array of feedback pegs (correct position, correct character, or none)
 */
export function calculateFeedback(
  guess: (ICharacter | null)[],
  secretCode: ICharacter[]
): FeedbackPeg[] {
  const feedback: FeedbackPeg[] = [];
  const codeLength = secretCode.length;
  
  // Track which positions have been matched
  const secretUsed = new Array(codeLength).fill(false);
  const guessUsed = new Array(codeLength).fill(false);
  
  // First pass: Check for correct position (exact matches)
  for (let i = 0; i < codeLength; i++) {
    if (guess[i] && guess[i]!.id === secretCode[i]?.id) {
      feedback.push({
        type: 'correct-position',
        emoji: FEEDBACK_SYMBOLS.CORRECT_POSITION
      });
      secretUsed[i] = true;
      guessUsed[i] = true;
    }
  }
  
  // Second pass: Check for correct character in wrong position
  for (let i = 0; i < codeLength; i++) {
    if (guessUsed[i] || !guess[i]) continue;
    
    for (let j = 0; j < codeLength; j++) {
      if (!secretUsed[j] && guess[i]!.id === secretCode[j]?.id) {
        feedback.push({
          type: 'correct-character',
          emoji: FEEDBACK_SYMBOLS.CORRECT_CHARACTER
        });
        secretUsed[j] = true;
        guessUsed[i] = true;
        break;
      }
    }
  }
  
  // Sort feedback to avoid giving away position information
  // Stars (correct position) first, then hearts (correct character)
  feedback.sort((a, b) => {
    if (a.type === 'correct-position' && b.type !== 'correct-position') return -1;
    if (a.type !== 'correct-position' && b.type === 'correct-position') return 1;
    return 0;
  });
  
  return feedback;
}

/**
 * Calculate position-aware feedback for border-based display
 * Returns array where each index corresponds to a character slot
 */
export function calculatePositionalFeedback(
  guess: (ICharacter | null)[],
  secretCode: ICharacter[]
): ('correct-position' | 'correct-character' | 'wrong' | null)[] {
  const codeLength = secretCode.length;
  const result: ('correct-position' | 'correct-character' | 'wrong' | null)[] = new Array(codeLength).fill(null);

  // Track which positions in secret code have been matched
  const secretUsed = new Array(codeLength).fill(false);

  // First pass: Check for correct position (exact matches)
  for (let i = 0; i < codeLength; i++) {
    if (guess[i] && guess[i]!.id === secretCode[i]?.id) {
      result[i] = 'correct-position';
      secretUsed[i] = true;
    }
  }

  // Second pass: Check for correct character in wrong position
  for (let i = 0; i < codeLength; i++) {
    if (result[i] === 'correct-position' || !guess[i]) continue;

    for (let j = 0; j < codeLength; j++) {
      if (!secretUsed[j] && guess[i]!.id === secretCode[j]?.id) {
        result[i] = 'correct-character';
        secretUsed[j] = true;
        break;
      }
    }

    // If no match found, mark as wrong
    if (result[i] === null && guess[i]) {
      result[i] = 'wrong';
    }
  }

  return result;
}

/**
 * Check if the guess is a winning combination
 */
export function checkVictory(
  guess: (ICharacter | null)[],
  secretCode: ICharacter[]
): boolean {
  if (guess.length !== secretCode.length) return false;
  
  for (let i = 0; i < secretCode.length; i++) {
    if (!guess[i] || guess[i]!.id !== secretCode[i]?.id) {
      return false;
    }
  }
  
  return true;
}

/**
 * Validate if a guess is complete (all slots filled)
 */
export function isGuessComplete(
  guess: (ICharacter | null)[],
  codeLength: number
): boolean {
  if (guess.length !== codeLength) return false;
  return guess.every(char => char !== null);
}

/**
 * Generate a random secret code
 */
export function generateSecretCode(
  availableCharacters: ICharacter[],
  codeLength: number,
  allowDuplicates: boolean
): ICharacter[] {
  const secretCode: ICharacter[] = [];
  const charactersPool = [...availableCharacters];
  
  for (let i = 0; i < codeLength; i++) {
    if (charactersPool.length === 0) {
      // This shouldn't happen if we have enough characters
      throw new Error('Not enough characters for the code length');
    }
    
    const randomIndex = Math.floor(Math.random() * charactersPool.length);
    const selectedCharacter = charactersPool[randomIndex];
    if (!selectedCharacter) {
      throw new Error('Failed to select character from pool');
    }
    secretCode.push(selectedCharacter);
    
    // Remove the character from pool if duplicates are not allowed
    if (!allowDuplicates) {
      charactersPool.splice(randomIndex, 1);
    }
  }
  
  return secretCode;
}

/**
 * Calculate game efficiency for performance rating
 */
export function calculateEfficiency(
  attempts: number,
  maxAttempts: number,
  codeLength: number
): number {
  // Base score from attempts used (lower is better)
  const attemptScore = ((maxAttempts - attempts + 1) / maxAttempts) * 70;
  
  // Bonus for code complexity
  const complexityBonus = (codeLength - 2) * 5; // 5% bonus per slot above 2
  
  // Total efficiency
  const efficiency = Math.min(100, Math.round(attemptScore + complexityBonus));
  
  return Math.max(0, efficiency);
}