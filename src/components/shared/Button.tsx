/* ----------  src/components/shared/Button.tsx  ---------- */
import React from "react";
import type { IconType } from "react-icons";

/* extend the native <button> props  */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  icon?: IconType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  className = "",
  /* pull out the props you care about, keep the rest in …rest */
  disabled,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...rest}                                         
      className={`inline-flex items-center gap-2
        bg-blue-700 hover:bg-blue-800
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        text-white text-sm font-medium px-5 py-2 rounded-md transition
        ${className}`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default Button;
