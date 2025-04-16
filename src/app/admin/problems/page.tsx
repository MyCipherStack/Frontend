"use client"

import { FormEvent, useState } from 'react';
import PreviewTab from '@/components/Admin/PreviewTab';
import Head from 'next/head';
import BasicInfoTab from '@/components/Admin/BasicInfoTab';
import ProblemDescTab from '@/components/Admin/ProblemDescTab';
import TestCasesTab from '@/components/Admin/TestCasesTab';
import Link from 'next/link';
import AdminNavbar from '@/components/Admin/NavBar';
import { toast } from 'react-toastify';
import { problemService } from '@/service/problemService';

export default function ProblemManagement() {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState({
    title: '',
    problemId: '',
    difficulty: '',
    timeLimit: 1000,
    memoryLimit: 128,
    isPremium: false,
    tags: '',
    statement: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    testCases: [
      { input: '', output: '', isSample: false },
      { input: '', output: '', isSample: true }
    ]
  });
  


  const [errors, setErrors] = useState({});


  const errHandler=(error)=>{

    toast.error(error,{
      position:"top-right",
      autoClose:2000,
      style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"},
      
    })
  }
const validateForm = (tab) => {
  const newErrors = {};
  
  if (tab === 'basic-info') {
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.problemId) newErrors.problemId = 'Problem ID is required';
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty is required';
    if (!formData.timeLimit) newErrors.timeLimit = 'Time limit is required';
    if (!formData.memoryLimit) newErrors.memoryLimit = 'Memory limit is required';
  }
  
  if (tab === 'problem-desc') {
    if (!formData.statement) newErrors.statement = 'Problem statement is required';
    if (!formData.inputFormat) newErrors.inputFormat = 'Input format is required';
    if (!formData.outputFormat) newErrors.outputFormat = 'Output format is required';
    if (!formData.constraints) newErrors.constraints = 'Constraints are required';
  }
  
  if (tab === 'test-cases') {
    formData.testCases.forEach((testCase, index) => {
      if (!testCase.input) newErrors[`testCaseInput-${index}`] = 'Input is required';
      if (!testCase.output) newErrors[`testCaseOutput-${index}`] = 'Output is required';
    });
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleTabChange = (tab) => {
    if (activeTab === 'basic-info' && !validateForm('basic-info')) return  errHandler("Please fill out all the required fields.");
    if (activeTab === 'problem-desc' && !validateForm('problem-desc')) return  errHandler("Please fill out all the required fields.");
    if (activeTab === 'test-cases' && !validateForm('test-cases')) return  errHandler("Please fill out all the required fields.");
    setActiveTab(tab);
    
  };

  const handleSubmit =async (e:FormEvent) => {
    e.preventDefault();
    try{

      const response=await problemService("/api/admin/problem",formData)
      alert('Problem saved successfully!');
      // Here you would typically send the formData to your API
      console.log('Form submitted:', formData);
         toast.success(response.data.message,{
                position:"top-right",
                autoClose:2000,
                style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"}
              })
              setActiveTab('basic-info')
    }catch(error){
        toast.error("Something went wrong.Please try again",{
                    position:"top-right",
                  autoClose:3000,
                  style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"},
                  
                })
    }
  };

  return (
    <>
      <Head>
        <title>Problem Management - CipherStack</title>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </Head>
      
      <div className="flex">
        <AdminNavbar status={"problems"}></AdminNavbar>
        <div className="content-area w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold neon-text">Add New Problem</h1>
            <div className="flex items-center gap-4">
              <Link href="/admin/problem-list">
                {/* <a className="px-4 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300">
                  <i className="fas fa-list mr-2"></i>All Problems
                </a> */}
              </Link>
            </div>
          </div>

          <div className="flex border-b border-gray-800 mb-6">
            <button 
              className={`tab-button ${activeTab === 'basic-info' ? 'active' : ''}`} 
              onClick={() => handleTabChange('basic-info')}
            >
              Basic Info
            </button>
            <button 
              className={`tab-button ${activeTab === 'problem-desc' ? 'active' : ''}`} 
              onClick={() => handleTabChange('problem-desc')}
            >
              Problem Description
            </button>
            <button 
              className={`tab-button ${activeTab === 'test-cases' ? 'active' : ''}`} 
              onClick={() => handleTabChange('test-cases')}
            >
              Test Cases
            </button>
            <button 
              className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`} 
              onClick={() => handleTabChange('preview')}
            >
              Preview
            </button>
          </div>

          <form id="problem-form" onSubmit={handleSubmit}>
            {activeTab === 'basic-info' && (
              <BasicInfoTab 
                formData={formData} 
                setFormData={setFormData} 
                nextTab={handleTabChange}
              />
            )}
            
            {activeTab === 'problem-desc' && (
              <ProblemDescTab 
                formData={formData} 
                setFormData={setFormData} 
                prevTab={handleTabChange}
                nextTab={handleTabChange}
              />
            )}
            
            {activeTab === 'test-cases' && (
              <TestCasesTab 
                formData={formData} 
                setFormData={setFormData} 
                prevTab={handleTabChange}
                nextTab={handleTabChange}
              />
            )}
            
            {activeTab === 'preview' && (
              <PreviewTab 
                formData={formData} 
                prevTab={handleTabChange}
                submitForm={handleSubmit}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
}