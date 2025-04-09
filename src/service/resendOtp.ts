import axios from "../utils/axiosConfig"





export const resendOtpService=async(url:string,body:Object)=>{
    try{
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        console.log(error);
        
        throw error
    }
}