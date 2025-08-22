'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { 
  Trophy, 
  Star, 
  Crown,
  Sparkles,
  Target
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

import CharacterAvatar from '@/components/CharacterAvatar';
import { ICharacter } from '@/types/game';
import { usePerformanceRating } from '@/hooks/shared/usePerformanceRating';

interface CelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hiddenCharacter: ICharacter | null;
  questionsAsked: number;
  onNewGame: () => void;
}

export default function CelebrationModal({ 
  open, 
  onOpenChange, 
  hiddenCharacter, 
  questionsAsked,
  onNewGame 
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // Use performance rating hook for efficiency calculation (not displayed in GuessWho UI)
  usePerformanceRating({
    gameType: 'guessWho',
    metrics: { attempts: questionsAsked }
  });

  // Local GuessWho-specific rating system (3 stars instead of 5)
  const getGuessWhoRating = () => {
    if (questionsAsked <= 3) return { stars: 3, text: 'Incroyable !', emoji: '🌟', color: 'text-yellow-500' };
    if (questionsAsked <= 6) return { stars: 2, text: 'Très bien !', emoji: '⭐', color: 'text-yellow-400' };
    return { stars: 1, text: 'Bien joué !', emoji: '👍', color: 'text-blue-500' };
  };

  const rating = getGuessWhoRating();

  const handleNewGame = () => {
    onOpenChange(false);
    // Small delay to allow modal to close before starting new game
    setTimeout(() => {
      onNewGame();
    }, 300);
  };

  return (
    <>
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD', '#F0E68C']}
        />
      )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-yellow-100 to-pink-100 border-4 border-yellow-400">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.2
              }}
              className="mx-auto mb-4"
            >
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-12 h-12 text-yellow-800" />
              </div>
            </motion.div>

            <DialogTitle className="text-3xl font-bold text-gray-800 mb-2">
              🎉 Tu as Gagné ! 🎉
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Character reveal */}
            {hiddenCharacter && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-300">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Tu as trouvé le personnage caché !
                  </h3>
                  
                  <div className="relative inline-block">
                    <CharacterAvatar
                      characterName={hiddenCharacter.name}
                      imageName={hiddenCharacter.image}
                      size="lg"
                      className="mx-auto rounded-xl shadow-md"
                    />
                    
                    {/* Crown decoration */}
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-600"
                    >
                      <Crown className="w-6 h-6 text-yellow-800" />
                    </motion.div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mt-4">
                    {hiddenCharacter.name}
                  </h4>
                  
                  {hiddenCharacter.metadata?.description && (
                    <p className="text-gray-600 text-sm mt-2">
                      {hiddenCharacter.metadata.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Performance stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl p-4 shadow-md border-2 border-pink-200"
            >
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Ta Performance</span>
                </div>
                
                {/* Star rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1 + (i * 0.1),
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          i < rating.stars 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Badge 
                    className={`text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white`}
                  >
                    {rating.emoji} {rating.text}
                  </Badge>
                  
                  <p className="text-gray-600 text-sm">
                    Tu l&apos;as trouvé en <strong>{questionsAsked}</strong> question{questionsAsked !== 1 ? 's' : ''} !
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Fun facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Le Savais-tu ?</span>
                </div>
                <p className="text-sm text-gray-600">
                  {questionsAsked <= 3 && "Tu es un vrai détective ! 🕵️‍♀️"}
                  {questionsAsked > 3 && questionsAsked <= 6 && "Belle stratégie ! 🧠"}
                  {questionsAsked > 6 && "La pratique rend parfait ! Continue à jouer ! 🎮"}
                </p>
              </div>
            </motion.div>

            {/* Play again button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  onClick={handleNewGame}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 hover:from-purple-600 hover:via-pink-600 hover:to-red-500 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-2xl border-4 border-white transform transition-all duration-200 hover:shadow-3xl"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-3 text-2xl"
                  >
                    🔄
                  </motion.div>
                  <span className="drop-shadow-sm">Rejouer !</span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="ml-3 text-2xl"
                  >
                    🎉
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}