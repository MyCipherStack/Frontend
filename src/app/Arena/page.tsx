"use client"

import { ActiveChallenges } from '@/components/Arena/ActiveChallenges';
import JoinChallengeModal from '@/components/Arena/JoinchallengeModel';
import PairProgrammingModal from '@/components/Arena/JoinPairProgrammingModal';
import { BattleRequests } from '@/components/BattleRequests';
import Header from '@/components/Header';
import { ProblemSelectionModal } from '@/components/Problems/ProblemSelectionModal';
import ReportButton from '@/components/Report';
import { createGroupChallengeService } from '@/service/challengeServices';
import { toastError, toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';







export default function Arena() {


  const [activeModal, setActiveModal] = useState(null);
  const [selectedProblemsCount, setSelectedProblemsCount] = useState(0);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const router = useRouter()

  const closeModal = () => setActiveModal(null);

  type GroupChallenge = {
    challengeName: string;
    participants: string
    duration: string
    problems: {name:string,id:string}[],
    // problemsName: string[],
    type: string

  };
  const [groupChallenge, setGroupChallenge] = useState<GroupChallenge>({
    challengeName: "",
    participants: "2",
    duration: "60",
    problems:[],
    // problemsName: [],
    type: "public"
  })



  const openProblem = async (name: string, id: string) => {

    if (groupChallenge.problems.some((data)=>data.id==id)) {
      return toastError("already selected this problem")
    }
    // setGroupChallenge((data) => ({ ...data, problemsName: [...data.problemsName, name] }))
    setGroupChallenge((data) => ({ ...data, problems:[...data.problems,{name,id}] }))
    setSelectedProblemsCount(selectedProblemsCount + 1)
    toastSuccess(`${name} -Added`)

  }


  const deleteProblem=(name:string)=>{

    setGroupChallenge((data)=>({...data,
      problems:data.problems.filter((problem)=>problem.name !==name)
    }))

    setSelectedProblemsCount(prev=>prev-1)
    
  }



  const createGroupchallenge = async (e: React.ChangeEvent) => {
    try {
      e.preventDefault()
      if (!groupChallenge.challengeName) { return toastError("enter a challenge name") }
      if (groupChallenge.problems.length < 1) {
        return toastError("select least one problem ")
      }
      const response = await createGroupChallengeService(groupChallenge)
      toastSuccess(response.data.message)
      console.log(response.data);
      router.push(`/challenge/${response.data.joinCode}`)
      setActiveModal(null)
    } catch (error: unknown) {
      console.log(error)
      toastError("something went wrong in create challenge")
    }
  }

  // Battle Requests Component
  <BattleRequests />



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
        <ArenaCards setActiveModal={setActiveModal} />
        <ActiveChallenges />
        <BattleRequests />
        <ReportButton />
      </div>

      {/* Modals */}
      {activeModal === 'createGroup' && <CreateGroupModal groupChallenge={groupChallenge} setGroupChallenge={setGroupChallenge} setShowProblemModal={setShowProblemModal} createGroupchallenge={createGroupchallenge} selectedProblemsCount={selectedProblemsCount} closeModal={closeModal} deleteProblem={deleteProblem} />}
      {activeModal == "create1vs1" && <Create1vs1Model setActiveModal={setActiveModal} groupChallenge={groupChallenge} setGroupChallenge={setGroupChallenge} setShowProblemModal={setShowProblemModal} createGroupchallenge={createGroupchallenge} selectedProblemsCount={selectedProblemsCount} closeModal={closeModal} />}

      {showProblemModal && <ProblemSelectionModal openProblem={openProblem} selectedProblemsCount={selectedProblemsCount} setShowProblemModal={setShowProblemModal} groupChallenge={groupChallenge} deleteProblem={deleteProblem} />}

      {activeModal === "joinGroup" && <JoinChallengeModal onClose={closeModal} />}

      {activeModal === "pairProgramming" && <PairProgrammingModal onClose={closeModal} />}

    </div>
  );
}








