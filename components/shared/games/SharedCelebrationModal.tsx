'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ANIMATION_DURATIONS, 
  GAME_COLORS, 
  GAME_TEXT,
  PERFORMANCE_HELPERS 
} from '@/lib/constants/gameConstants';

export interface CelebrationConfig {
  /** Game logo path */
  logoPath: string;
  /** Game logo alt text */
  logoAlt: string;
  /** Custom title override */
  customTitle?: string;
  /** Custom subtitle override */
  customSubtitle?: string;
  /** Game-specific statistics to display */
  gameStats: Array<{
    label: string;
    value: string | number;
    gradient: string;
  }>;
  /** Function to calculate efficiency percentage */
  calculateEfficiency: () => number;
  /** Function to get game-specific victory message */
  getVictoryMessage?: () => string;
}

export interface SharedCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNewGame: () => void;
  config: CelebrationConfig;
}

export default function SharedCelebrationModal({
  open,
  onOpenChange,
  onNewGame,
  config
}: SharedCelebrationModalProps) {
  
  const efficiency = config.calculateEfficiency();
  const performance = PERFORMANCE_HELPERS.getPerformanceRating(efficiency);
  const starRating = PERFORMANCE_HELPERS.getStarRating(efficiency);

  const handleNewGameClick = () => {
    onOpenChange(false);
    // Small delay to let modal close before starting new game
    setTimeout(() => {
      onNewGame();
    }, ANIMATION_DURATIONS.MODAL_DELAY);
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl p-0 border-0 bg-transparent">
            <DialogTitle className="sr-only">
              {config.customTitle || GAME_TEXT.CELEBRATION.TITLE}
            </DialogTitle>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
              className="relative"
            >
              {/* Confetti Background Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
                    initial={{ 
                      x: Math.random() * 600,
                      y: -20,
                      rotate: 0,
                      scale: 0
                    }}
                    animate={{ 
                      x: Math.random() * 600,
                      y: 600,
                      rotate: 360,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>

              <Card className={`bg-gradient-to-br ${GAME_COLORS.GRADIENTS.CELEBRATION} shadow-2xl border-4 border-white/80`}>
                <CardContent className="p-8 text-center">
                  
                  {/* Logo */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                    className="mb-6"
                  >
                    <Image
                      src={config.logoPath}
                      alt={config.logoAlt}
                      width={200}
                      height={100}
                      className="mx-auto drop-shadow-xl"
                    />
                  </motion.div>

                  {/* Victory Message */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                    className="mb-8"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                      {config.customTitle || GAME_TEXT.CELEBRATION.TITLE}
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold text-purple-700 mb-2">
                      {config.customSubtitle || GAME_TEXT.CELEBRATION.SUBTITLE}
                    </p>
                    {config.getVictoryMessage && (
                      <p className="text-lg text-purple-600">
                        {config.getVictoryMessage()}
                      </p>
                    )}
                  </motion.div>

                  {/* Performance Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6">
                      <div className="text-6xl mb-3">{performance.emoji}</div>
                      <h2 className={`text-2xl md:text-3xl font-bold ${performance.color} mb-2`}>
                        {performance.rating}
                      </h2>
                      <p className="text-purple-600 font-medium">
                        Performance : {efficiency}%
                      </p>
                    </div>
                  </motion.div>

                  {/* Game Statistics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                  >
                    {config.gameStats.map((stat, index) => (
                      <div key={index} className={`bg-gradient-to-r ${stat.gradient} text-white rounded-xl p-4`}>
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Star Rating Display */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mb-8"
                  >
                    <div className="flex justify-center gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <motion.span
                          key={i}
                          className={`text-4xl ${
                            i < starRating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 1.2 + (i * ANIMATION_DURATIONS.STAR_ANIMATION_DELAY / 1000),
                            type: "spring",
                            stiffness: 300
                          }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="space-y-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleNewGameClick}
                        size="lg"
                        className={`bg-gradient-to-r ${GAME_COLORS.GRADIENTS.BUTTON} hover:from-green-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-xl border-4 border-white/50`}
                      >
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="mr-3"
                        >
                          🎮
                        </motion.span>
                        {GAME_TEXT.CELEBRATION.NEW_GAME}
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="ml-3"
                        >
                          ✨
                        </motion.span>
                      </Button>
                    </motion.div>
                    
                    <p className="text-sm text-gray-600">
                      {GAME_TEXT.CELEBRATION.CLOSE_HINT}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}