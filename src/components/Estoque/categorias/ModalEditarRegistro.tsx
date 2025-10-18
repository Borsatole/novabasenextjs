import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria } from "./tipos";
// import { editarProduto } from "./Functions";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";

interface ModalEditarProdutoProps {
  selectedProduto: Categoria | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Categoria | null>>;
  registros: Categoria[];
  setRegistros: React.Dispatch<React.SetStateAction<Categoria[]>>;
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  // Refs para os campos do formulário
  const refs = {
    categoria: useRef<HTMLInputElement>(null),
    setor: useRef<HTMLSelectElement>(null),
  };

  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // Popula os campos com os dados do produto
  const preencherCampos = () => {
    if (!registro || isLoadingInit) return;

    // Para input normal
    if (refs.categoria.current) {
       refs.categoria.current.value = registro.nome || "";
    }

    
  };

  useEffect(preencherCampos, [registro, isLoadingInit]);

  const coletarDadosFormulario = (): Categoria => ({
    id: selectedProduto!.id,
    nome: refs.categoria.current?.value || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const produtoEditado = coletarDadosFormulario();
      await editarRegistro<Categoria>({
      data: produtoEditado,
      setRelistar,
      setSelected: setSelectedProduto,
      setLoadingSpiner,
      registros,
      setRegistros,
      endpoint: "/Estoque/categoria/Update.php"
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
        <FormGroup label="Categoria" id="categoria">
          <Input
            id="categoria"
            type="text"
            inputRef={refs.categoria}
            required
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

export default ModalEditarRegistro;