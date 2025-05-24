"use client"

import Header from '@/components/Header';
import LeaderBoardSideBar from '@/components/LeaderBoardSideBar';
import ProblemDescription from '@/components/ProblemDescription'
import Results from '@/components/Problems/Results';
import TestCases from '@/components/Problems/TestCases';
import { joinGroupChallenge } from '@/service/challengeServices';
import { runProblemService, submitProblemService } from '@/service/problemService';
import socket from '@/utils/socket';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startTimer } from '@/features/timerSlice';
import { toastError } from '@/utils/toast';
import GroupChallengeHeader from '@/components/Problems/GroupChallengeHeader';





const groupChallenge = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [showTestCase, SetshowTestCase] = useState(true)
  const [submissionDetails, SetSubmissionDetails] = useState({})
  const [submissionTab, setSubmissionTab] = useState("submissionDetail")
  const [problemDetails, SetproblemDetails] = useState({ starterCode: "Javascript" })
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState();
  const [testCases, setTestCases] = useState([]);
  const params = useParams()
  const [selectedTestCase, setSelectedTestCase] = useState(1);
  const [challengeData, setChallengeData] = useState({})
  const userData = useSelector((state: any) => state.auth.user)
  const [problems, setProblems] = useState([])
  // console.log(params,"ASDFasdf");
  let joinCode = decodeURIComponent(params.code)
  const dispatch = useDispatch()
  const route = useRouter()


  let challengeEnd = () => {
    toastError("Challenge Ended")
    route.back()
  }





  useEffect(() => {
    let getProblemData = async () => {
      const params = new URLSearchParams({ joinCode })
      try {
        const response = await joinGroupChallenge(params.toString());




        console.log(response.data, "joinDAta", userData._id, "userId");
        let challenge = response.data.challengeData
        console.log(challenge.endTime, "challegeData");

        if (new Date(challenge.endTime).getTime() < Date.now()) {
          challengeEnd();
        }


        setChallengeData(challenge)
        socket.emit("join-challenge", challenge._id, userData._id)

        let problem = response.data.challengeData.problems
        setProblems(problem)
        SetproblemDetails(problem[0])
        setCode(problem[0].starterCode['javascript'])
        const testCase = problem[0].testCases.filter(testCase => testCase.isSample)
        setTestCases(testCase)
      } catch (error) {
        console.log(error);

        toastError(error.response.data.message)

      }

    }
    getProblemData()
    // const interval = setInterval(() => {
    //   setElapsedTime(prev => prev + 1);
    // }, 1000);

    dispatch(startTimer())

  }, [])



  useEffect(() => {
    setCode(problemDetails.starterCode[language])
  }, [language])

  const handleRunCode = async () => {
    const response = await runProblemService({ code, testCases, language, problemDetails })
    SetshowTestCase(false)
    setTestCases(response.data.testResult);

    setActiveTab("testresult", challengeData._id,)

  };





  const handleSubmitCode = async () => {
    const response = await submitProblemService({ code, testCases, language, problemDetails })

    console.log(response.data, "responseData");
    let submissionDetails = response.data.submissions
    console.log(submissionDetails, "Response submission data");
    SetSubmissionDetails(response.data.submissions)

    setActiveTab("submissions")
    setSubmissionTab("submissionDetail")
    console.log(challengeData, "challengeData");

    socket.emit("update-submit", challengeData._id, submissionDetails.userId, 0, submissionDetails.problemId, submissionDetails.id)
  };


  const handleAddTestCase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(tc => tc._id)) + 1 : 1;
    setTestCases([
      ...testCases,
      { nums: [], target: 0, output: [], status: 'not-run' }
    ]);
    setSelectedTestCase(newId);
  };

  let ExitGroupChallenge = () => {
    route.back()
  }



  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <>

      <div className="min-h-screen text-gray-100 flex flex-col relative">
        <div className="container px-4  pb-8 flex-grow text-sm">
          <Header></Header>

          <GroupChallengeHeader activeTab={activeTab} setActiveTab={setActiveTab} timerControler={false} ExitGroupChallenge={ExitGroupChallenge} />




          {/* <div className="flex  items-center gap-2 pb-1">



          </div> */}
          <div className="flex  gap-1 p-1">
            {problems.map((problem, index) => (
              <button
                key={index}
                onClick={() => {
                  SetproblemDetails(problem);
                  setCode(problem.starterCode['javascript']);
                  setTestCases(problem.testCases);
                }}
                className="bg-blend-color border border-gray-300 rounded-xl shadow-sm px-4 py-2 text-sm hover:bg-gray-400 transition-all duration-150"
              >
                🧠 Problem {index + 1}
              </button>
            ))}
          </div>

          {/* <ProblemDescription
        problemDetails={problemDetails}
        language={language} setLanguage={setLanguage}
        code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode}
      ></ProblemDescription>   */}

          {activeTab === "description" && (

            <ProblemDescription
              problemDetails={problemDetails}
              language={language} setLanguage={setLanguage}
              code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode} pairEditor={false} challengeId={challengeData._id}
            ></ProblemDescription>

          )}



          {activeTab === "testcase" && (
            <div className=" h-[calc(100vh-100px)] bg-card-bg rounded-lg neon-border relative overflow-hidden scroll-top" >
              <div className="bg-black px-6 py-3 border-b border-neon-blue">
                <div className="text-neon-blue font-bold">Test Cases & Results</div>
              </div>

              <div className="p-4 flex flex-col md:flex-row gap-4">
                {/* Test Cases */}
                <TestCases testCases={testCases} setTestCases={setTestCases} setSelectedTestCase={setSelectedTestCase} selectedTestCase={selectedTestCase} handleAddTestCase={handleAddTestCase} />
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <>

              <div className={`text-lg font-semibold mb-2 ${submissionDetails.status === 'Success' ? 'text-green-500' : 'text-yellow-400'}`}>
                {submissionDetails.status}
              </div>

              {submissionDetails.error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-md border border-red-300 mb-4 text-sm">
                  ⚠️ {submissionDetails.error}
                </div>
              )}

              {/* Failing Test Case Details */}
              <div className="bg-gray-900 p-4 rounded-md text-gray-100 text-sm space-y-2 shadow-md border border-gray-700">
                <div>
                  <span className="text-gray-400 font-medium">Input:</span>
                  <pre className="bg-gray-800 p-2 mt-1 rounded">{submissionDetails.failingTestCaseResult.input}</pre>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Your Output:</span>
                  <pre className="bg-gray-800 p-2 mt-1 rounded">{submissionDetails.failingTestCaseResult.compile_output}</pre>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Expected Output:</span>
                  <pre className="bg-gray-800 p-2 mt-1 rounded text-green-400">{submissionDetails.failingTestCaseResult.output}</pre>
                </div>
              </div>
            </>

          )}

          {activeTab === "testresult" && (
            <div className=" h-[calc(100vh-100px)] bg-card-bg rounded-lg neon-border relative overflow-hidden scroll-top" >
              <div className="bg-black px-6 py-3 border-b border-neon-blue">
                <div className="text-neon-blue font-bold">Test Results</div>
              </div>

              <div className="p-4 flex flex-col md:flex-row gap-4">
                <Results testCases={testCases} showTestCase={showTestCase}></Results>
              </div>
            </div>


          )}


          <LeaderBoardSideBar challengeTime={challengeData.duration} ProblemCount={problems.length} challengeName={challengeData.challengeName} />
        </div>
      </div>
    </>
  )
}

export default groupChallenge