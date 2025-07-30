"use client"
import AdminNavbar from '@/components/Admin/NavBar';
import { Pagination } from '@/components/Pagination';
import { challengeChangeStatus, changeStatusPairProgarm, getAllGroupChallenges, getAllPairProgramming, } from '@/service/challengeServices';
import { challenge, pairProgrammingChallenge } from '@/types/challenge';
import { confirmationAlert } from '@/utils/confirmationAlert';
import { useEffect, useState } from 'react';
import { FaUsers, FaClock, FaCode, FaCalendarAlt, FaSearch } from 'react-icons/fa';


const AdminContestControl = () => {
  const [groupChallenge, setGroupChallenge] = useState<challenge[]>([])
  const [pairProgramming, setPairProgramming] = useState<pairProgrammingChallenge[]>([])


  const [groupStatus, setGroupStatus] = useState("")
  const [groupSearch, setGroupSearch] = useState("")
  const [groupPage, setGroupPage] = useState("1")
  const [groupLimit] = useState("4")
  const [groupIsBlocked, setGroupIsBlocked] = useState("")
  const [groupTotalDataCount, setGroupTotalDataCount] = useState(0)
  const [groupTotalPages, setGroupTotalPages] = useState(0)

  const [pairStatus, setPairStatus] = useState("")
  const [pairPage, setPairPage] = useState("1")
  const [pairLimit] = useState("4")
  const [pairTotalDataCount, setPairTotalDataCount] = useState(0)
  const [pairTotalPages, setPairTotalPages] = useState(0)
  const [pairIsBlocked, setPairIsBlocked] = useState("")
  const [pairSearch, setPairSearch] = useState("")







  const changeStatusGroupChallenge = async (status: boolean, id: string) => {


    const allow = await confirmationAlert("status")

    if (allow) {

      if (status != true) {

        const res = await challengeChangeStatus("true", id)
        const updatedChallenge = res.data.challenge
        setGroupChallenge(prev => {

          return prev.map(challenge =>

            challenge._id === updatedChallenge._id ? updatedChallenge : challenge
          )
        })

      } else {
        const res = await challengeChangeStatus("false", id)
        const updatedChallenge = res.data.challenge

        setGroupChallenge(prev => {

          return prev.map(challenge => {

            return challenge._id === updatedChallenge._id ? updatedChallenge : challenge
          })
        })



      }

    }

  }
  const changeStatusPairProgramming = async (status: boolean, id: string) => {


    const allow = await confirmationAlert("status")

    if (allow) {

      if (status != true) {

        const res = await changeStatusPairProgarm("true", id)
        const updatedChallenge = res.data.challenge
        setPairProgramming(prev => {
          return prev.map(challenge =>
            challenge._id === updatedChallenge._id ? updatedChallenge : challenge
          )
        })

      } else {
        const res = await changeStatusPairProgarm("false", id)
        const updatedChallenge = res.data.challenge

        setPairProgramming(prev => {
          return prev.map(challenge => {
      
            return challenge._id === updatedChallenge._id ? updatedChallenge : challenge
          })
        })



      }

    }

  }












  const pageChange = (page: number) => {
    setGroupPage(page + "")
  }
  const pairPageChange = (page: number) => {
    setPairPage(page + "")
  }




  useEffect(() => {
    const getData = async () => {

      const params = new URLSearchParams({ status: groupStatus, page: groupPage, limit: groupLimit, isBlocked: groupIsBlocked, search: groupSearch })
      const res = await getAllGroupChallenges(params.toString())

      console.log(res.data)

      setGroupChallenge(res.data.challenges.datas)
      setGroupTotalPages(res.data.challenges.totalPages)
      setGroupTotalDataCount(res.data.challenges.totalCount)



    }

    setTimeout(() => {

      getData()
    }, 500)

  }, [groupPage, groupSearch, groupStatus, groupIsBlocked])



  useEffect(() => {
    const getData = async () => {

      const params = new URLSearchParams({ status: pairStatus, page: pairPage, limit: pairLimit, isBlocked: pairIsBlocked, search: pairSearch })

      const res = await getAllPairProgramming(params.toString())
      console.log(res.data)

      setPairTotalPages(res.data.pairProgram.totalPages)
      setPairTotalDataCount(res.data.pairProgram.totalCount)
      setPairProgramming(res.data.pairProgram.data)

    }
    setTimeout(() => {

      getData()
    }, 500)

  }, [pairPage, pairSearch, pairStatus, pairIsBlocked,pairLimit])


  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return "bg-green-900 text-green-400";
      case 'waiting':
        return "bg-yellow-900 text-yellow-400";
      default:
        return "bg-gray-800 text-gray-400";
    }
  };




  return (
    <div>

      <AdminNavbar status={"contests"} />

      <div className=" content-area min-h-screen bg-black">
        <h1 className="text-2xl font-bold neon-text">Contests</h1>



        <div className="container mx-auto px-4 py-12">
          <h2 className="text-lg font-bold neon-text mb-6">GroupChallenges</h2>
          <div className="bg-card-bg rounded-lg neon-border p-4 mb-8 text-xs">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="text" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)}
                  placeholder="Search challenge name..."
                  className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-500" />
                </div>
              </div>
              <select value={groupStatus} onChange={(e) => setGroupStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
                <option value="">Status</option>
                <option value="waiting">waiting</option>
                <option value="started">started</option>
                <option value="ended">ended</option>
              </select>
              <select value={groupIsBlocked} onChange={(e) => setGroupIsBlocked(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
                <option value="">Any Status</option>
                <option value="false">Active</option>
                <option value="true">Blocked</option>
              </select>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupChallenge.map((challenge) => (
              <div key={challenge._id} className="card neon-border p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neon-blue">{challenge.challengeName}</h3>
                    <p className="text-sm text-gray-400 capitalize">{challenge.type} Group Challenge</p>
                    <p className="text-xs text-gray-500">ID: {challenge._id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(challenge.status)}`}>
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-400  `}>
                    {challenge.isBlocked === true ? " Admin Blocked" : "active"}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>
                    <FaUsers className="inline mr-2" />
                    0/{challenge.maxParticipants} participants
                  </span>
                  <span>
                    <FaClock className="inline mr-2" />
                    {challenge.duration} min
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>
                    <FaCode className="inline mr-2" />
                    Join Code: <span className="font-mono">{challenge.joinCode}</span>
                  </span>
                  <span>
                    <FaCalendarAlt className="inline mr-2" />
                    {new Date(challenge.startTime ?? "").toLocaleString()}
                  </span>
                </div>

                <div onClick={() => changeStatusGroupChallenge(challenge.isBlocked, challenge._id!)} className="flex space-x-2 mb-2">
                  <button className="px-4 py-2 bg-gray-800 text-yellow-400 border border-yellow-400 rounded font-bold hover:bg-yellow-900 hover:text-white transition duration-300">
                    {challenge.isBlocked !== true ? "Block" : "Unblock"}
                  </button>
                </div>

                <div className="text-xs text-gray-500">
                  Created: {new Date(challenge.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  Updated: {new Date(challenge.updatedAt ?? "").toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={+groupPage} limit={+groupLimit} onPageChange={pageChange} totalData={groupTotalDataCount} totalPages={groupTotalPages}></Pagination>
        </div>


        {/* pair programming */}


        <div className="container mx-auto px-4 py-12">
          <h2 className="text-lg font-bold neon-text mb-6">Pair Programming</h2>
          <div className="bg-card-bg rounded-lg neon-border p-4 mb-8 text-xs">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="text" value={pairSearch} onChange={(e) => setPairSearch(e.target.value)}
                  placeholder="Search challenge name..."
                  className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-500" />
                </div>
              </div>
              <select value={pairStatus} onChange={(e) => setPairStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
                <option value="">Status</option>
                <option value="waiting">waiting</option>
                <option value="started">started</option>
                <option value="ended">ended</option>
              </select>
              <select value={pairIsBlocked} onChange={(e) => setPairIsBlocked(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
                <option value="">Any Status</option>
                <option value="false">Active</option>
                <option value="true">Blocked</option>
              </select>

            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pairProgramming.map((challenge, idx) => (
              <div key={idx} className="card neon-border p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neon-blue">{challenge.challengeName}</h3>
                    <p className="text-sm text-gray-400 capitalize">{challenge.type} Pair programming</p>
                    <p className="text-xs text-gray-500">ID: {challenge._id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(challenge.status)}`}>
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-400  `}>
                    {challenge.isBlocked === true ? " Admin Blocked" : "active"}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-400 mb-2">

                  <span>
                    <FaClock className="inline mr-2" />
                    {challenge.duration} min
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>
                    <FaCode className="inline mr-2" />
                    Join Code: <span className="font-mono">{challenge.joinCode}</span>
                  </span>
                  <span>
                    <FaCalendarAlt className="inline mr-2" />
                    {new Date(challenge.startTime ?? "").toLocaleString()}
                  </span>
                </div>

                <div onClick={() => changeStatusPairProgramming(challenge.isBlocked, challenge._id!)} className="flex space-x-2 mb-2">
                  <button className="px-4 py-2 bg-gray-800 text-yellow-400 border border-yellow-400 rounded font-bold hover:bg-yellow-900 hover:text-white transition duration-300">
                    {challenge.isBlocked !== true ? "Block" : "Unblock"}


                  </button>
                </div>

                <div className="text-xs text-gray-500">
                  Created: {new Date(challenge.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  Updated: {new Date(challenge.updatedAt ?? "").toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination currentPage={+pairPage} limit={+pairLimit} onPageChange={pairPageChange} totalData={pairTotalDataCount} totalPages={pairTotalPages}></Pagination>

      </div>
    </div>
  );
};

export default AdminContestControl;

