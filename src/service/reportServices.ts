import { API_ROUTES } from "@/constants/routes"
import axios from "../utils/axiosConfig"




export const createReport=async(report:{reportType:string,description:string,pageInfo:string,reportedUser:string})=>{
    try{
        const url="api/user/report"
        const response= await axios.post(API_ROUTES.USER.REPORT,{report},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}




export const getAllReports=async(params:string)=>{
    try{
        const url=`api/admin/report?${params}`
        const response= await axios.get(API_ROUTES.ADMIN.ALL_REPORT(params),{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}




export const updateReports=async(update:{ id:string, status:string })=>{
    try{
        const url=`api/admin/report`
        const response= await axios.patch(API_ROUTES.ADMIN.REPORT,{update},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}