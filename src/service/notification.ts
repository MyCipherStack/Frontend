

import { API_ROUTES } from "@/constants/routes"
import axios from "../utils/axiosConfig"





export const readNotificationService=async(id:string)=>{
    try{
        const url="api/user/readNotification"
        const response= await axios.patch(API_ROUTES.USER.READ_NOTIFICATION,{id},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

export const allNotificationService=async()=>{
    try{
        const url="api/user/notification"
        const response= await axios.get(API_ROUTES.USER.NOTIFICATION,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

