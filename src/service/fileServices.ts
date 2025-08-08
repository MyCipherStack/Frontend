import axios from "../utils/axiosConfig"
import { API_ROUTES } from "../constants/routes"



export const uploadImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(API_ROUTES.USER.FILE_UPLOAD, formData, {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response
    } catch (error) {
        throw error
    }
}

