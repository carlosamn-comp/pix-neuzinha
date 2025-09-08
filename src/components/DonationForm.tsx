import React from 'react';

interface DonationFormProps {
  handleDoarMensal: () => void;
  //handleDoarUnicoClick: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ handleDoarMensal, /*handleDoarUnicoClick*/ }) => {
  return (
    <div className="mt-4">
      <input type="number" className="input-doacao" placeholder="Valor maior que 100" />
      <div className="d-flex gap-3 justify-content-center mt-4">
        <button className="btn btn-primary px-4" onClick={handleDoarMensal}>
          Doar mensalmente
        </button>
      </div>
    </div>
  );
};

export default DonationForm;
