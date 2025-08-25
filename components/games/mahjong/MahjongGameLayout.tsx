'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Image from 'next/image';

interface MahjongGameLayoutProps {
  children: ReactNode;
  dynamicSpacing: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

/**
 * Pure layout component for Mahjong game structure
 * Handles consistent layout, loading states, and error states
 */
export default function MahjongGameLayout({ 
  children, 
  dynamicSpacing, 
  loading = false, 
  error = null,
  onRetry 
}: MahjongGameLayoutProps) {
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-8 border-white border-t-indigo-400 rounded-full mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Préparation...</h2>
          <p className="text-white/80 text-lg">Mélange des tuiles en cours !</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oups !</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            >
              Réessayer
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  // Main game layout
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 pb-8">
        
        {/* Game Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <Image
            src="/images/logo/mahjong-logo-large.png"
            alt="MahJong - Jeu de logique"
            width={200}
            height={100}
            className="mx-auto drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* Game Content with Dynamic Spacing */}
        <div className={`flex flex-col items-center justify-center transition-all duration-300 ${dynamicSpacing}`}>
          {children}
        </div>
      </div>
    </div>
  );
}