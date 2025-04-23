"use client"

import { FormEvent, useEffect, useState } from 'react';
import PreviewTab from '@/components/Admin/PreviewTab';
import Head from 'next/head';
import AdminNavbar from '@/components/Admin/NavBar';
import ProblemDetails from '@/components/Admin/ProblemDetails';
import Allproblems from '@/components/Admin/Allproblems';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { problemService } from '@/service/problemService';
import { toastError, toastSuccess } from '@/utils/toast';





export default function ProblemManagement() {
  const problem={
    title: '',
    problemId: '',
    difficulty: '',
    timeLimit: 1000,
    memoryLimit: 128,
    isPremium: false,
    tags: '',
    statement: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    hint:'',
    testCases: [
      { input: '', output: '', isSample: false },
      { input: '', output: '', isSample: true }
    ],
    functionSignatureMeta:{
        name: "",
        parameters: [],
        returnType: ""
      }
  }
  const [formData, setFormData] = useState(problem);

  const [editproblem,setEditProblem]=useState(false)
  const [Addproblem,setAddProblem]=useState(false)
  const [allProblems,SetAllproblmes]=useState(true)

  
  const router=useRouter()
  const openEditProblem=async(e:React.ChangeEvent,problem:{})=>{
 

  }

function showAllProblems() {
  SetAllproblmes(true);
  setEditProblem(false);
  setAddProblem(false);
}

function showEditProblem(e:React.ChangeEvent,problem:{}) {
  e.stopPropagation()
  e.stopPropagation()
  setFormData(problem)
  // router.push(`/problemDetails/${name}`)

  setEditProblem(true);
  setAddProblem(false);
  SetAllproblmes(false);
}

function showAddProblem() {
  setFormData(problem)
  setAddProblem(true);
  setEditProblem(false);
  SetAllproblmes(false);
}


const handleSubmit =async (e:FormEvent) => {
  e.preventDefault();
  try{
    if(Addproblem){
      const response=await problemService("/api/admin/addProblem",formData)
      toastSuccess(response.data.message)
    }
    if(editproblem){
      const response=await problemService("/api/admin/editProblem",formData)
      toastSuccess(response.data.message)
    }

    
  }catch(error){
    toastError("Something went wrong.Please try again")
  }
};

  return(


    <>

    <div className="flex">
      <AdminNavbar status={"problems"}></AdminNavbar>
      <div>

   { allProblems &&(
     <>
    <Allproblems  showAddProblem={showAddProblem} showEditProblem={showEditProblem}></Allproblems>
    </>
   )}
   { editproblem  &&(
    <>
    <ProblemDetails handleSubmit={handleSubmit} Addproblem={Addproblem} formData={formData} setFormData={setFormData}  showAllProblems={showAllProblems}></ProblemDetails>
    </>
    )}
   { Addproblem  &&(
     <>
    <ProblemDetails handleSubmit={handleSubmit} Addproblem={Addproblem} formData={formData} setFormData={setFormData}  showAllProblems={showAllProblems}></ProblemDetails>
    </>
    )}



      </div>
    </div>
    </>

  )



}