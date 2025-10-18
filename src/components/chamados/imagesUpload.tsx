import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button } from "../comum/button";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";

interface UploadProps {
  images: ImageListType;
  setImages: React.Dispatch<React.SetStateAction<ImageListType>>;
}
export default function Upload({
    images,
    setImages,
}:UploadProps) {
  
  const maxNumber = 15;

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="w-full  mx-auto mb-3">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div className="space-y-6">
            {/* Área de controles */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={onImageUpload}
                  className="flex items-center gap-2"
                >
                  <FiUpload size={16} />
                  Importar Imagem
                </Button>
                
                {images.length > 0 && (
                  <Button
                    type="button"
                    onClick={onImageRemoveAll}
                    className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <FiTrash2 size={16} />
                    Remover Tudo
                  </Button>
                )}
              </div>
              
              {/* Contador de imagens */}
              <div className="text-sm text-gray-500">
                {images.length} de {maxNumber} imagens
              </div>
            </div>

            {/* Grid de imagens */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="relative group bg-white rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Imagem */}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image["data_url"]}
                        alt={`Upload ${index + 1}`}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    {/* Overlay com botão de remover */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 transform scale-75 group-hover:scale-100"
                        title="Remover imagem"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                    
                    {/* Número da imagem */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Estado vazio */}
            {images.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
                  <FiUpload size={32} />
                </div>
                <p className="text-gray-600 mb-2 font-medium">Nenhuma imagem selecionada</p>
                <p className="text-sm text-gray-500">
                  Clique em "Importar Imagem" para começar
                </p>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}