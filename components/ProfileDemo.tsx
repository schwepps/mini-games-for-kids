'use client';

/**
 * Demo component showing how to use the ProfileLoader and CharacterFilter
 */

import { useState, useEffect } from 'react';
import { IProfile, ICharacter, IQuestion } from '@/types/game';
import { ProfileLoader } from '@/lib/profileLoader';
import { CharacterFilter } from '@/lib/characterFilter';
import CharacterAvatar from '@/components/CharacterAvatar';

export default function ProfileDemo() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);
  const [remainingCharacters, setRemainingCharacters] = useState<ICharacter[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    loadCurrentProfile();
  }, []);

  const loadCurrentProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedProfile = await ProfileLoader.loadProfile();
      setProfile(loadedProfile);
      setRemainingCharacters(loadedProfile.characters);
      
      // Select a random character as the "hidden" one for demo
      const randomIndex = Math.floor(Math.random() * loadedProfile.characters.length);
      setSelectedCharacter(loadedProfile.characters[randomIndex]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = (characteristicKey: string, value: unknown, answer: boolean) => {
    if (!profile) return;

    const question: IQuestion = {
      id: `q_${Date.now()}`,
      text: `Is the ${profile.characteristicSchema[characteristicKey].displayName} ${value}?`,
      characteristicKey,
      value,
      answer,
      timestamp: new Date()
    };

    const newQuestions = [...questions, question];
    const filteredCharacters = CharacterFilter.applyQuestionResult(remainingCharacters, question);
    
    setQuestions(newQuestions);
    setRemainingCharacters(filteredCharacters);
  };

  const getQuestionSuggestions = () => {
    if (!profile || remainingCharacters.length <= 1) return [];
    
    return CharacterFilter.generateQuestionSuggestions(
      remainingCharacters, 
      profile,
      questions.map(q => q.characteristicKey)
    ).slice(0, 5); // Show top 5 suggestions
  };

  const switchProfile = async () => {
    const currentId = ProfileLoader.getCurrentProfileId();
    const newId = currentId === 'cartoon-characters' ? 'office-team' : 'cartoon-characters';
    
    try {
      const newProfile = await ProfileLoader.switchProfile(newId);
      setProfile(newProfile);
      setRemainingCharacters(newProfile.characters);
      setQuestions([]);
      
      const randomIndex = Math.floor(Math.random() * newProfile.characters.length);
      setSelectedCharacter(newProfile.characters[randomIndex]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch profile');
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Loading character profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Profile Loading Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={loadCurrentProfile}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            🔄 Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">📂</div>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">No Profile Loaded</h2>
        <p className="text-gray-500 dark:text-gray-500 mt-2">Check your environment configuration</p>
      </div>
    );
  }

  const suggestions = getQuestionSuggestions();
  const gameWon = remainingCharacters.length === 1 && remainingCharacters[0].id === selectedCharacter?.id;
  const gameLost = remainingCharacters.length === 0 || (remainingCharacters.length === 1 && remainingCharacters[0].id !== selectedCharacter?.id);

  return (
    <main className="p-6 max-w-4xl mx-auto" role="main" aria-label="Guess Who Game Demo">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <button
            onClick={switchProfile}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            aria-label="Switch to different character profile"
          >
            Switch Profile
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{profile.description}</p>
      </header>

      {selectedCharacter && (
        <section 
          className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          aria-labelledby="hidden-character-heading"
        >
          <h2 id="hidden-character-heading" className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
            Hidden Character (Demo)
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <CharacterAvatar 
                characterName={selectedCharacter.name}
                imageName={selectedCharacter.image}
                size="md"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                🎭
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{selectedCharacter.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCharacter.metadata?.description}</p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                🖼️ Image: {selectedCharacter.image}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <section aria-labelledby="game-status-heading">
          <h2 id="game-status-heading" className="text-xl font-semibold mb-4">Game Status</h2>
          
          {gameWon && (
            <div 
              className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded mb-4"
              role="alert"
              aria-live="polite"
            >
              <h3 className="font-semibold text-green-800 dark:text-green-200">You Won! 🎉</h3>
              <p className="text-green-700 dark:text-green-300">You found {selectedCharacter?.name}!</p>
            </div>
          )}
          
          {gameLost && (
            <div 
              className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded mb-4"
              role="alert"
              aria-live="polite"
            >
              <h3 className="font-semibold text-red-800 dark:text-red-200">Game Over 😔</h3>
              <p className="text-red-700 dark:text-red-300">The character was {selectedCharacter?.name}</p>
            </div>
          )}

          <div className="mb-4">
            <p><strong>Remaining characters:</strong> {remainingCharacters.length}</p>
            <p><strong>Questions asked:</strong> {questions.length}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span>Remaining Characters:</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                {remainingCharacters.length}
              </span>
            </h3>
            <div className="space-y-1 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              {remainingCharacters.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">No characters remaining</p>
              ) : (
                remainingCharacters.map(char => (
                  <div key={char.id} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium">{char.name}</span>
                    {char.metadata?.difficulty && (
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        char.metadata.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        char.metadata.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {char.metadata.difficulty}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div>
              <h3 className="font-medium mb-2" id="suggestions-heading">Suggested Questions:</h3>
              <div className="space-y-2" role="group" aria-labelledby="suggestions-heading">
                {suggestions.map((suggestion) => (
                  <div key={`${suggestion.characteristicKey}-${suggestion.value}`} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm font-medium">{suggestion.question}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Effectiveness: {(suggestion.effectiveness * 100).toFixed(1)}%
                    </div>
                    <div className="mt-1 space-x-2">
                      <button
                        onClick={() => askQuestion(suggestion.characteristicKey, suggestion.value, true)}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={gameWon || gameLost}
                        aria-label={`Answer yes to: ${suggestion.question}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => askQuestion(suggestion.characteristicKey, suggestion.value, false)}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={gameWon || gameLost}
                        aria-label={`Answer no to: ${suggestion.question}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section aria-labelledby="questions-history-heading">
          <h2 id="questions-history-heading" className="text-xl font-semibold mb-4">Questions Asked</h2>
          <div 
            className="space-y-2 max-h-96 overflow-y-auto"
            role="log"
            aria-label="Question history"
            aria-live="polite"
          >
            {questions.map((question) => (
              <div key={question.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-sm font-medium">{question.text}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Answer: <span className={question.answer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {question.answer ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            ))}
            {questions.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No questions asked yet. Try the suggested questions!</p>
            )}
          </div>
        </section>
      </div>

      <footer className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setQuestions([]);
            setRemainingCharacters(profile.characters);
            if (profile.characters.length > 0) {
              const randomIndex = Math.floor(Math.random() * profile.characters.length);
              setSelectedCharacter(profile.characters[randomIndex]);
            }
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          aria-label="Start a new game with a different hidden character"
        >
          🎮 New Game
        </button>
      </footer>
    </main>
  );
}