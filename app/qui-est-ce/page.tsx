import GuessWhoGame from '@/components/games/guess-who/GuessWhoGame';
import GameLayout from '@/components/shared/GameLayout';

export default function QuiEstCePage() {
  return (
    <GameLayout decorations="minimal">
      <GuessWhoGame />
    </GameLayout>
  );
}