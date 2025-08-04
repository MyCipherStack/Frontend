import { API_ROUTES } from "@/constants/routes"
import axios from "../utils/axiosConfig"



export const forgotPasswordVerify=async(body:object)=>{
    try{
        const url="/api/user/forgotPasswordVerify"
        const response= await axios.post(API_ROUTES.USER.FORGOT_PASSWORD_VERIFY,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}