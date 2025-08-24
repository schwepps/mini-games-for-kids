'use client';

import { motion } from 'framer-motion';

interface ConfettiPieceProps {
  delay?: number;
}

export default function ConfettiPiece({ delay = 0 }: ConfettiPieceProps) {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7B267', '#E74C3C'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded"
      style={{ backgroundColor: color }}
      initial={{ 
        y: -100, 
        x: Math.random() * window.innerWidth,
        rotate: 0,
        scale: Math.random() * 0.5 + 0.5
      }}
      animate={{
        y: window.innerHeight + 100,
        rotate: Math.random() * 720 - 360,
        x: Math.random() * window.innerWidth
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        delay,
        ease: "linear"
      }}
    />
  );
}