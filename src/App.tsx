import { useEffect, useState } from 'react'
import './App.css'
import DonationPage from './pages/donation-page/DonationPage';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [data, setData] = useState<{message: string} | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className='app-container'>
      <main>
        <Routes>
          <Route path="/" element={<DonationPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
