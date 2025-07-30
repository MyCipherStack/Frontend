import React, { MouseEvent } from "react";

export default function PreviewTab({ formData, prevTab, submitForm }: {
  formData: {
    title: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    statement: string;
    testCases: { input: string; output: string; isSample: boolean }[];
    constraints?: string;
    tags?: string;
  };
  prevTab: (tab: string) => void;
  submitForm: ((e: MouseEvent<HTMLButtonElement>) => void)
}) {
  return (
    <div id="preview" className="tab-content">
      <div className="bg-[#111111] rounded-lg neon-border p-6 mb-6">
        <h2 className="text-xl font-bold text-[#0ef] mb-6">Problem Preview</h2>

        <div className="markdown-preview mb-6">
          <h3 className="text-lg font-semibold text-[#0ef] mb-2">{formData.title || 'Problem Title'}</h3>
          <div className="flex gap-2 mb-4">
            <span className={`px-2 py-1 ${formData.difficulty === 'easy' ? 'bg-green-900 text-green-400' :
                formData.difficulty === 'medium' ? 'bg-yellow-900 text-yellow-400' :
                  'bg-red-900 text-red-400'
              } text-xs rounded`}>
              {formData.difficulty ? formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1) : 'Difficulty'}
            </span>
            <span className="text-gray-400 text-xs">Time Limit: {formData.timeLimit || '1000'}ms</span>
            <span className="text-gray-400 text-xs">Memory Limit: {formData.memoryLimit || '128'}MB</span>
          </div>

          <div className="preview-field text-gray-300 text-sm">
            {formData.statement ? (
              <div dangerouslySetInnerHTML={{ __html: formData.statement }} />
            ) : (
              <p>Problem statement will appear here...</p>
            )}

            {formData.testCases?.filter(tc => tc.isSample).map((testCase, index) => (
              <div key={index}>
                <h4 className="text-[#0ef] mt-6 mb-2">Example {index + 1}:</h4>
                <div className="bg-black bg-opacity-50 p-4 rounded mb-4">
                  <p><span className="text-gray-500">Input:</span> {testCase.input || 'Sample input'}</p>
                  <p><span className="text-gray-500">Output:</span> {testCase.output || 'Sample output'}</p>
                </div>
              </div>
            ))}

            {formData.constraints && (
              <>
                <h4 className="text-[#0ef] mt-6 mb-2">Constraints:</h4>
                <div dangerouslySetInnerHTML={{ __html: formData.constraints }} />
              </>
            )}

            {formData.tags && (
              <>
                <h4 className="text-[#0ef] mt-6 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-black text-xs rounded border border-gray-700">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="prev-tab px-6 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300"
            onClick={() => prevTab('test-cases')}
          >
            <i className="fas fa-arrow-left mr-2"></i> Previous
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-6 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300"
            >
              <i className="fas fa-save mr-2"></i> Save Draft
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300"
              onClick={(e: MouseEvent<HTMLButtonElement>) => submitForm(e)}
            >
              <i className="fas fa-check mr-2"></i> Publish Problem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}