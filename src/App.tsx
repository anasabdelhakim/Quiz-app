
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateQuiz from "./pages/AdminCreateQuiz";
import AdminQuizDetails from "./pages/AdminQuizDetails";
import AdminGradeQuiz from "./pages/AdminGradeQuiz";
import StudentQuizzes from "./pages/StudentQuizzes";
import StudentTakeQuiz from "./pages/StudentTakeQuiz";
import StudentQuizResults from "./pages/StudentQuizResults";
import QuestionExample from "./components/examples/QuestionExample";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route path="/admin/quizzes" element={<AdminDashboard />} />
              <Route path="/admin/create-quiz" element={<AdminCreateQuiz />} />
              <Route path="/admin/grade/:quizId" element={<AdminGradeQuiz />} />
              
              {/* Student Routes */}
              <Route path="/student/quizzes" element={<StudentQuizzes />} />
              <Route path="/student/quiz/:quizId" element={<StudentTakeQuiz />} />
              <Route path="/student/quiz/:quizId/results" element={<StudentQuizResults />} />
              
              {/* Example Routes */}
              <Route path="/examples/question" element={<React.Suspense fallback={<div>Loading...</div>}><QuestionExample /></React.Suspense>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
