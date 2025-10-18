import { useState, useRef } from "react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria } from "./tipos";
// import { adicionarProduto } from "./Functions";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
interface ModalAdicionarContaProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: Categoria[];
  setRegistros: React.Dispatch<React.SetStateAction<Categoria[]>>;
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
    categoria: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoRegistro: Omit<Categoria, "id"> = {
      nome: refs.categoria.current?.value || "",
    };

    if (!novoRegistro.nome) return;

    
    try {
      setIsLoading(true);

      adicionarRegistro<Categoria>({
      registros,
      data: novoRegistro,
      setRegistros,
      setRelistar,
      setAbrirModalNovoRegistro,
      setLoadingSpiner,
      endpoint: "/Estoque/categoria/Create.php"
    })

    
    } finally {
      setIsLoading(false);
    }
  };

  if (!AbrirModalNovoRegistro) return null;

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup label="Categoria" id="nome">
          <Input inputRef={refs.categoria} id="nome" type="text" required disabled={isLoading} />
        </FormGroup>

        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          wsize="w-full mt-6"
        >
          Adicionar
        </Button>
      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
