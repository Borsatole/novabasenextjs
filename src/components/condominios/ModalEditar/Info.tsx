import { useEffect, useRef, useState } from "react";
// import { informacoes, Registros } from "../tipos";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import { Button } from "@src/components/comum/button";
import { editarRegistro } from "@src/services/Crud";
import { Condominio, Visitas } from "@src/components/tipos";

interface InformacoesProps {
  selectedProduto: Condominio | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Condominio | null>>;
  registros: Condominio[];
  setRegistros: React.Dispatch<React.SetStateAction<Condominio[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Informacoes({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setRelistar,
  setLoadingSpiner,
}: InformacoesProps) {
    
  const [isLoading, setIsLoading] = useState(false);

  // Refs dos campos
  const refs = {
    nome: useRef<HTMLInputElement>(null),
    telefone: useRef<HTMLInputElement>(null),
    rua: useRef<HTMLInputElement>(null),
  };

  // Busca registro atual
  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // Preenche os campos ao abrir
useEffect(() => {
  if (!registro) return;

  if (refs.nome.current) 
  refs.nome.current.value = registro.nome || "";
  refs.telefone.current!.value = registro.telefone?.toString() || "";
  refs.rua.current!.value = registro.rua || "";
}, [registro]);


  // Coleta dados do form
  const coletarDadosFormulario = (): Condominio => ({
    id: Number(selectedProduto!.id),
    nome: refs.nome.current?.value || "",
    telefone: refs.telefone.current?.value || "",
    rua: refs.rua.current?.value || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const produtoEditado = coletarDadosFormulario();

      await editarRegistro<Condominio>({
        data: produtoEditado,
        setRelistar,
        setSelected: setSelectedProduto,
        setLoadingSpiner : () => {},
        registros,
        setRegistros,
        endpoint: "/condominios/Update.php",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      {/* Campo Nome / Condomínio */}
      <FormGroup label="Condomínio" id="nome">
        <Input
          id="nome"
          type="text"
          inputRef={refs.nome}
          required
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup label="Telefone" id="telefone">
        <Input
          id="telefone"
          type="phone"
          inputRef={refs.telefone}
          disabled={isLoading}
        />
      </FormGroup>

      {/* Campo Rua */}
      <FormGroup label="Rua" id="rua">
        <Input
          id="rua"
          type="text"
          inputRef={refs.rua}
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
  );
}