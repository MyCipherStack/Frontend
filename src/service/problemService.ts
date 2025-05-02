
import axios from "../utils/axiosConfig"



export const addProblemService=async(data:{})=>{
    const url="/api/admin/addProblem"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}



export const editProblemService=async(data:{})=>{
    const url="/api/admin/editProblem"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}



export const runProblemService=async(data:{})=>{
    const url="/api/user/problem/run"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

export const submitProblemService=async(data:{})=>{
    const url="/api/user/problem/submit"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

