import JacquesADitGame from '@/components/games/jacques-a-dit/JacquesADitGame';
import GameLayout from '@/components/shared/GameLayout';

export default function JacquesADitPage() {
  return (
    <GameLayout 
      gradient="from-yellow-400 via-orange-400 to-red-400" 
      decorations="minimal"
    >
      <JacquesADitGame />
    </GameLayout>
  );
}