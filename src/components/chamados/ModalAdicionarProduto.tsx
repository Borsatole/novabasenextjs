import { useState, useRef, useEffect } from "react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { SelectModificado } from "@src/components/comum/select";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { adicionarRegistro } from "@src/services/Crud";
import { requisicaoGet } from "@src/services/requisicoes";
import { Spinner } from "flowbite-react";
import Upload from "./imagesUpload";
import { Condominio, Notificacao } from "@src/components/tipos";

interface ModalAdicionarNotificacaoProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: Notificacao[];
  setRegistros: React.Dispatch<React.SetStateAction<Notificacao[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}


function ModalAdicionarNotificacao({
  AbrirModalNovoRegistro,
  setAbrirModalNovoRegistro,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalAdicionarNotificacaoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [images, setImages] = useState<ImageListType>([]);



  const formRefs = {
    condominio: useRef<HTMLSelectElement>(null),
    titulo: useRef<HTMLInputElement>(null),
    mensagem: useRef<HTMLTextAreaElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  
  const formData = new FormData();
  formData.append("id_condominio", formRefs.condominio.current?.value || "");
  formData.append("titulo", formRefs.titulo.current?.value || "");
  formData.append("mensagem", formRefs.mensagem.current?.value || "");

  images.forEach((img) => {
    if (img.file) formData.append("imagens[]", img.file);
  });

  if (!formData.get("id_condominio") || !formData.get("titulo") || !formData.get("mensagem")) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  try {
    await adicionarRegistro<Notificacao>({
      data: formData,
      registros,
      setRegistros,
      setRelistar,
      setAbrirModalNovoRegistro,
      setLoadingSpiner,
      endpoint: "/condominios/notificacoes/Create.php"
    });
  } catch (err) {
    console.error("Erro no envio:", err);
  } finally {
    // setIsLoading(false);
  }
};


  // Busca condominios
  useEffect(() => {
    if (!AbrirModalNovoRegistro) return; // Só busca quando o modal abrir
    setIsLoadingInit(true);
    requisicaoGet("/condominios/Read.php")
      .then((response) => {
        if (response?.data.success) {
          setCondominios(response.data.Registros);
        }
      })
      .finally(() => setIsLoadingInit(false));
  }, [AbrirModalNovoRegistro]);

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  if (!AbrirModalNovoRegistro) return null;

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
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">
      <h2 className="text-xl font-semibold mb-4">Novo Chamado</h2>
      
      <form onSubmit={handleSubmit}>
        <FormGroup label="Condomínio" id="condominio">
          <SelectModificado
            id="condominio"
            ref={formRefs.condominio}
            defaultValue=""
            style={{
              backgroundColor: "var(--base-variant)",
              color: "var(--text-color)",
              outlineColor: "var(--corPrincipal)",
            }}
            required
            disabled={isLoading}
          >
            <option value="">Selecione um condomínio</option>
            {condominios.map((condominio) => (
              <option key={condominio.id} value={condominio.id}>
  {condominio.nome}
</option>
            ))}
          </SelectModificado>
        </FormGroup>

        <FormGroup label="Título" id="titulo">
          <Input 
            inputRef={formRefs.titulo} 
            id="titulo" 
            type="text" 
            required 
            disabled={isLoading}
            placeholder="Digite o título da notificação"
          />
        </FormGroup>

        <FormGroup label="Mensagem" id="mensagem">

          <TextArea
            inputRef={formRefs.mensagem}
            id="mensagem"
            required
            disabled={isLoading}
            placeholder="Digite a mensagem da notificação"
          />
        </FormGroup>


        <Upload images={images} setImages={setImages}/>

       

        <div className="flex gap-2">
          <Button 
            loading={isLoading}
            wsize="w-full mt-4" 
            type="submit" 
            disabled={isLoading}
          >
            Abrir Chamado
          </Button>
          
        </div>
      </form>
    </Modal>
  );
}

export default ModalAdicionarNotificacao;