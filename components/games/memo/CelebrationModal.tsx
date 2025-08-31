'use client';

import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';
import { MemoCelebrationModalProps } from '@/types/memo';
import { usePerformanceRating } from '@/hooks/shared/usePerformanceRating';

export default function CelebrationModal({
  open,
  onOpenChange,
  moves,
  totalPairs,
  gameTime = 0,
  onNewGame,
  onChangeDifficulty
}: MemoCelebrationModalProps) {

  // Calculate game statistics
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  const timeDisplay = gameTime > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : '0:00';

  // Use performance rating hook
  const { efficiency } = usePerformanceRating({
    gameType: 'memo',
    metrics: { attempts: moves, target: totalPairs }
  });

  // Get encouraging message based on difficulty (total pairs)
  const getDifficultyMessage = () => {
    if (totalPairs === 1) return "Super facile réussi ! 🌟";
    if (totalPairs === 2) return "Niveau facile maîtrisé ! 😊";  
    if (totalPairs === 3) return "Niveau moyen conquis ! 🎯";
    if (totalPairs === 4) return "Niveau difficile vaincu ! 🚀";
    if (totalPairs === 5) return "Niveau très difficile battu ! 🏆";
    if (totalPairs === 6) return "Niveau expert dominé ! 🌈";
    return "Incroyable performance ! 🎊";
  };

  const config: CelebrationConfig = {
    logoPath: "/images/logo/memo-logo-large.png",
    logoAlt: "Mémo",
    customTitle: "Félicitations ! 🎉",
    customSubtitle: "Tu as trouvé toutes les paires !",
    gameStats: [
      {
        label: totalPairs === 1 ? 'Paire trouvée' : 'Paires trouvées',
        value: totalPairs,
        gradient: 'from-green-400 to-blue-400'
      },
      {
        label: moves === 1 ? 'Essai' : 'Essais',
        value: moves,
        gradient: 'from-purple-400 to-pink-400'
      },
      {
        label: 'Temps total',
        value: timeDisplay,
        gradient: 'from-yellow-400 to-orange-400'
      }
    ],
    calculateEfficiency: () => efficiency,
    getVictoryMessage: () => getDifficultyMessage(),
    onChangeDifficulty
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