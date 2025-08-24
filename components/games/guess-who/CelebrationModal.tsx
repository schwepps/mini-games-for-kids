'use client';

import SharedCelebrationModal, { CelebrationConfig } from '@/components/shared/games/SharedCelebrationModal';
import { ICharacter } from '@/types/game';
import { usePerformanceRating } from '@/hooks/shared/usePerformanceRating';

interface CelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hiddenCharacter: ICharacter | null;
  questionsAsked: number;
  onNewGame: () => void;
}

export default function CelebrationModal({ 
  open, 
  onOpenChange, 
  hiddenCharacter, 
  questionsAsked,
  onNewGame 
}: CelebrationModalProps) {

  // Use performance rating hook for efficiency calculation
  const { efficiency } = usePerformanceRating({
    gameType: 'guessWho',
    metrics: { attempts: questionsAsked }
  });

  // Get encouraging message based on performance
  const getPerformanceMessage = () => {
    if (questionsAsked <= 3) return "Performance exceptionnelle ! 🌟";
    if (questionsAsked <= 6) return "Excellent travail de détective ! 🕵️";
    if (questionsAsked <= 10) return "Très bonne stratégie ! 🎯";
    return "Bravo pour ta persévérance ! 💪";
  };

  // Get character-specific victory message
  const getVictoryMessage = () => {
    if (!hiddenCharacter) return "Tu as trouvé le personnage mystère !";
    return `Tu as découvert ${hiddenCharacter.name} !`;
  };

  const config: CelebrationConfig = {
    logoPath: "/images/logo/qui-est-ce-logo-large.png",
    logoAlt: "Qui est-ce ?",
    customTitle: "Bravo Détective ! 🎉",
    customSubtitle: getVictoryMessage(),
    gameStats: [
      {
        label: questionsAsked === 1 ? 'Question posée' : 'Questions posées',
        value: questionsAsked,
        gradient: 'from-blue-400 to-purple-400'
      },
      {
        label: 'Personnage',
        value: hiddenCharacter?.name || 'Trouvé',
        gradient: 'from-green-400 to-blue-400'
      },
      {
        label: 'Efficacité',
        value: `${efficiency}%`,
        gradient: 'from-yellow-400 to-orange-400'
      }
    ],
    calculateEfficiency: () => efficiency,
    getVictoryMessage: () => getPerformanceMessage()
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