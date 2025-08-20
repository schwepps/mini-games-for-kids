'use client';

import { memo, JSX } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { IQuestion } from '@/types/game';

interface QuestionFeedbackProps {
  lastQuestion: IQuestion | undefined;
}

/**
 * Component responsible for displaying immediate feedback for the last question asked
 * Pure presentation component with animations
 */
const QuestionFeedback = memo(function QuestionFeedback({
  lastQuestion
}: QuestionFeedbackProps): JSX.Element | null {
  
  if (!lastQuestion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-2xl p-4 border-2 ${
        lastQuestion.answer 
          ? 'bg-green-100 border-green-400' 
          : 'bg-red-100 border-red-400'
      }`}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          {lastQuestion.answer ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          <h4 className={`font-bold text-lg ${
            lastQuestion.answer 
              ? 'text-green-800' 
              : 'text-red-800'
          }`}>
            {lastQuestion.answer ? 'OUI !' : 'NON !'}
          </h4>
        </div>
        
        <p className={`font-medium mb-2 ${
          lastQuestion.answer 
            ? 'text-green-700' 
            : 'text-red-700'
        }`}>
          {lastQuestion.text}
        </p>
        
        <div className="text-sm text-gray-600">
          {lastQuestion.answer 
            ? '✨ Les personnages sans ce trait ont été éliminés !'
            : '✨ Les personnages avec ce trait ont été éliminés !'
          }
        </div>
      </div>
    </motion.div>
  );
});

export default QuestionFeedback;