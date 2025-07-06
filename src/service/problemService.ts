
import axios from "../utils/axiosConfig"


export interface IProblem {
    _id?:string;
    title: string;
    problemId: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    tags: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    hint:string;
    testCases: { input: string; output: string; isSample: boolean,explanation:string }[];
    functionSignatureMeta:{
    name:string,
    parameters:string[],
    returnType:{type:string}}
    starterCode:Record<string,string>;
    status:boolean;
    updatedAt:string
  

  }
  


export const addProblemService=async(data:Partial<IProblem>)=>{
    const url="/api/admin/addProblem"  //
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}



export const editProblemService=async(data:Partial<IProblem>)=>{
    const url="/api/admin/editProblem"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}



export const runProblemService=async(data:Partial<IProblem>)=>{
    const url="/api/user/problem/run"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}





export const submitProblemService=async(data:Partial<IProblem>)=>{
    const url="/api/user/problem/submit"
    try{
        const response= await axios.post(url,data,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

export const userSubmissionsService=async()=>{
    const url="/api/user/userSubmissions"
    try{
        const response= await axios.get(url,{withCredentials:true}) 
        return response
    }
    catch(error){
        throw error
    }
}

