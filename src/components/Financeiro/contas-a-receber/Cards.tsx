import {Card} from '@src/components/comum/card'
import { useEffect, useState } from 'react'
import { requisicaoGet } from '@src/services/requisicoes';
import { FaRegStar  } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdMoneyOff } from "react-icons/md";


interface CardsProps {
    queryFiltro: string;
    relistar: boolean;
}

interface VariacaoPeriodo {
  percentual: string;
  positivo: boolean;
}

interface RegistroItem {
  titulo: string;
  descricao: string;
  valor_formatado: string;
  variacao: VariacaoPeriodo;
}

interface RegistroProps {
  pagamentos: RegistroItem;
  pagamentos_pendentes: RegistroItem;
  pagamentos_atrasados: RegistroItem;
  pagamentos_recebidos: RegistroItem;
}

function Cards({ queryFiltro, relistar }: CardsProps) {
  const [registros, setRegistros] = useState<RegistroProps | null>(null);

  useEffect(() => {
    requisicaoGet(`/Financeiro/contas-a-receber/Kpis.php?${queryFiltro}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.registros);
        }
      });
  }, [queryFiltro, relistar]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-3 mb-6">
      <Card
        title={registros?.pagamentos.titulo ?? ""}
        description={registros?.pagamentos.descricao ?? ""}
        value={registros?.pagamentos.valor_formatado ?? "R$ 0,00"}
        icon={<FaRegStar />}
        change={{
        value: 
        `
        ${registros?.pagamentos.variacao?.percentual ?? ""} 
        em relação ao período anterior`,
        isPositive: registros?.pagamentos.variacao?.positivo ?? true,
        }}
        color="orange"
      />

      <Card
        title={registros?.pagamentos_recebidos.titulo ?? ""}
        description={registros?.pagamentos_recebidos.descricao ?? ""}
        value={registros?.pagamentos_recebidos.valor_formatado ?? "R$ 0,00"}
        icon={<GiPayMoney />}
        change={{
        value: `
        ${registros?.pagamentos_recebidos.variacao.percentual ?? ""} das contas selecionadas`,
        isPositive: registros?.pagamentos_recebidos.variacao?.positivo ?? true,
        }}
        color="green"
      />

      <Card
        title={registros?.pagamentos_pendentes.titulo ?? ""}
        description={registros?.pagamentos_pendentes.descricao ?? ""}
        value={registros?.pagamentos_pendentes.valor_formatado ?? "R$ 0,00"}
        icon={<GiReceiveMoney />}
        change={{
        value: `
        ${registros?.pagamentos_pendentes.variacao.percentual ?? ""} das contas selecionadas`,
        isPositive: registros?.pagamentos_pendentes.variacao?.positivo ?? true,
        }}
        color="blue"
      />

      <Card
        title={registros?.pagamentos_atrasados.titulo ?? ""}
        description={registros?.pagamentos_atrasados.descricao ?? ""}
        value={registros?.pagamentos_atrasados.valor_formatado ?? "R$ 0,00"}
        icon={<MdMoneyOff />}
        change={{
        value: `
        ${registros?.pagamentos_atrasados.variacao.percentual ?? ""} das contas selecionadas`,
        isPositive: registros?.pagamentos_atrasados.variacao?.positivo ?? true,
        }}
        color="red"
      />
    </div>
  );
}

export default Cards;
