'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, RotateCcw } from 'lucide-react';
import CharacterGrid from './CharacterGrid';
import QuestionBuilder from './QuestionBuilder';
import CelebrationModal from './CelebrationModal';
import GameStatus from './GameStatus';
import { useCartoonGame } from '@/hooks/profiles/cartoon/useCartoonGame';

export default function CartoonGame() {
  const {
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
  } = useCartoonGame();

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (gameState === 'won') {
      setShowCelebration(true);
    }
  }, [gameState]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-8 border-white border-t-yellow-400 rounded-full mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Préparation...</h2>
          <p className="text-white/80 text-lg">Chargement de tes amis dessinés !</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center bg-white/90 backdrop-blur-sm">
          <CardContent className="space-y-4">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-red-600">Oups !</h2>
            <p className="text-gray-600">Quelque chose s&apos;est mal passé lors du chargement du jeu.</p>
            <Button 
              onClick={resetGame} 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Qui Est-Ce ? 🎭
          </h1>
          <p className="text-white/90 text-lg lg:text-xl">
            Trouve le personnage caché en posant des questions !
          </p>
        </motion.div>

        {/* Game Status */}
        <GameStatus 
          remainingCharacters={remainingCharacters}
          questionsAsked={questionsAsked}
          gameState={gameState}
          hiddenCharacter={hiddenCharacter}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question Builder */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <QuestionBuilder 
              onAskQuestion={askQuestion}
              profile={profile}
              remainingCharacters={remainingCharacters}
              questionsAsked={questionsAsked}
              disabled={gameState !== 'playing'}
            />
          </div>

          {/* Character Grid */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <CharacterGrid 
              characters={remainingCharacters}
              onCharacterGuess={makeGuess}
              gameState={gameState}
              questionsAsked={questionsAsked}
            />
          </div>
        </div>

        {/* Game Controls */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mt-8"
        >
          <Button 
            onClick={startNewGame}
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-sm text-lg px-8 py-4"
          >
            <Play className="w-6 h-6 mr-2" />
            Nouvelle Partie
          </Button>
        </motion.div>

        {/* Celebration Modal */}
        <CelebrationModal 
          open={showCelebration}
          onOpenChange={setShowCelebration}
          hiddenCharacter={hiddenCharacter}
          questionsAsked={questionsAsked.length}
          onNewGame={startNewGame}
        />
      </div>
    </div>
  );
}

