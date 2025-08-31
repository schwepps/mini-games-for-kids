'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GameStatusProps } from '@/types/tours-de-hanoi';

export default function GameStatus({
  moveCount,
  optimalMoves,
  timeElapsed
}: GameStatusProps) {
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEfficiency = (): number => {
    if (moveCount === 0) return 100;
    return Math.round((optimalMoves / moveCount) * 100);
  };

  const getEfficiencyGradient = (efficiency: number): string => {
    if (efficiency >= 90) return 'from-green-400 to-emerald-400';
    if (efficiency >= 70) return 'from-yellow-400 to-orange-400';
    if (efficiency >= 50) return 'from-orange-400 to-red-400';
    return 'from-red-400 to-pink-400';
  };

  const efficiency = getEfficiency();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center"
    >
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-4 border-white/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Moves Counter */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl mb-1">👆</div>
                <div className="text-3xl font-bold mb-1">{moveCount}</div>
                <div className="text-sm opacity-90">Coups</div>
              </div>
            </motion.div>

            {/* Optimal Moves */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-3xl font-bold mb-1">{optimalMoves}</div>
                <div className="text-sm opacity-90">Optimal</div>
              </div>
            </motion.div>

            {/* Timer */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-3xl font-bold mb-1">{formatTime(timeElapsed)}</div>
                <div className="text-sm opacity-90">Temps</div>
              </div>
            </motion.div>

            {/* Efficiency */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`bg-gradient-to-r ${getEfficiencyGradient(efficiency)} text-white rounded-2xl p-4 shadow-lg`}>
                <div className="text-2xl mb-1">
                  {efficiency >= 90 ? '🌟' : efficiency >= 70 ? '⭐' : efficiency >= 50 ? '🔥' : '💪'}
                </div>
                <div className="text-3xl font-bold mb-1">{efficiency}%</div>
                <div className="text-sm opacity-90">Performance</div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}