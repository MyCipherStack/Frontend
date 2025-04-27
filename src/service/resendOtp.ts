import axios from "../utils/axiosConfig"





export const resendOtpService=async(body:Object)=>{
    try{
        const url="/api/user/resendOtp"
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        console.log(error);
        
        throw error
    }
}