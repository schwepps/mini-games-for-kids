'use client';

/**
 * Demo component showing how to use the ProfileLoader and CharacterFilter
 */

import { useState, useEffect } from 'react';
import { IProfile, ICharacter, IQuestion } from '@/types/game';
import { ProfileLoader } from '@/lib/profileLoader';
import { CharacterFilter } from '@/lib/characterFilter';

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
    return <div className="p-4">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={loadCurrentProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-4">No profile loaded</div>;
  }

  const suggestions = getQuestionSuggestions();
  const gameWon = remainingCharacters.length === 1 && remainingCharacters[0].id === selectedCharacter?.id;
  const gameLost = remainingCharacters.length === 0 || (remainingCharacters.length === 1 && remainingCharacters[0].id !== selectedCharacter?.id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <button
            onClick={switchProfile}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Switch Profile
          </button>
        </div>
        <p className="text-gray-600">{profile.description}</p>
      </div>

      {selectedCharacter && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h2 className="text-lg font-semibold mb-2">Hidden Character (Demo)</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">
                {ProfileLoader.getImageUrl(selectedCharacter.image).split('/').pop()}
              </span>
            </div>
            <div>
              <h3 className="font-medium">{selectedCharacter.name}</h3>
              <p className="text-sm text-gray-600">{selectedCharacter.metadata?.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Game Status</h2>
          
          {gameWon && (
            <div className="p-4 bg-green-100 border border-green-200 rounded mb-4">
              <h3 className="font-semibold text-green-800">You Won! 🎉</h3>
              <p className="text-green-700">You found {selectedCharacter?.name}!</p>
            </div>
          )}
          
          {gameLost && (
            <div className="p-4 bg-red-100 border border-red-200 rounded mb-4">
              <h3 className="font-semibold text-red-800">Game Over 😔</h3>
              <p className="text-red-700">The character was {selectedCharacter?.name}</p>
            </div>
          )}

          <div className="mb-4">
            <p><strong>Remaining characters:</strong> {remainingCharacters.length}</p>
            <p><strong>Questions asked:</strong> {questions.length}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Remaining Characters:</h3>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {remainingCharacters.map(char => (
                <div key={char.id} className="text-sm">
                  {char.name}
                </div>
              ))}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Suggested Questions:</h3>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <div key={`${suggestion.characteristicKey}-${suggestion.value}`} className="p-2 bg-gray-50 rounded">
                    <div className="text-sm font-medium">{suggestion.question}</div>
                    <div className="text-xs text-gray-500">
                      Effectiveness: {(suggestion.effectiveness * 100).toFixed(1)}%
                    </div>
                    <div className="mt-1 space-x-2">
                      <button
                        onClick={() => askQuestion(suggestion.characteristicKey, suggestion.value, true)}
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        disabled={gameWon || gameLost}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => askQuestion(suggestion.characteristicKey, suggestion.value, false)}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        disabled={gameWon || gameLost}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Questions Asked</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {questions.map((question) => (
              <div key={question.id} className="p-2 bg-gray-50 rounded">
                <div className="text-sm font-medium">{question.text}</div>
                <div className="text-xs text-gray-500">
                  Answer: <span className={question.answer ? 'text-green-600' : 'text-red-600'}>
                    {question.answer ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            ))}
            {questions.length === 0 && (
              <p className="text-gray-500 text-sm">No questions asked yet. Try the suggested questions!</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <button
          onClick={() => {
            setQuestions([]);
            setRemainingCharacters(profile.characters);
            if (profile.characters.length > 0) {
              const randomIndex = Math.floor(Math.random() * profile.characters.length);
              setSelectedCharacter(profile.characters[randomIndex]);
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Game
        </button>
      </div>
    </div>
  );
}