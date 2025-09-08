import React from 'react';

interface DonationButtonsProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  handleDonate: () => void; // Função que vem do Card
}

const DonationButtons: React.FC<DonationButtonsProps> = ({ selectedValue, setSelectedValue, handleDonate }) => {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      {[30, 60, 100, 200].map((v) => (
        <button
          key={v}
          type="button"
          className={`btn btn-outline-success value-option ${selectedValue === v.toString() ? 'active' : ''}`}
          onClick={() => setSelectedValue(v.toString())} // Atualiza o valor selecionado
        >
          R$ {v}
        </button>
      ))}
      {/* Botão de doação que chama handleDonate */}
      <button onClick={handleDonate}>Doar</button>
    </div>
  );
};

export default DonationButtons;
