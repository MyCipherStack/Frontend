






export const ActiveChallenges = ()=>{




    return (
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
  );}
  
  
  


  export const AdminChallengeControl = () => {




    


    const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };
  
    const calculateRemainingTime = (endTime) => {
      const end = new Date(endTime);
      const now = new Date();
      const diffMs = end - now;
      
      if (diffMs <= 0) return "Expired";
      
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${diffHours}h ${diffMinutes}m remaining`;
    };
  
    const getStatusBadge = (status) => {
      switch(status.toLowerCase()) {
        case 'live':
          return <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">Live</span>;
        case 'waiting':
          return <span className="px-3 py-1 bg-yellow-900 text-yellow-400 rounded-full text-sm">Waiting</span>;
        case 'completed':
          return <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Completed</span>;
        default:
          return <span className="px-3 py-1 bg-blue-900 text-blue-400 rounded-full text-sm">{status}</span>;
      }
    };
  
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold neon-text mb-6">Admin Challenge Control</h2>
        <div className="grid grid-cols-1 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge._id} className="card neon-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-neon-blue">{challenge.challengeName}</h3>
                  <p className="text-sm text-gray-400">
                    {challenge.type === 'public' ? 'Public Challenge' : 'Private Challenge'} • ID: {challenge._id}
                  </p>
                </div>
                {getStatusBadge(challenge.status)}
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900 p-3 rounded">
                  <p className="text-sm text-gray-400">Host ID</p>
                  <p className="font-mono text-sm">{challenge.hostId}</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="text-neon-blue">0/{challenge.maxParticipants}</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <p className="text-sm text-gray-400">Duration</p>
                  <p>{challenge.duration} minutes</p>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 p-3 rounded">
                  <p className="text-sm text-gray-400">Start Time</p>
                  <p>{formatTime(challenge.startTime)}</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <p className="text-sm text-gray-400">End Time</p>
                  <p>{formatTime(challenge.endTime)}</p>
                </div>
              </div>
  
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {challenge.type === 'private' && (
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">Join Code</p>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={challenge.joinCode} 
                        className="flex-1 bg-black border border-gray-700 rounded-l px-3 py-2 text-sm" 
                        readOnly 
                      />
                      <button 
                        className="px-4 py-2 bg-neon-blue text-black rounded-r font-bold hover:bg-[#0df] transition duration-300"
                        onClick={() => navigator.clipboard.writeText(challenge.joinCode)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
  
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">Problems ({challenge.problems.length})</p>
                  <div className="bg-black border border-gray-700 rounded px-3 py-2 h-10 overflow-y-auto">
                    {challenge.problems.length > 0 ? (
                      <p className="font-mono text-sm">{challenge.problems.join(', ')}</p>
                    ) : (
                      <p className="text-gray-500 text-sm">No problems added</p>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold hover:bg-[#0df] transition duration-300">
                  Edit Challenge
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition duration-300">
                  Cancel Challenge
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 transition duration-300">
                  View Participants
                </button>
                {challenge.status === 'waiting' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition duration-300">
                    Start Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };