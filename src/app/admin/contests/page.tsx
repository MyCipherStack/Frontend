"use client"




import AdminNavbar from '@/components/Admin/NavBar';
import { getAllGroupChallenges, getAllPairProgramming } from '@/service/challengeServices';
import { useEffect, useState } from 'react';
  import {  FaUsers, FaClock, FaCode, FaCalendarAlt } from 'react-icons/fa';

const AdminContestControl = () => {
  const [groupChallenge,setGroupChallenge]=useState([])
  const [pairProgramming,setPairProgramming]=useState([])

  useEffect(()=>{
    const getData=async()=>{
      const res=await getAllGroupChallenges()
      console.log(res.data.challenges);
      const pair=await getAllPairProgramming()
      console.log("pair",pair.data.pairProgram);
      
      setGroupChallenge(res.data.challenges)
      setPairProgramming(pair.data.pairProgram)


    }
    getData()

  },[])


  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
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

      <AdminNavbar status={"contests"}/>

    <div className=" content-area min-h-screen bg-black">
      <h1 className="text-2xl font-bold neon-text">Contests</h1>



      <div className="container mx-auto px-4 py-12">
        <h2 className="text-lg font-bold neon-text mb-6">GroupChallenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupChallenge.map((challenge) => (
            <div key={challenge.id} className="card neon-border p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-neon-blue">{challenge.challengeName}</h3>
                  <p className="text-sm text-gray-400 capitalize">{challenge.type} Group Challenge</p>
                  <p className="text-xs text-gray-500">ID: {challenge.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(challenge.status)}`}>
                  {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
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
                  {new Date(challenge.startTime).toLocaleString()}
                </span>
              </div>
              
              <div className="flex space-x-2 mb-2">
                <button className="px-4 py-2 bg-gray-800 text-yellow-400 border border-yellow-400 rounded font-bold hover:bg-yellow-900 hover:text-white transition duration-300">
                  Block
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                Created: {new Date(challenge.createdAt).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {new Date(challenge.updatedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>


 {/* pair programming */}

      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-lg font-bold neon-text mb-6">Pair Programming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pairProgramming.map((challenge) => (
            <div key={challenge.id} className="card neon-border p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-neon-blue">{challenge.challengeName}</h3>
                  <p className="text-sm text-gray-400 capitalize">{challenge.type} Group Challenge</p>
                  <p className="text-xs text-gray-500">ID: {challenge.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(challenge.status)}`}>
                  {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
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
                  {new Date(challenge.startTime).toLocaleString()}
                </span>
              </div>
              
              <div className="flex space-x-2 mb-2">
                <button className="px-4 py-2 bg-gray-800 text-yellow-400 border border-yellow-400 rounded font-bold hover:bg-yellow-900 hover:text-white transition duration-300">
                  Block
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                Created: {new Date(challenge.createdAt).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {new Date(challenge.updatedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminContestControl;