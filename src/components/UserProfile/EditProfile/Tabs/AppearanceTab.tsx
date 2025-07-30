import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { UserFormData } from "@/types/users";

 export function AppearanceTab({
    data,
    onChange,
  }: {
    data: UserFormData["appearance"];
    onChange: (field: string, value: string) => void;
  }) {
    const themes = [
      {
        id: "cyberpunk",
        name: "Cyberpunk",
        gradient: "from-[#111] via-[#0ef]/20 to-black",
        color:" #0ef"

      },
      {
        id: "synthwave",
        name: "Synthwave",
        gradient: "from-purple-900 via-pink-600 to-black",
        color: '#f72585',
      },
      {
        id: "dark",
        name: "Dark Mode",
        gradient: "from-gray-800 via-gray-700 to-black",
        color: '#888',
      },
      {
        id: "matrix",
        name: "Matrix",
        gradient: "from-green-900 via-green-700 to-black",
        color: '#00ff00',
      },
    ];
  
  useEffect(()=>{
    
    return changeTheme(data.theme)
  },[])
    const changeTheme=(themeId:string)=>{
      const selected=themes.find((t)=>t.id==themeId)
      if(selected?.color){
        console.log("bg-color changed to ",selected.color);
        
        document.documentElement.style.setProperty("--neon-blue",selected.color)
      }
      
      onChange("theme", themeId)
      
    }
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                selected={data.theme === theme.id }
                onSelect={() =>changeTheme(theme.id)}
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
  
