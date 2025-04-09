

import axios from "../utils/axiosConfig"



export const googleauthService=async(url:string)=>{
    try{
        const response= await axios.get(url) 
        return response
    }
    catch(error){
        throw error
    }
}