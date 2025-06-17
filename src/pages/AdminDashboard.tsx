
import React from 'react';
import Layout from '@/components/layout/Layout';
import QuizList from '@/components/admin/QuizList';

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <QuizList />
    </Layout>
  );
};

export default AdminDashboard;
