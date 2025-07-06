
import axios from "../utils/axiosConfig"




export const usersDataUpdate=async(update:{email:string,status:string})=>{
    try{
        const url=`/api/admin/users/${update.email}`
        const response= await axios.patch(url,update,{withCredentials:true}) 
        return response 
    }
    catch(error){
        throw error
    }
}

    

export const userProfileDataUpdate=async(update:{})=>{
    try{
        const url="/api/user/profile"
        const response= await axios.patch(url,update,{withCredentials:true}) 
        return response 
    }
    catch(error){
        throw error
    }
}