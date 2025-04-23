"use client"


import CodeEditorPanel from '@/components/CodeEditorPanel';
import Header from '@/components/Header';
import Solutions from '@/components/Problems/Discussion';
import Results from '@/components/Problems/Results';
import Submissions from '@/components/Problems/Submissions';
import TestCases from '@/components/Problems/TestCases';
import { getDataService } from '@/service/getDataService';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaTerminal, FaCompressAlt, FaPlay, FaBug, FaCheckCircle, FaExclamationCircle, FaBookmark, FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaPlusCircle, FaExpandAlt, FaCode, FaRedoAlt, FaUserSecret, FaUserPlus, FaLaptopCode, FaTrophy, FaCompass, FaHistory, FaBook, FaLightbulb } from 'react-icons/fa';
import Split from 'react-split'
import { inflateRaw } from 'zlib';

const ProblemPage = () => {
  const [language, setLanguage] = useState('javascript');
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

  const [programDetails,SetProgramDetails]=useState({starterCode:"javascript"})


  // Sync line numbers with code editor
  useEffect(() => {
    if (codeEditorRef.current && lineNumbersRef.current) {
      const lineCount = code.split('\n').length;
      lineNumbersRef.current.innerHTML = Array(lineCount).fill('<span></span>').join('');
    }
  }, [code]);

  let params:{name:string}=useParams()
  let search=decodeURIComponent(params.name)
  useEffect(()=>{
    let getProblemData=async()=>{
    // const params=new URLSearchParams({page,limit,difficulty,status,search,category})
    console.log(search,"ASDfasdfasdf");
    
    const params=new URLSearchParams({search})

        const response = await getDataService(`/api/user/problems?${params.toString()}`);
        let problem=response.data.problemData.problems
        console.log(problem[0])
        SetProgramDetails(problem[0])
        
        

    
    }
    getProblemData()
  },[])

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRunCode = () => {
    // Simulate running code
    console.log("code ");
    
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


  

  useEffect(()=>{
      setCode(programDetails.starterCode['javascript'])
  },[programDetails])
  useEffect(()=>{
    
      setCode(programDetails.starterCode[language])
  },[language])

  const [activeTab, setActiveTab] = useState('description');
  const [showHint, setShowHint] = useState(false);
  
  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative">
      <Header></Header>



      {/* Main Content */}
      <div className="container px-4 pt-18 pb-8 flex-grow text-sm">




<div className="flex space-x-6 text-xs border-b border-neon-blue/30 pb-2 mb-4">
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
  <span 
    className={`font-light cursor-pointer pb-1 ${
      activeTab === 'submissions' 
        ? 'text-neon-blue border-b-2 border-neon-blue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() => setActiveTab('submissions')}
  >
    <FaHistory className="inline " /> SUBMISSIONS
  </span>
  <span 
    className={`font-light cursor-pointer pb-1 ${
      activeTab === 'solution' 
        ? 'text-neon-blue border-b-2 border-neon-blAAue' 
        : 'text-gray-400 hover:text-neon-blue'
    }`}
    onClick={() => setActiveTab('solution')}
  >
  <FaBook className=' inline'/> SOLUTIONS
  </span>
</div>




          {activeTab==="description"&& (
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
          darkMode={darkMode} setDarkMode={setDarkMode} lineNumbersRef={lineNumbersRef}
          codeEditorRef={codeEditorRef} handleCodeChange={handleCodeChange} 
          code={code} setCode={setCode} handleSubmitCode={handleSubmitCode} handleRunCode={handleRunCode}
       > </CodeEditorPanel>



            </Split> 
        </div>
          )}

        {activeTab==="solution"&& (

          <Solutions></Solutions>
          )}

          {activeTab==="submissions"&& (

          <Submissions></Submissions>

          )}


        {/* Test Cases and Results */}
        {activeTab==="testcase" && (
        <div className=" h-[calc(100vh-100px)] bg-card-bg rounded-lg neon-border relative overflow-hidden scroll-top" >
          <div className="bg-black px-6 py-3 border-b border-neon-blue">
            <div className="text-neon-blue font-bold">Test Cases & Results</div>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            {/* Test Cases */}
    <TestCases  testCases={testCases}  setSelectedTestCase={setSelectedTestCase} selectedTestCase={selectedTestCase}  handleAddTestCase={handleAddTestCase}  />
            {/* Results */}
          
          {/* <Results testCases={testCases}></Results> */}
          </div>
        </div>
        )}


        {activeTab==="testresult" && (

        <div className=" h-[calc(100vh-100px)] bg-card-bg rounded-lg neon-border relative overflow-hidden scroll-top" >
          <div className="bg-black px-6 py-3 border-b border-neon-blue">
            <div className="text-neon-blue font-bold">Test Results</div>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            {/* Test Cases */}
            {/* Results */}
          
          <Results testCases={testCases}></Results>
          </div>
        </div>


        )}


      </div>

  
    </div>
  );
};


export default ProblemPage;


