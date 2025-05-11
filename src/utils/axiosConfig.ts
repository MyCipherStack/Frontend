import axios, { InternalAxiosRequestConfig } from "axios"
import { toastError } from "./toast"
import { logOut } from "@/features/auth/userAuthSlice"
import { store } from "@/store/store"
import { error } from "console"




axios.interceptors.request.use(
    (config:InternalAxiosRequestConfig<any>)=>{
        config.baseURL="http://localhost:5000/"
        return config
    },(error)=>Promise.reject(error)
)



axios.interceptors.response.use(
    (response)=>response,
    (error)=>{
console.log(error);
        
        if(error.response && error.response.status===401){
            console.log(error.response);
            
            store.dispatch(logOut())
            toastError(error.response.message || "Unauthorized access")
        }
        return Promise.reject(error)
    },
)


export default axios