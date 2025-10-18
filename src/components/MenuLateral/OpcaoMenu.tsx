"use client";

import { useState } from "react";
import { MenuItem, SubMenuItem } from "@/components/tipos";
import { getIcon } from "@/components/icons";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import Link from "next/link";

export function OpcaoMenu({ nome, icone, rota, onClick }: MenuItem) {
  const handleClick = () => onClick?.();

  return (
    <Link
      className="group flex items-center px-4 py-3 text-[var(--sidebar-text-color)]
                 hover:bg-[var(--sidebarhover-color)]
                 hover:text-[var(--sidebarhover-text-color)]
                 transition-all duration-200 cursor-pointer 
                 border-l-4 border-transparent 
                 hover:border-[var(--sidebarhover-border)] 
                 rounded-r-lg"
      href={rota || "#"}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center group-hover:text-[var(--sidebarhover-icon)] transition-colors">
        {getIcon(icone || "", 25)}
      </div>
      <span className="ml-3 font-medium text-sm">{nome}</span>
    </Link>
  );
}

export function OpcaoMenuComSubmenu({ nome, icone, children }: SubMenuItem) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className="group w-full flex items-center justify-between px-4 py-3  
                  text-[var(--sidebar-text-color)]
                  hover:bg-[var(--sidebarhover-color)]
                  hover:text-[var(--sidebarhover-text-color)] 
                  transition-all duration-200 cursor-pointer border-l-4 border-transparent 
                  hover:border-[var(--sidebarhover-border)] rounded-r-lg"
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center group-hover:text-[var(--sidebarhover-icon)] transition-colors">
            {getIcon(icone || "", 25)}
          </div>
          <span className="ml-3 font-medium text-sm">{nome}</span>
        </div>

        <div className="group-hover:text-[var(--sidebarhover-icon)] transition-all duration-200">
          {aberto ? (
            <HiOutlineChevronUp className="w-4 h-4" />
          ) : (
            <HiOutlineChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          aberto ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-6 mt-1 border-l-2">
          <div className="space-y-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
