'use client';

import { motion } from 'framer-motion';
import { Lightbulb, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameButton, outlineButton } from '@/lib/styles/buttonUtils';

interface MahjongGameControlsProps {
  hints: number;
  isInteractionDisabled: boolean;
  onShowHint: () => void;
  onNewGame: () => void;
  onChangeDifficulty: () => void;
}

export default function MahjongGameControls({
  hints,
  isInteractionDisabled,
  onShowHint,
  onNewGame,
  onChangeDifficulty
}: MahjongGameControlsProps) {

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center mt-8"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onShowHint}
            disabled={isInteractionDisabled || hints === 0}
            size="lg"
            className={hints > 0 ? gameButton('mahjongHint', 'shadow-yellow-400/30') : gameButton('hintsOff', 'shadow-gray-400/30')}
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Aide ({hints})
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onNewGame}
            size="lg"
            className={gameButton('newGame', 'shadow-green-400/30')}
            disabled={isInteractionDisabled}
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
            disabled={isInteractionDisabled}
          >
            <Settings className="w-5 h-5 mr-2" />
            Changer Difficulté
          </Button>
        </motion.div>
      </div>

      {/* Game Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 max-w-md mx-auto"
      >
        <p className="text-white/80 text-sm text-center">
          {hints === 0 ? (
            '🎯 Plus d&apos;aides disponibles - Continue avec tes compétences !'
          ) : (
            '💡 Utilise les aides si tu es bloqué • 🎮 Sélectionne 2 tuiles identiques'
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}