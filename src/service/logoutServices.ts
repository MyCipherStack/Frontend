



import axios from "../utils/axiosConfig"



export const userLogOutService=async()=>{
    try{
        const url="api/user/logout"
        const response= await axios.post(url,{},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const adminLogOutService=async()=>{
    try{
        const url="api/admin/logout"
        const response= await axios.post(url,{},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}