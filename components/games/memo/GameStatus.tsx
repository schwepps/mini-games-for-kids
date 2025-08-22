'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GameStatusProps } from '@/types/memo';

export default function GameStatus({
  moves,
  matchedPairs,
  totalPairs,
  startTime
}: GameStatusProps) {
  
  // Calculate progress percentage
  const progressPercentage = totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;
  
  // Calculate game time
  const gameTime = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0;
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Get encouraging message based on progress
  const getEncouragingMessage = () => {
    const percentage = progressPercentage;
    if (percentage === 0) return "C'est parti ! 🚀";
    if (percentage < 25) return "Bien joué ! Continue ! 💪";
    if (percentage < 50) return "Tu progresses ! 🌟";
    if (percentage < 75) return "Excellent ! Tu y arrives ! 🎯";
    if (percentage < 100) return "Presque fini ! 🏆";
    return "Fantastique ! 🎉";
  };

  // Get performance feedback based on moves efficiency
  const getPerformanceFeedback = () => {
    if (totalPairs === 0) return '';
    
    const idealMoves = totalPairs; // Perfect game = one move per pair
    const efficiency = moves > 0 ? (idealMoves / moves) * 100 : 100;
    
    if (efficiency >= 80) return "Performance exceptionnelle ! 🌟";
    if (efficiency >= 60) return "Très bonne mémoire ! 👏";
    if (efficiency >= 40) return "Continue, tu progresses ! 💪";
    if (efficiency >= 20) return "N'abandonne pas ! 🎯";
    return "Chaque essai t'améliore ! 🚀";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        key={`status-${matchedPairs}-${moves}`}
      >
        {matchedPairs} paires trouvées sur {totalPairs}, {moves} essais effectués. {getEncouragingMessage()}
      </div>
      
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-4 border-white/50">
        <CardContent className="p-6">
          
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            
            {/* Moves Counter */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold mb-1">{moves}</div>
                <div className="text-sm opacity-90">
                  {moves === 0 ? 'Aucun essai' : moves === 1 ? 'Essai' : 'Essais'}
                </div>
              </div>
            </motion.div>

            {/* Progress Display */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold mb-1">{matchedPairs}/{totalPairs}</div>
                <div className="text-sm opacity-90">
                  {matchedPairs === 1 ? 'Paire trouvée' : 'Paires trouvées'}
                </div>
              </div>
            </motion.div>

            {/* Timer */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold mb-1">{timeDisplay}</div>
                <div className="text-sm opacity-90">Temps de jeu</div>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progression</span>
              <span className="text-sm font-bold text-purple-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            >
              <Progress 
                value={progressPercentage} 
                className="h-4 bg-gray-200"
                aria-label={`Progression du jeu: ${Math.round(progressPercentage)}% completé`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPercentage)}
                role="progressbar"
              />
            </motion.div>
            
            {/* Progress indicators */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Début</span>
              <span className="font-medium text-purple-600">
                {matchedPairs} sur {totalPairs}
              </span>
              <span>Victoire ! 🏆</span>
            </div>
          </div>

          {/* Encouraging Message */}
          <motion.div
            className="text-center"
            key={progressPercentage} // Re-animate when progress changes
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4">
              <p className="text-lg font-bold text-purple-700 mb-1">
                {getEncouragingMessage()}
              </p>
              {moves > 0 && (
                <p className="text-sm text-purple-600">
                  {getPerformanceFeedback()}
                </p>
              )}
            </div>
          </motion.div>

          {/* Performance Stars (visual feedback) */}
          {matchedPairs > 0 && (
            <motion.div
              className="flex justify-center gap-1 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: totalPairs }, (_, index) => (
                <motion.span
                  key={index}
                  className={`text-2xl ${
                    index < matchedPairs ? 'grayscale-0' : 'grayscale opacity-30'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: index < matchedPairs ? [0, 1.3, 1] : 1,
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring"
                  }}
                >
                  ⭐
                </motion.span>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}