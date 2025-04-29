"use client"



import Header from '@/components/Header';
import ProblemDescription from '@/components/ProblemDescription';
import Solutions from '@/components/Problems/Discussion';
import Results from '@/components/Problems/Results';
import Submissions from '@/components/Problems/Submissions';
import TestCases from '@/components/Problems/TestCases';
import { getAllProblems } from '@/service/getDataService';
import {runProblemService } from '@/service/problemService';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {FaBookmark, FaThumbsUp, FaThumbsDown, FaHistory, FaBook, FaLightbulb } from 'react-icons/fa';



const ProblemPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [darkMode, setDarkMode] = useState(true);
  const [code, setCode] = useState();
  const [testCases, setTestCases] = useState([
    { id: 1, nums: "[2,7,11,15]", target: 9, output: "[0,1]", status: 'passed' },
    { id: 2, nums: "[3,2,4]", target: 6, output: "[1,2", status: 'not-run' }
  ]);
  const [selectedTestCase, setSelectedTestCase] = useState(1);
  const codeEditorRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showHint, setShowHint] = useState(false);
  
  const [show,setShow]=useState(true)
  
  
  const [programDetails,SetProgramDetails]=useState({starterCode:"javascript"})
  
  

  let params:{name:string}=useParams()
  let search=decodeURIComponent(params.name)

  useEffect(()=>{
    let getProblemData=async()=>{
    // const params=new URLSearchParams({page,limit,difficulty,status,search,category})
    
    const params=new URLSearchParams({search})

        const response = await getAllProblems(params.toString());
        let problem=response.data.problemData.problems
        console.log(problem[0])
        SetProgramDetails(problem[0])
        const testCase=problem[0].testCases.filter(testCase=> testCase.isSample)
        console.log(testCase);
        setTestCases(testCase)
        

    
    }
    getProblemData()
  },[])

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };


  
  const handleRunCode =async() => {
    // Simulate running code
    console.log("code ");

    const response=await runProblemService({code,testCases,language,programDetails})
    setShow(false)
    console.log(response);
    console.log(response.data.testResult);
    setTestCases(response.data.testResult);
    
    setActiveTab("testresult")
    // const updatedTestCases = [...response.data.testCase];
    // updatedTestCases[0].status = 'passed';
  };





  const handleSubmitCode = () => {
    // Simulate submission
    const updatedTestCases = [...testCases];
    updatedTestCases.forEach(tc => tc.status = 'passed');
    setTestCases(updatedTestCases);
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
      setCode(programDetails.starterCode['javascript'])
  },[programDetails])
  useEffect(()=>{
      setCode(programDetails.starterCode[language])
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
    onClick={() => setActiveTab('submissions')}
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
</div>




          {activeTab==="description"&& (

            <ProblemDescription
            programDetails={programDetails} setShowHint={setShowHint} showHint={showHint}
            language={language} setLanguage={setLanguage}
            darkMode={darkMode} setDarkMode={setDarkMode} 
            code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode} 
            ></ProblemDescription>
       
          )}

        {activeTab==="solution"&& (

          <Solutions></Solutions>
          )}

          {activeTab==="submissions"&& (

          <Submissions></Submissions>

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
          <Results testCases={testCases} show={show}></Results>
          </div>
        </div>


        )}


      </div>

  
    </div>
  );
};


export default ProblemPage;


