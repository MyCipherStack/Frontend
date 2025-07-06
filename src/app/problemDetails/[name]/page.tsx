"use client"



import Header from '@/components/Header';
import ProblemDescription from '@/components/ProblemDescription';
import Solutions from '@/components/Problems/Discussion';
import Results from '@/components/Problems/Results';
import Submissions from '@/components/Problems/Submissions';
import TestCases from '@/components/Problems/TestCases';
import Timer from '@/components/Timer';
import { getAllProblems, getProblemDetails, problemDetailsService } from '@/service/getDataService';
import {runProblemService, submitProblemService } from '@/service/problemService';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {FaHistory, FaBook } from 'react-icons/fa';

type typeTestCase = {
  id: number;
  nums: string;
  target: number;
  output: string;
  status: 'passed' | 'failed' | 'not-run';
};

const ProblemPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState();
  const [testCases, setTestCases] = useState<typeTestCase[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const [showTestCase,SetshowTestCase]=useState(true)
  const [submissionDetails,SetSubmissionDetails]=useState({})
  const [submissionTab,setSubmissionTab]=useState("submissionDetail")
  
  
  const [problemDetails,SetproblemDetails]=useState({starterCode:"javascript"})
  const params:{title:string}=useParams()
  const search=decodeURIComponent(params.name)

  useEffect(()=>{
    const getProblemData=async()=>{
    // const params=new URLSearchParams({page,limit,difficulty,status,search,category})
    
    const params=new URLSearchParams({search})

        const response = await getProblemDetails(params.toString());
        const problem=response.data.problem
        console.log(problem)
        SetproblemDetails(problem)
        const testCase=problem.testCases.filter(testCase=> testCase.isSample) 
        console.log(testCase);
        setTestCases(testCase)
        

    
    }
    getProblemData()
  },[])

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };


  
  const handleRunCode =async() => {
    
    const response=await runProblemService({code,testCases,language,problemDetails})
    SetshowTestCase(false)
    setTestCases(response.data.testResult);
    
    setActiveTab("testresult")
   
  };





  const handleSubmitCode = async() => {
    const response=await submitProblemService({code,testCases,language,problemDetails})

    console.log(response.data.submissions);
    SetSubmissionDetails(response.data.submissions)
    setActiveTab("submissions")
    setSubmissionTab("submissionDetail")
   
  };




  const handleAddTestCase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(tc => tc.id)) + 1 : 1;
    setTestCases([
      ...testCases,
      { id: newId, nums: [], target: 0, output: [], status: 'not-run' }
    ]);
    setSelectedTestCase(newId);
  };


  

  useEffect(()=>{
      setCode(problemDetails.starterCode['javascript'])
  },[problemDetails])

  useEffect(()=>{
      setCode(problemDetails.starterCode[language])
  },[language])

  
  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative">
      <Header></Header>



      {/* Main Content */}
      <div className="container px-4 pt-18 pb-8 flex-grow text-sm">




<div className="flex space-x-6 text-xs border-b border-neon-blue/30 pb-2 mb-4">
  <span 
    className={`font-light cursor-pointer pb-1 ${
      activeTab === 'description' 
        ? 'text-neon-blue border-b-2 border-neon-blue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() => setActiveTab('description')}
  >
    DESCRIPTION
  </span>
  <span 
    className={`font-light cursor-pointer pb-1 ${
      activeTab === 'testcase' 
        ? 'text-neon-blue border-b-2 border-neon-blue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() => setActiveTab('testcase')}
  >
   TEST CASES
  </span>
  <span 
    className={`font-light cursor-pointer pb-1 ${
      
      activeTab === 'testresult' 
        ? 'text-neon-blue border-b-2 border-neon-blue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() => setActiveTab('testresult')}
  >
   TEST RESULT
  </span>
  <span 
    className={`font-light cursor-pointer pb-1 ${
      activeTab === 'submissions' 
        ? 'text-neon-blue border-b-2 border-neon-blue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() =>{ setActiveTab('submissions')  
    setSubmissionTab("allSubmission")}

    }
  >
    <FaHistory className="inline " /> SUBMISSIONS
  </span>
  <span 
    className={`font-light cursor-pointer pb-1 ${
      activeTab === 'solution' 
        ? 'text-neon-blue border-b-2 border-neon-blAAue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() => setActiveTab('solution')}
  >
  <FaBook className=' inline'/> SOLUTIONS
  </span>

  <Timer timerControler={true}/>
</div>




          {activeTab==="description"&& (

            <ProblemDescription
            problemDetails={problemDetails} 
            language={language} setLanguage={setLanguage}
            code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode} 
            ></ProblemDescription>
       
          )}

        {activeTab==="solution"&& (

          <Solutions></Solutions>
          )}

          {activeTab==="submissions"&& (

          <Submissions submissionTab={submissionTab} setSubmissionTab={setSubmissionTab} SetSubmissionDetails={SetSubmissionDetails} submissionDetails={submissionDetails} problemId={problemDetails._id} ></Submissions>

          )}


        {activeTab==="testcase" && (
        <div className=" h-[calc(100vh-100px)] bg-card-bg rounded-lg neon-border relative overflow-hidden scroll-top" >
          <div className="bg-black px-6 py-3 border-b border-neon-blue">
            <div className="text-neon-blue font-bold">Test Cases & Results</div>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            {/* Test Cases */}
           <TestCases  testCases={testCases} setTestCases={setTestCases} setSelectedTestCase={setSelectedTestCase} selectedTestCase={selectedTestCase}  handleAddTestCase={handleAddTestCase}  />
          </div>
        </div>
        )}



        {activeTab==="testresult" && (
        <div className=" h-[calc(100vh-100px)] bg-card-bg rounded-lg neon-border relative overflow-hidden scroll-top" >
          <div className="bg-black px-6 py-3 border-b border-neon-blue">
            <div className="text-neon-blue font-bold">Test Results</div>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">      
          <Results testCases={testCases} showTestCase={showTestCase}></Results>
          </div>
        </div>


        )}


      </div>
  
    </div>
  );
};


export default ProblemPage;


