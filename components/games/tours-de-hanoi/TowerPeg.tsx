'use client';

import { motion } from 'framer-motion';

import { TowerPegProps } from '@/types/tours-de-hanoi';
import CharacterDisc from './CharacterDisc';

export default function TowerPeg({
  tower,
  isSelected,
  canReceiveDisc,
  onSelectTower,
  onSelectDisc,
  selectedDisc,
  characterCount
}: TowerPegProps) {
  
  const handleClick = () => {
    onSelectTower(tower.id);
  };

  const getBaseStyle = () => {
    if (tower.isSource) return 'bg-red-500';
    if (tower.isTarget) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="flex flex-col items-center">
      {/* Tower Structure */}
      <div className="relative flex flex-col-reverse items-center">
        {/* Base Platform */}
        <motion.div
          className={`w-24 sm:w-28 md:w-40 lg:w-48 h-6 sm:h-7 md:h-10 lg:h-12 ${getBaseStyle()} rounded-xl shadow-lg border-4 border-white/30 cursor-pointer transition-all duration-200 ${
            canReceiveDisc ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
          } ${
            isSelected ? 'ring-4 ring-white scale-105' : ''
          }`}
          onClick={handleClick}
          whileHover={{ scale: canReceiveDisc ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: canReceiveDisc ? [1, 1.02, 1] : 1,
            boxShadow: canReceiveDisc ? [
              '0 10px 25px rgba(0,0,0,0.2)',
              '0 15px 35px rgba(255,215,0,0.3)',
              '0 10px 25px rgba(0,0,0,0.2)'
            ] : '0 10px 25px rgba(0,0,0,0.2)'
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          {/* Peg/Rod */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 sm:w-2 md:w-3 lg:w-4 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full shadow-inner" 
               style={{ height: `${Math.max(140, tower.discs.length * 35 + 50)}px`, bottom: '100%' }}>
          </div>
        </motion.div>

        {/* Character Stack */}
        <div className="absolute bottom-6 sm:bottom-7 md:bottom-10 lg:bottom-12 flex flex-col-reverse items-center">
          {tower.discs.map((disc, index) => (
            <CharacterDisc
              key={disc.id}
              disc={disc}
              isSelected={selectedDisc?.id === disc.id}
              isTopDisc={index === tower.discs.length - 1}
              canMove={index === tower.discs.length - 1}
              onClick={() => onSelectDisc(disc)}
              position={index}
              characterCount={characterCount}
            />
          ))}
        </div>

        {/* Drop Zone Indicator */}
        {canReceiveDisc && (
          <motion.div
            className="absolute bottom-6 sm:bottom-7 md:bottom-10 lg:bottom-12 w-16 sm:w-20 md:w-28 lg:w-32 h-16 sm:h-20 md:h-28 lg:h-32 border-4 border-dashed border-yellow-400 rounded-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-2xl">✨</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}