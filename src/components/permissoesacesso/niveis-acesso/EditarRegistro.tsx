import { useState } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Permissao, Permissoes } from "@src/components/tipos";
import { editarRegistro } from "@src/services/Crud";

interface ModalEditarProdutoProps {
  selectedProduto: Permissoes | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Permissoes | null>>;
  registros: Permissoes[];
  setRegistros: React.Dispatch<React.SetStateAction<Permissoes[]>>;
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

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProduto) return;
    setSelectedProduto({ ...selectedProduto, nome: e.target.value });
  };

  // Função para coletar todas as permissões em um array único
  const coletarPermissoes = () => {
    if (!selectedProduto?.permissoes) return [];

    const todasPermissoes: Array<{ id: number; allow: boolean }> = [];

    Object.values(selectedProduto.permissoes).forEach((permissoes) => {
      if (Array.isArray(permissoes)) {
        permissoes.forEach((permissao: Permissao) => {
          todasPermissoes.push({
            id: permissao.id,
            allow: !!permissao.allow
          });
        });
      }
    });

    return todasPermissoes;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);

    const permissoesArray = coletarPermissoes().map(p => ({
      permissao_id: p.id,
      allow: p.allow ? 1 : 0
    }));

    const payload = {
      nome: selectedProduto.nome,
      permissoes: permissoesArray
    };


    try {
      await editarRegistro<any>({
        data: payload,
        registros,
        setRegistros,
        setRelistar ,
        setSelected: setSelectedProduto,
        setLoadingSpiner,
        endpoint: `/permissoes/${selectedProduto.id}`,
      })
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissaoChange = (categoria: string, permissaoId: number, checked: boolean) => {
    if (!selectedProduto?.permissoes) return;

    const novasPermissoes = { ...selectedProduto.permissoes };
    const permissoesCategoria = novasPermissoes[categoria as keyof typeof novasPermissoes];

    if (Array.isArray(permissoesCategoria)) {
      (novasPermissoes as any)[categoria] = permissoesCategoria.map((p: Permissao) =>
        p.id === permissaoId ? { ...p, allow: checked } : p
      );
    }

    setSelectedProduto({ ...selectedProduto, permissoes: novasPermissoes });
  };

  const fecharModal = () => setSelectedProduto(null);

  // Não renderiza se não houver produto selecionado
  if (!selectedProduto) return null;

  // Loading inicial
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
        {/* Campo Nível */}
        <FormGroup label="Nível" id="nome">
          <Input
            id="nome"
            type="text"
            inputRef={null}
            value={selectedProduto.nome}
            onChange={handleNomeChange}
            required
            disabled={isLoading}
          />
        </FormGroup>

        {/* Lista de Permissões por Categoria */}
        {/* <FormGroup label="Permissões" id="permissoes"> */}
          {selectedProduto.permissoes &&
            Object.entries(selectedProduto.permissoes).map(([categoria, permissoes]) => (
              <div key={categoria} className="mb-3 border-b pb-2">
                <h4 className="font-semibold text-[var(--corPrincipal)] mb-1 capitalize">
                  {categoria}
                </h4>

                {((permissoes as unknown) as Permissao[]).map((permissao) => (
                  <label
                  
                    key={permissao.id}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      id={String(permissao.id)}
                      checked={!!permissao.allow}
                      onChange={(e) => handlePermissaoChange(categoria, permissao.id, e.target.checked)}
                      disabled={isLoading}
                      className="accent-[var(--corPrincipal)] cursor-pointer"
                    />
                    <span className="text-sm">{permissao.descricao}</span>
                  </label>
                ))}
              </div>
            ))}
        {/* </FormGroup> */}

        {/* Botão de Salvar */}
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