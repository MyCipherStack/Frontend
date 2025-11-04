

// components/Footer.js
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaPaperPlane, FaTerminal } from 'react-icons/fa';

 const Footer=()=> {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo and description */}
          <div>
            <div className="text-xl font-bold text-[#0ef] flex items-center mb-4">
              CipherStack
              <FaTerminal className="ml-1 mt-1" />
            </div>
            <p className="text-gray-400 text-sm">
              The premier platform for mastering algorithms and coding challenges.
            </p>
          </div>

          {/* Column 2 - Resources */}
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Problems', 'Contests', 'Articles', 'Discussions'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#0ef] text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#0ef] text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="text-gray-400 hover:text-[#0ef]">
                <FaGithub className="text-xl" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#0ef]">
                <FaTwitter className="text-xl" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#0ef]">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#0ef]">
                <FaDiscord className="text-xl" />
              </Link>
            </div>
            
            <div className="text-gray-400 text-sm mb-2">
              Subscribe to our newsletter
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-900 text-white rounded-l border border-gray-700 focus:outline-none focus:border-[#0ef] text-sm flex-1"
              />
              <button className="px-4 py-2 bg-[#0ef] text-black rounded-r hover:bg-[#0df] transition duration-300">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 CipherStack. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-gray-400 hover:text-[#0ef] text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}



export  default Footer