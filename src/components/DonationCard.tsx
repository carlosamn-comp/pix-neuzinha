import { useEffect, useMemo, useState } from 'react';
import ProgressBar from './ProgressBar.tsx';
import DonationButtons from './DonationButtons.tsx';
import DonationForm from './DonationForm.tsx';
import './DonationCard.css';

const META = 100_000; // A meta de arrecadação (R$ 100.000)

type ApiData = { message?: string; connectToken?: string | null; balances?: number[] };

export default function DonationCard() {
  const [selectedValue, setSelectedValue] = useState('30');
  const [apiData, setApiData] = useState<ApiData | null>(null);  // Dados que virão do backend (message, connectToken, balances)

  // Busca tudo do backend (connectToken/balances)
  useEffect(() => {
    fetch('/api/auth', { method: 'GET' })
      .then(r => r.json())
      .then((json: ApiData) => setApiData(json))
      .catch(err => console.error('Erro ao buscar dados do backend:', err));
  }, []);

  // Soma dos balances vindos do backend
  const totalBalance = useMemo(() => {
    if (!apiData?.balances) return 0;  // Se não houver balances, o total é 0
    return apiData.balances.reduce((acc, b) => acc + b, 0);  // Soma os balances das contas
  }, [apiData]);

  // Calcula a porcentagem de progresso com base no total arrecadado
  const percent = useMemo(() => Math.min(100, (totalBalance / META) * 100), [totalBalance]);

  const handleDoarMensal = async () => {
    // Aqui continua sua lógica de pagamento (quando você estiver pronto para integrar com o backend)
    console.log('Doação mensal selecionada:', selectedValue);
  };

  return (
    <div className="app-container">
      {/* Barra de progresso que exibe a porcentagem do total arrecadado */}
      <ProgressBar balance={totalBalance} percent={percent} />

      <div className="donation-card">
        <div className="logo">
          <span>Pix</span> Neuzinha
        </div>

        {/* Exibe o total arrecadado no formato de moeda */}
        <div className="mt-2" style={{ fontSize: '0.95rem' }}>
          <strong>Total arrecadado:</strong>{' '}
          {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>

        <div className="description mt-2">
          Todas as doações vão diretamente para a <strong>poupança da Neuzinha</strong> via Pix.
        </div>

        {/* Botões para escolher o valor da doação */}
        <DonationButtons selectedValue={selectedValue} setSelectedValue={setSelectedValue} />

        {/* Formulário para efetuar a doação mensal */}
        <DonationForm handleDoarMensal={handleDoarMensal} />
      </div>
    </div>
  );
}
