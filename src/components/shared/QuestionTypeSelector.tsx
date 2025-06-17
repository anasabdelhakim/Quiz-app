
import React from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MCQOption {
  id: string;
  text: string;
}

interface QuestionTypeSelectorProps {
  type: 'mcq' | 'written';
  question: string;
  options?: MCQOption[];
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean;
  points?: number;
}

const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
  type,
  question,
  options = [],
  currentAnswer,
  onAnswerChange,
  disabled = false,
  points
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-between">
          <h3 className="text-lg font-medium">{question}</h3>
          {points !== undefined && (
            <span className="text-sm font-normal text-gray-500">
              {points} points
            </span>
          )}
        </div>
        
        {type === 'mcq' ? (
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center p-3 rounded-md border border-gray-200 transition-colors cursor-pointer",
                  currentAnswer === option.id && "border-quiz-primary bg-quiz-primary/5"
                )}
                onClick={() => !disabled && onAnswerChange(option.id)}
              >
                <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full border">
                  {currentAnswer === option.id && (
                    <div className="h-2.5 w-2.5 rounded-full bg-quiz-primary" />
                  )}
                </div>
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Textarea
              placeholder="Write your answer here..."
              value={currentAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="min-h-[150px]"
              disabled={disabled}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionTypeSelector;
