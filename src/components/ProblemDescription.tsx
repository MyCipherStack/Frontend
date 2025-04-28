

import React from 'react'
import Split from 'react-split'
import CodeEditorPanel from './CodeEditorPanel'
import { FaBookmark, FaLightbulb, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

const ProblemDescription = ({programDetails,setShowHint,showHint,language,setLanguage,darkMode,setDarkMode,code,setCode,handleRunCode,handleSubmitCode}) => {
  return (
        <>
         <div className="flex flex-col md:flex-row gap-4  pb-5">

<Split className='split' sizes={[45,60]} direction='horizontal' minSize={100} gutterSize={10}>
                              

      {/* Problem Description Panel */}


        <div className="w-full md:w-4/12 bg-card-bg rounded-lg neon-border relative overflow-hidden left-pane">
        <div className="bg-black px-6 py-3 border-b border-neon-blue flex justify-between items-center">
          <div className="text-neon-blue font-bold">Problem #1337</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-900 text-green-400 text-xs rounded">Easy</span>
            <span className="text-gray-400 text-xs">Acceptance: 67.8%</span>
          </div>
        </div>
        {/* Problem Content */}
        <div className="p-6 relative z-10 h-[calc(100vh-130px)] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 neon-text">{programDetails.title}</h2>
          
          <div className="mb-6 text-gray-300 w-fit ">
            <p className="mb-4">{programDetails.statement}</p>
          </div>
          

          {programDetails.testCases && (
          
          
            programDetails.testCases.map((example,index)=>
              
              example.isSample &&(
                <div key={example._id} className="mb-6">
            <h3 className="terxt-lg font-semibold text-neon-blue mb-2">Example {index+1}:</h3>
            <div className="bg-black bg-opacity-50 p-4 rounded">
              <p className="mb-1"><span className="text-gray-400">Input:</span>{example.input}</p>
              <p className="mb-1"><span className="text-gray-400">Output:</span>{example.output}</p>
             { example.explanation &&(
              <p className="mb-1"><span className="text-gray-400">Explanation:</span>{example.explanation}</p>

              )}
            </div>
          </div>
              )
            )
          
            )}
         
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neon-blue mb-2">Constraints:</h3>
            <ul className="list-disc list-inside pl-4 space-y-1 text-gray-300">
              {programDetails.constraints?.split(',').map((constraints, index) => (

                <li key={index}>  {constraints.trim()}</li>
))}
              {/* <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
              <li>Only one valid answer exists.</li> */}
            </ul>
          </div>
          
          <div className="mb-6">
  <button
    onClick={() => setShowHint(!showHint)}
    className="flex items-center gap-2 text-neon-blue hover:text-neon-blue-light transition-colors"
  >
    <FaLightbulb />

    {showHint ? 'Hide Hint' : 'Show Hint'}
  </button>

  {showHint && (
    <div className="mt-2 p-3 bg-gray-800 border border-neon-blue rounded-md">
      <p className="text-gray-300">{programDetails.hint}</p>
    </div>
  )}
</div>
          
          <div className="border-t pb-18 border-gray-700 pt-4 flex justify-between">

       

        {programDetails.tags && (
            <div>
              <span className="text-gray-400 text-sm">Related Topics:</span>
              <div className="mt-2 flex flex-wrap gap-2">
              {programDetails.tags.split(',').map((tag, index) => (

                <span key={index} className="px-2 py-1 bg-gray-800 text-xs rounded">   {tag.trim()}</span>
              ))}

              </div>
            </div>
        )}






            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-neon-blue">
                <FaBookmark />
              </button>
              <button className="text-gray-400 hover:text-neon-blue">
                <FaThumbsUp />
              </button>
              <button className="text-gray-400 hover:text-neon-blue">
                <FaThumbsDown />
              </button>
            </div>
          </div>
        </div>
      </div>


    
      {/* Code Editor Panel */}
    <CodeEditorPanel language={language} setLanguage={setLanguage}
      darkMode={darkMode} setDarkMode={setDarkMode} 
      code={code} setCode={setCode} handleRunCode={handleRunCode} handleSubmitCode={handleSubmitCode} 
   > </CodeEditorPanel>



        </Split> 
    </div></>
  )
}

export default ProblemDescription