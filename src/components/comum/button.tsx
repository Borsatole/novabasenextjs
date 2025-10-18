import { Spinner } from "flowbite-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  wsize?: string;
  loading?: boolean;
}

export function Button({
  children,
  type = "button",
  onClick,
  loading,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled} 
      onClick={onClick || (() => {})}
      className={`${className || ""} text-white px-4 min-h-10 min-w-[150px] py-2 mt-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
        isDisabled 
          ? "opacity-50 cursor-not-allowed bg-[var(--corPrincipal)]"
          : "bg-[var(--corPrincipal)] hover:bg-[var(--corPrincipalHover)]"
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center max-h-6 scale-65">
          <Spinner size="xl" className="fill-[var(--corPrincipalHover)]" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}