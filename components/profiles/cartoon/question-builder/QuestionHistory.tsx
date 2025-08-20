'use client';

import { memo, JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { IQuestion } from '@/types/game';

interface QuestionHistoryProps {
  questionsAsked: IQuestion[];
}

/**
 * Component responsible for displaying the history of all questions asked
 * Pure presentation component with scrollable list
 */
const QuestionHistory = memo(function QuestionHistory({
  questionsAsked
}: QuestionHistoryProps): JSX.Element | null {
  
  if (questionsAsked.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-white font-medium text-sm">Questions posées:</h4>
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {questionsAsked.map((question, index) => (
          <div 
            key={question.id}
            className="text-xs bg-white/10 rounded-lg p-2 text-white/80"
          >
            <span className="font-medium">Q{index + 1}:</span> {question.text}{' '}
            <Badge 
              variant={question.answer ? "default" : "destructive"}
              className="ml-1 text-xs"
            >
              {question.answer ? 'OUI' : 'NON'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
});

export default QuestionHistory;