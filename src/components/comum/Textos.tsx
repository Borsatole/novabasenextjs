import * as React from "react";

interface TextosProps {
  children: React.ReactNode;
}

export function TituloPagina({ children } : TextosProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{children}</h1>
    </div>
  );
}



export function Paragrafo({ children } : TextosProps) {
  return <p className="text-gray-600 mb-4">{children}</p>;
}


export function H2({ children } : TextosProps) {
  return (
    <h2 className="text-2xl font-bold text-left ">
      {children}
    </h2>
  );
}



export function H3({ children } : TextosProps) {
  return (
    <h3 className="text-xl font-bold leading-6 ">
      {children}
    </h3>
  );
}



export function H4({ children } : TextosProps) {
  return <h4 className="text-lg font-semibold mb-2">{children}</h4>;
}

