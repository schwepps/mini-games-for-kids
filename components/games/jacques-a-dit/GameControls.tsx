'use client';

import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameButton, outlineButton } from '@/lib/styles/buttonUtils';

interface GameControlsProps {
  onNewGame: () => void;
  onChangeDifficulty: () => void;
  disabled: boolean;
}

export default function GameControls({
  onNewGame,
  onChangeDifficulty,
  disabled
}: GameControlsProps) {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center mt-8"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onNewGame}
            size="lg"
            className={gameButton('difficulty', 'shadow-blue-400/30')}
            disabled={disabled}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Nouvelle Partie
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onChangeDifficulty}
            size="lg"
            className={outlineButton()}
            disabled={disabled}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Changer Difficulté
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}