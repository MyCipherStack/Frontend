
import axios from "../utils/axiosConfig"



type GroupChallenge = {
    challengeName: string;
    participants:string
    duration:string
    name:string,
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
