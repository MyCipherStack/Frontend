import { API_ROUTES } from "@/constants/routes"
import axios from "../utils/axiosConfig"





export const resendOtpService=async(body:object)=>{
    try{
        const url="/api/user/resendOtp"
        const response= await axios.post(API_ROUTES.USER.RESEND_OTP,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        console.log(error);
        
        throw error
    }
}