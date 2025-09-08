import React from 'react';
import DonationCard from '../../components/donation-card/DonationCard';
import ProgressBar from '../../components/progress-bar/ProgressBar';

const DonationPage: React.FC = () => {
    return (
        <div>
            <ProgressBar percentage={75} />
            <DonationCard />
        </div>
    );
};

export default DonationPage;