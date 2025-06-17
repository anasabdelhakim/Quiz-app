import type {
  Quiz,
  Question,
  User,
  StudentQuizSubmission,
} from "../types/quiz";

// Sample quiz questions
export const sampleQuestions: Question[] = [
  {
    id: "q1",
    text: "What is the capital of France?",
    type: "mcq",
    options: [
      { id: "q1-opt1", text: "Paris", isCorrect: true },
      { id: "q1-opt2", text: "London", isCorrect: false },
      { id: "q1-opt3", text: "Berlin", isCorrect: false },
      { id: "q1-opt4", text: "Madrid", isCorrect: false },
    ],
    points: 10,
  },
  {
    id: "q2",
    text: "Explain the concept of object-oriented programming.",
    type: "written",
    points: 20,
  },
  {
    id: "q3",
    text: "Which language is primarily used for web development?",
    type: "mcq",
    options: [
      { id: "q3-opt1", text: "Python", isCorrect: false },
      { id: "q3-opt2", text: "JavaScript", isCorrect: true },
      { id: "q3-opt3", text: "Java", isCorrect: false },
      { id: "q3-opt4", text: "C++", isCorrect: false },
    ],
    points: 10,
  },
  {
    id: "q4",
    text: "Describe the process of photosynthesis.",
    type: "written",
    points: 25,
  },
  {
    id: "q5",
    text: "What is the smallest planet in our solar system?",
    type: "mcq",
    options: [
      { id: "q5-opt1", text: "Earth", isCorrect: false },
      { id: "q5-opt2", text: "Mars", isCorrect: false },
      { id: "q5-opt3", text: "Mercury", isCorrect: true },
      { id: "q5-opt4", text: "Venus", isCorrect: false },
    ],
    points: 10,
  },
];

// Sample quizzes
export const sampleQuizzes: Quiz[] = [
  {
    id: "quiz1",
    title: "General Knowledge Quiz",
    description: "Test your knowledge on various subjects",
    duration: 30,
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    questions: sampleQuestions.slice(0, 3),
    createdAt: new Date(),
    status: "scheduled",
  },
  {
    id: "quiz2",
    title: "Science Fundamentals",
    description: "Basic science concepts test",
    duration: 45,
    startTime: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago (active)
    questions: sampleQuestions,
    createdAt: new Date(),
    status: "active",
  },
  {
    id: "quiz3",
    title: "Programming Basics",
    description: "Test your programming knowledge",
    duration: 20,
    startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    questions: sampleQuestions.slice(1, 4),
    createdAt: new Date(),
    status: "completed",
  },
];

// Sample users
export const users: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "user2",
    name: "Student One",
    email: "student1@example.com",
    role: "student",
  },
  {
    id: "user3",
    name: "Student Two",
    email: "student2@example.com",
    role: "student",
  },
];

// Sample submission
export const sampleSubmissions: StudentQuizSubmission[] = [
  {
    quizId: "quiz3",
    studentId: "user2",
    answers: [
      {
        questionId: "q2",
        answer:
          "Object-oriented programming is a programming paradigm based on the concept of objects.",
      },
      { questionId: "q3", answer: "q3-opt2" }, // JavaScript
      {
        questionId: "q4",
        answer:
          "Photosynthesis is the process by which plants make food using sunlight.",
      },
    ],
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isGraded: false,
  },
];

// Current logged in user (for demo purposes)
export const currentUser: User = {
  id: "user1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
};
