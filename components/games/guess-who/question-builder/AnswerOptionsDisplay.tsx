'use client';

import { memo, JSX } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CharacterFilter } from '@/lib/characterFilter';
import { characteristicImages } from '@/lib/games/guess-who/characteristicImages';
import { kidFriendlyColors } from '@/lib/uiConstants';
import { IProfile, ICharacter } from '@/types/shared';
import { BUTTON_STYLES, BADGE_STYLES, IMAGE_DIMENSIONS } from './constants';

interface AnswerOptionsDisplayProps {
  selectedCharacteristic: string;
  profile: IProfile;
  remainingCharacters: ICharacter[];
  onValueSelect: (characteristic: string, value: unknown) => void;
  disabled: boolean;
}

/**
 * Component responsible for displaying possible answer options for the selected characteristic
 * Handles both boolean and enum characteristics with character counting
 */
const AnswerOptionsDisplay = memo(function AnswerOptionsDisplay({
  selectedCharacteristic,
  profile,
  remainingCharacters,
  onValueSelect,
  disabled
}: AnswerOptionsDisplayProps): JSX.Element | null {
  
  const schema = profile.characteristicSchema[selectedCharacteristic];
  if (!schema) return null;

  // Render boolean options (Yes/No)
  if (schema.type === 'boolean') {
    const trueCount = CharacterFilter.getCharactersWithTrait(remainingCharacters, selectedCharacteristic, true).length;
    const falseCount = CharacterFilter.getCharactersWithTrait(remainingCharacters, selectedCharacteristic, false).length;
    const trueImage = characteristicImages[selectedCharacteristic]?.true;
    const falseImage = characteristicImages[selectedCharacteristic]?.false;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white text-center">
          {schema.displayName}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onValueSelect(selectedCharacteristic, true)}
              className={`${BUTTON_STYLES.base} ${BUTTON_STYLES.yesButton}`}
              disabled={disabled}
              aria-label={`Oui - ${trueCount} personnages`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {trueImage ? (
                  <Image
                    src={trueImage}
                    alt="Oui"
                    width={IMAGE_DIMENSIONS.default.width}
                    height={IMAGE_DIMENSIONS.default.height}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-6xl text-white">✓</div>
                )}
                {trueCount > 0 && (
                  <div className={`${BADGE_STYLES.base} ${kidFriendlyColors[0]}`}>
                    {trueCount}
                  </div>
                )}
              </div>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onValueSelect(selectedCharacteristic, false)}
              className={`${BUTTON_STYLES.base} ${BUTTON_STYLES.noButton}`}
              disabled={disabled}
              aria-label={`Non - ${falseCount} personnages`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {falseImage ? (
                  <Image
                    src={falseImage}
                    alt="Non"
                    width={IMAGE_DIMENSIONS.default.width}
                    height={IMAGE_DIMENSIONS.default.height}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-6xl text-white">✗</div>
                )}
                {falseCount > 0 && (
                  <div className={`${BADGE_STYLES.base} ${kidFriendlyColors[1]}`}>
                    {falseCount}
                  </div>
                )}
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render enum options (multiple choice)
  if (schema.type === 'enum' && schema.values) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white text-center">
          Choisis {schema.displayName}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {schema.values.map((value, index) => {
            const matchCount = CharacterFilter.getCharactersWithTrait(remainingCharacters, selectedCharacteristic, value).length;
            
            if (matchCount === 0) return null; // Don't show options that would eliminate everyone
            
            const imagePath = characteristicImages[selectedCharacteristic]?.[String(value)];
            const colorClass = kidFriendlyColors[index % kidFriendlyColors.length];
            
            return (
              <motion.div 
                key={String(value)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onValueSelect(selectedCharacteristic, value)}
                  className={`${BUTTON_STYLES.base} ${BUTTON_STYLES.enumButton}`}
                  disabled={disabled}
                  aria-label={`${String(value)} - ${matchCount} personnages`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {/* Clear image representation */}
                    {imagePath ? (
                      <Image
                        src={imagePath}
                        alt={String(value)}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-6xl text-gray-600">❓</div>
                    )}
                    
                    {/* Colorful, kid-friendly number badge */}
                    <div className={`${BADGE_STYLES.base} ${colorClass}`}>
                      {matchCount}
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
});

export default AnswerOptionsDisplay;