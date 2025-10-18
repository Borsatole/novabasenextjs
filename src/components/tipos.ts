export interface SubMenuItem {
    id: number;
    icone?: string;
    nome: string;
    rota: string;
}

export interface MenuItem {
  id: number;
  nome: string;
  rota: string;
  icone: string;
  submenu?: SubMenuItem[];
}

export interface UserData {
  id: number;
  nome: string;
  email: string;
  nivel: string;
  nivel_nome: string;
  ativo: Boolean;
  expirationTime?: EpochTimeStamp | null;
}



export interface Permissao {
  id: number;
  slug?: string;
  descricao: string;
  allow: Boolean;
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