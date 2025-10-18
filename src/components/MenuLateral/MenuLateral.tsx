import { useContext, useMemo } from "react";
import { AuthContext } from "@src/context/AuthContext";
import { useMenu } from "@src/context/MenuContext";
import { Confirm } from "@components/comum/alertas";



import { OpcaoMenu, OpcaoMenuComSubmenu } from "@components/MenuLateral/OpcaoMenu";
import { BtnFecharMenuLateral } from "@components/MenuLateral/botoesMenu";

import "./MenuLateral.css";

import { MenuItem, SubMenuItem } from "@src/components/tipos";



const MenuLateral = () => {
  const { logout, auth } = useContext(AuthContext);
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
        <div className="w-full flex justify-center max-w-[100%] p-3 
        bg-[var(--fundo-logo)] rounded-lg backdrop-blur-sm">
          <img
            src={`/logo.png`}
            className="w-[60%] h-auto object-contain max-w-[40%]"
            alt="Logo"
          />
        </div>
      </div>

      {/* Menus */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col gap-3">
          {auth.menu?.map((menu: MenuItem, index: number) => {
            // Submenu
            if (menu.submenu) {
              return (
                <OpcaoMenuComSubmenu key={index} nome={menu.nome} svg={menu.icone} >
                  {menu.submenu.map((sub: SubMenuItem, i: number) => (
                    <OpcaoMenu key={i} nome={sub.nome} rota={sub.rota} svg={sub.icone}/>
                  ))}
                </OpcaoMenuComSubmenu>
              );
            }

            // Menu normal
            return <OpcaoMenu key={index} nome={menu.nome} rota={menu.rota} svg={menu.icone} />;
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto mb-15">
          <hr className=" border-white/10" />
          <OpcaoMenu nome="Sair" 
          svg={'logout'} 
          
          
          onClick={
            () => Confirm({
                onConfirm: logout, 
                onCancel: () => {},
                text: "Deseja realmente sair?"
            })
          } />
        </div>
      </div>
    </aside>
  );
};

export default MenuLateral;