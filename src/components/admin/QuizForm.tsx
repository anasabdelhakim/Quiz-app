
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import type { Quiz, Question, QuestionType } from '@/types/quiz';
import { useQuiz } from '@/context/QuizContext';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, PlusCircle, Trash2 } from 'lucide-react';

const QuizForm: React.FC = () => {
  const { addQuiz } = useQuiz();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [startTime, setStartTime] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: uuidv4(),
    text: '',
    type: 'mcq',
    points: 10,
    options: [
      { id: uuidv4(), text: '', isCorrect: false },
      { id: uuidv4(), text: '', isCorrect: false },
      { id: uuidv4(), text: '', isCorrect: false },
      { id: uuidv4(), text: '', isCorrect: false }
    ]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !startTime || questions.length === 0) {
      return;
    }
    
    const newQuiz: Omit<Quiz, 'id' | 'createdAt' | 'status'> = {
      title,
      description,
      duration,
      startTime: new Date(startTime),
      questions
    };
    
    addQuiz(newQuiz);
    
    // Reset form
    setTitle('');
    setDescription('');
    setDuration(30);
    setStartTime('');
    setQuestions([]);
    setCurrentQuestion({
      id: uuidv4(),
      text: '',
      type: 'mcq',
      points: 10,
      options: [
        { id: uuidv4(), text: '', isCorrect: false },
        { id: uuidv4(), text: '', isCorrect: false },
        { id: uuidv4(), text: '', isCorrect: false },
        { id: uuidv4(), text: '', isCorrect: false }
      ]
    });
  };

  const handleQuestionTypeChange = (type: QuestionType) => {
    if (type === 'mcq') {
      setCurrentQuestion({
        ...currentQuestion,
        type,
        options: [
          { id: uuidv4(), text: '', isCorrect: false },
          { id: uuidv4(), text: '', isCorrect: false },
          { id: uuidv4(), text: '', isCorrect: false },
          { id: uuidv4(), text: '', isCorrect: false }
        ]
      });
    } else {
      setCurrentQuestion({
        ...currentQuestion,
        type,
        options: undefined,
        correctAnswer: ''
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!currentQuestion.options) return;
    
    const newOptions = [...currentQuestion.options];
    newOptions[index] = { ...newOptions[index], text: value };
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleCorrectOptionChange = (index: number) => {
    if (!currentQuestion.options) return;
    
    const newOptions = currentQuestion.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index
    }));
    
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const addQuestion = () => {
    if (!currentQuestion.text || 
        (currentQuestion.type === 'mcq' && 
         (!currentQuestion.options || 
          currentQuestion.options.some(o => !o.text) || 
          !currentQuestion.options.some(o => o.isCorrect)))) {
      return;
    }
    
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      id: uuidv4(),
      text: '',
      type: 'mcq',
      points: 10,
      options: [
        { id: uuidv4(), text: '', isCorrect: false },
        { id: uuidv4(), text: '', isCorrect: false },
        { id: uuidv4(), text: '', isCorrect: false },
        { id: uuidv4(), text: '', isCorrect: false }
      ]
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Create New Quiz</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="title" className="quiz-label">Quiz Title</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
              className="quiz-input"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="quiz-label">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter quiz description"
              className="quiz-input h-24"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="duration" className="quiz-label">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              required
              min={5}
              max={180}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="quiz-input"
            />
          </div>
          
          <div>
            <Label htmlFor="startTime" className="quiz-label">Start Time</Label>
            <Input
              id="startTime"
              type="datetime-local"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="quiz-input"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-quiz-primary">Questions ({questions.length})</h2>
          </div>
          
          {questions.length > 0 && (
            <div className="space-y-4 mb-6">
              {questions.map((q, index) => (
                <Card key={q.id} className="bg-white">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        Question {index + 1} ({q.points} points)
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {q.type === 'mcq' ? 'Multiple Choice' : 'Written Answer'}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{q.text}</p>
                    {q.type === 'mcq' && q.options && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {q.options.map((option, i) => (
                          <div 
                            key={option.id}
                            className={`text-xs p-2 rounded-md border ${option.isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                          >
                            {option.text}
                            {option.isCorrect && (
                              <CheckCircle className="h-3 w-3 inline-block ml-1 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="questionText" className="quiz-label">Question</Label>
                <Textarea
                  id="questionText"
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                  placeholder="Enter your question"
                  className="quiz-input"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="questionType" className="quiz-label">Question Type</Label>
                  <Select
                    value={currentQuestion.type}
                    onValueChange={(value) => handleQuestionTypeChange(value as QuestionType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="written">Written Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="points" className="quiz-label">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    min={1}
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, points: parseInt(e.target.value)})}
                    className="quiz-input"
                  />
                </div>
              </div>
              
              {currentQuestion.type === 'mcq' && currentQuestion.options && (
                <div className="space-y-3">
                  <Label className="quiz-label">Options</Label>
                  {currentQuestion.options.map((option, index) => (
                    <div key={option.id} className="flex space-x-2">
                      <div className="flex-1">
                        <Input
                          value={option.text}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="quiz-input"
                        />
                      </div>
                      <Button
                        type="button"
                        variant={option.isCorrect ? "default" : "outline"}
                        className={`${option.isCorrect ? 'bg-quiz-success hover:bg-quiz-success' : ''}`}
                        onClick={() => handleCorrectOptionChange(index)}
                      >
                        Correct
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addQuestion} 
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="quiz-btn-primary"
            disabled={!title || !startTime || questions.length === 0}
          >
            Create Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
