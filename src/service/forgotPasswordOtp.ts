import axios from "../utils/axiosConfig"



export const forgotPasswordOtp=async(body:object)=>{
    try{
        const url="/api/user/forgotPasswordOtp"
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}