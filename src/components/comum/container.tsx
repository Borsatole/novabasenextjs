
interface ContainerProps {
  children: React.ReactNode;
  tipo?: string;
  id?: string;
}
function Container({ children } : ContainerProps) {


    return (
      <div className="w-full min-h-screen p-4 md:p-10" id="conteudo" > 
        {children || ""}
      </div>
    );
  
  
}

export default Container;