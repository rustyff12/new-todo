import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  tooltipContent?: React.ReactNode;
}

function PasswordInput({
  name,
  value,
  onChange,
  placeholder = "Password",
  label = "Password",
  tooltipContent,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded px-3 py-2 pr-20"
        />

        {/* Toggle password visibility */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

        {/* Optional Tooltip Icon */}
        {tooltipContent && (
          <>
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm cursor-pointer select-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip((prev) => !prev)} // Mobile support
            >
              ℹ️
            </span>

            {showTooltip && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded shadow-md text-black text-sm p-3 z-10">
                {tooltipContent}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
