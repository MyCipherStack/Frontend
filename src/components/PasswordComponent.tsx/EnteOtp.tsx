"use client"
import {  resendOtpService } from "@/service/resendOtp";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const EnterOtp=({VerifyOtp,setOTP,email})=>{

  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  //   const [currentStep, setCurrentStep] = useState(2);
  const [isEmail, setIsEmail] = useState(true);
  const [timer, setTimer] = useState(300); // 5 minutes 
  const [resentTimer, setsentTimer] = useState(30); // 
  const route=useRouter()
let currentStep=2  //// remove this


  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);
  



   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (currentStep === 2 && timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
      return () => clearInterval(interval);  //clean up when rerender
    }, [currentStep, timer]);

   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (resentTimer > 0) {
        interval = setInterval(() => {
          setsentTimer((prev) => prev - 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [resentTimer]);
  

  // Handle code input changes
  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.replace(/\D/g, '');
    setCode(newCode);
    setOTP(newCode)
    
    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }
  };


  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      codeInputs.current[index - 1]?.focus();
    }
  };

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

    let resendHandler=async()=>{
      try{

        const response=await resendOtpService("/api/user/resendOtp",{email,otp:code})
        console.log(response);
        setsentTimer(30)
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
      }


    }
    return (
        <>
                      <div>
                        <h2 className="text-xl font-bold text-center neon-text mb-6">Enter Verification Code</h2>
                        <p className="text-gray-400 text-center mb-6">
                          We've sent a verification code to{' '}
                          <span className="text-[#00eeff]">your email</span>.
                          Enter the code below.
                        </p>
        
                        <div className="flex justify-center space-x-2 mb-6">
                          {code.map((digit, index) => (
                            <input
                            key={index}
                            ref={(el) => (codeInputs.current[index] = el)}
                            type="text"
                            maxLength={1}
                              value={digit}
                              onChange={(e) => handleCodeChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-10 h-12 text-center text-xl rounded-md bg-black border border-gray-800 text-white focus:border-[#00eeff] focus:outline-none"
                              autoFocus={index === 0}
                            />
                          ))}
                        </div>
        
                        <div className="text-center text-gray-400 text-sm mb-6">
                          Didn't receive a code?{' '}
                          <button disabled={resentTimer!=0} className={`text-[#00eeff] hover:underline ${resentTimer!=0 ? 'opacity-50 cursor-not-allowed':''}`}  onClick={resendHandler}>Resend Code</button>
                          <div className="mt-2">Code expires in <span className="text-[#00eeff]">{formatTime(timer)}</span></div>
                        </div>
        
                        <button
                          onClick={() => {
                             setOTP(code)
                             VerifyOtp()
                          }}
                          className="w-full bg-[#00eeff] text-black font-bold py-3 px-4 rounded hover:bg-opacity-80 transition duration-300"
                          >
                          Verify Code
                        </button>
        
                        <div className="text-center mt-6">
                          <button  onClick={()=>{route.back()}}
                          className="text-[#00eeff] hover:underline">Back</button>
                        </div>
                      </div>
        
        </>
    )
}


export default EnterOtp