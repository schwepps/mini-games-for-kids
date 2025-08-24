'use client';

import { motion } from 'framer-motion';

interface SudokuLoadingStateProps {
  message?: string;
}

export default function SudokuLoadingState({ 
  message = "Préparation..." 
}: SudokuLoadingStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-8 border-white border-t-orange-400 rounded-full mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-white mb-2">{message}</h2>
        <p className="text-white/80 text-lg">Génération du puzzle en cours !</p>
      </div>
    </div>
  );
}