"use client"


import CodeEditorPanel from '@/components/CodeEditorPanel';
import Header from '@/components/Header';
import { useState, useRef, useEffect } from 'react';
import { FaTerminal, FaCompressAlt, FaPlay, FaBug, FaCheckCircle, FaExclamationCircle, FaBookmark, FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaPlusCircle, FaExpandAlt, FaCode, FaRedoAlt, FaUserSecret, FaUserPlus, FaLaptopCode, FaTrophy, FaCompass } from 'react-icons/fa';
import Split from 'react-split'
const ProblemPage = () => {
  const [language, setLanguage] = useState('python');
  const [darkMode, setDarkMode] = useState(true);
  const [code, setCode] = useState(`class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass
        
# Example usage:
# nums = [2,7,11,15]
# target = 9
# Output: [0,1]`);
  const [testCases, setTestCases] = useState([
    { id: 1, nums: [2,7,11,15], target: 9, output: [0,1], status: 'passed' },
    { id: 2, nums: [3,2,4], target: 6, output: [1,2], status: 'not-run' }
  ]);
  const [selectedTestCase, setSelectedTestCase] = useState(1);
  const codeEditorRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Sync line numbers with code editor
  useEffect(() => {
    if (codeEditorRef.current && lineNumbersRef.current) {
      const lineCount = code.split('\n').length;
      lineNumbersRef.current.innerHTML = Array(lineCount).fill('<span></span>').join('');
    }
  }, [code]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRunCode = () => {
    // Simulate running code
    const updatedTestCases = [...testCases];
    updatedTestCases[0].status = 'passed';
    setTestCases(updatedTestCases);
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

  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative">

      <Header></Header>


      {/* Main Content */}
      <div className="container px-4 pt-24 pb-8 flex-grow text-sm">
        <div className="flex flex-col md:flex-row gap-4">

    <Split className='split' sizes={[30,70]} direction='horizontal' minSize={100} gutterSize={10}>
                                  

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
              <h2 className="text-2xl font-bold mb-4 neon-text">Binary Hack</h2>
              
              <div className="mb-6 text-gray-300">
                <p className="mb-4">You are given an array of integers <code className="bg-black px-1 rounded text-neon-blue">nums</code> and an integer <code className="bg-black px-1 rounded text-neon-blue">target</code>.</p>
                
                <p className="mb-4">You need to find the indices of two numbers in the array such that they add up to the target. Return the indices of these two numbers as an array.</p>
                
                <p className="mb-4">You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="terxt-lg font-semibold text-neon-blue mb-2">Example 1:</h3>
                <div className="bg-black bg-opacity-50 p-4 rounded">
                  <p className="mb-1"><span className="text-gray-400">Input:</span> nums = [2,7,11,15], target = 9</p>
                  <p className="mb-1"><span className="text-gray-400">Output:</span> [0,1]</p>
                  <p><span className="text-gray-400">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">Example 2:</h3>
                <div className="bg-black bg-opacity-50 p-4 rounded">
                  <p className="mb-1"><span className="text-gray-400">Input:</span> nums = [3,2,4], target = 6</p>
                  <p className="mb-1"><span className="text-gray-400">Output:</span> [1,2]</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">Constraints:</h3>
                <ul className="list-disc list-inside pl-4 space-y-1 text-gray-300">
                  <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
                  <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
                  <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
                  <li>Only one valid answer exists.</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">Follow-up:</h3>
                <p className="text-gray-300">Can you come up with an algorithm that is less than O(n²) time complexity?</p>
              </div>
              
              <div className="border-t border-gray-700 pt-4 flex justify-between">
                <div>
                  <span className="text-gray-400 text-sm">Related Topics:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded">Array</span>
                    <span className="px-2 py-1 bg-gray-800 text-xs rounded">Hash Table</span>
                  </div>
                </div>
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
        <CodeEditorPanel language={language}> setLanguage={setLanguage}
          darkMode={darkMode} setDarkMode={setDarkMode} lineNumbersRef={lineNumbersRef}
          codeEditorRef={codeEditorRef} handleCodeChange={handleCodeChange} 
          code={code} handleSubmitCode={handleSubmitCode} handleRunCode={handleRunCode}
        </CodeEditorPanel>






          
            </Split> 
        </div>

        {/* Test Cases and Results */}
        <div className="mt-4 bg-card-bg rounded-lg neon-border relative overflow-hidden">
          <div className="bg-black px-6 py-3 border-b border-neon-blue">
            <div className="text-neon-blue font-bold">Test Cases & Results</div>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            {/* Test Cases */}
            <div className="w-full md:w-1/2">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-neon-blue font-semibold">Test Cases</h3>
                <button 
                  className="text-xs text-gray-400 hover:text-neon-blue flex items-center"
                  onClick={handleAddTestCase}
                >
                  <FaPlusCircle className="mr-1" /> Add Case
                </button>
              </div>
              {testCases.map(testCase => (
                <div 
                  key={testCase.id}
                  className={`test-case-card mb-2 p-3 rounded ${selectedTestCase === testCase.id ? 'border-neon-blue' : 'border-gray-800'}`}
                  onClick={() => setSelectedTestCase(testCase.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Case {testCase.id}</span>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-neon-blue text-xs">
                        <FaEdit />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 text-xs">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p>nums = [{testCase.nums.join(',')}]</p>
                    <p>target = {testCase.target}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
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
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
};


export default ProblemPage;