import { typeTestCase } from '@/types/problem'
import React, { useState } from 'react'
import { FaEdit, FaPlusCircle, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'

const TestCases = ({ testCases, setSelectedTestCase, selectedTestCase, handleAddTestCase, setTestCases }:{
  testCases: typeTestCase[],
  selectedTestCase: number | null| string,
  setSelectedTestCase: React.Dispatch<React.SetStateAction<number | string>>,
  handleAddTestCase: () => void,
  setTestCases: React.Dispatch<React.SetStateAction<typeTestCase[]>>,

}) => {
  const [editingCase, setEditingCase] = useState<number |string |  null>(null)
  const [editedValues, setEditedValues] = useState({ input: '', output: '' })

  console.log("test case", testCases);


  const handleEditClick = (testCase:typeTestCase) => {
    setEditingCase(testCase._id)
    setEditedValues({
      input: testCase.input,
      output: testCase.output,
      // output: testCase.output
    })
  }

  const handleSaveEdit = (id:number) => {
    const updatedTestCases = testCases.map(tc => {
      if (tc._id === id) {
        return {
          ...tc,
          input: editedValues.input,
          // target:editedValues.output,
          output: editedValues.output,
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

  const handleDeleteCase = (id:string) => {
    const updatedTestCases = testCases.filter(tc => tc._id !== id)
    setTestCases(updatedTestCases)
    if (selectedTestCase === id) {
      setSelectedTestCase(updatedTestCases[0]?._id )
    }
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedValues(prev => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <div className="  h-screen w-full  pb-40  small-scrollbar overflow-scroll  ">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-neon-blue font-semibold">Test Cases</h3>
        <button
          className="text-xs text-gray-400 hover:text-neon-blue flex items-center"
          onClick={handleAddTestCase}
        >
          <FaPlusCircle className="mr-1" /> Add Case
        </button>
      </div>

      {testCases.map((testCase: typeTestCase, index:number) => (
        <div
          key={index}
          className={` test-case-card mb-2 p-3 rounded border ${selectedTestCase === testCase._id ? 'border-neon-blue' : 'border-gray-800'
            } ${testCase.status === 'passed' ? 'bg-green-900 bg-opacity-20' : ''}`}
          onClick={() => !editingCase && setSelectedTestCase(testCase?._id)}
        >
          {editingCase === testCase._id ? (
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-400">inputs</label>
                <input
                  type="text"
                  name="input"
                  value={editedValues.input}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">target</label>
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
                  onClick={() => handleSaveEdit(testCase._id)}
                  className="text-neon-blue hover:text-neon-blue-light p-1"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Case {testCase.testCaseNo}</span>
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
                      handleDeleteCase(testCase._id)
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="text-gray-300 text-sm">

                <p>input= {testCase.input}</p>
                <p>target = {testCase.output}</p>
                <p className="text-xs mt-1">
                  {/* Output: {testCase.output} */}
                  {testCase.status === true && (
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