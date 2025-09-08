import './App.css'
import DonationPage from './pages/donation-page/DonationPage';
import { Route, Routes } from 'react-router-dom';

function App() {

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
