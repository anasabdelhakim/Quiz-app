import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-quiz-light flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            className="h-10 w-10 text-quiz-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="ml-2 text-2xl font-bold text-quiz-primary">
            QuizMastro
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <span className="text-sm text-gray-700">
                {currentUser.name} ({currentUser.role})
              </span>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-quiz-primary sm:text-5xl md:text-6xl">
              Interactive Quiz Platform
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-2xl">
              Create, take, and grade quizzes with our intuitive platform.
              Perfect for educators and students alike.
            </p>

            <div className="mt-10">
              {currentUser ? (
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {currentUser.role === "admin" ? (
                    <>
                      <Link to="/admin/quizzes">
                        <Button className="w-full sm:w-auto bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-3 rounded-md">
                          Go to Admin Dashboard
                        </Button>
                      </Link>
                      <Link to="/admin/create-quiz">
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto px-8 py-3 rounded-md"
                        >
                          Create New Quiz
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/student/quizzes">
                      <Button className="w-full sm:w-auto bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-3 rounded-md">
                        View Available Quizzes
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button
                    className="w-full sm:w-auto bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-3 rounded-md"
                    onClick={() => switchRole()}
                  >
                    Demo Platform
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-quiz-light text-quiz-primary mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Create Quizzes
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Create custom quizzes with multiple choice or written
                  questions. Set time limits and schedule start times.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-quiz-light text-quiz-primary mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Take Quizzes
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Students can take quizzes with an intuitive interface. The
                  platform tracks time and automatically submits when time is
                  up.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-quiz-light text-quiz-primary mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Grade Submissions
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Administrators can quickly grade quiz submissions, with
                  automatic scoring for multiple choice questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} QuizMastro. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
