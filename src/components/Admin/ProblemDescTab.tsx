export default function ProblemDescTab({ formData, setFormData, prevTab, nextTab }) {
    return (
      <div id="problem-desc" className="tab-content">
        <div className="bg-[#111111] rounded-lg neon-border p-6 mb-6">
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Problem Statement *</label>
            <textarea 
              className="input-field w-full px-4 py-2 rounded h-32" 
              placeholder="Describe the problem..."
              value={formData.statement}
              onChange={(e) => setFormData({...formData, statement: e.target.value})}
            ></textarea>
            <div className="text-xs text-gray-500 mt-1">Supports Markdown formatting.</div>
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Input Format</label>
            <textarea 
              className="input-field w-full px-4 py-2 rounded h-20" 
              placeholder="Describe input format..."
              value={formData.inputFormat}
              onChange={(e) => setFormData({...formData, inputFormat: e.target.value})}
            ></textarea>
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Output Format</label>
            <textarea 
              className="input-field w-full px-4 py-2 rounded h-20" 
              placeholder="Describe output format..."
              value={formData.outputFormat}
              onChange={(e) => setFormData({...formData, outputFormat: e.target.value})}
            ></textarea>
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Constraints</label>
            <textarea 
              className="input-field w-full px-4 py-2 rounded h-20" 
              placeholder="List constraints..."
              value={formData.constraints}
              onChange={(e) => setFormData({...formData, constraints: e.target.value})}
            ></textarea>
          </div>
  
          <div className="flex justify-between mt-6">
            <button 
              type="button" 
              className="prev-tab px-6 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300" 
              onClick={() => prevTab('basic-info')}
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </button>
            <button 
              type="button" 
              className="next-tab px-6 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300" 
              onClick={() => nextTab('test-cases')}
            >
              Next: Test Cases <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }