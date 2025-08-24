'use client';

import { motion } from 'framer-motion';
import { formatTime } from '@/lib/games/sudoku/celebrationUtils';

interface SudokuPerformanceStatsProps {
  gridSize: number;
  moves: number;
  gameTime?: number;
  stars: number;
}

export default function SudokuPerformanceStats({
  gridSize,
  moves,
  gameTime,
  stars
}: SudokuPerformanceStatsProps) {
  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{gridSize}×{gridSize}</div>
            <div className="text-sm opacity-90">Grille</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{moves}</div>
            <div className="text-sm opacity-90">Coups</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {gameTime ? formatTime(gameTime) : '--:--'}
            </div>
            <div className="text-sm opacity-90">Temps</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-1 mb-6"
      >
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.7 + i * 0.1,
              type: "spring",
              stiffness: 300
            }}
            className={`text-3xl ${
              i < stars ? 'text-yellow-300' : 'text-white/30'
            }`}
          >
            ⭐
          </motion.span>
        ))}
      </motion.div>
    </>
  );
}