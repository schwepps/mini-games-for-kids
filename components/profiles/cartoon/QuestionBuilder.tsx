'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IProfile, ICharacter, IQuestion } from '@/types/game';
import { HelpCircle } from 'lucide-react';

import CharacteristicSelector from './question-builder/CharacteristicSelector';
import AnswerOptionsDisplay from './question-builder/AnswerOptionsDisplay';
import QuestionHistory from './question-builder/QuestionHistory';

interface QuestionBuilderProps {
  onAskQuestion: (characteristicKey: string, value: unknown) => void;
  profile: IProfile | null;
  remainingCharacters: ICharacter[];
  questionsAsked: IQuestion[];
  disabled: boolean;
}

export default function QuestionBuilder({ 
  onAskQuestion, 
  profile, 
  remainingCharacters, 
  questionsAsked,
  disabled 
}: QuestionBuilderProps) {
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<string | null>(null);

  if (!profile) return null;

  const handleCharacteristicSelect = (characteristic: string) => {
    setSelectedCharacteristic(characteristic);
  };

  const handleValueSelect = (characteristic: string, value: unknown) => {
    // Immediately ask the question when value is selected
    onAskQuestion(characteristic, value);
    
    // Reset selected characteristic
    setSelectedCharacteristic(null);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-center text-xl">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Pose une Question !
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Choose what to ask about */}
        <CharacteristicSelector
          profile={profile}
          selectedCharacteristic={selectedCharacteristic}
          onCharacteristicSelect={handleCharacteristicSelect}
          disabled={disabled}
        />

        {/* Step 2: Choose specific value */}
        <AnimatePresence>
          {selectedCharacteristic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <AnswerOptionsDisplay
                  selectedCharacteristic={selectedCharacteristic}
                  profile={profile}
                  remainingCharacters={remainingCharacters}
                  onValueSelect={handleValueSelect}
                  disabled={disabled}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Question History - Kid-Friendly */}
        <QuestionHistory 
          questionsAsked={questionsAsked}
          allCharacters={profile?.characters || []}
        />
      </CardContent>
    </Card>
  );
}