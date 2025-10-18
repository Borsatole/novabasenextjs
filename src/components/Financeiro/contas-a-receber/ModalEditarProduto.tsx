import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria, ContaAReceber } from "./tipos";
import { SelectModificado } from "@src/components/comum/select";
import { requisicaoGet } from "@src/services/requisicoes";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";

interface ModalEditarProdutoProps {
  selectedProduto: ContaAReceber | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<ContaAReceber | null>>;
  registros: ContaAReceber[];
  setRegistros: React.Dispatch<React.SetStateAction<ContaAReceber[]>>;
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
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // refs de todos os campos
  const refs = {
    nome: useRef<HTMLInputElement>(null),
    categoria: useRef<HTMLSelectElement>(null),
    descricao: useRef<HTMLInputElement>(null),
    valor: useRef<HTMLInputElement>(null),
    data_pagamento: useRef<HTMLInputElement>(null),
    data_vencimento: useRef<HTMLInputElement>(null),
  };

  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // Preenche os campos dinamicamente
  const preencherCampos = () => {
    if (!registro || isLoadingInit) return;

    // Para input normal
    if (refs.nome.current) {
      refs.nome.current.value = registro.nome || "";
    }

    // Para input normal
    if (refs.descricao.current) {
      refs.descricao.current.value = registro.descricao || "";
    }

    // Para input normal
    if (refs.valor.current) {
      refs.valor.current.value = String(registro.valor || 0);
    }

    // Para input normal
    if (refs.data_pagamento.current) {
      refs.data_pagamento.current.value = registro.data_pagamento || "";
    }

    // Para input normal
    if (refs.data_vencimento.current) {
      refs.data_vencimento.current.value = registro.data_vencimento || "";
    }

    // Para select - usando value diretamente
    if (refs.categoria.current) {
      refs.categoria.current.value = registro.categoria || "";
    }
  };

  useEffect(preencherCampos, [registro, isLoadingInit]);

  useEffect(() => {
    requisicaoGet(`/Financeiro/categorias/Read.php?setor=contas_a_receber`)
      .then((response) => {
        if (response?.data.success) {
          setCategorias(response.data.Registros);
        }
        setIsLoadingInit(false);
      });

  }, []);



  // Coleta dados do formulário dinamicamente
  const coletarDadosFormulario = (): ContaAReceber => ({
      id: selectedProduto!.id,
      nome: refs.nome.current?.value || "",
      categoria: refs.categoria.current?.value || "",
      descricao: refs.descricao.current?.value || "",
      valor: Number(refs.valor.current?.value) || 0,
      data_pagamento: refs.data_pagamento.current?.value || "",
      data_vencimento: refs.data_vencimento.current?.value || "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();
      await editarRegistro<ContaAReceber>({
        data,
        registros,
        setRegistros,
        setRelistar,
        setSelected: setSelectedProduto,
        setLoadingSpiner,
        endpoint: "/Financeiro/contas-a-receber/Update.php"
      })
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedProduto(null);

  // não renderiza se não houver produto
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
        {/* Código */}
        <FormGroup label="Código" id="codigo">
          <Input
            id="codigo"
            type="text"
            defaultValue={registro?.id?.toString() || ""}
            disabled
          />
        </FormGroup>

        <FormGroup label="Nome do Produto" id="nome">
          <Input id="nome" type="text" inputRef={refs.nome} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Categoria" id="categoria">
          <SelectModificado
            id="categoria"
            ref={refs.categoria}
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
          <Input id="descricao" type="text" inputRef={refs.descricao} disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Valor" id="valor">
          <Input id="valor" type="number" step="0.01" min="0" inputRef={refs.valor} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Data de Pagamento" id="data_pagamento">
          <Input id="data_pagamento" type="date" inputRef={refs.data_pagamento} disabled={isLoading} />
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

export default ModalEditarProduto;