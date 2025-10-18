interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  min?: string | number;
  max?: string | number;
}

export function Input({
  id,
  type = "text",
  inputRef,
  placeholder = "",
  autoComplete = "off",
  min,
  max,
  required = false,
  value,
  defaultValue,
  className = "",
  ...rest
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      ref={inputRef}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`
        bg-[var(--base-color)] 
        w-full px-4 py-2 
        border border-[var(--base-variant)] 
        rounded-md 
        text-[var(--text-color)] 
        focus:outline-none 
        focus:ring-2 focus:ring-[var(--corPrincipal)]
        transition
        ${className}
      `}
      min={min}
      max={max}
      required={required}
      {...(value !== undefined
        ? { value }
        : { defaultValue: defaultValue ?? "" })}
      {...rest}
    />
  );
}

export interface TextAreaProps {
  id: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  className?: string;
  [key: string]: any;
}

export function TextArea({
  id,
  inputRef,
  placeholder = "",
  autoComplete = "off",
  required = false,
  value,
  defaultValue,
  className = "",
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      ref={inputRef}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`
        bg-[var(--base-color)] 
        min-h-[200px]
        w-full px-4 py-2 
        border border-[var(--base-variant)] 
        rounded-md 
        text-[var(--text-color)] 
        focus:outline-none 
        focus:ring-2 focus:ring-[var(--corPrincipal)]
        transition
        resize-y
        ${className}
      `}
      required={required}
      {...(value !== undefined
        ? { value }
        : { defaultValue: defaultValue ?? "" })}
      {...rest}
    />
  );
}

