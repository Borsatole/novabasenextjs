import { useState, useEffect, useRef } from "react";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Categoria } from "./tipos";
import { SelectModificado } from "@src/components/comum/select";

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
    setor: useRef<HTMLSelectElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Omit<Categoria, "id"> = {
      categoria: refs.categoria.current?.value || "",
      setor: refs.setor.current?.value || "",
    };

    if (!data.categoria || !data.setor) return;

    setIsLoading(true);
    try {
      await adicionarRegistro<Categoria>({
        registros,
        data,
        setRegistros,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner,
        endpoint: "/Financeiro/categorias/Create.php"
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
          <Input inputRef={refs.categoria} id="nome" type="text" required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Setor" id="setor">
            <SelectModificado
              id="setor"
              ref={refs.setor}
              required
              disabled={isLoading}
            >
              <option value="contas_a_pagar">Contas a pagar</option>    
              <option value="contas_a_receber">Contas a receber</option>    
            </SelectModificado>
          </FormGroup>

        

        <Button loading={isLoading} wsize="w-full mt-4" type="submit" disabled={isLoading}>
          Adicionar
        </Button>
      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
