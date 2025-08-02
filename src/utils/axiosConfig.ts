import axios, { InternalAxiosRequestConfig } from "axios"
import { toastError } from "./toast"
import { logOut } from "@/features/auth/userAuthSlice"
import { store } from "@/store/store"




axios.interceptors.request.use(
    (config:InternalAxiosRequestConfig<unknown>)=>{
        config.baseURL=process.env.NEXT_PUBLIC_BACKEND_URL
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
            toastError(error.response.message || "Unauthorized access Login to continue")
            setTimeout(()=>{
                window.location.href="/login"

            },600)
        }
        return Promise.reject(error)
    },
)


export default axios