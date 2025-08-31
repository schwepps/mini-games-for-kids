'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GameSetup from './GameSetup';
import MemoGrid from './MemoGrid';
import GameStatus from './GameStatus';
import CelebrationModal from './CelebrationModal';
import ImagePreloader from './ImagePreloader';
import MemoGameControls from './MemoGameControls';
import { useMemoGame } from '@/hooks/games/memo/useMemoGame';

export default function MemoGame() {
  const {
    gamePhase,
    selectedPairCount,
    cards,
    flippedCards,
    matchedCards,
    moves,
    loading,
    error,
    matchedPairs,
    totalPairs,
    gameTime,
    selectPairCount,
    startNewGame,
    flipCard,
    resetGame,
    isInteractionDisabled
  } = useMemoGame();

  const [showCelebration, setShowCelebration] = useState(false);

  // Show celebration when game is won
  useEffect(() => {
    if (gamePhase === 'won') {
      setShowCelebration(true);
    }
  }, [gamePhase]);

  const handleNewGame = () => {
    setShowCelebration(false);
    startNewGame();
  };

  const handleChangeDifficulty = () => {
    setShowCelebration(false);
    resetGame();
  };

  // Loading state
  if (loading && cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-8 border-white border-t-yellow-400 rounded-full mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Préparation...</h2>
          <p className="text-white/80 text-lg">Mélange des cartes en cours !</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center bg-white/90 backdrop-blur-sm">
          <CardContent className="space-y-4">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-red-600">Oups !</h2>
            <p className="text-gray-600">{error}</p>
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
        
        {/* Header with Logo */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <Image
            src="/images/logo/memo-logo-large.png"
            alt="Mémo - Jeu de Mémoire"
            width={200}
            height={200}
            className="mx-auto drop-shadow-lg"
            priority
          />
          <p className="text-white/90 text-lg lg:text-xl mt-2">
            {gamePhase === 'setup' 
              ? 'Retrouve les paires de personnages !' 
              : 'Clique sur les cartes pour les retourner !'}
          </p>
        </motion.div>

        {/* Game Content based on phase */}
        <AnimatePresence mode="wait">
          
          {/* Setup Phase */}
          {gamePhase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <GameSetup
                selectedPairCount={selectedPairCount}
                onPairCountChange={selectPairCount}
                onStartGame={startNewGame}
                loading={loading}
              />
            </motion.div>
          )}

          {/* Playing Phase */}
          {gamePhase === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Preload character images to eliminate grey placeholder delay */}
              <ImagePreloader 
                characters={cards.map(card => card.character).filter((char, index, self) => 
                  self.findIndex(c => c.id === char.id) === index
                )}
              />
              
              {/* Game Status */}
              <GameStatus
                moves={moves}
                matchedPairs={matchedPairs}
                totalPairs={totalPairs}
                startTime={cards.length > 0 ? new Date(Date.now() - gameTime * 1000) : undefined}
              />

              {/* Game Grid */}
              <div className="flex justify-center">
                <MemoGrid
                  cards={cards}
                  flippedCards={flippedCards}
                  matchedCards={matchedCards}
                  onCardClick={flipCard}
                  disabled={isInteractionDisabled()}
                />
              </div>

              {/* Game Controls */}
              <MemoGameControls
                onNewGame={handleNewGame}
                onChangeDifficulty={resetGame}
                isInteractionDisabled={isInteractionDisabled()}
              />

              {/* Helpful Tip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
                  <CardContent className="p-4">
                    <p className="text-white/90 text-sm">
                      💡 <strong>Astuce :</strong> Mémorise bien les personnages pour les retrouver plus vite !
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Won Phase (handled by modal, but we can show a brief message) */}
          {gamePhase === 'won' && !showCelebration && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-4xl font-bold text-white mb-4">Victoire !</h2>
              <p className="text-white/90 text-xl mb-8">Toutes les paires ont été trouvées !</p>
              
              {/* Game Controls */}
              <MemoGameControls
                onNewGame={handleNewGame}
                onChangeDifficulty={resetGame}
                isInteractionDisabled={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Modal */}
        <CelebrationModal 
          open={showCelebration}
          onOpenChange={setShowCelebration}
          moves={moves}
          totalPairs={totalPairs}
          gameTime={gameTime}
          onNewGame={handleNewGame}
          onChangeDifficulty={handleChangeDifficulty}
        />
      </div>
    </div>
  );
}

