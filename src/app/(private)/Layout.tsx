import { ReactNode } from 'react'
import BarraSuperior from "@/components/barraSuperior/barraSuperior"
import Container from "@/components/comum/container"
// import MenuLateral from "@/components/MenuLateral/MenuLateral"

/**
 * PROPS DO LAYOUT PRIVADO
 */
interface LayoutPrivadoProps {
  children: ReactNode // Conteúdo das páginas filhas
}

/**
 * LAYOUT PRIVADO
 * Layout padrão para páginas autenticadas
 * Inclui: Barra Superior + Menu Lateral + Área de Conteúdo
 */
export default function LayoutPrivado({ children }: LayoutPrivadoProps) {
  return (
    <>
      {/* Barra superior fixa */}
      <BarraSuperior />
      
      {/* Container principal */}
      <Container tipo="principal">
        
        {/* Menu lateral */}
        {/* <MenuLateral /> */}
        
        {/* Área de conteúdo dinâmico (onde as páginas são renderizadas) */}
        <main 
          className="conteudo flex-1 transition-all duration-300 ease-in-out"
        >
          {children}
        </main>
        
      </Container>
    </>
  )
}