"use client"; // ⚠️ necessário para usar hooks do React

import React, { createContext, useState, useContext, ReactNode } from "react";

interface MenuContextType {
  menuAberto: boolean;
  toggleMenu: () => void;
  abrirMenu: () => void;
  fecharMenu: () => void;
}

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto((prev) => !prev);
  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <MenuContext.Provider
      value={{ menuAberto, toggleMenu, abrirMenu, fecharMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Hook para uso do contexto
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu deve ser usado dentro de um MenuProvider");
  }
  return context;
};
