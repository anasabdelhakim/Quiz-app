
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import QuestionTypeSelector from '../shared/QuestionTypeSelector';
import { v4 as uuidv4 } from 'uuid';

const QuestionExample: React.FC = () => {
  const [questionType, setQuestionType] = useState<'mcq' | 'written'>('mcq');
  const [answer, setAnswer] = useState('');
  
  const mcqOptions = [
    { id: uuidv4(), text: 'Option A' },
    { id: uuidv4(), text: 'Option B' },
    { id: uuidv4(), text: 'Option C' },
    { id: uuidv4(), text: 'Option D' }
  ];
  
  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    console.log('Selected answer:', value);
  };
  
  return (
    <div className="container max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Question Type Example</h1>
      
      <div className="mb-6">
        <div className="flex gap-4 mb-8">
          <Button 
            variant={questionType === 'mcq' ? 'default' : 'outline'}
            onClick={() => setQuestionType('mcq')}
          >
            Multiple Choice
          </Button>
          <Button 
            variant={questionType === 'written' ? 'default' : 'outline'}
            onClick={() => setQuestionType('written')}
          >
            Written Answer
          </Button>
        </div>
        
        <QuestionTypeSelector
          type={questionType}
          question="What is the capital of France?"
          options={questionType === 'mcq' ? mcqOptions : undefined}
          currentAnswer={answer}
          onAnswerChange={handleAnswerChange}
          points={10}
        />
        
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold">Current Answer:</h3>
          <p>{answer || '(No answer selected)'}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionExample;
