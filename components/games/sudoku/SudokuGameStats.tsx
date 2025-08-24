'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cardStyles } from '@/lib/styles/buttonUtils';

interface SudokuGameStatsProps {
  moves: number;
  gameTime: number;
  gridSize: number;
}

export default function SudokuGameStats({
  moves,
  gameTime,
  gridSize
}: SudokuGameStatsProps) {
  return (
    <motion.div 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-center"
    >
      <Card className={cardStyles.base}>
        <CardContent className="p-4">
          <div className="flex items-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">{moves}</div>
              <div className="text-sm text-gray-600 font-medium">Coups</div>
            </div>
            <div className="h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600 font-medium">Temps</div>
            </div>
            <div className="h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-purple-600">{gridSize}×{gridSize}</div>
              <div className="text-sm text-gray-600 font-medium">Grille</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}