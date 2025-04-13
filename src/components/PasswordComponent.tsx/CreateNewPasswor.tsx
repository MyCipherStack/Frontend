"use client"





import { resetPassword } from "@/service/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "@/validations/authSchemas";




const CreateNewPassword=({setCurrentStep})=>{

      const [showPassword, setShowPassword] = useState({new: false,confirm: false});
      const [password,setPassword]=useState("")
      const [conformPassword,setConfromPassword]=useState("")
      const router=useRouter()
    const{ register,handleSubmit,formState:{errors,isSubmitting},watch,setValue,reset}=useForm({resolver:zodResolver( resetPasswordSchema )})
    const formData=watch()

      const togglePassword = (field: 'new' | 'confirm') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
      };
    
      let resetHandler=async()=>{
        try{

          console.log(formData);
   
          
          
          const response= await  resetPassword("/api/user/resetPassword",{password:formData.password})
          console.log(response);
          router.push("Login")
         
          toast.success(response.data.message,{
            position:"top-right",
            autoClose:2000,
            style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"}
          })
      
        }catch(error:any){
          console.log(error);
          
          toast.error(error.response.data.message,{
            position:"top-right",
            autoClose:2000,
            style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"},    
        })

        setCurrentStep(1)
        }
      }

  

    return (

        <div>
          <h2 className="text-xl font-bold text-center neon-text mb-6">Create New Password</h2>
          <p className="text-gray-400 text-center mb-6">Your identity has been verified. Set a new password for your account.</p>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">New Password</label>
            <div className="relative">
              <input {...register("password")}
                type={showPassword.new ? 'text' : 'password'} 
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded focus:border-[#00eeff] focus:outline-none"
                placeholder="Enter new password"
                />
                 {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
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
              <input   {...register("confirmPassword")}  
                type={showPassword.confirm ? 'text' : 'password'}  
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded focus:border-[#00eeff] focus:outline-none"
                placeholder="Confirm new password"
                />
                     {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
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

          <button onClick={handleSubmit(resetHandler)} className="w-full bg-[#00eeff] text-black font-bold py-3 px-4 rounded hover:bg-opacity-80 transition duration-300">
            Reset Password
          </button>
        </div>
            )
        }


        export default CreateNewPassword