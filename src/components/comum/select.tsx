import * as React from "react";
import { Select } from "flowbite-react";
import type { SelectProps } from "flowbite-react";

interface SelectModificadoProps extends SelectProps {
  children: React.ReactNode;
}

export const SelectModificado = React.forwardRef<
  HTMLSelectElement,
  SelectModificadoProps
>(({ children, className, ...rest }, ref) => {
  return (
    <Select
      ref={ref}
      name="select"
      id="select"
      {...rest}
      className={`${className ?? ""} focus:ring-corPrincipal focus:ring-2 focus:ring-offset-0 focus:outline-none`}
      style={{
        color: "var(--cortexto)",
        borderColor: "var(--base-variant)",
        backgroundColor: "var(--base-color)",
      }}
    >
      {children}
    </Select>
  );
});

SelectModificado.displayName = "SelectModificado";
