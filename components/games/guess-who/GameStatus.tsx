'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ICharacter } from '@/types/shared';
import { IQuestion } from '@/types/guess-who';
import { 
  Users, 
  MessageCircle, 
  Target, 
  Trophy,
  AlertCircle,
  Clock
} from 'lucide-react';

interface GameStatusProps {
  remainingCharacters: ICharacter[];
  questionsAsked: IQuestion[];
  gameState: 'playing' | 'won' | 'lost';
  hiddenCharacter: ICharacter | null;
}

const GameStatus = memo(function GameStatus({ 
  remainingCharacters, 
  questionsAsked, 
  gameState,
  hiddenCharacter 
}: GameStatusProps) {
  const totalCharacters = 12; // Character profile has 12 characters
  const progress = ((totalCharacters - remainingCharacters.length) / totalCharacters) * 100;
  const questionsCount = questionsAsked.length;
  

  const getGameStateIcon = () => {
    switch (gameState) {
      case 'playing':
        return remainingCharacters.length === 1 ? 
          <Target className="w-6 h-6 text-yellow-500" /> :
          <Clock className="w-6 h-6 text-blue-500" />;
      case 'won':
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 'lost':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Users className="w-6 h-6 text-gray-500" />;
    }
  };

  const getGameStateText = () => {
    switch (gameState) {
      case 'playing':
        if (remainingCharacters.length === 1) {
          return 'Presque ! Fais ta supposition !';
        }
        return 'Continue à poser des questions !';
      case 'won':
        return 'Félicitations ! Tu as gagné ! 🎉';
      case 'lost':
        return 'Plus de chance la prochaine fois ! 😊';
      default:
        return 'Prêt à jouer !';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Characters Remaining */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Personnages</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  key={remainingCharacters.length} // Trigger animation on change
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-white"
                >
                  {remainingCharacters.length}
                </motion.div>
                <span className="text-white/80">restants</span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2">
                <Progress 
                  value={progress} 
                  className="h-2 bg-white/20"
                />
                <div className="text-xs text-white/60 mt-1">
                  {totalCharacters - remainingCharacters.length} éliminés
                </div>
              </div>
            </div>

            {/* Questions Asked */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Questions</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  key={questionsCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-white"
                >
                  {questionsCount}
                </motion.div>
                <span className="text-white/80">posées</span>
              </div>
              
              {/* Quality indicator */}
              <div className="mt-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    questionsCount <= 5 ? 'bg-green-100 text-green-700' :
                    questionsCount <= 8 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {questionsCount <= 5 ? '🌟 Super !' : 
                   questionsCount <= 8 ? '👍 Bien' : 
                   '🤔 Beaucoup de questions'}
                </Badge>
              </div>
            </div>

            {/* Game Status */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getGameStateIcon()}
                <span className="text-white font-medium">Statut</span>
              </div>
              <div className="text-white text-sm font-medium">
                {getGameStateText()}
              </div>
              
              {/* Special indicators */}
              {remainingCharacters.length === 1 && gameState === 'playing' && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity 
                  }}
                  className="mt-2"
                >
                  <Badge className="bg-yellow-400 text-yellow-900 font-bold">
                    🎯 SUPPOSITION FINALE !
                  </Badge>
                </motion.div>
              )}
              
              {gameState === 'won' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                  className="mt-2"
                >
                  <Badge className="bg-yellow-400 text-yellow-900 font-bold">
                    🏆 GAGNANT !
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>

          {/* Special messages */}
          {remainingCharacters.length === 0 && gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center bg-red-100 border border-red-200 rounded-lg p-3"
            >
              <div className="text-red-600 font-medium">
                😅 Oups ! Tous les personnages ont été éliminés. Le personnage caché était <strong>{hiddenCharacter?.name}</strong> !
              </div>
            </motion.div>
          )}

          {gameState === 'lost' && hiddenCharacter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center bg-blue-100 border border-blue-200 rounded-lg p-3"
            >
              <div className="text-blue-600 font-medium">
                Le personnage caché était <strong>{hiddenCharacter.name}</strong> ! Réessaie ! 🎮
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default GameStatus;