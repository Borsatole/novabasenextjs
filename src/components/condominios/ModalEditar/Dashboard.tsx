import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import TabelaDinamica, { ColunaConfig } from "@src/components/comum/TabelaDinamica";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MostrarNumeroDeResultados } from "@src/components/comum/tabelas";
import { Card } from "@src/components/comum/card";
import { Spinner } from "flowbite-react";
import { Condominio, Visitas } from "@src/components/tipos";




// Props do componente
interface DashboardProps {
  selectedProduto: Condominio;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Condominio | null>>;
  registros: Condominio[];
  setRegistros: React.Dispatch<React.SetStateAction<Condominio[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Dashboard({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setRelistar,
}: DashboardProps) {
  const { primeiroDia, ultimoDia, dataFormataComHora } = Datas();

  const [visitas, setVisitas] = useState<Visitas[]>([]);
  const [relistarVisitas, setRelistarVisitas] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(false);


  // Configuração das colunas da tabela
  const colunas: ColunaConfig<Visitas>[] = [
    {
      key: "entrada",
      label: "ENTRADA",
      render: (visita) => dataFormataComHora(visita.entrada),
    },
    
    {
      key: "saida",
      label: "SAIDA",
      render: (visita) => visita.saida && dataFormataComHora(visita.saida),
    },
    
  ];

    
  
  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-full">
      <FaMapMarkerAlt className="w-12 h-12 p-3" color="var(--corPrincipal)" />
    </div>
  );



  // Busca registro atual
  const registro = registros.find((p) => p.id === selectedProduto?.id);




  // Early return se não há registro
  if (!registro) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <span>Nenhum registro selecionado</span>
      </div>
    );
  }

  // Buscar dados da API com filtro
  useEffect(() => {
  if (!registro) return; 

  setLoadingSpiner(true);

  const params = new URLSearchParams({
    id_condominio: registro.id.toString(),
    data_minima: primeiroDia,
    data_maxima: ultimoDia,
  });

  requisicaoGet(`/condominios/visitas/Read.php?${params.toString()}`)
    .then((response) => {
      if (response?.data.success) {
        setVisitas(response.data.Registros);
      }

      setLoadingSpiner(false);
      setLoading(false);
      setRelistar(false);
    });
}, [registro?.id, relistarVisitas]);



if (loading || !registro) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner size="xl" className=" fill-[var(--corPrincipal)]" />
      </div>
    );
  }
 


  // Se não há notificações
  if (!visitas || visitas.length === 0 || !registro) {
    return (
      <div className="flex flex-col  items-center justify-center p-8 text-gray-500">
        <MdDashboard size={48} className="mb-4 opacity-50" />
        <span className="text-lg font-medium">Nada por aqui</span>
        <span className="text-sm">Todas as informacoes de dashboards aparecerao aqui</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">



      <div className="grid grid-cols-1 gap-3">
      <Card
        title="Numero de visitas"
        value={visitas.length.toString()}
        icon={<FaMapMarkerAlt />}
        color="padrao"
        className="mt-3 mb-3"
      />
      </div>


      <div className="overflow-x-auto max-h-[40vh] rem">
        <LoadingSpiner loading={loadingSpiner}>
          <TabelaDinamica<Visitas>
            dados={visitas}
            colunas={colunas}
            iconeItem={iconeItem}
            keyExtractor={(item) => item.id ?? 0}
            mensagemVazia="Nenhum cadastro encontrado"
            className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
          />
        </LoadingSpiner>
      </div>
      
    </div>
  );
}