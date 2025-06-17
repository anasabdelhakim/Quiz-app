
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format } from 'date-fns';
import { Calendar, Clock, FileText } from 'lucide-react';
import {type Quiz } from '@/types/quiz';
import { useQuiz } from '@/context/QuizContext';
import { useAuth } from '@/context/AuthContext';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const { getSubmission } = useQuiz();
  const { currentUser } = useAuth();
  
  const submission = currentUser ? getSubmission(quiz.id, currentUser.id) : undefined;
  const isSubmitted = !!submission;
  const isGraded = submission?.isGraded;
  const isActive = quiz.status === 'active';
  const isScheduled = quiz.status === 'scheduled';
  
  // Ensure we parse the startTime as a Date object if it isn't already
  const startTimeDate = quiz.startTime instanceof Date ? quiz.startTime : new Date(quiz.startTime);
  const currentDate = new Date();
  // Check if the start time has passed
  const hasStartTimePassed = startTimeDate <= currentDate;
  
  // A quiz is available if:
  // 1. It's active, OR
  // 2. It's scheduled but the start time has passed
  const isAvailable = isActive || (isScheduled && hasStartTimePassed);
  
  console.log(`Quiz ${quiz.id} - Status: ${quiz.status}, Start time: ${startTimeDate}, Current time: ${currentDate}, Is Available: ${isAvailable}`);
  
  const getStatusDisplay = () => {
    if (isGraded) {
      return (
        <div className="mt-4">
          <Badge variant="outline" className="bg-quiz-primary text-white">Graded</Badge>
          <div className="mt-2 font-semibold">
            Score: {submission?.earnedPoints} / {submission?.totalPoints}
          </div>
        </div>
      );
    }
    
    if (isSubmitted) {
      return (
        <div className="mt-4">
          <Badge variant="outline" className="bg-quiz-secondary text-white">Submitted</Badge>
          <div className="mt-2 text-sm text-gray-600">Awaiting grading</div>
        </div>
      );
    }
    
    if (isAvailable) {
      return (
        <div className="mt-4">
          <Badge variant="outline" className="bg-quiz-success text-white">Available</Badge>
        </div>
      );
    }
    
    if (isScheduled && !hasStartTimePassed) {
      return (
        <div className="mt-4">
          <Badge variant="outline" className="bg-yellow-500 text-white">Scheduled</Badge>
          <div className="mt-2 text-sm text-gray-600">
            Starts {formatDistanceToNow(startTimeDate, { addSuffix: true })}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="quiz-card">
      <h3 className="font-semibold text-lg">{quiz.title}</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {quiz.description || "No description provided"}
      </p>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-quiz-primary" />
          <span>
            {format(startTimeDate, "MMM d, yyyy 'at' h:mm a")}
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
      
      {getStatusDisplay()}
      
      <div className="mt-6">
        {isSubmitted ? (
          <Link to={`/student/quiz/${quiz.id}/results`}>
            <Button variant="outline" className="w-full">
              {isGraded ? 'View Results' : 'View Submission'}
            </Button>
          </Link>
        ) : (
          isAvailable ? (
            <Link to={`/student/quiz/${quiz.id}`}>
              <Button className="w-full bg-quiz-primary hover:bg-quiz-secondary">
                Start Quiz
              </Button>
            </Link>
          ) : (
            <Button disabled className="w-full opacity-70">
              {isScheduled ? 'Not Available Yet' : 'Unavailable'}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default QuizCard;
