import MastermindGame from '@/components/games/mastermind/MastermindGame';
import GameLayout from '@/components/shared/GameLayout';

export default function MastermindPage() {
  return (
    <GameLayout 
      gradient="from-purple-400 via-pink-400 to-red-400" 
      decorations="minimal"
    >
      <MastermindGame />
    </GameLayout>
  );
}