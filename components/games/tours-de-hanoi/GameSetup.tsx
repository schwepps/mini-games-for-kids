'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { largeButton, cardStyles } from '@/lib/styles/buttonUtils';
import { GameSetupProps, DIFFICULTY_LEVELS } from '@/types/tours-de-hanoi';

export default function GameSetup({
  selectedDifficulty,
  onDifficultyChange,
  onStartGame,
  loading
}: GameSetupProps) {
  
  const difficulties = Object.values(DIFFICULTY_LEVELS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Logo */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Image
          src="/images/logo/tours-de-hanoi-logo-large.png"
          alt="Tours de Hanoi"
          width={200}
          height={200}
          className="drop-shadow-xl"
          priority
        />
      </motion.div>

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
          className="text-lg text-white/90 drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Aide tes amis à former une tour en les empilant correctement !
        </motion.p>
      </div>

      {/* Difficulty Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
        {difficulties.map((difficulty, index) => (
          <motion.div
            key={difficulty.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl focus-within:ring-4 focus-within:ring-blue-400/50 ${
                selectedDifficulty?.id === difficulty.id
                  ? cardStyles.selected
                  : `${cardStyles.base} ${cardStyles.hover}`
              }`}
              onClick={() => onDifficultyChange(difficulty)}
              role="button"
              tabIndex={0}
              aria-label={`Sélectionner ${difficulty.name}: ${difficulty.characterCount} personnages`}
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
                  {difficulty.name}
                </h3>
                
                {/* Character Count */}
                <div className={`bg-gradient-to-r ${difficulty.color} text-white rounded-full px-4 py-2 mb-2 inline-block`}>
                  <span className="font-bold">{difficulty.characterCount} personnages</span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mt-2">
                  {difficulty.description}
                </p>
                
                {/* Optimal moves */}
                <p className="text-xs text-gray-500 mt-2">
                  Défis min : {difficulty.minMoves} coups
                </p>
                
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

      {/* Game Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 rounded-xl p-4 mb-6 max-w-2xl mx-auto"
      >
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Comment jouer ?
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Les grands personnages doivent soutenir les petits</li>
          <li>• Clique sur un personnage pour le sélectionner</li>
          <li>• Clique sur une tour pour le déplacer</li>
          <li>• Déplace tous les personnages sur la dernière tour pour gagner !</li>
        </ul>
      </motion.div>

      {/* Start Game Button */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
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
                  🏗️
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
          <p className="text-white/80 text-sm mt-3">
            Choisis d&apos;abord une difficulté ! 👆
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}