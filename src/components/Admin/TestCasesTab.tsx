import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function TestCasesTab({ formData, setFormData, prevTab, nextTab }) {
  const [testCases, setTestCases] = useState(formData.testCases || [
    { input: '', output: '', isSample: false },
    { input: '', output: '', isSample: true }
  ]);

  const addTestCase = () => {
    const newTestCases = [...testCases, { input: '', output: '', isSample: false,testCaseNo:1}];
    setTestCases(newTestCases);
    setFormData({...formData, testCases: newTestCases});
  };

  const deleteTestCase = (index) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
    setFormData({...formData, testCases: newTestCases});
  };

  const updateTestCase = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
    setFormData({...formData, testCases: newTestCases});
  };



  return (
    <div id="test-cases" className="tab-content">
      <div className="bg-[#111111] rounded-lg neon-border p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0ef]">Test Cases</h2>
          <button 
            type="button" 
            onClick={addTestCase}
            className="px-4 py-2 flex bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300"
          >  Add Test Case
          </button>
        </div>

        <div id="test-cases-container">
          {/* updateTestCase(index,'testCaseNo'index+1) */}
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case-card p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
              <div>
                  <label className=" text-gray-400 mb-2 text-2xl">Testcase No:</label>
                  <input type='number'
                    className="input-field  px-4 py-2 rounded h-8" 
                    placeholder="test case no"
                    value={testCase.testCaseNo}
                    onChange={(e) => updateTestCase(index,'testCaseNo',e.target.value)}
                  ></input>
                </div>

                {/* <h3 className="text-lg font-semibold">Test Case #{index + 1}</h3> */}
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    className="p-1 text-gray-400 hover:text-red-500"
                    onClick={() => deleteTestCase(index)}
                  >
                    <FaTrash></FaTrash>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Input</label>
                  <textarea 
                    className="input-field w-full px-4 py-2 rounded h-24" 
                    placeholder="Enter input..."
                    value={testCase.input}
                    onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Expected Output</label>
                  <textarea 
                    className="input-field w-full px-4 py-2 rounded h-24" 
                    placeholder="Enter expected output..."
                    value={testCase.output}
                    onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                  ></textarea>
                </div>
                {testCase.isSample &&(
                <div>
                  <label className="block text-gray-400 mb-2">Explanation</label>
                  <textarea 
                    className="input-field w-full px-4 py-2 rounded h-12" 
                    placeholder="Enter Explanation..."
                    value={testCase.explanation}
                    onChange={(e) => updateTestCase(index, 'explanation', e.target.value)}
                  ></textarea>
                </div>)}


              </div>
              <div className="mt-4">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-[#0ef]"
                    checked={testCase.isSample}
                    onChange={(e) => updateTestCase(index, 'isSample', e.target.checked)}
                  />
                  <span className="ml-2 text-gray-400">Mark as sample (will be visible to users)</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button 
            type="button" 
            className="prev-tab px-6 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300" 
            onClick={() => prevTab('problem-desc')}
          >
            <i className="fas fa-arrow-left mr-2"></i> Previous
          </button>
          <button 
            type="button" 
            className="next-tab px-6 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300" 
            onClick={() => nextTab('preview')}
          >
            Next: Preview <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}