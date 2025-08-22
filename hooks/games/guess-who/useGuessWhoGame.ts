'use client';

import { useState, useEffect, useCallback } from 'react';
import { IProfile, ICharacter, IQuestion } from '@/types/game';
import { ProfileLoader } from '@/lib/profileLoader';
import { CharacterFilter } from '@/lib/characterFilter';
import { createErrorHandler } from '@/lib/utils/errorHandling';

type GameStatus = 'playing' | 'won' | 'lost';

export function useGuessWhoGame() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [hiddenCharacter, setHiddenCharacter] = useState<ICharacter | null>(null);
  const [remainingCharacters, setRemainingCharacters] = useState<ICharacter[]>([]);
  const [questionsAsked, setQuestionsAsked] = useState<IQuestion[]>([]);
  const [gameState, setGameState] = useState<GameStatus>('playing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create error handler for this component
  const handleError = createErrorHandler(
    setError,
    { component: 'game', operation: 'guess-who-game' }
  );

  // Load the profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const gameProfile = await ProfileLoader.loadProfile('cartoon-characters');
      setProfile(gameProfile);
    } catch (err) {
      handleError(err, 'Impossible de charger les personnages du jeu');
    } finally {
      setLoading(false);
    }
  };

  const selectRandomCharacter = useCallback((characters: ICharacter[]): ICharacter => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex]!; // We know the array is not empty when called
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

    // Create the question with proper French grammar
    const characteristic = profile.characteristicSchema[characteristicKey];
    if (!characteristic) return; // Handle missing characteristic
    let questionText = '';
    
    if (typeof value === 'boolean') {
      // Boolean characteristics like "Porte un Chapeau", "Est un Super-héros", "Sourit"
      questionText = value 
        ? `Est-ce que le personnage ${characteristic.displayName.toLowerCase()} ?`
        : `Est-ce que le personnage ne ${characteristic.displayName.toLowerCase()} pas ?`;
    } else {
      // Enum characteristics like colors, age, species
      switch (characteristicKey) {
        case 'hairColor':
          questionText = `Est-ce que le personnage a les cheveux ${value} ?`;
          break;
        case 'eyeColor':
          questionText = `Est-ce que le personnage a les yeux ${value} ?`;
          break;
        case 'age':
          questionText = `Est-ce que le personnage est ${value === 'enfant' ? 'un enfant' : value === 'adolescent' ? 'un adolescent' : value === 'adulte' ? 'un adulte' : 'âgé'} ?`;
          break;
        case 'species':
          const article = value === 'humain' ? 'un humain' : value === 'animal' ? 'un animal' : value === 'robot' ? 'un robot' : value === 'alien' ? 'un alien' : 'un monstre';
          questionText = `Est-ce que le personnage est ${article} ?`;
          break;
        default:
          questionText = `Est-ce que ${characteristic.displayName.toLowerCase()} est ${value} ?`;
      }
    }

    const question: IQuestion = {
      id: `q_${Date.now()}`,
      text: questionText,
      characteristicKey,
      value,
      answer,
      timestamp: new Date()
    };

    // Apply the question to filter characters
    const filteredCharacters = CharacterFilter.applyQuestionResult(remainingCharacters, question);
    
    // Safety check: Ensure hidden character is never eliminated
    if (!filteredCharacters.find(char => char.id === hiddenCharacter.id)) {
      throw new Error('Critical game logic error: Hidden character would be eliminated');
    }
    
    // Update state
    const newQuestions = [...questionsAsked, question];
    setQuestionsAsked(newQuestions);
    setRemainingCharacters(filteredCharacters);

    // Note: Player wins only by making a correct guess via makeGuess(), not automatically
    // This allows the user to click on the final remaining character
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
    loadProfile();
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