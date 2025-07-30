"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginSuccess } from "@/features/auth/adminAuthSlice";
import { loginSchema } from "@/validations/authSchemas";
import { adminLogin } from "@/service/authService";
import "@/app/Login/page.css";
import { toastSuccess } from "@/utils/toast";
import { AxiosError } from "axios";
import { RootState } from "@/store/store";

type LoginType = {
  username: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  // const formData = watch();

  const admin = useSelector((state: RootState) => state.adminAuth.admin)

  const submitForm = async (data: LoginType) => {
    try {
      setIsSubmitting(true);
      const response = await adminLogin({
        name: data.username,
        password: data.password,
      });

      toastSuccess("Admin login successful")

      console.log(response, "loged dataaaaa");
      dispatch(adminLoginSuccess(response.data.admin));

      try {
        router.push("/admin/dashboard");
        console.log("try worked");
        
      } catch (err) {
        console.error("Navigation failed:", err);
      }




    } catch (error: unknown) {
      console.error(error)
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "Invalid admin credentials",
        {
          position: "top-right",
          autoClose: 2000,
          style: {
            color: " #0ef",
            textShadow: "0 0 8px #0ef",
            backgroundColor: "#000",
            border: "1px solid #0ef",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };




  useEffect(() => {

    if (admin) {
      console.log("token");

      router.replace("/admin/dashboard")

    }
    console.log("notoken");
  }, [admin,router])

  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-noise-pattern pointer-events-none z-10"></div>
      <div className="  "></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-16 flex-grow mt-2">
        <div className="max-w-sm mx-auto">
          {/* Admin Login Card */}
          <div className="bg-[#111111] rounded-lg neon-border relative">
            {/* Terminal Header */}
            <div className="bg-black px-4 py-2 relative terminal-dots">
              <div className="text-right text-xs text-gray-400 font-mono">
                Admin Access - CipherStack
              </div>
            </div>

            {/* Login Form */}
            <div className="p-6 relative z-10">
              <h2 className="text-xl font-bold mb-2 neon-text text-center">
                Admin Portal
              </h2>
              <p className="text-gray-400 text-center mb-4 text-sm">
                Restricted access - authorized personnel only
              </p>

              <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-xs mb-1">
                    Admin Username
                  </label>
                  <input
                    {...register("username")}
                    className="login-input w-full px-3 py-2 text-sm rounded-md"
                    placeholder="Enter admin username"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-xs mb-1">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    className="login-input w-full px-3 py-2 text-sm rounded-md"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 text-sm bg-transparent border border-[#0ef] text-[#0ef] rounded-md hover:bg-[#0ef] hover:text-black transition duration-300 uppercase tracking-wider ${isSubmitting && "opacity-50 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? "Authenticating..." : "Login"}
                </button>
              </form>

              <div className="text-center text-xs text-gray-400 mt-4">
                <p className="flex items-center justify-center">
                  <i className="fas fa-shield-alt text-[#0ef] mr-1 text-sm"></i>
                  Secure Admin Access
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 text-center text-xs text-red-400">
            <p>
              Unauthorized access to this system is prohibited and may be subject
              to legal action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}