{
  /* Navigation */
}

import {
  FaTerminal,
  FaCode,
  FaUsers,
  FaTrophy
} from "react-icons/fa";

const Header = () => {
  return (
    <nav className="bg-black border-b border-gray-800 fixed w-full z-40">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-[#0ef] flex items-center">
              CipherStack
              <FaTerminal className="ml-1 mt-1" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-gray-300 hover:text-[#0ef] transition duration-300">
                <FaCode className="inline w-7" />  Problems 
              </button>
              <button className="text-gray-300 hover:text-[#0ef] transition duration-300">
                <FaTrophy className="inline mr-2" /> Compete
              </button>
              <button className="text-gray-300 hover:text-[#0ef] transition duration-300">
                <FaUsers className=" inline mr-2" /> Community
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded border border-[#0ef] text-[#0ef] hover:bg-[#0ef] hover:text-black transition duration-300">
              Login
            </button>
            <button className="px-4 py-2 rounded bg-[#0ef] text-black hover:bg-[#0df] transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
