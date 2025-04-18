import { FaCamera, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { InputField } from "../Components/InputField";
import { FormData } from "../EditProfile";

export function PersonalTab({
  data,
  onChange,
}: {
  data: FormData["personal"];
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative self-start">
          <img

            className="w-24 h-24 rounded-full border-2 border-[#0ef] object-cover"
            alt="Profile"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-[#0ef] rounded-full p-2 hover:bg-opacity-90 transition-opacity"
          >
            <FaCamera className="text-black text-xs" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <InputField
            label="Display Name"
            value={data.displayName}
            onChange={(e) => onChange("displayName", e.target.value)}
          />
          <InputField
            label="Username"
            value={data.username}
            onChange={(e) => onChange("username", e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <InputField
            label="Phone (optional)"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>

      <InputField
        label="Bio"
        type="textarea"
        value={data.bio}
        rows={3}
        onChange={(e) => onChange("bio", e.target.value)}
      />

      <div className="space-y-3">
        <h3 className="text-gray-400 font-medium text-sm">Social Links</h3>
        <SocialInput
          icon={<FaGithub />}
          placeholder="GitHub Username"
          value={data.github}
          onChange={(value) => onChange("github", value)}
        />
        <SocialInput
          icon={<FaLinkedin />}
          placeholder="LinkedIn Username"
          value={data.linkedin}
          onChange={(value) => onChange("linkedin", value)}
        />
      </div>
    </div>
  );
}







function SocialInput({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 w-5 flex justify-center">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-black border border-gray-800 text-white px-3 py-2 rounded-md text-sm focus:border-[#0ef] focus:outline-none transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
