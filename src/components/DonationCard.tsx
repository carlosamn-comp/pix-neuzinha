import { useEffect, useMemo, useState } from 'react';
import ProgressBar from './ProgressBar.tsx';
import DonationButtons from './DonationButtons.tsx';
import DonationForm from './DonationForm.tsx';
import './DonationCard.css';

const META = 100_000;

type BalanceItem = { accountId: string; balance?: number | null };
type ApiData = { message?: string; connectToken?: string | null; balances?: BalanceItem[] };

export default function DonationCard() {
  const [selectedValue, setSelectedValue] = useState('30');
  const [apiData, setApiData] = useState<ApiData | null>(null);

  // Busca tudo do backend (apiKey/connectToken/balances), mas usaremos só balances
  useEffect(() => {
    fetch('/api/auth', { method: 'GET' })
      .then(r => r.json())
      .then((json: ApiData) => setApiData(json))
      .catch(err => console.error('Erro ao buscar dados do backend:', err));
  }, []);

  // Soma dos balances vindos do backend
  const totalBalance = useMemo(() => {
    if (!apiData?.balances) return 0;
    return apiData.balances.reduce((acc, b) => acc + (b.balance ?? 0), 0);
  }, [apiData]);

  const percent = useMemo(() => Math.min(100, (totalBalance / META) * 100), [totalBalance]);

  const handleDoarMensal = async () => {
    // Aqui continua sua lógica de pagamento (se/quando você ligar ao backend)
    console.log('Doação mensal selecionada:', selectedValue);
  };

  return (
    <div className="app-container">
      {/* Passamos o total para a barra (A = total, B = 0) */}
      <ProgressBar balance={totalBalance} percent={percent} />

      <div className="donation-card">
        <div className="logo">
          <span>Pix</span> Neuzinha
        </div>

        {/* Mostra apenas o balance total vindo do backend */}
        <div className="mt-2" style={{ fontSize: '0.95rem' }}>
          <strong>Total arrecadado:</strong>{' '}
          {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>

        <div className="description mt-2">
          Todas as doações vão diretamente para a <strong>poupança da Neuzinha</strong> via Pix.
        </div>

        <DonationButtons selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        <DonationForm handleDoarMensal={handleDoarMensal} />
      </div>
    </div>
  );
}
