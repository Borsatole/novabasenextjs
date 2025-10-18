import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ IsOpen, onClose, children, ...rest }: any) {
  useEffect(() => {
    if (IsOpen) {
      document.body.style.overflow = "hidden"; // trava scroll
    } else {
      document.body.style.overflow = ""; // libera scroll
    }

    return () => {
      document.body.style.overflow = ""; // garante liberar ao desmontar
    };
  }, [IsOpen]);

  if (!IsOpen) return null;

  return ReactDOM.createPortal(
    <div
      {...rest}
      className="fixed inset-0  z-[30] bg-[var(--fundo-modal)]/90 flex items-center justify-center "
      onClick={onClose} // Clique fora fecha o modal
    >
      <div
        {...rest}
        className={`relative p-12  rounded w-[95%] lg:w-[55%] min-h-[60vh] max-h-[90vh] overflow-y-auto ${rest.className}`}
        style={{ backgroundColor: "var(--base-variant)" }}
        onClick={(e) => e.stopPropagation()} // Impede fechar clicando dentro
      >
        {/* Botão Close */}
        <button
          className="absolute top-4 right-4 text-[--var-text-color] hover:text-[--var-text-color] cursor-pointer"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
