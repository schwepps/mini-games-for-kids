'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GameSetupProps } from '@/types/memo';
import { PAIR_COUNT_OPTIONS } from '@/types/memo';

export default function GameSetup({
  selectedPairCount,
  onPairCountChange,
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
        <p className="text-xl text-white/90 drop-shadow">
          Sélectionne combien de paires tu veux retrouver
        </p>
      </div>

      {/* Difficulty Options Grid - 2-row horizontal layout for better screen fit */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto">
        {PAIR_COUNT_OPTIONS.map((option, index) => (
          <motion.div
            key={option.pairs}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl focus-within:ring-4 focus-within:ring-blue-400/50 ${
                selectedPairCount === option.pairs
                  ? 'ring-4 ring-yellow-400 bg-yellow-50 shadow-lg transform scale-105'
                  : 'bg-white/90 hover:bg-white shadow-md hover:scale-102'
              }`}
              onClick={() => onPairCountChange(option.pairs)}
              role="button"
              tabIndex={0}
              aria-label={`Sélectionner ${option.difficulty}: ${option.pairs} paires, ${option.cards} cartes`}
              aria-pressed={selectedPairCount === option.pairs}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPairCountChange(option.pairs);
                }
              }}
            >
              <CardContent className="p-6 text-center">
                {/* Emoji and Difficulty */}
                <div className="text-4xl mb-3">{option.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {option.difficulty}
                </h3>
                
                {/* Card Count */}
                <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full px-4 py-2 mb-3 inline-block">
                  <span className="font-bold">{option.cards} cartes</span>
                </div>
                
                {/* Pairs Display */}
                <p className="text-sm text-gray-600 mb-3">
                  {option.pairs} {option.pairs === 1 ? 'paire' : 'paires'} à retrouver
                </p>
                
                {/* Visual Card Preview - Larger cards for better visibility */}
                <div className="flex justify-center gap-1 flex-wrap">
                  {Array.from({ length: Math.min(option.cards, 8) }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded border-2 transition-colors ${
                        selectedPairCount === option.pairs
                          ? 'bg-yellow-400 border-yellow-500'
                          : 'bg-purple-200 border-purple-300'
                      }`}
                    />
                  ))}
                  {option.cards > 8 && (
                    <span className="text-xs text-gray-500 ml-1">+{option.cards - 8}</span>
                  )}
                </div>
                
                {/* Selected indicator */}
                {selectedPairCount === option.pairs && (
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

      {/* Selected Option Summary */}
      {selectedPairCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Card className="bg-white/95 shadow-lg max-w-md mx-auto">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Difficulté sélectionnée
              </h4>
              <div className="text-3xl mb-2">
                {PAIR_COUNT_OPTIONS.find(opt => opt.pairs === selectedPairCount)?.emoji}
              </div>
              <p className="text-lg font-medium text-gray-700 mb-1">
                {PAIR_COUNT_OPTIONS.find(opt => opt.pairs === selectedPairCount)?.difficulty}
              </p>
              <p className="text-purple-600 font-bold">
                {selectedPairCount * 2} cartes • {selectedPairCount} {selectedPairCount === 1 ? 'paire' : 'paires'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Start Game Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            onClick={onStartGame}
            disabled={loading || selectedPairCount === 0}
            size="lg"
            className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-2xl border-4 border-white/50 backdrop-blur-sm transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
        
        {selectedPairCount === 0 && (
          <p className="text-white/80 text-sm mt-3">
            Choisis d&apos;abord une difficulté ! 👆
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}