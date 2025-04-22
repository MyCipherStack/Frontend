


import React from 'react'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const Results = ({testCases}) => {
  return (
    <>
    
    <div className="w-full md:w-1/2">
              <h3 className="text-neon-blue font-semibold mb-3">Results</h3>
              <div className="bg-black bg-opacity-50 p-4 rounded border border-gray-800">
                {testCases.map(testCase => (
                  <div key={testCase.id} className="mb-3 pb-3 border-b border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Case {testCase.id}</span>
                      {testCase.status === 'passed' ? (
                        <span className="text-green-400 text-xs flex items-center">
                          <FaCheckCircle className="mr-1" /> Passed
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-xs flex items-center">
                          <FaExclamationCircle className="mr-1" /> Not Run
                        </span>
                      )}
                    </div>
                    <div className="text-gray-300 text-sm">
                      <p className="mb-1"><span className="text-gray-500">Expected:</span> [{testCase.output.join(',')}]</p>
                      <p className="mb-1"><span className="text-gray-500">Output:</span> {testCase.status === 'passed' ? `[${testCase.output.join(',')}]` : '-'}</p>
                      <p><span className="text-gray-500">Time:</span> {testCase.status === 'passed' ? '0.01 ms' : '-'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div></>
  )
}

export default Results