import { FaTimes } from 'react-icons/fa';
import { typeLeaderBoad } from './LeaderBoardSideBar';
import { useEffect, useState } from 'react';



// type LeaderboardEntry = {
//     id: string;
//     userId: string;
//     username: string;
//     totalScore: number;
//     solvedProblems: string[];
//     status: 'active' | 'idle' | 'offline';
//     lastActivity: string;
//     rank: number;
// };


type LeaderboardDetailsProps = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    leaderBoard: typeLeaderBoad[],
    ProblemCount: number,
    challengeTime: number
};

const LeaderboardDetails = ({ challengeTime, ProblemCount, isModalOpen, setIsModalOpen, leaderBoard }: LeaderboardDetailsProps) => {


    const [completion, setCompletion] = useState(0)
    useEffect(() => {


        let totalPossible = leaderBoard.length * ProblemCount

        const totalSolved = leaderBoard.reduce((acc, data) =>acc+data.solvedCount, 0)
    


        let overallComplection = (totalSolved / totalPossible)  * 100
        console.log(totalPossible,totalSolved,overallComplection,ProblemCount);
        
        setCompletion(overallComplection)

    }, [ProblemCount,leaderBoard])

    const closeLeaderboardModal = () => setIsModalOpen(false);

    return (
        <>



            {/* Leaderboard Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-[#111111] rounded-lg neon-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-black px-6 py-4 relative terminal-dots border-b border-[#0ef] flex justify-between items-center">
                            <div className="text-[#0ef] font-bold ml-20">Challenge Leaderboard</div>
                            <button
                                onClick={closeLeaderboardModal}
                                className="text-gray-400 hover:text-[#0ef] text-xl"
                            >
                                <i ><FaTimes /></i>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            {/* Challenge Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-[#0a0a0a] p-4 rounded-lg border border-[#0ef] text-center">
                                    <div className="text-2xl font-bold text-[#0ef]">{leaderBoard.length}</div>
                                    <div className="text-gray-400 text-sm">Total Participants</div>
                                </div>
                                <div className="bg-[#0a0a0a] p-4 rounded-lg border border-[#0ef] text-center">
                                    <div className="text-2xl font-bold text-[#0ef]">{ProblemCount}</div>
                                    <div className="text-gray-400 text-sm">Problems</div>
                                </div>
                                <div className="bg-[#0a0a0a] p-4 rounded-lg border border-[#0ef] text-center">
                                    <div className="text-2xl font-bold text-[#0ef]">{Number(challengeTime /60)}</div>
                                    <div className="text-gray-400 text-sm">Hour</div>
                                </div>
                            </div>

                            {/* Leaderboard Table */}
                            <div className="bg-[#0a0a0a] rounded-lg border border-[#0ef] overflow-hidden">
                                <div className="bg-black px-4 py-3 border-b border-[#0ef]">
                                    <h3 className="text-[#0ef] font-bold">Rankings</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-[#111111] border-b border-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-[#0ef] font-semibold">Rank</th>
                                                <th className="px-4 py-3 text-left text-[#0ef] font-semibold">User</th>
                                                <th className="px-4 py-3 text-left text-[#0ef] font-semibold">Score</th>
                                                <th className="px-4 py-3 text-left text-[#0ef] font-semibold">Solved</th>
                                                <th className="px-4 py-3 text-left text-[#0ef] font-semibold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaderBoard.map((entry, index) => (
                                                <tr key={index} className="border-b border-gray-800 hover:bg-[#0ef1]">
                                                    <td className="px-4 py-3">{entry.rank}</td>
                                                    <td className="px-4 py-3 flex items-center">
                                                        <img
                                                            src={entry.image}
                                                            width={32}
                                                            height={32}
                                                            className="w-8 h-8 rounded-full mr-2"
                                                            alt="User avatar"
                                                        />
                                                        {entry.userName}
                                                    </td>
                                                    <td className="px-4 py-3">{entry.totalScore}</td>
                                                    <td className="px-4 py-3">{entry.solvedCount}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`${entry.isLive === true ? 'text-green-400' :
                                                            entry.isLive === false ? 'text-yellow-400' : 'text-gray-400'
                                                            }`}>
                                                            {entry.isLive ? "active" : "idle"}
                                                        </span>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Problem Progress */}
                            <div className="mt-6 bg-[#0a0a0a] rounded-lg border border-[#0ef] overflow-hidden">
                                <div className="bg-black px-4 py-3 border-b border-[#0ef]">
                                    <h3 className="text-[#0ef] font-bold">Challenge Statistics</h3>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                        <div className="bg-[#111111] p-3 rounded border border-gray-800 text-center">
                                            <h3></h3>
                                            <div className="text-sm text-gray-200 mb-1">Total Score </div>
                                            <div className="text-lg font-bold text-green-400">{leaderBoard.reduce((acc, data) => data.totalScore ?? 0, 0)}</div>
                                            <div className="text-xs text-gray-500">Points</div>
                                        </div>
                                        <div className="bg-[#111111] p-3 rounded border border-gray-800 text-center">
                                            <div className="text-sm text-gray-200 mb-1">Completion Rate</div>
                                            <div className="text-lg font-bold text-yellow-400">{completion} %</div>
                                            <div className="text-xs text-gray-500"></div>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LeaderboardDetails;