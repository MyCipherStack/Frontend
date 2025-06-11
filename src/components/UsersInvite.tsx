



import { getAllUsersforUser } from "@/service/getDataService";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";





const InvitedUsers = ({allowedUser,invitedUsers,setInvitedUsers,sessionType,setSessionType}:{allowedUser:number,invitedUsers:string[],setInvitedUsers:Dispatch<SetStateAction<string[]>>}) => {

const [searchQuery, setSearchQuery] = useState('');
const [users,setUsers]=useState([{_id:"",image:"",name:"",email:"",role:"",status:"",createdAt:""}])


const toggleFriendInvite = (name: string) => {
  
  if (invitedUsers.includes(name)) {
    setInvitedUsers(invitedUsers.filter(friendname => friendname !== name));
  } else {

      if(allowedUser>invitedUsers.length){
        
          setInvitedUsers([...invitedUsers,name]);
        
      }
  }
 
};


  useEffect(()=>{
    const params=new URLSearchParams({search:searchQuery})
    const fetchData = async () => {
    const response = await getAllUsersforUser(params.toString());
    //  setTotalPages(response.data.usersData.totalPages,)
    //  setTotalUsers(response.data.usersData.totalUsers)
    console.log(response.data.usersData.users,"users DAat in userinviate");
    
     setUsers(response.data.usersData.users)
     console.log(response.data.usersData.users);
     
    };
  
  fetchData();
  },[searchQuery])
  return (
    <>
      <div>
        <label className="block text-gray-400 mb-2">Participant join</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sessionType"
              checked={sessionType === 'invite'}
              onChange={() => setSessionType('invite')}
              className="mr-2 text-[#0ef]"
            />
            <span>Invite</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sessionType"
              checked={sessionType === 'sharecode'}
              onChange={() => setSessionType('sharecode')}
              className="mr-2 text-[#0ef]"
            />
            <span>Share Code</span>
          </label>
        </div>
      </div>

      {sessionType==="invite" && (

      <div className="mb-6">
        <h4 className="text-[#0ef] font-bold mb-4">Invite  user</h4>
        <h2>selected user {...invitedUsers}</h2>
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full bg-black border border-gray-700 rounded px-3 py-2 pl-10 focus:border-[#0ef] focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch
             className="text-gray-500" />
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {users
            .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((user,index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-black rounded"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden">
                    {user.image ? (
                  <img src={user.image} alt="user" className="w-full h-full object-cover" />) : null}
                    </div>
                    {/* {friend.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                    )} */}
                  </div>
                  <span className="text-gray-300">{user.name}</span>
                </div>
                <div
                  onClick={() => toggleFriendInvite(user.name)}
                  className={`${invitedUsers.includes(user.name) ? 'text-[#0df]' : 'text-white-500'} hover:text-[#0df]`}
                >
                  <FaPlus />

                </div>
              </div>
            ))}
        </div>
      </div>
    )}
      
    </>
  )
}


export default InvitedUsers