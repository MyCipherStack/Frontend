
"use client"
import { AdminLogOut } from "@/features/auth/adminAuthSlice";
import { logOut } from "@/features/auth/userAuthSlice";
import { logOutService } from "@/service/logoutService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTerminal, FaChartLine, FaUsers, FaCode, FaTrophy, FaFlag, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";




const AdminNavbar=({status})=>{
  let dispatch=useDispatch()
  let router=useRouter()


  let LogoutHandler=async()=>{
    try{
    const response=await logOutService("api/admin/logout")
         toast.success(response.data.message,{
                position:"top-right",
                autoClose:2000,
                style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"}
              })
              router.push("/admin")
        
    }catch(error){
       toast.error(error.response.data.message,{
                position:"top-right",
                autoClose:2000,
                style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"}})
    }



  }
    return (
        <>
             {/* Sidebar Navigation */}
              <div className="sidebar w-64 bg-darker-bg h-screen fixed border-r border-neon-blue">
                <div className="px-4 py-6 border-b border-gray-800">
                  <h1 className="text-xl font-bold neon-text flex items-center">
                    CipherStack <FaTerminal className="ml-2" />
                  </h1>
                  <div className="text-sm text-gray-400 mt-1">Admin Panel</div>
                </div>
                <div className="mt-6">
                  <Link href="/admin/dashboard" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status=="dashboard"  ? "active":""} hover:text-neon-blue transition-all duration-300`}>
                    <FaChartLine className="w-6" />
                    <span className="ml-3">Dashboard</span>
                  </Link>
                  <Link href="/admin/users" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status=="users"  ? "active":""} hover:text-neon-blue transition-all duration-300`}>
                    <FaUsers className="w-6" />
                    <span className="ml-3">User Management</span>
                  </Link>
                  <Link href="/admin/problems" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status=="problems"  ? "active":""} hover:text-neon-blue transition-all duration-300`}>
                    <FaCode className="w-6" />
                    <span className="ml-3">Problem Management</span>
                  </Link>
                  <Link href="/admin/contests" className="sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue hover:text-neon-blue transition-all duration-300">
                    <FaTrophy className="w-6" />
                    <span className="ml-3">Contests</span>
                  </Link>
                  <Link href="/admin/reports" className="sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue hover:text-neon-blue transition-all duration-300">
                    <FaFlag className="w-6" />
                    <span className="ml-3">Reports</span>
                  </Link>
                  <Link href="/admin/settings" className="sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue hover:text-neon-blue transition-all duration-300">
                    <FaCog className="w-6" />
                    <span className="ml-3">Settings</span>
                  </Link>
                </div>
                <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
                  <button  className="sidebar-link flex w-full items-center text-red-400 hover:text-red-500" onClick={LogoutHandler}>
                    <FaSignOutAlt className="w-6" />
                    <span className="ml-3">Logout</span>
                  </button>
                </div>
              </div>
        </>
    )
}


export default AdminNavbar