import { useState } from "react";

interface IInput {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ label, type, placeholder, value, onChange }: IInput) {
  const [isTouched, setIsTouched] = useState(true);
  return (
    <>
      <label
        className={`${
          value === "" && !isTouched ? "text-red-600" : "text-white"
        } font-light duration-300`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`${
          value === "" && !isTouched
            ? "border-red-600 focus:outline-red-600"
            : "focus:outline-none"
        } mt-1 text-lg border px-2 py-1 rounded-md duration-300`}
        value={value}
        onMouseDown={() => setIsTouched(true)}
        onBlur={() => setIsTouched(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
    </>
  );
}

export default Input;
