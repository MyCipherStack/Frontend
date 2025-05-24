import { joinGroupChallenge } from '@/service/challengeServices';
import { toastError } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaTimes, FaUsers, FaClock, FaCode, FaTrophy, FaSearch, FaPlus } from 'react-icons/fa';

interface Challenge {
  id: string;
  name: string;
  status: 'live' | 'waiting' | 'starting';
  participants: string;
  timeLeft: string;
  problems: number;
  points: number;
}

const JoinChallengeModal = ({ onClose }: { onClose: () => void }) => {
  const [challengeCode, setChallengeCode] = useState('');
  const router=useRouter()
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      name: 'Algorithm Masters',
      status: 'live',
      participants: '8/12',
      timeLeft: '1:30:00',
      problems: 5,
      points: 300
    },
    {
      id: '2',
      name: 'Code Warriors',
      status: 'waiting',
      participants: '4/8',
      timeLeft: 'Starts in 5:00',
      problems: 3,
      points: 200
    }
  ]);

  const joinChallenge = (id: string) => {
    // Handle joining challenge
    console.log(`Joining challenge ${id}`);
    onClose();
  };

  const joinPrivateChallenge = async() => {
    if (challengeCode.trim()) {
      // Handle joining private challenge
      console.log(`Joining private challenge with code: ${challengeCode}`);
      const params = new URLSearchParams({ joinCode:challengeCode })

      try{
        const response = await joinGroupChallenge(params.toString());    // i want to change this later
        
        router.push(`/groupChallenge/${challengeCode}`)
        onClose();
      }catch(error){
              toastError(error.response.data.message)  
      }
      
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-50 overflow-y-auto pt-20">
      <div className="bg-[#111111] border border-[#0ef] shadow-[0_0_10px_#0ef] rounded-lg p-6 w-full max-w-md my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#0ef] [text-shadow:0_0_10px_#0ef]">Join Challenge</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-[#0ef]">
            <FaTimes />
          </button>
        </div>

        {/* <div className="mb-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          <h4 className="text-[#0ef] font-bold mb-4 sticky top-0 bg-[#111111] py-2">Available Challenges</h4>
          <div className="space-y-4">
            {challenges.map(challenge => (
              <div key={challenge.id} className="bg-black rounded-lg p-4 border border-gray-800 hover:border-[#0ef] transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-bold text-gray-200">{challenge.name}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    challenge.status === 'live' ? 'bg-green-900 text-green-400' :
                    challenge.status === 'waiting' ? 'bg-yellow-900 text-yellow-400' :
                    'bg-blue-900 text-blue-400'
                  }`}>
                    {challenge.status === 'live' ? 'Live' : 
                     challenge.status === 'waiting' ? 'Waiting' : 'Starting'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                  <div><FaUsers className="inline mr-2" />{challenge.participants} players</div>
                  <div><FaClock className="inline mr-2" />{challenge.timeLeft}</div>
                  <div><FaCode className="inline mr-2" />{challenge.problems} problems</div>
                  <div><FaTrophy className="inline mr-2" />{challenge.points} points</div>
                </div>
                <button 
                  onClick={() => joinChallenge(challenge.id)}
                  className="w-full bg-[#0ef] text-black py-2 rounded font-bold hover:bg-[#0df] transition duration-300"
                >
                  {challenge.status === 'live' ? 'Join Now' : 'Join Waiting Room'}
                </button>
              </div>
            ))}
          </div>
        </div> */}

        <div className="border-t border-gray-800 pt-6 sticky bottom-0 bg-[#111111]">
          <h4 className="text-[#0ef] font-bold mb-4">Join Private Challenge</h4>
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value)}
                placeholder="Enter challenge code..." 
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:border-[#0ef] focus:outline-none"
              />
            </div>
            <button 
              onClick={joinPrivateChallenge}
              className="w-full bg-transparent border border-[#0ef] text-[#0ef] py-2 rounded hover:bg-[#0ef] hover:text-black transition duration-300"
            >
              Join Private Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinChallengeModal;