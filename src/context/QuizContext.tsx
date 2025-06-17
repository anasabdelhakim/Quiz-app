import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { Quiz, Question, StudentQuizSubmission } from "../types/quiz";
import { sampleQuizzes, sampleSubmissions } from "../data/mockData";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

interface QuizContextType {
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, "id" | "createdAt" | "status">) => void;
  getQuiz: (id: string) => Quiz | undefined;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  submissions: StudentQuizSubmission[];
  submitQuiz: (
    submission: Omit<StudentQuizSubmission, "submittedAt" | "isGraded">
  ) => void;
  gradeSubmission: (
    quizId: string,
    studentId: string,
    grades: { questionId: string; earnedPoints: number }[]
  ) => void;
  getSubmission: (
    quizId: string,
    studentId: string
  ) => StudentQuizSubmission | undefined;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(sampleQuizzes);
  const [submissions, setSubmissions] =
    useState<StudentQuizSubmission[]>(sampleSubmissions);
  const { toast } = useToast();

  const addQuiz = (quizData: Omit<Quiz, "id" | "createdAt" | "status">) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: uuidv4(),
      createdAt: new Date(),
      status: "scheduled",
    };
    setQuizzes([...quizzes, newQuiz]);
    toast({
      title: "Quiz Created",
      description: `${newQuiz.title} has been created successfully.`,
    });
  };

  const getQuiz = (id: string) => {
    return quizzes.find((quiz) => quiz.id === id);
  };

  const updateQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(
      quizzes.map((quiz) => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz))
    );
    toast({
      title: "Quiz Updated",
      description: `${updatedQuiz.title} has been updated.`,
    });
  };

  const deleteQuiz = (id: string) => {
    const quizToDelete = quizzes.find((quiz) => quiz.id === id);
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    if (quizToDelete) {
      toast({
        title: "Quiz Deleted",
        description: `${quizToDelete.title} has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const submitQuiz = (
    submissionData: Omit<StudentQuizSubmission, "submittedAt" | "isGraded">
  ) => {
    const newSubmission: StudentQuizSubmission = {
      ...submissionData,
      submittedAt: new Date(),
      isGraded: false,
    };

    // Update quiz status to completed
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === submissionData.quizId
        ? { ...quiz, status: "completed" as const }
        : quiz
    );
    setQuizzes(updatedQuizzes);

    setSubmissions([...submissions, newSubmission]);
    toast({
      title: "Quiz Submitted",
      description: "Your answers have been submitted successfully.",
    });
  };

  const gradeSubmission = (
    quizId: string,
    studentId: string,
    grades: { questionId: string; earnedPoints: number }[]
  ) => {
    const submission = submissions.find(
      (s) => s.quizId === quizId && s.studentId === studentId
    );

    if (!submission) return;

    // Calculate total points
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = grades.reduce((sum, g) => sum + g.earnedPoints, 0);

    // Update submission
    const updatedSubmissions = submissions.map((sub) => {
      if (sub.quizId === quizId && sub.studentId === studentId) {
        return {
          ...sub,
          isGraded: true,
          totalPoints,
          earnedPoints,
        };
      }
      return sub;
    });

    // Update quiz status to graded
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === quizId ? { ...quiz, status: "graded" as const } : quiz
    );

    setQuizzes(updatedQuizzes);
    setSubmissions(updatedSubmissions);

    toast({
      title: "Quiz Graded",
      description: `Quiz has been graded with ${earnedPoints}/${totalPoints} points.`,
    });
  };

  const getSubmission = (quizId: string, studentId: string) => {
    return submissions.find(
      (submission) =>
        submission.quizId === quizId && submission.studentId === studentId
    );
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        addQuiz,
        getQuiz,
        updateQuiz,
        deleteQuiz,
        submissions,
        submitQuiz,
        gradeSubmission,
        getSubmission,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
