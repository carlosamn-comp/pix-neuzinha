import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState<{message: string} | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <p>{data ? data.message : "Carregando"}</p>
    </>
  )
}

export default App
