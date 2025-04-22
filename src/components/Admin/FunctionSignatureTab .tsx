import { generateCodeTemplates } from "@/utils/generateCodeTemplates";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function FunctionSignatureTab({ formData, setFormData, prevTab, nextTab }) {
    const [localSignature, setLocalSignature] = useState(
      formData.functionSignatureMeta || {
        name: "",
        parameters: [],
        returnType: ""
      }
    );
    const [activeLanguage, setActiveLanguage] = useState('javascript');
  

  
    const templates = generateCodeTemplates(localSignature);
    
    const handleAddParameter = () => {
      setLocalSignature(prev => ({
        ...prev,
        parameters: [...prev.parameters, { name: "", type: "" }]
      }));
    };
  
    const handleRemoveParameter = (index) => {
      setLocalSignature(prev => ({
        ...prev,
        parameters: prev.parameters.filter((_, i) => i !== index)
      }));
    };
  
    const handleParameterChange = (index, field, value) => {
      setLocalSignature(prev => {
        const newParameters = [...prev.parameters];
        newParameters[index] = { ...newParameters[index], [field]: value };
        return { ...prev, parameters: newParameters };
      });
    };
  

    useEffect(()=>{
        setFormData(prev => ({
            ...prev,
            functionSignatureMeta: localSignature,
            starterCode: generateCodeTemplates(localSignature)
          }));
    },[localSignature])

    const handleSave = () => {

 
          nextTab('test-cases');
    };
  
    return (
      <div id="function-signature" className="tab-content">
        <div className="bg-[#111111] rounded-lg neon-border p-6 mb-6">
          <h2 className="text-xl font-bold text-[#0ef] mb-6">Function Signature</h2>
          
          <div className="space-y-6">
            {/* Function Name */}
            <div>
              <label className="block text-[#0ef] mb-2">Function Name</label>
              <input
                type="text"
                className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:border-[#0ef] focus:outline-none"
                value={localSignature.name}
                onChange={(e) => setLocalSignature(prev => ({ ...prev, name: e.target.value.trim() }))}
                placeholder="e.g., add, findMax, etc."
              />
            </div>
  
            {/* Parameters */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[#0ef]">Parameters</label>
                <button
                  type="button"
                  className="text-[#0ef] hover:text-[#0df] text-sm flex items-center"
                  onClick={handleAddParameter}
                >
                  <i className="fas fa-plus mr-1"></i> Add Parameter
                </button>
              </div>
  
              {localSignature.parameters.length === 0 ? (
                <div className="text-gray-400 text-sm italic">No parameters added yet</div>
              ) : (
                <div className="space-y-3">
                  {localSignature.parameters?.map((param, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        className="flex-1 bg-black border border-gray-700 rounded px-3 py-1 text-white focus:border-[#0ef] focus:outline-none"
                        value={param.name}
                        onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                        placeholder="Parameter name"
                      />
                      <input
                        type="text"
                        className="flex-1 bg-black border border-gray-700 rounded px-3 py-1 text-white focus:border-[#0ef] focus:outline-none"
                        value={param.type}
                        onChange={(e) => handleParameterChange(index, 'type', e.target.value)}
                        placeholder="Parameter type"
                      />
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 px-2"
                        onClick={() => handleRemoveParameter(index)}
                      > <FaTrash></FaTrash>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
  
            {/* Return Type */}
            <div>
              <label className="block text-[#0ef] mb-2">Return Type</label>
              <input
                type="text"
                className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:border-[#0ef] focus:outline-none"
                value={localSignature.returnType}
                onChange={(e) => setLocalSignature(prev => ({ ...prev, returnType: e.target.value.trim() }))}
                placeholder="e.g., number, string, boolean, etc."
              />
            </div>
  
            {/* Language Selector */}
            <div>
              <label className="block text-[#0ef] mb-2">Language</label>
              <select
                className="w-full bg-black border border-gray-700 rounded px-4 py-2 text-white focus:border-[#0ef] focus:outline-none"
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>
  
            {/* Code Preview */}
            <div className="mt-6">
              <label className="block text-[#0ef] mb-2">Code Template</label>
              <div className="bg-black bg-opacity-50 p-4 rounded font-mono text-green-400 whitespace-pre">
                {localSignature.name ? (
                  templates[activeLanguage] || "Select a language"
                ) : (
                  <span className="text-gray-400">Enter function details to see template</span>
                )}
              </div>
            </div>
          </div>
  
          <div className="flex justify-between mt-6">
            <button 
              type="button" 
              className="prev-tab px-6 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300" 
              onClick={() => prevTab('statement')}
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </button>
            <button 
              type="button" 
              className="px-6 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300"
              onClick={handleSave}
            >
              <i className="fas fa-check mr-2"></i> Save & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }