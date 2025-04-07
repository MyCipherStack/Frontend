import axios, { InternalAxiosRequestConfig } from "axios"
import { error } from "console"
import { config } from "process"

axios.interceptors.request.use(
    (config:InternalAxiosRequestConfig<any>)=>{
        config.baseURL="http://localhost:5000/"
        return config
    },(error)=>Promise.reject(error)
)

export default axios