'use client';

import { useState, useEffect, useCallback } from 'react';
import { IProfile, ICharacter, IQuestion, IGameState } from '@/types/game';
import { ProfileLoader } from '@/lib/profileLoader';
import { CharacterFilter } from '@/lib/characterFilter';

type GameStatus = 'playing' | 'won' | 'lost';

export function useCartoonGame() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [hiddenCharacter, setHiddenCharacter] = useState<ICharacter | null>(null);
  const [remainingCharacters, setRemainingCharacters] = useState<ICharacter[]>([]);
  const [questionsAsked, setQuestionsAsked] = useState<IQuestion[]>([]);
  const [gameState, setGameState] = useState<GameStatus>('playing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the cartoon profile on mount
  useEffect(() => {
    loadCartoonProfile();
  }, []);

  const loadCartoonProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartoonProfile = await ProfileLoader.loadProfile('cartoon-characters');
      setProfile(cartoonProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cartoon characters');
    } finally {
      setLoading(false);
    }
  };

  const selectRandomCharacter = useCallback((characters: ICharacter[]): ICharacter => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }, []);

  const startNewGame = useCallback(() => {
    if (!profile) return;

    const randomCharacter = selectRandomCharacter(profile.characters);
    setHiddenCharacter(randomCharacter);
    setRemainingCharacters([...profile.characters]);
    setQuestionsAsked([]);
    setGameState('playing');
  }, [profile, selectRandomCharacter]);

  const askQuestion = useCallback((characteristicKey: string, value: unknown) => {
    if (!profile || gameState !== 'playing' || !hiddenCharacter) return;

    // Auto-determine the answer based on the hidden character's traits
    const hiddenCharacterValue = hiddenCharacter.characteristics[characteristicKey];
    const answer = hiddenCharacterValue === value;

    // Create the question
    const question: IQuestion = {
      id: `q_${Date.now()}`,
      text: `Is the ${profile.characteristicSchema[characteristicKey].displayName} ${value}?`,
      characteristicKey,
      value,
      answer,
      timestamp: new Date()
    };

    // Apply the question to filter characters
    const filteredCharacters = CharacterFilter.applyQuestionResult(remainingCharacters, question);
    
    // Safety check: Ensure hidden character is never eliminated
    if (!filteredCharacters.find(char => char.id === hiddenCharacter.id)) {
      console.error('Hidden character would be eliminated! This should never happen.');
      // This should never occur with correct logic, but as a safety net:
      // Don't apply the filter if it would eliminate the hidden character
      return;
    }
    
    // Update state
    const newQuestions = [...questionsAsked, question];
    setQuestionsAsked(newQuestions);
    setRemainingCharacters(filteredCharacters);

    // Check win condition (player wins when only hidden character remains)
    if (filteredCharacters.length === 1) {
      setGameState('won');
    }
    // Note: Player can no longer "lose" by elimination since logic is now correct
  }, [profile, gameState, remainingCharacters, questionsAsked, hiddenCharacter]);

  const makeGuess = useCallback((guessedCharacter: ICharacter) => {
    if (gameState !== 'playing') return;

    if (guessedCharacter.id === hiddenCharacter?.id) {
      setGameState('won');
    } else {
      setGameState('lost');
    }
  }, [gameState, hiddenCharacter]);

  const resetGame = useCallback(() => {
    setGameState('playing');
    setHiddenCharacter(null);
    setRemainingCharacters([]);
    setQuestionsAsked([]);
    setError(null);
    loadCartoonProfile();
  }, []);

  // Auto-start game when profile loads successfully
  useEffect(() => {
    if (profile && !loading && !error && remainingCharacters.length === 0) {
      startNewGame();
    }
  }, [profile, loading, error, remainingCharacters.length, startNewGame]);

  return {
    profile,
    hiddenCharacter,
    remainingCharacters,
    questionsAsked,
    gameState,
    loading,
    error,
    startNewGame,
    askQuestion,
    makeGuess,
    resetGame
  };
}