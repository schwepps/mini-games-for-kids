'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Lightbulb, LightbulbOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameButton } from '@/lib/styles/buttonUtils';

import { GameControlsProps } from '@/types/tours-de-hanoi';

export default function GameControls({
  onReset,
  onNewGame,
  onToggleHint,
  showHint
}: GameControlsProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
    >
      {/* Hint Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onToggleHint}
          size="lg"
          className={gameButton(showHint ? 'hints' : 'hintsOff', showHint ? 'shadow-yellow-400/30' : 'shadow-gray-400/30')}
        >
          {showHint ? (
            <>
              <Lightbulb className="w-5 h-5 mr-2" />
              Aide ON
            </>
          ) : (
            <>
              <LightbulbOff className="w-5 h-5 mr-2" />
              Aide OFF
            </>
          )}
        </Button>
      </motion.div>

      {/* Reset Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onReset}
          size="lg"
          className={gameButton('newGame', 'shadow-green-400/30')}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Recommencer
        </Button>
      </motion.div>

      {/* Change Difficulty Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onNewGame}
          size="lg"
          className={gameButton('difficulty', 'shadow-blue-400/30')}
        >
          <Settings className="w-5 h-5 mr-2" />
          Changer Difficulté
        </Button>
      </motion.div>
    </motion.div>
  );
}