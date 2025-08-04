
import { API_ROUTES } from "@/constants/routes";
import axios from "../utils/axiosConfig"



export const getUserProfile=async()=>{
    try{
        console.log("get profile");
        
        const url='/api/user/profile'
        const response= await axios.get(API_ROUTES.USER.PROFILE,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const getAllProblems=async(params:string)=>{
    try{

        // const url=`/api/user/problems?${params}`
        const url=`${API_ROUTES.USER.PROBLEMS}?${params}`
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const getProblemDetails=async(params:string)=>{
    try{

        const url=`/api/user/problemDetails?${params}`
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const getAllUsers=async(params:string)=>{
    try{

        const url=`/api/admin/users?${params}`
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const getAllUsersforUser=async(params:string)=>{
    try{

        const url=`/api/user/users?${params}`
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }

}



export const getAllTransactions=async(params:string)=>{
    try{

        const url=`/api/admin/transations?${params}`
        const response=await axios.get(API_ROUTES.ADMIN.TRANSACTIONS(params),{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}



export const getAdminDashBoardData=async(params:string)=>{
    try{

        const url=`/api/admin/dashboard?${params}`
        const response= await axios.get(API_ROUTES.ADMIN.DASHBOARD(params),{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }

}

