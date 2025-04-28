'use client';
import Header from '@/components/Header';
import VerificationInput from '@/components/PasswordComponent.tsx/EnteOtp';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaTerminal, FaEye, FaEyeSlash, FaCheck, FaCode } from 'react-icons/fa';
import "../globals.css"
import EnterOtp from '@/components/PasswordComponent.tsx/EnteOtp';
import CreateNewPassword from '@/components/PasswordComponent.tsx/CreateNewPasswor';
import { resendOtpService } from '@/service/resendOtp';
import { toast } from 'react-toastify';
import { verifyOtpService } from '@/service/verifyOtpService';
import { toastError, toastSuccess } from '@/utils/toast';
import { forgotPasswordOtp } from '@/service/passwordServices';
import { forgotPasswordVerify } from '@/service/forgotPasswordVerify';
export default function PasswordResetPage() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [email,setIsEmail]=useState("")


  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));


  let sentOtpHandler=async()=>{
    try{        
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          let  validEmail=emailRegex.test(email)
          if(!validEmail){
            toastError("enter valid email")
              return
          }
        
            const response=await forgotPasswordOtp({email:email})

              toastSuccess(response.data.message)
              setCurrentStep(2)
          }catch(error:any){
            console.log(error);

            toastError(error.response.data.message)
          }

  }

  

    let VerifyOtp=useCallback( async()=>{
      try{
        // const url1="/api/user/forgotPasswordVerify"

        const response= await forgotPasswordVerify({otp,email:email})
          setCurrentStep(3)

          toastSuccess(response.data.message)
     
        }
        catch(error:any){
          toastError((error.response.data.message))
      
      }
          
    },[otp,email])


  return (
    <>
      <Header></Header>
      <div className="min-h-screen flex flex-col">

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-4 py-12 mt-9">

          <div className="bg-[#111111] rounded-lg border  neon-border  w-96 max-w-md overflow-hidden relative">

            {/* Terminal Header */}
            <div className="bg-black px-6 py-3 border-b neon-text relative">
              <div className="neon-text font-bold ml-20">Password Recovery Protocol</div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 neon-text tracking-wider">● ● ●</div>
            </div>



            <div className="p-6">
              {/* Step Indicators */}
              <div className="flex justify-center space-x-3 mb-8">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full ${currentStep >= step ? 'bg-[#00eeff] shadow-[0_0_8px_#00eeff]' : 'bg-[#374151]'}`}
                  />
                ))}
              </div>






              {/* Step 1: Email/Phone */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-center neon-text mb-6">Reset Your Password</h2>
                  <p className="text-gray-400 text-center mb-6">
                    Enter your email address or phone number to receive a verification code.
                  </p>





                  <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Email Address</label>
                    <input required
                      type="email" onChange={(e)=>setIsEmail(e.target.value)}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded focus:border-[#00eeff] focus:outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>


                  <button
                    onClick={() =>sentOtpHandler()
                    }
                    className="w-full bg-[#00eeff] text-black font-bold py-3 px-4 rounded hover:bg-opacity-80 transition duration-300">
                    Send Verification Code
                  </button>

                  <div className="text-center mt-6">
                    <button className="neon-text hover:underline">Back to Login</button>
                  </div>
                </div>
              )}



              {currentStep === 2 && (<EnterOtp VerifyOtp={VerifyOtp} setOTP={setOtp} email={email} />)}

              {currentStep === 3 && (<CreateNewPassword setCurrentStep={setCurrentStep}/>)}


            </div>
          </div>
        </main>
      </div>
    </>
  );
}