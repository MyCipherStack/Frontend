"use client"
import { useState } from 'react';

import Navbar from '@/components/NavBar';
import Header from '@/components/Header';
import ProblemTable from '@/components/ProblemTable';

const ProblemsPage = () => {
  const [problems] = useState([
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'easy',
      acceptance: '48.2%',
      tags: ['Array', 'Hash Table'],
      status: 'solved',
      premium: false
    },
    // Add more problems...
  ]);

  return (
    <div className="min-h-screen ">
     <Header></Header>
      
      <main className="container mx-auto px-4 pt-24 pb-8">
       

        {/* Filters component */}
        
      </main>
        <ProblemTable></ProblemTable>

      <footer className="w-ful border-t border-[#0ef]">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">
          <p>© 2024 CipherStack</p>
        </div>
      </footer>
    </div>
  );
};

export default ProblemsPage;