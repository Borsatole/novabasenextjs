import { useState, useEffect, useRef } from "react";
import { Condominio, Notificacao } from "@src/components/tipos";

import { Spinner} from "flowbite-react";
import Modal from "@components/modal/Modal";
import { MdDashboard } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";

import { Tabs, TabConfig } from "../comum/tabs";
import { Notificacoes } from "./ModalEditar/Notificacoes";
import { Informacoes } from "./ModalEditar/Info";
import { Dashboard } from "./ModalEditar/Dashboard";
import { TbMessageCheck } from "react-icons/tb";


interface ModalEditarProdutoProps {
  selectedProduto: Condominio | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Condominio | null>>;
  registros: Condominio[];
  setRegistros: React.Dispatch<React.SetStateAction<Condominio[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarRegistro({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  const fecharModal = () => setSelectedProduto(null);

  if (!selectedProduto) return null;


    // Configuração das tabs usando o tipo TabConfig
  const tabsConfig: TabConfig[] = [
    {
      id: 'dashboard',
      title: "Dashboard",
      icon: <MdDashboard />,
      content: <Dashboard
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
      />
    },
    {
      id: 'notifications',
      title: "Chamados", 
      icon: <TbMessageCheck />,
      content: <Notificacoes
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
      />
    },
    
    {
      id: 'informations',
      title: "Informações",
      icon: <RiHotelFill />,
      content: (
        <Informacoes
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )
    }
  ];

  const handleTabChange = (tabId: string | number) => {
    // console.log('Tab ativa:', tabId);
  };


  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-[80vh]">
      <div className="p-0">

         <Tabs 
          tabs={tabsConfig}
          defaultActive="dashboard"
          onTabChange={handleTabChange}
        />

      </div>
    </Modal>
  );
}

export default ModalEditarRegistro;



