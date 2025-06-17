
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const QuizDetails: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { getQuiz, deleteQuiz } = useQuiz();
  
  const quiz = getQuiz(quizId || '');
  
  if (!quiz) {
    return (
      <div className="quiz-container">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Quiz not found.</p>
          <Button onClick={() => navigate('/admin/quizzes')}>
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quiz.id);
      navigate('/admin/quizzes');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      case 'active':
        return <Badge variant="default" className="bg-quiz-success">Active</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-quiz-primary">Completed</Badge>;
      case 'graded':
        return <Badge variant="default" className="bg-quiz-accent">Graded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="quiz-container">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/quizzes')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="quiz-title mb-2">{quiz.title}</h1>
            {getStatusBadge(quiz.status)}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Quiz
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-600">Description</h3>
                  <p className="text-gray-900">{quiz.description || 'No description provided'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-gray-600">Start Time</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2 text-quiz-primary" />
                      <span>{format(new Date(quiz.startTime), "MMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-gray-600">Duration</h3>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2 text-quiz-primary" />
                      <span>{quiz.duration} minutes</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-gray-600">Questions</h3>
                  <div className="flex items-center mt-1">
                    <FileText className="w-4 h-4 mr-2 text-quiz-primary" />
                    <span>{quiz.questions.length} questions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Q{index + 1}: {question.text}</h3>
                      <Badge variant="outline">{question.points} pts</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      Type: {question.type === 'mcq' ? 'Multiple Choice' : 'Written Answer'}
                    </p>
                    
                    {question.type === 'mcq' && question.options && (
                      <div className="space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div 
                            key={option.id} 
                            className={`p-2 rounded text-sm ${
                              option.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option.text}
                            {option.isCorrect && <span className="ml-2 text-green-600 font-medium">(Correct)</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quiz.status === 'completed' && (
                <Link to={`/admin/grade/${quiz.id}`} className="block">
                  <Button className="w-full bg-quiz-primary hover:bg-quiz-secondary">
                    Grade Quiz
                  </Button>
                </Link>
              )}
              
              <Button variant="outline" className="w-full">
                View Submissions
              </Button>
              
              <Button variant="outline" className="w-full">
                Export Results
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Questions:</span>
                  <span className="font-medium">{quiz.questions.length}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Points:</span>
                  <span className="font-medium">
                    {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">MCQ Questions:</span>
                  <span className="font-medium">
                    {quiz.questions.filter(q => q.type === 'mcq').length}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Written Questions:</span>
                  <span className="font-medium">
                    {quiz.questions.filter(q => q.type === 'written').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
