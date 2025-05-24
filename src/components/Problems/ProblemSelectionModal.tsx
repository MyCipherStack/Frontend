import { FaWindowClose } from "react-icons/fa";
import ProblemTable from "./ProblemTable";

// Problem Selection Modal  
 export const ProblemSelectionModal = ({ openProblem, selectedProblemsCount, setShowProblemModal, groupChallenge }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-50 overflow-y-auto pt-20">
      <div className="bg-card-bg neon-border rounded-lg w-full max-w-5xl overflow-hidden">
        <div className="bg-black px-6 py-3 border-b border-neon-blue flex justify-between items-center">
          <div className="text-neon-blue font-bold">Select Problems</div>
          <button onClick={() => setShowProblemModal(false)} className="text-gray-400 hover:text-neon-blue">
            <i className="fas fa-times"></i>
          </button>
        </div>
  
        {/* Footer with Selected Problems */}
        <div className="bg-black px-6 py-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-gray-400">
            Selected: <span className="text-neon-blue">{selectedProblemsCount}</span> problems
            <div className='text-white' >
              {groupChallenge.problemsName.map((problem, index) => {
                return (<div className='flex items-center' key={index}>{problem}
                  <FaWindowClose className='ms-1' />
                </div>
                )
              })}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowProblemModal(false)} className="px-4 py-2 bg-transparent border border-gray-600 text-gray-300 rounded hover:border-neon-blue hover:text-neon-blue">
              Cancel
            </button>
            <button
              onClick={() => {
                setShowProblemModal(false);
              }}
              className="px-4 py-2 bg-neon-blue text-black bg-white rounded hover:bg-[#0df]"
            >
              Confirm Selection
            </button>
          </div>
        </div>
        <ProblemTable openProblem={openProblem}/>
  
  
  
  
  
      </div>
    </div>
  );