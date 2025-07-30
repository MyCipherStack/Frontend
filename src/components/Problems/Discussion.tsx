import { getSolution } from '@/service/problemService';
import { useState } from 'react';

interface Solution {
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyInsights: string[];
}

export default function ProblemSolution({ problemId }: { problemId: string }) {

  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'solution' | 'explanation' | 'complexity'>('solution');

  // Mock problem data
  const problem = {
    title: "Two Sum",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: "You may assume each input has exactly one solution, and you may not use the same element twice.",
    functionSignatureMeta: {
      name: "twoSum"
    }
  };

  const analyzeSolution = async () => {
    setLoading(true);
    // Simulate API call

    const res = await getSolution(problemId)





    setTimeout(() => {
      setSolution({
        code: `function ${problem.functionSignatureMeta.name}(nums, target) {
  const numMap = {};
  for (let i = 0; i < nums.length; i++) { 
    const complement = target - nums[i];
    if (complement in numMap) {
      return [numMap[complement], i];
    }
    numMap[nums[i]] = i;
  }
  return [];
}`,
        explanation: "This solution efficiently finds the two numbers by using a hash map to remember numbers we've already seen. For each number, it calculates what other number would sum to the target (called the complement) and checks if we've seen that complement before.",
        timeComplexity: "O(n) - We traverse the list only once",
        spaceComplexity: "O(n) - We store numbers in a hash map",
        keyInsights: [
          "The hash map allows O(1) lookups for complements",
          "Single pass through the array is sufficient",
          "We store numbers as we go to remember their indices",
          "The solution handles edge cases like negative numbers automatically"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <div className="mb-6 p-4 bg-gray-500 rounded-lg border">
        <p className="mb-3">{problem.statement}</p>
        <p className="text-sm text-gray-600"><strong>Constraints:</strong> {problem.constraints}</p>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">Learning Guidance</h3>
        <ul className="list-disc pl-5 text-yellow-700 space-y-1">
          <li>Study the approach rather than copying the code</li>
          <li>Understand why this solution is optimal</li>
          <li>Try implementing it yourself after studying</li>
          <li>Identify patterns you can apply to similar problems</li>
        </ul>
      </div>



      <button
        onClick={analyzeSolution}
        disabled={loading}
        className="mb-6 px-4 py-2  bg-green-700  rounded disabled:bg-green-400  flex items-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : 'Show Optimal Solution'}
      </button>

      {solution && (
        <div className="mt-6 border rounded-lg overflow-hidden shadow-sm">
          <div className="flex border-b">
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'solution' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('solution')}
            >
              Solution
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'explanation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('explanation')}
            >
              Explanation
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'complexity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('complexity')}
            >
              Complexity
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'solution' && (
              <div>
                <div className="mb-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">Try to understand the pattern first, then implement it yourself without looking.</p>
                </div>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                  {solution.code}
                </pre>
              </div>
            )}

            {activeTab === 'explanation' && (
              <div>
                <h3 className="font-semibold mb-3">Key Insights</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  {solution.keyInsights.map((insight, i) => (
                    <li key={i}>{insight}</li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Detailed Explanation</h3>
                <p className="whitespace-pre-line">{solution.explanation}</p>
              </div>
            )}

            {activeTab === 'complexity' && (
              <div>
                <h3 className="font-semibold mb-3">Time Complexity</h3>
                <p className="mb-4 p-3 bg-gray-700 rounded">{solution.timeComplexity}</p>
                <h3 className="font-semibold mb-3">Space Complexity</h3>
                <p className="p-3 bg-gray-700 rounded">{solution.spaceComplexity}</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-400 border-t">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Close this solution and try implementing it yourself</li>
              <li>Think about how you would explain this approach to someone else</li>
              <li>Identify 2-3 similar problems where this pattern applies</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}