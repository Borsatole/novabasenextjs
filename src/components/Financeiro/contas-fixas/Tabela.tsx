import { useEffect, useState } from "react";

import { MdAttachMoney } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { Valores } from "@src/services/funcoes-globais";

import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";


import { FaEdit, FaTrashAlt } from "react-icons/fa";
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { requisicaoGet } from "@services/requisicoes";
import { ContaFixa } from "./tipos";

import { Button } from "@components/comum/button";
import ModalEditarProduto from "./ModalEditarProduto";
import ModalAdicionarRegistro from "./ModalAdicionarProduto";


import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";

function TabelaContasFixas({}) {
  const { dinheiro } = Valores();

    const [registros, setRegistros] = useState<ContaFixa[]>([]);
    const [selectedProduto, setSelectedProduto] = useState<ContaFixa | null>(null);
    const [pagina, setPagina] = useState(1);
    const [relistar, setRelistar] = useState(false);
    const [queryFiltro, setQueryFiltro] = useState("");
  
    // Parâmetros de paginação
    const [limitePorPagina, setLimitePorPagina] = useState(7);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [totalResultados, setTotalResultados] = useState(0);
  
    const [loading, setLoading] = useState(true);
    const [loadingSpiner, setLoadingSpiner] = useState(true);
    const [removendoIds, setRemovendoIds] = useState<number[]>([]);
    const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);

  // Configuração das colunas da tabela
    const colunas: ColunaConfig<ContaFixa>[] = [
      {
        key: "nome",
        label: "NOME",
        render: (registro) => PrimeraLetraMaiuscula(registro.nome),
      },
      {
        key: "recorrencia", 
        label: "RECORRENCIA",
        render: (registro) => 
        <div className="flex uppercase text-[var(--corPrincipal)] font-normal  items-center 
        justify-center gap-2 border-1 p-1 border-[var(--corPrincipal)] rounded-lg">
        {`A cada ${registro.recorrencia} 
        ${registro.recorrencia === 1 ? "mes" : "meses"}`
        }
        </div>,
      },
      {
        key: "valor",
        label: "VALOR",
        render: (registro) => dinheiro(registro.valor),
      },
      
    ];

     // Configuração das ações da tabela
      const acoes: AcaoConfig<ContaFixa>[] = [
        {
          icon: <FaEdit className="w-5 h-5 cursor-pointer" />,
          tooltip: "Editar",
          onClick: (registro) => setSelectedProduto(registro),
        },
        {
          icon: <FaTrashAlt className="w-5 h-5 cursor-pointer" />,
          tooltip: "Deletar", 
          onClick: (registro) => handleDeletar({registro, setRelistar, endpoint: "/Financeiro/contas-a-pagar/contas-fixas/Delete.php"}),
        },
      ];
    
      // Função para renderizar o ícone de cada linha
      const iconeItem = () => (
        <div className="bg-[var(--base-color)] rounded-full">
          <MdAttachMoney className="w-12 h-12 p-3" color="var(--corPrincipal)" />
        </div>
      );

  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(`/Financeiro/contas-a-pagar/contas-fixas/Read.php?pagina=${pagina}&limite=${limitePorPagina}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.Registros);
          setTotalResultados(response.data.total_registros);
          setTotalPaginas(response.data.total_paginas);
        }
        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);

      });

  }, [pagina, limitePorPagina, relistar]);

 

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

  if (loading) return <LoadingSkeleton />;


  return (
    <>
      <div className="flex justify-between">

          <Button onClick={() => setAbrirModalNovoRegistro(true)}>
            <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span>
          </p>
          </Button>

       

        
      </div>

      <MostrarNumeroDeResultados totalResultados={totalResultados} />

      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<ContaFixa>
          dados={registros}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          removendoIds={removendoIds}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum cadastro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />
      </LoadingSpiner>

      {/* Rodapé da tabela */}
      <Rodape
        pagina={pagina}
        limitePorPagina={limitePorPagina}
        registros={registros}
        totalResultados={totalResultados}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
        setLimitePorPagina={setLimitePorPagina}
      />

      {selectedProduto !== null && (
      <ModalEditarProduto
        selectedProduto={selectedProduto}
        setSelectedProduto={setSelectedProduto}
        registros={registros}
        setRegistros={setRegistros}
        setRelistar={setRelistar}
        setLoadingSpiner={setLoadingSpiner}
      />
)}

    {AbrirModalNovoRegistro === true &&
    <ModalAdicionarRegistro
        AbrirModalNovoRegistro={AbrirModalNovoRegistro}
        setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
        registros={registros}
        setRegistros={setRegistros}
        setRelistar={setRelistar}
        setLoadingSpiner={setLoadingSpiner}
      />
      }

    </>
  );
}

export default TabelaContasFixas;
