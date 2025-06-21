import { string } from "zod"
import axios from "../utils/axiosConfig"

export interface IRazorpayHandler{
    razorpay_order_id:string,razorpay_payment_id: string,razorpay_signature: string
}

export const verifyPayment=async(response:IRazorpayHandler)=>{
    const url="/api/user/verifyPayment"
    try{
        const res= await axios.post(url,{response},{withCredentials:true}) 
        return res
    }
    catch(error){
        throw error
    

}
}


