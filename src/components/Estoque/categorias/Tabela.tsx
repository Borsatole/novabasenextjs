import {useEffect, useState } from "react";
import { Button } from "@components/comum/button";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
import { Categoria } from "./tipos";
import { requisicaoGet } from "@services/requisicoes";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { FaEdit, FaTag, FaTrashAlt } from "react-icons/fa";

import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";

import { PrimeraLetraMaiuscula } from "@src/services/funcoes-globais";

import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import ModalEditarRegistro from "./ModalEditarRegistro";
import ModalAdicionarRegistro from "./ModalAdicionarRegistro";
import { CgAddR } from "react-icons/cg";

function Tabela() {

// Estados principais
  const [registros, setRegistros] = useState<Categoria[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Categoria | null>(null);
  
  // Estados de paginação
  const [pagina, setPagina] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(5);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  
  // Estados de controle
  const [relistar, setRelistar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [removendoIds, setRemovendoIds] = useState<number[]>([]);
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);


 // Configuração das colunas da tabela
     const colunas: ColunaConfig<Categoria>[] = [
       {
         key: "nome",
         label: "NOME",
         render: (registro) => PrimeraLetraMaiuscula(registro.nome),
       }

     ];
 
      // Configuração das ações da tabela
       const acoes: AcaoConfig<Categoria>[] = [
         {
           icon: <FaEdit className="w-5 h-5 cursor-pointer" />,
           tooltip: "Editar",
           onClick: (registro) => setSelectedProduto(registro),
         },
         {
           icon: <FaTrashAlt className="w-5 h-5 cursor-pointer" />,
           tooltip: "Deletar", 
           onClick: (registro) =>
            handleDeletar({
              registro,
              setRelistar,
              endpoint: "/Estoque/categoria/Delete.php"
            }),
         },
       ];
     
       // Função para renderizar o ícone de cada linha
       const iconeItem = () => (
         <div className="bg-[var(--base-color)] rounded-full">
           <FaTag className="w-12 h-12 p-3" color="var(--corPrincipal)" />
         </div>
       );
    
       // Buscar dados da API com filtro
     useEffect(() => {
        setLoadingSpiner(true);
    
    // Constrói parâmetros da URL com filtro
    const params = new URLSearchParams({
      pagina: pagina.toString(),
      limite: limitePorPagina.toString(),
    });
    
    requisicaoGet(`/Estoque/categoria/Read.php?${params.toString()}`)
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
    

    if (loading) return <LoadingSkeleton />;
  return (
    <>

    <div className="flex justify-between">
          <Button onClick={() => setAbrirModalNovoRegistro(true)}>
          <p className="flex items-center gap-2"><CgAddR size={20} />
          <span>Criar Novo</span></p></Button>
    </div>

      <MostrarNumeroDeResultados totalResultados={totalResultados} />

      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<Categoria>
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
    
      
    {selectedProduto && (
        <ModalEditarRegistro
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
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
  )
}

export default Tabela