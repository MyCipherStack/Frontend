
import { API_ROUTES } from "@/constants/routes"
import axios from "../utils/axiosConfig"



export const resetPasswordService=async(body:object)=>{
    try{
        const url="/api/user/resetPassword"
        const response= await axios.patch(API_ROUTES.USER.RESET_PASSWORD,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}