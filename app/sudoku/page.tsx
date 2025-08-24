import SudokuGame from '@/components/games/sudoku/SudokuGame';
import GameLayout from '@/components/shared/GameLayout';

export default function SudokuPage() {
  return (
    <GameLayout 
      gradient="from-orange-400 via-red-400 to-pink-400" 
      decorations="minimal"
    >
      <SudokuGame />
    </GameLayout>
  );
}