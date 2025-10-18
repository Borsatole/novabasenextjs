import { useState, useRef, useEffect } from "react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria, ContaAReceber } from "./tipos";
import { SelectModificado } from "@src/components/comum/select";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
import { requisicaoGet } from "@src/services/requisicoes";

interface ModalAdicionarContaProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: ContaAReceber[];
  setRegistros: React.Dispatch<React.SetStateAction<ContaAReceber[]>>;
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

  const refs = {
    nome: useRef<HTMLInputElement>(null),
    categoria: useRef<HTMLSelectElement>(null),
    descricao: useRef<HTMLInputElement>(null),
    valor: useRef<HTMLInputElement>(null),
    data_pagamento: useRef<HTMLInputElement>(null),
    data_vencimento: useRef<HTMLInputElement>(null),
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: Omit<ContaAReceber, "id"> = {
      nome: refs.nome.current?.value || "",
      categoria: refs.categoria.current?.value || "",
      descricao: refs.descricao.current?.value || "",
      valor: Number(refs.valor.current?.value) || 0,
      data_vencimento: refs.data_vencimento.current?.value || "",
    };


    


    setIsLoading(true);
    try {
      await adicionarRegistro<ContaAReceber>({
        data,
        registros,
        setRegistros,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner,
        endpoint: "/Financeiro/contas-a-receber/Create.php"
      })
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      requisicaoGet(`/Financeiro/categorias/Read.php?setor=contas_a_receber`)
        .then((response) => {
          if (response?.data.success) {
            setCategorias(response.data.Registros);
          }
          setIsLoadingInit(false);
        });
  
    }, []);

  if (!AbrirModalNovoRegistro) return null;

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup label="Nome do Produto" id="nome">
          <Input id="nome" type="text" inputRef={refs.nome} 
          required 
          disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Categoria" id="categoria">
          <SelectModificado
            id="categoria"
            ref={refs.categoria}
            required
            disabled={isLoading}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.categoria}>
                {categoria.categoria}
              </option>
            ))}
          </SelectModificado>
        </FormGroup>

        <FormGroup label="Descrição" id="descricao">
          <Input id="descricao" type="text" 
          inputRef={refs.descricao}
           disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Valor" id="valor">
          <Input id="valor" type="number" step="0.01" min="0" inputRef={refs.valor} 
          required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Data de Vencimento" id="data_vencimento">
          <Input id="data_vencimento" type="date" inputRef={refs.data_vencimento} required disabled={isLoading} />
        </FormGroup>

        <Button type="submit" loading={isLoading} disabled={isLoading} wsize="w-full mt-6">
          Salvar Alterações
        </Button>
      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
