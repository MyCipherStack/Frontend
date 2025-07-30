import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { createPairprogramming, pairProgramming } from '@/service/challengeServices';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '@/utils/toast';
import { ProblemSelectionModal } from '../Problems/ProblemSelectionModal';
import InvitedUsers from '../UsersInvite';





const CreatePairProgrammingModal = ({ onClose }: { onClose: () => void }) => {

  const [problemType, setProblemType] = useState<'select' | 'random'>('select');
  const [sessionType, setSessionType] = useState<'invite' | 'sharecode'>('invite');
  const [showProblemModal, setShowProblemModal] = useState(false)
  const [selectedProblemsCount, setSelectedProblemsCount] = useState(0)

  const [invitedUsers, setInvitedUsers] = useState<string[]>([])

  const router = useRouter()

  const [challengeDetails, setChallengeDetails] = useState<pairProgramming>({
    challengeName: "",
    problems: [],
    sessionType: "",
    type: "public",
    invitedUsers: []

  })

  const openProblem = async (name: string, id: string) => {


    if (challengeDetails.problems.some((data) => data.id == id)) {
      return toastError("already selected this problem")
    }

    setChallengeDetails((data) => ({ ...data, problems: [{ name, id }] }))

    setSelectedProblemsCount(selectedProblemsCount + 1)
    toastSuccess(`${name} -Added`)


  }


  const deleteProblem = (name: string) => {

    setChallengeDetails((data) => ({
      ...data,
      problems: data.problems.filter((problem) => problem.name !== name)
    }))
    setSelectedProblemsCount(prev => prev - 1)
  }


  useEffect(() => {
    setChallengeDetails((data) => ({ ...data, invitedUsers: invitedUsers }))
    setChallengeDetails((data) => ({ ...data, sessionType: sessionType, problemType }))
  }, [invitedUsers, sessionType, problemType])




  const startSession = async () => {
    try {
      console.log(challengeDetails.problems.length,problemType);
      
      if (!challengeDetails.challengeName.trim()) {
        return toastError("enter session name")
      }
      if (!challengeDetails.problems.length && problemType !== 'random') {
        return toastError("select any problem ")
      }
      console.log(challengeDetails)
      if (challengeDetails.sessionType === "invite" && challengeDetails.invitedUsers.length < 1) {
        return toastError("select any user")
      }





      const response = await createPairprogramming(challengeDetails)

      router.push(`/pairProgramming/${response.data.joinCode}`)

    } catch (error) {
      console.log(error, "Err creating pairprogrmming");

      toastError("Error try again")
    }


    // onClose();
  };


  type pairProgammingChallenge = {
    challengeName: string;
    problems: string[],
    problemsName: string[],
    type: string,
    invitedUsers: string[]
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
                onChange={(e) => setChallengeDetails((data) => ({ ...data, challengeName: e.target.value }))}
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
          </div>
        </div>

        <InvitedUsers
          allowedUser={5} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers}
          sessionType={sessionType} setSessionType={setSessionType}
        />




        <div className="flex gap-4 mt-7">
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
      {showProblemModal && <ProblemSelectionModal openProblem={openProblem} selectedProblemsCount={selectedProblemsCount} setShowProblemModal={setShowProblemModal} groupChallenge={challengeDetails}
        deleteProblem={deleteProblem} />}
    </div>
  );
};

export default CreatePairProgrammingModal;
