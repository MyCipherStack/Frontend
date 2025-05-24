
import React from 'react'
import Timer from '../Timer'
import { FaSignOutAlt } from 'react-icons/fa'

const GroupChallengeHeader = ({activeTab,setActiveTab,timerControler,ExitGroupChallenge}) => {

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
      <Timer timerControler={timerControler}></Timer>
    </div>
    <div onClick={ExitGroupChallenge} className=" inline px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-black transition duration-300">
      <span className='flex items-center'> <FaSignOutAlt /> Exit Session</span>
    </div>
  </div>
  )
}

export default GroupChallengeHeader