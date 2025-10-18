import { useEffect, useState } from "react";
import { Button } from "@components/comum/button";
// import {  Registros } from "./tipos";
import { Condominio, Notificacao } from "@src/components/tipos";

import { requisicaoGet } from "@services/requisicoes";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { RiHotelFill } from "react-icons/ri";


import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";

import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import ModalEditarRegistro from "./ModalEditarRegistro";
// import ModalAdicionarRegistro from "./ModalAdicionarRegistro";
import { CgAddR } from "react-icons/cg";



function Tabela() {

  // Estados principais
  const [registros, setRegistros] = useState<Condominio[]>([]);

  const [selectedProduto, setSelectedProduto] = useState<Condominio | null>(null);

  // Estados de paginação
  const [totalResultados, setTotalResultados] = useState(0);


  // Estados de controle
  const [relistar, setRelistar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [removendoIds, setRemovendoIds] = useState<number[]>([]);
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);



  // Buscar dados da API com filtro
  useEffect(() => {
    setLoadingSpiner(true);

    // Constrói parâmetros da URL com filtro
    const params = new URLSearchParams({
      
    });

    requisicaoGet(`/condominios/Read.php?${params.toString()}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.Registros);
          setTotalResultados(response.data.total_registros);
        }

        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });
  }, [relistar]);


  if (loading) return <LoadingSkeleton />;
  return (
    <>

      {/* <div className="flex justify-between">
        <Button onClick={() => setAbrirModalNovoRegistro(true)}>
          <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span></p></Button>
      </div> */}

      <MostrarNumeroDeResultados totalResultados={totalResultados} />

      <LoadingSpiner loading={loadingSpiner}>
  <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 mt-3">
    {registros
      .slice() // copia para não alterar o state original
      .sort((a, b) => Number(b.notificacoes ?? 0) - Number(a.notificacoes ?? 0))


      .map((registro) => (
        <CardCondominio
          setSelectedProduto={setSelectedProduto}
          key={registro.id}
          Registro={registro}
        />
      ))}
  </div>
</LoadingSpiner>



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



      {/* {AbrirModalNovoRegistro && (
        <ModalAdicionarRegistro
          AbrirModalNovoRegistro={AbrirModalNovoRegistro}
          setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )} */}





    </>
  )
}

export default Tabela


interface CardCondominio {
  Registro: Condominio;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Condominio | null>>;
}

import { Badge, Card, Dropdown, DropdownItem } from "flowbite-react";
import { MaxCaracteres } from "@src/services/funcoes-globais";

export function CardCondominio({
  Registro,
  setSelectedProduto
}: CardCondominio) {

  return (
      <Card className="min-w-[180px] bg-[var(--base-variant)] 
    border-2 border-[var(--base-color)]">
      <div >
      <div className="flex flex-col items-center">
        <RiHotelFill fill="var(--corPrincipal)" size={50} />

        <h5 className="mb-1 text-xl font-medium ">{Registro.nome}</h5>

        <span className="text-sm text-[var(--text-color)]/50">{
        MaxCaracteres(String(Registro.rua), 25)
        }</span>

        <div className="mt-4 flex flex-col justify-center items-center gap-2 ">
          {Number(Registro.notificacoes ?? 0) > 0 && (
  <Button
    className="flex items-center"
    onClick={() => setSelectedProduto(Registro)}
  >
    Chamados
    <Badge
      className="ms-2 
        bg-[var(--base-variant)] hover:bg-[var(--base-variant)]
        text-[var(--text-color)] 
        rounded-full px-1.5"
    >
      {Number(Registro.notificacoes)}
    </Badge>
  </Button>
)}
          
          
          <a href="#" className="flex 
          items-center 
          text-[var(--text-color)]/50
          " onClick={() => setSelectedProduto(Registro)}>Ver Informaçoes</a>

        </div>
      </div>
      </div>
      </Card>
  );
}
