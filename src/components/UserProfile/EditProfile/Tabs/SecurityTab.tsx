import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/validations/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "@/utils/toast";
import { useSelector } from "react-redux";
import { userResetPassword } from "@/service/passwordServices";



 export function SecurityTab() {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    });
    const userData = useSelector((state: any) => state.auth.user);

    const submit = async (data: any) => {
        try {
            const response = await userResetPassword({ formData: data, email: userData.email });
            console.log(response);
            toastSuccess("password updated");
        } catch (error) {
            const err = error as any;
            if (err?.response?.data?.message) {
                toastError(String(err.response.data.message));
            } else {
                toastError("An error occurred");
            }
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
            errors={errors.current?.message ?? ""}
          />
          <PasswordInput
            label="New Password"
            register={register}
            type="password"
            errors={errors.password?.message ?? ""}
          />
          <PasswordInput
            label="Confirm New Password"
            register={register}
            type="confirmPassword"
            errors={errors.confirmPassword?.message ?? ""}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit(submit)}
        className="px-6 py-2 bg-[#0ef] text-black font-bold rounded-md hover:bg-opacity-80 transition-opacity disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Password"}
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
  register: any;
  type: string;
  errors: string;
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





