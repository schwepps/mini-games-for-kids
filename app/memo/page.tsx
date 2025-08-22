import MemoGame from '@/components/games/memo/MemoGame';
import GameLayout from '@/components/shared/GameLayout';

export default function MemoPage() {
  return (
    <GameLayout 
      gradient="from-green-400 via-blue-400 to-purple-400" 
      decorations="minimal"
    >
      <MemoGame />
    </GameLayout>
  );
}