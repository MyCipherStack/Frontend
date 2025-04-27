import axios from "../utils/axiosConfig"



export const forgotPasswordVerify=async(body:object)=>{
    try{
        const url="/api/user/forgotPasswordVerify"
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}