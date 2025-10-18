import { useState } from "react";
import Modal from "@components/modal/Modal";
import { Button } from "../comum/button";
import { editarRegistroComImagens } from "@src/services/Crud";
import { Notificacao } from "@src/components/tipos";

const rotaApi = import.meta.env.VITE_API;

interface ModalVisualizarProdutoProps {
  selectedProduto: Notificacao | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Notificacao | null>>;
  registros: Notificacao[];
  setRegistros: React.Dispatch<React.SetStateAction<Notificacao[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalVisualizarProduto({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setRelistar,
  setLoadingSpiner,
}: ModalVisualizarProdutoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagemAberta, setImagemAberta] = useState<string | null>(null);

  const fecharModal = () => setSelectedProduto(null);

  if (!selectedProduto) return null;

  const coletarDadosFormulario = (): FormData => {
    const formData = new FormData();
    formData.append("id", selectedProduto!.id.toString());
    formData.append("lida", "1"); // marca como lida/finalizada
    return formData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const formData = coletarDadosFormulario();
      await editarRegistroComImagens<Notificacao>({
        data: formData,
        registros,
        setRegistros,
        setRelistar,
        setSelected: setSelectedProduto,
        setLoadingSpiner,
        endpoint: "/condominios/notificacoes/Update.php",
      });
    } finally {
      setIsLoading(false);
      setSelectedProduto(null);

    }
  };

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Código</h3>
          <p className="text-lg text-gray-700 font-medium">{selectedProduto.id}</p>
        </div>

        <div>
          <h3 className="font-semibold">Condominio</h3>
          <p className="text-lg text-gray-700 font-medium">{selectedProduto.nome_condominio}</p>
        </div>

        <div>
          <h3 className="font-semibold">Chamado</h3>
          <p className="text-lg text-gray-700 font-medium">{selectedProduto.titulo}</p>
        </div>

        <div>
          <h3 className="font-semibold">Mensagem</h3>
          <p className="text-base text-gray-700 whitespace-pre-line">{selectedProduto.mensagem}</p>
        </div>

        <Button
          onClick={(e) => handleSubmit(e)}
          loading={isLoading}
          disabled={isLoading}
          wsize="w-full mt-6"
        >
          Finalizar Chamado
        </Button>

        {selectedProduto.imagens && selectedProduto.imagens.length > 0 && (
          <div className="mt-4">
            <h3 className="text-gray-500 font-semibold mb-2">Imagens</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedProduto.imagens.map((imagem) => (
                <div
                  key={imagem.id}
                  className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => setImagemAberta(imagem.nome_imagem)}
                >
                  <img
                    src={`${rotaApi}/condominios/notificacoes/uploads/${imagem.nome_imagem}`}
                    alt={imagem.nome_imagem}
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 bg-opacity-10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                    Visualizar
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {imagemAberta && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setImagemAberta(null)}
          >
            <img
              src={`${rotaApi}/condominios/notificacoes/uploads/${imagemAberta}`}
              alt="Imagem ampliada"
              className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setImagemAberta(null)}
              className="absolute top-5 right-5 text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ModalVisualizarProduto;
