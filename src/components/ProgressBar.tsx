import React from 'react';

interface ProgressBarProps {
  balance: number;
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ balance, percent }) => {
  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span>Saldo atual: R$ {(balance).toLocaleString('pt-BR')}</span>
        <span className="meta">Meta: R$ 100.000,00</span>
      </div>
      <div className="progress-rail" aria-label="Progresso da meta">
        <div className="progress-fill" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} />
      </div>
      <div className="progress-footer">
        <span className="percent">{percent.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
