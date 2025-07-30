
import axios from "../utils/axiosConfig"



export const scheduleInterview=async(data:unknown)=>{
    try{
        const url="api/user/scheduleInterview"
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }catch(error){

    }
}
export const getUserInteviews=async()=>{
    try{
        const url="api/user/getUserInteviews"
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }catch(error){ 
        console.log(error);
        
    }
}

export const joinInteview=async(id:string)=>{
    try{
        const url='api/user/joinInterView'
        const response= await axios.post(url,{id},{withCredentials:true}) 
        return response 
    }catch(error){ 
        console.log(error);
        
    }
}

