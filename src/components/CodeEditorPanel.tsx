



import React from 'react'
import { FaBug, FaExpandAlt, FaPlay, FaRedoAlt } from 'react-icons/fa'
import CodeEditorMonaco from './Problems/CodeEditorMonaco'


const CodeEditorPanel = ({ language, setLanguage, darkMode, setDarkMode, code, setCode, handleRunCode, handleSubmitCode }) => {


  return (
    <>
      {/* Code Editor Panel */}
      <div className="w-full md:w-7/12 bg-card-bg rounded-lg neon-border relative overflow-hidden flex-1">
        <div className="bg-black px-6 py-3 border-b border-neon-blue">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select
                className="bg-black text-neon-blue border border-gray-700 rounded px-2 py-1 text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
              </select>
              <button className="text-gray-400 hover:text-neon-blue text-sm flex items-center">
                <FaRedoAlt className="mr-1" /> Reset
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <label className="text-gray-400 text-sm flex items-center">
                <span className="mr-2">Dark Mode</span>
                <label className="toggle-btn">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </label>
              <button className="text-gray-400 hover:text-neon-blue text-sm">
                <FaExpandAlt />
              </button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex ">
          <CodeEditorMonaco code={code} language={language} setCode={setCode}></CodeEditorMonaco>
        </div>





        {/* Control Panel */}
        <div className="bg-black p-4 border-t border-gray-800 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-transparent border border-neon-blue text-neon-blue rounded hover:border-[#0ff] hover:text-[#0ff] transition duration-300 flex items-center"
              onClick={handleRunCode}
            >
              <FaPlay className="mr-2" /> Run
            </button>
            <button className="px-4 py-2 bg-transparent text-gray-400 border border-gray-700 rounded hover:border-[#0ff] hover:text-[#0ff] transition duration-300 flex items-center">
              <FaBug className="mr-2" /> Debug
            </button>
          </div>
          <button
            className="px-6 py-2 boarder border border-gray-800 font-bold rounded  hover:border-[#0ff] hover:text-[#0ff] transition duration-300"
            onClick={handleSubmitCode}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default CodeEditorPanel