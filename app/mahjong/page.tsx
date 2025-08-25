import MahjongGame from '@/components/games/mahjong/MahjongGame';
import GameLayout from '@/components/shared/GameLayout';

export default function MahjongPage() {
  return (
    <GameLayout 
      gradient="from-indigo-400 via-purple-400 to-pink-400" 
      decorations="minimal"
    >
      <MahjongGame />
    </GameLayout>
  );
}