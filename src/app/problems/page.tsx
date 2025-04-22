"use client"
import { useState } from 'react';

import Navbar from '@/components/NavBar';
import Header from '@/components/Header';
import ProblemTable from '@/components/Problems/ProblemTable';

const ProblemsPage = () => {


  return (
    <div className="min-h-screen ">
     <Header></Header>
      
      <div className="container mx-auto px-4 pt-24 pb-8">
      

      
      </div>
      <main>
        <ProblemTable></ProblemTable>
      </main>

      <footer className="w-ful border-t border-[#0ef]">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">
          <p>© 2024 CipherStack</p>
        </div>
      </footer>
    </div>
  );
};

export default ProblemsPage;