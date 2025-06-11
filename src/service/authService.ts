import axios from "../utils/axiosConfig"



export const userLogin=async(body:object)=>{
    try{

      const url="/api/user/login"
        const response= await axios.post(url,body,{withCredentials:true}) 
        console.log(response,"upated login");
        
        return response
    }
    catch(error){
        console.log(error,"Errrrrrr");
        
        throw error
    }
}


export const userRegister=async(body:object)=>{
    try{

      const url="/api/user/register"
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}



export const adminLogin=async(body:object)=>{
    try{

      const url="/api/admin/login"
        const response= await axios.post(url,body,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}