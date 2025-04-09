
import axios from "../utils/axiosConfig"



export const resetPassword=async(url:string,body:Object)=>{
    try{
        const response= await axios.post(url,body) 
        return response
    }
    catch(error){
        throw error
    }
}