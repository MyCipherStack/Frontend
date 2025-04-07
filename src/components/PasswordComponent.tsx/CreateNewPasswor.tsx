"use client"

import { useState } from "react";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";

const CreateNewPassword=({setCurrentStep})=>{

      const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false
      });


      const togglePassword = (field: 'new' | 'confirm') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
      };
    

    return (

        <div>
          <h2 className="text-xl font-bold text-center neon-text mb-6">Create New Password</h2>
          <p className="text-gray-400 text-center mb-6">Your identity has been verified. Set a new password for your account.</p>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded focus:border-[#00eeff] focus:outline-none"
                placeholder="Enter new password"
                />
              <button
                type="button"
                onClick={() => togglePassword('new')}
                className="absolute right-3 top-3 text-gray-400"
                >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded focus:border-[#00eeff] focus:outline-none"
                placeholder="Confirm new password"
                />
              <button
                type="button"
                onClick={() => togglePassword('confirm')}
                className="absolute right-3 top-3 text-gray-400"
                >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6 text-xs text-gray-400">
            <ul className="space-y-1">
              {['At least 8 characters long', 'Contains uppercase and lowercase letters', 
                'Contains at least one number', 'Contains at least one special character'].map((text) => (
                    <li key={text} className="flex items-center">
                  <FaCheck className="text-green-400 mr-2" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-[#00eeff] text-black font-bold py-3 px-4 rounded hover:bg-opacity-80 transition duration-300">
            Reset Password
          </button>
        </div>
            )
        }


        export default CreateNewPassword