import axios, { InternalAxiosRequestConfig } from "axios"
import { toastError } from "./toast"
import { useDispatch } from "react-redux"
import { logOut } from "@/features/auth/userAuthSlice"


const dispatch=useDispatch()


axios.interceptors.request.use(
    (config:InternalAxiosRequestConfig<any>)=>{
        config.baseURL="http://localhost:5000/"
        return config
    },(error)=>Promise.reject(error)
)


axios.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status===401){
            dispatch(logOut())
            toastError(error.response.message)
        }
    }
)


export default axios