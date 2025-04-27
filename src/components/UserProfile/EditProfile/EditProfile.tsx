"use client";

import { actionServiceUpdate, userProfileDataUpdate } from "@/service/postUpdateService";
import { useState, useEffect } from "react";
import {FaTimes} from "react-icons/fa";
import { PersonalTab } from "./Tabs/PersonalTab";
import { AppearanceTab } from "./Tabs/AppearanceTab";
import { SecurityTab } from "./Tabs/SecurityTab";
import { PreferencesTab } from "./Tabs/PreferencesTab";
import { confirmationAlert } from "@/utils/confirmationAlert";
import { toastError } from "@/utils/toast";

export default function EditProfileModal({setIsLoading, isLoading,setFormData,formData,onClose }) {
  const [activeTab, setActiveTab] = useState("personal");
  

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
    try {
      const anyPhoneRegex = /^\+?[\d\s\-().]{7,20}$/;
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
      if( !anyPhoneRegex.test(formData.personal.phone) && formData.personal.phone!==""){
      return  toastError("enter valid phonenumber")
    }
    if(!usernameRegex.test(formData.personal.username) ){
        return  toastError("username must be minimum 3 charater")

      }
      
      let confirm=await confirmationAlert("save the changes")
    if(confirm){

        const response =await userProfileDataUpdate(formData)
        console.log(response);
        
        
        onClose();
      } 
      } catch (error) {
        if(error.response.data.message.includes(" dup key: { name")){
          console.log("this user name already exists");
        }else{
          console.error("Error updating profile:",error.response.data.message);
        }

       
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
            <SecurityTab />
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






// Shared Components
