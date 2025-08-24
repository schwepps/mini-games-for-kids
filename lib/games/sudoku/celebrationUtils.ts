export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getPerformanceMessage(moves: number, gridSize: number, gameTime: number): {
  title: string;
  message: string;
  emoji: string;
  stars: number;
} {
  const optimalMoves = gridSize * gridSize * 0.6; // Rough estimate
  const moveRatio = moves / optimalMoves;
  const timeMinutes = gameTime / 60;

  if (moveRatio <= 1.2 && timeMinutes <= 5) {
    return {
      title: "Incroyable !",
      message: "Tu es un vrai génie du Sudoku ! 🌟",
      emoji: "🏆",
      stars: 5
    };
  } else if (moveRatio <= 1.5 && timeMinutes <= 8) {
    return {
      title: "Excellent !",
      message: "Fantastique travail ! 🎉",
      emoji: "🎖️",
      stars: 4
    };
  } else if (moveRatio <= 2 && timeMinutes <= 12) {
    return {
      title: "Bien joué !",
      message: "Tu t'améliores de plus en plus ! 👏",
      emoji: "🥉",
      stars: 3
    };
  } else {
    return {
      title: "Bravo !",
      message: "Tu as fini le puzzle ! Continue comme ça ! 💪",
      emoji: "🎯",
      stars: 2
    };
  }
}