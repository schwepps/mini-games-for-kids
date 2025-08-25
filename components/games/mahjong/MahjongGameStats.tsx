'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface MahjongGameStatsProps {
  stats: {
    moves: number;
    matchedPairs: number;
    totalPairs: number;
    hintsRemaining: number;
    gameTime: number;
  };
}

export default function MahjongGameStats({ stats }: MahjongGameStatsProps) {
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = stats.totalPairs > 0 
    ? (stats.matchedPairs / stats.totalPairs) * 100 
    : 0;

  const efficiency = stats.moves > 0 
    ? Math.min(100, Math.round((stats.totalPairs / stats.moves) * 100))
    : 100;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        
        {/* Progress */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg">
          <CardContent className="p-3 lg:p-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <div className="text-xl lg:text-2xl font-bold">
                {stats.matchedPairs}/{stats.totalPairs}
              </div>
              <div className="text-xs lg:text-sm opacity-90">Paires</div>
              
              {/* Progress Bar */}
              <div className="mt-2 bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white rounded-full h-2"
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Moves */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
          <CardContent className="p-3 lg:p-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="text-xl lg:text-2xl font-bold">{stats.moves}</div>
              <div className="text-xs lg:text-sm opacity-90">Coups</div>
              <div className="text-xs opacity-75 mt-1">
                {efficiency}% efficace
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Time */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
          <CardContent className="p-3 lg:p-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="text-xl lg:text-2xl font-bold">
                {formatTime(stats.gameTime)}
              </div>
              <div className="text-xs lg:text-sm opacity-90">Temps</div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Hints */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
          <CardContent className="p-3 lg:p-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <div className="text-xl lg:text-2xl font-bold">
                {stats.hintsRemaining}
              </div>
              <div className="text-xs lg:text-sm opacity-90">
                Aide{stats.hintsRemaining !== 1 ? 's' : ''}
              </div>
              <div className="text-xs opacity-75 mt-1">
                💡 {stats.hintsRemaining > 0 ? 'Disponible' : 'Épuisées'}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-Only Expanded Stats */}
      <div className="lg:hidden mt-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-white text-sm">
              <span>Progression</span>
              <span className="font-bold">
                {Math.round(progressPercentage)}% terminé
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}