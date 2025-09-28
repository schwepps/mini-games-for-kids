'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { largeButton } from '@/lib/styles/buttonUtils';
import { GameSetupProps, DIFFICULTY_LEVELS } from '@/types/mastermind';

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
      className="max-w-5xl mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          Choisis ta difficulté ! 🧩
        </motion.h2>
        <motion.p
          className="text-lg text-white/90 drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Devine la combinaison secrète des personnages !
        </motion.p>
      </div>

      {/* Difficulty Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {DIFFICULTY_LEVELS.map((difficulty, index) => (
          <motion.div
            key={difficulty.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl focus-within:ring-4 focus-within:ring-purple-400/50 ${
                selectedDifficulty?.id === difficulty.id
                  ? 'ring-4 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg transform scale-105'
                  : 'bg-white/95 hover:bg-white shadow-md hover:scale-102'
              }`}
              onClick={() => onDifficultyChange(difficulty)}
              role="button"
              tabIndex={0}
              aria-label={`Sélectionner ${difficulty.level}: ${difficulty.description}`}
              aria-pressed={selectedDifficulty?.id === difficulty.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDifficultyChange(difficulty);
                }
              }}
            >
              <CardContent className="p-6 text-center">
                {/* Emoji and Difficulty */}
                <div className="text-4xl mb-3">{difficulty.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {difficulty.level}
                </h3>
                
                {/* Difficulty Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span className="text-sm font-medium text-gray-700">
                      {difficulty.codeLength} personnages
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🔄</span>
                    <span className="text-sm font-medium text-gray-700">
                      {difficulty.maxAttempts} essais
                    </span>
                  </div>
                  {difficulty.allowDuplicates && (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">👥</span>
                      <span className="text-xs font-medium text-purple-600">
                        Doublons possibles
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full px-3 py-1.5 text-xs font-bold">
                  {difficulty.description}
                </div>
                
                {/* Selected indicator */}
                {selectedDifficulty?.id === difficulty.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3"
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
                  🕵️
                </motion.span>
                <span className="drop-shadow-sm">Commencer la Partie</span>
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
          <p className="text-white/80 text-sm mt-3">
            Choisis d&apos;abord une difficulté ! 👆
          </p>
        )}
      </motion.div>

      {/* Game Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <Card className="bg-white/90 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-purple-700 mb-3">Comment jouer ? 🎮</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-sm text-gray-700">Devine la combinaison</p>
                  <p className="text-xs text-gray-600">Place les personnages dans le bon ordre</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-semibold text-sm text-gray-700">Étoile dorée</p>
                  <p className="text-xs text-gray-600">Bon personnage, bonne position !</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💖</span>
                <div>
                  <p className="font-semibold text-sm text-gray-700">Cœur rose</p>
                  <p className="text-xs text-gray-600">Bon personnage, mauvaise position</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-semibold text-sm text-gray-700">Trouve le code secret</p>
                  <p className="text-xs text-gray-600">Utilise les indices pour gagner !</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}