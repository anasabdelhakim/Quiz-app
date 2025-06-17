
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle predetermined login credentials
    if (email === 'admin' && password === 'admin') {
      const success = await login('admin@example.com', 'password');
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome, Admin!",
        });
        navigate('/admin/quizzes');
      }
    } else if (email === 'student' && password === 'student') {
      const success = await login('student1@example.com', 'password');
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome, Student!",
        });
        navigate('/student/quizzes');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-quiz-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-quiz-primary">QuizMastro Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="email"
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-quiz-primary hover:bg-quiz-secondary">
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          <p className="w-full">
            Use admin/admin for admin access<br />
            Use student/student for student access
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
