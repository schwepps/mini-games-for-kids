'use client';

import { memo, JSX } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { pictogramMapping } from '@/lib/games/guess-who/characteristicImages';
import { IProfile } from '@/types/game';
import { IMAGE_DIMENSIONS } from './constants';

interface CharacteristicSelectorProps {
  profile: IProfile;
  selectedCharacteristic: string | null;
  onCharacteristicSelect: (characteristic: string) => void;
  disabled: boolean;
}

/**
 * Component responsible for displaying and selecting question characteristics
 * Pure presentation component following Single Responsibility Principle
 */
const CharacteristicSelector = memo(function CharacteristicSelector({
  profile,
  selectedCharacteristic,
  onCharacteristicSelect,
  disabled
}: CharacteristicSelectorProps): JSX.Element {
  
  return (
    <div>
      <h3 className="text-white font-medium mb-3 text-center">
        Que veux-tu savoir ?
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(profile.characteristicSchema).map(([key, schema]) => {
          const isSelected = selectedCharacteristic === key;
          
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onCharacteristicSelect(key)}
                disabled={disabled}
                variant={isSelected ? "default" : "outline"}
                className={`h-32 w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-100 hover:bg-blue-200 border-blue-500 text-blue-700' 
                    : 'bg-white/90 hover:bg-white border-gray-200 hover:border-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-2">
                  {pictogramMapping[key] && (
                    <Image
                      src={pictogramMapping[key]}
                      alt={schema.displayName}
                      width={IMAGE_DIMENSIONS.default.width}
                      height={IMAGE_DIMENSIONS.default.height}
                      className="object-contain"
                    />
                  )}
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

export default CharacteristicSelector;