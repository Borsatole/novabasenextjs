import { ReactNode } from "react";

export interface SubMenuItem {
  id?: number;
  nome: string;
  rota?: string;
  icone?: string;
  children?: ReactNode; // necessário para aceitar submenus
}

export interface MenuItem {
  id?: number;
  nome: string;
  rota?: string;
  icone?: string;
  submenu?: SubMenuItem[];
  onClick?: () => void; // permite ações diretas (ex: logout)
}

// Outros tipos que você já tinha
export interface UserData {
  id: number;
  nome: string;
  email: string;
  nivel: string;
  nivel_nome: string;
  ativo: boolean;
  expirationTime?: EpochTimeStamp | null;
}

export interface Permissao {
  id: number;
  slug?: string;
  descricao: string;
  allow: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Permissoes {
  id?: number;
  nome: string;
  permissoes?: Permissao[];
  created_at?: string;
  updated_at?: string;
}
