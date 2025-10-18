import { useState, useEffect } from "react";
import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { SelectModificado } from "@components/comum/select";
import { requisicaoGet } from "@services/requisicoes";
import { Categoria, Produto } from "./tipos";
import { Datas } from "@src/services/funcoes-globais";

interface FiltroProps {
  onFiltrar: (queryString: string) => void;
}

export function FiltroCadastros({ onFiltrar }: FiltroProps) {

  const [filtros, setFiltros] = useState({
    id: "",
    nome: "",
    quantidade: "",
    categoria: "",
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltrar = () => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value.trim() !== "") params.append(key, value);
    });
    onFiltrar(params.toString());
  };

  const handleLimpar = () => {
    setFiltros({ id: "", nome: "", categoria: "", quantidade: "" });
    onFiltrar("");
  };

  useEffect(() => {
    requisicaoGet('/Estoque/categoria/Read.php').then((res) => {
      if (res?.data.success) setCategorias(res.data.Registros);
    });
    handleFiltrar();
  }, []);

  return (
    <form className="flex flex-col bg-[var(--base-variant)] rounded-lg p-3.5 mt-3.5 mb-5.5" onSubmit={(e) => e.preventDefault()}>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 ">
        <FormGroup id="cod" label="COD">
          <Input
            id="cod"
            name="id"
            type="text"
            value={filtros.id}
            placeholder=""
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup id="nome" label="NOME">
          <Input
            id="nome"
            name="nome"
            type="text"
            value={filtros.nome}
            placeholder=""
            onChange={handleChange}
          />
        </FormGroup>

        

      
        <FormGroup id="quantidade" label="QUANTIDADE">
          

          <SelectModificado
          id="quantidade"
          name="quantidade"
          value={filtros.quantidade}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="5">Menor que 5</option>
          <option value="20">Menor que 20</option>
          <option value="50">Menor que 50</option>
          <option value="100">Menor que 100</option>
          <option value="200">Menor que 200</option>
          </SelectModificado>
        
        </FormGroup>

        <FormGroup id="categoria" label="CATEGORIA">
          
          <SelectModificado
          id="categoria"
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
        >
          <option value="">Todos</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nome}>
              {categoria.nome}
            </option>
          ))}

          <option value="Sem Categoria">Sem Categoria</option>
        </SelectModificado>
        </FormGroup>

        
      </div>

      <div className="mt-4 flex gap-2 justify-end ">
        <button
          onClick={handleFiltrar}
          className="bg-[var(--corPrincipal)] text-white px-4 py-2 rounded-lg hover:brightness-110 transition"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleLimpar}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:brightness-95 transition"
        >
          Limpar
        </button>
      </div>

      </form>
  );
}
