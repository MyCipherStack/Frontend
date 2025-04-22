import React, { useState } from 'react'
import { FaEdit, FaPlusCircle, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'

const TestCases = ({ testCases, setSelectedTestCase, selectedTestCase, handleAddTestCase, setTestCases }) => {
  const [editingCase, setEditingCase] = useState(null)
  const [editedValues, setEditedValues] = useState({ nums: '', target: '', output: '' })

  const handleEditClick = (testCase) => {
    setEditingCase(testCase.id)
    setEditedValues({
      nums: testCase.nums.join(','),
      target: testCase.target.toString(),
      output: testCase.output.join(',')
    })
  }

  const handleSaveEdit = (id) => {
    const updatedTestCases = testCases.map(tc => {
      if (tc.id === id) {
        return {
          ...tc,
          nums: editedValues.nums.split(',').map(num => parseInt(num.trim())),
          target: parseInt(editedValues.target),
          output: editedValues.output.split(',').map(num => parseInt(num.trim())),
          status: 'not-run' // Reset status when edited
        }
      }
      return tc
    })
    setTestCases(updatedTestCases)
    setEditingCase(null)
  }

  const handleCancelEdit = () => {
    setEditingCase(null)
  }

  const handleDeleteCase = (id) => {
    const updatedTestCases = testCases.filter(tc => tc.id !== id)
    setTestCases(updatedTestCases)
    if (selectedTestCase === id) {
      setSelectedTestCase(updatedTestCases[0]?.id || null)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="w-full md">
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
          className={`test-case-card mb-2 p-3 rounded border ${
            selectedTestCase === testCase.id ? 'border-neon-blue' : 'border-gray-800'
          } ${testCase.status === 'passed' ? 'bg-green-900 bg-opacity-20' : ''}`}
          onClick={() => !editingCase && setSelectedTestCase(testCase.id)}
        >
          {editingCase === testCase.id ? (
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-400">nums (comma separated)</label>
                <input
                  type="text"
                  name="nums"
                  value={editedValues.nums}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">target</label>
                <input
                  type="number"
                  name="target"
                  value={editedValues.target}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">output (comma separated)</label>
                <input
                  type="text"
                  name="output"
                  value={editedValues.output}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <FaTimes />
                </button>
                <button 
                  onClick={() => handleSaveEdit(testCase.id)}
                  className="text-neon-blue hover:text-neon-blue-light p-1"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Case {testCase.id}</span>
                <div className="flex gap-2">
                  <button 
                    className="text-gray-400 hover:text-neon-blue text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditClick(testCase)
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-500 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCase(testCase.id)
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                <p>nums = [{testCase.nums.join(', ')}]</p>
                <p>target = {testCase.target}</p>
                <p className="text-xs mt-1">
                  Output: [{testCase.output.join(', ')}]
                  {testCase.status === 'passed' && (
                    <span className="ml-2 text-green-400">✓ Passed</span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default TestCases