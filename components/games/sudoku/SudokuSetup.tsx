'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SudokuSetupProps, DIFFICULTY_OPTIONS } from '@/types/sudoku';
import { largeButton, cardStyles } from '@/lib/styles/buttonUtils';
import Image from 'next/image';

export default function SudokuSetup({
  difficulty,
  onDifficultyChange,
  onStartGame,
  loading
}: SudokuSetupProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Image
        src="/images/logo/sudoku-logo-large.png"
        alt="Sudoku - Jeu de Sudoku"
        width={200}
        height={200}
        className="mx-auto drop-shadow-lg"
        priority
      />
      <div className="text-center mb-8 mt-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          Choisis ta difficulté ! 🧩
        </motion.h2>
        <motion.p
          className="text-white/90 text-lg mb-2 drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Résous les grilles avec tes personnages préférés !
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        {DIFFICULTY_OPTIONS.map((option, index) => (
          <motion.div
            key={option.difficulty}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl focus-within:ring-4 focus-within:ring-blue-400/50 ${
                difficulty === option.difficulty
                  ? cardStyles.selected
                  : `${cardStyles.base} ${cardStyles.hover}`
              }`}
              onClick={() => onDifficultyChange(option.difficulty)}
              role="button"
              tabIndex={0}
              aria-label={`Sélectionner ${option.label}: grille ${option.description}, pour ${option.ageGroup}`}
              aria-pressed={difficulty === option.difficulty}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDifficultyChange(option.difficulty);
                }
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3">{option.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {option.label}
                </h3>
                
                <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full px-4 py-2 mb-3 inline-block">
                  <span className="font-bold">{option.description}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {option.ageGroup}
                </p>
                
                {difficulty === option.difficulty && (
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-8"
      >
        <Card className="bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">📋 Comment jouer ?</h3>
            <div className="text-gray-700 text-sm space-y-2">
              <p>🎯 <strong>Objectif :</strong> Remplis toutes les cases !</p>
              <p>✅ <strong>Règle :</strong> Chaque personnage doit apparaître une seule fois par ligne, colonne et région.</p>
              <p>💡 <strong>Astuce :</strong> Sélectionne un personnage puis clique sur une case vide.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            onClick={onStartGame}
            disabled={loading}
            size="lg"
            className={`${largeButton('primary')} disabled:opacity-50 disabled:cursor-not-allowed`}
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
                  🧩
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
      </motion.div>
    </motion.div>
  );
}