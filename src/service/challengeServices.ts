
import axios from "../utils/axiosConfig"



type GroupChallenge = {
    challengeName: string;
    participants:string
    duration:string
    problems:string[],
    type:string

  };


 export type pairProgramming = {
    challengeName: string;
    problems: string[],
    problemsName: string[],
    type: string,
    invitedFriends:string[],
    problemType:string

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


export const createPairprogramming=async(data:pairProgramming)=>{
    try{
        const url='/api/user/createPairProgramming'
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }catch(error){
        throw error
    }


    
}



export const joinPairProgramming=async(params:string)=>{
    try{
        const url=`/api/user/joinPairProgramming?${params}`
        const response= await axios.post(url,{},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}