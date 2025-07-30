


import { toastError } from '@/utils/toast';
import React, { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link';
import BasicInfoTab from './BasicInfoTab';
import ProblemDescTab from './ProblemDescTab';
import TestCasesTab from './TestCasesTab';
import PreviewTab from './PreviewTab';
import FunctionSignatureTab from './FunctionSignatureTab ';
import { FaList } from 'react-icons/fa';






const ProblemDetails = ({ handleSubmit, Addproblem, formData, setFormData, showAllProblems }: {
  handleSubmit: ((e: MouseEvent<HTMLButtonElement>) => void)
  Addproblem: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  showAllProblems: (show: boolean) => void;
}) => {

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('basic-info');


  useEffect(() => {

    if (Object.keys(errors).length > 0) {
      console.log("Updated errors inside useEffect:", errors);

      toastError(Object.values(errors)[0])
    }
  }, [errors]);

  const validateForm = (tab: string) => {

    const newErrors: Record<string, string> = {};

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
      formData.testCases.forEach((testCase: { input: string; output: string; testCaseNo: string }, index: number) => {
        if (!testCase.input) return newErrors[`testCase_${index}`] = "testcase input is required"
        if (!testCase.output) newErrors[`testCase_${index}`] = 'Output is required';
        if (!testCase.testCaseNo) newErrors[`testCase_${index}`] = 'testCase no is required';

      });
    }


    if (tab === 'function-signature') {
      if (!formData.functionSignatureMeta.name) return
      if (!formData.functionSignatureMeta.parameters) return
      if (!formData.functionSignatureMeta.returnType) return
    }
    setErrors(newErrors);
    console.log(newErrors);
    console.log(errors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (tab: string) => {
    if (activeTab === 'basic-info' && !validateForm('basic-info')) return
    if (activeTab === 'problem-desc' && !validateForm('problem-desc')) return
    if (activeTab === 'test-cases' && !validateForm('test-cases')) return
    if (activeTab === 'function-signature' && !validateForm('function-signature')) return toastError("Please fill out all the required fields.")
    setActiveTab(tab);

  };




  return (
    <>

      <div className="content-area ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl  font-bold neon-text">{Addproblem ? "Add new " : "Edit"} Problem</h1>
          <div className="flex items-center gap-2" onClick={() => showAllProblems(true)}>
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

        <form id="problem-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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

export default ProblemDetails