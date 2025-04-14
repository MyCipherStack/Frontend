
import axios from "../utils/axiosConfig"



export const getDataService=async(url:string)=>{
    try{
        const response= await axios.get(url) 
        return response
    }
    catch(error){
        throw error
    }
}