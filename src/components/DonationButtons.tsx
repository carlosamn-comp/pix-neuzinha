import React from 'react';

interface DonationButtonsProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const DonationButtons: React.FC<DonationButtonsProps> = ({ selectedValue, setSelectedValue }) => {
  const handleDonate = async () => {
    // Envia o valor selecionado para o backend
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedValue }) // Envia o valor selecionado
    });

    const data = await response.json();
    
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;  // Redireciona para o link do pagamento
    } else {
      console.log("Erro ao gerar o link de pagamento", data);
    }
  };

  return (
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
      <button onClick={handleDonate}>Doar</button>
    </div>
  );
};

export default DonationButtons;
