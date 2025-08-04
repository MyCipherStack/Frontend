import { Plan } from "@/app/admin/premium/page"
import axios from "../utils/axiosConfig"
import { API_ROUTES } from "@/constants/routes"




export const creatPremiumService=async(data:Plan)=>{
    const url="/api/admin/createPremiumPlan"
    try{
        const response= await axios.post(API_ROUTES.ADMIN.CREATE_PREMIUM_PLAN,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}


export const editPremiumService=async(data:Plan)=>{
    const url="/api/admin/editPremiumPlan"
    try{
        const response= await axios.post(API_ROUTES.ADMIN.EDIT_PREMIUM_PLAN,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}





    
export const getAllPlanDetails=async()=>{
    
    const url="/api/user/allPlans"
    try{
        const response= await axios.get(url,{withCredentials:true})  
        return response
    }
    catch(error){
        console.log(error,"errr");
        
        throw error

}
}


export const adminAllPlans=async()=>{
    
    const url="/api/admin/adminAllPlans"
    try{
        const response= await axios.get(API_ROUTES.ADMIN.ADMIN_ALL_PLANS,{withCredentials:true})  

        return response
    }
    catch(error){
        console.log(error,"errr");
        
        throw error

}
}


export const subscribePlan=async(id:string)=>{
    const url="/api/user/createPayment"
    try{
        const response= await axios.post(API_ROUTES.USER.CREATE_PAYMENT,{id},{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    

}
}



export const getSubcriptionData=async()=>{
    
    const url=`/api/user/subscriptionData`
    try{
        const response= await axios.get(API_ROUTES.USER.SUBSCRIPTION_DATA,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    

}
}



    








