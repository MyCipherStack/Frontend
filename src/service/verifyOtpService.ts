import axios from "../utils/axiosConfig"



export const verifyOtpService=async(url:string,body:object)=>{
    try{
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}