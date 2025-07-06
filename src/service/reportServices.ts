import axios from "../utils/axiosConfig"




export const createReport=async(report:{reportType:string,description:string,pageInfo:string,reportedUser:string})=>{
    try{
        const url="api/user/report"
        const response= await axios.post(url,{report},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}




export const getAllReports=async(params:string)=>{
    try{
        const url=`api/admin/report?${params}`
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}




export const updateReports=async(update:{ id:string, status:string })=>{
    try{
        const url=`api/admin/report`
        const response= await axios.patch(url,{update},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}