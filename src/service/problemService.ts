
import axios from "../utils/axiosConfig"



export const problemService=async(url:string,data:{})=>{
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}