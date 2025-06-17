import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={closeMobileMenu}
            >
              <svg
                className="h-8 w-8 text-quiz-primary"
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
              <span className="ml-2 text-xl font-bold text-quiz-primary hidden sm:block">
                QuizMastro
              </span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="ml-10 flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-quiz-primary"
                >
                  Home
                </Link>

                {currentUser?.role === "admin" && (
                  <Link
                    to="/admin/quizzes"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-quiz-primary"
                  >
                    Admin Dashboard
                  </Link>
                )}

                {currentUser?.role === "student" && (
                  <Link
                    to="/student/quizzes"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-quiz-primary"
                  >
                    My Quizzes
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* User Menu and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Desktop User Menu */}
            {!isMobile && currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {currentUser.name} ({currentUser.role})
                </span>

                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-sm font-medium text-gray-700"
                >
                  Logout
                </Button>
              </div>
            )}

            {!isMobile && !currentUser && (
              <Link to="/login">
                <Button variant="default" className="text-sm font-medium">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="flex items-center justify-center"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-white shadow-lg border-t">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-quiz-primary"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {currentUser?.role === "admin" && (
              <Link
                to="/admin/quizzes"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-quiz-primary"
                onClick={closeMobileMenu}
              >
                Admin Dashboard
              </Link>
            )}

            {currentUser?.role === "student" && (
              <Link
                to="/student/quizzes"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-quiz-primary"
                onClick={closeMobileMenu}
              >
                My Quizzes
              </Link>
            )}

            {currentUser && (
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="px-3 py-2 text-sm text-gray-500">
                  Logged in as {currentUser.name} ({currentUser.role})
                </div>

                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full justify-start px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-quiz-primary"
                >
                  Logout
                </Button>
              </div>
            )}

            {!currentUser && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-quiz-primary text-white hover:bg-quiz-secondary text-center mt-3"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
