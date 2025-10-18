import { useEffect, useState } from "react";
import { Condominio, Notificacao } from "@src/components/tipos";

import { IoIosNotifications } from "react-icons/io";
import { Datas } from "@src/services/funcoes-globais";
import { handleDeletar, editarRegistro } from "@src/services/Crud";

import { AiFillMessage } from "react-icons/ai";
import { requisicaoGet } from "@src/services/requisicoes";
import { Spinner } from "flowbite-react";
import ModalVisualizarProduto from "@src/components/chamados/ModalVisualizar";
import { Button } from "@src/components/comum/button";


// Props do componente
interface NotificacoesProps {
  selectedProduto: Condominio | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Condominio | null>>;
  registros: Condominio[];
  setRegistros: React.Dispatch<React.SetStateAction<Condominio[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Notificacoes({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setRelistar,
  setLoadingSpiner
}: NotificacoesProps) {
  const { primeiroDia, ultimoDia, dataFormataComHora, dataFormatada } = Datas();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [expandida, setExpandida] = useState<number | null>(null);

  const [selectedProdutoVisualizar, setSelectedProdutoVisualizar] = useState<Notificacao | null>(null);

  const [relistarNotificacoes, setRelistarNotificacoes] = useState(false);
  const [loading, setLoading] = useState(true);


  

  // Busca registro atual
  const registro = registros.find((p) => p.id === selectedProduto?.id);

  








  




    // Buscar dados da API com filtro
    useEffect(() => {
    if (!registro) return; 
  
    setLoadingSpiner(true);
  
    const params = new URLSearchParams({
      id_condominio: registro.id.toString(),
    });
  
    requisicaoGet(`/condominios/notificacoes/Read.php?${params.toString()}`)
      .then((response) => {
        if (response?.data.success) {
          setNotificacoes(response.data.Registros);
        }
        setRelistarNotificacoes(false);
        setLoadingSpiner(false);
        setLoading(false);

      });
  }, [registro?.id, relistarNotificacoes]);


  // Early return se não há registro
  if (loading || !registro) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner size="xl" className=" fill-[var(--corPrincipal)]" />
      </div>
    );
  }


  // Se não há notificações
  if (!notificacoes || notificacoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <IoIosNotifications size={48} className="mb-4 opacity-50" />
        <span className="text-lg font-medium">Nenhuma notificação</span>
        <span className="text-sm">Todas as notificações aparecerão aqui</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notificacoes
        .slice() // Cria uma cópia para não alterar o estado original
        .sort((a, b) => Number(a.lida) - Number(b.lida)) // Não lidas primeiro
        .map((notificacao) => (
          <div
            key={notificacao.id}
            className={`
              
              p-4 rounded-lg border transition-all duration-200 hover:shadow-md bg-[var(--corPrincipal)]/10 border-[var(--corPrincipal)]/30 shadow-sm 
              
              

            `}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar com indicador de não lida */}
              <div className="relative shrink-0 p-1 bg-[var(--base-variant)] rounded-full">
                <AiFillMessage size={30} color="var(--corPrincipal)"/>

                {!notificacao.lida && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--corPrincipal)] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col items-start mb-1">
                  <h3 className={`text-sm font-medium  text-[var(--text-color)]`}>
                    {notificacao.titulo || 'Notificação'}
                  </h3>
                  <span className="text-xs text-gray-500 shrink-0 ">
                    {dataFormatada(notificacao.data_criacao)}
                  </span>
                </div>

              </div>

              {/* Botões de ação */}
              <div className="flex items-center">
                {/* Botão para expandir/recolher */}

                <Button onClick={() => setSelectedProdutoVisualizar(notificacao)}>Visualizar</Button>
                
                
              </div>
            </div>
          </div>
        ))}


        {selectedProdutoVisualizar !== null && (
        <ModalVisualizarProduto
          selectedProduto={selectedProdutoVisualizar}
          setSelectedProduto={setSelectedProdutoVisualizar}
          registros={notificacoes}
          setRegistros={setNotificacoes}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}

    </div>

  );
};