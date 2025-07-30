import { joinPairProgramming } from '@/service/challengeServices';
import { toastError } from '@/utils/toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaKey } from 'react-icons/fa';

const JoinPairProgramModel = ({ onClose }: { onClose: () => void }) => {
  const [challengeCode, setChallengeCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const joinPrivateChallenge = async () => {
    if (!challengeCode.trim()) {
      toastError('Please enter a challenge code');
      return;
    }

    setIsLoading(true);
    
    try {
      const params = new URLSearchParams({ joinCode: challengeCode });
      
      await joinPairProgramming(params.toString());

      router.push(`/pairProgramming/${challengeCode}`)

      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.response?.data.message || 'Failed to join challenge');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Submit on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') joinPrivateChallenge();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-start justify-center z-50 overflow-y-auto pt-20">
      <div className="bg-[#111111] border border-[#0ef] shadow-[0_0_10px_#0ef] rounded-lg p-6 w-full max-w-md my-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#0ef] [text-shadow:0_0_10px_#0ef]">
            Join Pair-programm
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-[#0ef]"
            disabled={isLoading}
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="border-t border-gray-800 pt-6">
          <h4 className="text-[#0ef] font-bold mb-4">Join Private pairProgramming</h4>
          
          {/* Input Group */}
          <div className="space-y-4">
            <div className="relative">
              <input 
                ref={inputRef}
                type="text" 
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter challenge code..." 
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 pl-10 focus:border-[#0ef] focus:outline-none"
                disabled={isLoading}
              />
              <FaKey className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Submit Button */}
            <button 
              onClick={joinPrivateChallenge}
              disabled={isLoading || !challengeCode.trim()}
              className={`w-full border border-[#0ef] py-2 rounded transition duration-300 flex items-center justify-center ${
                isLoading || !challengeCode.trim()
                  ? 'text-gray-500 border-gray-500 cursor-not-allowed'
                  : 'text-[#0ef] hover:bg-[#0ef] hover:text-black'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0ef]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </>
              ) : (
                'Join Private Challenge'
              )}
            </button>
          </div>

          {/* Help Text */}
          <p className="mt-3 text-xs text-gray-400">
            Ask the challenge creator for the access code
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinPairProgramModel;








