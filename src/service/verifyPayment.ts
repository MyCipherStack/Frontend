import axios from "../utils/axiosConfig"
import { API_ROUTES } from "../constants/routes"

export interface IRazorpayHandler {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const verifyPayment = async (response: IRazorpayHandler) => {
    try {
        const res = await axios.post(API_ROUTES.USER.VERIFY_PAYMENT, { response }, { withCredentials: true })
        return res
    } catch (error) {
        throw error
    }
}


