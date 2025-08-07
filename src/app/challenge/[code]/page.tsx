"use client"

import Header from '@/components/Header';
import LeaderBoardSideBar from '@/components/LeaderBoardSideBar';
import ProblemDescription from '@/components/ProblemDescription'
import Results from '@/components/Problems/Results';
import TestCases from '@/components/Problems/TestCases';
import { joinGroupChallenge, startChallenge } from '@/service/challengeServices';
import { runProblemService, submitProblemService } from '@/service/problemService';
import socket from '@/utils/socket';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startTimer } from '@/features/timerSlice';
import { toastError, toastSuccess } from '@/utils/toast';
import { RootState } from '@/store/store';
import { challenge } from '@/types/challenge';
import Timer from '@/components/Timer';
import { FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { IProblem } from '@/types/problem';





const GroupChallenge = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [showTestCase, setShowTestCase] = useState(true)
  const [submissionDetails, SetSubmissionDetails] = useState({})
  const [problemDetails, setProblemDetails] = useState<Partial<IProblem>>({
    starterCode: { Javascript: "" }
    , acceptance: {
      submitted: 0,
      accepted: 0
    }, constraints: "", difficulty: "", functionSignatureMeta: {
      name: "",
      parameters: [],
      returnType: { type: "" }

    },
    title: "",
    problemId: "",
    timeLimit: 0,
    memoryLimit: 0,
    hint: "",
    tags: "",
    statement: "", inputFormat: "", outputFormat: "", 
  

  })
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState();
  const [testCases, setTestCases] = useState([]);
  const params: { code: string } = useParams()
  const [selectedTestCase, setSelectedTestCase] = useState(1);
  const [challengeData, setChallengeData] = useState<challenge>({
    _id: "",
    challengeName: "",
    createdAt: "", duration: 30, joinCode: "", maxParticipants: 6, participants: "",
    problems: [], status: "", type: ""
  })
  const userData = useSelector((state: RootState) => state.auth.user)
  const [problems, setProblems] = useState([])
  const joinCode = decodeURIComponent(params.code)
  const dispatch = useDispatch()
  const route = useRouter()





  const [isHost, setIsHost] = useState(true)


  const challengeEnd = () => {
    toastError("Challenge Ended")
    route.back()
  }










  useEffect(() => {
    // if (!alreadyRun) {

    // alreadyRun = true
    const getProblemData = async () => {
      const params = new URLSearchParams({ joinCode })
      try {
        const response = await joinGroupChallenge(params.toString());

        const challenge = response.data.challengeData

        dispatch(startTimer(challenge._id))

        setIsHost(challenge.isHost)
        console.log(challenge, "challegeData");

        if (new Date(challenge.endTime).getTime() < Date.now()) {
          toastError("Challenge Time Ended")
          challengeEnd();
        }


        setChallengeData(challenge)


        console.log("useriddd check", userData);
        socket.emit("join-challenge", challenge._id, userData?.id)

        const problem = response.data.challengeData.problems

        setProblems(problem)

        setProblemDetails(problem[0])

        setCode(problem[0].starterCode['javascript'])

        const testCase = problem[0].testCases.filter(testCase => testCase.isSample)

        setTestCases(testCase)


        socket.on("update-challenge-status", updatedChallengeData => {

          toastSuccess("updating leaderboard..........")
          setChallengeData(updatedChallengeData)


        })



      } catch (error) {
        const err = error as any;
        if (axios.isAxiosError(error)) {
          toastError(error?.response?.data?.message || 'Failed to join challenge');
        }
        // if (err?.response?.data?.message) {v
        //   toastError(String(err.response.data.message));
        // } else {
        //   toastError("An error occurred");
        // }
        if (!err?.response?.data?.status) {

          route.back()
        }

      }


    }

    getProblemData()
    // }



  }, [])



  useEffect(() => {
    setCode(problemDetails.starterCode[language])
  }, [language])

  const handleRunCode = async () => {

    const response = await runProblemService({ code, testCases, language, problemDetails })
    setShowTestCase(false)
    setTestCases(response.data.testResult);

    setActiveTab("testresult")

  };




  const [isStarting, setIsStarting] = useState(false);

  const handleStartChallenge = async () => {
    setIsStarting(true);

    const response = await startChallenge(challengeData._id!)

    // emit staring data to all participants
    socket.emit("update-challenge-status", challengeData._id, response);


  };



  const handleSubmitCode = async () => {

    const response = await submitProblemService({ code, testCases, language, problemDetails })

    console.log(response.data, "responseData");
    const submissionDetails = response.data.submissions
    console.log(submissionDetails, "Response submission data");
    SetSubmissionDetails(response.data.submissions)

    setActiveTab("submissions")

    console.log(challengeData, "challengeData");

    socket.emit("update-submit", challengeData._id, submissionDetails.userId, 0, submissionDetails.problemId, submissionDetails.id)


  }


  const handleAddTestCase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(tc => tc._id)) + 1 : 1;
    setTestCases([
      ...testCases,
      { nums: [], target: 0, output: [], status: 'not-run' }
    ]);
    setSelectedTestCase(newId);
  };

  const ExitGroupChallenge = () => {

    // socket.emit("disconnect")
    route.back()
  }



  const copyHandle = (code: string) => {
    console.log("copy code");

    navigator.clipboard.writeText(code)
    toastSuccess("Copied to clipboard!")
  }
  return (
    <>
      {isHost && challengeData.status === "waiting" && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-[#111111] rounded-xl border-2 border-[#0ef] shadow-lg shadow-[#0ef]/30 w-full max-w-sm p-8 flex flex-col items-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-[#0ef] rounded-xl blur-md opacity-20"></div>
            {/* Challenge icon */}
            <div className="mb-6 relative z-10">
              <div className="flex items-center justify-center h-16 w-16 bg-[#0ef]/10 rounded-full border border-[#0ef]">
                <svg className="w-8 h-8 text-[#0ef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            {/* Title */}
            <h2 className="text-[#0ef] text-2xl font-bold mb-2 relative z-10">
              Host Controls
            </h2>

            {/* Challenge info */}
            <p className="text-gray-300 text-center mb-6 relative z-10">
              You are hosting: <span className="font-semibold text-white">{"D"}</span>
            </p>

            <span>
              <span className='cursor-copy'> {joinCode}</span>

              <button
                onClick={() => copyHandle(joinCode)}
                className="relative px-4 ml-3 mb-2 py-2 cursor-pointer  border border-neon-blue  rounded  transition duration-300">
                Copy
              </button>
            </span>

            {/* Start button */}
            <button
              onClick={handleStartChallenge}
              disabled={isStarting}
              className={`relative z-10 px-6 py-3 rounded-lg font-bold text-black ${isStarting ? 'bg-gray-500' : 'bg-[#0ef] hover:bg-[#0af]'} transition-all duration-300 flex items-center`}
            >
              {isStarting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Starting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Challenge
                </>
              )}
            </button>



            {/* Host instructions */}
            <p className="text-xs text-gray-400 mt-6 text-center relative z-10">
              As host, you control when the challenge begins.
              <br />
              Players will join automatically when you start.
            </p>


          </div>
        </div>
      )}
      {challengeData.status == "waiting" && !isHost && (

        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 ">
          <div className="bg-[#111111] rounded-lg neon-border-danger w-full max-w-xs p-8 flex flex-col items-center">
            <div className="mb-4">
              <span
                className="inline-block animate-spin"
                style={{
                  border: "4px solid rgb(255, 119, 0) ",
                  borderRightColor: "transparent",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px"
                }}
              ></span>
            </div>
            <div className=" text-lg font-bold mb-2">Please wait...</div>
            <div className="text-gray-400 text-center">Joining challenge. Do not refresh or close this window.
              Please keep this window open. This may take a few moments.

            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen text-gray-100 flex flex-col relative">
        <div className="container px-4  pb-8 flex-grow text-sm">
          <Header></Header>

          <div className="flex space-x-6 text-xs border-b border-neon-blue/30  pt-18 mb-4">
            <span
              className={`font-light cursor-pointer pb-1 ${activeTab === 'description'
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-gray-400 hover:text-neon-blue'
                }`}
              onClick={() => setActiveTab('description')}
            >
              DESCRIPTION
            </span>
            <span
              className={`font-light cursor-pointer pb-1 ${activeTab === 'testcase'
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-gray-400 hover:text-neon-blue'
                }`}
              onClick={() => setActiveTab('testcase')}
            >
              TEST CASES
            </span>
            <span
              className={`font-light cursor-pointer pb-1 ${activeTab === 'testresult'
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-gray-400 hover:text-neon-blue'
                }`}
              onClick={() => setActiveTab('testresult')}
            >
              TEST RESULT
            </span>


            <div className='inline'>
              <Timer timerControler={true} id={challengeData._id} ></Timer>
            </div>

            <span className="flex  gap-1 ">
              {problems.map((problem, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setProblemDetails(problem);
                    setCode(problem.starterCode['javascript']);
                    setTestCases(problem.testCases);
                  }}
                  className={`bg-blend-color border ${problemDetails === problem ? "bg-red-800" : ""}   border-gray-300 rounded-xl shadow-sm px-2  text-sm hover:bg-gray-400 transition-all duration-150`}
                >
                  🧠 Problem {index + 1}
                </button>
              ))}
            </span>
            <span onClick={ExitGroupChallenge} className=" inline px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-black transition duration-300">
              <span className='flex items-center'> <FaSignOutAlt /> Exit Session</span>
            </span>
            <span className="text-sm">joinCode: {joinCode}</span>
          </div>



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

              <div className={`text-lg font-semibold mb-2 ${submissionDetails.status === 'Accepted' ? 'text-green-500' : 'text-yellow-400'}`}>
                {submissionDetails.status}
              </div>

              {submissionDetails.error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-md border border-red-300 mb-4 text-sm">
                  ⚠️ {submissionDetails.error}
                </div>
              )}

              {/* Failing Test Case Details */}
              {submissionDetails?.failingTestCaseResult.compile_output &&
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
              }
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

export default GroupChallenge