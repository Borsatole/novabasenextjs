export interface ContaAReceber {
  id?: number;
  nome: string;
  categoria: string;
  descricao: string;
  valor: number;
  data_pagamento?: string;
  data_vencimento?: string;
}




export interface Categoria {
  id?: number;
  categoria: string;
  setor: string;
}
