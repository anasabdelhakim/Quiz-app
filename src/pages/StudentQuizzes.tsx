
import React from 'react';
import Layout from '@/components/layout/Layout';
import QuizCard from '@/components/student/QuizCard';
import { useQuiz } from '@/context/QuizContext';

const StudentQuizzes: React.FC = () => {
  const { quizzes } = useQuiz();
  
  return (
    <Layout>
      <div className="quiz-container">
        <h1 className="quiz-title">Available Quizzes</h1>
        
        {quizzes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No quizzes are available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentQuizzes;
