

export function ToggleSwitch({
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
  