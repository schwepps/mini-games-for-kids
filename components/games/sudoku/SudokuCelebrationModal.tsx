'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SudokuCelebrationModalProps } from '@/types/sudoku';
import { useEffect, useState } from 'react';

import ConfettiPiece from '@/components/shared/ConfettiPiece';
import SudokuPerformanceStats from './SudokuPerformanceStats';
import { getPerformanceMessage } from '@/lib/games/sudoku/celebrationUtils';

export default function SudokuCelebrationModal({
  open,
  onOpenChange,
  moves,
  gridSize,
  gameTime,
  onNewGame,
  onDifficultyChange
}: SudokuCelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const performance = gameTime ? getPerformanceMessage(moves, gridSize, gameTime) : {
    title: "Bravo !",
    message: "Tu as terminé le Sudoku !",
    emoji: "🎉",
    stars: 3
  };

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleNewGame = () => {
    onOpenChange(false);
    setTimeout(() => {
      onNewGame();
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-auto bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 border-0 text-white">
        <motion.div 
          className="text-center py-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            {performance.emoji}
          </motion.div>

          <DialogTitle asChild>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-2 drop-shadow-lg"
            >
              {performance.title}
            </motion.h2>
          </DialogTitle>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg mb-6 drop-shadow"
          >
            {performance.message}
          </motion.p>

          <SudokuPerformanceStats
            gridSize={gridSize}
            moves={moves}
            gameTime={gameTime}
            stars={performance.stars}
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-3"
          >
            <Button
              onClick={handleNewGame}
              size="lg"
              className="w-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm font-bold py-3 px-6 rounded-xl transition-all duration-200"
            >
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🔄</span>
                <span>Nouvelle Partie</span>
              </motion.div>
            </Button>
            
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="w-full text-white hover:bg-white/10 font-medium"
            >
              Fermer
            </Button>
          </motion.div>

          {gridSize < 9 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 space-y-2"
            >
              <div className="text-sm opacity-80 mb-3">
                {gridSize === 4 && "🚀 Prêt pour un nouveau défi ?"}
                {gridSize === 6 && "🏆 Tu peux essayer le niveau difficile !"}
              </div>
              
              {gridSize === 4 && (
                <Button
                  onClick={() => onDifficultyChange('medium')}
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10 font-medium text-sm py-2"
                >
                  <motion.div 
                    className="flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🎯</span>
                    <span>Essayer Grille 6×6</span>
                  </motion.div>
                </Button>
              )}
              
              {gridSize === 6 && (
                <Button
                  onClick={() => onDifficultyChange('hard')}
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10 font-medium text-sm py-2"
                >
                  <motion.div 
                    className="flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🚀</span>
                    <span>Essayer Grille 9×9</span>
                  </motion.div>
                </Button>
              )}
            </motion.div>
          )}
          
          {gridSize === 9 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-sm opacity-80"
            >
              👑 Tu maîtrises parfaitement le Sudoku !
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <ConfettiPiece key={i} delay={i * 0.1} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}