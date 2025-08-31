'use client';

import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';
import { SudokuCelebrationModalProps } from '@/types/sudoku';
import { getPerformanceMessage } from '@/lib/games/sudoku/celebrationUtils';

export default function SudokuCelebrationModal({
  open,
  onOpenChange,
  moves,
  gridSize,
  gameTime,
  onNewGame,
}: SudokuCelebrationModalProps) {
  
  const performance = gameTime ? getPerformanceMessage(moves, gridSize, gameTime) : {
    title: "Bravo !",
    message: "Tu as terminé le Sudoku !",
    emoji: "🎉",
    stars: 3
  };

  const minutes = Math.floor((gameTime || 0) / 60);
  const seconds = (gameTime || 0) % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const getDifficultyMessage = () => {
    if (gridSize === 4) return "Grille 4×4 réussie ! Super début ! 🌟";
    if (gridSize === 6) return "Grille 6×6 maîtrisée ! Excellent travail ! 🎯";
    if (gridSize === 9) return "Grille 9×9 complétée ! Tu es un champion ! 🏆";
    return "Sudoku terminé ! Bravo ! 🎉";
  };

  const config: CelebrationConfig = {
    logoPath: "/images/logo/sudoku-logo-large.png",
    logoAlt: "Sudoku",
    customTitle: performance.title,
    customSubtitle: performance.message,
    gameStats: [
      {
        label: 'Mouvements',
        value: moves,
        gradient: 'from-blue-400 to-purple-400'
      },
      {
        label: 'Temps',
        value: timeDisplay,
        gradient: 'from-yellow-400 to-orange-400'
      },
      {
        label: 'Grille',
        value: `${gridSize}×${gridSize}`,
        gradient: 'from-green-400 to-blue-400'
      }
    ],
    calculateEfficiency: () => {
      // Calculate efficiency based on moves and grid size
      const optimalMoves = gridSize * gridSize * 0.5; // Rough estimate
      return Math.max(0, Math.min(100, Math.round((optimalMoves / moves) * 100)));
    },
    getVictoryMessage: () => getDifficultyMessage()
  };

  return (
    <SharedCelebrationModal
      open={open}
      onOpenChange={onOpenChange}
      onNewGame={onNewGame}
      config={config}
    />
  );
}