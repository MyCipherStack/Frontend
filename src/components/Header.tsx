"use client"
import {
  FaTerminal,
  FaCode,
  FaUsers,
  FaTrophy,
  FaChevronDown,
  FaSignOutAlt,
  FaCog,
  FaUser
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { logOut } from "@/features/auth/userAuthSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { userLogOutService } from "@/service/logoutServices";

const ProfileDropdown = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const dispatch=useDispatch()
  let logOutHandler=async()=>{
    dispatch(logOut())
   await userLogOutService()

 
  }
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#0ef]">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaUser className="text-gray-400" />
            </div>
          )}
        </div>
        <span className="text-gray-300 hidden md:inline">{user?.name || 'User'}</span>
        <FaChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-46 bg-neutral-950 neon-border rounded-md shadow-lg border border-gray-950 z-50 overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-gray-900 bg-neutral-950">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-950 flex items-center justify-center">
                  <FaUser className="text-gray-400 text-xl" />
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-400">{user?.email || ''}</p>
            </div>
          </div>
          <div className="py-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-[#0ef] transition"
            >
              <FaUser className="mr-3 text-gray-400" />
              <Link href={"/Profile"}>
              <span>My Profile</span>
              </Link>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-[#0ef] transition"
            >
              <FaCog className="mr-3 text-gray-400" /> 
              <span>Settings</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-[#0ef] transition border-t border-gray-700"
            >
              <FaSignOutAlt className="mr-3 text-gray-400" /> 
              <span onClick={()=>logOutHandler()}>Logout</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const userData = useSelector((state: any) => state.auth.user);
  
  return (
    <nav className="bg-black border-b border-gray-800 fixed w-full z-40">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-[#0ef] flex items-center">
              <Link  href={"/Home"}>
              CipherStack
              </Link>
              <FaTerminal className="ml-1 mt-1" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-gray-300 hover:text-[#0ef] transition duration-300 " >
               <Link href={"/problems"}>
                <FaCode className="inline w-7" /> Problems 
               </Link>
              </button>
              <button className="text-gray-300 hover:text-[#0ef] transition duration-300">
               <Link href={"/Arena"}>
                
                <FaTrophy className="inline mr-2" /> compete
               </Link>

              </button>
              <button className="text-gray-300 hover:text-[#0ef] transition duration-300">
                <FaUsers className="inline mr-2" /> Community
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {userData ? (
              <ProfileDropdown user={userData} />
            ) : (
              <>
              <Link href={"/Login"} >
              <button className="px-4 py-2 rounded border border-[#0ef] text-[#0ef] hover:bg-[#0ef] hover:text-black transition duration-300">
                  Login
                </button></Link>
                <button className="px-4 py-2 rounded bg-[#0ef] text-black hover:bg-[#0df] transition duration-300">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;