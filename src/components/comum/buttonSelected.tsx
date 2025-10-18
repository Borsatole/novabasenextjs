import React from "react";

interface BotaoSeletorProps {
  value: string;
  selectedValue: string;
  onClick: (value: string) => void;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const BotaoSeletor: React.FC<BotaoSeletorProps> = ({
  value,
  selectedValue,
  onClick,
  label,
  icon,
  className = ""
}) => {
  const isSelected = selectedValue === value;

  return (
    <button
      onClick={() => onClick(value)}
      className={`cursor-pointer px-4 py-1.5 rounded-lg border-2 transition-all duration-200 flex items-center gap-2 ${
        isSelected
          ? "bg-[var(--corPrincipal)] border-[var(--corPrincipal)] text-[var(--text-white)] shadow-md"
          : "bg-[var(--base-variant)] border-[var(--base-color)] text-[var(--text-color)] hover:border-[var(--corPrincipal)] hover:bg-opacity-80"
      } ${className}`}
    >
      {/* Radio button visual */}
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
        isSelected
          ? "border-white bg-white"
          : "border-[var(--text-color)]"
      }`}>
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-[var(--corPrincipal)]"></div>
        )}
      </div>
      
      {/* Ícone opcional */}
      {icon && icon}
      
      {/* Label */}
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default BotaoSeletor;