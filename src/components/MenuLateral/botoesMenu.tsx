"use client";

import AbrirMenuIcon from "./Icones/AbrirMenu";
import { useMenu } from "@/context/MenuContext";
import { RiContractLeftFill } from "react-icons/ri";

export function BtnAbrirMenuLateral() {
  const { abrirMenu } = useMenu();

  return (
    <div id="botao-abrir-menu">
      <button
        onClick={abrirMenu}
        className="flex transition-all cursor-pointer text-[var(--text-color)]"
      >
        <AbrirMenuIcon />
      </button>
    </div>
  );
}


export function BtnFecharMenuLateral() {
  const { fecharMenu } = useMenu();

  return (
    <button
      id="botao-fechar-menu"
      onClick={() => {
        fecharMenu();
      }}
      className="absolute bg-[var(--base-variant)] opacity-70 text-[var(--text-color)] right-4 top-4 p-2 rounded-full
                 shadow-lg hover:shadow-xl
                 transition-all duration-300
                 cursor-pointer z-50
                 hover:scale-110 hover:-translate-y-0.5"
    >
      <RiContractLeftFill />
    </button>
  );
}
