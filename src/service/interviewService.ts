
import { API_ROUTES } from "@/constants/routes"
import axios from "../utils/axiosConfig"



export const scheduleInterview=async(data:unknown)=>{
    try{
        const url="api/user/scheduleInterview"
        const response= await axios.post(API_ROUTES.USER.SCHEDULE_INTERVIEW,data,{withCredentials:true}) 
        return response
    }catch(error){

    }
}
export const getUserInteviews=async()=>{
    try{
        const url="api/user/getUserInteviews"
        const response= await axios.get(API_ROUTES.USER.GET_USER_INTERVIEWS,{withCredentials:true}) 
        return response
    }catch(error){ 
        console.log(error);
        
    }
}

export const joinInteview=async(id:string)=>{
    try{
        const url='api/user/joinInterView'
        const response= await axios.post(API_ROUTES.USER.JOIN_INTERVIEW,{id},{withCredentials:true}) 
        return response 
    }catch(error){ 
        console.log(error);
        
    }
}

