import { Plan } from "@/app/admin/premium/page"
import axios from "../utils/axiosConfig"




export const creatPremiumService=async(data:Plan)=>{
    const url="/api/admin/createPremiumPlan"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const editPremiumService=async(data:Plan)=>{
    const url="/api/admin/editPremiumPlan"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

export const getAllPlanDetails=async()=>{
    const url="/api/admin/getAllPlans"
    try{
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    

}
}






export const getAllPlanDetailsForUsers=async()=>{
    const url="/api/user/getAllPlans"
    try{
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    

}
}




