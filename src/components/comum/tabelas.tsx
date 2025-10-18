import * as React from "react";
import { Button } from "./button";
import {gerarPaginas} from "@services/funcoes-globais";


type ChildrenProps = {
  children: React.ReactNode;
} & React.TableHTMLAttributes<HTMLTableElement>;

export function Tabela({ children, ...rest }: ChildrenProps) {
  return (
    <table
      className="min-w-full text-center shadow-lg rounded-lg border border-[var(--base-variant)] border-collapse"
      {...rest}
    >
      {children}
    </table>
  );
}



type LinhaTabelaProps = {
  children: React.ReactNode;
  tipo?: string;
} & React.HTMLAttributes<HTMLTableRowElement>;

export function LinhaTabela({ children, tipo = "", ...rest }: LinhaTabelaProps) {
  if (tipo === "body") {
    return (
      <tr className="hover:bg-[var(--base-variant)] text-center transition " {...rest}>
        {children}
      </tr>
    );
  }

  return (
    <tr
      className="bg-[var(--base-variant)] text-[var(--text-color)] text-center uppercase text-sm "
      {...rest}
    >
      {children}
    </tr>
  );
}


type CelulaTabelaProps = {
  children: React.ReactNode;
  tipo?: string;
  colspan?: number;
} & React.HTMLAttributes<HTMLTableCellElement>;

export function CelulaTabela({ children, tipo = "body", ...rest }: CelulaTabelaProps) {
  if (tipo !== "body") {
    return (
      <th
        className="px-6 py-3 text-center border border-[var(--base-variant)] "
        {...rest}
      >
        {children}
      </th>
    );
  }
  return (
    <td
      className="px-6 py-4 text-center border-b border-[var(--base-variant)] "
      {...rest}
    >
      {children}
    </td>
  );
}



type ButtonProps = {
  onClick: () => void;
};

export function ButtonEdit({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
      style={{ backgroundColor: "var(--corPrincipal)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </button>
  );
}

export function ButtonDelete({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-white py-2 px-4 rounded mb-4 cursor-pointer transition duration-300"
      style={{ backgroundColor: "var(--corPrincipal)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  );
}


type ButtonDeleteProps = {
  onClick: () => void;
}


interface MostrarNumeroDeResultadosProps {
  totalResultados: number
}
export function MostrarNumeroDeResultados({totalResultados}:MostrarNumeroDeResultadosProps) {
  return (
    <>
    <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-semibold text-[var(--text-color)]">
          ({totalResultados}) resultados encontrados
        </span>
      </div>
    </>
  );
}


interface RodapeProps {
  pagina: number,
  limitePorPagina: number,
  registros: any[],
  totalResultados: number
  totalPaginas: number
  setPagina: React.Dispatch<React.SetStateAction<number>>
  setLimitePorPagina: React.Dispatch<React.SetStateAction<number>>
}
export function Rodape({
  pagina,
  limitePorPagina,
  registros,
  totalResultados,
  totalPaginas,
  setPagina,
  setLimitePorPagina
}:RodapeProps) {
  return (
    <>
      <div className="flex w-full flex-wrap justify-end items-center gap-6 mt-6">
          {((pagina - 1) * limitePorPagina) + registros.length} de {totalResultados}

        <select
          value={limitePorPagina}
          name="limitePorPagina"
          onChange={(e) => setLimitePorPagina(Number(e.target.value))}
          className=" text-sm p-2 border border-[var(--base-variant)] bg-[var(--base-variant)]  text-[var(--text-color)]"
        >
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
              <Button
                onClick={() => setPagina(1)}
                disabled={pagina <= 1}>Primeira</Button>
              
      
              {gerarPaginas(pagina, totalPaginas).map((num) => (
                <Button
                  key={num}
                  onClick={() => setPagina(num)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    num === pagina
                      ? "bg-[var(--corPrincipal)] text-white font-semibold"
                      : "bg-[var(--corPrincipal)] text-[var(--text-white)] opacity-40"
                  }`}
                  >{num}</Button>
              ))}
      
              <Button
                onClick={() => setPagina(totalPaginas)}
                disabled={pagina >= totalPaginas}
              >
                Última
              </Button>
      
        </div>
    </>
  );
}