import { useEffect, useState } from "react";


// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { Permissoes } from "@src/components/tipos";

// FUNCOES
import { Datas, Valores } from "@src/services/funcoes-globais";
import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";

// TABELA
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
import ModalEditarProduto from "./EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";
import { FiltroCadastros } from "./FiltroRegistro";


function Tabela() {
  const { dataFormatada, dataDeHoje } = Datas();
  const { dinheiro } = Valores();
  
  const [registros, setRegistros] = useState<Permissoes[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Permissoes | null>(null);
  const [pagina, setPagina] = useState(1);
  const [relistar, setRelistar] = useState(true);
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
  const colunas: ColunaConfig<Permissoes>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) => PrimeraLetraMaiuscula(registro.nome),
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<Permissoes>[] = [
    {
      icon: <div className="cursor-pointer">{getIcon("editar", 20)}</div>,
      tooltip: "Editar",
      onClick: (registro) => setSelectedProduto(registro),
    },
    {
      icon: <div className="cursor-pointer">{getIcon("deletar", 20)}</div>,
      tooltip: "Excluir",
      onClick: (registro) => handleDeletar({registro, setRelistar, endpoint: `/papeis/${registro.id}`}),
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("permissoes", 25)}
    </div>
  );


  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(`/papeis?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.Registros);
          setTotalResultados(response.data.paginacao.total);
          setTotalResultados(response.data.paginacao.total);
          setTotalPaginas(response.data.paginacao.ultimaPagina);
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
            {getIcon("adicionar", 20)}
            <span>Criar Nivel</span>
          </p>
        </Button>
      </div>

      {/* Filtros e contadores */}
      {/* <FiltroCadastros onFiltrar={setQueryFiltro}/> */}
      <MostrarNumeroDeResultados totalResultados={totalResultados} />


      

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<Permissoes>
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
      {totalResultados > limitePorPagina && (
        <Rodape
        pagina={pagina}
        limitePorPagina={limitePorPagina}
        registros={registros}
        totalResultados={totalResultados}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
        setLimitePorPagina={setLimitePorPagina}
      />
      )}
      

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

export default Tabela;