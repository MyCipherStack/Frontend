import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { actionServiceUpdate } from "@/service/postUpdateService";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, signSchema } from "@/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/utils/toast";
import { useSelector } from "react-redux";


 export function SecurityTab() {

    const{ register,handleSubmit,formState:{errors,isSubmitting},watch,setValue,reset}=useForm({resolver:zodResolver(resetPasswordSchema )})
    const userData=useSelector((state:any)=>state.auth.user)

    
    const formData=watch()
    let submit=async(e:React.FormEvent)=>{
      try{
        // e.preventDefault()
        const response =await actionServiceUpdate("/api/user/profile/resetPassword",{formData,email:userData.email})
        console.log(response);
          toastSuccess("password updated")
      }catch(error){
        console.log(error);
        
          toastError(error.response.data.message)
      }
        
      
    }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Password</h3>
        <div className="space-y-4">
          <PasswordInput
            label="Current Password"
            register={register}
            type="current"
            errors={ formData.current ? "": "*required"}
            />
          <PasswordInput
            label="New Password"
            register={register}
            type="password"
            errors={errors.password?.message}

          />
          <PasswordInput
            label="Confirm New Password"
            register={register}
            type="confirmPassword"
            errors={errors.confirmPassword?.message}
            
          />
        </div>
      </div>

      <button
              type="button"   onClick={handleSubmit(submit)}
              className="px-6 py-2 bg-[#0ef] text-black font-bold rounded-md hover:bg-opacity-80 transition-opacity disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Upate Password"}
            </button>
    </div>
  );
}






function PasswordInput({
  label,
  register,
  type,
  errors
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type:string,
  errors:string
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full bg-black border border-gray-800 text-white px-3 py-2 rounded-md text-sm focus:border-[#0ef] focus:outline-none transition-colors pr-10"
          {...register(type)}
        />
        {errors && <p className="text-red-500 text-xs">{errors}</p>} 

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
        </button>
      </div>
    </div>
  );
}





