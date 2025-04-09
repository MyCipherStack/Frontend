



import axios from "../utils/axiosConfig"



export const logOutService=async(url:string)=>{
    try{
        const response= await axios.post(url,{},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}