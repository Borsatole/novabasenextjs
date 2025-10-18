import { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { FaEdit, FaReadme, FaSafari, FaTrashAlt } from "react-icons/fa";

import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";

import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { requisicaoGet } from "@services/requisicoes";
import { Button } from "@components/comum/button";
import ModalEditarProduto from "./ModalEditarProduto";
import ModalAdicionarRegistro from "./ModalAdicionarProduto";
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";
import { Condominio, Notificacao } from "../tipos";


import { handleDeletar } from "@src/services/Crud";
import { TbMessageCheck } from "react-icons/tb";
import ModalVisualizarProduto from "./ModalVisualizar";

function TabelaRegistros() {
  
  const [registros, setRegistros] = useState<Notificacao[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Notificacao | null>(null);
  const [selectedProdutoVisualizar, setSelectedProdutoVisualizar] = useState<Notificacao | null>(null);
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
  const colunas: ColunaConfig<Notificacao>[] = [
    {
      key: "residencial",
      label: "RESIDENCIAL",
      render: (registro) => registro.nome_condominio,
    },
    {
      key: "chamado", 
      label: "TITULO",
      render: (registro) => PrimeraLetraMaiuscula(registro.titulo),
    },
    {
  key: "situacao",
  label: "SITUAÇÃO",
  render: (registro) => {
    const isAberto = Number(registro.lida) === 0;
    const texto = isAberto ? "Aberto" : "Finalizado";
    const corFundo = isAberto ? "bg-red-100" : "bg-green-100";
    const corTexto = isAberto ? "text-red-800" : "text-green-800";

    return (
      <span
        className={`px-2 py-1 rounded-full font-semibold text-sm ${corFundo} ${corTexto}`}
      >
        {PrimeraLetraMaiuscula(texto)}
      </span>
    );
  },
}

    
    
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<Notificacao>[] = [
    {
      icon: <FaReadme className="w-5 h-5 cursor-pointer" />,
      tooltip: "Visualizar",
      onClick: (registro) => setSelectedProdutoVisualizar(registro),
    },
    {
      icon: <FaEdit className="w-5 h-5 cursor-pointer" />,
      tooltip: "Editar",
      onClick: (registro) => setSelectedProduto(registro),
    },
    {
      icon: <FaTrashAlt className="w-5 h-5 cursor-pointer" />,
      tooltip: "Deletar", 
      onClick: (registro) => handleDeletar({ registro, setRelistar, endpoint: "/condominios/notificacoes/Delete.php" }),
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-full">
      <TbMessageCheck className="w-12 h-12 p-3" color="var(--corPrincipal)"/>

      
    </div>
  );


  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(`/condominios/notificacoes/Read.php?pagina=${pagina}&limite=${limitePorPagina}&${queryFiltro}`)
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
  }, [pagina, limitePorPagina, queryFiltro, relistar]);

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      {/* Botão de criar novo */}
      <div className="flex justify-between">
        <Button onClick={() => setAbrirModalNovoRegistro(true)}>
          <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span>
          </p>
        </Button>
      </div>

      {/* Filtros e contadores */}
      <MostrarNumeroDeResultados totalResultados={totalResultados} />

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<Notificacao>
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

      {/* Modais */}
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

      {selectedProdutoVisualizar !== null && (
        <ModalVisualizarProduto
          selectedProduto={selectedProdutoVisualizar}
          setSelectedProduto={setSelectedProdutoVisualizar}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}

      {AbrirModalNovoRegistro && (
        <ModalAdicionarRegistro
          AbrirModalNovoRegistro={AbrirModalNovoRegistro}
          setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}
    </>
  );
}

export default TabelaRegistros;