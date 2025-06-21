"use client"


import Header from '@/components/Header';
import React from 'react';

const BattleResults = () => {
  return (
    <>
    <Header/>
    <div className="bg-[#111111] neon-border rounded-lg p-8 mb-8 ">
      <div className="text-center mb-8 mt-10">
        <h1 className="text-4xl font-bold neon-text mb-4">BATTLE RESULTS</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-black p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-[#0ef]">350</div>
            <div className="text-sm text-gray-400">Total Points Earned</div>
          </div>
          <div className="bg-black p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-[#0ef]">+75</div>
            <div className="text-sm text-gray-400">Rating Gained</div>
          </div>
          <div className="bg-black p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-400">5/6</div>
            <div className="text-sm text-gray-400">Battles Won</div>
          </div>
          <div className="bg-black p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-[#0ef]">82%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
          <div className="bg-black p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-[#0ef]">#156</div>
            <div className="text-sm text-gray-400">New Rank</div>
          </div>
        </div>
      </div>

      {/* 1v1 Battles Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0ef] mb-4">1v1 Battle Results</h2>
        <div className="space-y-4">
          {/* Battle Result Card */}
          <div className="bg-black rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-sm">Victory</span>
                <span className="text-gray-400">vs</span>
                <span className="text-[#0ef]">ByteMaster</span>
              </div>
              <div className="text-gray-400 text-sm">Two Sum (Medium)</div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-gray-400">Points: <span className="text-[#0ef]">+100</span></div>
              <div className="text-gray-400">Rating: <span className="text-green-400">+25</span></div>
              <div className="text-gray-400">Time: <span className="text-[#0ef]">15:42</span></div>
            </div>
          </div>

          {/* Another Battle Result */}
          <div className="bg-black rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-red-400 text-sm">Defeat</span>
                <span className="text-gray-400">vs</span>
                <span className="text-[#0ef]">CodeNinja</span>
              </div>
              <div className="text-gray-400 text-sm">Valid Parentheses (Easy)</div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-gray-400">Points: <span className="text-red-400">+30</span></div>
              <div className="text-gray-400">Rating: <span className="text-red-400">-15</span></div>
              <div className="text-gray-400">Time: <span className="text-[#0ef]">22:15</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Group Challenges Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0ef] mb-4">Group Challenge Results</h2>
        <div className="space-y-4">
          {/* Group Challenge Result */}
          <div className="bg-black rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-[#0ef] text-sm">Algorithm Masters</span>
                <span className="text-green-400">#2 of 12</span>
              </div>
              <div className="text-gray-400 text-sm">3 Problems</div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-gray-400">Points: <span className="text-[#0ef]">+150</span></div>
              <div className="text-gray-400">Rating: <span className="text-green-400">+35</span></div>
              <div className="text-gray-400">Solved: <span className="text-[#0ef]">3/3</span></div>
              <div className="text-gray-400">Time: <span className="text-[#0ef]">45:00</span></div>
            </div>
          </div>

          {/* Another Group Challenge */}
          <div className="bg-black rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-[#0ef] text-sm">Code Warriors</span>
                <span className="text-yellow-400">#4 of 8</span>
              </div>
              <div className="text-gray-400 text-sm">2 Problems</div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-gray-400">Points: <span className="text-[#0ef]">+70</span></div>
              <div className="text-gray-400">Rating: <span className="text-green-400">+30</span></div>
              <div className="text-gray-400">Solved: <span className="text-[#0ef]">2/2</span></div>
              <div className="text-gray-400">Time: <span className="text-[#0ef]">30:00</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Progress */}
      <div className="bg-black rounded-lg p-6">
        <h3 className="text-xl font-bold text-[#0ef] mb-4">Rating Progress</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-gray-400">Initial Rating</div>
            <div className="text-2xl font-bold text-gray-300">2100</div>
          </div>
          <div className="text-[#0ef] text-4xl">
            <i className="fas fa-arrow-right"></i>
          </div>
          <div>
            <div className="text-gray-400">Final Rating</div>
            <div className="text-2xl font-bold text-[#0ef]">2175 (+75)</div>
          </div>
        </div>
        <div className="h-2 bg-gray-800 rounded overflow-hidden">
          <div className="h-full bg-[#0ef]" style={{ width: '75%' }}></div>
        </div>
        <div className="text-sm text-gray-400 mt-2">
          Progress to next rank: 75%
        </div>
      </div>
      <Leaderboard/>
    </div>
    </>

  );
};

export default BattleResults;

 const Leaderboard = () => {
  return (
    <div className="bg-[#111111] neon-border rounded-lg p-8">
      <h2 className="text-3xl font-bold neon-text mb-6">GROUP CHALLENGE LEADERBOARDS</h2>
      
      {/* Challenge Tabs */}
      <div className="flex mb-6 border-b border-gray-800">
        <button className="px-4 py-2 font-medium text-[#0ef] border-b-2 border-[#0ef]">Algorithm Masters</button>
        <button className="px-4 py-2 font-medium text-gray-400 hover:text-[#0ef]">Code Warriors</button>
        <button className="px-4 py-2 font-medium text-gray-400 hover:text-[#0ef]">All Challenges</button>
      </div>
      
      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-4 py-3">RANK</th>
              <th className="px-4 py-3">PLAYER</th>
              <th className="px-4 py-3">SOLVED</th>
              <th className="px-4 py-3">COMPLETION TIME</th>
              <th className="px-4 py-3">POINTS</th>
              <th className="px-4 py-3">EFFICIENCY</th>
            </tr>
          </thead>
          <tbody>
            {/* Current Player Row - Highlighted */}
            <tr className="bg-[#0ef10] border border-[#0ef] bg-opacity-10">
              <td className="px-4 py-4 text-[#0ef] font-bold">2</td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 border border-[#0ef]">
                    <span className="text-[#0ef]">YT</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">You</div>
                    <div className="text-xs text-gray-400">Rating: 2175</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-green-400">3/3</td>
              <td className="px-4 py-4 text-white">45:00</td>
              <td className="px-4 py-4 text-[#0ef] font-medium">150</td>
              <td className="px-4 py-4">
                <div className="h-2 w-36 bg-gray-800 rounded">
                  <div className="h-full bg-[#0ef]" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">85% efficient</div>
              </td>
            </tr>
            
            {/* First Place */}
            <tr className="hover:bg-gray-900">
              <td className="px-4 py-4 text-yellow-400 font-bold">1</td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-400">CN</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">CodeNinja</div>
                    <div className="text-xs text-gray-400">Rating: 2320</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-green-400">3/3</td>
              <td className="px-4 py-4 text-white">42:15</td>
              <td className="px-4 py-4 text-[#0ef] font-medium">165</td>
              <td className="px-4 py-4">
                <div className="h-2 w-36 bg-gray-800 rounded">
                  <div className="h-full bg-yellow-400" style={{ width: '92%' }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">92% efficient</div>
              </td>
            </tr>
            
            {/* Third Place */}
            <tr className="hover:bg-gray-900">
              <td className="px-4 py-4 text-[#cd7f32] font-bold">3</td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#cd7f32]">BM</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">ByteMaster</div>
                    <div className="text-xs text-gray-400">Rating: 2150</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-green-400">3/3</td>
              <td className="px-4 py-4 text-white">48:30</td>
              <td className="px-4 py-4 text-[#0ef] font-medium">135</td>
              <td className="px-4 py-4">
                <div className="h-2 w-36 bg-gray-800 rounded">
                  <div className="h-full bg-[#cd7f32]" style={{ width: '78%' }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">78% efficient</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Leaderboard Footer */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          Top 3 of 12 participants shown
        </div>
        <button className="px-4 py-2 text-sm border border-[#0ef] text-[#0ef] rounded hover:bg-[#0ef] hover:text-black transition duration-300">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};
