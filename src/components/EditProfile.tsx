"use client";

import { useState, useEffect } from "react";
import {
  FaTimes,
  FaCamera,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";

type FormData = {
  personal: {
    displayName: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    github: string;
    twitter: string;
    linkedin: string;
    avatar: string;
  };
  appearance: {
    theme: string;
    accentColor: string;
  };
  security: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
  };
  preferences: {
    emailNotifications: boolean;
    interviewReminders: boolean;
    contestReminders: boolean;
    language: string;
    timezone: string;
    publicProfile: boolean;
    showActivity: boolean;
  };
};

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<FormData>({
    personal: {
      displayName: "",
      username: "",
      email: "",
      phone: "",
      bio: "",
      github: "",
      twitter: "",
      linkedin: "",
      avatar: "",
    },
    appearance: {
      theme: "cyberpunk",
      accentColor: "#0ef",
    },
    security: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
    },
    preferences: {
      emailNotifications: true,
      interviewReminders: true,
      contestReminders: true,
      language: "english",
      timezone: "gmt-8",
      publicProfile: true,
      showActivity: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        setFormData({
          personal: {
            displayName: data.displayName || "",
            username: data.username || "",
            email: data.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
            github: data.social?.github || "",
            twitter: data.social?.twitter || "",
            linkedin: data.social?.linkedin || "",
            avatar: data.avatar || "/default-avatar.jpg",
          },
          appearance: {
            theme: data.theme || "cyberpunk",
            accentColor: data.accentColor || "#0ef",
          },
          security: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            twoFactorEnabled: data.twoFactorEnabled || false,
          },
          preferences: {
            emailNotifications: data.notifications?.email || true,
            interviewReminders: data.notifications?.interviewReminders || true,
            contestReminders: data.notifications?.contestReminders || true,
            language: data.language || "english",
            timezone: data.timezone || "gmt-8",
            publicProfile: data.privacy?.publicProfile || true,
            showActivity: data.privacy?.showActivity || false,
          },
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#111111] p-6 rounded-lg">
          <p className="text-[#0ef]">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 pt-10 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-[#111111] rounded-lg border border-[#0ef]/30 shadow-lg shadow-[#0ef]/10 w-full max-w-2xl my-4">
        {/* Modal Header */}
        <div className="bg-black px-6 py-3 border-b border-[#0ef] flex justify-between items-center">
          <h2 className="text-[#0ef] font-bold text-lg">Edit Profile</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-800">
          {["personal", "appearance", "security", "preferences"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                activeTab === tab
                  ? "text-[#0ef] border-b-2 border-[#0ef]"
                  : "text-gray-400 hover:text-gray-200"
              } transition-colors`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
          {activeTab === "personal" && (
            <PersonalTab
              data={formData.personal}
              onChange={(field, value) => handleInputChange("personal", field, value)}
            />
          )}
          {activeTab === "appearance" && (
            <AppearanceTab
              data={formData.appearance}
              onChange={(field, value) => handleInputChange("appearance", field, value)}
            />
          )}
          {activeTab === "security" && (
            <SecurityTab
              data={formData.security}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onChange={(field, value) => handleInputChange("security", field, value)}
            />
          )}
          {activeTab === "preferences" && (
            <PreferencesTab
              data={formData.preferences}
              onChange={(field, value) => handleInputChange("preferences", field, value)}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-800 bg-[#111111]">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-600 text-gray-400 rounded-md hover:border-gray-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0ef] text-black font-bold rounded-md hover:bg-opacity-80 transition-opacity disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Tab Components
function PersonalTab({
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
            src={data.avatar}
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
          icon={<FaTwitter />}
          placeholder="Twitter Handle"
          value={data.twitter}
          onChange={(value) => onChange("twitter", value)}
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

function AppearanceTab({
  data,
  onChange,
}: {
  data: FormData["appearance"];
  onChange: (field: string, value: string) => void;
}) {
  const themes = [
    {
      id: "cyberpunk",
      name: "Cyberpunk",
      gradient: "from-[#111] via-[#0ef]/20 to-black",
    },
    {
      id: "synthwave",
      name: "Synthwave",
      gradient: "from-purple-900 via-pink-600 to-black",
    },
    {
      id: "dark",
      name: "Dark Mode",
      gradient: "from-gray-800 via-gray-700 to-black",
    },
    {
      id: "matrix",
      name: "Matrix",
      gradient: "from-green-900 via-green-700 to-black",
    },
  ];

  const accentColors = ["#0ef", "#f0e", "#ff0", "#0f0", "#f00"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              selected={data.theme === theme.id}
              onSelect={() => onChange("theme", theme.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Accent Color</h3>
        <div className="flex gap-3 flex-wrap">
          {accentColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange("accentColor", color)}
              className={`w-8 h-8 rounded-full border-2 ${
                data.accentColor === color
                  ? "border-white"
                  : "border-transparent hover:border-gray-400"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityTab({
  data,
  showPassword,
  setShowPassword,
  onChange,
}: {
  data: FormData["security"];
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onChange: (field: string, value: string | boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Password</h3>
        <div className="space-y-4">
          <PasswordInput
            label="Current Password"
            value={data.currentPassword}
            showPassword={showPassword}
            onChange={(e) => onChange("currentPassword", e.target.value)}
          />
          <PasswordInput
            label="New Password"
            value={data.newPassword}
            showPassword={showPassword}
            onChange={(e) => onChange("newPassword", e.target.value)}
          />
          <PasswordInput
            label="Confirm New Password"
            value={data.confirmPassword}
            showPassword={showPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <ToggleSwitch
            checked={data.twoFactorEnabled}
            onChange={(checked) => onChange("twoFactorEnabled", checked)}
          />
        </div>
        <p className="text-gray-400 text-sm">
          {data.twoFactorEnabled
            ? "2FA is currently enabled for your account."
            : "Add an extra layer of security to your account."}
        </p>
      </div>
    </div>
  );
}

function PreferencesTab({
  data,
  onChange,
}: {
  data: FormData["preferences"];
  onChange: (field: string, value: boolean | string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Notifications</h3>
        <div className="space-y-3">
          <NotificationSetting
            icon={<FaEnvelope />}
            label="Email Notifications"
            description="Receive important account notifications via email"
            checked={data.emailNotifications}
            onChange={(checked) => onChange("emailNotifications", checked)}
          />
          <NotificationSetting
            icon={<FaBell />}
            label="Interview Reminders"
            description="Receive interview invitation via email"
            checked={data.interviewReminders}
            onChange={(checked) => onChange("interviewReminders", checked)}
          />
          <NotificationSetting
            icon={<FaBell />}
            label="Contest Reminders"
            description="Get reminders for upcoming contests"
            checked={data.contestReminders}
            onChange={(checked) => onChange("contestReminders", checked)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <h3 className="text-lg font-medium mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Language"
            options={[
              { value: "english", label: "English" },
              { value: "spanish", label: "Spanish" },
              { value: "french", label: "French" },
            ]}
            value={data.language}
            onChange={(value) => onChange("language", value)}
          />
          <SelectInput
            label="Time Zone"
            options={[
              { value: "gmt-8", label: "(GMT-08:00) Pacific Time" },
              { value: "gmt-5", label: "(GMT-05:00) Eastern Time" },
              { value: "gmt+0", label: "(GMT+00:00) UTC" },
              { value: "gmt+5.5", label: "(GMT+05:30) India Standard Time" },
            ]}
            value={data.timezone}
            onChange={(value) => onChange("timezone", value)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <h3 className="text-lg font-medium mb-4">Privacy</h3>
        <div className="space-y-3">
          <NotificationSetting
            label="Public Profile"
            description="Make your profile visible to other users"
            checked={data.publicProfile}
            onChange={(checked) => onChange("publicProfile", checked)}
          />
          <NotificationSetting
            label="Show Activity"
            description="Display your recent activity on your profile"
            checked={data.showActivity}
            onChange={(checked) => onChange("showActivity", checked)}
          />
        </div>
      </div>
    </div>
  );
}



// Shared Components
function ThemeCard({
  theme,
  selected,
  onSelect,
}: {
  theme: { id: string; name: string; gradient: string };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
        selected
          ? "border-[#0ef] shadow-[0_0_10px_rgba(0,238,255,0.3)]"
          : "border-gray-800 hover:border-gray-600"
      }`}
    >
      <div className={`h-16 rounded mb-2 bg-gradient-to-b ${theme.gradient}`} />
      <div className="text-sm text-center flex items-center justify-center gap-1">
        {theme.name}
        {selected && <FaCheckCircle className="text-[#0ef]" />}
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  rows = 1,
  onChange,
  ...props
}: {
  label: string;
  type?: string;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">{label}</label>
      {type === "textarea" ? (
        <textarea
          className="w-full bg-black border border-gray-800 text-white px-3 py-2 rounded-md text-sm focus:border-[#0ef] focus:outline-none transition-colors"
          value={value}
          rows={rows}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          type={type}
          className="w-full bg-black border border-gray-800 text-white px-3 py-2 rounded-md text-sm focus:border-[#0ef] focus:outline-none transition-colors"
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </div>
  );
}

function PasswordInput({
  label,
  value,
  showPassword,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full bg-black border border-gray-800 text-white px-3 py-2 rounded-md text-sm focus:border-[#0ef] focus:outline-none transition-colors pr-10"
          value={value}
          onChange={onChange}
          {...props}
        />
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

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full peer ${
          checked ? "bg-[#0ef]" : "bg-gray-600"
        } transition-colors`}
      >
        <div
          className={`absolute top-0.5 left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );
}

function NotificationSetting({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="p-1.5 bg-blue-500/10 rounded-full">
            {icon}
          </div>
        )}
        <div>
          <div className="font-medium text-sm">{label}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}

function SelectInput({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-gray-800 text-white px-3 py-2 rounded-md text-sm focus:border-[#0ef] focus:outline-none transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}