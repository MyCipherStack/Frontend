
import axios from "../utils/axiosConfig"




export const actionServiceUpdate=async(url:string,update:{})=>{
    try{
        const response= await axios.patch(url,update,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}