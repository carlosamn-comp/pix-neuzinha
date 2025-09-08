import DonationCard from './components/DonationCard';  // Importando o componente principal
import 'bootstrap/dist/css/bootstrap.min.css';  // Estilos globais
import './index.css';  // Estilos globais
import { Routes, Route } from 'react-router-dom';  // Para gerenciar rotas, caso necessário

function App() {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="d-flex justify-content-center align-items-center min-vh-100">
                <DonationCard />  {}
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
