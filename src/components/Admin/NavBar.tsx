
"use client"

import { adminLogOutService } from "@/service/logoutServices";
import { toastError, toastSuccess } from "@/utils/toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTerminal, FaChartLine, FaUsers, FaCode, FaTrophy, FaFlag, FaCog, FaSignOutAlt, FaCrown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";




const AdminNavbar = ({ status }:{status:string}) => {
  const router = useRouter()


  const LogoutHandler = async () => {
    try {
      const response = await adminLogOutService()
      toastSuccess(response.data.message)

      router.push("/admin/login")

    } catch (error) {
      if (axios.isAxiosError(error)) {

        toastError(error?.response?.data.message ?? "An error occurred while logging out");

      }
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
            <Link href="/admin/dashboard" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "dashboard" ? "active" : ""} hover:text-neon-blue transition-all duration-300`}>
              <FaChartLine className="w-6" />
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link href="/admin/users" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "users" ? "active" : ""} hover:text-neon-blue transition-all duration-300`}>
              <FaUsers className="w-6" />
              <span className="ml-3">User Management</span>
            </Link>
            <Link href="/admin/problems" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "problems" ? "active" : ""} hover:text-neon-blue transition-all duration-300`}>
              <FaCode className="w-6" />
              <span className="ml-3">Problem Management</span>
            </Link>
            <Link href="/admin/premium" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "premium" ? "active" : ""} hover:text-neon-blue transition-all duration-300`}>
              <FaCrown className="w-6" />
              <span className="ml-3">Premium</span>
            </Link>
            <Link href="/admin/transactions" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "transactions" ? "active" : ""} hover:text-neon-blue transition-all duration-300`}>
              <FaCrown className="w-6" />
              <span className="ml-3">Transactions</span>
            </Link>
            <Link href="/admin/contests" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "contests" ? "active" : ""} hover:text-neon-blue transition-all duration-300`} >
              <FaTrophy className="w-6" />
              <span className="ml-3">Contests</span>
            </Link>
            <Link href="/admin/reports" className={`sidebar-link flex items-center px-4 py-3 text-text-primary hover:bg-opacity-10 hover:bg-neon-blue  ${status == "reports" ? "active" : ""} hover:text-neon-blue transition-all duration-300`} >
              <FaFlag className="w-6" />
              <span className="ml-3">Reports</span>
            </Link>

          </div>
          <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
            <button className="sidebar-link flex w-full items-center text-red-400 hover:text-red-500" onClick={LogoutHandler}>
              <FaSignOutAlt className="w-6" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </>
    )
  }


  export default AdminNavbar