'use client';

import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';
import { JacquesCelebrationModalProps } from '@/types/jacques-a-dit';
import { usePerformanceRating } from '@/hooks/shared/usePerformanceRating';

export default function CelebrationModal({
  open,
  onOpenChange,
  currentRound,
  mistakes,
  difficultyName,
  onNewGame
}: JacquesCelebrationModalProps) {

  // Use performance rating hook - adapted for sequence game
  const { efficiency } = usePerformanceRating({
    gameType: 'jacques-a-dit',
    metrics: { 
      attempts: mistakes + currentRound, // Total attempts = rounds completed + mistakes
      target: currentRound 
    }
  });

  // Get encouraging message based on difficulty and performance
  const getDifficultyMessage = () => {
    if (mistakes === 0) {
      return `${difficultyName} réussi sans erreur ! Incroyable ! 🌟`;
    } else if (mistakes <= 2) {
      return `${difficultyName} maîtrisé ! Excellente mémoire ! 🧠`;
    } else if (mistakes <= 5) {
      return `${difficultyName} terminé ! Tu t'améliores ! 💪`;
    } else {
      return `${difficultyName} complété ! Bravo pour ta persévérance ! 🎯`;
    }
  };

  // Calculate star rating based on mistakes
  const getStarRating = () => {
    if (mistakes === 0) return 3;
    if (mistakes <= 2) return 2;
    return 1;
  };

  const config: CelebrationConfig = {
    logoPath: "/images/logo/jacques-a-dit-logo-large.png",
    logoAlt: "Jacques a dit",
    customTitle: "Félicitations ! 🎉",
    customSubtitle: "Tu as une excellente mémoire !",
    gameStats: [
      {
        label: 'Tours complétés',
        value: currentRound,
        gradient: 'from-blue-400 to-purple-400'
      },
      {
        label: mistakes === 0 ? 'Parfait !' : mistakes === 1 ? 'Erreur' : 'Erreurs',
        value: mistakes === 0 ? '🏆' : mistakes,
        gradient: 'from-orange-400 to-red-400'
      },
      {
        label: 'Étoiles gagnées',
        value: '⭐'.repeat(getStarRating()) + '☆'.repeat(3 - getStarRating()),
        gradient: 'from-yellow-400 to-orange-400'
      }
    ],
    calculateEfficiency: () => efficiency,
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