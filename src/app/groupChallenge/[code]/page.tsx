"use client"



import Header from '@/components/Header';
import CipherStackSidebar from '@/components/LeaderBoardSlidBar';
import ProblemDescription from '@/components/ProblemDescription'
import Results from '@/components/Problems/Results';
import TestCases from '@/components/Problems/TestCases';
import {joinGroupChallenge } from '@/service/challengeServices';
import { runProblemService, submitProblemService } from '@/service/problemService';
import socket from '@/utils/socket';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa';



const groupChallenge = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [showTestCase,SetshowTestCase]=useState(true)
  const [submissionDetails,SetSubmissionDetails]=useState({})
  const [submissionTab,setSubmissionTab]=useState("submissionDetail")
  const [problemDetails, SetproblemDetails] = useState({ starterCode: "Javascript" })
  const [language, setLanguage] = useState('Javascript');
  const [code, setCode] = useState();
  const [testCases, setTestCases] = useState([]);
  const params=useParams()
  const [selectedTestCase, setSelectedTestCase] = useState(1);
  const [challengeData,setChallengeData]=useState({})

  const [problems,setProblems]=useState([])
// console.log(params,"ASDFasdf");
let joinCode=decodeURIComponent(params.code)





    useEffect(()=>{
      let getProblemData=async()=>{
    const params=new URLSearchParams({joinCode})
        

          const response = await joinGroupChallenge(params.toString());
          console.log(response.data,"joinDAta");
          let challenge=response.data.challengeData
          setChallengeData(challenge)
          socket.emit("join-challenge",challenge._id)

          let problem=response.data.challengeData.problems
          setProblems(problem)
          SetproblemDetails(problem[0])
          setCode(problem[0].starterCode['javascript'])
          const testCase=problem[0].testCases.filter(testCase=> testCase.isSample)
          setTestCases(testCase)
      }
      getProblemData()
    },[])
    
  

  useEffect(()=>{
      setCode(problemDetails.starterCode[language])
  },[language])

  const handleRunCode =async() => {
    const response=await runProblemService({code,testCases,language,problemDetails})
    SetshowTestCase(false)
    setTestCases(response.data.testResult);
    
    setActiveTab("testresult",challengeData._id,)
   
  };





  const handleSubmitCode = async() => {
    const response=await submitProblemService({code,testCases,language,problemDetails})

    console.log(response.data,"responseData");
    let submissionDetails=response.data.submissions
    console.log(submissionDetails,"Response submission data");
    SetSubmissionDetails(response.data.submissions)
    
    // setActiveTab("submissions")
    // setSubmissionTab("submissionDetail")
    console.log(challengeData,"challengeData");
    
    socket.emit("update-submit",challengeData._id,submissionDetails.userId,0,submissionDetails.problemId,submissionDetails.id)
  };


  const handleAddTestCase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(tc => tc._id)) + 1 : 1;
    setTestCases([
      ...testCases,
      {nums: [], target: 0, output: [], status: 'not-run' }
    ]);
    setSelectedTestCase(newId);
  };
  
  return (
    <>
  
        <div className="min-h-screen text-gray-100 flex flex-col relative">
          <div className="container px-4  pb-8 flex-grow text-sm">
        <Header></Header>

        
<div className="flex space-x-6 text-xs border-b border-neon-blue/30 pb-2 pt-18 mb-4">
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

    
  <div className='inline'>
            <span className="text-sm text-gray-400">Session Time:</span>  <span className="neon-text" >00:45:00</span>
        </div>
          <a href="arena.html" className= " inline px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-black transition duration-300">
            <span className='flex items-center'> <FaSignOutAlt/> Exit Session</span>
            </a>
</div>


      <div className="flex  items-center gap-2 pb-1">
       
        
          
        </div>
        <div className='flex gap-2'>
        {problems.map((problem,index)=>{

        return  <button key={index} onClick={()=>{SetproblemDetails(problem),
          setCode(problem.starterCode['javascript']),
        setTestCases(problem.testCases);
  }
        } className="bg-red-500">problem{index+1}</button>    
       
        
        })}

        {/* <div>problem</div>
        <div>problem</div> */}
        </div>
      {/* <ProblemDescription
        problemDetails={problemDetails}
        language={language} setLanguage={setLanguage}
        code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode}
      ></ProblemDescription>   */}

{activeTab==="description"&& (

<ProblemDescription
problemDetails={problemDetails} 
language={language} setLanguage={setLanguage}
code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode} 
></ProblemDescription>

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

{activeTab==="submissions" && (
  <>
  <div>{submissionDetails.status}</div> 
  {submissionDetails.error ?? (<div className='text-red-600 text-2xl'>{submissionDetails.error}</div>)}
  {/* <div>{submissionDetails}</div> */}
  <div className="text-gray-300 text-sm">
                      <p className="mb-1"><span className="text-gray-500">Input:</span>{submissionDetails.failingTestCaseResult.input}</p>
                      <p className="mb-1"><span className="text-gray-500">Ouput:</span>{submissionDetails.failingTestCaseResult.output}</p>
                   
                    </div>
  </>
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


      <CipherStackSidebar challengeId={SetproblemDetails}/>
      </div>
      </div>
    </>
  )
}

export default groupChallenge