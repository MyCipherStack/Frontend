
import { IProblem, typeTestCase } from "@/types/problem";
import axios from "../utils/axiosConfig"
import { API_ROUTES } from "../constants/routes"






export const addProblemService = async (data: Partial<IProblem>) => {
    try {
        const response = await axios.post(API_ROUTES.USER.PROBLEM.ADD, data, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}



export const editProblemService = async (data: Partial<IProblem>) => {
    try {
        const response = await axios.post(API_ROUTES.USER.PROBLEM.EDIT, data, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}



export const runProblemService = async (data: { code?: string, testCases: typeTestCase[], language: string, problemDetails?: IProblem }) => {
    try {
        const response = await axios.post(API_ROUTES.USER.PROBLEM.RUN, data, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}





export const submitProblemService = async (data: { code?: string, testCases: typeTestCase[], language: string, problemDetails?: IProblem }) => {
    try {
        const response = await axios.post(API_ROUTES.USER.PROBLEM.SUBMIT, data, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}

export const userSubmissionsService = async () => {
    try {
        const response = await axios.get(API_ROUTES.USER.PROBLEM.USER_SUBMISSIONS, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}



export const acceptedUserProblems = async () => {
    try {
        const response = await axios.get(API_ROUTES.USER.PROBLEM.ACCEPTED_USER_PROBLEMS, { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}





export const getSolution = async (problemId: string) => {
    try {
        const response = await axios.get(API_ROUTES.USER.PROBLEM.SOLUTION(problemId), { withCredentials: true })
        return response
    } catch (error) {
        throw error
    }
}