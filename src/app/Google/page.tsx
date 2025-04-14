"use client"

import { loginSuccess } from "@/features/auth/userAuthSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


 const GoogleCallBack=()=>{

const router=useRouter()
const searchParams=useSearchParams()
const dispatch=useDispatch()


useEffect(()=>{
    const name=searchParams.get("name")
    const email=searchParams.get("email")
    router.push("/Home")
    dispatch(loginSuccess({name,email}))
},[])
    return(
        <>
        <p>Redirecting....</p>
        </>
    )
}

export default GoogleCallBack