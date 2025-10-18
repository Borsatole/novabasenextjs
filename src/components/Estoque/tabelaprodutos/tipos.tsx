export interface ContaAPagar {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  valor: number;
  data_pagamento?: string;
  data_vencimento?: string;
}

export interface NovaContaAPagar {
  id?: number;
  nome: string;
  categoria: string;
  descricao: string;
  valor: number;
  data_pagamento?: string;
  data_vencimento: string;
}


export interface Categoria {
  id?: number;
  nome?: string;
  categoria: string;
  setor: string;
}

export interface Produto {
  id?: number;
  nome: string;
  quantidade: number;
  categoria: string;
  created_at?: string;
  updated_at?: string;
}