import { useState } from 'react';
import { FaTimes,  FaSearch, FaPlus} from 'react-icons/fa';
import { createPairprogramming, pairProgramming } from '@/service/challengeServices';
import { useRouter } from 'next/navigation';
import { toastError } from '@/utils/toast';
import { ProblemSelectionModal } from '../Problems/ProblemSelectionModal';

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

const PairProgrammingModal = ({ onClose }: { onClose: () => void }) => {
  const [sessionName, setSessionName] = useState('');
  const [problemType, setProblemType] = useState<'select' | 'random'>('select');
  const [sessionType, setSessionType] = useState<'public' | 'private'>('public');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const[showProblemModal,setShowProblemModal]=useState(false)
  const [selectedProblemsCount,setSelectedProblemsCount]=useState(0)
  const router=useRouter()
  const friends: Friend[] = [
    { id: '1', name: 'CodeMaster', online: true },
    { id: '2', name: 'ByteNinja', online: true },
    { id: '3', name: 'DevGuru', online: false },
    { id: '4', name: 'AlgoKing', online: true }
  ];

  const toggleFriendInvite = (id: string) => {
    if (invitedFriends.includes(id)) {
      setInvitedFriends(invitedFriends.filter(friendId => friendId !== id));
    } else {
      setInvitedFriends([...invitedFriends, id]);
    }
  };

  const [challengeDetails, setChallengeDetails] = useState<pairProgramming>({
    challengeName: "",
    problems: [],
    problemType:"",
    problemsName: [],
    type: "public",
    invitedFriends:[]
  })

  const openProblem = async (name: string, _id: string) => {

    setChallengeDetails((data) => ({ ...data, problemsName: [...data.problems, name] }))
    setChallengeDetails((data) => ({ ...data, problems: [...data.problems, _id] }))
    setSelectedProblemsCount(selectedProblemsCount + 1)

  }




  const startSession = async() => {  
    try{
      if(!challengeDetails.challengeName.trim()){
       return   toastError("enter session name")
      }
      if(!challengeDetails.problems.length && problemType!=='random'){
        return    toastError("select any problem ")
      }


    
      setChallengeDetails((data) => ({ ...data, invitedFriends:invitedFriends }))  // want to reacheck to later
      setChallengeDetails((data) => ({ ...data, problemType:problemType }))  
      
      const response=await createPairprogramming(challengeDetails)
      console.log(response.data,"created pariproramming response");
      
      router.push(`/pairProgramming/${response.data.joinCode}`)
      
    }catch(error){
      console.log(error,"Err creating pairprogrmming");
      
      toastError(error)
    }


    // onClose();
  };


  type pairProgammingChallenge = {
    challengeName: string;
    problems: string[],
    problemsName: string[],
    type: string,
    invitedUsers:string[]

  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-50 overflow-y-auto pt-20">
      <div className="bg-[#111111] border border-[#0ef] shadow-[0_0_10px_#0ef] rounded-lg p-6 w-full max-w-md my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#0ef] [text-shadow:0_0_10px_#0ef]">Start Pair Programming</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-[#0ef]">
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-[#0ef] font-bold mb-4">Session Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Session Name</label>
              <input 
                type="text" 
                value={challengeDetails.challengeName}
                onChange={(e) => setChallengeDetails((data)=>({...data,challengeName:e.target.value}))}
                placeholder="Enter session name..." 
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:border-[#0ef] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Problem Selection</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="problemType" 
                    checked={problemType === 'select'}
                    onChange={() => setProblemType('select')}
                    className="mr-2 text-[#0ef]"
                  />
                  <span>Select Problem</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="problemType" 
                    checked={problemType === 'random'}
                    onChange={() => setProblemType('random')}
                    className="mr-2 text-[#0ef]"
                  />
                  <span>Random Problem</span>
                </label>
              </div>
            </div>

            {problemType === 'select' && (
              <div className="space-y-4 border border-gray-800 rounded-lg p-4">
                <div>
                  <label className="block text-gray-400 mb-2">Select Problem</label>
                  <button
            type="button"
            onClick={() => setShowProblemModal(true)}
            className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-left text-gray-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <i className="fas fa-plus-circle mr-2"></i>Add Problems
            <span className="float-right text-neon-blue">({selectedProblemsCount})</span>
          </button>
                </div>
              </div>
            )}

            <div className="bg-black p-3 rounded text-sm">
              <div className="text-[#0ef] font-bold mb-2">Session Guidelines:</div>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Communicate clearly about the solution approach</li>
                <li>Use the chat for discussing implementation details</li>
                <li>Take turns explaining the code while coding</li>
                <li>Both participants should actively participate in problem-solving</li>
                <li>Session host has final control over code submission</li>
              </ul>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Session Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="sessionType" 
                    checked={sessionType === 'public'}
                    onChange={() => setSessionType('public')}
                    className="mr-2 text-[#0ef]"
                  />
                  <span>Public</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="sessionType" 
                    checked={sessionType === 'private'}
                    onChange={() => setSessionType('private')}
                    className="mr-2 text-[#0ef]"
                  />
                  <span>Private</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-[#0ef] font-bold mb-4">Invite a Friend</h4>
          <div className="relative mb-4">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search friends..." 
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 pl-10 focus:border-[#0ef] focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {friends
              .filter(friend => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(friend => (
                <div 
                  key={friend.id} 
                  className="flex items-center justify-between p-2 hover:bg-black rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden">
                        <img src="https://via.placeholder.com/32" alt="Friend" className="w-full h-full object-cover" />
                      </div>
                      {friend.online && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-300">{friend.name}</span>
                  </div>
                  <button 
                    onClick={() => toggleFriendInvite(friend.id)}
                    className={`${invitedFriends.includes(friend.id) ? 'text-[#0df]' : 'text-[#0ef]'} hover:text-[#0df]`}
                  >
                    <FaPlus />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:border-[#0ef] hover:text-[#0ef] transition duration-300"
          >
            Cancel
          </button>
          <button 
            onClick={startSession}
            className="flex-1 bg-[#0ef] text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300"
          >
            Start Session
          </button>
        </div>
      </div>
      {showProblemModal && <ProblemSelectionModal openProblem={openProblem} selectedProblemsCount={selectedProblemsCount} setShowProblemModal={setShowProblemModal} groupChallenge={challengeDetails}/>}
    </div>
  );
};

export default PairProgrammingModal;
