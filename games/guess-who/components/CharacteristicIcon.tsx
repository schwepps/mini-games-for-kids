'use client';

import { memo } from 'react';
import Image from 'next/image';
import { getCharacteristicImage } from '../lib/characteristicImages';

interface CharacteristicIconProps {
  characteristic: string;
  value: unknown;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  className?: string;
}

const sizeConfig = {
  sm: { width: 20, height: 20, className: 'w-5 h-5' },
  md: { width: 32, height: 32, className: 'w-8 h-8' },
  lg: { width: 48, height: 48, className: 'w-12 h-12' },
  responsive: { width: 48, height: 48, className: 'w-6 h-6 md:w-10 md:h-10' }
};

/**
 * Reusable component for displaying characteristic images
 * Used in both CharacterCard and QuestionBuilder components
 */
const CharacteristicIcon = memo(function CharacteristicIcon({ 
  characteristic, 
  value, 
  size = 'sm',
  className = ''
}: CharacteristicIconProps) {
  const imagePath = getCharacteristicImage(characteristic, value);
  
  if (!imagePath) {
    return null;
  }

  const config = sizeConfig[size];
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={imagePath}
        alt={`${characteristic}: ${String(value)}`}
        width={config.width}
        height={config.height}
        className={`${config.className} object-contain`}
        title={`${characteristic}: ${String(value)}`}
      />
    </div>
  );
});

export default CharacteristicIcon;