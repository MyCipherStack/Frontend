"use client"

import { getSubmissions } from '@/service/getSubmissions';
import { submissions } from '@/types/problem';
import { toastError } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaCode, FaArrowRight, FaChevronLeft } from 'react-icons/fa';
  // Sample submission data
  








  const Submissions = ({submissionTab,setSubmissionTab,SetSubmissionDetails,submissionDetails,problemId}:{
  submissionTab: string;
  setSubmissionTab: React.Dispatch<React.SetStateAction<string>>;   
  SetSubmissionDetails: React.Dispatch<React.SetStateAction<submissions>>;
  submissionDetails: submissions;
  problemId: string;
  }) => {


    const[submissions,SetSubmissions]=useState<submissions[]>([])
    console.log(submissionDetails);
    console.log(problemId);
    
    useEffect(()=>{
    const submission=async()=>{
      try{
        const response=await getSubmissions(problemId)  
        SetSubmissions(response.data.submissions)
        console.log(response.data.submissions,"All submissoin ");
        // setSubmissionTab("allSubmission")
      }catch(error){
      toastError("error when fetching data")
        console.log(error);
        
      }
      
      
    }
    submission()
  },[])

  return (
    <>

{submissionTab=="allSubmission" &&

    <div className="min-h-screen text-gray-100 flex flex-col relative">
      <div className="container   pb-8 flex-grow text-sm">

        {/* Submissions Tab */}
          <div className="bg-card-bg rounded-lg neon-border p-4">
            <h2 className="text-xl font-bold mb-4 neon-text">Your Submissions</h2>
            <div className="overflow-x-auto">

           <div className='flex items-center'>  <div>All submissions</div> <FaArrowRight/></div>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Language</th>
                    <th className="px-4 py-2 text-left">Runtime</th>
                    <th className="px-4 py-2 text-left">Memory</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {submissions.map((submission,idx) => (
                    <tr key={idx} onClick={()=>{
                      setSubmissionTab("submissionDetail")
                      SetSubmissionDetails(submission)
                      
                    }}>
                      <td className="px-4 py-2">{new Date(submission.createdAt ?? "").toDateString()}</td>
                      <td className="px-4 py-2">{submission.language}</td>
                      <td className="px-4 py-2">{Math.round(submission.runTime)}</td>
                      <td className="px-4 py-2">{submission.memory}</td>
                      <td className="px-4 py-2">
                        {submission.status === 'Accepted' ? (
                          <span className="text-green-400 flex items-center">
                            <FaCheckCircle className="mr-1" /> {submission.status}
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center">
                            <FaExclamationCircle className="mr-1" /> {submission.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-neon-blue hover:underline">
                          <FaCode /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div> }

{submissionTab=="submissionDetail" &&
    <SubmissionDetail setSubmissionTab={setSubmissionTab} submissionDetails={submissionDetails} ></SubmissionDetail> }
    </>
  );
};

export default Submissions;








import { 
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle
} from 'react-icons/fa';

export const SubmissionDetail = ({setSubmissionTab, submissionDetails }:{
  setSubmissionTab: React.Dispatch<React.SetStateAction<string>>;
  submissionDetails: submissions;
}) => {
  const [showFailingTest, setShowFailingTest] = useState(false);
  const [showCode, setShowCode] = useState(true);

  if (!submissionDetails) return <div className="text-gray-400">No submission selected</div>;

  const statusColor = submissionDetails.status === 'Accepted' ? 'text-green-400' : 'text-red-400';
  const statusIcon = submissionDetails.status === 'Accepted' ? 
    <FaCheckCircle className="mr-1" /> : 
    <FaExclamationCircle className="mr-1" />;

  return (
    <div className="bg-back-800 rounded-lg border neon-border p-4 text-sm">
      {/* Submission Header */}
      <div className="flex justify-between items-center mb-4">
        <div >
        <div className='flex items-center'> <FaChevronLeft className='mr-1 cursor-pointer' onClick={()=>setSubmissionTab("allSubmission")}/> <h2 className="text-xl font-semibold">Submission Details</h2></div>
          <div className={`flex items-center ${statusColor}`}>
            {statusIcon}
            <span className="ml-1">{submissionDetails.status}</span>
          </div>
        </div>
              <div className="text-gray-400">
            Submitted:{" "}
            {submissionDetails.createdAt
              ? new Date(submissionDetails.createdAt).toLocaleString()
              : "N/A"}
      </div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-750 p-3 rounded-lg">
          <div className="text-gray-400">Language</div>
          <div className="text-lg">{submissionDetails.language}</div>
        </div>
        <div className="bg-gray-750 p-3 rounded-lg">
          <div className="text-gray-400">Runtime</div>
          <div className="text-lg">{submissionDetails.runTime} ms</div>
        </div>
        <div className="bg-gray-750 p-3 rounded-lg">
          <div className="text-gray-400">Memory</div>
          <div className="text-lg">{submissionDetails.memory} MB</div>
        </div>
      </div>

      {/* Test Cases */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Test Cases ({submissionDetails.totalTestCases})</h3>
          <div className="text-gray-400">
            {submissionDetails.passedTestCases} passed
          </div>
        </div>
        <div className="w-full  rounded-full h-2.5">
          <div 
            className="bg-green-700 h-2.5 rounded-full" 
            style={{ width:`${(submissionDetails.passedTestCases / (submissionDetails.totalTestCases )) * 100}%` }}
          ></div>
        </div>
      </div>


      {submissionDetails.error ? (
                <div>
                  <h4 className="text-gray-400 mb-1">Error Message</h4>
                  <pre className="bg-black-900 p-3 rounded-md overflow-x-auto text-red-400">
                    {submissionDetails.error}
                  </pre>
                </div>
              ):

      submissionDetails.failingTestCaseResult && (
        <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-3 bg-gray-750 hover:neon-text"
            onClick={() => setShowFailingTest(!showFailingTest)}
          >
            <div className="flex items-center">
              <FaInfoCircle className="text-red-500 mr-2" />
              <span>Failing Test Case</span>
            </div>
            {showFailingTest ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {showFailingTest && (
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-gray-100 mb-1">Input</h4>
                <pre className=" p-3 rounded-md overflow-x-auto">
                  {submissionDetails.failingTestCaseResult.input}
                </pre>
              </div>
              
              <div>
                <h4 className="text-gray-100 mb-1">Expted Output</h4>
                <pre className="p-3 rounded-md overflow-x-auto">
                  {submissionDetails.failingTestCaseResult.output}
                </pre>
              </div>
              <div>
                <h4 className="text-gray-100 mb-1">Your Output</h4>
                <pre className="p-3 rounded-md overflow-x-auto">
                  {submissionDetails.failingTestCaseResult.compile_output }
                </pre>
              </div>
              
          
            </div>
          )}
        </div>
      )
    }

      {/* Code Section */}
      <div className="border  rounded-lg overflow-hidden">
        <button
          className="w-full flex justify-between items-center p-3 bg-gray-750"
          onClick={() => setShowCode(!showCode)}
        >
          <div className="flex items-center">
            <FaCode className="neon-text mr-2" />
            <span>Submitted Code</span>
          </div>
          {showCode ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {showCode && (
          <pre className=" p-4 overflow-x-auto">
            <code className={`language-${submissionDetails.language}`}>
              {submissionDetails.code}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
};





// Example usage:
// const SubmissionsPage = () => {
//   const [selectedSubmission, setSelectedSubmission] = useState(null);

//   // Sample data matching your schema
//   const sampleSubmission = {
//     _id: '1',
//     userId: 'user123',
//     problemId: 'problem456',
//     code: `class Solution:
//     def twoSum(self, nums: List[int], target: int) -> List[int]:
//         num_map = {}
//         for i, num in enumerate(nums):
//             complement = target - num
//             if complement in num_map:
//                 return [num_map[complement], i]
//             num_map[num] = i
//         return []`,
//     language: 'Python',
//     status: 'Wrong Answer',
//     runTime: 45,
//     memory: 14.2,
//     failingTestCaseResult: {
//       input: '[2,7,11,15]\n9',
//       output: '[0,0]',
//       compile_output: null
//     },
//     passedTestCases: 10,
//     createdAt: '2023-05-15T14:30:22Z'
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <button 
//           onClick={() => setSelectedSubmission(sampleSubmission)}
//           className="mb-4 px-4 py-2 bg-neon-blue hover:bg-neon-blue-dark rounded-md"
//         >
//           Load Sample Submission
//         </button>
        
//         <SubmissionDetail submission={selectedSubmission} />
//       </div>
//     </div>
//   );
// };

