import { getUserAciveChallenges } from "@/service/challengeServices";
import { toastSuccess } from "@/utils/toast";
import { useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { challenge } from "@/types/challenge";







export const ActiveChallenges = ()=>{

  
  const [privateChallenges,setPrivateChallenges]=useState<challenge[]>([])
  const [publicChallenges,setPublicChallenges]=useState<challenge[]>([])



const copyHandle=(code:string)=>{
  navigator.clipboard.writeText(code)
  toastSuccess("Copied to clipboard!")
}

  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")
  const [page, setPage] = useState("1")
  const [limit, setLimit] = useState("4")
  const [totalPrivateCount, setTotalPrivateCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

   const pageChange = (page: number) => {
    setPage(page + "")
  }

  const params=new URLSearchParams({page,search,limit})



    useEffect(()=>{
    const run=async()=>{
      const challenges=await getUserAciveChallenges(params.toString())
      console.log("challenges",challenges);
      
      setPrivateChallenges(challenges.data.privateChallenges)
      setPublicChallenges(challenges.data.publicChallenges.datas)
      setTotalPrivateCount(challenges.data.publicChallenges.totalCount)
      setTotalPages(challenges.data.publicChallenges.totalPages)
      
      console.log(challenges.data.publicChallenges,"challenges");
    }

    const timer=setTimeout(()=>{
      run() 

    },500)
    return ()=>clearTimeout(timer)
  },[search,page])

const router=useRouter()
  const joinChallenge=(code:string)=>{
    router.push(`challenge/${code}`)
  }

    return (

    <div className="mt-12">
      <h2 className="text-2xl font-bold neon-text mb-6">Active Challenges</h2>
      <h3 className="text-m font-bold neon-text mb-6">private Challenges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Public Challenge Card */}
      {privateChallenges.map((challenge,index)=>
       ( <div key={index} className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-neon-blue">{challenge.challengeName}</h3>
              <p className="text-sm text-gray-400">Public Group Challenge</p>
            </div>
            <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">{challenge.status}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mb-4">


             <span><i className="fas fa-users mr-2"></i>created:{new Date(challenge.createdAt).toLocaleTimeString()}</span>

            {/* <span><i className="fas fa-clock mr-2"></i>1:30:00 remaining</span> */}
          </div>
             <div className="flex space-x-2">
            <input type="text" value={challenge.joinCode} className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-sm" readOnly />
            <button onClick={()=>copyHandle(challenge.joinCode)} className="px-4 py-2 bg-transparent border border-neon-blue text-neon-blue rounded  transition duration-300">
              Copy
            </button>
          </div>
          <button onClick={()=>joinChallenge(challenge.joinCode)} className=" mt-2 w-full bg-neon-blue text-black  py-2 rounded font-bold bg-color transition duration-300">
            Join Challenge
          </button>
        </div>)
        )}
        </div>




        <div className=" flex justify-between mt-7 p-3">
      <h4 className="text-m font-bold neon-text mb-6">public Challenges</h4> 
          
              <div className=" w-2x relative">
                        <input
                          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search Challenge..."
                          className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pb-1 pointer-events-none">
                          <FaSearch className="text-gray-100" />
                        </div>
                      </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {publicChallenges.map((challenge,index)=>(
        <div key={index} className="card neon-border p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-neon-blue">{challenge.challengeName}</h3>
              <p className="text-sm text-gray-400">Private Group Challenge</p>
            </div>
            <span className="px-3 py-1 bg-yellow-900 text-yellow-400 rounded-full text-sm">{challenge.status}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span><i className="fas fa-users mr-2"></i>created:{new Date(challenge.createdAt).toLocaleTimeString()}</span>
          </div>
         <button onClick={()=>joinChallenge(challenge.joinCode)} className=" w-full bg-neon-blue text-black  py-2 rounded font-bold bg-color transition duration-300">
            Join Challenge
          </button>
        </div>
    )) }
      </div>
              <Pagination currentPage={+page} limit={+limit} onPageChange={pageChange} totalData={totalPrivateCount} totalPages={totalPages}></Pagination>
    
    </div>
  );}
  
  
  


  // export const AdminChallengeControl = () => {




    


  //   const formatTime = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toLocaleString();
  //   };
  
  //   const calculateRemainingTime = (endTime) => {
  //     const end = new Date(endTime);
  //     const now = new Date();
  //     const diffMs = end - now;
      
  //     if (diffMs <= 0) return "Expired";
      
  //     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  //     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
  //     return `${diffHours}h ${diffMinutes}m remaining`;
  //   };
  
  //   const getStatusBadge = (status) => {
  //     switch(status.toLowerCase()) {
  //       case 'live':
  //         return <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">Live</span>;
  //       case 'waiting':
  //         return <span className="px-3 py-1 bg-yellow-900 text-yellow-400 rounded-full text-sm">Waiting</span>;
  //       case 'completed':
  //         return <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Completed</span>;
  //       default:
  //         return <span className="px-3 py-1 bg-blue-900 text-blue-400 rounded-full text-sm">{status}</span>;
  //     }
  //   };
  
  //   return (
  //     <div className="mt-8">
  //       <h2 className="text-2xl font-bold neon-text mb-6">Admin Challenge Control</h2>
  //       <div className="grid grid-cols-1 gap-6">
  //         {challenges.map((challenge) => (
  //           <div key={challenge._id} className="card neon-border p-6">
  //             <div className="flex justify-between items-start mb-4">
  //               <div>
  //                 <h3 className="text-xl font-bold text-neon-blue">{challenge.challengeName}</h3>
  //                 <p className="text-sm text-gray-400">
  //                   {challenge.type === 'public' ? 'Public Challenge' : 'Private Challenge'} • ID: {challenge._id}
  //                 </p>
  //               </div>
  //               {getStatusBadge(challenge.status)}
  //             </div>
  
  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
  //               <div className="bg-gray-900 p-3 rounded">
  //                 <p className="text-sm text-gray-400">Host ID</p>
  //                 <p className="font-mono text-sm">{challenge.hostId}</p>
  //               </div>
  //               <div className="bg-gray-900 p-3 rounded">
  //                 <p className="text-sm text-gray-400">Participants</p>
  //                 <p className="text-neon-blue">0/{challenge.maxParticipants}</p>
  //               </div>
  //               <div className="bg-gray-900 p-3 rounded">
  //                 <p className="text-sm text-gray-400">Duration</p>
  //                 <p>{challenge.duration} minutes</p>
  //               </div>
  //             </div>
  
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  //               <div className="bg-gray-900 p-3 rounded">
  //                 <p className="text-sm text-gray-400">Start Time</p>
  //                 <p>{formatTime(challenge.startTime)}</p>
  //               </div>
  //               <div className="bg-gray-900 p-3 rounded">
  //                 <p className="text-sm text-gray-400">End Time</p>
  //                 <p>{formatTime(challenge.endTime)}</p>
  //               </div>
  //             </div>
  
  //             <div className="flex flex-col md:flex-row justify-between gap-4">
  //               {challenge.type === 'private' && (
  //                 <div className="flex-1">
  //                   <p className="text-sm text-gray-400 mb-2">Join Code</p>
  //                   <div className="flex">
  //                     <input 
  //                       type="text" 
  //                       value={challenge.joinCode} 
  //                       className="flex-1 bg-black border border-gray-700 rounded-l px-3 py-2 text-sm" 
  //                       readOnly 
  //                     />
  //                     <button 
  //                       className="px-4 py-2 bg-neon-blue text-black rounded-r font-bold hover:bg-[#0df] transition duration-300"
  //                       onClick={() => navigator.clipboard.writeText(challenge.joinCode)}
  //                     >
  //                       Copy
  //                     </button>
  //                   </div>
  //                 </div>
  //               )}
  
  //               <div className="flex-1">
  //                 <p className="text-sm text-gray-400 mb-2">Problems ({challenge.problems.length})</p>
  //                 <div className="bg-black border border-gray-700 rounded px-3 py-2 h-10 overflow-y-auto">
  //                   {challenge.problems.length > 0 ? (
  //                     <p className="font-mono text-sm">{challenge.problems.join(', ')}</p>
  //                   ) : (
  //                     <p className="text-gray-500 text-sm">No problems added</p>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  
  //             <div className="mt-6 flex flex-wrap gap-3">
  //               <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold hover:bg-[#0df] transition duration-300">
  //                 Edit Challenge
  //               </button>
  //               <button className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition duration-300">
  //                 Cancel Challenge
  //               </button>
  //               <button className="px-4 py-2 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 transition duration-300">
  //                 View Participants
  //               </button>
  //               {challenge.status === 'waiting' && (
  //                 <button className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition duration-300">
  //                   Start Now
  //                 </button>
  //               )}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };