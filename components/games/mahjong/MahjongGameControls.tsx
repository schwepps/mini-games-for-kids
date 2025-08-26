'use client';

import { motion } from 'framer-motion';
import { Lightbulb, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      transition={{ delay: 0.5 }}
      className="mt-20"
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-2 mt-20">
        
        {/* Hint Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onShowHint}
            disabled={isInteractionDisabled || hints === 0}
            size="default"
            className={`
              ${hints > 0 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500' 
                : 'bg-gray-400 cursor-not-allowed'
              } 
              text-white font-bold px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-full shadow-lg border-2 border-white/50 text-xs sm:text-sm lg:text-base
            `}
          >
            <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
            <span>
              Aide ({hints})
            </span>
          </Button>
        </motion.div>


        {/* New Game Button - Always Available */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onNewGame}
            size="default"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-full shadow-lg border-2 border-white/50 text-xs sm:text-sm lg:text-base"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
            <span>Nouveau</span>
          </Button>
        </motion.div>

        {/* Settings Button - Always Available */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onChangeDifficulty}
            size="default"
            variant="outline"
            className="border-2 border-white/70 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-medium px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
            <span>Difficulté</span>
          </Button>
        </motion.div>
      </div>

      {/* Mobile-Friendly Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 max-w-md mx-auto lg:hidden">
          <p className="text-white/90 text-sm">
            {hints === 0 ? (
              <>🎯 <strong>Plus d&apos;aides</strong> - Continue avec tes propres compétences !</>
            ) : (
              <>💡 <strong>Bloqué ?</strong> - Utilise une aide pour voir une paire possible</>
            )}
          </p>
        </div>

        {/* Desktop Tips */}
        <div className="hidden lg:block mt-2">
          <p className="text-white/80 text-sm">
            {hints === 0 ? (
              '🎯 Plus d&apos;aides disponibles - Continue avec tes compétences !'
            ) : (
              '💡 Utilise les aides si tu es bloqué • 🎮 Sélectionne 2 tuiles identiques pour les éliminer'
            )}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}