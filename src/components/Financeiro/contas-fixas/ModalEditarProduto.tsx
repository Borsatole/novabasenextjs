import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { ContaFixa } from "./tipos";
// import { editarProduto } from "./Functions";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
interface ModalEditarProdutoProps {
  selectedProduto: ContaFixa | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<ContaFixa | null>>;
  registros: ContaFixa[];
  setRegistros: React.Dispatch<React.SetStateAction<ContaFixa[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarProduto({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  // Refs para os campos do formulário
  const refs = {
    nome: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLInputElement>(null),
    valor: useRef<HTMLInputElement>(null),
    recorrencia: useRef<HTMLInputElement>(null),
    dia_vencimento: useRef<HTMLInputElement>(null),
    data_fim: useRef<HTMLInputElement>(null),
  };

  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // Popula os campos com os dados do produto
  const preencherCampos = () => {
    if (!registro || isLoadingInit) return;

    const setValue = (ref: React.RefObject<HTMLInputElement>, value: string) => {
      if (ref.current) ref.current.value = value;
    };

    setValue(refs.nome, registro.nome || "");
    setValue(refs.descricao, registro.descricao || "");
    setValue(refs.valor, Number(registro.valor || 0).toFixed(2));
    setValue(refs.recorrencia, String(registro.recorrencia || 0));
    setValue(refs.dia_vencimento, String(registro.dia_vencimento || 1));
    setValue(refs.data_fim, registro.data_fim || "");
  };

  useEffect(preencherCampos, [registro, isLoadingInit]);

  const coletarDadosFormulario = (): ContaFixa => ({
    id: selectedProduto!.id,
    nome: refs.nome.current?.value || "",
    descricao: refs.descricao.current?.value || "",
    valor: Number(refs.valor.current?.value) || 0,
    recorrencia: Number(refs.recorrencia.current?.value) || 0,
    dia_vencimento: Number(refs.dia_vencimento.current?.value) || 0,
    data_fim: refs.data_fim.current?.value || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();
      await editarRegistro<ContaFixa>({
        data,
        registros,
        setRegistros,
        setRelistar,
        setSelected: setSelectedProduto,
        setLoadingSpiner,
        endpoint: "/Financeiro/contas-a-pagar/contas-fixas/Update.php"
      })
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedProduto(null);

  // Early returns para casos especiais
  if (!selectedProduto) return null;

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
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Código - Desabilitado */}
        <FormGroup label="Código" id="codigo">
          <Input 
            id="codigo" 
            type="text" 
            defaultValue={registro?.id} 
            disabled 
          />
        </FormGroup>

        {/* Campo Nome */}
        <FormGroup label="Nome do Produto" id="nome">
          <Input
            id="nome"
            type="text"
            inputRef={refs.nome}
            required
            disabled={isLoading}
          />
        </FormGroup>

        {/* Campo Descrição */}
        <FormGroup label="Descrição" id="descricao">
          <Input
            id="descricao"
            type="text"
            inputRef={refs.descricao}
            disabled={isLoading}
          />
        </FormGroup>

        {/* Campo Valor */}
        <FormGroup label="Valor" id="valor">
          <Input
            id="valor"
            type="number"
            inputRef={refs.valor}
            step="0.01"
            min="0"
            required
            disabled={isLoading}
          />
        </FormGroup>

        {/* Campo Recorrência */}
        <FormGroup label="Recorrência" id="recorrencia">
          <Input
            id="recorrencia"
            type="number"
            inputRef={refs.recorrencia}
            min="0"
            required
            disabled={isLoading}
          />
        </FormGroup>

        {/* Campo Dia de Vencimento */}
        <FormGroup label="Dia de Vencimento" id="dia_vencimento">
          <Input
            id="dia_vencimento"
            type="number"
            inputRef={refs.dia_vencimento}
            min="1"
            max="31"
            required
            disabled={isLoading}
          />
        </FormGroup>

        {/* Campo Data de Fim */}
        <FormGroup label="Data de Fim" id="data_fim">
          <Input
            id="data_fim"
            type="date"
            inputRef={refs.data_fim}
          
            disabled={isLoading}
          />
        </FormGroup>


        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          wsize="w-full mt-6"
        >
          Salvar Alterações
        </Button>
      </form>
    </Modal>
  );
}

export default ModalEditarProduto;