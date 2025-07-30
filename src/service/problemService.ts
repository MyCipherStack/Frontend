
import { IProblem, typeTestCase } from "@/types/problem";
import axios from "../utils/axiosConfig"






export const addProblemService = async (data: Partial<IProblem>) => {
    const url = "/api/admin/addProblem"  //
    try {
        const response = await axios.post(url, data, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}



export const editProblemService = async (data: Partial<IProblem>) => {
    const url = "/api/admin/editProblem"
    try {
        const response = await axios.post(url, data, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}



export const runProblemService = async (data:{code?:string,testCases:typeTestCase[],language:string,problemDetails?:IProblem}) => {
    const url = "/api/user/problem/run"
    try {
        const response = await axios.post(url, data, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}





export const submitProblemService = async ( data:{code?:string,testCases:typeTestCase[],language:string,problemDetails?:IProblem}) => {
    const url = "/api/user/problem/submit"
    try {
        const response = await axios.post(url, data, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}

export const userSubmissionsService = async () => {
    const url = "/api/user/userSubmissions"
    try {
        const response = await axios.get(url, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}



export const acceptedUserProblems = async () => {
    const url = "/api/user/acceptedUserProblems"
    try {
        const response = await axios.get(url, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}





export const getSolution = async (problemId:string) => {
    const url = `/api/user/problem/${problemId}/solution`
    try {
        const response = await axios.get(url, { withCredentials: true })
        return response
    }
    catch (error) {
        throw error
    }
}