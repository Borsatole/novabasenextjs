
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode ;
  htmlFor?: string;
}

export function Label({ children, htmlFor, ...rest }: LabelProps) {
  return (
    <label
      className="block text-sm font-bold mb-2 text-left"
      htmlFor={htmlFor || ""}
      {...rest}
    >
      {children || ""}
    </label>
  );
}
