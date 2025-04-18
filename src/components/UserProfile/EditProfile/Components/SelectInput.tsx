
 export function SelectInput({
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