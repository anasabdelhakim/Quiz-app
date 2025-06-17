
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow, format } from 'date-fns';
import { Calendar, Clock, FileText, Users } from 'lucide-react';

const QuizList: React.FC = () => {
  const { quizzes } = useQuiz();

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="quiz-title mb-0">Quiz Management</h1>
        <Link to="/admin/create-quiz">
          <Button className="quiz-btn-primary">Create New Quiz</Button>
        </Link>
      </div>
      
      {quizzes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No quizzes available.</p>
          <Link to="/admin/create-quiz">
            <Button className="quiz-btn-primary">Create Your First Quiz</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{quiz.title}</h3>
                {getStatusBadge(quiz.status)}
              </div>
              
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {quiz.description || "No description provided"}
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-quiz-primary" />
                  <span>
                    {format(new Date(quiz.startTime), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-quiz-primary" />
                  <span>{quiz.duration} minutes</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <FileText className="w-4 h-4 mr-2 text-quiz-primary" />
                  <span>{quiz.questions.length} questions</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Link to={`/admin/quiz/${quiz.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
                
                {quiz.status === 'completed' && (
                  <Link to={`/admin/grade/${quiz.id}`} className="flex-1">
                    <Button className="w-full bg-quiz-primary hover:bg-quiz-secondary">Grade Quiz</Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
