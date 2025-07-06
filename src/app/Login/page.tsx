"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/app/Login/page.css"
import { toast } from "react-toastify"
import { userLogin, userRegister } from "@/service/authService";
import {  useRouter, useSearchParams } from "next/navigation";
import EnterOtp from "@/components/PasswordComponent.tsx/EnteOtp";
import { verifyOtpService } from "@/service/verifyOtpService";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/features/auth/userAuthSlice";
import Link from "next/link";
import { loginSchema, signSchema } from "@/validations/authSchemas";
import { toastError, toastSuccess } from "@/utils/toast";
import { AxiosError } from "axios";
import socket from "@/utils/socket";


export default function AuthPage() {



  const [isLogin, setIsLogin] = useState(true);

  const searchParams = useSearchParams()

  const mode = searchParams.get("mode")


  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (mode === "signup") {
      setIsLogin(false)
    }
  }, [mode])


  useEffect(() => {

    if (user) {
      console.log("token");

      router.replace("/")

    }
    console.log("notoken");
  }, [])



  const [otpComponent, setotpComponent] = useState(false)
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  type LoginType = {
    username: string,
    email?: string,
    password: string,
    confirmPassword?: string,
    TickBox: boolean
  }
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue, reset } = useForm<LoginType>({ resolver: zodResolver(!isLogin ? signSchema : loginSchema) })

  //   We can still use react-hook-form, but manually control the input values by:
  // Using watch() to get the form values.
  const formData = watch()

  const VerifyOtp = useCallback(async () => {
    try {
      console.log(otp, "code");

      const response = await verifyOtpService({ otp, email: formData.email })

      setotpComponent(false)
      setIsLogin(true)
      toastSuccess(response.data.message)

    }
    catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>

      toastError(axiosError?.response?.data?.message ?? "something went wrong")
    }

  }, [otp, formData.email])






  const changeStatus = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true)
    reset({ username: "", email: "", password: "", confirmPassword: "" } as any)
  }

  const submitForm = async (e: React.FormEvent) => {
    if (formData.TickBox || isLogin) {

      const body = isLogin ? { name: formData.username, password: formData.password } : { name: formData.username, email: formData.email, password: formData.password }
      try {

        if (isLogin) {
          const response = await userLogin(body)
          console.log(response, "response");

          router.push("/")

          //join user room for notification
          socket.emit("join-user-room", response.data.user.id)

          toastSuccess(response.data.message)

          dispatch(loginSuccess(response.data.user))

        } else {

          const response = await userRegister(body)
          toastSuccess(response.data.message)
          setotpComponent(true)
        }

      }
      catch (error: unknown) {
        console.log(error);
        const axiosError = error as AxiosError<{ message?: string }>

        if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
          toastError(axiosError.response.data.message)
        } else {
          toastError("Something went wrong.Please try again")
        }
      }
    }
  }


  const googleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {

      console.log("google frond end");

      window.location.href = process.env.NEXT_PUBLIC_GOOGLE_URL!; //


    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>

      toast.error(axiosError.message, {
        position: "top-right",
        autoClose: 2000,
        style: { color: " #0ef", textShadow: "0 0 8px #0ef", backgroundColor: "#000", border: "1px solid #0ef" },

      })
    }
  }
  return (

    <>

      <div className="min-h-screen text-gray-100 flex flex-col relative">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-noise-pattern pointer-events-none z-10"></div>
        <div className="scan-line"></div>

        {/* Main Content with Adjusted Spacing */}
        <main className="container mx-auto px-4 pt-20 pb-16 flex-grow mt-2">
          {!otpComponent && (
            <div className="max-w-sm mx-auto">
              {/* Compact Signup Card */}
              <div className="bg-[#111111] rounded-lg neon-border relative">
                {/* Terminal Header */}
                <div className="bg-black px-4 py-2 relative terminal-dots">
                  <div className="text-right text-xs text-gray-400 font-mono">
                    Sign Up - CipherStack
                  </div>
                </div>

                {/* Compact Form */}
                <div className="p-6 relative z-10">
                  <h2 className="text-xl font-bold mb-2 neon-text text-center">
                    Join CipherStack
                  </h2>
                  <p className="text-gray-400 text-center mb-4 text-sm">
                    Create your account to start coding
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-xs mb-1">
                        Username{isLogin && " or Email"}
                      </label>
                      <input {...register("username")}
                        className="login-input w-full px-3 py-2 text-sm rounded-md"
                        placeholder={"Choose username"}
                      />
                      {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                    </div>
                    {!isLogin && (
                      <div>
                        <label className="block text-gray-300 text-xs mb-1">
                          Email Address
                        </label>
                        <input {...register("email")}
                          className="login-input w-full px-3 py-2 text-sm rounded-md"
                          placeholder={"Enter your email"}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

                      </div>
                    )}
                    <div>
                      <label className="block text-gray-300 text-xs mb-1">
                        Password
                      </label>
                      <input  {...register("password")} type="password"
                        className="login-input w-full px-3 py-2 text-sm rounded-md"
                        placeholder={"Enter you password"}
                      />
                      {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}


                    </div>
                    {!isLogin && (
                      <div>
                        <label className="block text-gray-300 text-xs mb-1">
                          Confirm Password
                        </label>
                        <input  {...register("confirmPassword")}
                          className="login-input w-full px-3 py-2 text-sm rounded-md"
                          placeholder={"Confirm password"} />
                        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}

                      </div>
                    )}

                    <div className="flex items-center text-xs justify-between">
                      <label className="flex justify-between">
                        <input
                          type="checkbox"  {...register("TickBox")}
                          className="form-checkbox h-3 w-3 text-[#0ef] accent-[#0ef]"
                        />
                        <span className="ml-2 text-gray-300">
                          {isLogin ? "Remember me" : "Accept Terms & Privacy"}
                        </span>
                      </label>

                      {
                        isLogin && (
                          <Link href={"/Forgotpassword"}>
                            <button className=" hover:underline text-sm cursor-pointer">
                              forgot password
                            </button>
                          </Link>
                        )
                      }
                    </div>

                    <button onClick={handleSubmit(submitForm)} disabled={isSubmitting}
                      className={`w-full py-2 text-sm bg-transparent border border-[#0ef] text-[#0ef] rounded-md hover:bg-[#0ef] hover:text-black transition duration-300 uppercase tracking-wider ${isSubmitting && 'opacity-50 cursor-not-allowed'} `}
                    >
                      {isSubmitting ? "Please wait..." : (isLogin ? "Login" : "Create Account")}
                    </button>

                    {isLogin && (
                      <button onClick={(e) => googleLogin(e)}
                        className={`w-full py-2 text-sm bg-transparent border border-[#0ef] text-[#0ef] rounded-md hover:bg-[#0ef] hover:text-black transition duration-300 uppercase tracking-wider ${isSubmitting && 'opacity-50 cursor-not-allowed'} `}
                      >
                        Login with Google</button>)}

                  </form>

                  <div className="text-center text-xs text-gray-400 mt-4">
                    <span className="block mb-1">{isLogin ? "New to CipherStack" : "Existing user?"}</span>
                    <button onClick={changeStatus} className="neon-text hover:underline text-sm cursor-pointer">
                      {isLogin ? "Create Account" : "Login here"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Compact Stats Section */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["1337+", "24/7", "100K+"].map((stat, index) => (
                  <div
                    key={stat}
                    className="bg-black bg-opacity-50 p-2 rounded text-center"
                  >
                    <div className="text-[#0ef] text-base font-bold">{stat}</div>
                    <div className="text-gray-400 text-2xs">
                      {["Problems", "Contests", "Users"][index]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Security Info */}
              <div className="mt-4 text-center text-xs text-gray-400">
                <p className="flex items-center justify-center">
                  <i className="fas fa-shield-alt text-[#0ef] mr-1 text-sm"></i>
                  Secure Registration
                </p>
              </div>
            </div>

          )}

          {otpComponent && (
            <div className=" flex flex-col flex-grow  items-center justify-center px-4 py-12">
              <div className=" rounded-lg border neon-border  w-96 max-w-md overflow-hidden relative p-6">

                <EnterOtp VerifyOtp={VerifyOtp} setOTP={setOtp} email={formData.email} />


              </div>
            </div>
          )}

        </main>
      </div>


    </>
  );
}


