import React from "react";

interface CardMetric {
  label: string;
  value: string;
}

interface CardChange {
  value: string;
  isPositive: boolean;
}

interface IndicatorCardProps {
  title?: string;
  value?: string;
  description?: string;
  icon?: React.ReactNode;
  color?: "padrao" | "blue" | "green" | "purple" | "orange" | "red";
  change?: CardChange;
  metric?: CardMetric;
  className?: string;
}

export function Card({
  title,
  value,
  description,
  icon,
  color = "padrao",
  change,
  metric,
  className = "",
}: IndicatorCardProps) {
  const colorClasses = {
    padrao: {
      border: "before:bg-[var(--corPrincipal)]",
      iconBg: "bg-[var(--corPrincipal)]/10",
      iconColor: "text-[var(--corPrincipal)]",
    },
    blue: {
      border: "before:bg-blue-600",
      iconBg: "bg-blue-600/10",
      iconColor: "text-blue-600",
    },
    green: {
      border: "before:bg-emerald-500",
      iconBg: "bg-emerald-500/10", 
      iconColor: "text-emerald-500",
    },
    purple: {
      border: "before:bg-violet-500",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    orange: {
      border: "before:bg-amber-500",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    red: {
      border: "before:bg-rose-500",
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-500",
    },
  };

  return (
    <div
      className={`
        relative cursor-pointer text-left bg-[var(--base-variant)] overflow-hidden rounded-2xl p-6 shadow-lg
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        before:absolute before:left-0 before:top-0 before:h-full before:w-1
        before:transition-all before:duration-300
        hover:before:w-1.5 
        ${colorClasses[color].border}
        ${className}
      `}
      
    >
      {/* Header: ícone + título */}
      {(icon || title) && (
        <div className="flex items-center mb-5">
          {icon && (
            <div
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center mr-4
                ${colorClasses[color].iconBg} ${colorClasses[color].iconColor}
              `}
            >
              <div className="text-2xl">{icon}</div>
            </div>
          )}
          {title && (
            <h3 className="text-base font-semibold m-0">{title}</h3>
          )}
        </div>
      )}

      {/* Valor principal */}
      {value && (
        <h2 className="text-3xl font-bold text-left tracking-tight mb-2 m-0 leading-none">
          {value}
        </h2>
      )}

      {/* Variação */}
      {change && (
        <div
          className={`
            flex items-center text-sm font-medium mb-5
            ${change.isPositive ? "text-emerald-500" : "text-red-500"}
          `}
        >
          {change.isPositive ? (
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
          <span>{change.value}</span>
        </div>
      )}

      {/* Descrição */}
      {description && (
        <p className="text-slate-500 text-left text-sm leading-relaxed m-0 mb-0">
          {description}
        </p>
      )}

      {/* Métrica extra */}
      {metric && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500 mb-1">{metric.label}</div>
          <div className="text-base font-semibold text-slate-800 m-0">
            {metric.value}
          </div>
        </div>
      )}
    </div>
  );
}

