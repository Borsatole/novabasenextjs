import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { ContaFixa } from "./tipos";
// import { adicionarProduto } from "./Functions";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";

interface ModalAdicionarContaProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: ContaFixa[];
  setRegistros: React.Dispatch<React.SetStateAction<ContaFixa[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAdicionarRegistro({
  AbrirModalNovoRegistro,
  setAbrirModalNovoRegistro,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalAdicionarContaProps) {
  
  const [isLoading, setIsLoading] = useState(false);

  const refs = {
    nome: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLInputElement>(null),
    valor: useRef<HTMLInputElement>(null),
    recorrencia: useRef<HTMLInputElement>(null),
    dia_vencimento: useRef<HTMLInputElement>(null),
    data_fim: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Omit<ContaFixa, "id"> = {
      nome: refs.nome.current?.value || "",
      descricao: refs.descricao.current?.value || "",
      valor: Number(refs.valor.current?.value) || 0,
      recorrencia: Number(refs.recorrencia.current?.value) || 0,
      dia_vencimento: Number(refs.dia_vencimento.current?.value) || 1,
      data_fim: refs.data_fim.current?.value || "",
      categoria: "Conta Fixa",
    };

    if (!data.nome || !data.valor) return;

    setIsLoading(true);
    try {
      await adicionarRegistro<ContaFixa>({
        data,
        registros,
        setRegistros,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner,
        endpoint: "/Financeiro/contas-a-pagar/contas-fixas/Create.php"
      })
    } finally {
      setIsLoading(false);
    }
  };

  if (!AbrirModalNovoRegistro) return null;

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup label="Nome da Conta" id="nome">
          <Input inputRef={refs.nome} id="nome" type="text" required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Descrição" id="descricao">
          <Input inputRef={refs.descricao} id="descricao" type="text" disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Valor" id="valor">
          <Input inputRef={refs.valor} id="valor" type="number" step="0.01" min="0" required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Recorrência (meses)" id="recorrencia">
          <Input inputRef={refs.recorrencia} id="recorrencia" type="number" min="0" required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Dia de Vencimento" id="dia_vencimento">
          <Input inputRef={refs.dia_vencimento} id="dia_vencimento" type="number" min="1" max="31" required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Data Final (opcional)" id="data_fim">
          <Input inputRef={refs.data_fim} id="data_fim" type="date" disabled={isLoading} />
        </FormGroup>

        <Button loading={isLoading} wsize="w-full mt-4" type="submit" disabled={isLoading}>
          Adicionar Conta Fixa
        </Button>
      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