const ArenaCards = ({ setActiveModal }) => (
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
          className="w-full bg-transparent border border-neon-blue text-neon-blue py-2 rounded "
        >
          Create Challenge
        </button>
        <button
          onClick={() => setActiveModal('joinGroup')}
          className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded "
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
          onClick={() => { setActiveModal('create1vs1') }}
          className="w-full bg-transparent border border-neon-blue text-neon-blue py-2 rounded hover:bg-neon-blue "
        >
          Challenge User
        </button>
        <button
          onClick={() => setActiveModal('joinGroup')}
          className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:border-neon-blue hover:text-neon-blue transition duration-300"
        >
          Join Challenge
        </button>
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
          className="w-full bg-transparent border border-neon-blue text-neon-blue py-2 rounded "
        >
          Start Session
        </button>
        <button
          onClick={() => setActiveModal('joinSession')}
          className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded "
        >
          Join Session
        </button>
      </div>
    </div>
  </div>
);











const CreateGroupModal = ({ groupChallenge, setGroupChallenge, setShowProblemModal, createGroupchallenge, selectedProblemsCount, closeModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 overflow-y-auto pt-20">
    <div className="bg-card-bg neon-border rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold neon-text">Create Group Challenge</h3>
        <button onClick={closeModal} className="hover:neon-text">
          <FaWindowClose />
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Challenge Name</label>
          <input type="text" value={groupChallenge.challengeName} onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, challengeName: e.target.value })) }} className="w-full bg-black border border-gray-700 rounded px-3 py-2" placeholder="Enter challenge name" />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Type</label>
          <select className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallenge.type} onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, type: e.target.value })) }} >
            <option value="public ">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Max Participants</label>
          <input type="number" onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, participants: e.target.value })) }} className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallenge.participants} />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Select problems</label>
          <button
            type="button"
            onClick={() => { setShowProblemModal(true) }}
            className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-left text-gray-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <i className="fas fa-plus-circle mr-2"></i>Add Problems
            <span className="float-right text-neon-blue">({selectedProblemsCount})</span>
          </button>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Duration</label>
          <select className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallenge.duration} onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, duration: e.target.value })) }} >
            <option value="30">30 minuts</option>
            <option value="60">1 Hours</option>
            <option value="120">2 Hours</option>
            <option value="180">3 Hours</option>
          </select>
        </div>
        <button className="w-full bg-white text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300" onClick={createGroupchallenge}>
          Create Challenge
        </button>
      </form>
    </div>
  </div>
);





const Create1vs1Model = ({ groupChallenge, setGroupChallenge, setShowProblemModal, createGroupchallenge, selectedProblemsCount, closeModal }) => (


  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 overflow-y-auto pt-20">
    <div className="bg-card-bg neon-border rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold neon-text">Create 1 vs 1 Challenge</h3>
        <button onClick={closeModal} className="hover:neon-text">
          <FaWindowClose />
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Challenge Name</label>
          <input type="text" value={groupChallenge.challengeName} onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, challengeName: e.target.value })) }} className="w-full bg-black border border-gray-700 rounded px-3 py-2" placeholder="Enter challenge name" />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Type</label>
          <select className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallenge.type} onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, type: e.target.value })) }} >
            <option value="public ">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {/* <div className=''>
          <label className="block text-gray-400 mb-1">Max Participants</label>
          <input type="number" onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, participants:2})) }} className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallenge.participants} />
        </div> */}
        <div>
          <label className="block text-gray-400 mb-1">Select problems</label>
          <button
            type="button"
            onClick={() => {
              setShowProblemModal(true)
              // setActiveModal("")
            }}
            className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-left text-gray-400 hover:border-neon-blue hover:text-neon-blue"
          >
            <i className="fas fa-plus-circle mr-2"></i>Add Problems
            <span className="float-right text-neon-blue">({selectedProblemsCount})</span>
          </button>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Duration</label>
          <select className="w-full bg-black border border-gray-700 rounded px-3 py-2" value={groupChallenge.duration} onChange={(e) => { setGroupChallenge((prev) => ({ ...prev, duration: e.target.value })) }} >
            <option value="30">30 minuts</option>
            <option value="60">1 Hours</option>
            <option value="120">2 Hours</option>
            <option value="180">3 Hours</option>
          </select>
        </div>
        <button className="w-full bg-white text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300" onClick={createGroupchallenge}>
          Create Challenge
        </button>
      </form>
    </div>
  </div>
);




