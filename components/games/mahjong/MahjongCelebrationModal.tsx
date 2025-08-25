'use client';

import { motion } from 'framer-motion';
import { MahjongDifficulty, DIFFICULTY_OPTIONS } from '@/types/mahjong';
import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';

interface MahjongCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moves: number;
  totalPairs: number;
  gameTime: number;
  difficulty: MahjongDifficulty;
  onNewGame: () => void;
  onDifficultyChange?: (difficulty: MahjongDifficulty) => void;
}

export default function MahjongCelebrationModal({
  open,
  onOpenChange,
  moves,
  totalPairs,
  gameTime,
  difficulty,
  onNewGame,
  onDifficultyChange
}: MahjongCelebrationModalProps) {

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateEfficiency = (): number => {
    if (totalPairs === 0) return 0;
    const perfectMoves = totalPairs;
    const actualMoves = Math.max(1, moves);
    return Math.min(100, Math.round((perfectMoves / actualMoves) * 100));
  };

  const getVictoryMessage = (): string => {
    const efficiency = calculateEfficiency();
    const difficultyName = DIFFICULTY_OPTIONS.find(d => d.difficulty === difficulty)?.displayName || '';
    
    if (efficiency >= 90) {
      return `Incroyable ! Tu as résolu le défi ${difficultyName} avec une efficacité parfaite ! 🏆`;
    } else if (efficiency >= 80) {
      return `Excellent travail ! Tu maîtrises vraiment le MahJong niveau ${difficultyName} ! ⭐`;
    } else if (efficiency >= 70) {
      return `Très bien joué ! Le niveau ${difficultyName} n'a plus de secrets pour toi ! 👏`;
    } else {
      return `Félicitations ! Tu as terminé le défi ${difficultyName} ! Continue à t'améliorer ! 🎉`;
    }
  };

  const celebrationConfig: CelebrationConfig = {
    logoPath: '/images/logo/mahjong-logo-large.png',
    logoAlt: 'MahJong - Jeu de logique',
    customTitle: '🎉 Victoire ! 🎉',
    customSubtitle: 'Toutes les paires ont été trouvées !',
    getVictoryMessage,
    calculateEfficiency,
    gameStats: [
      {
        label: 'Paires trouvées',
        value: totalPairs,
        gradient: 'from-green-500 to-blue-500'
      },
      {
        label: 'Coups joués',
        value: moves,
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        label: 'Temps total',
        value: formatTime(gameTime),
        gradient: 'from-orange-500 to-red-500'
      }
    ]
  };

  const handleNewGameWithDifficulty = () => {
    onNewGame();
  };

  return (
    <>
      <SharedCelebrationModal
        open={open}
        onOpenChange={onOpenChange}
        onNewGame={handleNewGameWithDifficulty}
        config={celebrationConfig}
      />

      {/* Optional: Difficulty Change Button Overlay */}
      {onDifficultyChange && open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60]"
        >
          <div className="flex gap-2">
            {DIFFICULTY_OPTIONS.map((option) => (
              <motion.button
                key={option.difficulty}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onDifficultyChange(option.difficulty);
                  onOpenChange(false);
                }}
                className={`
                  px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg border-2 border-white/50
                  ${option.difficulty === difficulty
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                  }
                `}
              >
                {option.difficulty === 'easy' && '🟢'}
                {option.difficulty === 'medium' && '🟡'}
                {option.difficulty === 'hard' && '🔴'}
                <span className="ml-2">{option.displayName}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}