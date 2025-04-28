
export function InputField({
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