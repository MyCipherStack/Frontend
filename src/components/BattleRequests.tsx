
export const BattleRequests = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold neon-text mb-6">Pair  Programming Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Incoming Challenge Request */}
        <div className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-card-bg border-2 neon-border overflow-hidden">
                  <img src="https://widget.cloudinary.com/v2.0/global/all.js" alt="Challenger" className="w-full h-full object-cover" />
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
            <button className="flex-1 text-black  py-2 rounded font-bold bg-color transition duration-300">
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
                <img src="https://widget.cloudinary.com/v2.0/global/all.js" alt="Opponent" className="w-full h-full object-cover" />
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
          <button className="w-full bg-transparent border border-gray-600 text-gray-300 py-2 rounded hover:text-red-400 hover:border-red-500 transition duration-300">
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );