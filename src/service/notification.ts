

import axios from "../utils/axiosConfig"





export const readNotificationService=async(id:string)=>{
    try{
        const url="api/user/readNotification"
        const response= await axios.patch(url,{id},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

export const allNotificationService=async()=>{
    try{
        const url="api/user/notification"
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

