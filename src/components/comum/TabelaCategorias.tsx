import React from "react";
import { Button } from "@components/comum/button";
import { CgAddR } from "react-icons/cg";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ThemeProvider, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Tooltip from '@components/tooltip/tooltipwrapper';
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";
import { Categoria } from "@components/tipos";

interface TabelaCategoriasProps {
  // Dados
  categorias: Categoria[];
  loading?: boolean;
  
  // Configuração visual
  titulo: string;
  subtitulo?: string;
  corTema: 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'indigo' | 'pink' | 'yellow';
  icone: React.ReactNode;
  
  // Textos personalizáveis
  textoBotaoAdicionar?: string;
  textoVazio?: string;
  textoDescricaoVazia?: string;
  
  // Callbacks
  onAdicionarCategoria: () => void;
  onEditarCategoria: (categoria: Categoria) => void;
  onDeletarCategoria: (categoria: Categoria) => void;
  
  // Configurações opcionais
  maxHeight?: string;
  mostrarIndice?: boolean;
  className?: string;
}

const TabelaPersonalizada: React.FC<TabelaCategoriasProps> = ({
  categorias,
  loading = false,
  titulo,
  subtitulo,
  corTema,
  icone,
  textoBotaoAdicionar = "Nova Categoria",
  textoVazio = "Nenhuma categoria cadastrada",
  textoDescricaoVazia = "Comece adicionando sua primeira categoria",
  onAdicionarCategoria,
  onEditarCategoria,
  onDeletarCategoria,
  maxHeight = "50vh",
  mostrarIndice = false,
  className = ""
}) => {
  
  // Configurações de cores baseadas no tema
  const coresConfig = {
    red: {
      gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      border: "border-red-200/50 dark:border-red-700/50",
      iconeBg: "bg-red-500",
      titulo: "text-red-700 dark:text-red-300",
      subtitulo: "text-red-600 dark:text-red-400",
      botao: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      headerTabela: "bg-red-500/10 dark:bg-red-900/20",
      headerTexto: "text-red-700 dark:text-red-300",
      hover: "hover:bg-red-50 dark:hover:bg-red-900/10",
      iconeCategoria: "from-red-400 to-red-600",
      vazioIcone: "bg-red-100 dark:bg-red-900/30 text-red-400"
    },
    green: {
      gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      border: "border-green-200/50 dark:border-green-700/50",
      iconeBg: "bg-green-500",
      titulo: "text-green-700 dark:text-green-300",
      subtitulo: "text-green-600 dark:text-green-400",
      botao: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      headerTabela: "bg-green-500/10 dark:bg-green-900/20",
      headerTexto: "text-green-700 dark:text-green-300",
      hover: "hover:bg-green-50 dark:hover:bg-green-900/10",
      iconeCategoria: "from-green-400 to-green-600",
      vazioIcone: "bg-green-100 dark:bg-green-900/30 text-green-400"
    },
    blue: {
      gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      border: "border-blue-200/50 dark:border-blue-700/50",
      iconeBg: "bg-blue-500",
      titulo: "text-blue-700 dark:text-blue-300",
      subtitulo: "text-blue-600 dark:text-blue-400",
      botao: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      headerTabela: "bg-blue-500/10 dark:bg-blue-900/20",
      headerTexto: "text-blue-700 dark:text-blue-300",
      hover: "hover:bg-blue-50 dark:hover:bg-blue-900/10",
      iconeCategoria: "from-blue-400 to-blue-600",
      vazioIcone: "bg-blue-100 dark:bg-blue-900/30 text-blue-400"
    },
    purple: {
      gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      border: "border-purple-200/50 dark:border-purple-700/50",
      iconeBg: "bg-purple-500",
      titulo: "text-purple-700 dark:text-purple-300",
      subtitulo: "text-purple-600 dark:text-purple-400",
      botao: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      headerTabela: "bg-purple-500/10 dark:bg-purple-900/20",
      headerTexto: "text-purple-700 dark:text-purple-300",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-900/10",
      iconeCategoria: "from-purple-400 to-purple-600",
      vazioIcone: "bg-purple-100 dark:bg-purple-900/30 text-purple-400"
    },
    orange: {
      gradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      border: "border-orange-200/50 dark:border-orange-700/50",
      iconeBg: "bg-orange-500",
      titulo: "text-orange-700 dark:text-orange-300",
      subtitulo: "text-orange-600 dark:text-orange-400",
      botao: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      headerTabela: "bg-orange-500/10 dark:bg-orange-900/20",
      headerTexto: "text-orange-700 dark:text-orange-300",
      hover: "hover:bg-orange-50 dark:hover:bg-orange-900/10",
      iconeCategoria: "from-orange-400 to-orange-600",
      vazioIcone: "bg-orange-100 dark:bg-orange-900/30 text-orange-400"
    },
    indigo: {
      gradient: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      border: "border-indigo-200/50 dark:border-indigo-700/50",
      iconeBg: "bg-indigo-500",
      titulo: "text-indigo-700 dark:text-indigo-300",
      subtitulo: "text-indigo-600 dark:text-indigo-400",
      botao: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      headerTabela: "bg-indigo-500/10 dark:bg-indigo-900/20",
      headerTexto: "text-indigo-700 dark:text-indigo-300",
      hover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/10",
      iconeCategoria: "from-indigo-400 to-indigo-600",
      vazioIcone: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-400"
    },
    pink: {
      gradient: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20",
      border: "border-pink-200/50 dark:border-pink-700/50",
      iconeBg: "bg-pink-500",
      titulo: "text-pink-700 dark:text-pink-300",
      subtitulo: "text-pink-600 dark:text-pink-400",
      botao: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
      headerTabela: "bg-pink-500/10 dark:bg-pink-900/20",
      headerTexto: "text-pink-700 dark:text-pink-300",
      hover: "hover:bg-pink-50 dark:hover:bg-pink-900/10",
      iconeCategoria: "from-pink-400 to-pink-600",
      vazioIcone: "bg-pink-100 dark:bg-pink-900/30 text-pink-400"
    },
    yellow: {
      gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
      border: "border-yellow-200/50 dark:border-yellow-700/50",
      iconeBg: "bg-yellow-500",
      titulo: "text-yellow-700 dark:text-yellow-300",
      subtitulo: "text-yellow-600 dark:text-yellow-400",
      botao: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
      headerTabela: "bg-yellow-500/10 dark:bg-yellow-900/20",
      headerTexto: "text-yellow-700 dark:text-yellow-300",
      hover: "hover:bg-yellow-50 dark:hover:bg-yellow-900/10",
      iconeCategoria: "from-yellow-400 to-yellow-600",
      vazioIcone: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-400"
    }
  };

  const cores = coresConfig[corTema];

  const customTheme = {
    table: {
      root: {
        base: "w-full text-left text-sm text-[var(--text-color)] bg-[var(--base-variant)]",
        shadow: "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
        wrapper: "relative",
      },
      body: {
        base: "group/body",
        cell: {
          base: "px-4 py-3 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
        },
      },
      head: {
        base: "group/head text-xs uppercase",
        cell: {
          base: "px-4 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
        },
      },
      row: {
        base: "group/row",
      },
    },
  };

  return (
    <div className={`bg-gradient-to-br ${cores.gradient} rounded-xl p-6 shadow-xl border ${cores.border} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`${cores.iconeBg} rounded-full p-3 shadow-lg`}>
            <div className="text-white text-2xl">
              {icone}
            </div>
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${cores.titulo}`}>
              {titulo}
            </h2>
            {subtitulo && (
              <p className={`${cores.subtitulo} text-sm`}>
                {subtitulo}
              </p>
            )}
          </div>
        </div>
        <Button 
          onClick={onAdicionarCategoria}
          className={`bg-gradient-to-r ${cores.botao} shadow-lg transform hover:scale-105 transition-all duration-200`}
        >
          <div className="flex items-center gap-2">
            <CgAddR size={20} />
            <span className="font-medium">{textoBotaoAdicionar}</span>
          </div>
        </Button>
      </div>

      {/* Tabela */}
      <LoadingSpiner loading={loading}>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/20">
          {categorias.length === 0 ? (
            <div className="p-12 text-center">
              <div className={`${cores.vazioIcone} rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4`}>
                <div className="text-4xl">
                  {icone}
                </div>
              </div>
              <h3 className="text-lg font-semibold ">
                {textoVazio}
              </h3>
              <p className="">
                {textoDescricaoVazia}
              </p>
            </div>
          ) : (
            <div className={`overflow-y-auto`} style={{ maxHeight }}>
              <ThemeProvider >
                <Table className="w-full">
                  <TableHead>
                    <TableRow className={`${cores.headerTabela}`}>
                      {mostrarIndice && (
                        <TableHeadCell className={`${cores.headerTexto} font-bold`}>#</TableHeadCell>
                      )}
                      <TableHeadCell className={`${cores.headerTexto} font-bold`}>ÍCONE</TableHeadCell>
                      <TableHeadCell className={`${cores.headerTexto} font-bold`}>CATEGORIA</TableHeadCell>
                      <TableHeadCell className={`${cores.headerTexto} font-bold`}>AÇÕES</TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categorias.map((categoria, index) => (
                      <TableRow
                        key={String(categoria.id ?? `sem-id-${index}`)}
                        className={`transition-all duration-300 ${cores.hover} hover:shadow-md group`}
                      >
                        {mostrarIndice && (
                          <TableCell className="font-bold ">
                            {index + 1}
                          </TableCell>
                        )}
                        
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <div className={`bg-gradient-to-br ${cores.iconeCategoria} rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                              <div className="w-6 h-6 text-white flex items-center justify-center">
                                {icone}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="font-semibold text-lg">
                          {PrimeraLetraMaiuscula(categoria.nome)}
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-center gap-3">
                            <Tooltip tooltip="Editar Categoria">
                              <button
                                className="bg-gradient-to-r from-[var(--corPrincipal)] to-[var(--corPrincipal)]/70
                                cursor-pointer
                                hover:bg-gradient-to-r hover:from-[var(--corPrincipal)] hover:to-[var(--corPrincipal)]  p-3 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                                onClick={() => onEditarCategoria(categoria)}
                              >
                                <FaEdit className="w-5 h-5" />
                              </button>
                            </Tooltip>
                            <Tooltip tooltip="Deletar Categoria">
                              <button
                                className="bg-gradient-to-r from-[var(--corPrincipal)] to-[var(--corPrincipal)]/70
                                cursor-pointer
                                hover:bg-gradient-to-r hover:from-[var(--corPrincipal)] hover:to-[var(--corPrincipal)] p-3 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                                onClick={() => onDeletarCategoria(categoria)}
                              >
                                <FaTrashAlt className="w-5 h-5" />
                              </button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ThemeProvider>
            </div>
          )}
        </div>
      </LoadingSpiner>
    </div>
  );
};

export default TabelaPersonalizada;