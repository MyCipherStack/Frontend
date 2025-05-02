"use client"
import Header from '@/components/Header';
import ProblemTable from '@/components/Problems/ProblemTable';
import { createGroupChallengeService } from '@/service/createChallenges';
import { toastSuccess } from '@/utils/toast';
import { useState } from 'react';

export default function Arena() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProblemsCount, setSelectedProblemsCount] = useState(0);
  const [showProblemModal, setShowProblemModal] = useState(false);

  const closeModal = () => setActiveModal(null);


   type GroupChallenge = {
    challengeName: string;
    participants:string
    duration:string
    name:string,
    type:string

  };
  const [groupChallege,setGroupChallenge]=useState<GroupChallenge>({
    challengeName:"",
    participants:"10",
    duration:"1",
    name:"",
    type:"public"
  })
  const openProblem=async(name:string)=>{  
   
    setGroupChallenge((data)=>({...data,name}))

    // router.push(`/problemDetails/${name}`)

  // const problemData=await getDataService("/p")
  }




  
const createGroupchallenge=async()=>{


// /api/user/arena/createGroupChallenge
 const response=await createGroupChallengeService(groupChallege)
  toastSuccess(response.data.message)
  console.log(groupChallege);
  



}
  

  // Arena Cards Component
  const ArenaCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Group Challenge Card */}
      <div className="card neon-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold neon-text">Group Challenge</h2>
          <i className="fas fa-users text-2xl text-neon-blue"></i>
        </div>
        <p className="text-gray-400 mb-6">Create or join group coding challenges. Compete with multiple participants in real-time.</p>
        <div className="space-y-4">
          <button 
            onClick={() => setActiveModal('createGroup')}
            className="w-full bg-transparent border border-neon-blue text-neon-blue py-2 rounded hover:bg-neon-blue hover:text-black transition duration-300"
          >
            Create Challenge
          </button>
          <button 
            onClick={() => setActiveModal('joinGroup')}
            className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:border-neon-blue hover:text-neon-blue transition duration-300"
          >
            Join Challenge
          </button>
        </div>
      </div>

      {/* 1v1 Battle Card */}
      <div className="card neon-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold neon-text">1v1 Battle</h2>
          <i className="fas fa-gamepad text-2xl text-neon-blue"></i>
        </div>
        <p className="text-gray-400 mb-6">Challenge a specific user to a 1v1 coding battle. Test your skills in head-to-head competition.</p>
        <div className="space-y-4">
          <button 
            onClick={() => setActiveModal('battle')}
            className="w-full bg-transparent border border-neon-blue text-neon-blue py-2 rounded hover:bg-neon-blue hover:text-black transition duration-300"
          >
            Challenge User
          </button>
          <div className="text-center text-sm text-gray-500">
            <span className="text-neon-blue">3</span> pending challenges
          </div>
        </div>
      </div>

      {/* Pair Programming Card */}
      <div className="card neon-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold neon-text">Pair Programming</h2>
          <i className="fas fa-code-branch text-2xl text-neon-blue"></i>
        </div>
        <p className="text-gray-400 mb-6">Collaborate with friends in real-time. Solve problems together and learn from each other.</p>
        <div className="space-y-4">
          <button 
            onClick={() => setActiveModal('pairProgramming')}
            className="w-full bg-transparent border border-neon-blue text-neon-blue py-2 rounded hover:bg-neon-blue hover:text-black transition duration-300"
          >
            Start Session
          </button>
          <button 
            onClick={() => setActiveModal('joinSession')}
            className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:border-neon-blue hover:text-neon-blue transition duration-300"
          >
            Join Session
          </button>
        </div>
      </div>
    </div>
  );

  // Active Challenges Component
  const ActiveChallenges = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold neon-text mb-6">Active Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Public Challenge Card */}
        <div className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-neon-blue">Algorithm Masters</h3>
              <p className="text-sm text-gray-400">Public Group Challenge</p>
            </div>
            <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">Live</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span><i className="fas fa-users mr-2"></i>8/12 participants</span>
            <span><i className="fas fa-clock mr-2"></i>1:30:00 remaining</span>
          </div>
          <button className="w-full bg-neon-blue text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300">
            Join Challenge
          </button>
        </div>

        {/* Private Challenge Card */}
        <div className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-neon-blue">Elite Coders</h3>
              <p className="text-sm text-gray-400">Private Group Challenge</p>
            </div>
            <span className="px-3 py-1 bg-yellow-900 text-yellow-400 rounded-full text-sm">Waiting</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span><i className="fas fa-users mr-2"></i>4/6 participants</span>
            <span><i className="fas fa-lock mr-2"></i>Invite Only</span>
          </div>
          <div className="flex space-x-2">
            <input type="text" value="challenge-xyz-123" className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-sm" readOnly />
            <button className="px-4 py-2 bg-transparent border border-neon-blue text-neon-blue rounded hover:bg-neon-blue hover:text-black transition duration-300">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Battle Requests Component
  const BattleRequests = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold neon-text mb-6">1v1 Battle Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Incoming Challenge Request */}
        <div className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-card-bg border-2 border-neon-blue overflow-hidden">
                  <img src="https://via.placeholder.com/40" alt="Challenger" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neon-blue">CodeNinja_42</h3>
                <p className="text-sm text-gray-400">Rating: 2150 • Win Rate: 68%</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-yellow-900 text-yellow-400 rounded-full text-sm">Incoming</span>
          </div>
          <div className="grid grid-cols-3 text-sm text-gray-400 mb-4">
            <span><i className="fas fa-clock mr-2"></i>5:00 left</span>
            <span><i className="fas fa-code mr-2"></i>Medium</span>
            <span><i className="fas fa-trophy mr-2"></i>50 points</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-neon-blue text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300">
              Accept
            </button>
            <button className="flex-1 bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:border-red-500 hover:text-red-500 transition duration-300">
              Decline
            </button>
          </div>
        </div>

        {/* Outgoing Challenge Request */}
        <div className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-card-bg border-2 border-neon-blue overflow-hidden">
                  <img src="https://via.placeholder.com/40" alt="Opponent" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neon-blue">ByteMaster</h3>
                <p className="text-sm text-gray-400">Rating: 1890 • Win Rate: 72%</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-900 text-blue-400 rounded-full text-sm">Sent</span>
          </div>
          <div className="grid grid-cols-3 text-sm text-gray-400 mb-4">
            <span><i className="fas fa-clock mr-2"></i>2:30 left</span>
            <span><i className="fas fa-code mr-2"></i>Hard</span>
            <span><i className="fas fa-trophy mr-2"></i>100 points</span>
          </div>
          <button className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:border-neon-blue hover:text-neon-blue transition duration-300">
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );

  // Create Group Modal
  const CreateGroupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 overflow-y-auto pt-20">
      <div className="bg-card-bg neon-border rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold neon-text">Create Group Challenge</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-neon-blue">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Challenge Name</label>
            <input type="text"  value={groupChallege.challengeName}  onChange={(e)=>{setGroupChallenge({...groupChallege,challengeName:e.target.value})}} className="w-full bg-black border border-gray-700 rounded px-3 py-2" placeholder="Enter challenge name" />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Type</label>
            <select className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallege.type} onChange={(e)=>{setGroupChallenge({...groupChallege,type:e.target.value})}} >
              <option value="public ">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Max Participants</label>
            <input type="number"   onChange={(e)=>{setGroupChallenge({...groupChallege,participants:e.target.value})}} className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallege.participants} />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Select problems</label>
            <button 
              type="button"
              onClick={() => setShowProblemModal(true)}
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-left text-gray-400 hover:border-neon-blue hover:text-neon-blue"
            >
              <i className="fas fa-plus-circle mr-2"></i>Add Problems
              <span className="float-right text-neon-blue">({selectedProblemsCount})</span>
            </button>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Duration</label>
            <select   className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallege.duration} onChange={(e)=>{setGroupChallenge((data)=>({...data,duration:e.target.value}))}} > 
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
            </select>
          </div>
          <button  className="w-full bg-white text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300" onClick={createGroupchallenge}> 
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );

  // Problem Selection Modal
  const ProblemSelectionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-50 overflow-y-auto pt-20">
      <div className="bg-card-bg neon-border rounded-lg w-full max-w-5xl overflow-hidden">
        <div className="bg-black px-6 py-3 border-b border-neon-blue flex justify-between items-center">
          <div className="text-neon-blue font-bold">Select Problems</div>
          <button onClick={() => setShowProblemModal(false)} className="text-gray-400 hover:text-neon-blue">
            <i className="fas fa-times"></i>
          </button>
        </div>

      <ProblemTable openProblem={openProblem}></ProblemTable>
  
    

        {/* Footer with Selected Problems */}
        <div className="bg-black px-6 py-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-gray-400">
            Selected: <span className="text-neon-blue">0</span> problems
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowProblemModal(false)} className="px-4 py-2 bg-transparent border border-gray-600 text-gray-300 rounded hover:border-neon-blue hover:text-neon-blue">
              Cancel
            </button>
            <button 
              onClick={() => {
                setSelectedProblemsCount(3); // Example count
                setShowProblemModal(false);
              }} 
              className="px-4 py-2 bg-neon-blue text-black rounded hover:bg-[#0df]"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid-pattern">
    <Header></Header>
      
      {/* Header Section */}
      <div className="pt-20 pb-8 bg-darker-bg border-b border-neon-blue">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold neon-text mb-1">Arena</h1>
              <p className="text-gray-400">Challenge others, improve your skills, and climb the ranks</p>
            </div>
            <div className="flex space-x-6 md:space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">1,425</div>
                <div className="text-sm text-gray-400">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">2</div>
                <div className="text-sm text-gray-400">Battles Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">85%</div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ArenaCards />
        <ActiveChallenges />
        <BattleRequests />
      </div>

      {/* Modals */}
      {activeModal === 'createGroup' && <CreateGroupModal />}
      {showProblemModal && <ProblemSelectionModal/>}
    </div>
  );
}