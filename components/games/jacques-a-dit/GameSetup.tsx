'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { largeButton } from '@/lib/styles/buttonUtils';
import { GameSetupProps } from '@/types/jacques-a-dit';
import { JACQUES_DIFFICULTIES } from '@/types/jacques-a-dit';

export default function GameSetup({
  selectedDifficulty,
  onDifficultyChange,
  onStartGame,
  loading
}: GameSetupProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          Choisis ta difficulté ! 🎯
        </motion.h2>
        <motion.p 
          className="text-xl text-white/90 drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Plus c&apos;est difficile, plus c&apos;est amusant !
        </motion.p>
      </div>

      {/* Difficulty Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
        {JACQUES_DIFFICULTIES.map((difficulty, index) => (
          <motion.div
            key={difficulty.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl focus-within:ring-4 focus-within:ring-yellow-400/50 ${
                selectedDifficulty?.id === difficulty.id
                  ? 'ring-4 ring-yellow-400 bg-yellow-50 shadow-lg transform scale-105'
                  : 'bg-white/90 hover:bg-white shadow-md hover:scale-102'
              }`}
              onClick={() => onDifficultyChange(difficulty)}
              role="button"
              tabIndex={0}
              aria-label={`Sélectionner ${difficulty.name}: ${difficulty.characterCount} personnages, ${difficulty.targetLength} tours`}
              aria-pressed={selectedDifficulty?.id === difficulty.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDifficultyChange(difficulty);
                }
              }}
            >
              <CardContent className="p-6 text-center">
                {/* Emoji and Difficulty Name */}
                <div className="text-4xl mb-3">{difficulty.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {difficulty.name}
                </h3>
                
                {/* Game Info */}
                <div className="space-y-2 mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-3 py-1 text-sm inline-block">
                    <span className="font-medium">{difficulty.characterCount} personnages</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full px-3 py-1 text-sm inline-block ml-2">
                    <span className="font-medium">{difficulty.targetLength} tours</span>
                  </div>
                </div>

                {/* Speed indicator */}
                <div className="text-xs text-gray-600 mb-3">
                  Vitesse: {difficulty.showSpeed >= 1200 ? 'Lente' : 
                           difficulty.showSpeed >= 1000 ? 'Normale' : 
                           difficulty.showSpeed >= 800 ? 'Rapide' : 'Très rapide'}
                </div>
                
                {/* Selected indicator */}
                {selectedDifficulty?.id === difficulty.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Start Game Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            onClick={onStartGame}
            disabled={loading || !selectedDifficulty}
            size="lg"
            className={`${largeButton('setup')} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <span>Préparation...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎮
                </motion.span>
                <span className="drop-shadow-sm">Commencer à Jouer</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.span>
              </div>
            )}
          </Button>
        </motion.div>
        
        {!selectedDifficulty && (
          <motion.p 
            className="text-white/80 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Choisis d&apos;abord une difficulté ! 👆
          </motion.p>
        )}
      </motion.div>

      {/* Game Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 max-w-2xl mx-auto"
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h4 className="text-white font-bold mb-3 text-center">📋 Comment jouer ?</h4>
            <div className="text-white/90 text-sm space-y-2">
              <p><strong>1.</strong> Jacques va te montrer une séquence de personnages</p>
              <p><strong>2.</strong> Mémorise bien l&apos;ordre !</p>
              <p><strong>3.</strong> Répète la séquence en tapant sur les personnages</p>
              <p><strong>4.</strong> À chaque tour, la séquence devient plus longue</p>
              <p className="text-yellow-300 font-medium">🎯 Atteins le nombre de tours pour gagner !</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}