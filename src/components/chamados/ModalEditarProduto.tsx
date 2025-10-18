import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { editarRegistroComImagens } from "@src/services/Crud";
import { FiX } from "react-icons/fi";
import Upload from "./imagesUpload";
import { ImageListType } from "react-images-uploading";
import { Condominio, Notificacao } from "@src/components/tipos";


const rotaApi = import.meta.env.VITE_API;

interface ModalEditarProdutoProps {
  selectedProduto: Notificacao;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Notificacao | null>>;
  registros: Notificacao[];
  setRegistros: React.Dispatch<React.SetStateAction<Notificacao[]>>;
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
  const [imagemAberta, setImagemAberta] = useState<string | null>(null);
  const [images, setImages] = useState<ImageListType>([]);

  const refs = {
    titulo: useRef<HTMLInputElement>(null),
    mensagem: useRef<HTMLTextAreaElement>(null),
  };

  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // Preenche campos automaticamente
  useEffect(() => {
    if (!registro || isLoadingInit) return;
    refs.titulo.current!.value = registro.titulo || "";
    refs.mensagem.current!.value = registro.mensagem || "";
  }, [registro, isLoadingInit]);

  const coletarDadosFormulario = (): FormData => {
    const formData = new FormData();
    formData.append("id", selectedProduto!.id.toString());
    formData.append("titulo", refs.titulo.current?.value || "");
    formData.append("mensagem", refs.mensagem.current?.value || "");

    images.forEach((img) => {
      if (img.file) {
        formData.append("imagens[]", img.file);
      }
    });

    // Também envia imagens já existentes que não foram excluídas
    selectedProduto?.imagens?.forEach((img) => {
      formData.append("imagens_existentes[]", img.nome_imagem);
    });

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
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedProduto(null);

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
        <FormGroup label="Código" id="codigo">
          <Input
            id="codigo"
            type="text"
            defaultValue={registro?.id?.toString() || ""}
            disabled
          />
        </FormGroup>

        <FormGroup label="Chamado" id="nome">
          <Input id="nome" type="text" inputRef={refs.titulo} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Mensagem" id="mensagem">
          <TextArea id="mensagem" inputRef={refs.mensagem} required disabled={isLoading} />
        </FormGroup>

        {/* Preview das imagens existentes */}
        {selectedProduto.imagens && selectedProduto.imagens.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {selectedProduto.imagens.map((imagem) => (
              <div key={imagem.id} className="relative group bg-white rounded-lg border-2 overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduto((prev) =>
                      prev
                        ? { ...prev, imagens: prev.imagens?.filter((i) => i.id !== imagem.id) }
                        : null
                    );
                  }}
                  className="absolute top-1 right-1 z-10 text-white bg-red-600 p-1 rounded-full opacity-80 hover:opacity-100"
                >
                  <FiX size={18} />
                </button>

                <img
                  src={`${rotaApi}/condominios/notificacoes/uploads/${imagem.nome_imagem}`}
                  alt={imagem.nome_imagem}
                  className="rounded-lg cursor-pointer"
                  onClick={() => setImagemAberta(imagem.nome_imagem)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Modal da imagem em tela cheia */}
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

        {/* Upload de novas imagens */}
        <Upload images={images} setImages={setImages} />

        <Button type="submit" loading={isLoading} disabled={isLoading} wsize="w-full mt-6">
          Salvar Alterações
        </Button>
      </form>
    </Modal>
  );
}

export default ModalEditarProduto;
