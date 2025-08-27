'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Lightbulb, LightbulbOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameButton } from '@/lib/styles/buttonUtils';

interface SudokuGameControlsProps {
  hints: boolean;
  isInteractionDisabled: boolean;
  onToggleHints: () => void;
  onChangeDifficulty: () => void;
  onNewGame: () => void;
}

export default function SudokuGameControls({
  hints,
  isInteractionDisabled,
  onToggleHints,
  onChangeDifficulty,
  onNewGame
}: SudokuGameControlsProps) {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center mt-8"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onToggleHints}
            size="lg"
            className={gameButton(hints ? 'hints' : 'hintsOff', hints ? 'shadow-yellow-400/30' : 'shadow-gray-400/30')}
            disabled={isInteractionDisabled}
          >
            {hints ? (
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

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onChangeDifficulty}
            size="lg"
            className={gameButton('difficulty', 'shadow-blue-400/30')}
            disabled={isInteractionDisabled}
          >
            <Settings className="w-5 h-5 mr-2" />
            Changer Difficulté
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onNewGame}
            size="lg"
            className={gameButton('newGame', 'shadow-green-400/30')}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Nouvelle Partie
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}