
import axios from "../utils/axiosConfig"



type GroupChallenge = {
    challengeName: string;
    participants:string
    duration:string
    problems:string[],
    type:string

  };


export const createGroupChallengeService=async(data:GroupChallenge)=>{
    const url="/api/user/arena/createGroupChallenge"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const joinGroupChallenge=async(params:string)=>{
    try{
        const url=`/api/user/joinGroupChallenge?${params}`
        const response= await axios.post(url,{},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}