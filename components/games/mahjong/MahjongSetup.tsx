'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MahjongDifficulty, DIFFICULTY_OPTIONS } from '@/types/mahjong';
import Image from 'next/image';

interface MahjongSetupProps {
  difficulty: MahjongDifficulty;
  onDifficultyChange: (difficulty: MahjongDifficulty) => void;
  onStartGame: () => void;
  loading: boolean;
}

export default function MahjongSetup({ 
  difficulty, 
  onDifficultyChange, 
  onStartGame, 
  loading 
}: MahjongSetupProps) {
  
  return (
    <div className="py-8 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
      >
        {/* Game Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <Image
            src="/images/logo/mahjong-logo-large.png"
            alt="MahJong - Jeu de logique"
            width={180}
            height={90}
            className="mx-auto drop-shadow-lg"
            priority
          />
        </motion.div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-white/50">
          <CardContent className="p-4 sm:p-6 text-center">
            
            {/* Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                🎮 C&apos;est parti !
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold mb-4">
                🎯 Quel niveau veux-tu jouer ?
              </p>
            </motion.div>

            {/* Difficulty Selection */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 max-w-4xl mx-auto"
            >
              {DIFFICULTY_OPTIONS.map((option, index) => {
                const isSelected = difficulty === option.difficulty;
                const configs = {
                  easy: {
                    emoji: '🌟',
                    bgClass: 'from-green-400 to-emerald-500',
                    hoverClass: 'hover:from-green-300 hover:to-emerald-400',
                    borderClass: 'border-green-400',
                    title: 'FACILE',
                    subtitle: 'Parfait pour commencer !',
                    icon: '😊'
                  },
                  medium: {
                    emoji: '🎯', 
                    bgClass: 'from-yellow-400 to-orange-500',
                    hoverClass: 'hover:from-yellow-300 hover:to-orange-400',
                    borderClass: 'border-yellow-400',
                    title: 'MOYEN',
                    subtitle: 'Plus de défi !',
                    icon: '🤔'
                  },
                  hard: {
                    emoji: '🚀',
                    bgClass: 'from-red-500 to-pink-600', 
                    hoverClass: 'hover:from-red-400 hover:to-pink-500',
                    borderClass: 'border-red-400',
                    title: 'DIFFICILE',
                    subtitle: 'Pour les champions !',
                    icon: '😎'
                  }
                };
                const config = configs[option.difficulty];
                
                return (
                  <motion.div
                    key={option.difficulty}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 border-4 ${
                        isSelected
                          ? `bg-gradient-to-r ${config.bgClass} text-white ${config.borderClass} shadow-2xl scale-105`
                          : `bg-white/90 hover:bg-white border-gray-300 ${config.hoverClass} hover:shadow-xl`
                      }`}
                      onClick={() => onDifficultyChange(option.difficulty)}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="text-center">
                          <div className="text-4xl sm:text-5xl mb-2">{config.emoji}</div>
                          <h3 className={`text-lg sm:text-xl font-bold mb-1 ${
                            isSelected ? 'text-white' : 'text-gray-800'
                          }`}>
                            {config.title}
                          </h3>
                          <p className={`text-sm sm:text-base font-semibold ${
                            isSelected ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {config.subtitle}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>


            {/* Start Game Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onStartGame}
                disabled={loading}
                size="lg"
                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-300 hover:via-blue-400 hover:to-purple-500 text-white font-bold text-lg lg:text-xl px-8 py-4 lg:py-6 rounded-full shadow-xl border-4 border-white min-w-[240px] transform transition-all"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mr-4"
                    />
                    <span className="text-base lg:text-lg">Préparation...</span>
                  </>
                ) : (
                  <>
                    <span className="mr-3 text-2xl">🚀</span>
                    <span>C&apos;EST PARTI !</span>
                  </>
                )}
              </Button>
            </motion.div>


          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}