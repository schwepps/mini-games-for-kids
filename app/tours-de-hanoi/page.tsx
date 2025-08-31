'use client';

import { useState } from 'react';
import GameLayout from '@/components/shared/GameLayout';
import ToursDeHanoiGame from '@/components/games/tours-de-hanoi/ToursDeHanoiGame';
import GameSetup from '@/components/games/tours-de-hanoi/GameSetup';
import { ProfileLoader } from '@/lib/profileLoader';
import { ICharacter } from '@/types/shared';
import { DifficultyLevel, DIFFICULTY_LEVELS } from '@/types/tours-de-hanoi';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ToursDeHanoiPage() {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(DIFFICULTY_LEVELS.SUPER_FACILE);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async () => {
    if (!selectedDifficulty) return;

    setLoading(true);
    setError(null);

    try {
      const profile = await ProfileLoader.loadProfile();
      
      // Select random characters based on difficulty
      const shuffled = [...profile.characters].sort(() => Math.random() - 0.5);
      const selectedCharacters = shuffled.slice(0, selectedDifficulty.characterCount);
      
      setCharacters(selectedCharacters);
      setGameState('playing');
    } catch (error) {
      console.error('Failed to load characters:', error);
      setError('Impossible de charger les personnages. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };



  const handleRestart = () => {
    setGameState('setup');
    setSelectedDifficulty(DIFFICULTY_LEVELS.SUPER_FACILE);
    setCharacters([]);
  };

  return (
    <GameLayout
      gradient="from-pink-400 via-yellow-400 to-orange-400"
      decorations="minimal"
    >
      <ErrorBoundary>
        <div className="w-full h-full flex items-center justify-center p-4">
          {error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {gameState === 'setup' ? (
            <GameSetup
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              onStartGame={handleStartGame}
              loading={loading}
            />
          ) : (
            <ToursDeHanoiGame
              characters={characters}
              difficulty={selectedDifficulty!}
              onRestart={handleRestart}
            />
          )}
        </div>
      </ErrorBoundary>
    </GameLayout>
  );
}