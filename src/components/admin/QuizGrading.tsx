
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const QuizGrading: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getQuiz, submissions, gradeSubmission } = useQuiz();
  const [quiz, setQuiz] = useState(getQuiz(quizId || ''));
  const [grades, setGrades] = useState<{ questionId: string, earnedPoints: number }[]>([]);
  
  // Find submission for this quiz (in a real app, you would filter by studentId too)
  const submission = submissions.find(s => s.quizId === quizId);
  
  useEffect(() => {
    if (!quiz || !submission) {
      toast({
        title: "Error",
        description: "Quiz or submission not found.",
        variant: "destructive",
      });
      navigate('/admin/quizzes');
      return;
    }
    
    // Initialize grades
    const initialGrades = quiz.questions.map(question => ({
      questionId: question.id,
      earnedPoints: 0
    }));
    
    setGrades(initialGrades);
  }, [quiz, submission, navigate, toast]);
  
  if (!quiz || !submission) {
    return null;
  }
  
  const handleGradeChange = (questionId: string, points: number) => {
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) return;
    
    // Ensure points don't exceed question's max points
    const validPoints = Math.min(Math.max(0, points), question.points);
    
    setGrades(grades.map(g => 
      g.questionId === questionId ? { ...g, earnedPoints: validPoints } : g
    ));
  };
  
  const handleSubmit = () => {
    if (submission && quizId) {
      gradeSubmission(quizId, submission.studentId, grades);
      navigate('/admin/quizzes');
    }
  };
  
  // Find student answers for each question
  const getStudentAnswer = (questionId: string) => {
    if (!submission) return "";
    return submission.answers.find(a => a.questionId === questionId)?.answer || "";
  };
  
  // Check if answer is correct for MCQ questions
  const isCorrectMCQAnswer = (question: any, studentAnswer: string) => {
    if (question.type !== 'mcq' || !question.options) return false;
    
    const selectedOption = question.options.find((opt: any) => opt.id === studentAnswer);
    return selectedOption?.isCorrect || false;
  };
  
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Grade Quiz: {quiz.title}</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Student Submission</h2>
        <p className="text-sm text-gray-600">
          Submitted: {new Date(submission.submittedAt).toLocaleString()}
        </p>
      </div>
      
      <div className="space-y-6 mb-8">
        {quiz.questions.map((question, index) => {
          const studentAnswer = getStudentAnswer(question.id);
          
          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  Q{index + 1}: {question.text} ({question.points} points)
                </CardTitle>
                <p className="text-xs text-gray-500">
                  {question.type === 'mcq' ? 'Multiple Choice' : 'Written Answer'}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Student Answer:</h3>
                    {question.type === 'mcq' && question.options ? (
                      <div className="grid grid-cols-2 gap-2">
                        {question.options.map((option: any) => (
                          <div 
                            key={option.id}
                            className={`p-2 rounded-md text-sm border ${
                              option.id === studentAnswer 
                                ? (option.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                : (option.isCorrect ? 'border-green-300 bg-white' : 'border-gray-200')
                            }`}
                          >
                            {option.text}
                            {option.id === studentAnswer && ' (selected)'}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 border rounded-md text-sm bg-gray-50">
                        {studentAnswer || "No answer provided"}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      {question.type === 'mcq' 
                        ? `Points (Auto-graded: ${isCorrectMCQAnswer(question, studentAnswer) ? question.points : 0}/${question.points})` 
                        : 'Assign Points:'}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="number" 
                        min="0" 
                        max={question.points}
                        value={grades.find(g => g.questionId === question.id)?.earnedPoints || 0}
                        onChange={(e) => handleGradeChange(question.id, parseInt(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-500">/ {question.points}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/quizzes')}
        >
          Cancel
        </Button>
        <Button 
          className="bg-quiz-primary hover:bg-quiz-secondary"
          onClick={handleSubmit}
        >
          Submit Grades
        </Button>
      </div>
    </div>
  );
};

export default QuizGrading;
