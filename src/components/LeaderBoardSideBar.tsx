import socket from '@/utils/socket';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaUsers, FaClock, FaCode,FaUpRightFromSquare } from 'react-icons/fa6';
import LeaderboardDetails from './LeaderBoard';

export interface typeLeaderBoad {
  userName: string,
  totalScore: number,
  solvedCount: number
  isLive: boolean,
  image: string,
  rank:number
}

const LeaderBoardSideBar = ({ challengeTime, ProblemCount, challengeName }: {
  challengeTime: number,
  ProblemCount:number, challengeName: string
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState<typeLeaderBoad[]>([])
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {

    const handler = async (response: typeLeaderBoad[]) => {
      setLeaderBoard(response)
      console.log(response, "leaderBoad Data");

    }
    socket.on("leaderboard-update", handler)
    console.log("fdsfd");
    return () => {
      socket.off("leaderboard-update", handler)
    }
  }, [])


    const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-80 z-50 bg-[#000000] border border-[#0ef] shadow-[0_0_10px_#0ef] transition-transform duration-300 ${isCollapsed ? 'translate-x-[300px]' : ''}`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-10 h-20 bg-[#000000] border border-[#0ef] border-r-0 rounded-l-md cursor-pointer flex items-center justify-center text-[#0ef]"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto p-4 space-y-4">
        {/* Challenge Info */}
        <div className="bg-[#111111] border border-[#0ef] shadow-[0_0_10px_#0ef] rounded-lg p-4">
          <h2 className="text-xl font-bold text-[#0ef] mb-2">{challengeName}</h2>
          <div className="text-gray-400 text-sm space-y-2">
            <p className="flex items-center"><FaUsers className="mr-2" />{leaderBoard.length} Participants</p>
            <p className="flex items-center"><FaClock className="mr-2" />{Number(challengeTime) / 60} Hours Challenge</p>
            <p className="flex items-center"><FaCode className="mr-2" />{ProblemCount} Problems</p>
          </div>
        </div>


        {/* Participants */}
        <div className="bg-[#111111] border border-[#0ef] shadow-[0_0_10px_#0ef] rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">Active Participants</h3>
          <div className="space-y-2">
            {leaderBoard.map((user, index) => (

              <div key={index} className="p-2 rounded flex items-center border-l-2 border-green-500">
                <img src={user.image} className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <div className="text-sm">{user.userName}</div>
                  <div className="text-m text-cyan-600">Solved:{user.solvedCount} problems</div>
                  <div className="text-xs text-green-400">{user.isLive ? "online" : "Idle"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Leaderboard */}
        <div className="bg-[#111111] border border-[#0ef] shadow-[0_0_10px_#0ef] rounded-lg p-4">
          <h3 onClick={() => setIsModalOpen(true)} className="text-lg font-bold mb-4 flex justify-between cursor-pointer">Leaderboard <span className=' text-sm flex gap-2 mt-auto'><FaUpRightFromSquare /> View full</span> </h3>
          {leaderBoard.map((user, index) => (
            <div key={index} className="space-y-2">

              <div className="p-2 rounded flex items-center justify-between hover:bg-[rgba(0,239,255,0.1)]">
                <div className="flex items-center">
                  <span className="text-[#0ef] mr-3">{index + 1}</span>
                  <img src={user.image} className="w-8 h-8 rounded-full mr-2" />
                  <span>{user.userName}</span>
                </div>
                <div className="text-[#0ef]">{user.totalScore}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LeaderboardDetails challengeTime={challengeTime} ProblemCount={ProblemCount} leaderBoard={leaderBoard} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default LeaderBoardSideBar;