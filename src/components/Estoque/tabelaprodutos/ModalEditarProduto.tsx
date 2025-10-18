import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria, Produto } from "./tipos";
import { SelectModificado } from "@src/components/comum/select";
import { requisicaoGet } from "@src/services/requisicoes";
import { editarRegistro } from "@src/services/Crud";
import { FiMinus, FiPlus } from "react-icons/fi";

interface ModalEditarProdutoProps {
  selectedProduto: Produto | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Produto | null>>;
  registros: Produto[];
  setRegistros: React.Dispatch<React.SetStateAction<Produto[]>>;
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
    quantidade: useRef<HTMLInputElement>(null),
    categoria: useRef<HTMLSelectElement>(null),
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
    if (refs.quantidade.current) {
      refs.quantidade.current.value = String(registro.quantidade || 0);
    }

    // Para select - usando value diretamente
    if (refs.categoria.current) {
      refs.categoria.current.value = registro.categoria || "";
    }
  };

  useEffect(preencherCampos, [registro, isLoadingInit]);

  useEffect(() => {
    requisicaoGet(`/Estoque/categoria/Read.php`)
      .then((response) => {
        if (response?.data.success) {
          setCategorias(response.data.Registros);
        }
        setIsLoadingInit(false);
      });

  }, []);



  // Coleta dados do formulário dinamicamente
  const coletarDadosFormulario = (): Produto => ({
      id: selectedProduto!.id,
      nome: refs.nome.current?.value || "",
      categoria: refs.categoria.current?.value || "",
      quantidade: Number(refs.quantidade.current?.value) || 0,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();
      console.log(data);
      await editarRegistro<Produto>({
        data,
        registros,
        setRegistros,
        setRelistar,
        setSelected: setSelectedProduto,
        setLoadingSpiner,
        endpoint: "/Estoque/Update.php"
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

        <FormGroup label="Quantidade" id="quantidade">
                  <Input
                    inputRef={refs.quantidade}
                    id="quantidade"
                    type="number"
                    min="0"
                    required
                    disabled={isLoading}
                  
                  />
        
                  {/* botao para aumentar ou diminuir a quantidade */}
                  <div className="flex gap-1 mt-1">
          <button
            type="button"
            onClick={() => {
              if (refs.quantidade.current) {
                refs.quantidade.current.value = String(
                  Number(refs.quantidade.current.value) + 1
                );
              }
            }}
            disabled={isLoading}
            className="p-2 rounded-[30%] bg-[var(--corPrincipal)] text-white shadow-md hover:bg-[var(--corPrincipalHover)]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus size={15} />
          </button>
        
          <button
            type="button"
            onClick={() => {
              if (refs.quantidade.current) {
                refs.quantidade.current.value = String(
                  Number(refs.quantidade.current.value) - 1
                );
              }
            }}
            disabled={isLoading}
            className="p-2 rounded-[30%] bg-[var(--corPrincipal)] text-white shadow-md hover:bg-[var(--corPrincipalHover)]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiMinus size={15} />
          </button>
        </div>
                
        </FormGroup>

        <FormGroup label="Categoria" id="categoria">
          <SelectModificado
            id="categoria"
            ref={refs.categoria}
            required
            disabled={isLoading}
          >

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
               
          </SelectModificado>
        </FormGroup>

        <Button type="submit" loading={isLoading} disabled={isLoading} wsize="w-full mt-6">
          Salvar Alterações
        </Button>
      </form>
    </Modal>
  );
}

export default ModalEditarProduto;