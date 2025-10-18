import React, { ReactNode } from "react";
import { ThemeProvider, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Tooltip from "@components/tooltip/tooltipwrapper";
import { Rodape } from "./tabelas";

// Tipos genéricos para flexibilidade
export interface ColunaConfig<T = any> {
  key: string;
  label: string;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface AcaoConfig<T = any> {
  icon: ReactNode;
  tooltip: string;
  onClick: (item: T) => void;
  className?: string;
  show?: (item: T) => boolean;
}

interface TabelaDinamicaProps<T = any> {
  // Dados da tabela
  dados: T[];
  colunas: ColunaConfig<T>[];
  
  
  // Configurações visuais
  iconeItem?: (item: T) => ReactNode;
  className?: string;
  
  // Ações (editar, deletar, etc.)
  acoes?: AcaoConfig<T>[];
  
  // Estados para animações
  removendoIds?: (string | number)[];
  keyExtractor?: (item: T, index: number) => string | number;
  
  // Mensagem quando vazio
  mensagemVazia?: string;
  
  // Props customizadas
  customTheme?: any;
  mostrarAcoes?: boolean;
}

function TabelaDinamica<T = any>({
  dados,
  colunas,
  iconeItem,
  className = "",
  acoes = [],
  removendoIds = [],
  keyExtractor = (item: any, index: number) => item?.id ?? index,
  mensagemVazia = "Nenhum cadastro encontrado",
  mostrarAcoes = true,
  
}: TabelaDinamicaProps<T>) {

  const defaultTheme = {
    table: {
      root: {
        base: "w-full text-left text-sm text-[var(--text-color)] bg-[var(--base-variant)]",
        shadow: "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
        wrapper: "relative",
      },
      body: {
        base: "group/body",
        cell: {
          base:
            "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
        },
      },
      head: {
        base: "group/head text-xs uppercase",
        cell: {
          base: "text-[var(--text-color)] bg-[var(--base-variant)] px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
        },
      },
      row: {
        base: "group/row",
        striped: "text-[var(--text-color)] bg-[var(--base-variant)]odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
      },
    },
  };

  const theme = defaultTheme;
  const totalColunas = colunas.length + (iconeItem ? 1 : 0) + (mostrarAcoes && acoes.length > 0 ? 1 : 0);

  return (
    <div className="w-full overflow-x-auto">
      <ThemeProvider theme={theme}>
        <Table className={`w-full text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg ${className}`}>
          <TableHead>
            <TableRow>
              {/* Coluna do ícone se existir */}
              {iconeItem && <TableHeadCell>ÍCONE</TableHeadCell>}
              
              {/* Colunas dinâmicas */}
              {colunas.map((coluna) => (
                <TableHeadCell 
                  key={coluna.key}
                  className={coluna.headerClassName}
                >
                  {coluna.label}
                </TableHeadCell>
              ))}
              
              {/* Coluna de ações se existir */}
              {mostrarAcoes && acoes.length > 0 && (
                <TableHeadCell>AÇÕES</TableHeadCell>
              )}
            </TableRow>
          </TableHead>
          
          <TableBody className="divide-y divide-[var(--base-color)]">
            {/* Mensagem quando vazio */}
            {dados.length === 0 && (
              <TableRow>
                <TableCell colSpan={totalColunas} className="text-center">
                  {mensagemVazia}
                </TableCell>
              </TableRow>
            )}

            {/* Linhas de dados */}
            {dados.map((item, index) => {
              const key = keyExtractor(item, index);
              const isRemoving = removendoIds.includes(key);

              return (
                <TableRow
                  key={String(key)}
                  className={`transition-all duration-500 ease-in-out ${
                    isRemoving ? "efeito-excluir" : ""
                  }`}
                >
                  {/* Célula do ícone */}
                  {iconeItem && (
                    <TableCell className="whitespace-nowrap text-center flex items-center justify-center">
                      {iconeItem(item)}
                    </TableCell>
                  )}

                  {/* Células dinâmicas */}
                  {colunas.map((coluna) => (
                    <TableCell
                      key={coluna.key}
                      className={`whitespace-nowrap font-medium ${coluna.className || ""}`}
                    >
                      {coluna.render 
                        ? coluna.render(item, index)
                        : String((item as any)[coluna.key] || "")
                      }
                    </TableCell>
                  ))}

                  {/* Célula de ações */}
                  {mostrarAcoes && acoes.length > 0 && (
                    <TableCell className="font-medium">
                      <div className="flex justify-center gap-2">
                        {acoes.map((acao, acaoIndex) => {
                          // Verifica se a ação deve ser mostrada
                          if (acao.show && !acao.show(item)) return null;

                          return (
                            <Tooltip key={acaoIndex} tooltip={acao.tooltip}>
                              <button
                                className={`bg-[var(--base-color)] p-2 rounded-lg text-[var(--text-color)] ${acao.className || ""}`}
                                onClick={() => acao.onClick(item)}
                              >
                                {acao.icon}
                              </button>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      
      </ThemeProvider>
    </div>
  );
}

export default TabelaDinamica;