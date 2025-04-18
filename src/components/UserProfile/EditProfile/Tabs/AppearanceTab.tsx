import { FaCheckCircle } from "react-icons/fa";
import { FormData } from "../EditProfile";

 export function AppearanceTab({
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
  
  
      </div>
    );
  }








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
  
