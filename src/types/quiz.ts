
export type QuestionType = 'mcq' | 'written';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  correctAnswer?: string;
  points: number;
  studentAnswer?: string;
  isGraded?: boolean;
  earnedPoints?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  duration: number; // in minutes
  startTime: Date;
  questions: Question[];
  createdAt: Date;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'graded';
}

export interface StudentQuizSubmission {
  quizId: string;
  studentId: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
  submittedAt: Date;
  isGraded: boolean;
  totalPoints?: number;
  earnedPoints?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}
