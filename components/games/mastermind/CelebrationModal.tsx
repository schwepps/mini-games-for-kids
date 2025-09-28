'use client';

import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';
import { MastermindCelebrationModalProps } from '@/types/mastermind';
import { calculateEfficiency } from '@/lib/games/mastermind/feedbackCalculator';

export default function CelebrationModal({
  open,
  onOpenChange,
  attempts,
  maxAttempts,
  gameTime = 0,
  difficulty,
  onNewGame,
  onChangeDifficulty,
}: MastermindCelebrationModalProps) {
  
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const efficiency = calculateEfficiency(
    attempts,
    maxAttempts,
    difficulty.codeLength
  );

  const config: CelebrationConfig = {
    logoPath: '/images/logo/mastermind-logo-large.png',
    logoAlt: 'Mastermind',
    customTitle: 'Code Secret Découvert ! 🕵️',
    customSubtitle: 'Tu as trouvé la combinaison secrète !',
    gameStats: [
      {
        label: 'Essais',
        value: `${attempts}/${maxAttempts}`,
        gradient: 'from-blue-400 to-purple-400',
      },
      {
        label: 'Temps',
        value: timeDisplay,
        gradient: 'from-green-400 to-teal-400',
      },
      {
        label: 'Difficulté',
        value: difficulty.level,
        gradient: 'from-orange-400 to-red-400',
      },
    ],
    calculateEfficiency: () => efficiency,
    getVictoryMessage: () => {
      if (attempts <= 3) {
        return 'Incroyable ! Tu es un vrai détective ! 🔍';
      } else if (attempts <= maxAttempts / 2) {
        return 'Excellent travail de déduction ! 🎯';
      } else {
        return 'Bien joué, tu as réussi ! 👏';
      }
    },
    onChangeDifficulty,
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