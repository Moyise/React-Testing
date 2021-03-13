import React from "react";

interface CustomInputProps {
  children: React.ReactNode;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

function CustomInput({ children, value, onChange }: CustomInputProps) {
  return (
    <div>
      <label htmlFor="input">{children}</label>
      <input type="text" value={value} placeholder="Example" onChange={onChange} />
    </div>
  );
}

export default CustomInput;
