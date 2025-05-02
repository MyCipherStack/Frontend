
import axios from "../utils/axiosConfig"


export const getSubmissions=async(problemId:string)=>{
    try{
        console.log("get getSubmissions");
        
        const url=`/api/user/submissions?problemId=${problemId}`
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}
