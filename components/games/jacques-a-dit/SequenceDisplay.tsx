'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SequenceDisplayProps } from '@/types/jacques-a-dit';

export default function SequenceDisplay({
  currentRound,
  targetLength,
  mistakes,
  gamePhase
}: SequenceDisplayProps) {
  
  const getPhaseMessage = () => {
    switch (gamePhase) {
      case 'ready':
        return "Prépare-toi ! 🎮";
      case 'showing':
        return "Jacques a dit... Mémorise la séquence ! 👀";
      case 'waiting':
        return "C'est parti ! 🚀";
      case 'playing':
        return "À ton tour ! Répète la séquence 👆";
      case 'wrong':
        return "Oups ! Essaie encore 😅";
      case 'won':
        return "Bravo ! Tu as gagné ! 🎉";
      default:
        return "";
    }
  };

  const getPhaseColor = () => {
    switch (gamePhase) {
      case 'showing':
        return 'from-blue-400 to-purple-400';
      case 'playing':
        return 'from-green-400 to-blue-400';
      case 'wrong':
        return 'from-red-400 to-orange-400';
      case 'won':
        return 'from-yellow-400 to-green-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const progress = (currentRound / targetLength) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      {/* Phase Message */}
      <motion.div
        key={gamePhase} // Re-animate when phase changes
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-4"
      >
        <Card className={`bg-gradient-to-r ${getPhaseColor()} border-none shadow-lg inline-block`}>
          <CardContent className="px-6 py-3">
            <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-sm">
              {getPhaseMessage()}
            </h3>
          </CardContent>
        </Card>
      </motion.div>

      {/* Game Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        
        {/* Current Round */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
              {currentRound}
            </div>
            <div className="text-sm text-gray-600">
              Tour actuel
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
              {currentRound}/{targetLength}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Progression
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Star Rating based on mistakes */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-1">
              {mistakes === 0 ? '🌟🌟🌟' : 
               mistakes <= 2 ? '🌟🌟⭐' : 
               mistakes <= 5 ? '🌟⭐⭐' : 
               '⭐⭐⭐'}
            </div>
            <div className="text-sm text-gray-600">
              {mistakes === 0 ? 'Parfait !' : 
               mistakes <= 2 ? 'Très bien !' : 
               mistakes <= 5 ? 'Pas mal !' : 
               'Continue !'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {mistakes} erreur{mistakes !== 1 ? 's' : ''}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pulse animation for showing phase */}
      {gamePhase === 'showing' && (
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-3 h-3 bg-blue-400 rounded-full"
            />
            <span className="text-white/90 text-sm">
              Regarde bien...
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}