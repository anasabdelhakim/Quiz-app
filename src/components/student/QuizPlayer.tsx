
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import  { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Timer, ArrowLeft, ArrowRight, Clock, AlertTriangle, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


const QuizPlayer: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { getQuiz, submitQuiz } = useQuiz();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const quiz = getQuiz(quizId || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; answer: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz?.duration ? quiz.duration * 60 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    if (!quiz || !currentUser) {
      navigate('/student/quizzes');
      return;
    }
    
    // Initialize answers array
    const initialAnswers = quiz.questions.map(q => ({
      questionId: q.id,
      answer: ''
    }));
    setAnswers(initialAnswers);
    
    // Set up timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleSubmitQuiz();
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quiz, currentUser, navigate]);
  
  if (!quiz || !currentUser) {
    return null;
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleMCQAnswer = (optionId: string) => {
    const updatedAnswers = [...answers];
    const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (answerIndex !== -1) {
      updatedAnswers[answerIndex].answer = optionId;
    }
    
    setAnswers(updatedAnswers);
  };
  
  const handleWrittenAnswer = (text: string) => {
    const updatedAnswers = [...answers];
    const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (answerIndex !== -1) {
      updatedAnswers[answerIndex].answer = text;
    }
    
    setAnswers(updatedAnswers);
  };
  
  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.answer || '';
  };
  
  const handleSubmitQuiz = () => {
    if (!currentUser || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Filter out empty answers
    const finalAnswers = answers.filter(a => a.answer.trim() !== '');
    
    submitQuiz({
      quizId: quiz.id,
      studentId: currentUser.id,
      answers: finalAnswers
    });
    
    toast({
      title: "Quiz Submitted",
      description: "Your answers have been submitted successfully.",
    });
    
    navigate('/student/quizzes');
  };
  
  const answeredQuestionsCount = answers.filter(a => a.answer.trim() !== '').length;
  
  return (
    <div className="quiz-container max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-quiz-primary">{quiz.title}</h1>
        <div className="quiz-timer">
          <Clock className="h-5 w-5 text-quiz-primary" />
          <span className={`${timeLeft < 60 ? 'text-quiz-error animate-pulse' : ''}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{answeredQuestionsCount} answered</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span>{currentQuestion.text}</span>
              <span className="text-sm font-normal text-gray-500">
                {currentQuestion.points} points
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {currentQuestion.type === 'mcq' && currentQuestion.options ? (
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={`question-option ${
                    getCurrentAnswer() === option.id ? 'question-option-selected' : ''
                  }`}
                  onClick={() => handleMCQAnswer(option.id)}
                >
                  <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full border">
                    {getCurrentAnswer() === option.id && (
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
                placeholder="Type your answer here..."
                value={getCurrentAnswer()}
                onChange={(e) => handleWrittenAnswer(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-quiz-primary hover:bg-quiz-secondary">
                Submit Quiz
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit your quiz?</AlertDialogTitle>
                <AlertDialogDescription>
                  You've answered {answeredQuestionsCount} out of {quiz.questions.length} questions.
                  {answeredQuestionsCount < quiz.questions.length && (
                    <div className="mt-2 flex items-center text-amber-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span>Some questions are still unanswered.</span>
                    </div>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleSubmitQuiz}
                  className="bg-quiz-primary hover:bg-quiz-secondary"
                >
                  <Check className="mr-1 h-4 w-4" />
                  Submit Quiz
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleNext} className="bg-quiz-primary hover:bg-quiz-secondary">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
