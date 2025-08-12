


import { typeTestCase } from '@/types/problem';
import React from 'react'
import { FaCheckCircle, FaExclamationCircle, FaPlay, FaSpinner, FaTrash } from 'react-icons/fa'

const Results = ({testCases,showTestCase}:{testCases: typeTestCase[]; showTestCase: boolean}) => {
  console.log(testCases,"results");
  return (
    <>
  {showTestCase ?(

<div className='h-[500px] w-full flex items-center justify-center text-lg '>
  <FaPlay className='animate-pulse text-2xl mr-4 '/>
  <div>First run code</div>
</div>
  ):(

    <div className="w-full ">
              <h3 className="text-neon-blue font-semibold mb-3">Results</h3>
              <div className="bg-black bg-opacity-50 p-4 rounded border border-gray-800">
                {testCases.map(testCase => (
                  
                  <div key={testCase._id} className="mb-3 pb-3 border-b border-gray-700">
                    {testCase.error ? (

                      <div className='text-red-600 text-2xl'>{testCase.error}</div>
                    ) : (
                      <>

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Case {testCase._id}</span>
                      {testCase.status == true ? (
                        <span className="text-green-400 text-xs flex items-center">
                          <FaCheckCircle className="mr-1" /> Passed
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-xs flex items-center">
                          <FaExclamationCircle className="mr-1" /> Wrong answer
                        </span>
                      )}
                    </div>
                    <div className="text-gray-300 text-sm">
                      <p className="mb-1"><span className="text-gray-500">Input:</span>{testCase.input}</p>
                      <p className="mb-1"><span className="text-gray-500">Ouput:</span>{testCase.compile_output}</p>
                      <p className="mb-1"><span className="text-gray-500">Log output:</span>{testCase.logOut}</p>
                      <p className="mb-1"><span className="text-gray-500">Expected:</span>{testCase.output}</p>
                      {/* <p className="mb-1"><span className="text-gray-500">Output:</span> {testCase.}</p> */}
                      {/* <p><span className="text-gray-500">Time:</span> {testCase.status === 'passed' ? '0.01 ms' : '-'}</p> */}
                    </div>

                          </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            )}
            </>
  )
}

export default Results