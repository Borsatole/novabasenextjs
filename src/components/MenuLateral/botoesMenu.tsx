'use client'

import AbrirMenuIcon from "./Icones/AbrirMenu";
import "./MenuLateral.css";

import { RiContractLeftFill } from "react-icons/ri";


interface BtnAbrirMenuLateralProps {
  abrirMenu?: () => void;
  fecharMenu?: () => void;
  menuAberto?: boolean;

}

export function BtnAbrirMenuLateral(props: BtnAbrirMenuLateralProps) {
  const { abrirMenu = () => {} } = props;
  return (
    <div id="botao-abrir-menu">
      <button
        onClick={abrirMenu}
        className="flex transition-all cursor-pointer"
       style={{ 
        color: "var(--text-color)",

        }}>
        <AbrirMenuIcon />
      </button>
    </div>
  );
}


export function BtnFecharMenuLateral({ funcao = () => {} }) {
  return (
    <button
      id="botao-fechar-menu"
      onClick={() => funcao()}
      className="absolute bg-[var(--base-variant)] opacity-70 text-[var(--text-color)] right-4 top-15 p-2 rounded-full 
                 shadow-lg hover:shadow-xl 
                 transition-all duration-300 
                 cursor-pointer z-300
                 hover:scale-110 hover:-translate-y-0.5"
    >
      <RiContractLeftFill />
    </button>
  );
}

