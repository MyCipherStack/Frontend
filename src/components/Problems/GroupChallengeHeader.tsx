
import React from 'react'
import Timer from '../Timer'
import { FaSignOutAlt } from 'react-icons/fa'

const GroupChallengeHeader = ({ activeTab, setActiveTab, timerControler, ExitGroupChallenge,
  SetproblemDetails, setCode, setTestCases, problems,problemDetails,challengeData,joinCode
}) => {

  return (
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
        <Timer timerControler={timerControler} id={challengeData._id} ></Timer>
      </div>

      <span className="flex  gap-1 ">
        {problems.map((problem, index) => (
          <button
            key={index}
            onClick={() => {
              SetproblemDetails(problem);
              setCode(problem.starterCode['javascript']);
              setTestCases(problem.testCases);
            }}
            className={`bg-blend-color border ${problemDetails===problem ?  "bg-red-800" : ""}   border-gray-300 rounded-xl shadow-sm px-2  text-sm hover:bg-gray-400 transition-all duration-150`}
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
  )
}

export default GroupChallengeHeader