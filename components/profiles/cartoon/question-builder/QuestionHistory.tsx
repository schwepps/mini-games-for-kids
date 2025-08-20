'use client';

import { memo, useMemo, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IQuestion, ICharacter } from '@/types/game';
import { CharacterFilter } from '@/lib/characterFilter';
import CharacterAvatar from '@/components/CharacterAvatar';
import CharacteristicIcon from '@/components/CharacteristicIcon';

interface QuestionHistoryProps {
  questionsAsked: IQuestion[];
  allCharacters: ICharacter[];
}

interface QuestionEliminationData {
  question: IQuestion;
  eliminatedCharacters: ICharacter[];
  remainingCount: number;
}

/**
 * Kid-friendly visual component that shows question history using character avatars
 * and fun emojis instead of text. Displays eliminated characters for each question.
 */
const QuestionHistory = memo(function VisualQuestionHistory({
  questionsAsked,
  allCharacters
}: QuestionHistoryProps): JSX.Element | null {
  
  // Calculate eliminated characters for each question
  const questionEliminationData = useMemo((): QuestionEliminationData[] => {
    if (questionsAsked.length === 0) return [];
    
    let currentRemaining = [...allCharacters];
    const eliminationData: QuestionEliminationData[] = [];
    
    for (const question of questionsAsked) {
      const previousRemaining = [...currentRemaining];
      currentRemaining = CharacterFilter.applyQuestionResult(currentRemaining, question);
      
      const eliminated = previousRemaining.filter(char => 
        !currentRemaining.find(remaining => remaining.id === char.id)
      );
      
      eliminationData.push({
        question,
        eliminatedCharacters: eliminated,
        remainingCount: currentRemaining.length
      });
    }
    
    return eliminationData;
  }, [questionsAsked, allCharacters]);

  if (questionsAsked.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Fun header with sparkles */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-medium">
          <span>Tes questions !</span>
        </div>
      </motion.div>

      {/* Question history with visual feedback */}
      <div className="space-y-2">
        <AnimatePresence>
          {questionEliminationData.slice().reverse().map((data, index) => {
            const { question, eliminatedCharacters } = data;
            
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className={`
                  rounded-2xl p-3 border-2 transition-all duration-300 shadow-sm
                  ${question.answer 
                    ? 'bg-green-100/90 border-green-400/60 backdrop-blur-sm' 
                    : 'bg-red-100/90 border-red-400/60 backdrop-blur-sm'
                  }
                `}
              >
                <div className="flex items-end gap-3">
                  {/* Answer image with colored border */}
                  <div className={`
                    w-16 h-16 rounded-lg border-4 flex-shrink-0 flex items-center justify-center
                    ${question.answer 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                    }
                  `}>
                    <CharacteristicIcon
                      characteristic={question.characteristicKey}
                      value={question.value}
                      size="lg"
                    />
                  </div>

                  {/* Eliminated characters display */}
                  <div className="flex-1 min-w-0">
                    {eliminatedCharacters.length > 0 ? (
                      <div className="space-y-1">
                        <div className={`text-xs font-medium ${
                          question.answer ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {eliminatedCharacters.length} personnage{eliminatedCharacters.length > 1 ? 's' : ''} éliminé{eliminatedCharacters.length > 1 ? 's' : ''} !
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {eliminatedCharacters.map((character, charIndex) => (
                            <motion.div
                              key={character.id}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                delay: charIndex * 0.05,
                                type: "spring",
                                stiffness: 200
                              }}
                              className="relative"
                            >
                              <CharacterAvatar
                                characterName={character.name}
                                imageName={character.image}
                                size="md"
                                className="border border-gray-300"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`text-xs font-medium ${
                        question.answer ? 'text-green-800' : 'text-red-800'
                      }`}>
                        Aucun personnage éliminé
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Fun stats */}
      {questionEliminationData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-white/70 bg-white/5 rounded-lg p-2"
        >
          🎯 {questionEliminationData[questionEliminationData.length - 1]?.remainingCount || 0} personnage
          {(questionEliminationData[questionEliminationData.length - 1]?.remainingCount || 0) > 1 ? 's' : ''} restant
          {(questionEliminationData[questionEliminationData.length - 1]?.remainingCount || 0) > 1 ? 's' : ''} !
        </motion.div>
      )}
    </div>
  );
});

export default QuestionHistory;