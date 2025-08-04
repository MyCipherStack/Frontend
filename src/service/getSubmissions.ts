
import { API_ROUTES } from "@/constants/routes";
import axios from "../utils/axiosConfig"


export const getSubmissions=async(problemId:string)=>{
    try{
        console.log("get getSubmissions");
        
        const url=`/api/user/submissions?problemId=${problemId}`
        const response= await axios.get(API_ROUTES.USER.SUBMISSIONS(problemId),{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

export const recentSubmissions=async()=>{
    try{
        console.log("get recentSubmissions");
        
        const url=`/api/user/recentSubmission`
        const response= await axios.get(API_ROUTES.USER.RECENT_SUBMISSION,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

