
import { UserFormData } from "@/types/users"
import axios from "../utils/axiosConfig"
import { API_ROUTES } from "@/constants/routes"




export const usersDataUpdate=async(update:{email:string,status:string})=>{
    try{
        const url=`/api/admin/users/${update.email}`
        const response= await axios.patch(API_ROUTES.ADMIN.USERS,update,{withCredentials:true}) 
        return response 
    }
    catch(error){
        throw error
    }
}

    

export const userProfileDataUpdate=async(update:Partial<UserFormData>)=>{
    try{
        const url="/api/user/profile"
        const response= await axios.patch(API_ROUTES.USER.PROFILE,update,{withCredentials:true}) 
        return response 
    }
    catch(error){
        throw error
    }
}