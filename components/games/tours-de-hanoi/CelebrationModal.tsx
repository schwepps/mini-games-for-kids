'use client';

import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';
import { GameStats } from '@/types/tours-de-hanoi';

interface CelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stats: GameStats | null;
  onNewGame: () => void;
}

export default function CelebrationModal({
  open,
  onOpenChange,
  stats,
  onNewGame
}: CelebrationModalProps) {
  
  if (!stats) return null;

  const getVictoryMessage = (): string => {
    const efficiency = stats.efficiency;
    
    if (efficiency >= 95) {
      return "Incroyable ! Tu es un maître des tours ! 🏆";
    } else if (efficiency >= 80) {
      return "Excellent travail ! Tu es très doué ! ⭐";
    } else if (efficiency >= 60) {
      return "Bien joué ! Tu progresses rapidement ! 👏";
    } else {
      return "Bravo ! Continue comme ça ! 🎉";
    }
  };

  const config: CelebrationConfig = {
    logoPath: '/images/logo/tours-de-hanoi-logo-large.png',
    logoAlt: 'Tours des Amis Logo',
    customTitle: 'Tour Terminée ! 🏗️',
    customSubtitle: 'Tes amis sont ravis d\'être empilés ensemble !',
    gameStats: [
      {
        label: 'Coups joués',
        value: stats.moveCount,
        gradient: 'from-blue-400 to-purple-400'
      },
      {
        label: 'Coups optimaux',
        value: stats.optimalMoves,
        gradient: 'from-green-400 to-blue-400'
      },
      {
        label: 'Temps',
        value: `${Math.floor(stats.timeElapsed / 60)}:${(stats.timeElapsed % 60).toString().padStart(2, '0')}`,
        gradient: 'from-orange-400 to-red-400'
      },
      ...(stats.hintsUsed > 0 ? [{
        label: 'Astuces utilisées',
        value: stats.hintsUsed,
        gradient: 'from-yellow-400 to-orange-400'
      }] : [])
    ],
    calculateEfficiency: () => stats.efficiency,
    getVictoryMessage
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