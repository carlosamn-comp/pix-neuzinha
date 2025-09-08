import 'bootstrap/dist/css/bootstrap.min.css';
import './DonationCard.css';
import { useEffect, useState } from 'react';


export default function DonationCard() {

  const [selectedValue, setSelectedValue] = useState('30');
  const [data, setData] = useState<{message: string} | null>(null);
  
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
      <div className="logo"><span>Pix</span>
      {data?.message && <span className="ms-2">({data.message})</span>}
       Neuzinha</div>
      <div className="description">
        Todas as doações vão diretamente para a <strong>poupança da Neuzinha</strong> via Pix.
      </div>
      <div className="mt-4">
        <label className="form-label">Escolha o valor:</label>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {[30, 60, 100, 200].map((v) => (
            <button
              key={v}
              type="button"
              className={`btn btn-outline-success value-option ${selectedValue === v.toString() ? 'active' : ''
                }`}
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