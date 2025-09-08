import React from 'react';

interface DonationButtonsProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const DonationButtons: React.FC<DonationButtonsProps> = ({ selectedValue, setSelectedValue }) => {
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
    </div>
  );
};

export default DonationButtons;
