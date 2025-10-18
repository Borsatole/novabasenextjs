import "./Loading.css";
// import Prototypes from "prop-types";
import * as React from "react";

interface LoadingProps {
  color?: string ;
  escala?: number | string;
}

export default function Loading({ color = "#ffffff", escala = "1" }: LoadingProps) {
  return (

    <div className="loader" style={{
      color: `${color}`,
      
      
    }}></div>

  );
}
