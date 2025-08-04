
import { challenge } from "@/types/challenge";
import axios from "../utils/axiosConfig"
import { string } from "zod";
import { API_ROUTES } from "@/constants/routes";




 export type pairProgramming = {
    challengeName: string;
    problems: {name:string,id:string}[],
    type: string,
    invitedUsers:string[],
    sessionType:string

  };

export const createGroupChallengeService=async(data:challenge)=>{
    const url="/api/user/arena/createGroupChallenge"
    try{
        const response= await axios.post(API_ROUTES.USER.ARENA.CREATE_GROUP_CHALLENGE,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const joinGroupChallenge=async(params:string)=>{
    try{
        const url=`/api/user/joinGroupChallenge?${params}`
        const response= await axios.post(API_ROUTES.USER.JOIN_GROUP_CHALLENGE,{},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}


export const createPairprogramming=async(data:pairProgramming)=>{
    try{
        const url='/api/user/createPairProgramming'
        const response= await axios.post(API_ROUTES.USER.CREATE_PAIR_PROGRAMMING,data,{withCredentials:true}) 
        return response
    }catch(error){
        throw error
    }


    
}



export const joinPairProgramming=async(params:string)=>{
    try{
        const url=`/api/user/joinPairProgramming?${params}`
        const response= await axios.post(API_ROUTES.USER.JOIN_PAIR_PROGRAMMING,{},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}



export const getAllGroupChallenges=async(params:string)=>{
    try{
        const url=`/api/admin/getAllGroupChallenges?${params}`
        const response= await axios.get(API_ROUTES.ADMIN.GET_ALL_GROUP_CHALLENGES,{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}


export const getAllPairProgramming=async(params:string)=>{
    try{
        const url=`/api/admin/getAllPairProgramming?${params}`
        const response= await axios.get(API_ROUTES.ADMIN.GET_ALL_PAIR_PROGRAMMING(params),{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}



export const challengeChangeStatus=async(isBlocked:string,id:string)=>{
    try{
        const url="/api/admin/challengeChangeStatus"
        const response= await axios.patch(API_ROUTES.ADMIN.CHALLENGE_CHANGE_STATUS,{isBlocked,id},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}



export const changeStatusPairProgarm=async(isBlocked:string,id:string)=>{
    try{
 
        const response= await axios.patch(API_ROUTES.ADMIN.CHANGE_STATUS_PAIR_PROGRAM,{isBlocked,id},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}


export const getUserAciveChallenges=async(params:string)=>{
    try{
        const url=`/api/user/activeChallenges?${params}`
        const response= await axios.get(API_ROUTES.USER.ACTIVE_CHALLENGES,{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}



export const startChallenge=async(id:string)=>{
    try{
        const url='/api/user/startChallenge'
        const response= await axios.patch(API_ROUTES.USER.START_CHALLENGE,{id},{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}

export const challengeResults=async()=>{
    try{
        const url='/api/user/challengeResults'
        const response= await axios.get(API_ROUTES.USER.CHALLENGE_RESULTS,{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}

export const challengeLeaderBoard=async(challengeId:string)=>{
    try{
        const url=`/api/user/challenge/${challengeId}/leaderBoard`
        
        const response= await axios.get(API_ROUTES.USER.CHALLENGE_LEADERBOARD(challengeId),{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}
export const pairProgrammingRequest=async()=>{
    try{
        const url=`/api/user/pairProgrammingRequest`
        
        const response= await axios.get(API_ROUTES.USER.PAIR_PROGRAMMING_REQUEST,{withCredentials:true}) 
        return response

    }catch(error){
        throw error
    }
}