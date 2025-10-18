import { useState, useRef, useEffect } from "react";
import { getIcon } from "@src/components/icons";

import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria, ContaAReceber } from "./tipos";
import { SelectModificado } from "@src/components/comum/select";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
import { requisicaoGet } from "@src/services/requisicoes";
import { Permissoes } from "@src/components/tipos";

interface ModalAdicionarContaProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: Permissoes[];
  setRegistros: React.Dispatch<React.SetStateAction<Permissoes[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

type CampoComRef = "nome" | "categoria" | "descricao" | "valor" | "data_vencimento";

interface CampoConfig {
  key: CampoComRef;
  type: "string" | "number";
}

const CAMPOS_CONFIG: CampoConfig[] = [
  { key: "nome", type: "string" },
  { key: "categoria", type: "string" },
  { key: "descricao", type: "string" },
  { key: "valor", type: "number" },
  { key: "data_vencimento", type: "string" },
];

function ModalAdicionarRegistro({
  AbrirModalNovoRegistro,
  setAbrirModalNovoRegistro,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalAdicionarContaProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingInit, setIsLoadingInit] = useState(true);
    const [categorias, setCategorias] = useState<Categoria[]>([]);


    // dados
    const [nome, setNome] = useState<string>("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const payload = {
      "nome": nome,
    };
  
    


    setIsLoading(true);
    try {
      await adicionarRegistro<Permissoes>({
        data : payload,
        registros,
        setRegistros,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner,
        endpoint: "/papeis"
      })
    }finally {
      setIsLoading(false);
    }
  };

  if (!AbrirModalNovoRegistro) return null;

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup label="Nome nivel" id="nome">
          <Input id="nome" type="text"  
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required 
          disabled={isLoading} />
        </FormGroup>


        

        <div className="flex justify-between">
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          <p className="flex items-center gap-2">
            {getIcon("salvar", 20)}
            <span>Salvar Alterações</span>
          </p>
        </Button>
      </div>


      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
