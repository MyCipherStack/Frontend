import axios from "../utils/axiosConfig"
import { API_ROUTES } from "../constants/routes"



export const forgotPasswordOtp = async (body: object) => {
    try {
        const response = await axios.post(API_ROUTES.USER.FORGOT_PASSWORD_OTP, body, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}



export const userResetPassword = async (body: object) => {
    try {
        const response = await axios.patch(API_ROUTES.USER.PROFILE_RESET_PASSWORD, body, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}


