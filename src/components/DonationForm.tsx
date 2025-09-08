import React from 'react';

interface DonationFormProps {
  handleDoarMensal: () => void;  // Função para efetuar a doação
  selectedValue: string;  // Valor selecionado
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para atualizar o valor no input
}

const DonationForm: React.FC<DonationFormProps> = ({ handleDoarMensal, selectedValue, handleInputChange }) => {
  return (
    <div className="mt-4">
      {/* O input agora é controlado, e seu valor é `selectedValue` */}
      <input 
        type="number" 
        className="input-doacao" 
        placeholder="Valor maior que 100" 
        value={selectedValue}  // Valor vem de selectedValue
        onChange={handleInputChange}  // Atualiza o selectedValue ao digitar no input
      />
      <div className="d-flex gap-3 justify-content-center mt-4">
        <button className="btn btn-primary px-4" onClick={handleDoarMensal}>Doar mensalmente</button>
      </div>
    </div>
  );
};

export default DonationForm;
