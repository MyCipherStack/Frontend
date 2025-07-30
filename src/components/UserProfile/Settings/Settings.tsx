
"use client";

import { userProfileDataUpdate } from "@/service/postUpdateService";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { confirmationAlert } from "@/utils/confirmationAlert";
import { toastError } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/userAuthSlice";
import { getUserProfile } from "@/service/getDataService";
import { AppearanceTab } from "../EditProfile/Tabs/AppearanceTab";
import { PreferencesTab } from "../EditProfile/Tabs/PreferencesTab";


export default function SettingsModal({ onClose }:{onClose:()=>void}) {




  type FormData = {
    personal: {
      displayName: string;
      username: string;
      email: string;
      phone: string;
      bio: string;
      github: string;
      linkedin: string;
      avatar: string;
    };
    appearance: {
      theme: string;
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
    streak: object
    ,
  };




  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    personal: {
      displayName: "",
      username: "",
      email: "",
      phone: "",
      bio: "",
      github: "",
      linkedin: "",
      avatar: "http://res.cloudinary.com/dmvffxx3d/image/upload/v1745539383/wlz7zbayznqdofk1hja9.png",
    },
    appearance: {
      theme: "cyberpunk",
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
    streak: {}
  });


  const themes = [
    {
      id: "cyberpunk",
      color: " #0ef"

    },
    {
      id: "synthwave",
      color: '#f72585',
    },
    {
      id: "dark",
      color: '#888',
    },
    {
      id: "matrix",
      color: '#00ff00',
    },
  ];


  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile()
        console.log(response);

        const data = response.data.user
        console.log(data);

        setFormData({
          personal: {
            displayName: data.displayName || "",
            username: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            avatar: data.image || "/default-avatar.jpg",
          },
          appearance: {
            theme: data.theme || "cyberpunk"
          },
          preferences: {
            emailNotifications: data.preferences.emailNotifications,
            interviewReminders: data.preferences.interviewReminders,
            contestReminders: data.preferences.contestReminders,
            language: data.preferences.language,
            timezone: data.preferences.timezone,
            publicProfile: data.preferences.publicProfile,
            showActivity: data.preferences.showActivity,
          },
          streak: data.streak
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    console.log(formData, "form data");

  }, []);









  const [activeTab, setActiveTab] = useState("appearance");
  const dispatch = useDispatch()

  const handleInputChange = (section: keyof FormData, field: string, value: string | boolean) => {
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
    try {

      const confirm = await confirmationAlert("save the changes")
      if (confirm) {

        const response = await userProfileDataUpdate(formData)
        console.log(response);
        dispatch(loginSuccess(response.data.user))
      const selected=themes.find((t)=>t.id==formData.appearance.theme)
        if(selected){
          const stored = localStorage.setItem("theme-color",selected.color)
        }


        onClose();
      }
    } catch (error) {

      toastError("Error updating profile")

    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#111111] p-6 rounded-lg">
          <p className="text-[#0ef]">Loading  data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 pt-10 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-[#111111] rounded-lg border border-[#0ef]/30 shadow-lg shadow-[#0ef]/10 w-full max-w-2xl my-4">
        {/* Modal Header */}
        <div className="bg-black px-6 py-3 border-b border-[#0ef] flex justify-between items-center">
          <h2 className="text-[#0ef] font-bold text-lg">Settings</h2>
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
          {["appearance", "preferences"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === tab
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

          {activeTab === "appearance" && (
            <AppearanceTab
              data={formData.appearance}
              onChange={(field, value) => { handleInputChange("appearance", field, value) }}
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
