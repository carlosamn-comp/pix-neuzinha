import React from 'react';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const safePercentage = Math.max(0, Math.min(percentage, 100));

    return (
        <div style={{
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '8px',
            height: '24px',
            overflow: 'hidden'
        }}>
            <div
                style={{
                    width: `${safePercentage}%`,
                    backgroundColor: '#3b82f6',
                    height: '100%',
                    transition: 'width 0.3s ease'
                }}
            />
        </div>
    );
};

export default ProgressBar;