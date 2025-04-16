export default function BasicInfoTab({ formData, setFormData, nextTab }) {
    return (
      <div id="basic-info" className="tab-content active">
        <div className="bg-[#111111] rounded-lg neon-border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Problem Title *</label>
              <input 
                type="text" 
                className="input-field w-full px-4 py-2 rounded" 
                placeholder="e.g. Two Sum"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Problem ID *</label>
              <input 
                type="text" 
                className="input-field w-full px-4 py-2 rounded" 
                placeholder="e.g. two-sum"
                value={formData.problemId}
                onChange={(e) => setFormData({...formData, problemId: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Difficulty *</label>
              <select 
                className="input-field w-full px-4 py-2 rounded"
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Time Limit (ms) *</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-2 rounded" 
                placeholder="e.g. 1000" 
                value={formData.timeLimit}
                onChange={(e) => setFormData({...formData, timeLimit: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Memory Limit (MB) *</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-2 rounded" 
                placeholder="e.g. 128" 
                value={formData.memoryLimit}
                onChange={(e) => setFormData({...formData, memoryLimit: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Premium Problem</label>
              <div className="flex items-center mt-2">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-[#0ef]"
                    checked={formData.isPremium}
                    onChange={(e) => setFormData({...formData, isPremium: e.target.checked})}
                  />
                  <span className="ml-2 text-gray-400">Mark as premium</span>
                </label>
              </div>
            </div>
          </div>
  
          <div className="mt-6">
            <label className="block text-gray-400 mb-2">Tags</label>
            <input 
              type="text" 
              className="input-field w-full px-4 py-2 rounded" 
              placeholder="e.g. Array, Hash Table, Two Pointers (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>
  
          <div className="flex justify-end mt-6">
            <button 
              type="button" 
              className="next-tab px-6 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300" 
              onClick={() => nextTab('problem-desc')}
            >
              Next: Problem Description <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }