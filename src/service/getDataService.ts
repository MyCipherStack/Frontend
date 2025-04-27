
import axios from "../utils/axiosConfig"



export const getUserProfile=async(email:string)=>{
    try{
        const url=`/api/user/profile?email=${email}`
        const response= await axios.get(url) 
        return response
    }
    catch(error){
        throw error
    }
}


export const getAllProblems=async(params:string)=>{
    try{

        const url=`/api/user/problems?${params}`
        const response= await axios.get(url) 
        return response
    }
    catch(error){
        throw error
    }
}


export const getAllUsers=async(params:string)=>{
    try{

        const url=`/api/admin/users?${params}`
        const response= await axios.get(url) 
        return response
    }
    catch(error){
        throw error
    }
}


