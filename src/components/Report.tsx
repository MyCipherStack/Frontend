import { useEffect, useState } from 'react';
import { FaFlag, FaPlus, FaSearch } from 'react-icons/fa';
import { getAllUsersforUser } from '@/service/getDataService';
import { usePathname } from 'next/navigation';
import { createReport } from '@/service/reportServices';
import { useSelector } from 'react-redux';
import { toastSuccess } from '@/utils/toast';

const ReportButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState('issue');

  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([{ _id: "", image: "", name: "", email: "", role: "", status: "", createdAt: "" }])
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const pathParams=usePathname()
  
  const user=useSelector((state)=>state.auth.user)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
   
   
  const response=  await createReport({reportType,description,pageInfo:pathParams,reportedUser:invitedUsers[0]})
    toastSuccess(response.data)
    alert(pathParams);
    setIsModalOpen(false);
    // setReportType('issue');
  };





  const toggleFriendInvite = (name: string) => {

    if (invitedUsers.includes(name)) {
      setInvitedUsers(invitedUsers.filter(friendname => friendname !== name));
    } else {
      setInvitedUsers([name]);
    }

  };




  useEffect(() => {

    let timeOut = setTimeout(() => {


      const params = new URLSearchParams({ search: searchQuery })
      const fetchData = async () => {
        const response = await getAllUsersforUser(params.toString());
        console.log(response.data.usersData.users, "users DAat in userinviate");
        setUsers(response.data.usersData.users)

      };
if(isModalOpen){
  fetchData();
}
    }, 500)

    return () => clearTimeout(timeOut)

  }, [searchQuery,isModalOpen])





  return (
    <>
      <button
        id="openReportModal"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-black neon-border text-neon- px-3 py-2 rounded-full shadow-lg flex items-center space-x-2  hover:text-red-400 transition-all">
        <FaFlag />
        <span className='text-xs'>Report</span>
      </button>



      {/* Report Modal */}
      <div
        id="reportModal"
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 ${isModalOpen ? 'block' : 'hidden'
          }`}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="bg-black neon-border rounded-lg p-8 w-full  overflow-auto max-w-md max-h-[90vh] small-scrollbar "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            id="closeReportModal"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-3 right-3 text-neon- text-2xl hover:text-white transition-all"
          >
            &times;
          </button>
          <h3 className="text-xl font-bold neon-text mb-4">Report to Admin</h3>
          <form id="reportForm" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="reportType" className="block text-neon- mb-1">
                Report Type
              </label>
              <select
                id="reportType"
                name="reportType"
                className="w-full p-2 bg-black neon-border text-neon- rounded"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="issue">Report Issue</option>
                <option value="user">Report User</option>
              </select>
            </div>
            <div
              id="userField"
              className={reportType === 'user' ? 'block' : 'hidden'}
            >


              <div className="mb-6">
                <h4 className="text-[#0ef] font-bold mb-4">Invite  user</h4>
                <h3 >selected user <span className='text-xl neon-text '>{...invitedUsers}</span></h3>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search user..."
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
                    .map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-black rounded"
                      >
                        <div className="flex items-center gap-3 ">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden">
                              {user.image ? (
                                <img src={user.image} alt="user" className="w-full h-full object-cover" />) : null}
                            </div>

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
            </div>
            <div>
              <label htmlFor="description" className="block text-neon- mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4} value={description}
                className="w-full p-2 bg-black neon-border text-neon- rounded"
                placeholder="Describe the issue or user behavior..."  onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-neon- text-white font-bold rounded  hover:text-yellow-200 neon-border transition-all"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportButton;