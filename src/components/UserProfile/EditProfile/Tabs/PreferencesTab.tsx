import { FaBell, FaEnvelope } from "react-icons/fa";

import { ToggleSwitch } from "../Components/ToggleSwitch";
import { SelectInput } from "../Components/SelectInput";
import { UserFormData } from "@/types/users";

export function PreferencesTab({
  data,
  onChange,
}: {
  data:UserFormData["preferences"];
  onChange: (field: string, value: boolean | string) => void;
}) {
  console.log(data);
  
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
