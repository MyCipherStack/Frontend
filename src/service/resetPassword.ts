import axios from "../utils/axiosConfig"



export const resetPasswordService=async(body:object)=>{
    try{
        const url="/api/user/resetPassword"
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}