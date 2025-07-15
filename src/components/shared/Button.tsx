import React from "react";
import type { IconType } from "react-icons";

interface ButtonProps {
  label: React.ReactNode;
  icon?: IconType;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2 rounded-md transition ${className}`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default Button;
