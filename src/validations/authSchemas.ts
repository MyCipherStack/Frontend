import * as z from "zod";





export const signSchema = z.object({
  username: z.string().
  trim().
  min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password:z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
})
.refine((data)=>data.password===data.confirmPassword,{
  message:"Password do not match",
  path:["confirmPassword"] 
})




export const loginSchema=z.object({
  username: z.string().
  trim().
  min(1, "Username is required"),
  password:z.string().min(1,"Password is required")
})




export const resetPasswordSchema = z.object({
    current: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
  })

  
export const resetPasswordLogoutUserSchema = z.object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
  })
  
  


export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

