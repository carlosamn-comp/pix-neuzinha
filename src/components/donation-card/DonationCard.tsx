import 'bootstrap/dist/css/bootstrap.min.css';
import './DonationCard.css';
import { useEffect, useState } from 'react';

interface ApiData {
  message: string;
  token?: string;
}

export default function DonationCard() {
  const [selectedValue, setSelectedValue] = useState('30');
  const [data, setData] = useState<ApiData | null>(null);

  function handleDoarUnicoClick() {
    console.log(`Doar único: R$${selectedValue}`);
  }

  function handleDoarMensal() {
    console.log(`Doar Mensal: R$${selectedValue}`);
  }

  useEffect(() => {
    fetch('/api/auth') 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="donation-card">
      <div className="logo">
        <span>Pix</span> Neuzinha
      </div>

      {/* aqui aparece a mensagem e o token */}
      {data && (
        <div className="mt-2" style={{ fontSize: '0.9rem', color: '#333' }}>
          <div><strong>Mensagem:</strong> {data.message}</div>
          {data.token && (
            <div><strong>Token:</strong> <code>{data.token}</code></div>
          )}
        </div>
      )}

      <div className="description mt-3">
        Todas as doações vão diretamente para a <strong>poupança da Neuzinha</strong> via Pix.
      </div>

      <div className="mt-4">
        <label className="form-label">Escolha o valor:</label>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {[30, 60, 100, 200].map((v) => (
            <button
              key={v}
              type="button"
              className={`btn btn-outline-success value-option ${selectedValue === v.toString() ? 'active' : ''}`}
              onClick={() => setSelectedValue(v.toString())}
            >
              R$ {v}
            </button>
          ))}
        </div>

        <div className="d-flex gap-3 justify-content-center mt-4">
          <button className="btn btn-primary px-4" onClick={handleDoarMensal}>
            Doar mensalmente
          </button>
          <button className="btn btn-secondary px-4" onClick={handleDoarUnicoClick}>
            Doar valor único
          </button>
        </div>
      </div>
    </div>
  );
}
