

import axios from "../utils/axiosConfig"



export const authMiddlware=async(url:string)=>{
    try{
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}