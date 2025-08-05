"use client"


import Header from '@/components/Header';
import LeaderboardDetails from '@/components/LeaderBoard';
import { Pagination } from '@/components/Pagination';
import { challengeLeaderBoard, challengeResults } from '@/service/challengeServices';
import { challenge } from '@/types/challenge';
import React, { useEffect, useState } from 'react';


const BattleResults = () => {



  const [allChallenge, setAllChallenge] = useState<{
    challengeId: challenge, userId: string,
    totalscore: number, solvedProblems: { name: string, id: string }[], _id: string
  }[]>([])
  const [leaderBoard, setLeaderBoard] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ProblemCount, setProblemCount] = useState(0)
  const [challengeTime, setChallengeTime] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalChallenges, setTotalChallenges] = useState(0)
  const [wins, setWins] = useState(0)
  const [winRate, setWinRate] = useState(0)








  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [status, setStatus] = useState("true")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState("1")
  const [limit, setLimit] = useState("10")
  const [totalProblem, setTotalProblem] = useState(0)
  const [totalPages, setTotalPages] = useState(0)



  const pageChange = (page: number) => {
    setPage(page + "")
  }


  const params = new URLSearchParams({ page, limit, status, search })








  // challengeTime, ProblemCount, isModalOpen, setIsModalOpen, leaderBoard
  useEffect(() => {
    run()


  }, [page])
  const run = async () => {

    const response = await challengeResults(params.toString())

    console.log(response.data.allChallenge);

    setAllChallenge(response.data.allChallenge.leaderBoard)

    setTotalPages(response.data.allChallenge.totalPages,)
    setTotalProblem(response.data.allChallenge.totalData)

    let total = response.data.allChallenge.leaderBoard.reduce((acc: number, data: { totalscore: number }) => acc + data.totalscore, 0)
    setTotalPoints(total)

    let totalChallengeCout = response.data.allChallenge.leaderBoard.length
    setTotalChallenges(totalChallengeCout)

    let win = response.data.allChallenge.leaderBoard.reduce((acc: number, data: { challengeId: { winner: string }, userId: string }) => data.challengeId.winner == data.userId ? acc + 1 : acc, 0)
    setWins(win)

    if (win > 0 && totalChallengeCout > 0) {
      setWinRate(Math.round((win / totalChallengeCout) * 100))
    }

  }





  let viewLeaderBoard = async (challegeData: challenge) => {


    setProblemCount(challegeData.problems.length)

    setChallengeTime(challegeData.duration)
    setIsModalOpen(true)
    const leaderBoad = await challengeLeaderBoard(challegeData._id!)
    console.log(leaderBoad.data);

    setLeaderBoard(leaderBoad.data.response)



  }





  return (
    <>
      <Header />
      <div className="bg-[#111111] neon-border rounded-lg p-8 mb-8 ">
        <div className="text-center mb-8 mt-10">
          <h1 className="text-4xl font-bold neon-text mb-4">BATTLE RESULTS</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-black p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#0ef]">{totalPoints}</div>
              <div className="text-sm text-gray-400">Total Points Earned</div>
            </div>
            <div className="bg-black p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">{wins}/{totalChallenges}</div>
              <div className="text-sm text-gray-400">Battles Won</div>
            </div>
            <div className="bg-black p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-[#0ef]">{winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
          </div>
        </div>






        {/* Group Challenges Section */}
        <div className="mb-8 h-screen">
          <h2 className="text-xl font-bold text-[#0ef] mb-4"> Challenge Results</h2>
          <div className="space-y-4">
            {/* Group Challenge Result */}

            {allChallenge.length === 0 && (
              <div className="bg-black p-6 rounded-lg text-center">

                <p className="text-gray-400">No challenges completed yet</p>
              </div>)}


            {allChallenge.map((data, index) => {
              return <div className="bg-black rounded-lg p-4" key={index}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#0ef] text-sm">{data?.challengeId?.challengeName ?? "no name"}</span>
                    <span className="text-green-400">#2 of 12</span>
                  </div>
                  <div className="text-gray-400 text-sm">{data.challengeId.problems?.length} Problems</div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <div className="text-gray-400">Points: <span className="text-[#0ef]">+{data.totalscore}</span></div>
                  <div className="text-gray-400">

                    {data.challengeId.winner == data.userId ? <span className="text-green-400 text-sm">Victory</span> : <span className="text-red-400 text-sm">Defeat</span>}</div>

                  <div className="text-gray-400">Solved: <span className="text-[#0ef]">{data.solvedProblems.length}/{data.challengeId.problems.length}</span></div>
                  <div className="text-gray-400">Time: <span className="text-[#0ef]">{data.challengeId.duration}:00</span></div>
                  <div><span className="text-yellow-400 text-xs" onClick={() => viewLeaderBoard(data.challengeId)}>View LeaderBoard</span> </div>


                </div>
              </div>
            })
            }

            <Pagination currentPage={+page} limit={+limit} onPageChange={pageChange} totalData={totalProblem} totalPages={totalPages}></Pagination>

          </div>
        </div>


        <LeaderboardDetails challengeTime={challengeTime} ProblemCount={ProblemCount} isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen} leaderBoard={leaderBoard}
        ></LeaderboardDetails>

        {/* Rating Progress */}

        {/* <Leaderboard /> */}
      </div>
    </>

  );
};

export default BattleResults;

const Leaderboard = () => {
  return (
    <div className="bg-[#111111] neon-border rounded-lg p-8">
      <h2 className="text-3xl font-bold neon-text mb-6">GROUP CHALLENGE LEADERBOARDS</h2>


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
            <tr className="bg-[#0ef10]  hover:border border-[#0ef] bg-opacity-10">
              <td className="px-4 py-4 text-[#0ef] font-bold">2</td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 border hover:border-[#0ef]">
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
            <tr className="bg-[#0ef10]  hover:border border-[#0ef] bg-opacity-10">

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
