"use client"

import { FormEvent, useState } from 'react';
import AdminNavbar from '@/components/Admin/NavBar';
import ProblemDetails from '@/components/Admin/ProblemDetails';
import Allproblems from '@/components/Admin/Allproblems';
import { addProblemService, editProblemService, IProblem } from '@/service/problemService';
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
      { input: '', output: '', isSample: false ,explanation:""},
      { input: '', output: '', isSample: false ,explanation:""},
    ],
    functionSignatureMeta:{
        name: "",
        parameters: [""],
        returnType:{type:""}},
        starterCode:{},
        status:true,
        updatedAt:""
      }
  
  const [formData, setFormData] = useState<IProblem>(problem);

  const [editproblem,setEditProblem]=useState(false)
  const [Addproblem,setAddProblem]=useState(false)
  const [allProblems,SetAllproblmes]=useState(true)

  
function showAllProblems() {
  SetAllproblmes(true);
  setEditProblem(false);
  setAddProblem(false);
}

function showEditProblem(e:React.ChangeEvent,problemData:IProblem) {
  e.stopPropagation()
  e.stopPropagation()
  setFormData(problemData)
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
      const response=await addProblemService(formData)
      toastSuccess(response.data.message)
    }
    if(editproblem){
      const response=await editProblemService(formData)
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
    <Allproblems showAddProblem={showAddProblem} showEditProblem={showEditProblem}></Allproblems>
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