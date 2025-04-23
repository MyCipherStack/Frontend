


import { problemService } from '@/service/problemService';
import { toastError } from '@/utils/toast';
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AdminNavbar from './NavBar';
import Link from 'next/link';
import BasicInfoTab from './BasicInfoTab';
import ProblemDescTab from './ProblemDescTab';
import TestCasesTab from './TestCasesTab';
import PreviewTab from './PreviewTab';
import FunctionSignatureTab from './FunctionSignatureTab ';
import Head from 'next/head';
import { FaList } from 'react-icons/fa';






const EditProblem = ({formData,setFormData,setEditProblem}) => {
    
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('basic-info');
         
         
         useEffect(() => {

              if (Object.keys(errors).length > 0) {
                 console.log("Updated errors inside useEffect:", errors);
            toastError(Object.values(errors)[0])
              }
                  }, [errors]);

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
      if (!testCase.input) return
    if (!testCase.output) newErrors[`testCaseOutput-${index}`] = 'Output is required';
  });
}

  
if (tab === 'function-signature') {
  if (!formData.functionSignatureMeta.name) return
  if (!formData.functionSignatureMeta.parameters)  return
  if (!formData.functionSignatureMeta.returnType)  return  }
setErrors(newErrors);
console.log(newErrors);
console.log(errors);

return Object.keys(newErrors).length === 0;
};

const handleTabChange = (tab) => {
  if (activeTab === 'basic-info' && !validateForm('basic-info')) return 
  if (activeTab === 'problem-desc' && !validateForm('problem-desc')) return  
  if (activeTab === 'test-cases' && !validateForm('test-cases')) return  
  if (activeTab === 'function-signature' && !validateForm('function-signature')) return  toastError("Please fill out all the required fields.")
  setActiveTab(tab);
  
};

const handleSubmit =async (e:FormEvent) => {

  e.preventDefault();
  try{

      const response=await problemService("/api/admin/problem",formData)
   
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
  
      <div className="content-area ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl  font-bold neon-text">Add New Problem</h1>
           <div className="flex items-center gap-2" onClick={()=>setEditProblem(false)}>
                  <FaList></FaList>
                   <div className="text-m font-bold ">All Problem</div>
                  </div>
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
            className={`tab-button ${activeTab === 'function-signature' ? 'active' : ''}`} 
            onClick={() => handleTabChange('function-signature')}
          >
           function-signature
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

  {activeTab === 'function-signature' && (
    <FunctionSignatureTab
      formData={formData} 
      setFormData={setFormData}
      prevTab={handleTabChange}
      nextTab={handleTabChange}
    />
  )}
        </form>
      </div>

  </>
);
   

}

export default EditProblem