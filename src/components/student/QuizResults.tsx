
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Calendar, FileText, ArrowLeft } from 'lucide-react';

const QuizResults: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { getQuiz, getSubmission } = useQuiz();
  const { currentUser } = useAuth();
  
  const quiz = getQuiz(quizId || '');
  const submission = currentUser ? getSubmission(quizId || '', currentUser.id) : undefined;
  
  if (!quiz || !currentUser) {
    navigate('/student/quizzes');
    return null;
  }
  
  const isGraded = submission?.isGraded;
  const earnedPoints = submission?.earnedPoints || 0;
  const totalPoints = submission?.totalPoints || 0;
  const scorePercentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
  
  // Get answer for a question
  const getAnswerForQuestion = (questionId: string) => {
    if (!submission) return "";
    return submission.answers.find(a => a.questionId === questionId)?.answer || "";
  };
  
  // Get earned points for a question (mock implementation)
  const getPointsForQuestion = (questionId: string) => {
    // In a real app, this would come from the submission data
    if (!isGraded) return null;
    
    // Mock implementation - right now we just return a random value
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) return null;
    
    return Math.floor(Math.random() * (question.points + 1));
  };
  
  // Check if MCQ answer is correct
  const isMCQAnswerCorrect = (question: any, answerId: string) => {
    if (question.type !== 'mcq' || !question.options) return false;
    const selectedOption = question.options.find((opt: any) => opt.id === answerId);
    return selectedOption?.isCorrect || false;
  };
  
  return (
    <div className="quiz-container">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/student/quizzes')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
        
        <h1 className="quiz-title mb-2">{quiz.title} - Results</h1>
        
        {submission ? (
          isGraded ? (
            <div className="text-center mb-8">
              <div className="inline-block bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Your Score</h2>
                <div className="text-3xl font-bold text-quiz-primary mb-2">
                  {earnedPoints} / {totalPoints}
                </div>
                <Progress 
                  value={scorePercentage} 
                  className="h-2 w-64 mx-auto mb-2" 
                />
                <p className="text-sm text-gray-600">
                  {scorePercentage.toFixed(0)}% correct
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center mb-8">
              <Badge className="mb-2">Awaiting Grading</Badge>
              <p className="text-gray-600">
                Your quiz has been submitted and is waiting to be graded.
              </p>
            </div>
          )
        ) : (
          <div className="text-center mb-8">
            <Badge variant="outline" className="bg-red-100 text-red-800">
              No Submission Found
            </Badge>
          </div>
        )}
      </div>
      
      <div className="space-y-6 mb-6">
        {quiz.questions.map((question, index) => {
          const studentAnswer = getAnswerForQuestion(question.id);
          const pointsEarned = getPointsForQuestion(question.id);
          const isCorrect = question.type === 'mcq' ? 
            isMCQAnswerCorrect(question, studentAnswer) : null;
          
          return (
            <Card key={question.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    Q{index + 1}: {question.text}
                  </CardTitle>
                  {isGraded && (
                    <div className="text-sm font-medium">
                      {pointsEarned !== null && (
                        <span>{pointsEarned} / {question.points} points</span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {question.type === 'mcq' ? 'Multiple Choice' : 'Written Answer'}
                </p>
              </CardHeader>
              
              <CardContent>
                <div>
                  <h3 className="text-sm font-medium mb-2">Your Answer:</h3>
                  
                  {question.type === 'mcq' && question.options ? (
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option: any) => (
                        <div 
                          key={option.id}
                          className={`p-2 rounded-md text-sm border ${
                            option.id === studentAnswer
                              ? (isGraded
                                ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                : 'border-blue-500 bg-blue-50')
                              : (isGraded && option.isCorrect ? 'border-green-300' : 'border-gray-200')
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{option.text}</span>
                            {isGraded && option.id === studentAnswer && (
                              isCorrect ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 border rounded-md text-sm bg-gray-50">
                      {studentAnswer || "No answer provided"}
                    </div>
                  )}
                </div>
                
                {isGraded && question.type === 'written' && (
                  <div className="mt-4 p-3 border rounded-md text-sm bg-gray-50">
                    <h3 className="text-sm font-medium mb-1">Feedback:</h3>
                    <p className="text-sm text-gray-700">
                      {/* Mock feedback - in a real app this would come from the grader */}
                      {pointsEarned === question.points 
                        ? "Excellent answer, fully addresses the question." 
                        : pointsEarned! > question.points / 2
                        ? "Good attempt, but could be more comprehensive."
                        : "Answer needs improvement, missing key points."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="flex justify-center">
        <Link to="/student/quizzes">
          <Button className="bg-quiz-primary hover:bg-quiz-secondary">
            Return to Quizzes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
