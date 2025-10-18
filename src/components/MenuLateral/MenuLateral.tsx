"use client";

import { useMenu } from "@/context/MenuContext";
import { Confirm } from "@/components/comum/alertas";

import { OpcaoMenu, OpcaoMenuComSubmenu } from "@/components/MenuLateral/OpcaoMenu";
import { BtnFecharMenuLateral } from "@/components/MenuLateral/botoesMenu";

import "./MenuLateral.css";

import Image from "next/image";

// Estrutura de menu de exemplo
const menuItems = [
  {
    nome: "Dashboard",
    rota: "/dashboard",
    icone: "dashboard",
  },
  {
    nome: "Usuários",
    icone: "permissoes",
    submenu: [
      {
        nome: "Lista de Usuários",
        rota: "/usuarios",
        icone: "dashboard",
      },
      {
        nome: "Adicionar Usuário",
        rota: "/usuarios/adicionar",
        icone: "adicionar",
      },
    ],
  },
  {
    nome: "Produtos",
    icone: "dashboard",
    submenu: [
      {
        nome: "Lista de Produtos",
        rota: "/produtos",
        icone: "dashboard",
      },
      {
        nome: "Adicionar Produto",
        rota: "/produtos/adicionar",
        icone: "adicionar",
      },
      {
        nome: "Categorias",
        rota: "/produtos/categorias",
        icone: "dashboard",
      },
    ],
  },
  {
    nome: "Relatórios",
    rota: "/relatorios",
    icone: "dashboard",
  },
  {
    nome: "Configurações",
    rota: "/configuracoes",
    icone: "dashboard",
  },
];

const MenuLateral = () => {
  const { menuAberto, fecharMenu } = useMenu();

  return (
    <aside
      className={`flex flex-col h-screen px-4 py-6 overflow-y-auto corPrincipalBg menu-lateral ${
        menuAberto ? "menu-aberto" : ""
      }`}
    >
      <BtnFecharMenuLateral funcao={fecharMenu} />

      {/* Logo */}
      <div className="flex items-center justify-center mb-6 cursor-pointer">
        <div className="w-full flex justify-center max-w-[100%] p-3 bg-[var(--fundo-logo)] rounded-lg backdrop-blur-sm">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className="w-[60%] h-auto object-contain max-w-[40%]"
          />
        </div>
      </div>

      {/* Menus */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col gap-3">
          {menuItems.map((menu, index) => {
            if (menu.submenu) {
              return (
                <OpcaoMenuComSubmenu key={index} nome={menu.nome} svg={menu.icone}>
                  {menu.submenu.map((sub, i) => (
                    <OpcaoMenu key={i} nome={sub.nome} rota={sub.rota} svg={sub.icone} />
                  ))}
                </OpcaoMenuComSubmenu>
              );
            }

            return <OpcaoMenu key={index} nome={menu.nome} rota={menu.rota} svg={menu.icone} />;
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto mb-15">
          <hr className="border-white/10" />
          <OpcaoMenu
            nome="Sair"
            svg="logout"
            onClick={() =>
              Confirm({
                onConfirm: () => alert("Logout realizado com sucesso!"),
                onCancel: () => {},
                text: "Deseja realmente sair?",
              })
            }
          />
        </div>
      </div>
    </aside>
  );
};

export default MenuLateral;